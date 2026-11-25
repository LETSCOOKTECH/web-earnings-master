#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const validStage=new Set(['RESEARCH_ONLY','LOCAL_PRODUCT_VERIFIED','BUILD_ONLY_NOT_DEPLOYED','EXTERNAL_HTTP_OBSERVED','EXTERNAL_BUSINESS_OBSERVED']);
const okObj=o=>o!==null&&typeof o==='object'&&!Array.isArray(o);
const plain=(x,n=8)=>typeof x==='string'&&x.trim().length>=n;
const checkedURL=s=>{try{const u=new URL(s);return u.protocol==='https:'&&!u.username&&!u.password}catch{return false}};
const reserved=s=>{try{const h=new URL(s).hostname.toLowerCase();return ['example.com','example.org','example.net','localhost','test','invalid'].some(d=>h===d||h.endsWith('.'+d))}catch{return true}};
const date=s=>Number.isFinite(Date.parse(s||''))?Date.parse(s):NaN;
export function evaluateToolCreator(input,{now=Date.now()}={}){
 const errors=[],warnings=[];
 if(!okObj(input))return {status:'INVALID',errors:['Input must be an object'],warnings};
 if(input.schema!=='sense-tool-creator-brief-v22')errors.push('Wrong schema');
 const job=input.job;
 if(!okObj(job)||!plain(job.persona,8)||!plain(job.input,8)||!plain(job.output,8)||!plain(job.geo,2)||!plain(job.user_pain,20))errors.push('Missing concrete user job, location, input/output or pain');
 const market=Array.isArray(input.market_evidence)?input.market_evidence:[];
 const origins=new Set(),ids=new Set();
 for(const [i,s] of market.entries()){
  if(!okObj(s)){errors.push('Market source record invalid '+i);continue;}
  if(!plain(s.id,2)||ids.has(s.id))errors.push('Duplicate/invalid source id '+i);
  ids.add(s.id);
  if(!checkedURL(s.url)||!checkedURL(s.origin_url))errors.push('Source URL invalid '+i);
  const origin=String(s.origin_url||'').toLowerCase().replace(/\/+$/,'');
  if(origins.has(origin))errors.push('Duplicated originating market evidence '+i);
  origins.add(origin);
  if(!plain(s.claim,20))errors.push('No scoped evidence claim '+i);
  const time=date(s.observed_at);
  if(!Number.isFinite(time)||time>now+300000||time<Date.parse('2015-01-01'))errors.push('Invalid source date '+i);
  if(!['USER_COMPLAINT','DIRECT_INTERVIEW','PUBLIC_SERP','ESTIMATED_KEYWORD','INSTITUTIONAL_REQUIREMENT'].includes(s.kind))errors.push('Unknown evidence kind '+i);
  if(s.kind==='ESTIMATED_KEYWORD'){
   const v=s.metric;
   if(!okObj(v)||!Number.isFinite(v.value)||v.value<0||!['TRENDS_INDEX_0_100','ESTIMATED_SEARCHES_MONTH','PAID_AD_COMPETITION','ESTIMATED_THIRD_PARTY_TRAFFIC'].includes(v.unit))errors.push('Invalid explicit metric unit '+i);
   if(v?.unit==='TRENDS_INDEX_0_100'&&v.value>100)errors.push('Trends sampled normalized index cannot exceed 100 '+i);
  }
 }
 const rivals=Array.isArray(input.competitors)?input.competitors:[];
 const rivalIds=new Set();
 for(const [i,c] of rivals.entries()){
  if(!okObj(c)){errors.push('Competitor record invalid '+i);continue;}
  if(!plain(c.name,3)||!checkedURL(c.url))errors.push('Missing real competitor identity '+i);
  const id=String(c.name||'').toLowerCase().trim();
  if(rivalIds.has(id))errors.push('Duplicated competitor '+i);rivalIds.add(id);
  if(!plain(c.common_fixture_id,5)||!plain(c.observed_output,12)||!plain(c.limit_or_weakness,12))errors.push('Missing same-input rival result '+i);
  const time=date(c.tested_at);
  if(!Number.isFinite(time)||time>now+300000)errors.push('Invalid competitor test date '+i);
 }
 if(rivals.filter(okObj).length>=2&&new Set(rivals.filter(okObj).map(c=>c.common_fixture_id)).size!==1)errors.push('Competitors were not tested on the same fixture');
 const architecture=input.architecture;
 if(!okObj(architecture)||!['BROWSER_LOCAL','STATIC_WORKER','BOUND_SERVER_API','QUEUE_STORAGE','AI_INFERENCE'].includes(architecture.mode)||!Number.isFinite(architecture.estimated_cost_per_1000_jobs_usd)||architecture.estimated_cost_per_1000_jobs_usd<0||!plain(architecture.max_input,3)||!plain(architecture.failure_budget,12))errors.push('Architecture does not declare bounded execution and costs');
 if(architecture?.mode==='AI_INFERENCE'&&architecture.estimated_cost_per_1000_jobs_usd===0)warnings.push('Zero cost for third-party AI inference requires direct proof, not a guess');
 const release=input.release;
 if(!okObj(release)||!validStage.has(release.stage))errors.push('Unknown release stage');
 if(release?.stage==='EXTERNAL_HTTP_OBSERVED'||release?.stage==='EXTERNAL_BUSINESS_OBSERVED')
  errors.push('Self-reported external evidence cannot be certified by a local brief; independent owner browser/account review required');
 if(release?.public_url&&reserved(release.public_url))errors.push('Reserved documentation URL cannot represent a live website');
 const claims=input.claims;
 if(!okObj(claims)||Object.values(claims).some(v=>typeof v!=='boolean'))errors.push('Outcome flags must be explicit booleans');
 else{
  for(const key of ['guaranteed_rank_one','ad_network_approved','real_traffic_verified','ai_recommendation_observed','live_public_host_verified']){
   if(claims[key]===true)errors.push('External result '+key+' cannot be self-certified by the brief');
  }
 }
 if(errors.length)return {status:'INVALID',errors,warnings,source_count:market.length,rival_count:rivals.length,external_proof_verified:false};
 if(input.synthetic!==false||market.length<2||rivals.length<2||market.every(s=>s.kind==='ESTIMATED_KEYWORD')||market.some(s=>reserved(s.origin_url))){
  warnings.push('Insufficient independently authenticated market and rival evidence; test before build');
  return {status:'RESEARCH_REQUIRED',errors,warnings,source_count:market.length,rival_count:rivals.length,external_proof_verified:false};
 }
 return {status:'STRUCTURAL_CANDIDATE_REVIEW_REQUIRED',errors,warnings,source_count:market.length,rival_count:rivals.length,
  external_proof_verified:false,
  note:'Sources, competitor outcomes and human demand are not independently authenticated by JSON fields. No market GO, Google rank, published site or publisher approval is certified.'};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const i=process.argv.indexOf('--file');
 if(i===-1||!process.argv[i+1]){console.error('Usage: node scripts/evaluate-tool-creator-v22.mjs --file BRIEF.json');process.exit(2)}
 try{const payload=JSON.parse(fs.readFileSync(process.argv[i+1],'utf8'));
  const r=evaluateToolCreator(payload);console.log(JSON.stringify(r,null,2));
  if(r.status==='INVALID')process.exitCode=1;
 }catch(e){console.error('INVALID creator brief: '+e.message);process.exitCode=1}
}
