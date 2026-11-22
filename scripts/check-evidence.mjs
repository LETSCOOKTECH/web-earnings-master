#!/usr/bin/env node
import fs from 'node:fs';
const arg=(name)=>{const i=process.argv.indexOf(name); return i<0?undefined:process.argv[i+1]};
const file=arg('--file');if(!file){console.error('Usage: node scripts/check-evidence.mjs --file report.json [--strict]');process.exit(2)}
let o;try{o=JSON.parse(fs.readFileSync(file,'utf8'))}catch(e){console.error(e.message);process.exit(2)}
const errors=[];const warnings=[];const ids=new Set();
if(!o.site_url||!/^https:\/\//.test(o.site_url))errors.push('site_url must be a real-looking HTTPS URL');
if(!Array.isArray(o.checks)||o.checks.length===0)errors.push('checks must be a nonempty array');
for(const c of o.checks??[]){
 if(!c.id || ids.has(c.id))errors.push('missing/duplicate check id '+c.id);ids.add(c.id);
 if(!['pass','fail','unknown','not-applicable'].includes(c.status))errors.push(c.id+': invalid status');
 if(c.status==='pass' && (!Array.isArray(c.evidence) || !c.evidence.length || c.evidence.some(x=>!String(x).trim())))errors.push(c.id+': PASS requires actual evidence references');
 if(c.status==='unknown')warnings.push(c.id+': remains UNKNOWN');
 if(c.status==='fail')warnings.push(c.id+': FAIL');
 if(c.status==='not-applicable'&&!String(c.reason??'').trim())errors.push(c.id+': N/A requires reason');
}
if(errors.length){console.error('INVALID EVIDENCE MANIFEST\n'+errors.join('\n'));process.exit(1)}
console.log(`Evidence manifest valid: ${ids.size} gates. ${warnings.length} unresolved/failed. This is not publisher or ranking certification.`);
if(warnings.length)console.warn(warnings.join('\n'));
if(process.argv.includes('--strict')&&warnings.length)process.exit(1);
