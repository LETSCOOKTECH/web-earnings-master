#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
export function checkCrosswalk(map,registry,sourceIds){
 const errors=[];
 if(map?.schema!=='sense-skill-source-crosswalk-v20'||!Array.isArray(map.skills)||!Array.isArray(registry?.skills))
  return {status:'FAIL',errors:['Missing valid 49-skill source map']};
 const byId=new Map();
 for(const row of map.skills){
  if(!row||typeof row.id!=='string'||byId.has(row.id)) {errors.push('Duplicate/invalid skill ID');continue;}
  byId.set(row.id,row);
  if(!Array.isArray(row.reference_source_ids)||!row.reference_source_ids.length||
   row.reference_source_ids.some(x=>!sourceIds.has(x)))errors.push('Unmapped or unverified source pointer: '+row.id);
  for(const key of ['local_evidence_expected','external_evidence_expected','blocking_condition'])
   if(typeof row[key]!=='string'||row[key].length<12)errors.push('Missing real proof criterion '+key+' '+row.id);
  if(row.source_status!=='REFERENCE_LEADS_ACTION_TIME_ORIGINAL_REQUIRED'||row.external_status!=='NOT_AUTHENTICATED'||row.quality_status!=='DOMAIN_SPECIFIC_TEST_REQUIRED')
   errors.push('Source link or contract incorrectly self-certifies production '+row.id);
 }
 for(const r of registry.skills)if(!byId.has(r.id))errors.push('Missing owner skill '+r.id);
 for(const n of byId.keys())if(!registry.skills.some(r=>r.id===n))errors.push('Unregistered source mapped skill '+n);
 if(map.skills.length!==registry.skills.length)errors.push('Source map count mismatch');
 if(!Array.isArray(map.primary_originals_opened_during_this_audit)||!map.primary_originals_opened_during_this_audit.length)errors.push('Missing separately reviewed first-party originals');
 else for(const r of map.primary_originals_opened_during_this_audit){
  if(typeof r.url!=='string'||!r.url.startsWith('https://')||
   typeof r.verified_limited_claim!=='string'||r.verified_limited_claim.length<30||!Array.isArray(r.applies_to)||
   r.applies_to.some(x=>!byId.has(x)))errors.push('Unscoped original source '+r.id);
 }
 return {status:errors.length?'FAIL':'MAPPED_NOT_CERTIFIED',errors,
  mapped_skills:map.skills.length,
  source_ids_referenced:new Set(map.skills.flatMap(x=>x.reference_source_ids||[])).size,
  current_original_semantics_automatically_verified:false,
  user_task_production_certified:false,
  disclaimer:'Crosswalk validates existence and negative attestation status, never actual vendor policy, completed user jobs, deployment or revenue.'};
}
if(process.argv[1]&&path.resolve(process.argv[1])===path.resolve(import.meta.filename||'')){
 const load=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
 const r=checkCrosswalk(load('sources/skill-evidence-crosswalk-v20.json'),load('sources/production_skills_v7.json'),new Set(load('sources/official_sources.json').sources.map(x=>x.id)));
 console.log(JSON.stringify(r,null,2));if(r.status==='FAIL')process.exitCode=1;
}
