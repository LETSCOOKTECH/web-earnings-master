import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
test('all 21 original skills have scoped verified-current-source requirements',()=>{
 const r=spawnSync(process.execPath,['scripts/check-research-evidence.mjs'],{cwd:root,encoding:'utf8'});
 assert.equal(r.status,0,r.stdout+'\n'+r.stderr);
 assert.match(r.stdout,/21 original audited/);
});
test('dated claims identify 2027 FUTURE and 2026 experimental/draft status',()=>{
 const claims=read('sources/verified_claims.json').claims;
 const ms=claims.find(c=>c.id==='MS-GROUND-FUTURE');
 assert.equal(ms.mode,'FUTURE');assert.match(ms.claim,/2027/);
 assert.equal(claims.find(c=>c.id==='WEBMCP-PREVIEW').mode,'PREVIEW');
 assert.equal(claims.find(c=>c.id==='IETF-AIPREF').mode,'DRAFT');
 assert.equal(claims.find(c=>c.id==='G-GOOGLEBOT-2MB').evidence,'FIRST_PARTY_BODY_OPENED');
});
test('source error is UNKNOWN, not fabricated semantic verification',()=>{
 const claims=read('sources/verified_claims.json').claims;
 for(const id of ['APPLEBOT-DIRECT-RATELIMIT']){
  const c=claims.find(x=>x.id===id);
  assert.equal(c.mode,'UNVERIFIED');assert.notEqual(c.evidence,'FIRST_PARTY_BODY_OPENED');
 }
 const review=read('sources/foundation_source_review_2026-11-23.json');
 assert.equal(review.unverified_count,2);
 assert.equal(review.targets.find(x=>x.id==='google-sc-generative-ai-control').body_access,'HTTP_429_INDEXED_CURRENT_TEXT_ONLY');
 assert.equal(review.targets.find(x=>x.id==='google-generative-ai-control-announcement').body_access,'CACHED_OFFICIAL_BODY_OLDER_THAN_CURRENT_INDEXED_UPDATE');
 assert.equal(review.targets.find(x=>x.id==='baidu-search-docs').body_access,'OFFICIAL_ORIGINAL_BODY_OPENED');
 assert.ok(claims.some(x=>x.id==='BAIDU-AI-FLOW-PORTAL'&&x.evidence==='FIRST_PARTY_BODY_OPENED'));
});
test('user agent sniffing and private routes are denied as sufficient identity/security',()=>{
 const ai=fs.readFileSync(path.join(root,'docs/foundations/19-provider-source-verification.md'),'utf8');
 assert.match(ai,/IP/);assert.match(ai,/USER-AGENT alone is insufficient/);
 const lab=fs.readFileSync(path.join(root,'docs/foundations/20-owned-web-lab-and-robots.md'),'utf8');
 assert.match(lab,/401/);assert.match(lab,/NEVER bot verification/);
});
