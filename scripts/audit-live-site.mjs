#!/usr/bin/env node
// Owner-authorized, manifest-driven HTTP smoke. No browser, GSC, indexing or ad approval.
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {validatePublicSiteOrigin} from './validate-public-origin-v20.mjs';
const args=process.argv.slice(2);
const opt=(flag)=>{const i=args.indexOf(flag);return i<0?null:args[i+1];};
const fail=(msg)=>{console.error('INVALID:',msg);process.exit(2);};
const originText=opt('--origin'),file=opt('--routes-file'),approved=opt('--authorized-origin');
if(!originText||!file||!approved)fail('Usage: --origin https://owned-domain --routes-file path.json --authorized-origin https://owned-domain [--out evidence.json]');
let origin;
try{origin=new URL(originText);}catch{fail('Invalid origin');}
if(origin.protocol!=='https:'||origin.pathname!=='/'||origin.search||origin.hash||origin.username||origin.password)fail('HTTPS origin with root path required');
const originGate=validatePublicSiteOrigin(originText);
if(!originGate.ok)fail('Refusing unverified, private, or reserved example hostname: '+originGate.issues.join('; '));
if(origin.origin!==new URL(approved).origin)fail('Exact user-authorized origin does not match target');
let manifest;
try{manifest=JSON.parse(fs.readFileSync(path.resolve(file),'utf8'));}catch(e){fail('Cannot read page route manifest: '+e.message);}
if(!Array.isArray(manifest?.pages)||!manifest.pages.length)fail('Project route manifest must contain nonempty pages array');
if(manifest.site_origin&&manifest.site_origin!==origin.origin)fail('Manifest origin conflicts with target origin');
if(manifest.fixture===true&&!args.includes('--allow-fixture'))fail('Synthetic route manifest not accepted for production live audit');
const paths=[];
for(const p of manifest.pages){
 const route=p?.path;
 if(typeof route!=='string'||!/^\/(?:[a-z0-9_-]+\/)*$/.test(route))fail('Invalid project route: '+String(route));
 if(p.indexable===true)paths.push(route);
}
if(!paths.length)fail('No declared indexable project pages');
const unique=[...new Set(paths)];
if(unique.length!==paths.length)fail('Duplicate page routes in manifest');
const result={schema:'sense-live-site-v11',audit_started_at:new Date().toISOString(),origin:origin.origin,
 project_routes:unique,results:[],errors:[],status:'NOT_YET_RUN',
 disclaimer:'HTTP and initial HTML observations only; not live browser, owner Search Console indexing, AI citations, AdSense approval, policy or revenue.'};
async function load(route,kind){
 const url=new URL(route,origin).href;
 try{
  const r=await fetch(url,{redirect:'manual',headers:{'User-Agent':'SenseOwnedSiteAuditor/11 (+owner authorized; read-only)'},signal:AbortSignal.timeout(11000)});
  const type=r.headers.get('content-type')||'';
  const body=(await r.text()).slice(0,2_000_000);
  const failures=[];
  if(r.status!==200)failures.push('HTTP '+r.status);
  if(kind==='page'){
   if(!type.includes('text/html'))failures.push('Expected HTML content type');
   if(!/<title\b[^>]*>[\s\S]+?<\/title>/i.test(body))failures.push('Missing initial HTML title');
   const c=[...body.matchAll(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi)].map(m=>m[0]);
   const href=c[0]?.match(/href=["']([^"']+)["']/i)?.[1];
   if(c.length!==1||href!==url)failures.push('Missing/wrong self canonical');
   if(/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(body))failures.push('Indexable page has noindex in initial HTML');
   if((r.headers.get('x-robots-tag')||'').toLowerCase().includes('noindex'))failures.push('Indexable page has X-Robots-Tag noindex');
   if(!/<main\b/i.test(body))failures.push('Missing meaningful main semantic area');
  }
  if(kind==='robots'&&!body.toLowerCase().includes('user-agent:'))failures.push('Missing robots groups');
  if(kind==='sitemap'&&!/(<urlset\b|<sitemapindex\b)/i.test(body))failures.push('Unexpected sitemap XML body');
  const outcome={path:route,url,status_code:r.status,content_type:type,canonical_checked:kind==='page',http_result:failures.length?'FAIL':'PASS',issues:failures};
  result.results.push(outcome);
  if(failures.length)result.errors.push(route+': '+failures.join(', '));
 }catch(err){const message=String(err.message||err);result.results.push({path:route,url,http_result:'FAIL',issues:[message]});result.errors.push(route+': '+message);}
}
for(const r of unique)await load(r,'page');
await load('/robots.txt','robots');
await load(manifest.sitemap_path||'/sitemap.xml','sitemap');
const notFound=opt('--missing-path');
if(notFound){
 if(!/^\/(?:[a-z0-9_-]+\/)*$/.test(notFound))fail('Invalid missing-route path');
 const u=new URL(notFound,origin);
 try{const r=await fetch(u,{redirect:'manual',signal:AbortSignal.timeout(11000)});
  const ok=r.status===404||r.status===410;
  result.results.push({path:notFound,status_code:r.status,http_result:ok?'PASS':'FAIL',issues:ok?[]:['Expected real 404 or 410']});
  if(!ok)result.errors.push('Missing route served '+r.status);
 }catch(e){result.errors.push('Missing-route verification error '+e.message);}
}
result.status=result.errors.length?'FAIL_HTTP':'PASS_HTTP_ONLY';
result.audit_finished_at=new Date().toISOString();
const out=opt('--out');
if(out)fs.writeFileSync(path.resolve(out),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
if(result.errors.length)process.exitCode=1;
