#!/usr/bin/env node
import fs from 'node:fs';
const i=process.argv.indexOf('--file'),file=i===-1?undefined:process.argv[i+1];
if(!file){console.error('Usage: node scripts/audit-page-intents.mjs --file page-intents.json');process.exit(2)}
const d=JSON.parse(fs.readFileSync(file,'utf8'));const pages=d.pages??[];let errs=[];
if(!pages.length)errs.push('No pages');const slugs=new Set(),jobs=new Set();
for(const p of pages){
 if(!/^\/[a-z0-9/_-]*\/$/.test(p.path??''))errs.push('Invalid canonical path '+p.path);
 if(slugs.has(p.path))errs.push('Duplicate URL '+p.path);slugs.add(p.path);
 if(!p.user_job||p.user_job.length<15)errs.push('Missing distinct user job at '+p.path);
 const key=(p.user_job??'').toLowerCase().trim();if(jobs.has(key))errs.push('Duplicate user job '+p.user_job);jobs.add(key);
 if(!['measured','estimated','hypothesis','unknown'].includes(p.demand_evidence_status))errs.push('Missing evidence state for '+p.path);
 if(p.status==='index'&&!p.title)errs.push('Indexable page missing title '+p.path);
}
if(errs.length){console.error('FAIL\n'+errs.join('\n'));process.exit(1)}
console.log(`PASS: ${pages.length} distinct path/job declarations. No claim of rankings or actual indexability.`);
