#!/usr/bin/env node
/**
 * The schema checks an operator's evidence ledger, not authenticity/market demand.
 * Even a structurally valid REAL_OPERATOR_EVIDENCE brief cannot certify market success.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const obj=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
const str=(v,n=1)=>typeof v==='string'&&v.trim().length>=n;
const allowedKinds=new Map([
 ['HUMAN_REPORT','QUALITATIVE'],['INTERVIEW','QUALITATIVE'],
 ['SEARCH_ESTIMATE','MODELED_MONTHLY_SEARCHES'],['TRENDS_RELATIVE','RELATIVE_INDEX_0_100'],
 ['OWN_GSC','PROPERTY_IMPRESSIONS'],['PROVIDER_DOC','DOCUMENTED_POLICY']
]);
const badPromise=/(guaranteed.{0,35}(?:rank|traffic|profit|adsense|#1)|(?:rank|position)\s*#?1\s*(?:guaranteed|always)|automatically approved (?:by )?adsense)/i;
const fakeHost=h=>/(?:^|\.)(?:example\.com|example\.net|example\.org|localhost|local|invalid|test)$/.test(h);

export function evaluateOpportunity(input,{now=Date.now()}={}){
 const errors=[],warnings=[],d=input;
 const error=s=>errors.push(s);
 if(!obj(d))return {status:'FAIL',errors:['Brief must be an object'],warnings};
 if(d.schema!=='sense-opportunity-v22')error('Wrong evidence schema');
 const mode=d.study?.mode;
 if(!['SYNTHETIC','REAL_OPERATOR_EVIDENCE'].includes(mode))error('Unknown study mode');
 if(!str(d.study?.locale,2)||!str(d.study?.question_scope,12)||!Number.isFinite(Date.parse(d.study?.preregistered_at)))
  error('Study must be preregistered with locale and actual question scope');
 if(!str(d.user_job?.task,25)||!str(d.user_job?.target_user,8)||!str(d.user_job?.positive_oracle,16))
  error('Missing actual human job, audience or independent output oracle');
 const fixtures=d.fixtures;
 if(!Array.isArray(fixtures)||fixtures.length<3)error('Three independent fixtures are required');
 else {
  const kinds=new Set(),ids=new Set();
  for(const f of fixtures){
   if(!obj(f)){error('Null/invalid fixture record');continue;}
   if(!str(f.id)||ids.has(f.id))error('Duplicate/invalid fixture ID');
   ids.add(f.id);kinds.add(f.kind);
   if(!str(f.input_artifact,8)||!str(f.expected_result,12)||!str(f.oracle_method,14))
    error('Fixture needs actual input, expected output and independent oracle');
  }
  for(const name of ['NORMAL','MALFORMED','ADVERSARIAL'])if(!kinds.has(name))error('Missing '+name+' fixture');
 }
 const competitors=d.competitors;
 if(!Array.isArray(competitors)||competitors.length<2)error('At least two competing substitutes required');
 else {
  const seen=new Set();
  for(const c of competitors){
   if(!obj(c)){error('Invalid competitor entry');continue;}
   if(!str(c.name,2)||seen.has(c.name.toLowerCase()))error('Duplicate or missing competitor name');
   else seen.add(c.name.toLowerCase());
   if(!str(c.input_fixture_id)||!str(c.observed_output_artifact,8)||
      !str(c.limitations,20)||!['BETTER','WORSE','SIMILAR','INCONCLUSIVE'].includes(c.comparison))
    error('Competitor requires same-input fixture, output artifact, honest limitations and comparison');
   if(Array.isArray(fixtures)&&!fixtures.some(f=>f?.id===c.input_fixture_id))error('Competitor references nonexistent fixture');
  }
 }
 const sources=d.sources;
 if(!Array.isArray(sources)||sources.length<2)error('At least two dated research records required');
 else {
  const unique=new Set(),usedArtifacts=new Set(),kinds=new Set();
  for(const s of sources){
   if(!obj(s)){error('Null/invalid source');continue;}
   if(!str(s.id)||unique.has(s.id))error('Duplicated or missing source ID');
   else unique.add(s.id);
   const requiredUnit=allowedKinds.get(s.kind);
   if(!requiredUnit||s.unit!==requiredUnit)error('Source kind has incompatible units: '+String(s.id));
   kinds.add(s.kind);
   if(!str(s.observation,20)||!str(s.artifact,8)||usedArtifacts.has(s.artifact))error('Missing/duplicated raw evidence receipt');
   usedArtifacts.add(s.artifact);
   const date=Date.parse(s.observed_at);
   if(!Number.isFinite(date)||date>now+5*60_000)error('Invalid/future source review timestamp');
   let url;
   try{url=new URL(s.url)}catch{error('Invalid original URL: '+String(s.id));continue;}
   if(!['http:','https:'].includes(url.protocol)||url.username||url.password)error('Unsafe source link: '+String(s.id));
   if(mode==='REAL_OPERATOR_EVIDENCE'&&(url.protocol!=='https:'||fakeHost(url.hostname)))
    error('Real evidence may not be from example/reserved/unsecured host: '+String(s.id));
  }
  if(kinds.size<2)error('Need at least two independent evidence categories, not repeated versions of same source');
 }
 if(!obj(d.distribution)||!Array.isArray(d.distribution.channels)||!d.distribution.channels.some(x=>str(x,8)))
  error('Missing credible acquisition channel hypothesis');
 if(!obj(d.economics)||!str(d.economics.currency,3)||
    !Number.isFinite(d.economics.variable_cost_per_1000)||d.economics.variable_cost_per_1000<0||
    !str(d.economics.assumptions,20))error('Unit economics must have bounded nonnegative cost and labeled assumptions');
 if(!Array.isArray(d.claims))error('Must include claims array, even if empty');
 else if(d.claims.some(c=>!str(c)||badPromise.test(c)))error('False guaranteed rank/revenue/publisher success claim');
 if(mode==='REAL_OPERATOR_EVIDENCE'&&!str(d.owner_review?.reviewer,3))
  warnings.push('Named independent owner reviewer missing; source receipts unauthenticated');
 warnings.push('Original market receipts, competitors and actual economic assumptions cannot be authenticated by this local validator.');
 const status=errors.length?'FAIL':mode==='SYNTHETIC'?'SYNTHETIC_NOT_MARKET_PROVEN':'STRUCTURAL_ONLY_OWNER_REVIEW_REQUIRED';
 return {status,errors,warnings,source_count:Array.isArray(sources)?sources.length:0,
  competitor_count:Array.isArray(competitors)?competitors.length:0,
  verified_market_demand:false,verified_search_traffic:false,
  verified_ai_recommendation:false,verified_publisher_earnings:false};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const at=process.argv.indexOf('--file'),file=at>=0?process.argv[at+1]:null;
 if(!file){console.error('Usage: node scripts/evaluate-tool-opportunity-v22.mjs --file BRIEF.json');process.exit(2);}
 try{
  const d=JSON.parse(fs.readFileSync(path.resolve(file),'utf8'));
  const result=evaluateOpportunity(d);console.log(JSON.stringify(result,null,2));
  if(result.status==='FAIL')process.exitCode=1;
 }catch(e){console.error('Opportunity audit failed: '+e.message);process.exitCode=1;}
}
