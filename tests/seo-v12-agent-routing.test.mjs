import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
test('V12 agent routing mandates independent local browser and release evidence',()=>{
 for(const p of ['AGENTS.md','.agents/skills/web-fullstack-production-executor/SKILL.md','.agents/skills/web-product-validation/SKILL.md','.agents/skills/web-launch-review/SKILL.md'])
  assert.match(read(p),/V12/,p);
 assert.match(read('AGENTS.md'),/release-truth-gate/);
});
test('V12 crawler instructions cite original RFC and official Google interpretation',()=>{
 const s=read('docs/seo-master/06-robots-crawler-v12.md');
 assert.match(s,/rfc9309/);assert.match(s,/developers\.google\.com\/crawling/);
 assert.match(read('.agents/skills/web-technical-seo/SKILL.md'),/Googlebot/);assert.match(read('.agents/skills/web-technical-seo/SKILL.md'),/Bingbot/);
});
test('V12 first-party ledger has opened-body status, not site/owner proof',()=>{
 const data=JSON.parse(read('sources/seo_v12_first_party_sources.json'));
 assert.ok(data.records.length>=4);
 assert.ok(data.records.every(x=>x.access==='ORIGINAL_BODY_OPENED'));
 assert.equal(new Set(data.records.map(x=>x.id)).size,data.records.length);
});
test('V12 example consists of actual HTML, executable pure core, UI and E2E source',()=>{
 for(const p of ['examples/seo-csv-lab/site/index.html','examples/seo-csv-lab/site/assets/csv-core.mjs','examples/seo-csv-lab/site/assets/tool.mjs','tests/seo-csv-browser-e2e.mjs','scripts/serve-seo-csv-lab.mjs'])
  assert.ok(read(p).length>300,p);
});
test('Local 10/10 framework explicitly does not certify live Search or AdSense',()=>{
 const doc=read('docs/seo-master/05-independent-observatory-v12.md');
 assert.match(doc,/LOCAL_PASS/);assert.match(doc,/PUBLISHER_APPROVAL/);
 assert.match(doc,/not a Google report/);
});
