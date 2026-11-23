#!/usr/bin/env node
// Foundation source health checker: URL availability is NOT policy semantic verification.
import fs from 'node:fs';
import path from 'node:path';
const file = path.resolve(import.meta.dirname, '../sources/foundation_sources.json');
const allowed = new Set(['opened','excerpt_checked','restricted','unverified']);
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const errs=[];
if (!data.entries || !Array.isArray(data.entries) || data.entries.length<25) errs.push('manifest missing >=25 sources');
const ids=new Set();
for(const e of data.entries??[]){
 if (!e.id || ids.has(e.id)) errs.push('missing/duplicate id: '+e.id);
 ids.add(e.id);
 if (!allowed.has(e.status)) errs.push('invalid evidence status '+e.id);
 if (e.semantic_review_required!==true) errs.push('manual semantic recheck missing: '+e.id);
 if (!/^\d{4}-\d{2}-\d{2}$/.test(e.observed_on||'')) errs.push('invalid observed date: '+e.id);
 try{const u=new URL(e.url);if(u.protocol!=='https:'||u.username||u.password||u.port) errs.push('unsafe URL '+e.id);}
 catch{errs.push('invalid URL '+e.id);}
}
if(errs.length){console.error(errs.join('\n'));process.exitCode=1;}
else console.log('OFFLINE PASS: '+data.entries.length+' foundation source records valid; semantic verification still required.');
if(!process.argv.includes('--live')||errs.length)process.exit();
const index=process.argv.indexOf('--limit');
const requested=index>=0?Number(process.argv[index+1]):12;
if(!Number.isSafeInteger(requested)||requested<1||requested>100)throw new Error('--limit must be integer 1..100');
const maxRedirects=3;
function allowedHost(host){
 const hosts=['developer.mozilla.org','www.rfc-editor.org','www.iana.org','www.icann.org','developers.google.com','support.google.com','developers.openai.com','support.claude.com','docs.perplexity.ai','blogs.bing.com','developer.chrome.com','www.indexnow.org','duckduckgo.com','developer.apple.com','www.bing.com','support.apple.com','publicsuffix.org'];
 return hosts.includes(host);
}
async function check(url){
 let current=url;
 for(let i=0;i<=maxRedirects;i++){
  const u=new URL(current);
  if(u.protocol!=='https:'||!allowedHost(u.hostname))return {status:'blocked_redirect',url:current};
  try{
   let r=await fetch(current,{method:'HEAD',redirect:'manual',signal:AbortSignal.timeout(7000)});
   if([405,501].includes(r.status))r=await fetch(current,{method:'GET',redirect:'manual',signal:AbortSignal.timeout(7000)});
   if([301,302,303,307,308].includes(r.status)){
     const loc=r.headers.get('location');if(!loc)return {status:'missing_location',http:r.status,url:current};
     current=new URL(loc,current).href;continue;
   }
   return {status:r.ok?'reachable':'http_error',http:r.status,url:current};
  }catch(e){return {status:'network_unknown',url:current,error:String(e?.message||e).slice(0,180)};}
 }
 return {status:'too_many_redirects',url:current};
}
const results=[];
for(const e of data.entries.slice(0,requested))results.push({id:e.id,...await check(e.url)});
const summary={checked_at_utc:new Date().toISOString(),method:'HTTP HEAD then GET on 405/501, strict official host list, max 3 redirects, 7s per request',limitation:'Link reachability only. NO claim is semantically verified by this script.',results};
console.log(JSON.stringify(summary,null,2));
if(results.some(r=>r.status!=='reachable'))process.exitCode=2;
