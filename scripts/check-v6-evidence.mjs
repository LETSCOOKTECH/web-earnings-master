#!/usr/bin/env node
// Structural evidence gate for eight V6 skills. DOES NOT test real Google rank, AdSense approval or live security.
import fs from 'node:fs';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const activeSkills=JSON.parse(fs.readFileSync(path.join(root,'sources/production_skills_v7.json'),'utf8')).expectSkills;
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const exists=p=>fs.existsSync(path.join(root,p));
const errors=[];
const newSkills=['web-search-forensic-evidence','web-fullstack-production-executor','web-frontend-experience-engineering','web-backend-api-engineering','web-security-assurance-asvs','web-publisher-policy-eligibility','web-monetization-network-operator','web-release-observability-operator'];
const dirs=fs.readdirSync(path.join(root,'.agents/skills'),{withFileTypes:true}).filter(x=>x.isDirectory());
if(dirs.length!==activeSkills)errors.push('Expected '+activeSkills+' skills (46 through V6 plus Traffic Hunter and Opportunity Intelligence), got '+dirs.length);
for(const name of newSkills){
 const p='.agents/skills/'+name+'/SKILL.md';
 if(!exists(p))errors.push('Missing '+p);
 else{
  const src=fs.readFileSync(path.join(root,p),'utf8');
  if(!src.includes('name: '+name)||src.length<3900||!src.includes('FAIL / UNKNOWN')||!src.includes('https://'))errors.push('Incomplete skill contract '+p);
 }
}
const docs=['01-search-rank-forensics.md','02-fullstack-production-blueprint.md','03-page-quality-seo-publisher-gates.md','04-publisher-networks-and-policy-engine.md','05-security-asvs-threat-verification.md','06-seo-discovery-and-page-operations.md','07-release-observability-and-ad-privacy.md','README.md'];
for(const name of docs){
 const p='docs/v6/'+name;
 if(!exists(p))errors.push('Missing manual '+p);
 else if(fs.readFileSync(path.join(root,p),'utf8').length<3400)errors.push('Manual too short '+p);
}
const ledger=read('sources/v6_claims_2026-11-23.json');
if(ledger.count!==45||ledger.claims.length!==45)errors.push('Priority uploaded claim ledger not 45');
if(new Set(ledger.claims.map(x=>x.id)).size!==45)errors.push('Duplicate upload claim ID');
for(const x of ledger.claims){
 if(!x.claim||!x.source?.startsWith('https://')||!x.evidence_class||!x.verdict||!x.guardrail||!x.report_line||!x.checked_on)errors.push('Unscoped uploaded claim '+x.id);
 if(x.verdict==='SUPPORTED'&&['PATENT_POSSIBILITY','LEAKED_SCHEMA_INTERPRETATION','USER_REPORT_CAUSAL'].includes(x.evidence_class))errors.push('Unsupported promotion to verified '+x.id);
}
const registry=read('sources/v6_publisher_network_registry_2026-11-23.json');
if(registry.count!==15||registry.rows.length!==15||new Set(registry.rows.map(x=>x.id)).size!==15)errors.push('Publisher registry invalid');
for(const n of registry.rows){
 if(!n.official_source?.startsWith('https://')||!n.evidence_state||!n.checked_on||!n.caveat||!n.known_requirements)errors.push('Incomplete network '+n.id);
}
const journey=registry.rows.find(x=>x.name==='Journey by Mediavine');
if(journey?.evidence_state!=='CHANGING_REQUIREMENTS_2026_11_18'||journey.min_monthly_pageviews!==null)errors.push('Journey outdated threshold must remain unknown');
const ad=registry.rows.find(x=>x.name==='Google AdSense');
if(ad?.min_monthly_pageviews!==null)errors.push('Fictitious AdSense fixed pageview minimum');
const watch=read('sources/foundation_refresh_targets.json');
const access=read('sources/foundation_source_review_2026-11-23.json');
if(watch.monitored.length!==access.targets.length||access.targets_reviewed_for_access!==access.targets.length)errors.push('Official-source watcher and access ledger mismatch');
if(access.accessed_count+access.unverified_count!==access.targets.length)errors.push('Direct provider source access falsely reported');
if(new Set(watch.monitored.map(x=>x.id)).size!==watch.monitored.length)errors.push('Source ID collision');
for(const src of registry.rows.filter(x=>!['NO_SINGLE_PROVIDER','BUSINESS_MODEL_NOT_AD_NETWORK'].includes(x.evidence_state))){
 if(!watch.monitored.some(x=>x.url===src.official_source)&&!read('sources/official_sources.json').sources.some(x=>x.url===src.official_source))
  errors.push('Missing provider source registration '+src.name);
}
for(const p of ['scripts/audit-publisher-page.mjs','scripts/evaluate-publisher-eligibility.mjs','scripts/audit-web-security-manifest.mjs','tests/v6-production.test.mjs',
 'templates/v6/page-example.json','templates/v6/publisher-site-example.json','templates/v6/security-example.json'])if(!exists(p))errors.push('Missing executable contract '+p);
if(errors.length){console.error('FAIL V6 evidence contracts:\n'+errors.join('\n'));process.exitCode=1;}
else console.log('PASS V6 contracts: '+activeSkills+' total skills, 8 new specialist contracts, 8 manuals, 45 forensic claims, 15 provider models, '+watch.monitored.length+' watched official sources ('+access.unverified_count+' partial); NOT a ranking, publisher approval, 1M-user capacity or penetration-test certification.');
