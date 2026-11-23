#!/usr/bin/env node
// Bounded hosting comparison. Uses ONLY caller-provided normalized workload and verified plan assumptions.
// No network account, no real invoice, no provider endorsement.
import fs from 'node:fs';import path from 'node:path';import {pathToFileURL} from 'node:url';
const URLok=s=>{try{return new URL(s).protocol==='https:'}catch{return false}};
export function evaluateHostingOptions(x){
 const errors=[],out=[];
 if(!x||typeof x!=='object'||!Array.isArray(x.candidates)||x.candidates.length===0)return {status:'FAIL',errors:['candidates array required'],candidates:[]};
 if(!Array.isArray(x.required_capabilities)||x.required_capabilities.length===0)errors.push('required_capabilities must describe workload');
 if(!x.workload_id||!x.business_model)errors.push('workload_id and business_model required');
 for(const [i,p] of x.candidates.entries()){
  const name=p.provider+' / '+p.plan,fail=[],unknown=[],why=[];
  if(!p.provider||!p.plan)fail.push('missing provider or plan');
  if(!URLok(p.official_pricing_source)||!URLok(p.commercial_terms_source))unknown.push('official pricing and terms sources not verified');
  if(!/^\d{4}-\d{2}-\d{2}$/.test(p.checked_on||''))unknown.push('dated source verification missing');
  if(p.commercial_use==='prohibited'&&x.business_model==='commercial_ad_supported')fail.push('commercial plan restriction');
  else if(p.commercial_use!=='allowed')unknown.push('commercial permission unknown');
  const supports=Array.isArray(p.supports)?p.supports:[];
  for(const needed of x.required_capabilities||[])if(!supports.includes(needed))fail.push('missing required capability '+needed);
  if(!Number.isFinite(p.monthly_fixed_usd)||p.monthly_fixed_usd<0)unknown.push('missing quoted fixed cost');
  if(!Number.isFinite(p.modeled_variable_usd)||p.modeled_variable_usd<0)unknown.push('missing workload-normalized variable cost');
  if(!Array.isArray(p.unpriced_cost_categories))unknown.push('unpriced cost categories not assessed');
  else if(p.unpriced_cost_categories.length)unknown.push('cost categories unpriced: '+p.unpriced_cost_categories.join(', '));
  if(p.real_capacity_load_tested!==true)unknown.push('actual workload/load acceptance not verified');
  const subtotal=Number.isFinite(p.monthly_fixed_usd)&&Number.isFinite(p.modeled_variable_usd)?Number((p.monthly_fixed_usd+p.modeled_variable_usd).toFixed(2)):null;
  out.push({name,status:fail.length?'DISQUALIFIED':unknown.length?'UNKNOWN_OR_MODEL_ONLY':'CANDIDATE_VALIDATED_IN_SCOPE',known_subtotal_usd:subtotal,fail,unknown});
 }
 const qualified=out.filter(x=>x.status!=='DISQUALIFIED');
 const allValidated=qualified.length>0&&qualified.every(x=>x.status==='CANDIDATE_VALIDATED_IN_SCOPE');
 const best=allValidated?[...qualified].sort((a,b)=>a.known_subtotal_usd-b.known_subtotal_usd)[0].name:null;
 return {status:errors.length?'FAIL':'MODEL_ONLY',workload_id:x.workload_id,required_capabilities:x.required_capabilities,business_model:x.business_model,errors,candidates:out,
 lowest_validated_plan_only:best,disclaimer:'Provider comparisons require matching workloads, current commercial rights, all materially priced meters and real load tests; absent proof means no universal cheapest host.'};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 const i=process.argv.indexOf('--file');if(i<0||!process.argv[i+1]){console.error('Usage: node scripts/evaluate-hosting-options.mjs --file <input.json>');process.exitCode=2;}
 else try{const r=evaluateHostingOptions(JSON.parse(fs.readFileSync(process.argv[i+1],'utf8')));console.log(JSON.stringify(r,null,2));if(r.status==='FAIL')process.exitCode=1;}catch(e){console.error(String(e));process.exitCode=2;}
}
