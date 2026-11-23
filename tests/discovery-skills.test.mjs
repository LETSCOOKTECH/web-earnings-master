import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {auditAsoListing} from '../scripts/audit-aso-listing.mjs';
import {auditAnswerPage} from '../scripts/audit-answer-page.mjs';
import {evaluateAiCitations} from '../scripts/evaluate-ai-citations.mjs';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const play=read('templates/discovery/google-play.example.json');
const apple=read('templates/discovery/apple-app-store.example.json');
const answer=read('templates/discovery/answer-page.example.json');
const citations=read('templates/discovery/ai-citation-batch.example.json');
const clone=o=>structuredClone(o);
test('4 new specialized Codex skills have meaningful instructions and official sources',()=>{
 for(const n of ['web-aeo-answer-optimization','web-generative-engine-optimization','web-aso-google-play','web-aso-apple-app-store']){
  const s=fs.readFileSync(path.join(root,'.agents/skills',n,'SKILL.md'),'utf8');
  assert.match(s,new RegExp('^---\\nname: '+n+'\\n'));
  assert.ok(s.length>4000,n+' instruction body too short');
  assert.match(s,/https:\/\//);
  assert.match(s,/FAIL \/ UNKNOWN|Hard FAIL \/ UNKNOWN/);
 }
});
test('28 existing plus four new skill manifests and 4 deep discovery manuals exist',()=>{
 const names=fs.readdirSync(path.join(root,'.agents/skills'),{withFileTypes:true}).filter(e=>e.isDirectory());
 assert.equal(names.length,32);
 for(const f of ['01-answer-engine-optimization.md','02-generative-engine-optimization.md','03-google-play-aso.md','04-apple-app-store-aso.md','05-geo-provider-surface-atlas.md']){
  const s=fs.readFileSync(path.join(root,'docs/discovery',f),'utf8');
  assert.ok(s.length>5500);
 }
});
test('32 scoped first-party claims preserve direct-body versus excerpt status and rollout labels',()=>{
 const c=read('sources/discovery_provider_claims_2026-11-23.json');
 assert.equal(c.claim_count,32);
 assert.equal(c.full_body_count+c.excerpt_count,32);
 assert.equal(new Set(c.claims.map(x=>x.id)).size,32);
 for(const r of c.claims){
  assert.ok(['OFFICIAL_ORIGINAL_BODY_OPENED','INDEXED_FIRST_PARTY_EXCERPT_ONLY'].includes(r.evidence));
  assert.ok(['CURRENT','PREVIEW','FUTURE','EXPERIMENTAL'].includes(r.mode));
  assert.ok(r.source.startsWith('https://'));
  assert.ok(r.claim.length>40&&r.scope.length>15);
 }
 assert.equal(c.claims.find(x=>x.id==='P08').mode,'FUTURE');
});
test('Google Play sample is structurally valid but cannot certify real console state',()=>{
 const r=auditAsoListing(play);
 assert.equal(r.platform,'google-play');assert.equal(r.status,'UNKNOWN_LIVE');assert.equal(r.errors.length,0);
 assert.ok(r.unknown.some(x=>x.includes('account')));
});
test('Google Play title 31 and short description 81 fail while precise bounds pass',()=>{
 const a=clone(play);a.title='X'.repeat(30);a.short_description='X'.repeat(80);
 assert.equal(auditAsoListing(a).errors.length,0);
 a.title='X'.repeat(31);a.short_description='X'.repeat(81);
 assert.ok(auditAsoListing(a).errors.some(x=>x.includes('title')));
 assert.ok(auditAsoListing(a).errors.some(x=>x.includes('short_description')));
});
test('Google Play full description 4001 and unimplemented advertised feature must fail',()=>{
 const a=clone(play);a.full_description='z'.repeat(4001);a.promised_features.push('quantum compression');
 const errors=auditAsoListing(a).errors;
 assert.ok(errors.some(x=>x.includes('full_description')));
 assert.ok(errors.some(x=>x.includes('quantum compression')));
});
test('Play keyword targeted custom listing requires explicit keyword mapping',()=>{
 const a=clone(play);a.custom_listings=[{targeting:'keyword'}];
 assert.equal(auditAsoListing(a).status,'FAIL');
});
test('Apple App Store keyword field obeys UTF8 bytes not JS length',()=>{
 const a=clone(apple);a.keywords='é'.repeat(51);
 assert.ok(a.keywords.length<100);
 const r=auditAsoListing(a);assert.equal(r.apple_keyword_bytes,102);assert.equal(r.status,'FAIL');
 assert.ok(r.errors.some(x=>x.includes('100 bytes')));
});
test('Apple exact 100 ASCII keyword bytes allowed; 101 rejected',()=>{
 const a=clone(apple);a.keywords='k'.repeat(100);
 assert.equal(auditAsoListing(a).errors.length,0);
 a.keywords+='k';assert.ok(auditAsoListing(a).errors.some(x=>x.includes('100 bytes')));
});
test('Apple name/subtitle 31 and 171 promotional characters fail as per separate fields',()=>{
 const a=clone(apple);a.name='a'.repeat(31);a.subtitle='b'.repeat(31);a.promotional_text='c'.repeat(171);
 const e=auditAsoListing(a).errors;
 assert.ok(e.some(x=>x.includes('name')));
 assert.ok(e.some(x=>x.includes('subtitle')));
 assert.ok(e.some(x=>x.includes('promotional_text')));
});
test('Apple CPP duplicates and over-70 pages are rejected (not indexing claims)',()=>{
 const a=clone(apple);a.custom_product_pages=[{id:'a',keywords:['offline']},{id:'b',keywords:['offline']}];
 assert.ok(auditAsoListing(a).errors.some(x=>x.includes('multiple pages')));
 a.custom_product_pages=Array.from({length:71},(_,i)=>({id:String(i),keywords:[String(i)]}));
 assert.ok(auditAsoListing(a).errors.some(x=>x.includes('70')));
});
test('Publishing cannot pass without real screenshots/source review',()=>{
 const a=clone(play);a.review_intent='publish';a.screenshots[0].verified_against_build=false;
 delete a.source_checked_at;
 assert.equal(auditAsoListing(a).status,'FAIL');
});
test('Answer evidence example is not an indexed/ranked claim',()=>{
 const r=auditAnswerPage(answer);
 assert.equal(r.status,'UNKNOWN_LIVE');assert.equal(r.errors.length,0);
 assert.ok(r.unknown.some(x=>x.includes('indexed')));
});
test('Answer rejects unsupported claim, nonfunctional tool and bad HTTP status',()=>{
 const a=clone(answer);a.claims[0].support_status='unknown';a.http_status=404;a.task_output_tested=false;
 const r=auditAnswerPage(a);
 assert.equal(r.status,'FAIL');assert.ok(r.errors.length>=3);
});
test('Answer snippet restrictions are warnings not guaranteed result selection',()=>{
 const a=clone(answer);a.snippet_directive='nosnippet';
 assert.ok(auditAnswerPage(a).warnings.some(x=>x.includes('nosnippet')));
});
test('AI citation sample stays observational; provider denominators are separate',()=>{
 const r=evaluateAiCitations(citations);
 assert.equal(r.status,'OBSERVATIONAL_ONLY');
 const c=r.groups.find(x=>x.provider==='ChatGPT'),p=r.groups.find(x=>x.provider==='Perplexity');
 assert.equal(c.observed_prompt_runs,2);
 assert.equal(c.with_visible_citation,1);
 assert.equal(c.with_background_retrieval,1);
 assert.equal(c.sampled_visible_citation_fraction,0.5);
 assert.equal(p.with_visible_citation,0);
 assert.equal(r.owned_human_referral,'UNKNOWN_NOT_CONNECTED');
});
test('AI citation evaluator rejects lookalike hostnames and never counts background as visible',()=>{
 const a=clone(citations);
 a.observations[0].visible_citations=['https://example.org.attacker.invalid/'];
 a.observations[0].retrieved_background=['https://example.org/source'];
 const r=evaluateAiCitations(a),g=r.groups.find(x=>x.provider==='ChatGPT');
 assert.equal(g.with_visible_citation,0);
 assert.equal(g.with_background_retrieval,2);
});
test('AI citation duplicate run IDs and invalid citation URL fail evidence contract',()=>{
 const a=clone(citations);a.observations.push(clone(a.observations[0]));a.observations[0].visible_citations=['javascript:alert(1)'];
 const r=evaluateAiCitations(a);assert.equal(r.status,'FAIL');
 assert.ok(r.errors.some(x=>x.includes('Duplicate')));
 assert.ok(r.errors.some(x=>x.includes('Invalid')));
});
test('Real owned human attribution is separately supplied and validated, not inferred',()=>{
 const a=clone(citations);a.owned_referral_measurement={method:'consented session analytics',period:'2026-11-01..2026-11-23',human_sessions:32,completed_tasks:12};
 const r=evaluateAiCitations(a);assert.equal(r.status,'OBSERVATIONAL_ONLY');assert.equal(r.owned_human_referral.completed_tasks,12);
 a.owned_referral_measurement.completed_tasks=33;assert.equal(evaluateAiCitations(a).status,'FAIL');
});
test('Three executable CLI validators run on committed non-live fixtures',()=>{
 for(const [script,fixture] of [
  ['scripts/audit-aso-listing.mjs','templates/discovery/google-play.example.json'],
  ['scripts/audit-answer-page.mjs','templates/discovery/answer-page.example.json'],
  ['scripts/evaluate-ai-citations.mjs','templates/discovery/ai-citation-batch.example.json']]){
   const r=spawnSync(process.execPath,[script,'--file',fixture],{cwd:root,encoding:'utf8'});
   assert.equal(r.status,0,r.stderr+'\n'+r.stdout);
   assert.ok(r.stdout.includes('disclaimer')||r.stdout.includes('warning'));
  }
});

test('integrated discovery evidence contract script passes and never claims live ranks',()=>{
 const r=spawnSync(process.execPath,['scripts/check-discovery-evidence.mjs'],{cwd:root,encoding:'utf8'});
 assert.equal(r.status,0,r.stdout+'\n'+r.stderr);
 assert.match(r.stdout,/NO live ranking approval claims/);
});

test('21 distinct GEO engine surfaces preserve unknown provider retrieval sources',()=>{
 const a=read('sources/geo_provider_surface_atlas_2026-11-23.json');
 assert.equal(a.surface_count,21);assert.equal(a.rows.length,21);assert.equal(a.provider_source_unknown,8);
 assert.equal(new Set(a.rows.map(x=>x.id)).size,21);
 for(const p of a.rows){
  assert.ok(p.measurement&&p.owner_controls&&p.scope);
  if(p.source_status==='UNKNOWN_PROVIDER_SOURCE')assert.equal(p.source,null);
  else assert.ok(p.source.startsWith('https://'));
 }
});
test('GEO engine atlas distinguishes Search from Gemini/ChatGPT API and Kagi/Duck.ai modes',()=>{
 const a=read('sources/geo_provider_surface_atlas_2026-11-23.json').rows;
 assert.notEqual(a.find(x=>x.id==='GOOGLE-AIM').retrieval_route,a.find(x=>x.id==='GOOGLE-GEMINI').retrieval_route);
 assert.notEqual(a.find(x=>x.id==='OPENAI-CHATGPT-SEARCH').retrieval_route,a.find(x=>x.id==='OPENAI-API-WEBSEARCH').retrieval_route);
 assert.ok(a.some(x=>x.id==='KAGI-ASSISTANT'));
 assert.ok(a.some(x=>x.id==='DUCK-AI-CHAT'));
 assert.ok(a.some(x=>x.id==='BAIDU-AI'));
});
