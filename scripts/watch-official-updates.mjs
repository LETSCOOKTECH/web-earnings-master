#!/usr/bin/env node
// Web Earnings Master: official-source freshness SIGNAL monitor. NO auto policy claims.
// Node 22+ builtins. Only explicit official hosts and paths in repository manifest.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

export const normalizeForChange = (text,kind) => {
 let t=String(text).slice(0,1000000);
 if(kind==='html') t=t.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ')
                       .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ')
                       .replace(/<!--[\s\S]*?-->/g,' ')
                       .replace(/<[^>]+>/g,' ');
 return t.replace(/&nbsp;/gi,' ').replace(/&amp;/gi,'&').replace(/\s+/g,' ').trim();
};
export const sha = x=>crypto.createHash('sha256').update(x).digest('hex');
export const interpretChange=(before,now)=>{
 if(now.status!=='REACHABLE') return {state:'UNKNOWN_NETWORK',requires_semantic_review:false};
 if(!before || !before.hash) return {state:'BASELINE',requires_semantic_review:true};
 if(before.hash===now.hash) return {state:'UNCHANGED',requires_semantic_review:false};
 return {state:'CHANGED_REVIEW_REQUIRED',requires_semantic_review:true};
};
const root=path.resolve(import.meta.dirname,'..');
const targets=JSON.parse(fs.readFileSync(path.join(root,'sources/foundation_refresh_targets.json'),'utf8')).monitored;
const allowedHosts = new Set(["developers.google.com","developers.openai.com","support.claude.com","docs.perplexity.ai","blogs.bing.com","safe.search.brave.com","help.kagi.com","www.chromium.org","firefox-source-docs.mozilla.org","docs.webkit.org","developer.chrome.com","datatracker.ietf.org","support.google.com","developer.apple.com","ziyuan.baidu.com","searchadvisor.naver.com","yandex.com","www.mojeek.com","playwright.dev"]);
const args=process.argv.slice(2);
const flag=(name,defaultValue)=>{const i=args.indexOf(name);return i<0?defaultValue:args[i+1];};
const statePath=path.resolve(flag('--state',path.join(root,'.cache/official-source-state.json')));
const outPath=path.resolve(flag('--out',path.join(root,'foundation-watch.json')));
const mdPath=path.resolve(flag('--markdown',path.join(root,'foundation-watch.md')));
const live=args.includes('--live');
const errors=[];
const ids=new Set();
for(const e of targets){
 if(!e.id || ids.has(e.id)) errors.push('missing or repeated id');
 ids.add(e.id);
 let u;
 try{u=new URL(e.url);}catch{errors.push('invalid URL '+e.id);continue;}
 if(u.protocol!=='https:' || u.username || u.password || u.port || !allowedHosts.has(u.hostname)) errors.push('unsafe URL '+e.id);
 if(!['html','rss'].includes(e.kind)) errors.push('invalid kind '+e.id);
 if(e.semantic_review_required!==true) errors.push('unsafe review flag '+e.id);
}
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
if(!live){console.log('OFFLINE PASS: '+targets.length+' official source watch targets valid. No live fetch, no policy semantics checked.');process.exit(0);}
const previous=fs.existsSync(statePath)?JSON.parse(fs.readFileSync(statePath,'utf8')):{};
const results=[];const next={};const LIMIT=850000;
async function load(e){
 let u=e.url;
 for(let hops=0;hops<3;hops++){
  const parsed=new URL(u);
  if(parsed.protocol!=='https:' || !allowedHosts.has(parsed.hostname) || parsed.username || parsed.password || parsed.port) return {status:'UNSAFE_REDIRECT'};
  let response;
  try{response=await fetch(u,{redirect:'manual',headers:{'user-agent':'WebEarningsMasterSourceMonitor/2.2 (+read-only; official sources)'},signal:AbortSignal.timeout(12000)});}
  catch(err){return {status:'NETWORK_ERROR',detail:String(err.message).slice(0,150)};}
  if([301,302,303,307,308].includes(response.status)){
   const loc=response.headers.get('location');if(!loc)return {status:'BAD_REDIRECT'};
   u=new URL(loc,u).href;continue;
  }
  if(!response.ok)return {status:'HTTP_'+response.status};
  const type=response.headers.get('content-type')||'';
  if(!/text\/(html|xml|plain)|application\/(rss\+xml|atom\+xml|xml)/i.test(type))return {status:'UNEXPECTED_MIME',type};
  const n=Number(response.headers.get('content-length'));
  if(n>LIMIT)return {status:'OVER_LIMIT'};
  const reader=response.body?.getReader();
  if(!reader)return {status:'EMPTY_BODY'};
  let size=0,chunks=[];
  try{while(true){const {value,done}=await reader.read();if(done)break;size+=value.length;if(size>LIMIT){await reader.cancel();return {status:'OVER_LIMIT'};}chunks.push(value);}}
  catch(err){return {status:'READ_ERROR',detail:String(err.message).slice(0,150)};}
  const raw=Buffer.concat(chunks).toString('utf8');
  const norm=normalizeForChange(raw,e.kind);
  if(norm.length<30)return {status:'EMPTY_CONTENT'};
  return {status:'REACHABLE',hash:sha(norm),bytes:size,final_url:u};
 }
 return {status:'TOO_MANY_REDIRECTS'};
}
const index=args.indexOf('--limit');
const count=index<0?targets.length:Number(args[index+1]);
if(!Number.isSafeInteger(count)||count<1||count>targets.length)throw Error('invalid --limit');
const chosen=targets.slice(0,count);
for(let i=0;i<chosen.length;i+=3){
 const batch=await Promise.all(chosen.slice(i,i+3).map(load));
 chosen.slice(i,i+3).forEach((e,j)=>{
  const r=batch[j];const decision=interpretChange(previous[e.id],r);
  results.push({id:e.id,kind:e.kind,category:e.category,url:e.url,...r,...decision});
  next[e.id]=r.status==='REACHABLE'?{hash:r.hash,last_success_at:new Date().toISOString(),url:e.url}:previous[e.id]??null;
 });
}
const report={at_utc:new Date().toISOString(),evidence_label:'REACHABILITY_AND_HASH_ONLY',semantic_review:'MANDATORY_ON_CHANGED_OR_BASELINE_AND_BEFORE_PRODUCTION_ACTIONS',previous_state_available:fs.existsSync(statePath),results};
fs.mkdirSync(path.dirname(outPath),{recursive:true});fs.writeFileSync(outPath,JSON.stringify(report,null,2)+'\n');
fs.mkdirSync(path.dirname(statePath),{recursive:true});fs.writeFileSync(statePath,JSON.stringify(next,null,2)+'\n');
const esc=s=>String(s).replace(/[|\n]/g,' ');
const lines=['# Official source watch — '+report.at_utc,'','Only content fingerprints and HTTP signals; no provider policy interpretation.','','| Target | Change signal | HTTP status |','|---|---|---|'];
for(const r of results)lines.push('| '+esc(r.id)+' | '+r.state+' | '+r.status+' |');
lines.push('','Review all BASELINE/CHANGED_REVIEW_REQUIRED entries by reopening source body and comparing dated claims. A hash change is NOT a changed policy. Missing/blocked pages remain UNKNOWN.');
fs.mkdirSync(path.dirname(mdPath),{recursive:true});fs.writeFileSync(mdPath,lines.join('\n')+'\n');
const changes=results.filter(x=>x.state==='CHANGED_REVIEW_REQUIRED').length;
const unknown=results.filter(x=>x.state==='UNKNOWN_NETWORK').length;
console.log('SOURCE WATCH: '+results.length+' checked; '+changes+' changed; '+unknown+' unreachable/unknown; output '+outPath);
if(unknown>0)process.exitCode=2; // CI signal, not proof of policy removal.
