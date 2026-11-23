import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const FAMILIES = Object.freeze([
 'organic_search','ai_search','video','social','visual','community','q_and_a','launch','developer',
 'integration','institutional','editorial','partnership','owned','referral','paid','local','other'
]);
export const SCORE_WEIGHTS=Object.freeze({
 audienceFit:25,assetValue:20,permission:15,speed:15,measurability:15,compounding:10
});
export const HARD_STOP_FLAGS=new Set([
 'traffic_inflation','engagement_manipulation','unauthorized_automation',
 'deceptive_promotion','privacy_leakage','search_manipulation',
 'unbounded_spend','invalid_ad_traffic','click_exchange','fake_reviews',
 'bulk_unsolicited_messages','paid_to_click','credential_abuse'
]);
export const CAUTION_FLAGS=new Set(['policy_unknown','misaligned_user_job','unverified_value','publisher_warning']);
const EXPECTED_SCHEMA='traffic-hunter-v1';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const CAMPAIGN_KEYS=['source','medium','campaign','content','term'];
const SENSITIVE_KEYS=/^(?:email|e-mail|user_id|userid|name|first_name|last_name|phone|mobile|address|filename|file|path|token|access_token|refresh_token|api_key|apikey|password|session|secret|credential|ip|ip_address)$/i;
const TAG=/^[a-z0-9][a-z0-9._-]{0,63}$/i;
const MAX_REVIEW_AGE=24*60*60*1000;
const NO_AUTOMATED_PUBLISHING=new Set(['community','q_and_a','launch','social','video','developer','institutional','editorial']);

function safeText(s,min=3,max=1200){return typeof s==='string'&&s.trim().length>=min&&s.length<=max;}
function validNumber(n){return typeof n==='number'&&Number.isFinite(n)&&n>=0;}
function parseTime(t){return typeof t==='string'?Date.parse(t):NaN;}
function isReservedHost(host){
 return host==='localhost'||host.endsWith('.localhost')||host==='example.com'||host.endsWith('.example.com')
 ||host==='example.org'||host.endsWith('.example.org')||host==='example.net'||host.endsWith('.example.net')
 ||host.endsWith('.example')||host.endsWith('.invalid')||host==='test'||host.endsWith('.test');
}
export function urlAssessment(value,{production=false}={}){
 try{
  const u=new URL(value);
  if(u.protocol!=='https:'||!u.hostname||u.username||u.password)return {ok:false,reason:'HTTPS URL without credentials required'};
  for(const [key] of u.searchParams)if(SENSITIVE_KEYS.test(key))return {ok:false,reason:'Sensitive query parameter: '+key};
  if(production&&isReservedHost(u.hostname))return {ok:false,reason:'Example/private placeholder destination not production evidence'};
  if(u.hostname.includes('..'))return {ok:false,reason:'Malformed host'};
  return {ok:true,url:u.toString(),host:u.hostname};
 }catch{return {ok:false,reason:'Invalid URL'};}
}
export function buildExternalCampaignUrl(destination,tags,{internal=false}={}){
 if(internal)throw new Error('UTM parameters belong on inbound external campaigns, never internal navigation');
 const inspected=urlAssessment(destination,{production:true});
 if(!inspected.ok)throw new Error(inspected.reason);
 const url=new URL(inspected.url);
 if([...url.searchParams.keys()].some(k=>k.toLowerCase().startsWith('utm_')))throw new Error('Existing UTM fields would overwrite attribution');
 for(const required of ['source','medium','campaign'])
  if(!TAG.test(tags?.[required]||''))throw new Error('Missing or unsafe UTM '+required);
 for(const key of Object.keys(tags||{}))if(!CAMPAIGN_KEYS.includes(key))throw new Error('Unsupported UTM key: '+key);
 for(const key of CAMPAIGN_KEYS)if(tags[key]!==undefined){
  if(!TAG.test(tags[key]))throw new Error('Unsafe UTM '+key);
  url.searchParams.set('utm_'+key,tags[key].toLowerCase());
 }
 return url.toString();
}
const AI_HOSTS=['chatgpt.com','chat.openai.com','perplexity.ai','claude.ai','gemini.google.com','copilot.microsoft.com'];
const hostMatch=(host,domain)=>host===domain||host.endsWith('.'+domain);
export function attributeArrival({referrer=null,utm_source=null,utm_medium=null}={}){
 const ref=urlAssessment(referrer||'');
 if(ref.ok){
  const isAI=AI_HOSTS.some(domain=>hostMatch(ref.host,domain));
  if(isAI)return {channel:'ai_referral_observed',certainty:'referrer_observed',source:ref.host};
 }
 if(safeText(utm_source,2,64)&&safeText(utm_medium,2,64))
  return {channel:'campaign_declared',certainty:'utm_not_user_verified',source:utm_source};
 if(ref.ok)return {channel:'unverified_referral',certainty:'referrer_observed',source:ref.host};
 return {channel:'unknown',certainty:'not_observed',source:null};
}
export function scoreCandidate(scores){
 if(!scores||typeof scores!=='object')throw new Error('Scores required');
 let total=0;
 for(const [key,weight] of Object.entries(SCORE_WEIGHTS)){
  const n=scores[key];if(!Number.isInteger(n)||n<0||n>5)throw new Error('Each ordinal score must be an integer 0..5: '+key);
  total+=(n/5)*weight;
 }
 return Math.round(total);
}
export function calculateObservedEconomics(o){
 if(o===null||o===undefined)return {status:'UNKNOWN',cost_per_completion:null,contribution:null,task_success_rate:null};
 if(typeof o!=='object'||Array.isArray(o))throw new Error('Observed metrics must be an object');
 const metrics=['qualified_sessions','task_starts','validated_completions','attributed_revenue','media_spend','incremental_cost','sessions'];
 for(const key of metrics)if(o[key]!==null&&o[key]!==undefined&&!validNumber(o[key]))throw new Error('Invalid/negative observed '+key);
 const sessions=o.sessions??null,qualified=o.qualified_sessions??null,starts=o.task_starts??null,success=o.validated_completions??null;
 if(qualified!==null&&sessions!==null&&qualified>sessions)throw new Error('Qualified sessions exceed all sessions');
 if(starts!==null&&success!==null&&success>starts)throw new Error('Validated completions exceed task starts');
 const spend=o.media_spend??null,cost=o.incremental_cost??null,revenue=o.attributed_revenue??null;
 const task_success_rate=starts!==null&&success!==null&&starts>0?success/starts:null;
 const cost_per_completion=success!==null&&success>0&&spend!==null&&cost!==null?(spend+cost)/success:null;
 const contribution=spend!==null&&cost!==null&&revenue!==null?revenue-spend-cost:null;
 return {status:success===null?'UNKNOWN':(success===0?'NO_COMPLETIONS':'OBSERVED_COUNTS'),task_success_rate,cost_per_completion,contribution,
 caveat:'Outputs represent supplied observed data; no automatic verification of analytics, invoices or human identity.'};
}
export function policyFresh(policy,now=Date.now()){
 if(!policy||policy.status!=='verified'||policy.original_body_opened!==true)return false;
 const t=parseTime(policy.reviewed_at);
 return Number.isFinite(t)&&t<=now+60_000&&t>=now-MAX_REVIEW_AGE&&urlAssessment(policy.url).ok;
}
export function validateManifest(m){
 const errors=[];
 if(!m||typeof m!=='object'||Array.isArray(m)||m.schema!==EXPECTED_SCHEMA)return ['Unknown traffic-hunter schema'];
 if(!m.site||!safeText(m.site.name)||!safeText(m.site.user_job)||!urlAssessment(m.site.url).ok)errors.push('Site identity/job/HTTPS URL missing');
 if(!m.constraints||typeof m.constraints.owner_authorized!=='boolean'||typeof m.constraints.ads_monetized!=='boolean'||!validNumber(m.constraints.paid_budget_limit))errors.push('Owner, publisher and budget controls missing');
 if(!Array.isArray(m.candidates)||m.candidates.length===0)errors.push('At least one candidate needed');
 if(!Array.isArray(m.global_risk_flags))errors.push('Explicit global risk flags array required');
 const ids=new Set();
 for(const c of m.candidates||[]){
  if(!c||typeof c!=='object'){errors.push('Candidate must be an object');continue;}
  if(!safeText(c.id)||ids.has(c.id))errors.push('Invalid or duplicate channel ID');
  else ids.add(c.id);
  if(!FAMILIES.includes(c.family))errors.push(c.id+': unknown channel family');
  for(const k of ['channel','audience','value_asset','method'])if(!safeText(c[k]))errors.push(c.id+': '+k+' required');
  if(!urlAssessment(c.landing_url).ok)errors.push(c.id+': invalid destination');
  if(!urlAssessment(c.source_url).ok)errors.push(c.id+': invalid demand source URL');
  if(!c.policy||!urlAssessment(c.policy.url).ok||!['verified','needs_review','prohibited'].includes(c.policy.status))
   errors.push(c.id+': source policy URL and status required');
  if(!['manual','no_publication'].includes(c.publication_mode))errors.push(c.id+': unsupported publication mode');
  if(typeof c.approval!=='boolean')errors.push(c.id+': explicit owner approval required');
  if(!Array.isArray(c.risk_flags))errors.push(c.id+': risk flags required');
  if(!validNumber(c.planned_cost))errors.push(c.id+': cost must be finite and non-negative');
  try{scoreCandidate(c.score);}catch(e){errors.push(c.id+': '+e.message);}
 }
 return errors;
}
export function evaluateCandidate(c,site,constraints,globalFlags=[],now=Date.now(),demo=false){
 const score=scoreCandidate(c.score);
 const risks=[...globalFlags,...(c.risk_flags||[])];
 const hard=risks.filter(x=>HARD_STOP_FLAGS.has(x));
 const unclassified=risks.filter(x=>!HARD_STOP_FLAGS.has(x)&&!CAUTION_FLAGS.has(x));
 const issues=[];
 if(hard.length)issues.push('HARD_STOP: '+hard.join(','));
 if(c.policy.status==='prohibited')issues.push('HARD_STOP: platform policy explicitly prohibits');
 if(c.planned_cost>constraints.paid_budget_limit)issues.push('HARD_STOP: exceeds authorized budget limit');
 if(c.family==='paid'&&!(constraints.paid_budget_limit>0))issues.push('HARD_STOP: paid channel has no spend cap');
 if(c.publication_mode!=='manual'&&c.publication_mode!=='no_publication')issues.push('HARD_STOP: publication automation unsupported');
 if(!site.verified_working||!safeText(site.task_fixture))issues.push('HOLD: verified working product fixture required');
 if(demo||!urlAssessment(c.landing_url,{production:true}).ok)issues.push('HOLD: demo/placeholder destination not publishable');
 if(!policyFresh(c.policy,now))issues.push('HOLD: current original platform policy review required');
 if(c.approval!==true||constraints.owner_authorized!==true)issues.push('HOLD: publication requires owner-specific authorization');
 if(unclassified.length)issues.push('HOLD: unclassified risk flags '+unclassified.join(','));
 if(risks.some(x=>CAUTION_FLAGS.has(x)))issues.push('HOLD: source/user safety caveat must be reviewed');
 if(constraints.ads_monetized&&constraints.consent_recheck_required===true)issues.push('HOLD: monetization and consent confirmation required');
 const status=issues.some(x=>x.startsWith('HARD_STOP'))?'STOP':issues.length?'HOLD':'READY_FOR_HUMAN_REVIEW';
 return {id:c.id,family:c.family,channel:c.channel,ordinal_priority:score,status,issues,
 source:c.source_url,landing_url:c.landing_url,allowed_remote_actions:false,
 warning:'Ordinal score is not predicted visits, probability of ranking, or approval.'};
}
export function evaluateTrafficPlan(m,now=Date.now()){
 const errors=validateManifest(m);
 if(errors.length)return {valid:false,errors,remote_actions:false,candidates:[]};
 const items=m.candidates.map(c=>evaluateCandidate(c,m.site,m.constraints,m.global_risk_flags,now,m.demo===true)).sort((a,b)=>b.ordinal_priority-a.ordinal_priority||a.id.localeCompare(b.id));
 const ready=items.filter(x=>x.status==='READY_FOR_HUMAN_REVIEW');
 return {valid:true,errors:[],remote_actions:false,stage:m.site.stage,
 summary:{total:items.length,ready_for_review:ready.length,hold:items.filter(x=>x.status==='HOLD').length,stop:items.filter(x=>x.status==='STOP').length},
 suggested_pilots:ready.slice(0,3).map(x=>({id:x.id,priority:x.ordinal_priority,status:x.status})),
 candidates:items,disclaimer:'Planning and contract validation only. No live posting, SEO ranking, traffic, attribution or AdSense approval verified.'};
}
export function auditSourceRegistry(reg){
 const errors=[];
 if(!reg||!Array.isArray(reg.records)||reg.records.length<15)return ['Source registry incomplete'];
 const ids=new Set();
 for(const s of reg.records){
  if(ids.has(s.id))errors.push('Duplicate registry key '+s.id);
  ids.add(s.id);
  if(!urlAssessment(s.url).ok)errors.push('Source must be HTTPS: '+s.id);
  if(!['opened_primary_page','search_confirmed'].includes(s.verification))errors.push('Unknown verification state '+s.id);
  if(!/^\d{4}-\d{2}-\d{2}$/.test(s.review_date||''))errors.push('Missing review date '+s.id);
 }
 return errors;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const idx=process.argv.indexOf('--file');
 const manifestFile=idx>=0?process.argv[idx+1]:path.join(ROOT,'templates/traffic-hunter/opportunity-plan.example.json');
 if(!manifestFile){console.error('Missing --file argument');process.exit(1);}
 try{
  const manifest=JSON.parse(fs.readFileSync(manifestFile,'utf8'));
  const sources=JSON.parse(fs.readFileSync(path.join(ROOT,'sources/traffic_hunter_sources_2026_11_23.json'),'utf8'));
  const sourceErrors=auditSourceRegistry(sources);
  const result=evaluateTrafficPlan(manifest);
  if(sourceErrors.length){result.valid=false;result.errors.push(...sourceErrors);}
  console.log(JSON.stringify(result,null,2));
  if(!result.valid||(process.argv.includes('--require-ready')&&result.summary.ready_for_review===0))process.exitCode=1;
 }catch(e){console.error('Traffic Hunter audit failed: '+e.message);process.exitCode=1;}
}
