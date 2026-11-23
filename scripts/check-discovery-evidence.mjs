#!/usr/bin/env node
// Evidence contract for 4 focused discovery skills. Structural checks only; NOT live provider verification.
import fs from 'node:fs';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'), read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const errors=[],exists=p=>fs.existsSync(path.join(root,p));
const skills=['web-aeo-answer-optimization','web-generative-engine-optimization','web-aso-google-play','web-aso-apple-app-store'];
for(const name of skills){
 const file='.agents/skills/'+name+'/SKILL.md';
 if(!exists(file))errors.push('Missing skill '+file);
 else{
  const body=fs.readFileSync(path.join(root,file),'utf8');
  if(!body.includes('**Trigger:**')||!body.includes('## End-to-end workflow')||!body.includes('## Hard FAIL / UNKNOWN gates')||!body.includes('## Output contract')||!body.includes('https://'))errors.push('Incomplete execution contract '+name);
 }
}
const reports=['01-answer-engine-optimization.md','02-generative-engine-optimization.md','03-google-play-aso.md','04-apple-app-store-aso.md'];
for(const file of reports)if(!exists('docs/discovery/'+file)||fs.readFileSync(path.join(root,'docs/discovery',file),'utf8').length<5500)errors.push('Missing/inadequate manual '+file);
const records=read('sources/discovery_provider_claims_2026-11-23.json');
if(records.claim_count!==32||records.claims.length!==32||records.full_body_count+records.excerpt_count!==32)errors.push('Provider evidence cardinality error');
const ids=new Set();
for(const x of records.claims){
 if(ids.has(x.id))errors.push('Duplicate claim '+x.id);ids.add(x.id);
 if(!['OFFICIAL_ORIGINAL_BODY_OPENED','INDEXED_FIRST_PARTY_EXCERPT_ONLY'].includes(x.evidence))errors.push('Unsupported claim provenance '+x.id);
 if(!['CURRENT','FUTURE','PREVIEW','EXPERIMENTAL'].includes(x.mode))errors.push('Invalid claim timeline '+x.id);
 if(!x.source?.startsWith('https://')||!x.checked_on||!x.scope||!x.limitations)errors.push('Incomplete claim '+x.id);
}
if(records.claims.find(x=>x.id==='P08')?.mode!=='FUTURE')errors.push('Future Play quality enforcement mislabeled');
const watch=read('sources/foundation_refresh_targets.json');
const reviewed=read('sources/foundation_source_review_2026-11-23.json');
if(watch.monitored.length!==reviewed.targets.length)errors.push('Official source watch/access entries mismatch');
if(new Set(watch.monitored.map(x=>x.id)).size!==watch.monitored.length)errors.push('Duplicate watch ids');
if(reviewed.targets_reviewed_for_access!==reviewed.targets.length||reviewed.accessed_count+reviewed.unverified_count!==reviewed.targets.length)errors.push('False source access coverage');
for(const r of records.claims){
 if(!watch.monitored.some(w=>w.url===r.source)&&!read('sources/official_sources.json').sources.some(w=>w.url===r.source))errors.push('Discovery source not registered '+r.id);
}
const critical=['scripts/audit-aso-listing.mjs','scripts/audit-answer-page.mjs','scripts/evaluate-ai-citations.mjs','tests/discovery-skills.test.mjs'];
for(const p of critical)if(!exists(p))errors.push('Missing executable / tests '+p);
if(errors.length){console.error('FAIL discovery evidence:\n'+errors.join('\n'));process.exitCode=1;}
else console.log('PASS V4 discovery evidence: '+skills.length+' specialty skills, '+reports.length+' manuals, '+records.claim_count+' bounded provider claims, '+watch.monitored.length+' source targets with '+reviewed.unverified_count+' partial-access caveats. NO live ranking approval claims.');
