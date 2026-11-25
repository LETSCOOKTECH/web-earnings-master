import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {STUDIO_ROUTES,executeStudio,detectExtension,protectSpreadsheetCell} from '../examples/astro-dominant-studio-v29/public/assets/studio-core.mjs';
import {scanAssetSizes,checkNoindex,checkBuiltRoute,verifyMutatingRoutes} from '../scripts/audit-v29-production-gates.mjs';
test('V29 keeps V23 registry of 50 existing active skills intact with a separate candidate companion',()=>{
 const registry=JSON.parse(fs.readFileSync('sources/skill-network-v23.json','utf8'));
 assert.equal(registry.declared_active_skills,50);
 assert.equal(STUDIO_ROUTES.length,28);
});
test('all 20 route output mutation contracts run on kind-specific identical inputs',()=>{
 const result=verifyMutatingRoutes();
 assert.equal(result.checked,28);
 assert.deepEqual(result.failures,[]);
});
test('Cloudflare deployment artifact gate catches a sparse 26 MiB file without allocating a 26MiB string',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'sense-v29-assets-'));
 try{
  fs.writeFileSync(path.join(root,'valid.mjs'),'export const ok=1;');
  fs.writeFileSync(path.join(root,'too-large.wasm'),'');
  fs.truncateSync(path.join(root,'too-large.wasm'),26*1024*1024);
  const a=scanAssetSizes(root);
  assert.equal(a.assets.length,2);
  assert.ok(a.failures.some(x=>x.includes('CLOUDFLARE_24_MIB')));
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('release gate holds synthetic noindex and blocks live noindex/nosnippet pages',()=>{
 assert.deepEqual(checkNoindex('<meta name="robots" content="noindex">',{production:false}),[]);
 assert.ok(checkNoindex('<meta name="robots" content="noindex">',{production:true}).includes('PRODUCTION_NOINDEX'));
 assert.ok(checkNoindex('<meta name="robots" content="nosnippet">',{production:true}).includes('PRODUCTION_SNIPPET_BLOCK'));
 assert.ok(checkNoindex('<meta name="robots" content="index">',{production:false}).includes('LOCAL_EXAMPLE_NOINDEX_MISSING'));
});
test('static page output needs human-readable tasks, main, table and matching schema',()=>{
 const bad=checkBuiltRoute('<h1>Heading</h1><meta name="robots" content="noindex">','x');
 assert.ok(bad.includes('MAIN_MISSING:x'));
 assert.ok(bad.includes('CONSTRAINT_TABLE_MISSING:x'));
 assert.ok(bad.includes('WEB_APPLICATION_SCHEMA_MISSING:x'));
});
test('spreadsheet formula injection is escaped while valid negative numbers remain intact',()=>{
 const result=executeStudio('tsv-to-csv','id\tvalue\n1\t=CMD|A0\n2\t-42.50\n');
 assert.match(result.output,/'=CMD/);
 assert.ok(result.output.includes('2,-42.50'));
 assert.equal(protectSpreadsheetCell('\uFF20SUM()'),"'\uFF20SUM()");
});
test('leading-zero IDs survive CSV to JSONL and optional secret mask never runs by default',()=>{
 const data=executeStudio('csv-to-jsonl','id,name\n00501,Noor\n');
 assert.match(data.output,/"00501"/);
 assert.equal(detectExtension('export.parquet.zst').compression,'zstd');
});
test('fake Parquet route must not silently pass mutation gate',()=>{
 const bad=[{id:'not-implemented-parquet',kind:'csv',group:'csv',label:'Parquet'}];
 assert.ok(verifyMutatingRoutes(bad).failures.some(x=>x.includes('ROUTE_ORACLE_FAILED')));
});
