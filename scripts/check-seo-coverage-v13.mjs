#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {validateAtlas,AREAS} from './seo-source-capture-v13.mjs';

const PHASES=new Set(['RESEARCH','BUILD','LAUNCH','MEASURE']);
export const REQUIRED=new Set(['authority-distribution','user-need','query-provenance','serp-intent','spam-policy','dns-tls-http','robots-crawler','index-directives','canonical-duplicates','sitemap','js-rendering','backend-security','file-output','publisher-page','owner-indexing','release-reliability','revenue-evidence']);
export function checkCoverage(contract,atlas,{root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),exists=fs.existsSync}={}){
 const errors=[],domains=contract?.domains;
 if(contract?.schema!=='sense-seo-v13-coverage-contract'||!Array.isArray(domains)||domains.length<28)
  return {valid:false,errors:['Missing comprehensive V13 domain coverage contract'],status:'FAIL'};
 if(!validateAtlas(atlas).valid)return {valid:false,errors:['Invalid curated first-party source atlas'],status:'FAIL'};
 const ids=new Set(),phases=new Set(),areas=new Set(),references=new Set(atlas.entries.map(x=>x.id));
 const atlasMap=new Map(atlas.entries.map(x=>[x.id,x]));
 for(const d of domains){
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(d?.id||''))errors.push('Invalid domain id '+String(d?.id));
  if(ids.has(d.id))errors.push('Duplicate domain '+d.id);ids.add(d.id);
  if(!PHASES.has(d.phase))errors.push('Invalid phase '+d.id);phases.add(d.phase);
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(d.owner_skill||''))errors.push('Invalid skill slug '+d.id);
  else {
   const skill=path.join(root,'.agents/skills',d.owner_skill,'SKILL.md');
   if(!exists(skill))errors.push('Missing owner skill '+d.id+' '+d.owner_skill);
  }
  if(typeof d.guide!=='string'||!/^docs\/seo-master\/[a-z0-9-]+\.md$/.test(d.guide))errors.push('Unsafe/invalid guide '+d.id);
  else if(!exists(path.join(root,d.guide)))errors.push('Missing guide '+d.id+' '+d.guide);
  if(!references.has(d.official_source_id))errors.push('Unknown first-party original source '+d.id);
  else areas.add(atlasMap.get(d.official_source_id).area);
  if(typeof d.acceptance_evidence!=='string'||d.acceptance_evidence.length<25)
   errors.push('Acceptance evidence too weak '+d.id);
  if(typeof d.critical_failure!=='string'||d.critical_failure.length<20)
   errors.push('Missing critical failure counterexample '+d.id);
  if(d.external_outcome_not_certified!==true)errors.push('External evidence must remain independently verified '+d.id);
 }
 for(const id of REQUIRED)if(!ids.has(id))errors.push('Required production/SEO domain missing '+id);
 for(const p of PHASES)if(!phases.has(p))errors.push('Missing lifecycle phase '+p);
 for(const area of AREAS)if(!areas.has(area))errors.push('No authoritative source category '+area);
 return {valid:!errors.length,status:errors.length?'FAIL':'PASS_COVERAGE_METADATA_ONLY',errors,domains:domains.length,
  skills:new Set(domains.map(x=>x.owner_skill)).size,official_source_categories:[...areas].sort(),phases:[...phases].sort(),
  disclaimer:'Skill/source/doc relationship exists. This does NOT prove current policy interpretation, actual agent adherence, deploy success, Google ranking, Search Console indexed state, publisher approval or user demand.'};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
 const contract=JSON.parse(fs.readFileSync(path.join(root,'sources/seo_v13_coverage_contract.json'),'utf8'));
 const atlas=JSON.parse(fs.readFileSync(path.join(root,'sources/seo_v13_primary_atlas.json'),'utf8'));
 const result=checkCoverage(contract,atlas,{root});console.log(JSON.stringify(result,null,2));if(!result.valid)process.exitCode=1;
}
