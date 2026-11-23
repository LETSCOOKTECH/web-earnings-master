import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const {checkActionEvidence}=await import('../scripts/require-action-time-sources.mjs');
const registry=JSON.parse(fs.readFileSync(new URL('../sources/verified_claims.json',import.meta.url),'utf8'));
const clock=new Date('2026-11-23T14:00:00Z');
const sample=(id='G-AI-NOLLM')=>({task:'Decide whether llms.txt is mandatory for Google Search AI visibility',required_claim_ids:[id],records:[{claim_id:id,source_url:registry.claims.find(c=>c.id===id).source,checked_at_utc:'2026-11-23T13:30:00Z',access_method:'ORIGINAL_BODY_INSPECTED',source_section:'Things to ignore',relevant_excerpt:'Google Search does not require special files for appearing in AI features.',applies_to:'Public Google Search AI overview eligibility only',reviewer:'human or authorized Codex research agent',implementation_status:'CURRENTLY_ENFORCED',test_or_account_evidence:'Current primary docs inspected; own site indexing not tested'}]});
const check=a=>checkActionEvidence(registry,a,{now:clock,requiredIds:['G-AI-NOLLM']});
test('fresh original-provider evidence structurally passes and explicitly disclaims semantic proof',()=>{
 const res=check(sample());assert.equal(res.pass,true);assert.match(res.decision_label,/NOT_SEMANTIC_PROOF/);
});
test('source excerpt alone, stale date and future timestamp each fail',()=>{
 const a=sample();a.records[0].access_method='SEARCH_SNIPPET_ONLY';assert.equal(check(a).pass,false);
 const b=sample();b.records[0].checked_at_utc='2026-11-01T00:00:00Z';assert.ok(check(b).errors.some(s=>s.includes('stale')));
 const c=sample();c.records[0].checked_at_utc='2026-12-01T00:00:00Z';assert.equal(check(c).pass,false);
});
test('registered source URL must match checked first-party original',()=>{
 const a=sample();a.records[0].source_url='https://random.example.invalid/blog';assert.ok(check(a).errors.some(s=>s.includes('source URL differs')));
});
test('all explicitly required claims must have their own evidence, not a global approval',()=>{
 const a=sample();const r=checkActionEvidence(registry,a,{now:clock,requiredIds:['G-AI-NOLLM','MS-GROUND-FUTURE']});
 assert.equal(r.pass,false);assert.ok(r.errors.some(s=>s.includes('Missing task-time evidence')));
});
test('FUTURE announced Bing grounding controls cannot be claimed already enforced',()=>{
 const a=sample('MS-GROUND-FUTURE');a.records[0].implementation_status='CURRENTLY_ENFORCED';
 const res=checkActionEvidence(registry,a,{now:clock,requiredIds:['MS-GROUND-FUTURE']});assert.equal(res.pass,false);assert.ok(res.errors.some(s=>s.includes('FUTURE announced rule')));
});
test('unverified Applebot source cannot be approved by a fabricated current check',()=>{
 const a=sample('APPLEBOT-DIRECT-RATELIMIT');
 const r=checkActionEvidence(registry,a,{now:clock,requiredIds:['APPLEBOT-DIRECT-RATELIMIT']});
 assert.equal(r.pass,false);assert.ok(r.errors.some(s=>s.includes('UNVERIFIED')));
});
test('empty evidence list is a critical failure',()=>{
 const a={task:'Material robots and indexing change',required_claim_ids:['G-AI-NOLLM'],records:[]};
 assert.equal(check(a).pass,false);
});
