import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {evaluateRecommendar,wilson,SURFACES} from '../scripts/evaluate-recommendar-v17.mjs';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const fixture=()=>JSON.parse(read('templates/dominant-recommendar/SYNTHETIC-panel.json'));
const check=x=>evaluateRecommendar(x,{now:Date.parse('2026-11-25T16:00:00Z')});
const bad=x=>assert.equal(check(x).status,'FAIL',JSON.stringify(check(x).errors));
test('clean synthetic balanced 2 providers x 2 questions x 2 repeats is structural only',()=>{
 const r=check(fixture());assert.equal(r.status,'STRUCTURAL_ONLY_EXTERNAL_UNVERIFIED');
 assert.equal(r.counts.attempts,8);assert.equal(r.groups.length,2);
 assert.equal(r.groups[0].unbranded_attempted,4);
 assert.equal(r.groups[0].unbranded_recommended,1);
 assert.equal(r.groups[0].unbranded_explicit_first,1);
 assert.equal(r.groups[0].sampled_unbranded_recommendation_rate,0.25);
 assert.equal(r.provider_output_authenticated,false);
 assert.equal(r.global_rank_one_verified,false);
 assert.equal(r.real_revenue_verified,false);
});
test('missing expected surface group is not silently dropped',()=>{const x=fixture();x.observations=x.observations.filter(y=>y.surface==='google-ai-mode');bad(x);});
test('missing question attempt fails closed',()=>{const x=fixture();x.observations.splice(2,1);bad(x);});
test('missing repeat fails closed',()=>{const x=fixture();x.observations=x.observations.filter(y=>y.repeat_id==='r1');bad(x);});
test('duplicate attempt cannot inflate visible recommendations',()=>{const x=fixture();x.observations.push(structuredClone(x.observations[0]));bad(x);});
test('no preregistration fails',()=>{const x=fixture();delete x.study.preregistered_at;bad(x);});
test('future preregistration fails',()=>{const x=fixture();x.study.preregistered_at='2035-01-01T00:00:00Z';bad(x);});
test('results predating panel fail',()=>{const x=fixture();x.observations[0].observed_at='2020-01-01T00:00:00Z';bad(x);});
test('result from the future fails',()=>{const x=fixture();x.observations[0].observed_at='2030-01-01T00:00:00Z';bad(x);});
test('injected unknown surface fails',()=>{const x=fixture();x.observations[0].surface='universal-ai-first-place';bad(x);});
test('random unregistered repeat fails',()=>{const x=fixture();x.observations[0].repeat_id='I-picked-only-positive-answer';bad(x);});
test('unknown human question fails',()=>{const x=fixture();x.observations[0].question_id='new-branded-keyword';bad(x);});
test('missing competitor roster rejects rank-one claim',()=>{const x=fixture();x.target.competitors=[];bad(x);});
test('cohort locale mismatch fails',()=>{const x=fixture();x.observations[0].locale='fr-FR';bad(x);});
test('invalid response citation rejects javascript URL',()=>{const x=fixture();x.observations[0].answer.visible_citations=['javascript:alert(1)'];bad(x);});
test('missing captured primary output fails',()=>{const x=fixture();x.observations[0].capture.artifact='';bad(x);});
test('unavailable cannot contain a made-up answer',()=>{const x=fixture();x.observations[3].answer=structuredClone(x.observations[0].answer);bad(x);});
test('unavailable must have explicit evidence-based reason',()=>{const x=fixture();x.observations[3].unavailable_reason='';bad(x);});
test('fake AI global rank field is forbidden',()=>{const x=fixture();x.observations[0].rank_one=1;bad(x);});
test('paid outcome and referral fields cannot be manufactured by observation file',()=>{for(const k of ['revenue','referrals','ai_market_share','impressions','indexed']){const x=fixture();x.observations[0][k]=999;bad(x);}});
test('unordered list cannot claim first position',()=>{const x=fixture();x.observations[0].answer.explicit_ranked=false;bad(x);});
test('single recommendation cannot certify rank one',()=>{const x=fixture();x.observations[0].answer.recommendations.pop();bad(x);});
test('same rank twice is invalid',()=>{const x=fixture();x.observations[0].answer.recommendations[1].rank=1;bad(x);});
test('rank gaps are invalid',()=>{const x=fixture();x.observations[0].answer.recommendations[1].rank=3;bad(x);});
test('quote must literally appear in source excerpt',()=>{const x=fixture();x.observations[0].answer.recommendations[0].evidence_quote='NovaTools magically dominates every AI answer';bad(x);});
test('quote must name the actual entity',()=>{const x=fixture();x.observations[0].answer.recommendations[0].evidence_quote='quick browser-local JSONL checks.';bad(x);});
test('recommendation cannot use unregistered anonymous competitor',()=>{const x=fixture();x.observations[0].answer.recommendations[0].entity_id='fake';bad(x);});
test('visible citation alone does not equal a recommendation',()=>{
 const x=fixture();const a=x.observations[1].answer;
 a.visible_citations=['https://novatools.dev/source'];
 const r=check(x);assert.equal(r.status,'STRUCTURAL_ONLY_EXTERNAL_UNVERIFIED');assert.equal(r.groups[0].unbranded_recommended,1);assert.equal(r.groups[0].unbranded_visible_citation,2);
});
test('host lookalike citation not counted as our domain',()=>{
 const x=fixture();x.observations[0].answer.visible_citations=['https://novatools.dev.attacker.org/secret'];
 const r=check(x);assert.equal(r.groups[0].unbranded_visible_citation,0);
});
test('brand-prompted positive responses are excluded from unbranded rate',()=>{
 const x=fixture();x.questions[0].branded=true;
 const r=check(x);assert.equal(r.status,'STRUCTURAL_ONLY_EXTERNAL_UNVERIFIED');
 assert.equal(r.groups[0].unbranded_attempted,2);assert.equal(r.groups[0].unbranded_recommended,0);
});
test('negative recommendations never boost positive share',()=>{
 const x=fixture();x.observations[0].answer.recommendations[0].sentiment='NEGATIVE';
 const r=check(x);assert.equal(r.groups[0].unbranded_recommended,0);assert.equal(r.groups[0].unbranded_disrecommended,1);
});
test('only explicit rank-ordered comparative answers yield sampled #1 denominator',()=>{
 const r=check(fixture());assert.equal(r.groups[0].unbranded_ranked_comparisons,1);
 assert.equal(r.groups[0].sampled_explicit_first_rate,1);
 assert.equal(r.global_rank_one_verified,false);
});
test('no low-sample Wilson precision claim',()=>{
 const x=check(fixture());assert.equal(x.groups[0].recommendation_interval,null);assert.ok(x.warnings.some(w=>w.includes('Small')));
 assert.deepEqual(wilson(5,0),null);assert.deepEqual(wilson(0,5).lower,0);
});
test('source registry and skill handoff exists and is current',()=>{
 const s=read('sources/dominant_recommendar_v17_sources.json'),skill=read('.agents/skills/web-dominant-recommendar/SKILL.md');
 const j=JSON.parse(s);assert.equal(j.schema,'sense-recommendar-v17-official-sources');
 assert.ok(j.providers.length>=12);assert.ok(j.sources.length>=10);
 for(const p of ['Google','OpenAI','Perplexity','Microsoft','Anthropic'])assert.ok(j.sources.some(x=>x.provider===p&&x.original_opened===true));
 assert.match(skill,/rank #1|#1 ranking/i);
 assert.match(skill,/Preferred Sources/);
 assert.match(skill,/AI Overviews/);
 assert.match(skill,/Perplexity/);
 assert.match(skill,/recommendation/i);
 assert.match(skill,/consumer|user task/i);
});
test('CLI returns structural-only and not a ranking certificate',()=>{
 const p=spawnSync(process.execPath,['scripts/evaluate-recommendar-v17.mjs','--file','templates/dominant-recommendar/SYNTHETIC-panel.json'],{cwd:root,encoding:'utf8'});
 assert.equal(p.status,0,p.stderr);assert.match(p.stdout,/STRUCTURAL_ONLY_EXTERNAL_UNVERIFIED/);
 assert.match(p.stdout,/"global_rank_one_verified": false/);
});

test('ADVERSARIAL null competitor must produce controlled FAIL not TypeError',()=>{const x=fixture();x.target.competitors[0]=null;assert.equal(check(x).status,'FAIL');});
test('ADVERSARIAL null observation must produce controlled FAIL not TypeError',()=>{const x=fixture();x.observations[0]=null;assert.equal(check(x).status,'FAIL');});
test('ADVERSARIAL null cohort must produce controlled FAIL not TypeError',()=>{const x=fixture();x.study.expected_groups[0]=null;assert.equal(check(x).status,'FAIL');});
test('ADVERSARIAL null question must produce controlled FAIL not TypeError',()=>{const x=fixture();x.questions[0]=null;assert.equal(check(x).status,'FAIL');});

test('HOLDOUT API output cannot masquerade as consumer ChatGPT Search output',()=>{
 const x=fixture();x.observations.find(r=>r.surface==='openai-chatgpt-search'&&r.status==='OBSERVED').capture.method='AUTHORIZED_PROVIDER_API';bad(x);
});
test('HOLDOUT OpenAI authorized web search API is its own provider cohort',()=>{
 const x=fixture();x.study.expected_groups.find(g=>g.surface==='openai-chatgpt-search').surface='openai-web-search-api';
 for(const r of x.observations.filter(y=>y.surface==='openai-chatgpt-search')){
  r.surface='openai-web-search-api';
  if(r.status==='OBSERVED')r.capture.method='AUTHORIZED_PROVIDER_API';
 }
 const result=check(x);assert.equal(result.status,'STRUCTURAL_ONLY_EXTERNAL_UNVERIFIED',JSON.stringify(result.errors));
});
test('HOLDOUT API output classified as human UI on API surface rejected',()=>{
 const x=fixture();x.study.expected_groups[1].surface='openai-web-search-api';
 for(const r of x.observations.filter(y=>y.surface==='openai-chatgpt-search'))r.surface='openai-web-search-api';
 bad(x);
});
test('HOLDOUT target-name injection into supposedly unbranded question rejected',()=>{
 const x=fixture();x.questions[0].text='Why should I choose NovaTools for browser-local JSONL validation?';bad(x);
});
test('HOLDOUT duplicate competitor brand cannot create fake #1 position',()=>{
 const x=fixture();x.target.competitors[0].brand='NovaTools';bad(x);
});
test('HOLDOUT explicitly negative quote cannot be labeled positive',()=>{
 const x=fixture();x.observations[0].answer.raw_excerpt='NovaTools is not recommended for JSONL processing. AtlasSuite is a strong alternative for advanced teams.';
 x.observations[0].answer.recommendations[0].evidence_quote='NovaTools is not recommended for JSONL processing.';
 bad(x);
});
