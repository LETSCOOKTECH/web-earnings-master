#!/usr/bin/env node
// Structural evidence quality gates only. This does not fetch/read current provider body.
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const activeSkills=JSON.parse(fs.readFileSync(path.join(root,'sources/production_skills_v7.json'),'utf8')).expectSkills;
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const exists=p=>fs.existsSync(path.join(root,p));
const errors=[];
const original=read('sources/original_21_skill_audit.json');
const list=read('sources/foundation_refresh_targets.json').monitored;
const review=read('sources/foundation_source_review_2026-11-23.json');
const claim=read('sources/verified_claims.json');
const knownNames=fs.readdirSync(path.join(root,'.agents/skills'),{withFileTypes:true}).filter(x=>x.isDirectory()&&exists('.agents/skills/'+x.name+'/SKILL.md')).map(x=>x.name);
if(original.entries.length!==21)errors.push('Original skill list not 21');
if(new Set(original.entries.map(e=>e.name)).size!==21)errors.push('Original skills duplicate');
if(knownNames.length!==activeSkills)errors.push('Expected '+activeSkills+' skills (21 originals, 7 foundations, 4 discovery, 6 architecture, 8 V6, 1 Traffic Hunter, 1 Opportunity Intelligence), got '+knownNames.length);
for(const e of original.entries){
 if(!knownNames.includes(e.name))errors.push('Original skill missing: '+e.name);
 const file='.agents/skills/'+e.name+'/SKILL.md';
 if(!exists(file))continue;
 const body=fs.readFileSync(path.join(root,file),'utf8');
 if(!body.includes('## V2.3 production evidence contract'))errors.push('Evidence contract missing: '+e.name);
 if(!body.includes('docs/foundations/19-provider-source-verification.md'))errors.push('Source protocol link missing: '+e.name);
 if(!body.includes('FAIL / UNKNOWN'))errors.push('Failure/UNKNOWN rule missing: '+e.name);
}
const byId=new Set();
const states=new Set(['CURRENT','REFERENCE','FUTURE','EXPERIMENTAL','PREVIEW','HISTORICAL','STANDARD','DRAFT','UNVERIFIED']);
let opened=0,unknown=0;
for(const c of claim.claims){
 if(byId.has(c.id))errors.push('Duplicate claim id '+c.id);byId.add(c.id);
 if(!c.id||!c.source||!c.topic||!c.scope||!c.reviewed_on||!c.claim||!states.has(c.mode))errors.push('Invalid claim '+c.id);
 try{const u=new URL(c.source);if(u.protocol!=='https:')errors.push('NonHTTPS claim '+c.id);}catch{errors.push('Invalid URL '+c.id);}
 if(c.mode==='UNVERIFIED'){unknown++;if(c.evidence==='FIRST_PARTY_BODY_OPENED')errors.push('Unverified claim falsely opened '+c.id);}
 else{opened++;if(c.evidence!=='FIRST_PARTY_BODY_OPENED')errors.push('Claim without real provider body '+c.id);}
 if(c.mode==='FUTURE'&&!c.scope)errors.push('Future rule without scope '+c.id);
}
if(opened<40||unknown<1)errors.push('Insufficient dated verified/unknown claim coverage');
if(claim.claim_count!==opened)errors.push('verified claim_count mismatch');
if(list.length!==review.targets.length)errors.push('Watchlist review coverage incomplete');
const reviewMap=new Map(review.targets.map(x=>[x.id,x]));
if(reviewMap.size!==list.length)errors.push('Review duplicated ids');
for(const target of list){
 const status=reviewMap.get(target.id);
 if(!status || status.url!==target.url || !status.reviewed_on || !status.body_access)errors.push('Watchlist review row missing: '+target.id);
 if(status?.body_access==='OFFICIAL_ORIGINAL_BODY_OPENED' && !/only selected claims|only claims|bounded assertions/.test(status.scope))errors.push('Exaggerated source review? '+target.id);
}
const actualUnknown=review.targets.filter(x=>x.body_access!=='OFFICIAL_ORIGINAL_BODY_OPENED').length;
if(review.accessed_count!==list.length-actualUnknown||review.unverified_count!==actualUnknown)errors.push('Watch counts mismatch');
const mandatoryDocs=['docs/foundations/19-provider-source-verification.md','docs/foundations/20-owned-web-lab-and-robots.md','docs/audits/ORIGINAL_21_SKILLS_AUDIT_2026-11-23.md'];
for(const p of mandatoryDocs)if(!exists(p))errors.push('Missing evidence doc '+p);
if(errors.length){console.error('FAIL research evidence:\n'+errors.join('\n'));process.exitCode=1;}
else console.log('PASS research evidence structure: '+knownNames.length+' skills, 21 original audited, '+opened+' inspected-claim records, '+unknown+' explicit unverified claims, '+list.length+' source watch targets ('+actualUnknown+' inaccessible). No live ranking claim.');
