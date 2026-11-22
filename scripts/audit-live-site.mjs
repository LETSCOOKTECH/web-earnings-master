#!/usr/bin/env node
import process from 'node:process';
const a=process.argv;const k=a.indexOf('--origin');
if(k<0||!a[k+1]){console.error('Usage: node scripts/audit-live-site.mjs --origin https://example.com');process.exit(2)}
const origin=new URL(a[k+1]);if(origin.protocol!=='https:'||origin.pathname!=='/'){console.error('HTTPS origin ending in / required');process.exit(2)}
let failed=0;
async function check(path,expectHtml=false){
 const url=new URL(path,origin);
 try{
  const r=await fetch(url,{redirect:'manual',headers:{'User-Agent':'SenseSiteAuditor/1.0 (authorized self-audit)'} ,signal:AbortSignal.timeout(12000)});
  const ct=r.headers.get('content-type')??'';const body=(await r.text()).slice(0,2_000_000);
  const ok=r.status===200 && (!expectHtml||ct.includes('text/html'));
  let remark='';
  if(expectHtml){
   const can=[...body.matchAll(/<link\s+[^>]*rel=["']canonical["'][^>]*>/gi)].map(x=>x[0]);
   const href=can[0]?.match(/href=["']([^"']+)/i)?.[1];
   remark=` canonical=${href??'missing'} h1=${[...body.matchAll(/<h1\b/gi)].length}`;
   if(!href||!body.includes('<title')){failed++;remark+=' [INVALID META]';}
  }
  console.log(`${ok?'PASS':'FAIL'} ${url.href} HTTP ${r.status} ${ct}${remark}`); if(!ok)failed++;
 }catch(e){console.log(`FAIL ${url.href}: ${e.message}`);failed++;}
}
await check('/',true);
await check('/robots.txt');
await check('/sitemap-index.xml');
for(const p of ['/tools/image-compressor/','/tools/image-resizer/'])await check(p,true);
console.log(`Result: ${failed} failures. HTTP availability is NOT indexing/ranking/AI inclusion/ad approval.`);
if(failed)process.exitCode=1;

