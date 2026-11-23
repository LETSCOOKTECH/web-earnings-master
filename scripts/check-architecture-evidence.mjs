#!/usr/bin/env node
// Offline source/skill/cost-model contract checks only: no live provider quotes or capacity tests.
import fs from 'node:fs';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'), read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const errors=[],exists=p=>fs.existsSync(path.join(root,p));
const skillNames=['web-workload-architecture-router','web-browser-compute','web-conversion-job-platform','web-unit-economics-finops','web-scale-reliability','web-hosting-vendor-evaluation'];
const all=fs.readdirSync(path.join(root,'.agents/skills'),{withFileTypes:true}).filter(x=>x.isDirectory());
if(all.length!==38)errors.push('Expected 38 total skill manifests, got '+all.length);
for(const name of skillNames){
 const p='.agents/skills/'+name+'/SKILL.md';
 if(!exists(p))errors.push('Missing architecture skill '+name);
 else {
  const content=fs.readFileSync(path.join(root,p),'utf8');
  if(!content.includes('name: '+name)||!content.includes('https://')||content.length<4500||!content.match(/blockers|FAIL|UNKNOWN/i))errors.push('Incomplete architecture instructions '+name);
 }
}
const chapters=['01-workload-placement-decision.md','02-client-and-media-pipelines.md','03-million-user-economics.md','04-scale-and-product-quality.md','05-ai-and-external-data-cost.md','06-vendor-cost-comparison.md'];
for(const p of chapters)if(!exists('docs/architecture/'+p)||fs.readFileSync(path.join(root,'docs/architecture',p),'utf8').length<2800)errors.push('Missing/short architecture manual '+p);
const rates=read('sources/architecture_rate_card_2026-11-23.json');
const infra=read('sources/architecture_provider_claims_2026-11-23.json');
const vendors=read('sources/architecture_vendor_claims_2026-11-23.json');
if(rates.version!=='2026-11-23.v1'||rates.currency!=='USD')errors.push('Unversioned pricing rate model');
if(!rates.source_urls||Object.values(rates.source_urls).some(u=>!String(u).startsWith('https://')))errors.push('Rate model missing official URLs');
if(rates.r2_standard.egress_usd_per_gb!==0||rates.workers_paid.base_usd_per_month!==5)errors.push('Rate model public metadata drifted without source reapproval');
if(infra.count!==18||infra.claims.length!==18||infra.full_body+infra.partial_excerpt!==18)errors.push('Architecture claims count incorrect');
if(vendors.provider_claim_count!==12||vendors.claims.length!==12||vendors.opened+vendors.partial!==12)errors.push('Vendor claims count incorrect');
for(const c of [...infra.claims,...vendors.claims]){
 if(!c.source?.startsWith('https://')||!c.caveat&&!c.limitation||!c.claim||!['OFFICIAL_ORIGINAL_BODY_OPENED','INDEXED_FIRST_PARTY_EXCERPT_ONLY'].includes(c.evidence))errors.push('Unscoped or unsupported provider claim '+c.id);
}
const watch=read('sources/foundation_refresh_targets.json'),review=read('sources/foundation_source_review_2026-11-23.json');
if(watch.monitored.length!==review.targets.length||review.accessed_count+review.unverified_count!==review.targets.length)errors.push('Watch/access coverage mismatch');
if(new Set(watch.monitored.map(x=>x.id)).size!==watch.monitored.length)errors.push('Duplicate source watchers');
for(const file of ['scripts/model-tool-economics.mjs','scripts/assess-tool-architecture.mjs','scripts/evaluate-hosting-options.mjs','tests/architecture-economics.test.mjs']){
 if(!exists(file))errors.push('Missing executable validation '+file);
}
for(const file of ['million-browser-local.json','million-hybrid-file-tools.json','million-cloud-video.json','million-ai-token-tool.json']){
 if(!exists('templates/architecture/scenarios/'+file))errors.push('Missing example workload '+file);
}
if(errors.length){console.error('FAIL architecture source/skill contracts:\n'+errors.join('\n'));process.exitCode=1;}
else console.log('PASS architecture evidence: 38 skill manifests, 6 architecture specialists, 6 chapters, 18 infra claims, 12 vendor claims, '+watch.monitored.length+' source targets ('+review.unverified_count+' partial); economic estimates are NOT actual invoices or load tests.');
