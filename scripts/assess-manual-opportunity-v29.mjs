#!/usr/bin/env node
/**
 * Zero-paid-credit research provenance bridge.
 * Validates operator-entered receipts, never authenticates market data itself.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
export function inspectManualEvidence(packet,{now=Date.now()}={}){
 const errors=[],warnings=[];
 if(packet?.schema!=='sense-free-research-v29')errors.push('SCHEMA_UNKNOWN');
 const records=packet?.receipts;
 if(!Array.isArray(records)||records.length<3)errors.push('THREE_INDEPENDENT_RECEIPTS_REQUIRED');
 else {
  const types=new Set(),independence=new Set();
  for(const r of records){
   if(!['TRENDS_RELATIVE','COMPETITOR_SAME_TASK','PUBLIC_CPC_PROXY'].includes(r?.type))errors.push('UNSUPPORTED_TYPE');
   else types.add(r.type);
   if(typeof r?.artifact!=='string'||r.artifact.length<8)errors.push('ARTIFACT_PATH_MISSING');
   if(typeof r?.observed_at!=='string'||!Number.isFinite(Date.parse(r.observed_at))||Date.parse(r.observed_at)>now)errors.push('INVALID_DATE');
   if(typeof r?.independence_group!=='string'||!r.independence_group.trim()||independence.has(r.independence_group))errors.push('NOT_INDEPENDENT');
   independence.add(r.independence_group);
   try{const u=new URL(r.url);if(u.protocol!=='https:'||u.username||u.password)errors.push('SOURCE_MUST_BE_HTTPS');}
   catch{errors.push('SOURCE_URL_INVALID');}
   if(typeof r.observation!=='string'||r.observation.trim().length<24)errors.push('OBSERVATION_TOO_VAGUE');
   if(r.type==='TRENDS_RELATIVE'){
    if(r.control!=='csv to json')errors.push('MISSING_CONTROL_ANCHOR');
    if(r.unit!=='NORMALIZED_GOOGLE_TRENDS_0_100')errors.push('TRENDS_UNIT_INVALID');
    if(!r.artifact.toLowerCase().endsWith('.csv'))errors.push('RAW_TRENDS_CSV_REQUIRED');
   }
   if(r.type==='PUBLIC_CPC_PROXY'&&r.claimed_seo_traffic)errors.push('CPC_NOT_PROOF_OF_SEO_TRAFFIC');
  }
  for(const type of ['TRENDS_RELATIVE','COMPETITOR_SAME_TASK','PUBLIC_CPC_PROXY'])if(!types.has(type))errors.push('RECEIPT_TYPE_MISSING:'+type);
 }
 if(packet?.paid_api_required===true)warnings.push('PAID_API_NOT_REQUIRED_BUT_ORIGINAL_RECEIPTS_ARE');
 warnings.push('Operator receipt URLs and CSVs remain UNAUTHENTICATED until originals and dates are inspected.');
 warnings.push('Google Trends values 0–100 are comparative search-interest indices, not searches per month.');
 return {schema:'sense-free-research-audit-v29',status:errors.length?'HOLD_MALFORMED':'STRUCTURAL_ONLY_HUMAN_REVIEW',
  errors:[...new Set(errors)],warnings,source_count:records?.length||0,verified_market_demand:false,verified_keyword_search_volume:false,verified_traffic:false,automatically_approved_to_build:false};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const i=process.argv.indexOf('--file');
 try{if(i<0)throw Error('--file required');const doc=JSON.parse(fs.readFileSync(path.resolve(process.argv[i+1]),'utf8'));
 const r=inspectManualEvidence(doc);console.log(JSON.stringify(r,null,2));if(r.errors.length)process.exitCode=1;}
 catch(e){console.error('MANUAL_RESEARCH_HOLD:'+e.message);process.exitCode=2;}
}
