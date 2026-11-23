import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Offline evidence verifier only. It NEVER logs in, scrapes, spends credits, sends posts, or buys services.
export const KINDS=new Set(['first_party_owner','official_provider','original_user_report','public_market_observation','licensed_estimate','competitor_product_test','prototype_test','expert_interview','hypothesis']);
export const PILLARS=new Set(['demand','human_pain','competition','distribution','feasibility','economics']);
export const DECISIONS=new Set(['GO_FOR_MVP','TEST_FIRST','PIVOT','REJECT','INSUFFICIENT_EVIDENCE','STOP_POLICY']);
export const SPEND_TYPES=new Set(['api_credits','browser_actions','llm_tokens','research_minutes','monetary']);
export const STAGES=['triage','desk_research','deep_validation','pilot'];
export const HIGH_RISK=new Set(['unauthorized_scrape','captcha_bypass','proxy_evasion','terms_violation','exfiltration','credentials_requested','private_person_data','data_purchase_unapproved','unbounded_spend','fake_human_evidence','product_harm','unlicensed_dataset']);
export const OBSERVATION_TYPES=new Set(['observed','quoted','estimated','modeled','inferred','hypothesis','unknown']);
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const MAX_AGE_DAYS={demand:120,human_pain:365,competition:120,distribution:120,feasibility:180,economics:90};
const isStr=(s,min=3)=>typeof s==='string'&&s.trim().length>=min;
const finite=(v)=>typeof v==='number'&&Number.isFinite(v)&&v>=0;
const iso=(s)=>typeof s==='string'&&!Number.isNaN(Date.parse(s));
const d=(s)=>new Date(s).getTime();
function hostname(url){try{const u=new URL(url);return u.protocol==='https:'&&!u.username&&!u.password?u.hostname.toLowerCase():null;}catch{return null;}}
export function isPlaceholderUrl(url){const h=hostname(url);return !h||/^(?:localhost|.*\.localhost|(?:.*\.)?example\.(?:org|com|net)|(?:.*\.)?invalid|(?:.*\.)?test)$/.test(h);}
export function normalizeIdeaScope(idea){
 return [idea?.job,idea?.customer,idea?.geography,idea?.language,idea?.product].map(s=>String(s||'').trim().toLowerCase()).join(' | ');
}
export function validateBudget(b){
 const errs=[];
 if(!b||typeof b!=='object')return ['budget object required'];
 for(const k of ['max_browser_actions','max_sources','max_llm_tokens','max_research_minutes','max_paid_api_units','max_cash_usd'])
  if(!finite(b[k]))errs.push('Invalid or unbounded budget '+k);
 if(b.max_sources>200||b.max_browser_actions>500||b.max_llm_tokens>5_000_000||b.max_research_minutes>1200)errs.push('Budget exceeds mandatory review ceiling');
 if(b.spent)for(const [k,limit] of Object.entries({
  browser_actions:'max_browser_actions',sources:'max_sources',llm_tokens:'max_llm_tokens',
  research_minutes:'max_research_minutes',paid_api_units:'max_paid_api_units',cash_usd:'max_cash_usd'})){
  if(!finite(b.spent[k]))errs.push('Missing/invalid consumed budget '+k);
  else if(finite(b[limit])&&b.spent[k]>b[limit])errs.push('Spent exceeds cap '+k);
 }
 return errs;
}
export function checkSource(e,now=Date.now()){
 const err=[];
 if(!e||typeof e!=='object')return ['Evidence object required'];
 if(!isStr(e.id)||!PILLARS.has(e.pillar)||!KINDS.has(e.kind)||!OBSERVATION_TYPES.has(e.observation_type))err.push('Evidence classification incomplete');
 if(!hostname(e.url))err.push('Evidence needs normal HTTPS original URL');
 if(!iso(e.observed_at)||d(e.observed_at)>now+60_000)err.push('Evidence timestamp invalid or future');
 if(!isStr(e.query)||!isStr(e.geo,2)||!isStr(e.claim,12))err.push('Query/geo/claim missing');
 if(!isStr(e.method)||!isStr(e.source_platform))err.push('Capture method/provider missing');
 if(!isStr(e.independence_group))err.push('Independence group needed for de-duplication');
 if(!['SUPPORTS','CONTRADICTS','NEUTRAL'].includes(e.direction))err.push('Direction must retain negative evidence');
 if(!['DIRECT_EXPORT','OWNER_ANALYTICS','MANUAL_BROWSER','AUTHORIZED_API','PUBLIC_SEARCH_RESULT','INTERVIEW','SIMULATED'].includes(e.capture_mode))err.push('Invalid capture mode');
 if(!['OPENED_ORIGINAL','SOURCE_SNIPPET','ACCOUNT_EXPORT','USER_REPORTED','UNVERIFIED'].includes(e.access))err.push('Original-access status missing');
 if(!isStr(e.artifact))err.push('Capture artifact path or reproducible link missing');
 if(e.capture_mode==='SIMULATED'||e.access==='UNVERIFIED'||isPlaceholderUrl(e.url))err.push('Synthetic/placeholder source cannot count as external evidence');
 if(e.observation_type==='observed'&&e.access==='SOURCE_SNIPPET')err.push('Snippet cannot be first-hand observed page');
 if(e.kind==='original_user_report'&&e.human_verified===true)err.push('Public account is not verified human identity');
 if(e.kind==='licensed_estimate'&&e.observation_type==='observed')err.push('Estimated volume is not owner-observed traffic');
 if(e.metric){
  if(!isStr(e.metric.name)||!isStr(e.metric.unit)||!['absolute','relative_index','estimate','qualitative'].includes(e.metric.scale))err.push('Metric units/scale required');
  if(e.metric.value!==null&&!finite(e.metric.value))err.push('Invalid metric');
  if(e.source_platform==='google_trends'){
   if(e.metric.scale!=='relative_index')err.push('Google Trends UI is relative, never absolute monthly searches');
   if(finite(e.metric.value)&&e.metric.value>100)err.push('Google Trends index outside 0..100');
   if(e.metric.value===0&&e.claim.toLowerCase().includes('no demand'))err.push('Trends zero never proves zero demand');
   if(!e.metric.comparison_context||!isStr(e.metric.comparison_context.time_window)||!isStr(e.metric.comparison_context.geo,2)||!isStr(e.metric.comparison_context.term_or_topic))err.push('Trends comparison context incomplete');
  }
  if(e.source_platform==='google_keyword_planner'&&e.metric.name==='competition'&&e.metric.unit==='organic_difficulty')err.push('Keyword Planner competition is advertiser competition, not organic KD');
  if(['semrush','ahrefs'].includes(e.source_platform)&&e.metric.name==='competitor_organic_visits'&&e.metric.scale!=='estimate')err.push('Third-party competitor visits are modeled');
 }
 if(iso(e.observed_at)&&PILLARS.has(e.pillar)){
  const age=(now-d(e.observed_at))/86_400_000;
  if(age>MAX_AGE_DAYS[e.pillar])err.push('Evidence stale for '+e.pillar+' '+Math.floor(age)+' days');
 }
 return err;
}
export function validatePlan(plan,now=Date.now()){
 const errs=[];
 if(!plan||plan.schema!=='sense-opportunity-v1')return ['Unexpected opportunity schema'];
 if(!STAGES.includes(plan.stage))errs.push('Unknown research stage');
 const idea=plan.idea||{};
 for(const k of ['name','job','customer','geography','language','product','desired_output'])
  if(!isStr(idea[k],k==='geography'?2:3))errs.push('Idea '+k+' required');
 if(!Array.isArray(idea.constraints)||!idea.constraints.length)errs.push('Explicit constraints required');
 errs.push(...validateBudget(plan.budget));
 if(!Array.isArray(plan.evidence))errs.push('Evidence array required');
 else{
  const ids=new Set();
  for(const e of plan.evidence){
   if(ids.has(e.id))errs.push('Duplicate evidence id '+e.id);ids.add(e.id);
   const failures=checkSource(e,now);for(const v of failures)errs.push((e.id||'unknown')+': '+v);
  }
 }
 if(!Array.isArray(plan.risk_flags))errs.push('Risk flags array required');
 if(typeof plan.license_approved!=='boolean'||typeof plan.owner_authorized!=='boolean')errs.push('Permission flags required');
 if(!Array.isArray(plan.tests))errs.push('Test array required');
 if(!plan.decision||!DECISIONS.has(plan.decision.requested))errs.push('Requested decision required');
 return errs;
}
export function assessOpportunity(plan,{now=Date.now()}={}){
 const structure=validatePlan(plan,now);
 if(structure.length)return {valid:false,decision:'INSUFFICIENT_EVIDENCE',errors:structure,build_authorized:false};
 const risks=plan.risk_flags.filter(r=>HIGH_RISK.has(r));
 if(risks.length)return {valid:true,decision:'STOP_POLICY',hard_stops:risks,build_authorized:false,errors:[]};
 const validEvidence=plan.evidence.map(e=>({record:e,failures:checkSource(e,now)})).filter(x=>x.failures.length===0).map(x=>x.record);
 const byPillar=Object.fromEntries([...PILLARS].map(p=>[p,validEvidence.filter(e=>e.pillar===p)]));
 const independently=Object.fromEntries(Object.entries(byPillar).map(([p,rows])=>[p,new Set(rows.filter(x=>x.direction==='SUPPORTS').map(x=>x.independence_group)).size]));
 const contradictions=validEvidence.filter(x=>x.direction==='CONTRADICTS');
 const gaps=[];
 for(const p of PILLARS)if(independently[p]===0)gaps.push('No independent supporting evidence for '+p);
 if(independently.human_pain<2)gaps.push('Require at least two independent user-pain contexts, not two replies in one thread');
 if(!byPillar.demand.some(x=>['MANUAL_BROWSER','DIRECT_EXPORT','AUTHORIZED_API','OWNER_ANALYTICS'].includes(x.capture_mode)))gaps.push('No actual primary demand observation/export');
 if(!byPillar.competition.some(x=>x.kind==='competitor_product_test'&&x.capture_mode!=='SIMULATED'))gaps.push('No actual same-input competitor test');
 if(!plan.tests.some(x=>x.kind==='prototype_oracle'&&x.status==='PASS'&&x.artifact&&x.synthetic!==true))gaps.push('No actual working output-oracle fixture');
 if(!plan.tests.some(x=>x.kind==='acquisition_pilot'&&x.status==='PASS'&&x.artifact&&x.synthetic!==true))gaps.push('No real user acquisition test');
 if(!plan.tests.some(x=>x.kind==='cost_scenario'&&x.status==='PASS'&&x.artifact&&x.synthetic!==true))gaps.push('No costed workload scenario');
 const measuredUser=validEvidence.some(x=>x.kind==='first_party_owner'&&x.pillar==='demand'&&x.direction==='SUPPORTS');
 const independenceFamilies=new Set(validEvidence.filter(x=>x.direction==='SUPPORTS').map(x=>x.kind));
 if(independenceFamilies.size<3)gaps.push('Insufficient heterogeneous source classes');
 if(contradictions.length)gaps.push('Contradictory evidence requires documented adjudication');
 if(!plan.license_approved)gaps.push('Source usage licensing/terms unverified');
 if(!plan.owner_authorized)gaps.push('No authorization to spend or build');
 const gates={
  valid_sources:validEvidence.length,
  independent_support_groups:new Set(validEvidence.filter(x=>x.direction==='SUPPORTS').map(x=>x.independence_group)).size,
  source_families:independenceFamilies.size,
  per_pillar:independently,
  contradicting_sources:contradictions.map(x=>x.id),
  measured_owner_demand:measuredUser,
  budget_within_limit:validateBudget(plan.budget).length===0,
  prototype_fixture:plan.tests.some(x=>x.kind==='prototype_oracle'&&x.status==='PASS'&&x.synthetic!==true),
  acquisition_pilot:plan.tests.some(x=>x.kind==='acquisition_pilot'&&x.status==='PASS'&&x.synthetic!==true)
 };
 // The evaluator never certifies a business opportunity merely from a collection of estimates.
 // A human must adjudicate source context and independently inspect the evidence.
 let decision='TEST_FIRST';
 if(plan.stage==='triage'&&validEvidence.length===0)decision='INSUFFICIENT_EVIDENCE';
 if(plan.decision.requested==='REJECT'||plan.decision.requested==='PIVOT')decision=plan.decision.requested;
 if(plan.decision.requested==='GO_FOR_MVP'&&gaps.length===0&&plan.decision.human_reviewer_approved===true)decision='GO_FOR_MVP';
 if(plan.decision.requested==='GO_FOR_MVP'&&decision!=='GO_FOR_MVP')decision='TEST_FIRST';
 return {valid:true,decision,errors:[],gaps,gates,build_authorized:decision==='GO_FOR_MVP',human_review_required:true,source_count_not_proof:true,
  rationale:'Offline validation is structural only; no verified external page, account or human identity is supplied by the evaluator.'};
}
export function safeSourceSnapshot(snapshot){
 const {cookie,authorization,token,email,api_key,username,password,personal_data,raw_html,...safe}=snapshot||{};
 return safe;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const idx=process.argv.indexOf('--file');
 const fname=idx!==-1?process.argv[idx+1]:path.join(ROOT,'templates/opportunity/idea.example.json');
 if(!fname){console.error('Missing --file value');process.exit(2);}
 try{
  const plan=JSON.parse(fs.readFileSync(fname,'utf8'));
  const r=assessOpportunity(plan,{now:plan?.simulation_now?Date.parse(plan.simulation_now):Date.now()});
  console.log(JSON.stringify(r,null,2));
  if(!r.valid||(process.argv.includes('--require-go')&&r.decision!=='GO_FOR_MVP'))process.exitCode=1;
 }catch(e){console.error(e.message);process.exitCode=1;}
}
