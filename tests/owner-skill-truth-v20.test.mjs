import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const owners=['web-domain-operations','web-browser-runtime','web-search-internals','web-search-visibility-systems','web-ai-retrieval-lab','web-fullstack-production-executor','web-launch-review','web-product-validation','web-technical-seo'];
test('nine primary skill owners have domain-specific V20 public-site false-positive gate',()=>{
 for(const slug of owners){
  const s=read('.agents/skills/'+slug+'/SKILL.md');
  assert.match(s,/## V20/,'V20 guide missing '+slug);
  assert.match(s,/docs\/quality\/real-world-release-contract-v20\.md/,'source handoff missing '+slug);
  assert.match(s,/example\.org|NOT_DEPLOYED|NOT PUBLIC/,'required false-public-site negative case missing '+slug);
 }
});
test('main Codex entrypoint mandates the exact local vs public truth contract',()=>{
 const a=read('AGENTS.md');
 assert.match(a,/V20 mandatory/);assert.match(a,/audit:skills:depth/);assert.match(a,/NOT_DEPLOYED/);
 assert.match(read('README.md'),/LOCAL CSV LAB — NOT PUBLIC/);
});
test('new build admits no implicit hosting or indexable ranking claim',()=>{
 const s=read('scripts/build-public-csv-demo-v20.mjs');
 assert.match(s,/BUILD_ONLY_NOT_DEPLOYED/);
 assert.match(s,/external_http_verified:false/);
 assert.match(s,/search_index_verified:false/);
 assert.match(s,/adsense_approved_verified:false/);
});
