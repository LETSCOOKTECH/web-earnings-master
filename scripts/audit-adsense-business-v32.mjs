#!/usr/bin/env node
/**
 * V32: No-cost, offline-first, proof-aware opportunity and AdSense business gates.
 * This validator checks structure and internal consistency, NEVER authenticity,
 * Google approval, actual ranking or real external publisher payments.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const STAGES=Object.freeze([
 'MARKET_DEMAND','COMPETITOR_GAP','PRODUCT_ORACLE','SEARCH_DEPLOYMENT',
 'REAL_DISTRIBUTION','ADSENSE_SITE_ACCOUNT','RECONCILED_ECONOMICS'
]);
export const UNITS=Object.freeze({
 TRENDS_RELATIVE:'INDEX_0_100_NOT_MONTHLY_VOLUME',
 PLANNER_SEARCH_ESTIMATE:'MODELED_SEARCHES_PER_MONTH_BY_GEO',
 PLANNER_AD_COMPETITION:'ADVERTISER_AUCTION_NOT_SEO_DIFFICULTY',
 THIRD_PARTY_ORGANIC:'MODELED_ORGANIC_VISITS_NOT_GSC',
 PUBLIC_SERP:'OBSERVED_SERP_NOT_RANK_GUARANTEE',
 USER_PAIN:'QUALITATIVE_NONREPRESENTATIVE',
 COMPETITOR_TASK:'REPRODUCIBLE_OUTPUT_OR_ERROR',
 FIRST_PARTY_POLICY:'OFFICIAL_POLICY_OR_DOC_NARROW_CLAIM',
 OWN_SEARCH_CONSOLE:'PROPERTY_CLICKS_IMPRESSIONS',
 OWN_PRODUCT:'FULFILLED_HUMAN_TASKS',
 OWN_ADSENSE:'ACCOUNT_EARNINGS_AND_PAGEVIEWS',
 COST_RECEIPT:'BILLED_CASH_SPEND'
});
const isObj=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
const isText=(v,n=1)=>typeof v==='string'&&v.trim().length>=n;
const validDay=(day,now)=>{
 if(typeof day!=='string'||!/^20\d\d-\d\d-\d\d$/.test(day))return false;
 const time=Date.parse(day+'T00:00:00Z');
 return Number.isFinite(time)&&new Date(time).toISOString().slice(0,10)===day&&time<=now;
};
const validHttps=s=>{
 try{const u=new URL(s);return u.protocol==='https:'&&!u.username&&!u.password&&!/(^|\.)((example\.(com|org|net))|invalid|localhost|test)$/.test(u.hostname);}catch{return false;}
};
const samplePattern=/(?:guarantee(?:d|s)?\s*(?:#?1|top|ranking|adsense|traffic|revenue|profit)|(?:100%|always)\s*(?:approved|rank|profit)|unlimited\s*(?:adsense|revenue))/i;
export function checkResearchPacket(packet,{now=Date.now()}={}){
 const p=packet||{},errors=[],warnings=[],gates={};
 const fail=(s)=>errors.push(s);
 if(!isObj(p)||p.schema!=='sense-adsense-research-v32')fail('SCHEMA_INVALID');
 const job=p.job||{};
 if(!isText(job.id,4)||!isText(job.user_task,35)||!isText(job.target_user,15)||!isText(job.geo,2)||!isText(job.task_completion_oracle,35))fail('JOB_NOT_DEFINED_WITH_INDEPENDENT_ORACLE');
 if(isText(job.hypothesis)&&samplePattern.test(job.hypothesis))fail('GUARANTEED_OUTCOME_CLAIM');
 if(!validDay(p.researched_on,now))fail('RESEARCH_DATE_MISSING_OR_INVALID');
 const evidence=Array.isArray(p.evidence)?p.evidence:[];
 const ids=new Set(),unitsByKind=new Map(),independent=new Map();
 for(const e of evidence){
  if(!isObj(e)){fail('EVIDENCE_INVALID');continue;}
  if(!isText(e.id,4)||ids.has(e.id))fail('DUPLICATE_OR_MISSING_EVIDENCE_ID');ids.add(e.id);
  if(!(e.kind in UNITS)||e.unit!==UNITS[e.kind])fail('EVIDENCE_KIND_UNIT_MISMATCH:'+e.id);
  unitsByKind.set(e.kind,(unitsByKind.get(e.kind)||0)+1);
  if(!isText(e.origin_id,4))fail('INDEPENDENT_ORIGIN_MISSING:'+e.id);
  if(!isText(e.receipt,12)||!isText(e.observation,25))fail('RAW_RECEIPT_OR_OBSERVATION_MISSING:'+e.id);
  if(!validDay(e.observed_at,now))fail('EVIDENCE_DATE_INVALID:'+e.id);
  if(!validHttps(e.url))fail('HTTPS_REAL_SOURCE_URL_REQUIRED:'+e.id);
  const maxAge=e.kind==='FIRST_PARTY_POLICY'?45:180;
  if(validDay(e.observed_at,now)&&(now-Date.parse(e.observed_at+'T00:00:00Z'))/86400000>maxAge)warnings.push('STALE_REVERIFY:'+e.id);
  if(e.kind==='TRENDS_RELATIVE'&&('monthly_searches'in e||e.claimed_search_volume))fail('TRENDS_CANNOT_ASSERT_ABSOLUTE_VOLUME:'+e.id);
  if(e.kind==='PLANNER_AD_COMPETITION'&&('organic_keyword_difficulty'in e||e.claimed_easy_seo))fail('ADVERTISER_COMPETITION_NOT_ORGANIC_KD:'+e.id);
  if(e.kind==='THIRD_PARTY_ORGANIC'&&e.claimed_verified_traffic)fail('MODELED_TRAFFIC_NOT_REAL_GSC:'+e.id);
  if(e.kind==='OWN_ADSENSE'&&(e.claims_approved_without_account||e.traffic_from_proxies))fail('ADSENSE_RECEIPT_SAFETY_FAILURE:'+e.id);
  if(e.kind==='OWN_SEARCH_CONSOLE'&&e.claimed_ranking_guaranteed)fail('GSC_DOES_NOT_PREDICT_RANKINGS:'+e.id);
  if(e.kind==='FIRST_PARTY_POLICY'&&(!isText(e.claim_scope,25)||!e.url.startsWith('https://')))fail('OFFICIAL_POLICY_SCOPE_MISSING:'+e.id);
  if(isText(e.observation)&&samplePattern.test(e.observation))fail('UNSUPPORTED_EARNING_PROMISE:'+e.id);
  if(!independent.has(e.kind))independent.set(e.kind,new Set());
  independent.get(e.kind).add(e.origin_id);
 }
 const has=kind=>(unitsByKind.get(kind)||0)>0;
 const demandOrigin=new Set([...independent.get('USER_PAIN')||[],...independent.get('TRENDS_RELATIVE')||[],...independent.get('PLANNER_SEARCH_ESTIMATE')||[],...independent.get('OWN_SEARCH_CONSOLE')||[]]);
 gates.MARKET_DEMAND={pass:!!job.user_task&&demandOrigin.size>=2&&(has('USER_PAIN')||has('OWN_SEARCH_CONSOLE'))&&(has('TRENDS_RELATIVE')||has('PLANNER_SEARCH_ESTIMATE')||has('OWN_SEARCH_CONSOLE')),
  missing:['At least two independent first-party/user-demand origins; qualitative pain plus search behavior; site-specific region and task']};
 const competitors=Array.isArray(p.competitors)?p.competitors:[];
 const fixtureIds=new Set();
 for(const f of p.fixtures||[])if(isObj(f)&&isText(f.id)&&isText(f.input,5)&&isText(f.expected,10)&&isText(f.oracle,15))fixtureIds.add(f.id);
 const validComp=competitors.filter(c=>isObj(c)&&isText(c.domain,5)&&isText(c.fixture_id)&&fixtureIds.has(c.fixture_id)&&isText(c.observed_result,15)&&isText(c.weakness_or_counterevidence,25)&&isText(c.receipt,12));
 const compDomains=new Set(validComp.map(c=>c.domain.toLowerCase()));
 gates.COMPETITOR_GAP={pass:compDomains.size>=3&&has('PUBLIC_SERP')&&has('COMPETITOR_TASK')&&p.competitor_gap_confirmed_by_independent_test===true,
 missing:['3 separate competitors, same-input fixtures, dated public SERP, actual test receipts, counterevidence and human-confirmed weakness']};
 const fixtureKinds=new Set((p.fixtures||[]).filter(f=>fixtureIds.has(f.id)).map(f=>f.kind));
 const risks=p.product||{};
 gates.PRODUCT_ORACLE={pass:['NORMAL','MALFORMED','BOUNDARY'].every(k=>fixtureKinds.has(k))&&risks.independent_test_passed===true&&risks.security_review_passed===true&&risks.accessibility_review_passed===true&&isText(risks.build_receipt,12),
 missing:['Normal/malformed/boundary independent expected-result fixtures, security, accessibility, browser output testing']};
 const deploy=p.deployment||{};
 gates.SEARCH_DEPLOYMENT={pass:validHttps(deploy.production_url)&&deploy.owner_confirms_deployed===true&&deploy.robots_allows_googlebot===true&&deploy.noindex_removed===true&&deploy.canonical_checked===true&&deploy.real_gsc_inspection_receipt&&has('OWN_SEARCH_CONSOLE'),
 missing:['Live public HTTPS, robots, response, noindex, canonicals, HTML crawl, GSC property verification and observed performance']};
 const marketing=p.distribution||{};
 gates.REAL_DISTRIBUTION={pass:marketing.invalid_traffic_checks_passed===true&&marketing.forced_or_incentivized_ad_interactions===false&&marketing.proxies_or_fake_visitors===false&&has('OWN_PRODUCT')&&isText(marketing.human_acquisition_receipt,12),
 missing:['Owned acquisition/source receipt, legitimate users, completed tasks, no artificial clicks, repeat-use cohorts']};
 if(marketing.forced_or_incentivized_ad_interactions===true||marketing.proxies_or_fake_visitors===true||marketing.ad_click_exchange===true)fail('INVALID_TRAFFIC_RISK_HARD_STOP');
 const ads=p.adsense||{};
 gates.ADSENSE_SITE_ACCOUNT={pass:ads.site_status==='Ready'&&ads.owner_attests_real_google_account===true&&ads.publisher_value_review===true&&ads.current_policy_recheck===true&&ads.ad_placement_browser_review===true&&ads.consent_applicability_review===true&&isText(ads.account_evidence_receipt,12)&&has('FIRST_PARTY_POLICY'),
 missing:['Owner-authorized Google account status Ready, real original value, relevant current publisher policy, CMP and layout review']};
 if(ads.site_status==='Ready'&&ads.owner_attests_real_google_account!==true)fail('READY_CLAIM_WITHOUT_ACCOUNT_OWNER_ATTESTATION');
 const econ=p.economics||{};
 const numbers=['pageviews','estimated_earnings_usd','settled_revenue_usd','cash_costs_usd'];
 const goodNumbers=numbers.every(k=>typeof econ[k]==='number'&&Number.isFinite(econ[k])&&econ[k]>=0);
 const aligned=goodNumbers&&econ.estimated_earnings_usd>=econ.settled_revenue_usd;
 gates.RECONCILED_ECONOMICS={pass:aligned&&econ.pageviews>0&&has('OWN_ADSENSE')&&has('COST_RECEIPT')&&econ.owner_reconciled_cash===true&&isText(econ.settlement_receipt,12),
 missing:['Actual owner AdSense reporting + payout reconciled with pageviews, adjustments, bills, bank receipt and refunds']};
 if(goodNumbers&&!aligned)fail('SETTLED_EARNINGS_EXCEED_ESTIMATED_VERIFY_REPORTING');
 const stageDetails=STAGES.map((stage,index)=>({stage,passed:gates[stage].pass,
  dependencies_passed:STAGES.slice(0,index).every(k=>gates[k].pass),
  status:gates[stage].pass?'OPERATOR_PACKET_STRUCTURAL_PASS':'HOLD_MISSING_EVIDENCE',
  required:gates[stage].missing[0]}));
 const blockers=stageDetails.filter(x=>!x.passed).map(x=>x.stage);
 let revenue=null;
 if(gates.RECONCILED_ECONOMICS.pass&&goodNumbers)revenue={page_rpm_usd:econ.estimated_earnings_usd/econ.pageviews*1000,
  net_cash_usd:econ.settled_revenue_usd-econ.cash_costs_usd,as_reported_by_owner:true,independently_authenticated:false};
 return {schema:'sense-adsense-audit-v32',status:errors.length?'HOLD_INVALID':'EVIDENCE_PACKET_VALID_NOT_BUSINESS_CERTIFIED',
  errors:[...new Set(errors)],warnings:[...new Set(warnings)],stageDetails,blockers,
  authorized_to_build_automatically:false,ad_approval_verified_by_google:false,
  income_verified_by_bank:false,ranking_guarantee:false,traffic_from_third_party_verified:false,
  requires_human_source_and_account_verification:true,reconciled_owner_data:revenue};
}
export function calculateScenario({monthly_pageviews,page_rpm_usd,monthly_cash_costs_usd=0}={}){
 if(![monthly_pageviews,page_rpm_usd,monthly_cash_costs_usd].every(x=>typeof x==='number'&&Number.isFinite(x)&&x>=0))throw Error('NONNEGATIVE_FINITE_ASSUMPTIONS_REQUIRED');
 if(monthly_pageviews>1000000000||page_rpm_usd>10000||monthly_cash_costs_usd>1000000000)throw Error('HOLD_IMPLAUSIBLE_SCENARIO_INPUT');
 const gross=monthly_pageviews/1000*page_rpm_usd;
 return {kind:'HYPOTHETICAL_ONLY_NOT_PROVIDER_BENCHMARK',monthly_pageviews,page_rpm_usd,monthly_cash_costs_usd,gross_revenue_usd:gross,
  net_before_taxes_adjustments_usd:gross-monthly_cash_costs_usd,
  min_pageviews_to_cover_cash_costs:page_rpm_usd>0?Math.ceil(monthly_cash_costs_usd*1000/page_rpm_usd):null,
  does_not_predict_real_income:true};
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===path.resolve(process.argv[1])){
 try{
  const args=process.argv.slice(2),at=k=>{const i=args.indexOf(k);return i<0?null:args[i+1];};
  let result;
  if(args.includes('--packet')){
   const file=at('--packet'),s=fs.statSync(path.resolve(file));
   if(!s.isFile()||s.size>1000000)throw Error('PACKET_SIZE_LIMIT');
   result=checkResearchPacket(JSON.parse(fs.readFileSync(path.resolve(file),'utf8')));
  }else if(args.includes('--scenario')){
   const input=JSON.parse(at('--scenario'));
   result=calculateScenario(input);
  }else throw Error('USAGE: --packet file.json | --scenario JSON');
  process.stdout.write(JSON.stringify(result,null,2)+'\n');
  if(result.status==='HOLD_INVALID')process.exitCode=1;
 }catch(err){process.stderr.write('ADSENSE_RESEARCH_HOLD:'+err.message+'\n');process.exitCode=2;}
}
