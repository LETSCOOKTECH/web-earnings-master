#!/usr/bin/env node
/**
 * Strict keyword research provenance and user-job/page architecture gate.
 * Structural validity is not independent verification of owned/GSC/Planner/
 * Trends/third-party measurements, customer demand or Google rank.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {validateAtlas} from './seo-source-capture-v13.mjs';

export const KINDS=new Set(['HYPOTHESIS','TRENDS_NORMALIZED','ADS_PLANNER_ESTIMATE','THIRD_PARTY_ESTIMATE','OWNER_GSC_OBSERVED','SERP_OBSERVATION','HUMAN_EVIDENCE']);
export const METRICS={
 HYPOTHESIS:{numeric:false,source:null},
 TRENDS_NORMALIZED:{numeric:true,source:'google-trends',unit:'relative_index_0_100'},
 ADS_PLANNER_ESTIMATE:{numeric:true,source:'google-keyword-planner',unit:'estimated_monthly_searches'},
 THIRD_PARTY_ESTIMATE:{numeric:true,source:null,unit:'modeled_searches_per_month'},
 OWNER_GSC_OBSERVED:{numeric:true,source:'gsc-api-query',unit:'owned_property_impressions'},
 SERP_OBSERVATION:{numeric:false,source:null},
 HUMAN_EVIDENCE:{numeric:false,source:null}
};
const isString=(s,n=1)=>typeof s==='string'&&s.trim().length>=n;
const isRoute=s=>typeof s==='string'&&/^\/(?:[a-z0-9_-]+\/)*$/.test(s);
const iso=s=>typeof s==='string'&&!Number.isNaN(Date.parse(s))&&/^\d{4}-\d{2}-\d{2}(?:T|$)/.test(s);
const YEAR=86400*365*1000;
export function validateKeywordResearch(bundle,atlas,{now=Date.now()}={}){
 const errors=[],unknown=[],warnings=[],observed=[],testedPages=[];
 const registry=validateAtlas(atlas);
 if(!registry.valid)return {valid:false,status:'INVALID',errors:['Curated source registry invalid'],unknown,warnings};
 if(bundle?.schema!=='sense-keyword-research-v13'||!Array.isArray(bundle?.clusters))
  return {valid:false,status:'INVALID',errors:['Invalid keyword research schema/clusters'],unknown,warnings};
 const target=bundle.market||{};
 if(!isString(target.country,2)||!isString(target.language,2)||!['mobile','desktop','both'].includes(target.device)||!isString(target.primary_human_job,15))
  errors.push('Target market must include country, language, device and specific primary human job');
 if(!bundle.clusters.length)errors.push('At least one task cluster required');
 const jobs=new Map(),paths=new Map(),ids=new Set(),queryMap=new Map();
 for(const c of bundle.clusters){
  if(!isString(c?.id,3)||ids.has(c.id))errors.push('Missing/duplicate cluster id '+String(c?.id));ids.add(c.id);
  if(!isString(c.job,15))errors.push('Missing specific validated user job '+String(c?.id));
  if(!isString(c.primary_query,4))errors.push('Missing natural-language query '+String(c?.id));
  if(!['tool_now','learn','compare','troubleshoot','brand','transactional','mixed'].includes(c.intent))errors.push('Unknown search intent '+String(c?.id));
  if(!isRoute(c.page))errors.push('Invalid canonical page route '+String(c?.page));
  const job=String(c.job||'').trim().toLowerCase(),query=String(c.primary_query||'').trim().toLowerCase();
  if(jobs.has(job)&&jobs.get(job)!==c.page)errors.push('Same user job scattered over doorway routes '+c.page);
  if(paths.has(c.page)&&paths.get(c.page)!==job)errors.push('Distinct tasks conflict on one canonical route '+c.page);
  jobs.set(job,c.page);paths.set(c.page,job);
  if(queryMap.has(query)&&queryMap.get(query)!==c.page)warnings.push('Same primary query maps to competing page families '+query);
  queryMap.set(query,c.page);
  if(c.intent==='tool_now'&&!isString(c.output_oracle,8))errors.push('Working output oracle required for tool-intent '+c.id);
  if(c.meta_keywords||c.keyword_density||c.guaranteed_rank||c.page_rpm_from_advertiser_cpc)
   errors.push('Spam/fictional publisher-rank tactic '+c.id);
  const records=c.evidence;
  if(!Array.isArray(records)||!records.length){errors.push('Every task cluster needs at least an explicit HYPOTHESIS record '+c.id);continue}
  const distinct=new Set();
  for(const ev of records){
   const kind=ev?.kind,rule=METRICS[kind];
   if(!KINDS.has(kind)){errors.push('Invalid metric type in '+c.id);continue}
   if(distinct.has(kind))warnings.push('Repeated same evidence type; independence not proven '+c.id+' '+kind);
   distinct.add(kind);
   if(kind==='HYPOTHESIS'){
    if(ev.value!==undefined||ev.volume!==undefined||ev.source_id!==undefined||ev.cpc!==undefined)
     errors.push('Unmeasured HYPOTHESIS cannot contain numeric or source-derived metrics '+c.id);
    unknown.push('Demand unmeasured for '+c.id);continue;
   }
   if(rule.numeric){
    if(!Number.isFinite(ev.value)||ev.value<0)errors.push('Numeric evidence needs finite nonnegative number '+c.id+' '+kind);
    if(ev.unit!==rule.unit)errors.push('Metric unit conflated in '+c.id+' '+kind);
    if(kind==='TRENDS_NORMALIZED'&&(ev.value<0||ev.value>100))errors.push('Trends normalized interest must be in 0..100 '+c.id);
    if(kind==='ADS_PLANNER_ESTIMATE'&&(ev.organic_keyword_difficulty!==undefined||ev.publisher_rpm!==undefined))
     errors.push('Advertiser metrics cannot be treated as organic KD or publisher RPM '+c.id);
    if(kind==='THIRD_PARTY_ESTIMATE'&&ev.google_internal_ranking_weight!==undefined)
     errors.push('Third-party KD is not Google private rank weighting '+c.id);
   }else if(ev.value!==undefined)errors.push('Non-numeric source kind cannot assert numeric value '+c.id);
   if(!isString(ev.source_url,12)||!iso(ev.observed_at)||!isString(ev.access_method,5)||!isString(ev.capture_reference,7))
    errors.push('Missing original source, time, permitted access mode or artifact reference '+c.id+' '+kind);
   else{
    let url;try{url=new URL(ev.source_url)}catch{errors.push('Bad evidence URL '+c.id);continue}
    if(url.protocol!=='https:'||url.username||url.password)errors.push('Evidence must use owner/permitted HTTPS source '+c.id);
    const age=now-Date.parse(ev.observed_at);
    if(age>YEAR||age< -300000)warnings.push('Stale/future-looking market observation '+c.id+' '+kind);
   }
   if(rule.source&&ev.source_id!==rule.source)errors.push('Wrong first-party source ID for '+kind+' '+c.id);
   if(ev.source_id){
    const a=atlas.entries.find(s=>s.id===ev.source_id);
    if(!a)errors.push('Unknown source id '+ev.source_id);
    // This registry cannot prove account authorization even when source ID exists.
   }
   unknown.push('External provenance/permissions/metric accuracy require independent inspection '+c.id+' '+kind);
   observed.push({cluster:c.id,kind,source_id:ev.source_id||null,claimed_value:ev.value??null,reviewed_independently:false});
  }
  testedPages.push(c.page);
 }
 if(bundle.estimated_traffic||bundle.guaranteed_search_rank||bundle.adSense_approved||bundle.verified_user_demand===true)
  errors.push('Cannot self-declare estimated traffic as actual, guaranteed rank, approved publisher or verified demand');
 const valid=!errors.length;
 return {valid,status:!valid?'FAIL':'STRUCTURAL_PASS_EXTERNAL_EVIDENCE_UNVERIFIED',errors,warnings,unknown,
 clusters:bundle.clusters.length,distinct_pages:new Set(testedPages).size,records:observed,
 verified_keyword_volume:false,verified_organic_rank:false,verified_traffic:false,verified_adsense_revenue:false,
 disclaimer:'Structural provenance and unit validator only. A file with plausible source URLs cannot verify real exports, customer demand, Google rank or owner accounts. Original tool/GUI/license and account evidence require separate review.'};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const a=process.argv.slice(2),arg=x=>{const i=a.indexOf(x);return i<0?null:a[i+1];};
 const file=arg('--file'),atlasFile=arg('--atlas')||path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../sources/seo_v13_primary_atlas.json');
 if(!file){console.error('Usage: node scripts/seo-keyword-provenance-v13.mjs --file keyword-research.json');process.exit(2)}
 try{
  const o=validateKeywordResearch(JSON.parse(fs.readFileSync(file,'utf8')),JSON.parse(fs.readFileSync(atlasFile,'utf8')));
  console.log(JSON.stringify(o,null,2));if(!o.valid)process.exitCode=1;
 }catch(e){console.error(String(e?.message||e));process.exitCode=2}
}
