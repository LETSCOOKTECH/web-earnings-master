import {assessOpportunity,validatePlan,PILLARS} from './evaluate-opportunity.mjs';
export function huntWebTools(batch,{now=Date.now()}={}){
 if(batch?.schema!=='sense-tool-hunter-v25'||!Array.isArray(batch.candidates)||batch.candidates.length<1||batch.candidates.length>30)throw Error('Expected 1-30 complete candidate plans');
 const ids=new Set();
 const candidates=batch.candidates.map(c=>{
  if(typeof c?.id!=='string'||ids.has(c.id)||!c.plan||!['SYNTHETIC_TEST','OWNER_EXPORT','OPERATOR_RESEARCH'].includes(c.evidence_source))throw Error('Invalid candidate or evidence origin');
  ids.add(c.id);
  const errors=validatePlan(c.plan,now),result=assessOpportunity(c.plan,{now});
  const rows=c.plan.evidence||[];
  const per_pillar=Object.fromEntries([...PILLARS].map(p=>[p,new Set(rows.filter(e=>e.pillar===p&&e.direction==='SUPPORTS').map(e=>e.independence_group)).size]));
  const synthetic=c.evidence_source==='SYNTHETIC_TEST'||rows.some(e=>e.capture_mode==='SIMULATED');
  const state=errors.length?'INVALID':result.decision==='STOP_POLICY'?'POLICY_STOP':synthetic?'SYNTHETIC_ONLY':result.candidate_for_human_review?'HUMAN_REVIEW':'RESEARCH_REQUIRED';
  return {id:c.id,job:c.plan.idea?.job||'',state,decision:result.decision,source_rows:rows.length,per_pillar,
   supported_pillars:Object.values(per_pillar).filter(n=>n>0).length,
   contradictions:rows.filter(e=>e.direction==='CONTRADICTS').map(e=>e.id),
   gaps:result.gaps||errors,automatically_authorized_to_build:false,
   actual_demand_verified:false,actual_traffic_verified:false,actual_revenue_verified:false};
 });
 const order={HUMAN_REVIEW:0,RESEARCH_REQUIRED:1,SYNTHETIC_ONLY:2,INVALID:3,POLICY_STOP:4};
 candidates.sort((a,b)=>order[a.state]-order[b.state]||b.supported_pillars-a.supported_pillars||a.id.localeCompare(b.id));
 return {schema:'sense-tool-hunter-results-v25',state:'TRIAGE_ONLY_NOT_MARKET_PROVEN',
   ranking_basis:'Structural independent evidence coverage; NOT actual popularity or profitability',
   candidates,requires:['Original source authentication','Same-input product results','User demand','Unit costs','Human approval']};
}
