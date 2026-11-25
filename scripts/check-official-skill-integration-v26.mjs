#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const AUTHORITIES={
 'vercel-labs/agent-skills':'VERCEL_OFFICIAL_ORG',
 'anthropics/skills':'ANTHROPIC_OFFICIAL_ORG',
 'cloudflare/skills':'CLOUDFLARE_OFFICIAL_ORG',
 'addyosmani/web-quality-skills':'INDIVIDUAL_MAINTAINER_NOT_GOOGLE_OFFICIAL'
};
const LICENSES={
 'vercel-labs/agent-skills':new Set(['MIT_README_ONLY','MIT_README_PLUS_SKILL']),
 'anthropics/skills':new Set(['APACHE_2_FILE']),
 'cloudflare/skills':new Set(['APACHE_2_REPO']),
 'addyosmani/web-quality-skills':new Set(['MIT_LICENSE_FILE'])
};
const LICENSE_RECEIPTS={
 'vercel-labs/agent-skills':{path:'README.md',sha:'396ef38284797174c737942a9cc84fc09680b705'},
 'cloudflare/skills':{path:'LICENSE',sha:'7a4a3ea2424c09fbe48d455aed1eaa94d9124835'},
 'addyosmani/web-quality-skills':{path:'LICENSE',sha:'90715bb429f374dcc4e05c35535b049d3c077313'}
};
const ANTHROPIC_LICENSE_BLOBS={
 'anthropic-frontend':'f433b1a53f5b830a205fd2df78e2b34974656c7b',
 'anthropic-webapp':'4f881c52d1f72f4cfb720e339e2d35c3058d01a9',
 'anthropic-skill-creator':'4f881c52d1f72f4cfb720e339e2d35c3058d01a9',
 'anthropic-mcp':'4f881c52d1f72f4cfb720e339e2d35c3058d01a9'
};
const SHA=/^[a-f0-9]{40}$/;
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');

export function checkOfficialIntegration(root=ROOT,{manifest=null,skills=null}={}){
 const errors=[],warnings=[];
 const source=manifest??JSON.parse(fs.readFileSync(path.join(root,'sources/official-skill-integration-v26.json'),'utf8'));
 const fail=x=>errors.push(x);
 if(source.schema!=='sense-official-skill-integration-v26')fail('INVALID_SCHEMA');
 if(!Array.isArray(source.records)||source.records.length<1||source.records.length>80)
   return {ok:false,errors:[...errors,'RECORD_ARRAY_INVALID'],warnings,records:0,skill_targets:0};
 if(source.upstream_count!==source.records.length)fail('SOURCE_COUNT_MISMATCH');
 const ids=new Set(),blobs=new Set(),targeted=new Set();
 for(const record of source.records){
  if(!record||typeof record!=='object'){fail('INVALID_RECORD');continue;}
  const id=record.id;
  if(!/^[a-z][a-z0-9-]{2,64}$/.test(String(id)))fail('BAD_SOURCE_ID:'+id);
  if(ids.has(id))fail('DUPLICATE_SOURCE_ID:'+id);ids.add(id);
  if(!(record.repository in AUTHORITIES)||AUTHORITIES[record.repository]!==record.authority)fail('UNVERIFIED_OWNER_CLAIM:'+id);
  if(!LICENSES[record.repository]?.has(record.license_basis))fail('LICENSE_NOT_VERIFIED:'+id);
  const legal=record.repository==='anthropics/skills'
    ?{path:String(record.skill_path).replace(/SKILL\\.md$/,'LICENSE.txt'),sha:ANTHROPIC_LICENSE_BLOBS[id]}
    :LICENSE_RECEIPTS[record.repository];
  if(!legal||record.license_evidence?.path!==legal.path||record.license_evidence?.blob_sha!==legal.sha)
    fail('LICENSE_RECEIPT_TAMPERED:'+id);
  if(!SHA.test(String(record.blob_sha))||record.git_blob_sha_immutable!==record.blob_sha)fail('BAD_OR_UNPINNED_BLOB:'+id);
  if(record.url!==`https://github.com/${record.repository}/blob/main/${record.skill_path}`||
     !/^skills\/[a-z0-9-_\/]+\/SKILL\.md$/.test(String(record.skill_path))||
     record.url_ref_mutable!==true)fail('SOURCE_PATH_INVALID:'+id);
  const key=record.repository+'/'+record.skill_path;
  if(blobs.has(key))fail('DUPLICATE_SOURCE_FILE:'+id);blobs.add(key);
  if(record.reviewed_exact_file!==true||record.execute_upstream_scripts!==false||
     record.install_state!=='REFERENCE_ONLY'||record.transfer!=='ORIGINAL_METHOD_ADAPTATION_NO_VENDOR_FILE_COPY')
    fail('UNSAFE_UPSTREAM_EXECUTION_OR_COPY:'+id);
  if(!Array.isArray(record.target_skills)||record.target_skills.length<1)fail('SOURCE_WITHOUT_OWNER:'+id);
  for(const skill of record.target_skills??[]){
   if(!/^[a-z][a-z0-9-]+$/.test(skill)){fail('BAD_SKILL_OWNER:'+id);continue;}
   targeted.add(skill);
   let text=skills?.[skill];
   if(text===undefined){try{text=fs.readFileSync(path.join(root,'.agents/skills',skill,'SKILL.md'),'utf8');}catch{fail('MISSING_TARGET_SKILL:'+skill);continue;}}
   const section=text.split('## V26 —')[1];
   if(!section)fail('TARGET_NOT_INTEGRATED_V26:'+skill);
   else if(!section.includes('`'+id+'`'))fail('SOURCE_NOT_ROUTED_IN_SKILL:'+id+':'+skill);
  }
 }
 if(!Array.isArray(source.supporting_sources)||source.supporting_sources.length<2)fail('VENDOR_REFERENCE_RULES_NOT_PINNED');
 else {
  for(const r of source.supporting_sources){
   if(r.repository!=='vercel-labs/agent-skills'||!SHA.test(String(r.blob_sha))||
      !['skills/web-design-guidelines/references/command.md','skills/react-best-practices/rules/async-parallel.md'].includes(r.path))
      fail('REFERENCE_RULE_SOURCE_INVALID');
  }
 }
 if(!ids.has('anthropic-skill-creator')||!ids.has('vercel-react')||!ids.has('cloudflare-router')||!ids.has('addy-cwv'))
  fail('CORE_UPSTREAM_FAMILIES_NOT_COVERED');
 if(source.records.some(x=>x.repository==='vercel-labs/agent-skills'))
  warnings.push('Vercel agent-skills README asserts MIT, but root LICENSE was unavailable; do not redistribute unlicensed upstream files.');
 warnings.push('This verifies locally committed upstream file provenance and handoff text, NOT current remote source authenticity or skill uplift.');
 return {
  schema:'sense-official-skill-gate-v26',
  ok:errors.length===0,status:errors.length?'FAIL':'SOURCE_PINNED_METHODS_ROUTED_ONLY',
  records:source.records.length,skill_targets:targeted.size,errors,warnings,
  skills_independently_field_evaluated:false,
  official_engineer_seniority_personally_verified:false,
  third_party_code_installed:false,production_traffic_or_revenue_verified:false
 };
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{
  const idx=process.argv.indexOf('--root'),root=idx>=0?path.resolve(process.argv[idx+1]):ROOT;
  const result=checkOfficialIntegration(root);
  console.log(JSON.stringify(result,null,2));if(!result.ok)process.exitCode=1;
 }catch(e){console.error('OFFICIAL_SKILL_GATE_HOLD: '+e.message);process.exitCode=2;}
}
