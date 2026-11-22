#!/usr/bin/env node
import fs from 'node:fs';
const args=process.argv;const limit=Number(args[args.indexOf('--limit')+1]||10);
if(!args.includes('--limit')||!Number.isFinite(limit)||limit<1||limit>100){console.error('Usage: node scripts/verify-source-links.mjs --limit 10 (uses network)');process.exit(2)}
const s=JSON.parse(fs.readFileSync(new URL('../sources/official_sources.json',import.meta.url),'utf8')).sources.slice(0,limit);
let failed=0;for(const o of s){try{const c=new AbortController();const t=setTimeout(()=>c.abort(),7000);const r=await fetch(o.url,{method:'GET',redirect:'follow',signal:c.signal,headers:{'User-Agent':'Mozilla/5.0 (documentation checker)'}});clearTimeout(t);
 console.log(`${r.status} ${o.id} ${r.url}`);if(r.status>=400)failed++;
}catch(e){console.warn(`UNKNOWN ${o.id}: ${e.name||e.message}`);failed++}}
console.log(`Checked ${s.length} URLs; failures may reflect bot blocking, not a broken policy. Successful HTTP status does not verify the text or applicability.`);
if(failed)process.exitCode=1;
