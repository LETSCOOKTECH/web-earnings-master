import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const o=JSON.parse(fs.readFileSync(path.join(root,'sources/official_sources.json'),'utf8'));
const errors=[];const warnings=[];const ids=new Set();
for(const s of o.sources??[]){
 if(ids.has(s.id))errors.push(`duplicate source ${s.id}`); ids.add(s.id);
 let u;try{u=new URL(s.url)}catch{errors.push(`${s.id} invalid URL`);continue;}
 if(u.protocol!=='https:')errors.push(`${s.id}: HTTPS required`);
 if(!/^\d{4}-\d{2}-\d{2}$/.test(s.reviewed_at))errors.push(`${s.id}: invalid date`);
 const age=Math.floor((Date.now()-Date.parse(`${s.reviewed_at}T00:00:00Z`))/86400000);
 if(age>s.review_every_days)warnings.push(`${s.id}: ${age}d since review > ${s.review_every_days}d; recheck before use`);
 if(!s.purpose||!s.authority)errors.push(`${s.id}: missing provenance`);
}
console.log(`${o.sources.length} official URLs in the local registry (NOT live HTTP-validated).`);
if(warnings.length)console.warn('STALE SOURCE WARNINGS:\n'+warnings.join('\n'));
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
else console.log('PASS: source registry structure valid.');

