import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const data=JSON.parse(read('sources/image_tool_portfolio_v35.json'));
test('V35 portfolio covers exactly 20 distinct actual image jobs with nonfabricated source labels',()=>{
 assert.equal(data.schema,'sense-v35-image-portfolio');
 assert.equal(data.tools.length,20);
 assert.equal(new Set(data.tools.map(x=>x.id)).size,20);
 for(const t of data.tools){
  assert.match(t.id,/^[a-z][a-z0-9-]+$/);
  assert.ok(t.us_modeled_monthly_searches>0);
  assert.match(t.volume_source,/^https:\/\//);
  assert.ok(t.distinct_output.length>=20);
  assert.equal(t.original_gkp_export,'NOT_RUN');
  assert.equal(t.competitor_same_input_test,'NOT_RUN');
  assert.equal(t.actual_us_serp_test,'NOT_RUN');
  assert.equal(t.adsense_approval,'UNKNOWN');
  assert.equal(t.page_publish_gate,'HOLD_UNTIL_UNIQUE_FUNCTIONALITY_AND_EVIDENCE');
 }
 assert.equal(data.all_pages_eligible_or_indexed_guarantee,false);
 assert.equal(data.demand_estimates_are_not_additive,true);
 assert.equal(data.no_build_authorization,true);
});
test('V35 stage counts are 6+8+6 and V34 remains source of go/no-go truth',()=>{
 const counts={};
 for(const t of data.tools)counts[t.phase]=(counts[t.phase]||0)+1;
 assert.deepEqual(counts,{A:6,B:8,C:6});
 const d=read('docs/projects/2026-11-26-tier1-adsense-selection/20-IMAGE-TOOLS-V35.md');
 assert.match(d,/not yet independently proven winners/i);
 assert.match(d,/same-input test/);
 assert.match(d,/Google Search spam policies/);
});
