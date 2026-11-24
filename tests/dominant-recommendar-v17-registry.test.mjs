import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {checkRecommendarRegistry} from '../scripts/check-dominant-recommendar-v17.mjs';
import {SURFACES} from '../scripts/evaluate-recommendar-v17.mjs';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const fixture=()=>JSON.parse(read('sources/dominant_recommendar_v17_sources.json'));
const check=d=>checkRecommendarRegistry(d);
const fail=d=>assert.equal(check(d).status,'FAIL',JSON.stringify(check(d)));
test('source atlas validates metadata scope, NOT real provider rank',()=>{
 const r=check(fixture());
 assert.equal(r.status,'PROVIDER_METADATA_ONLY');
 assert.equal(r.listed_surfaces,17);
 assert.equal(r.opened_originals,17);
 assert.equal(r.exact_ranking_algorithms_verified,false);
 assert.equal(r.actual_citations_verified,false);
});
test('every evaluator surface has one independent atlas entry',()=>{
 const j=fixture();assert.deepEqual(j.providers.map(x=>x.id).sort(),[...SURFACES].sort());
});
test('eight unverified regional and other AI surfaces remain clearly unknown',()=>{
 const x=fixture();const u=x.providers.filter(p=>p.evidence_level==='UNVERIFIED_PROVIDER_RECOMMENDATION_MECHANICS');
 assert.equal(u.length,8);
 for(const p of u){assert.deepEqual(p.documented_originals,[]);assert.equal(p.rank_one_formula_known,false);}
});
test('duplicate original source identifier fails',()=>{
 const x=fixture();x.sources[1].id=x.sources[0].id;fail(x);
});
test('provider source lookalike / hostile domain fails',()=>{
 const x=fixture();x.sources[0].url='https://developers.google.com.attacker.example/a';fail(x);
});
test('source URL with credentials fails',()=>{
 const x=fixture();x.sources[0].url='https://user:pass@developers.google.com/search';fail(x);
});
test('source attribution cannot be fabricated with sample original bodies',()=>{
 const x=fixture();x.sources[0].original_opened=false;fail(x);
});
test('unscoped unsupported guarantee in original source claim fails',()=>{
 const x=fixture();x.sources[0].claim='We guaranteed rank #1 for any search product in any country';fail(x);
});
test('empty limitation breaks first-party research ledger',()=>{
 const x=fixture();x.sources[0].limitation='';fail(x);
});
test('missing a provider product breaks coverage',()=>{
 const x=fixture();x.providers.pop();fail(x);
});
test('duplicate Google AI Mode surface breaks coverage',()=>{
 const x=fixture();x.providers[1].id=x.providers[0].id;fail(x);
});
test('mismatched cited original source fails',()=>{
 const x=fixture();x.providers[0].documented_originals=['NONEXISTENT'];fail(x);
});
test('claims of known proprietary #1 formula fail',()=>{
 const x=fixture();x.providers[0].rank_one_formula_known=true;fail(x);
});
test('self-authorized account evidence cannot certify a source atlas',()=>{
 const x=fixture();x.providers[0].owner_property_authenticated=true;fail(x);
});
test('self-authenticated provider answer is rejected',()=>{
 const x=fixture();x.providers[0].provider_response_authenticated=true;fail(x);
});
test('unsupported provider certainty fails',()=>{
 const x=fixture();x.providers[0].evidence_level='SECRETS_REVERSE_ENGINEERED';fail(x);
});
test('unverified regional provider may not claim first-party source-backed mechanics',()=>{
 const x=fixture();const p=x.providers.find(p=>p.id==='yandex-alice');
 p.evidence_level='FIRST_PARTY_SCOPE_ONLY';fail(x);
});
test('Google preference does not magically apply to every web tool',()=>{
 const skill=read('.agents/skills/web-dominant-recommendar/SKILL.md');
 const control=read('docs/recommendations/01-provider-eligibility-and-retrieval.md');
 assert.match(skill,/eligible publisher/);
 assert.match(control,/not a "make us top 1" script/i);
});
test('spamming, planted reviews and prompt injection explicitly blocked',()=>{
 const skill=read('.agents/skills/web-dominant-recommendar/SKILL.md');
 assert.match(skill,/fake reviews/);assert.match(skill,/prompt injection/);
 assert.match(skill,/unbranded/);assert.match(skill,/independent/);
});
test('operator must retain true unavailable and unfavorable cases',()=>{
 const s=read('templates/dominant-recommendar/OPERATOR_WORK_ORDER.md');
 assert.match(s,/UNAVAILABLE/);assert.match(s,/negative|unfavorable/i);
 assert.match(read('docs/recommendations/04-measurement-and-experiments.md'),/Wilson intervals/);
});
test('action-time source reading and real human task gate explicitly routed',()=>{
 const a=read('AGENTS.md'),r=read('docs/recommendations/05-agent-execution-and-global-ops.md');
 assert.match(a,/V17 mandatory/);assert.match(a,/audit:recommendar-sources/);
 assert.match(r,/pre-register|preregister/i);assert.match(r,/HOLD_EXTERNAL/);
 assert.match(r,/actual product value/i);
});
test('all mandatory chapters and benchmark templates are substantial',()=>{
 for(const name of ['01-provider-eligibility-and-retrieval.md','02-recommendation-worthiness.md','03-query-entity-and-content.md','04-measurement-and-experiments.md','05-agent-execution-and-global-ops.md'])
  assert.ok(read('docs/recommendations/'+name).length>3500,name);
 for(const name of ['OPERATOR_WORK_ORDER.md','competitive-proof-card.md'])
  assert.ok(read('templates/dominant-recommendar/'+name).length>1000,name);
});
test('registered 49 skills match the actual filesystem',()=>{
 const j=JSON.parse(read('sources/production_skills_v7.json'));
 const dirs=fs.readdirSync(path.join(root,'.agents/skills'),{withFileTypes:true}).filter(x=>x.isDirectory());
 assert.equal(j.expectSkills,49);assert.equal(dirs.length,49);
 assert.equal(j.skills.length,49);
 assert.ok(j.skills.some(x=>x.id==='web-dominant-recommendar'));
});
test('atlas CLI distinctly reports metadata only',()=>{
 const p=spawnSync(process.execPath,['scripts/check-dominant-recommendar-v17.mjs'],{cwd:root,encoding:'utf8'});
 assert.equal(p.status,0,p.stderr);
 assert.match(p.stdout,/PROVIDER_METADATA_ONLY/);
 assert.match(p.stdout,/"actual_citations_verified": false/);
});

test('future original-source review date must fail',()=>{const x=fixture();x.sources[0].reviewed_at_utc='2099-01-01T00:00:00Z';fail(x);});
