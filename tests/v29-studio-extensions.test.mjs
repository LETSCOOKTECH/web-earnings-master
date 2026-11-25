import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {scaffoldDominantStudio} from '../scripts/scaffold-dominant-studio-v29.mjs';
import {validateWebMcpTool,compactAgentReceipt,WEBMCP_BUDGETS} from '../scripts/webmcp-contract-v29.mjs';
import {inspectManualEvidence} from '../scripts/assess-manual-opportunity-v29.mjs';
import {buildIndexNowDiff} from '../scripts/ping-indexnow-diff-v29.mjs';
const root=path.resolve(import.meta.dirname,'..');
test('V29 companion scaffold copies real pinned Astro starter without overwriting legacy project',()=>{
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'sense-studio-scaffold-'));
 try{
  const d=path.join(temp,'studio'),receipt=scaffoldDominantStudio(d);
  assert.equal(receipt.status,'LOCAL_COPY_NOT_DEPLOYED');
  assert.equal(receipt.parquet_implemented,false);
  for(const p of ['package-lock.json','src/data/tools.json','src/pages/tools/[slug].astro','public/assets/studio-worker.mjs','tests/browser.spec.mjs'])assert.ok(fs.existsSync(path.join(d,p)),p);
  assert.throws(()=>scaffoldDominantStudio(d),/empty directory/);
  assert.throws(()=>scaffoldDominantStudio(root),/overwrite/);
 }finally{fs.rmSync(temp,{recursive:true,force:true});}
});
test('WebMCP metadata uses current recommended budgets, returns a compact safe receipt not file payload',()=>{
 assert.equal(WEBMCP_BUDGETS.outputBytes,1400);
 const valid={name:'get_studio_status',description:'Return safe status only',inputSchema:{type:'object',properties:{sample:{description:'Optional safe input'}}},annotations:{readOnlyHint:true}};
 assert.deepEqual(validateWebMcpTool(valid),[]);
 assert.ok(validateWebMcpTool({...valid,name:'x'.repeat(31)}).includes('INVALID_NAME'));
 assert.ok(validateWebMcpTool({...valid,description:'x'.repeat(501)}).includes('INVALID_DESCRIPTION'));
 assert.ok(validateWebMcpTool({...valid,inputSchema:{properties:{a:{description:'x'.repeat(151)}}}}).includes('INVALID_PARAM_DESCRIPTION'));
 const receipt=compactAgentReceipt({route:'csv-to-jsonl',hasOutput:true,processedBytes:1024,preview:'sensitive'.repeat(500)},{maxBytes:350});
 assert.ok(receipt.bytes<=350);
 assert.equal(receipt.fullOutputIncluded,false);
});
test('zero-paid market receipts are structurally reviewable without pretending original sources verified',()=>{
 const doc=JSON.parse(fs.readFileSync(path.join(root,'templates/opportunity/zero-paid-research-v29.SYNTHETIC.json'),'utf8'));
 const r=inspectManualEvidence(doc,{now:Date.parse('2026-11-26T08:00:00Z')});
 assert.equal(r.status,'STRUCTURAL_ONLY_HUMAN_REVIEW');
 assert.equal(r.verified_market_demand,false);
 assert.equal(r.automatically_approved_to_build,false);
 doc.receipts[0].unit='MONTHLY_SEARCH_VOLUME';
 assert.ok(inspectManualEvidence(doc).errors.includes('TRENDS_UNIT_INVALID'));
});
test('IndexNow performs a local same-origin diff without network, refuses duplicated changed URLs',()=>{
 const a='a'.repeat(64),b='b'.repeat(64);
 const packet={previous:[{path:'/tools/a/',sha256:a}],current:[{path:'/tools/a/',sha256:a},{path:'/tools/b/',sha256:b}]};
 assert.deepEqual(buildIndexNowDiff(packet,'https://tools.example.org'),['https://tools.example.org/tools/b/']);
 packet.current.push({path:'/tools/b/',sha256:b});
 assert.throws(()=>buildIndexNowDiff(packet,'https://tools.example.org'),/Duplicate/);
 packet.current=[{path:'https://evil.example/route',sha256:b}];
 assert.throws(()=>buildIndexNowDiff(packet,'https://tools.example.org'),/Invalid/);
});
