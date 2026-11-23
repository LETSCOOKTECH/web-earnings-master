#!/usr/bin/env node
/**
 * Action-time evidence contract for consequential crawler/search/publisher decisions.
 * Structurally verifies task-time first-party readings. This cannot by itself confirm
 * the human/agent actually opened or interpreted the original provider body.
 * Do NOT use stored source registry alone to certify a production policy change.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
export const acceptedMethods=new Set(['ORIGINAL_BODY_INSPECTED','VERIFIED_OWNER_ACCOUNT_INSPECTED']);
export function checkActionEvidence(registry,artifact,{now=new Date(),maxAgeHours=24,requiredIds=[]}={}){
 const errors=[],all=registry?.claims||[];
 const known=new Map(all.map(c=>[c.id,c]));
 const chosen=Array.isArray(requiredIds)&&requiredIds.length?requiredIds:artifact?.required_claim_ids;
 if(!Array.isArray(chosen)||!chosen.length)errors.push('Required claim IDs must be explicit and nonempty');
 if(!artifact || typeof artifact!=='object')return {pass:false,errors:['Missing action evidence artifact']};
 if(typeof artifact.task!=='string'||artifact.task.trim().length<12)errors.push('Specify the material decision/task');
 const records=Array.isArray(artifact.records)?artifact.records:[];
 if(!records.length)errors.push('No action-time evidence records supplied');
 const ids=new Set();
 const nowTime=+new Date(now),ageLimit=maxAgeHours*3600000;
 if(!Number.isFinite(nowTime)||!Number.isFinite(maxAgeHours)||maxAgeHours<=0||maxAgeHours>168)errors.push('Invalid evaluation time or max-age-hours (1–168)');
 for(const r of records){
  if(ids.has(r.claim_id))errors.push('Duplicate claim_id: '+r.claim_id);
  ids.add(r.claim_id);
  const original=known.get(r.claim_id);
  if(!original){errors.push('Unknown claim ID '+r.claim_id);continue;}
  if(original.mode==='UNVERIFIED')errors.push(r.claim_id+': original provider body remains UNVERIFIED in registry');
  if(original.mode==='FUTURE'&&r.implementation_status==='CURRENTLY_ENFORCED')
   errors.push(r.claim_id+': FUTURE announced rule must not be asserted as currently enforced; re-read source and revise registry after actual effective/rollout evidence');
  if(!acceptedMethods.has(r.access_method))errors.push(r.claim_id+': must inspect original provider body or authorized account; snippet/hash insufficient');
  if(r.source_url!==original.source)errors.push(r.claim_id+': source URL differs from registered first-party URL; review and update ledger after official redirect');
  const stamp=typeof r.checked_at_utc==='string'?Date.parse(r.checked_at_utc):NaN;
  if(!Number.isFinite(stamp)||!(/Z$/.test(r.checked_at_utc||'')))errors.push(r.claim_id+': checked_at_utc must be valid UTC ISO timestamp');
  else if(Number.isFinite(ageLimit) && (nowTime-stamp>ageLimit||stamp-nowTime>300000))errors.push(r.claim_id+': source check is stale or in future');
  if(typeof r.source_section!=='string'||r.source_section.trim().length<3)errors.push(r.claim_id+': exact original page section needed');
  const excerpt=r.relevant_excerpt;
  if(typeof excerpt!=='string'||excerpt.trim().length<15||excerpt.length>240||excerpt.trim().split(/\s+/).length>25)
   errors.push(r.claim_id+': include 15–240 chars / at most 25 words of directly checked relevant original text');
  if(typeof r.applies_to!=='string'||r.applies_to.trim().length<10)errors.push(r.claim_id+': geography/product/account applicability missing');
  if(typeof r.reviewer!=='string'||r.reviewer.trim().length<2)errors.push(r.claim_id+': reviewer/agent identity missing');
  if(!['CURRENTLY_ENFORCED','FUTURE_OR_DRAFT','REFERENCE_NOT_PROVIDER_RULE','PREVIEW_NOT_UNIVERSAL'].includes(r.implementation_status))
   errors.push(r.claim_id+': temporal status missing/invalid');
  if(typeof r.test_or_account_evidence!=='string'||r.test_or_account_evidence.trim().length<10)
   errors.push(r.claim_id+': test evidence or explicit not-yet-available result required');
 }
 if(Array.isArray(chosen))for(const id of chosen)if(!ids.has(id))errors.push('Missing task-time evidence for required claim: '+id);
 return {pass:errors.length===0,errors,checked_records:records.length,required_claims:chosen||[],decision_label:'STRUCTURE_AND_TIMELINESS_ONLY_NOT_SEMANTIC_PROOF'};
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===path.resolve(process.argv[1])){
 const flags=process.argv.slice(2),arg=x=>{const n=flags.indexOf(x);return n<0?null:flags[n+1];};
 const file=arg('--file'),ids=flags.flatMap((x,i)=>x==='--claim-id'?[flags[i+1]]:[]);
 const age=arg('--max-age-hours')===null?24:Number(arg('--max-age-hours'));
 if(!file||!ids.length){console.error('Usage: node scripts/require-action-time-sources.mjs --file private/task-evidence.json --claim-id G-AI-NOLLM [--claim-id ...] [--max-age-hours 24]');process.exit(2);}
 const registry=JSON.parse(fs.readFileSync(path.resolve(import.meta.dirname,'../sources/verified_claims.json'),'utf8'));
 const artifact=JSON.parse(fs.readFileSync(path.resolve(file),'utf8'));
 const result=checkActionEvidence(registry,artifact,{requiredIds:ids,maxAgeHours:age});
 console.log(JSON.stringify(result,null,2));if(!result.pass)process.exitCode=1;
}
