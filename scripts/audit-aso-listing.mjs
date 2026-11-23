#!/usr/bin/env node
// Bounded listing metadata audit. This is NOT store approval, search ranking or a policy API.
// Run: node scripts/audit-aso-listing.mjs --file templates/discovery/google-play.example.json
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const cp = value => [...String(value ?? '')].length;
const bytes = value => Buffer.byteLength(String(value ?? ''),'utf8');
const isPresent = value => typeof value === 'string' && value.trim().length > 0;
const shouldVerify = x => x?.review_intent === 'publish';
const official = Object.freeze({
 'google-play': 'https://support.google.com/googleplay/android-developer/answer/9859152',
 'apple-app-store': 'https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information'
});
export function auditAsoListing(x) {
 const errors=[],warnings=[],unknown=[];
 const fail = s=>errors.push(s);
 const warn = s=>warnings.push(s);
 const pending = s=>unknown.push(s);
 if(!x || typeof x !== 'object'||Array.isArray(x)) return {status:'FAIL',errors:['Expected one JSON listing object'],warnings,unknown};
 const platform=x.platform;
 if(!Object.hasOwn(official,platform))return {status:'FAIL',errors:['platform must be google-play or apple-app-store'],warnings,unknown};
 const fields=platform==='google-play'?
  [{name:'title',n:30},{name:'short_description',n:80},{name:'full_description',n:4000}]:
  [{name:'name',n:30},{name:'subtitle',n:30,required:false},{name:'description',n:4000},{name:'promotional_text',n:170,required:false}];
 for(const f of fields) {
  const value=x[f.name];
  if(!isPresent(value)){
   if(f.required!==false)fail('Missing '+f.name);
   else warn('Optional '+f.name+' absent');
  } else if(cp(value)>f.n) fail(f.name+' has '+cp(value)+' Unicode code points, above '+f.n+'-character limit');
 }
 if(platform==='apple-app-store'){
  if(!isPresent(x.keywords))fail('Missing Apple keywords field');
  else {
   if(bytes(x.keywords)>100)fail('Apple keywords field has '+bytes(x.keywords)+' UTF-8 bytes; limit is 100 bytes (not 100 JavaScript characters)');
   const terms=x.keywords.split(',').map(s=>s.trim()).filter(Boolean);
   if(terms.length!==x.keywords.split(',').length)warn('Empty comma-delimited Apple keyword');
   if(new Set(terms.map(s=>s.toLowerCase())).size!==terms.length)warn('Repeated Apple keyword terms waste space');
   for(const s of terms)if(cp(s)<=2)warn('Apple keywords should be longer than 2 characters: '+s);
   if(/,\s|\s,/.test(x.keywords))warn('Spaces around commas use Apple keyword budget unnecessarily');
  }
  if(isPresent(x.promotional_text)&&x.promotional_text.toLowerCase().includes('keyword'))warn('Promotional text is not an Apple App Store search keyword signal');
 }
 if(!isPresent(x.locale))fail('Missing locale');
 if(!isPresent(x.app_id))fail('Missing app_id/package identity');
 const v = Array.isArray(x.verified_features)?x.verified_features:[];
 const claims=Array.isArray(x.promised_features)?x.promised_features:[];
 for(const claim of claims)if(!v.includes(claim))fail('Promised feature lacks confirmed implementation evidence: '+claim);
 if(!Array.isArray(x.verified_features))pending('verified_features requires real build/QA review');
 if(!Array.isArray(x.screenshots)||!x.screenshots.length) pending('No verified screenshots supplied; app store asset review not performed');
 else for(const shot of x.screenshots){
  if(!shot||!isPresent(shot.locale)||!isPresent(shot.device)||shot.verified_against_build!==true)
   pending('Screenshots need locale, device and actual build verification');
 }
 if(!isPresent(x.source_checked_at))pending('Current official policy has not been recorded as checked at action time');
 if(!isPresent(x.account_listing_status))pending('Actual store account listing status not available');
 if(platform==='google-play'){
  if(/\b#1\b|\bno\.\s?1\b|\bbest of play\b/i.test((x.title||'')+' '+(x.short_description||'')))warn('Prohibited/misleading ranking claims may violate Play listing policy');
  if(Array.isArray(x.custom_listings))for(const page of x.custom_listings){
   if(page?.targeting==='keyword' && !Array.isArray(page.keywords))fail('Keyword-targeted Play custom listing needs explicit keyword list');
  }
 }else if(Array.isArray(x.custom_product_pages)){
  if(x.custom_product_pages.length>70)fail('Apple currently allows at most 70 custom product pages');
  const assigned=new Map();
  for(const page of x.custom_product_pages){
   for(const term of (page.keywords||[])){
    const key=String(term).toLowerCase().trim();
    if(assigned.has(key))fail('Apple custom product page keyword assigned to multiple pages: '+term);
    assigned.set(key,page.id);
   }
  }
 }
 if(shouldVerify(x)){
  if(!x.screenshots?.every(z=>z?.verified_against_build===true))fail('Publishing gate: screenshots not verified against real app');
  if(!isPresent(x.source_checked_at))fail('Publishing gate: current official policy recheck missing');
 }
 return {platform,source:official[platform],status:errors.length?'FAIL':unknown.length?'UNKNOWN_LIVE':'PASS_OFFLINE_SCOPE',errors,warnings,unknown,limits_checked:fields.map(f=>f.name+(f.n)),apple_keyword_bytes:platform==='apple-app-store'?bytes(x.keywords):undefined,
 disclaimer:'Static metadata only; app review, store indexing, rank, ratings, actual installs and earnings are external outcomes.'};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 const i=process.argv.indexOf('--file');
 if(i<0||!process.argv[i+1]){console.error('Usage: node scripts/audit-aso-listing.mjs --file <listing.json>');process.exitCode=2;}
 else {
  try{
   const data=JSON.parse(fs.readFileSync(process.argv[i+1],'utf8'));
   const out=auditAsoListing(data);console.log(JSON.stringify(out,null,2));
   if(out.status==='FAIL')process.exitCode=1;
  }catch(e){console.error(String(e));process.exitCode=2;}
 }
}
