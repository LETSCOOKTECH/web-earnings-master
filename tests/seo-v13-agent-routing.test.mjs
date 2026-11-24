import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
const read=x=>fs.readFileSync(path.join(root,x),'utf8');
test('V13 professional chapters cover source, keyword, technical, fullstack, ads, AI/analytics, orchestration',()=>{
 for(const n of ['08-live-source-verification-v13.md','09-keyword-and-serp-mastery-v13.md','10-technical-seo-developer-v13.md',
 '11-end-to-end-web-development-v13.md','12-adsense-publisher-policy-v13.md','13-ai-search-analytics-experiments-v13.md','14-agent-orchestration-v13.md']){
  assert.ok(read('docs/seo-master/'+n).length>2500,n);
 }
});
test('V13 primary atlas covers 75 official links without implying all originals opened',()=>{
 const atlas=JSON.parse(read('sources/seo_v13_primary_atlas.json'));
 assert.equal(atlas.entries.length,75);
 assert.ok(atlas.entries.some(x=>x.access_snapshot==='BODY_BLOCKED_OR_NOT_OPENED'));
 assert.ok(atlas.entries.some(x=>x.access_snapshot==='REFERENCE_LEAD_NOT_BODY_VERIFIED'));
 assert.ok(atlas.entries.every(x=>x.content_meaning_verified_for_this_task===false));
});
test('V13 required source and coverage commands wired into npm test',()=>{
 const pkg=JSON.parse(read('package.json'));
 for(const k of ['audit:seo-primary','audit:seo-coverage','audit:keyword-provenance'])assert.ok(pkg.scripts[k]&&pkg.scripts.test.includes('npm run '+k),k);
});
test('Agent primary entrypoint includes V13 source original and account trust boundaries at top',()=>{
 const x=read('AGENTS.md');assert.ok(x.indexOf('## V13 MANDATORY')>=0&&x.indexOf('## V13 MANDATORY')<500);
 assert.match(x,/original provider document/);
 assert.match(x,/SOURCE|source/);
 assert.match(x,/AdSense/);
});
test('Thirteen owning specialist skill manifests include new web evidence protocol',()=>{
 const slugs=['web-keyword-intent','web-opportunity-intelligence','web-technical-seo','web-fullstack-production-executor',
 'web-adsense-readiness','web-publisher-policy-eligibility','web-generative-engine-optimization','web-search-analytics',
 'web-launch-review','web-product-validation','web-research-freshness','web-security-assurance-asvs','web-traffic-hunter'];
 for(const id of slugs)assert.match(read('.agents/skills/'+id+'/SKILL.md'),/V13 — Web-verified professional production protocol/,id);
});
test('Operator source ledger includes timing, provider applicability and review outcome',()=>{
 const h=read('templates/seo-v13-source-ledger.csv');
 for(const term of ['original_url','opened_at_utc','provider_section','effective_date','claim_status','contradictions','reviewer'])assert.ok(h.includes(term),term);
});
test('V13 source atlas has a restricted single-doc fetch CLI and no automatic live in tests',()=>{
 const src=read('scripts/seo-source-capture-v13.mjs');
 assert.match(src,/source-id/);assert.match(src,/--live/);assert.match(src,/eligible_for_semantic_claim:false/);
 const p=spawnSync(process.execPath,['scripts/seo-source-capture-v13.mjs','--offline'],{cwd:root,encoding:'utf8'});
 assert.equal(p.status,0);assert.match(p.stdout,/NOT_LIVE_PROVIDER/);
});
test('V13 keyword provenance never upgrades self-declared evidence to verified Google demand',()=>{
 const p=spawnSync(process.execPath,['scripts/seo-keyword-provenance-v13.mjs','--file','templates/seo-keyword-research-v13.example.json'],{cwd:root,encoding:'utf8'});
 assert.equal(p.status,0,p.stderr);const out=JSON.parse(p.stdout);
 assert.equal(out.verified_keyword_volume,false);assert.equal(out.verified_traffic,false);
});
test('V13 master README links directly to professional modules',()=>{
 const s=read('docs/seo-master/README.md');
 for(const id of ['08-live-source-verification-v13','09-keyword-and-serp-mastery-v13','10-technical-seo-developer-v13','11-end-to-end-web-development-v13','12-adsense-publisher-policy-v13','13-ai-search-analytics-experiments-v13','14-agent-orchestration-v13'])assert.ok(s.includes(id),id);
});
