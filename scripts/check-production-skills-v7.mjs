import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const regPath=path.join(root,'sources/production_skills_v7.json');
const required=['id','category','deliverable','localGate','externalGate','blocker'];
export function validateRegistry(reg, skillNames){
 const errors=[];
 if(reg.schema!=='sense-production-skill-gates-v7'||!Array.isArray(reg.skills))return ['Invalid registry'];
 const ids=reg.skills.map(r=>r.id), set=new Set(ids), actual=new Set(skillNames);
 if(ids.length!==reg.expectSkills||set.size!==ids.length)errors.push('Wrong/duplicate skill count');
 for(const name of actual)if(!set.has(name))errors.push('Missing contract: '+name);
 for(const name of set)if(!actual.has(name))errors.push('Orphan contract: '+name);
 for(const r of reg.skills){
  for(const key of required)if(typeof r[key]!=='string'||r[key].trim().length<(key==='id'||key==='category'?2:12))errors.push(r.id+': invalid '+key);
  if(/guarantee|100% rankings|#1 lock/i.test(r.deliverable||''))errors.push(r.id+': ungrounded guarantee');
 }
 return errors;
}
const isHTTPS=s=>typeof s==='string'&&/^https:\/\/[^ /]+\/?/.test(s)&&!/(example\.com|example\.test|localhost)/i.test(s);
export function validateReceipt(rec,reg,now=Date.now()){
 const errors=[];
 const skill=reg.skills.find(s=>s.id===rec?.skill);
 if(!skill)errors.push('Unknown skill');
 if(!reg.statuses.includes(rec?.status))errors.push('Unknown status');
 if(['PASS_LOCAL','PASS_LIVE'].includes(rec?.status)){
  if(typeof rec?.command!=='string'||rec.command.length<3)errors.push('Missing executed command');
  if(typeof rec?.artifact!=='string'||rec.artifact.length<8)errors.push('Missing verifiable local artifact');
  const at=Date.parse(rec?.executed_at||'');
  if(!Number.isFinite(at)||at>now+60_000)errors.push('Missing/invalid local execution time');
 }
 if(rec?.status==='PASS_LIVE'){
  if(!isHTTPS(rec.property_url))errors.push('No actual HTTPS property');
  if(!isHTTPS(rec.evidence_url))errors.push('No independently inspectable HTTPS evidence URL');
  if(typeof rec.reviewer!=='string'||rec.reviewer.trim().length<3)errors.push('Reviewer required');
  if(rec.authorized!==true)errors.push('Property authorization required');
  const at=Date.parse(rec.observed_at||'');
  if(!Number.isFinite(at)||at>now+60_000)errors.push('Missing/invalid live observation time');
  if(!isHTTPS(rec.primary_source_url))errors.push('Current primary source URL required');
  const sourceAt=Date.parse(rec.source_reviewed_at||'');
  if(!Number.isFinite(sourceAt)||sourceAt>now+60_000||now-sourceAt>86400000)errors.push('Missing/stale action-time original source check');
 }
 if(/guaranteed #1|certified production|approved by google/i.test(JSON.stringify(rec?.claims||[])))errors.push('Unsupported provider guarantee');
 return errors;
}
export function checkRepo(){
 const names=fs.readdirSync(path.join(root,'.agents/skills'),{withFileTypes:true}).filter(x=>x.isDirectory()&&fs.existsSync(path.join(root,'.agents/skills',x.name,'SKILL.md'))).map(x=>x.name);
 const reg=JSON.parse(fs.readFileSync(regPath,'utf8'));return {reg,errors:validateRegistry(reg,names)};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const {reg,errors}=checkRepo();
 const i=process.argv.indexOf('--receipt');
 if(i!==-1){
  if(!process.argv[i+1])errors.push('Receipt path required');
  else {try{errors.push(...validateReceipt(JSON.parse(fs.readFileSync(process.argv[i+1],'utf8')),reg));}catch(e){errors.push('Receipt unreadable: '+e.message);}}
 }
 if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
 else console.log('PASS: '+reg.skills.length+' scoped production skill contracts. No live readiness certified.');
}
