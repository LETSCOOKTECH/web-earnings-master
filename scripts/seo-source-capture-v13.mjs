#!/usr/bin/env node
/**
 * V13 official-source read-only capture for permitted first-party documents.
 * A successful fetch is REACHABILITY/CONTENT evidence, NEVER policy interpretation,
 * Google internal weights, owner Search Console data, or AdSense approval.
 * Only ONE curated source per invocation. No broad crawling or provider bypass.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';

export const OFFICIAL_HOSTS=new Set([
 'developers.google.com','support.google.com','trends.google.com',
 'www.rfc-editor.org','www.w3.org','web.dev',
 'developers.openai.com','support.claude.com','docs.perplexity.ai',
 'blogs.bing.com','www.indexnow.org',
 'html.spec.whatwg.org','developer.mozilla.org','asvs.owasp.org','owasp.org',
 'cheatsheetseries.owasp.org','playwright.dev','docs.astro.build',
 'nodejs.org','developers.cloudflare.com'
]);
export const STATES=new Set(['ORIGINAL_BODY_OPENED_PARTIAL','REFERENCE_LEAD_NOT_BODY_VERIFIED','BODY_BLOCKED_OR_NOT_OPENED']);
export const AREAS=new Set(['SEARCH_POLICY','CRAWL_INDEX','SEARCH_APPEARANCE','SEARCH_DISCOVERY','KEYWORD_RESEARCH','PUBLISHER','WEB_ENGINEERING']);
const invalid=(reason)=>({status:'INVALID',errors:[reason],eligible_for_semantic_claim:false});
const safeUrl=(raw)=>{
 try{
  const u=new URL(raw);
  if(u.protocol!=='https:'||u.username||u.password||u.port||u.search||u.hash||!OFFICIAL_HOSTS.has(u.hostname))return null;
  return u;
 }catch{return null}
};
export function validateAtlas(input){
 const errors=[],entries=input?.entries;
 if(input?.schema!=='sense-seo-primary-atlas-v13'||!Array.isArray(entries)||entries.length<70)
  return {valid:false,errors:['Expected at least 70 curated official reference entries']};
 const ids=new Set(),urls=new Set(),areas=new Set();
 for(const s of entries){
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s?.id||''))errors.push('Invalid source ID '+String(s?.id));
  if(ids.has(s.id))errors.push('Duplicate ID '+s.id);ids.add(s.id);
  if(urls.has(s.url))errors.push('Duplicate URL '+s.url);urls.add(s.url);
  if(!safeUrl(s.url))errors.push('Non-curated or unsafe URL '+s.id);
  if(!AREAS.has(s.area))errors.push('Unknown source category '+s.id);
  areas.add(s.area);
  if(s.authority!=='FIRST_PARTY')errors.push('Unverified source authority '+s.id);
  if(!STATES.has(s.access_snapshot)||s.content_meaning_verified_for_this_task!==false)
   errors.push('Unsupported source semantic state '+s.id);
  if(!Number.isSafeInteger(s.review_interval_days)||s.review_interval_days<1||s.review_interval_days>365)
   errors.push('Source review interval invalid '+s.id);
  if(s.requires_original_body_before_action!==true||typeof s.purpose!=='string'||s.purpose.trim().length<15)
   errors.push('Missing original-document action contract '+s.id);
 }
 if(areas.size!==AREAS.size)errors.push('At least one critical source category absent');
 return {valid:errors.length===0,errors,count:entries.length,categories:[...areas].sort(),decision:'ATLAS_METADATA_ONLY_NOT_LIVE_PROVIDER_VERIFICATION'};
}
const normalize=x=>String(x).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<[^>]*>/g,' ').replace(/&(?:nbsp|amp|lt|gt);/gi,' ').replace(/\s+/g,' ').trim();
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const time=x=>new Date(x).toISOString();
const redirectionCodes=new Set([301,302,303,307,308]);
export async function captureOfficial(atlas,id,{fetchFn=fetch,now=()=>new Date(),assertText='',maxBytes=550000,timeoutMs=9000}={}){
 const audit=validateAtlas(atlas);if(!audit.valid)return invalid('Atlas must pass offline audit');
 const source=atlas.entries.find(x=>x.id===id);
 if(!source)return invalid('Source ID absent from curated atlas');
 if(!Number.isSafeInteger(maxBytes)||maxBytes<512||maxBytes>800000)return invalid('Unsafe byte ceiling');
 if(!Number.isSafeInteger(timeoutMs)||timeoutMs<1000||timeoutMs>20000)return invalid('Unsafe timeout');
 const assertion=String(assertText||'').trim();
 if(assertion&&assertion.split(/\s+/).length>25)return invalid('Source exact-text assertion must be at most 25 words');
 let current=source.url,redirects=0;
 for(let hop=0;hop<=2;hop++){
  const u=safeUrl(current);if(!u)return invalid('Untrusted URL or cross-domain redirect');
  // Do not fetch arbitrary subdomains, paths or url fragments based on external text.
  let response;
  try{response=await fetchFn(u.href,{method:'GET',redirect:'manual',headers:{'User-Agent':'SenseSEOOfficialDocsReview/13 (read-only; one permitted official document)'},signal:AbortSignal.timeout(timeoutMs)})}
  catch(e){return {status:'UNKNOWN_NETWORK',source_id:id,original_url:source.url,reason:String(e?.message||e).slice(0,150),eligible_for_semantic_claim:false};}
  if(redirectionCodes.has(response.status)){
   const location=response.headers.get('location');
   if(!location)return {status:'UNKNOWN_REDIRECT',source_id:id,eligible_for_semantic_claim:false};
   let target;try{target=new URL(location,u).href}catch{return invalid('Invalid redirect location')}
   if(!safeUrl(target))return {status:'BLOCKED_UNTRUSTED_REDIRECT',source_id:id,eligible_for_semantic_claim:false};
   current=target;redirects++;continue;
  }
  if(!response.ok)return {status:'UNKNOWN_HTTP_'+response.status,source_id:id,original_url:source.url,final_url:u.href,eligible_for_semantic_claim:false};
  const type=response.headers.get('content-type')||'';
  if(!/^(text\/(?:html|plain|xml)|application\/(?:xml|xhtml\+xml))(?:;|$)/i.test(type))
   return {status:'UNKNOWN_CONTENT_TYPE',source_id:id,content_type:type.slice(0,100),eligible_for_semantic_claim:false};
  const length=Number(response.headers.get('content-length'));
  if(Number.isFinite(length)&&length>maxBytes)return {status:'UNKNOWN_OVERSIZED_BODY',source_id:id,eligible_for_semantic_claim:false};
  let bytes=0,buffers=[];
  try{
   const reader=response.body?.getReader();
   if(!reader)return {status:'UNKNOWN_EMPTY_BODY',source_id:id,eligible_for_semantic_claim:false};
   while(true){const {done,value}=await reader.read();if(done)break;
    bytes+=value.byteLength;
    if(bytes>maxBytes){await reader.cancel();return {status:'UNKNOWN_OVERSIZED_BODY',source_id:id,eligible_for_semantic_claim:false};}
    buffers.push(value);
   }
  }catch(e){return {status:'UNKNOWN_BODY_READ',source_id:id,detail:String(e?.message||e).slice(0,100),eligible_for_semantic_claim:false}}
  const raw=Buffer.concat(buffers).toString('utf8');
  if(raw.trim().length<30)return {status:'UNKNOWN_EMPTY_BODY',source_id:id,eligible_for_semantic_claim:false};
  const cleaned=normalize(raw);
  const present=!assertion||cleaned.toLowerCase().includes(normalize(assertion).toLowerCase());
  return {schema:'sense-official-source-receipt-v13',source_id:id,category:source.area,original_url:source.url,final_url:u.href,
    accessed_at_utc:time(now()),http_status:response.status,content_type:type,body_bytes:bytes,
    body_sha256:sha(raw),normalized_text_sha256:sha(cleaned),
    redirects,assertion_text:assertion||null,assertion_present_in_body:assertion?present:null,
    status:present?'BODY_FETCHED_REVIEW_REQUIRED':'ASSERTION_NOT_FOUND_HOLD',
    eligible_for_semantic_claim:false,manual_review_required:true,
    caveat:'HTTP content receipt and optional textual existence check only. Does not establish factual policy applicability, effective date, originality, signed-in owner status, Google ranking, AI citation or AdSense approval.'};
 }
 return {status:'UNKNOWN_TOO_MANY_REDIRECTS',source_id:id,eligible_for_semantic_claim:false};
}
const fileURL=fileURLToPath(import.meta.url);
if(process.argv[1]&&path.resolve(process.argv[1])===fileURL){
 const args=process.argv.slice(2),value=f=>{const i=args.indexOf(f);return i<0?null:args[i+1];};
 const defaultAtlas=path.resolve(path.dirname(fileURL),'../sources/seo_v13_primary_atlas.json');
 let atlas;try{atlas=JSON.parse(fs.readFileSync(value('--atlas')||defaultAtlas,'utf8'))}
 catch(e){console.error('Atlas unavailable: '+e.message);process.exit(2)}
 const shape=validateAtlas(atlas);
 if(!shape.valid){console.error(JSON.stringify(shape,null,2));process.exit(1)}
 if(args.includes('--offline')){console.log(JSON.stringify(shape,null,2));process.exit(0)}
 const id=value('--source-id');
 if(!id){console.error('Specify a single --source-id and --live, or use --offline');process.exit(2)}
 if(!args.includes('--live')){console.error('HOLD: explicit --live required. No original source fetched.');process.exit(2)}
 const result=await captureOfficial(atlas,id,{assertText:value('--assert-text')||''});
 const out=value('--out');
 if(out){fs.mkdirSync(path.dirname(path.resolve(out)),{recursive:true});fs.writeFileSync(out,JSON.stringify(result,null,2)+'\n')}
 console.log(JSON.stringify(result,null,2));
 if(result.status!=='BODY_FETCHED_REVIEW_REQUIRED')process.exitCode=1;
}
