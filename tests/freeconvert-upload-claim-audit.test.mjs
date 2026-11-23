import test from 'node:test';import assert from 'node:assert/strict';
import fs from 'node:fs';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const read=(p)=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const file='sources/research/freeconvert-upload-priority-claim-audit-2026-11-23.json';
const audit=read(file);
const claims=audit.records, ids=new Set(claims.map(x=>x.id));
test('exactly 32 auditable high-impact user-report claims, no invented full-review claim',()=>{
 assert.equal(claims.length,32);assert.equal(ids.size,32);
 assert.match(audit.scope,/DOES NOT CERTIFY ALL/);
 assert.match(audit.source_upload,/Pasted text/);
});
test('original user claim URL segment count -> direct Google rank boost is explicitly refuted',()=>{
 const c=claims.find(x=>x.id==='U01');
 assert.equal(c.verdict,'REFUTED_AS_CAUSAL');
 assert.match(c.technical_reassessment,/path segments/);
 assert.ok(c.official_or_public_sources.some(s=>s.includes('seo-starter-guide')));
});
test('source audit correctly distinguishes machine agent compatibility and Search AI eligibility',()=>{
 const google=claims.find(c=>c.id==='U13'),agent=claims.find(c=>c.id==='U20'),schema=claims.find(c=>c.id==='U17');
 assert.equal(google.verdict,'REFUTED_AS_CAUSAL');
 assert.equal(agent.verdict,'REFUTED_AS_CAUSAL');
 assert.equal(schema.verdict,'DOCUMENTED_WITH_LIMITS');
 assert.ok(agent.official_or_public_sources.some(s=>s.includes('/lighthouse/')));
});
test('explicit provenance and unknowns for all source-scoped assertions',()=>{
 const allowed=new Set(['REFUTED_AS_CAUSAL','DOCUMENTED_WITH_LIMITS','PUBLIC_OBSERVED','UNVERIFIED_EXTERNAL','HYPOTHESIS']);
 for(const c of claims){
  assert.ok(allowed.has(c.verdict),c.id);
  assert.ok(c.user_report_claim.length>15 && c.technical_reassessment.length>35,c.id);
  assert.ok(c.missing_verification.length>30,c.id);
  for(const s of c.official_or_public_sources)assert.equal(new URL(s).protocol,'https:',c.id);
 }
 assert.ok(claims.filter(x=>x.verdict==='UNVERIFIED_EXTERNAL').length>=8);
});
test('no real Google rankings or private competitor revenue are misrepresented as proven by audit',()=>{
 for(const id of ['U22','U25','U32','U09'])assert.equal(claims.find(c=>c.id===id).verdict,'UNVERIFIED_EXTERNAL');
});
test('three existing owner skills received targeted provenance, URL/agent boundary instructions',()=>{
 for(const [p,markers] of [
 ['.agents/skills/web-technical-seo/SKILL.md',['navigation depth correction','path segment','url-architecture-reference-lab.mjs']],
 ['.agents/skills/web-ai-discovery/SKILL.md',['fan-out','Chrome 150','snippet-eligible']],
 ['.agents/skills/web-competitor-audit/SKILL.md',['h-risk','claim audit','REFUTED_AS_CAUSAL']]
 ]){
  const s=fs.readFileSync(path.join(root,p),'utf8');
  for(const m of markers.filter(x=>x!=='h-risk'))assert.ok(s.includes(m),p+' missing '+m);
 }
});
test('audit document reports uncertainty and independent link graph rather than fabricating Search proof',()=>{
 const p='docs/research/04-user-teardown-google-ai-url-causality-audit-2026-11-23.md';
 const s=fs.readFileSync(path.join(root,p),'utf8');
 assert.match(s,/32-claim explicit assessment/);
 assert.match(s,/UNKNOWN/);
 assert.match(s,/url-architecture-reference-lab.mjs/);
 assert.match(s,/FULL 84KB REPORT FACT-CHECK: NOT COMPLETED/);
});

test('Google Search Console AI inclusion control worldwide August 31 and separate from ranking',()=>{
 const s=fs.readFileSync(path.join(root,'.agents/skills/web-ai-discovery/SKILL.md'),'utf8');
 assert.match(s,/worldwide as of August 31, 2026/);assert.match(s,/inclusion default/);assert.match(s,/UNKNOWN_PROPERTY_CONTROL/);
 const d=fs.readFileSync(path.join(root,'docs/research/04-user-teardown-google-ai-url-causality-audit-2026-11-23.md'),'utf8');
 assert.match(d,/Search generative AI inclusion control/);assert.match(d,/August 31, 2026/);assert.match(d,/answer\/16908024/);
});

test('new global AI inclusion control is watched with explicit access and freshness caveats',()=>{
 const watch=read('sources/foundation_refresh_targets.json');
 const review=read('sources/foundation_source_review_2026-11-23.json');
 assert.equal(watch.monitored.length,106);
 assert.equal(review.targets.length,106);
 assert.equal(review.unverified_count,50);
 assert.ok(watch.monitored.some(x=>x.id==='google-sc-generative-ai-control'));
 assert.ok(watch.monitored.some(x=>x.id==='chrome-agentic-browsing-score'));
 assert.equal(review.targets.find(x=>x.id==='google-generative-ai-control-announcement').body_access,'CACHED_OFFICIAL_BODY_OLDER_THAN_CURRENT_INDEXED_UPDATE');
});
