#!/usr/bin/env node
// AEO offline claim/answer eligibility review. Explicit UNKNOWN on external indexing.
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
export function auditAnswerPage(page){
 const errors=[],warnings=[],unknown=[];
 if(!page||typeof page!=='object')return {status:'FAIL',errors:['Manifest object required'],warnings,unknown};
 if(!page.url || !/^https:\/\//.test(page.url))errors.push('Canonical https URL required');
 else {try{new URL(page.url);}catch{errors.push('Invalid URL')}}
 if(!page.user_job)errors.push('A specific human job is required');
 if(!page.title||!page.h1)errors.push('Visible title and H1 required');
 if(!page.answer?.text || String(page.answer.text).trim().length<20)errors.push('Substantive supported answer/action explanation is required');
 if(!Array.isArray(page.claims)||page.claims.length===0)errors.push('Claims must be inspected with original sources');
 for(const claim of page.claims||[]){
  if(!claim.source_url||!claim.evidence_checked_at)errors.push('Claim lacks exact dated source');
  else try{const url=new URL(claim.source_url);if(url.protocol!=='https:')errors.push('Claim source must use https')}catch{errors.push('Invalid claim source URL')}
  if(claim.support_status!=='supported')errors.push('Unsupported or contradictory claim: '+(claim.text||'unknown'));
 }
 if(page.http_status!==200) {
  if(page.http_status===null||page.http_status===undefined)unknown.push('No live HTTP status observed');
  else errors.push('Page HTTP status is not 200');
 }
 if(page.canonical_matches!==true)unknown.push('Actual canonical selection not demonstrated');
 if(page.snippet_directive==='nosnippet')warnings.push('Google AI Mode/Overviews supporting link eligibility may be lost with nosnippet');
 if(page.robots_allowed!==true)unknown.push('Current crawler-specific access cannot be confirmed');
 if(page.index_state!=='verified_indexed')unknown.push('Actual indexed state not verified from authorized webmaster property');
 if(page.task_required===true && page.task_output_tested!==true)errors.push('Functional task needs actual correct-output test');
 if(page.structured_data_claimed && page.structured_data_matches_visible!==true)errors.push('Structured-data assertions must match visible page truth');
 if(page.faq_schema_claimed===true)warnings.push('Do not use retired Google FAQ rich-result expectations as AEO evidence');
 return {status:errors.length?'FAIL':unknown.length?'UNKNOWN_LIVE':'PASS_SCOPE',errors,warnings,unknown,
 disclaimer:'Cannot select featured snippets, AI citations or rank. Not a Search Console property query.'};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 const i=process.argv.indexOf('--file');if(i<0||!process.argv[i+1]){console.error('Usage: node scripts/audit-answer-page.mjs --file <manifest.json>');process.exitCode=2;}
 else try{const out=auditAnswerPage(JSON.parse(fs.readFileSync(process.argv[i+1],'utf8')));console.log(JSON.stringify(out,null,2));if(out.status==='FAIL')process.exitCode=1;}catch(e){console.error(String(e));process.exitCode=2;}
}
