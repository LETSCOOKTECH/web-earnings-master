import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const TARGETS=new Set(['US','GB','CA','AU']);
const realDomain=(s)=>{try{const u=new URL(s);return u.protocol==='https:'&&!/(^|\.)((localhost)|(example\.(com|org|net))|(test)|(invalid))$/i.test(u.hostname)}catch{return false}};
const nonempty=(s,n=5)=>typeof s==='string'&&s.trim().length>=n;
export function auditPortfolio(data){
 const errors=[], warnings=[];
 if(data?.schema!=='sense-tier1-market-v34')errors.push('WRONG_PORTFOLIO_SCHEMA');
 if(!Array.isArray(data?.sources)||data.sources.length<12)errors.push('SOURCE_LEDGER_INCOMPLETE');
 if(!Array.isArray(data?.candidates)||data.candidates.length<30)errors.push('CANDIDATE_HYPOTHESES_MISSING');
 const ids=new Set(), sourceIds=new Set();
 for(const s of data?.sources||[]){
  if(!nonempty(s.id)||sourceIds.has(s.id))errors.push('DUPLICATE_OR_MISSING_SOURCE');sourceIds.add(s.id);
  if(!realDomain(s.url))errors.push('UNSAFE_SOURCE_URL:'+s.id);
  if(!nonempty(s.kind)||!nonempty(s.reviewed)||!nonempty(s.caveat,10))errors.push('SOURCE_PROVENANCE_INCOMPLETE:'+s.id);
 }
 for(const c of data?.candidates||[]){
  if(!nonempty(c.id)||ids.has(c.id))errors.push('DUPLICATE_OR_MISSING_CANDIDATE');ids.add(c.id);
  if(!nonempty(c.job,12)||!Array.isArray(c.target_geos)||!c.target_geos.every(g=>TARGETS.has(g)))errors.push('BAD_USER_JOB_OR_GEO:'+c.id);
  if(c.source_ids?.some(s=>!sourceIds.has(s)))errors.push('UNKNOWN_SOURCE_ID:'+c.id);
  if(c.volume_us_month!==null && (typeof c.volume_us_month!=='number'||c.volume_us_month<0))errors.push('INVALID_MODELED_VOLUME:'+c.id);
  if(c.volume_us_month!==null&&c.geo_volume_verified?.US!=='THIRD_PARTY_MODELED')errors.push('MODELED_VOLUME_MISLABELED:'+c.id);
  if(c.adsense_rpm!=='UNKNOWN')errors.push('UNVERIFIED_PUBLISHER_RPM:'+c.id);
  if(c.real_serp_test!=='NOT_RUN'||c.same_input_competitor_test!=='NOT_RUN'||c.user_task_interview!=='NOT_RUN')warnings.push('UNVERIFIED_FIELD_RESULT_IN_RESEARCH_INDEX:'+c.id);
 }
 if(data?.candidate_count!==ids.size)errors.push('CANDIDATE_COUNT_MISMATCH');
 if(data?.gates_all_real_work_pending!==true)errors.push('PREMATURE_MARKET_APPROVAL');
 return {schema:'sense-tier1-portfolio-audit-v34',status:errors.length?'HOLD_INVALID':'RESEARCH_INDEX_STRUCTURAL_PASS_NOT_MARKET_VALIDATED',errors:[...new Set(errors)],warnings:[...new Set(warnings)],ranked_opportunity_verified:false,revenue_verified:false};
}
export function auditFieldPacket(p,{now=Date.now()}={}){
 const errors=[],hold=[],warnings=[];
 if(p?.schema!=='sense-tier1-field-packet-v34')errors.push('WRONG_PACKET_SCHEMA');
 if(!nonempty(p?.candidate_id))errors.push('MISSING_CANDIDATE_ID');
 if(!Number.isFinite(Date.parse(p?.researched_at))||Date.parse(p.researched_at)>now+86400000)errors.push('INVALID_RESEARCH_DATE');
 if(p?.artificial_traffic===true||p?.forced_or_incentivized_ad_clicks===true)errors.push('INVALID_TRAFFIC_HARD_STOP');
 if(p?.adsense_approval_claimed===true||p?.publisher_page_rpm_proven===true||p?.actual_gsc_claimed===true||p?.actual_pageviews_claimed===true)errors.push('UNAUTHENTICATED_EXTERNAL_OUTCOME_CLAIM');
 const kws=Array.isArray(p?.keyword_receipts)?p.keyword_receipts:[];
 const geos=new Set();
 for(const k of kws){
  if(!TARGETS.has(k?.country)||!nonempty(k?.keyword)||!realDomain(k?.source_url)||!nonempty(k?.original_export_receipt,12))errors.push('KEYWORD_RECEIPT_INVALID');
  if(!k||typeof k!=='object'){errors.push('KEYWORD_RECEIPT_INVALID');continue}
  if(k.metric==='GOOGLE_TRENDS_RELATIVE'&&('monthly_searches' in k||k.claimed_monthly_volume!==undefined))errors.push('TRENDS_VOLUME_FABRICATION');
  if(k?.metric==='ADVERTISER_CPC'&&(k?.publisher_rpm!==undefined||k?.organic_difficulty!==undefined))errors.push('ADVERTISER_TO_PUBLISHER_OR_SEO_CONFUSION');
  if(k.metric==='GKP_US_MONTHLY_SEARCHES'||k.metric==='GKP_COUNTRY_MONTHLY_SEARCHES'||k.metric==='MODELED_MONTHLY_SEARCHES'){
   if(typeof k?.searches!=='number'||k.searches<0)errors.push('KEYWORD_SEARCHES_UNIT_INVALID');
   if(k.metric==='GKP_US_MONTHLY_SEARCHES'&&k.country!=='US')errors.push('GKP_US_METRIC_WRONG_GEO');
   if(['GKP_US_MONTHLY_SEARCHES','GKP_COUNTRY_MONTHLY_SEARCHES'].includes(k.metric)&&k.export_authenticated_by_owner!==true)errors.push('UNAUTHENTICATED_GKP_CLAIM');
   if(['GKP_US_MONTHLY_SEARCHES','GKP_COUNTRY_MONTHLY_SEARCHES'].includes(k.metric)&&k.export_authenticated_by_owner===true)geos.add(k.country);
  }
 }
 if(!geos.has('US'))hold.push('US_KEYWORD_ACCOUNT_EXPORT_NOT_AUTHENTICATED');
 for(const geo of ['GB','CA','AU'])if(!geos.has(geo))hold.push(geo+'_KEYWORD_EXPORT_NOT_AUTHENTICATED');
 const fixtures=Array.isArray(p?.fixtures)?p.fixtures:[];
 const kind=new Set(fixtures.filter(x=>nonempty(x?.id)&&nonempty(x?.source_receipt,12)&&nonempty(x?.oracle,15)).map(x=>x.kind));
 if(!['NORMAL','MALFORMED','BOUNDARY'].every(k=>kind.has(k)))hold.push('INDEPENDENT_GOLDEN_FIXTURE_CLASSES_NOT_RUN');
 const observed=Array.isArray(p?.competitor_runs)?p.competitor_runs:[];
 const competitors=new Set(observed.filter(c=>realDomain(c?.site_url)&&nonempty(c?.actual_output_receipt,12)&&nonempty(c?.independent_test_receipt,12)).map(c=>new URL(c.site_url).hostname));
 if(competitors.size<3)hold.push('THREE_DISTINCT_COMPETITOR_OUTPUT_TESTS_NOT_RUN');
 const users=Array.isArray(p?.user_sessions)?p.user_sessions:[];
 if(users.filter(u=>nonempty(u?.consented_session_receipt,12)&&nonempty(u?.actual_file_task,20)).length<5)hold.push('FIVE_REAL_USER_SESSIONS_NOT_RUN');
 if(p?.product_oracle_confirmed!==true)hold.push('PRODUCT_INDEPENDENT_ORACLE_NOT_CONFIRMED');
 if(p?.owner_authorized!==true||p?.authentic_exports_confirmed!==true||p?.independent_reviewer_confirmed!==true)hold.push('INDEPENDENT_OWNER_EVIDENCE_NOT_CONFIRMED');
 if(p?.decision_requested==='GO'&&hold.length)errors.push('PREMATURE_GO_MISSING_EXTERNAL_EVIDENCE');
 return {schema:'sense-tier1-field-audit-v34',status:errors.length?'HOLD_INVALID':hold.length?'HOLD_DISCOVERY':'REVIEW_PACKET_STRUCTURAL_PASS_NOT_AUTHENTICATED',errors:[...new Set(errors)],hold:[...new Set(hold)],warnings,build_authorized_by_this_tool:false,ranking_verified:false,adsense_approval_verified:false,revenue_verified:false,source_artifact_authenticity_verified:false};
}
function main(argv){
 const arg=argv.indexOf('--portfolio');const pkt=argv.indexOf('--packet');
 if((arg<0)===(pkt<0)){process.stderr.write('Usage: node scripts/audit-tier1-opportunity-v34.mjs --portfolio FILE | --packet FILE\n');process.exitCode=2;return}
 const file=argv[arg>=0?arg+1:pkt+1];
 if(!file){process.exitCode=2;return}
 try{
  const obj=JSON.parse(fs.readFileSync(path.resolve(file),'utf8'));
  const result=arg>=0?auditPortfolio(obj):auditFieldPacket(obj);
  process.stdout.write(JSON.stringify(result,null,2)+'\n');
  if(result.status==='HOLD_INVALID')process.exitCode=1;
 }catch(e){process.stderr.write('Unable to read evidence file: '+String(e.message)+'\n');process.exitCode=2}
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main(process.argv.slice(2));
