import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {evaluateAiVisibilityV14} from '../scripts/evaluate-ai-visibility-v14.mjs';
const root=path.resolve(import.meta.dirname,'..');
const sample=JSON.parse(fs.readFileSync(path.join(root,'templates/ai-visibility-v14.SYNTHETIC.json'),'utf8'));
const copy=()=>structuredClone(sample);
const now=Date.parse('2026-11-24T20:00:00Z');
const check=x=>evaluateAiVisibilityV14(x,{now});
test('Synthetic fixed panel is observational only, never real citations or earnings',()=>{
 const r=check(copy());assert.equal(r.status,'OBSERVATIONAL_SELF_REPORTED_ONLY');
 assert.equal(r.provider_citation_verified,false);assert.equal(r.revenue_verified,false);
 assert.equal(r.groups[0].attempted,2);assert.equal(r.groups[0].unavailable,1);
});
test('Denominator retains unavailable rather than falsely 100 percent observed-only citation',()=>{
 const r=check(copy());assert.equal(r.groups[0].sampled_visible_citation_rate,0.5);
 assert.equal(r.groups[0].observed_only_rate,1);
});
test('Missing observation for preregistered prompt is not silently dropped',()=>{
 const x=copy();x.observations.pop();assert.equal(check(x).status,'FAIL');
});
test('Invented new prompt not registered fails',()=>{
 const x=copy();x.observations[0].prompt_id='viral-fake-branded-query';assert.equal(check(x).status,'FAIL');
});
test('Observation before registered prompt panel rejected',()=>{
 const x=copy();x.observations[0].observed_at='2026-11-20T10:00:00Z';assert.equal(check(x).status,'FAIL');
});
test('Duplicate repeated observations cannot double-count a citation',()=>{
 const x=copy();x.observations.push({...x.observations[0]});assert.equal(check(x).status,'FAIL');
});
test('Citation looking similar to target host is not an owned-domain citation',()=>{
 const x=copy();x.observations[0].visible_citations=['https://sense.exampletools.org.evil.test/page/'];
 const r=check(x);assert.equal(r.status,'OBSERVATIONAL_SELF_REPORTED_ONLY');assert.equal(r.groups[0].with_owned_visible_citation,0);
});
test('Background retrieval never counted as visible citation',()=>{
 const x=copy();x.observations[0].background_retrieval=[x.observations[0].visible_citations[0]];
 x.observations[0].visible_citations=[];
 const r=check(x);assert.equal(r.groups[0].with_owned_visible_citation,0);
 assert.equal(r.groups[0].with_owned_background_only,1);
});
test('Brand mention without citation stays distinct from referral and citation',()=>{
 const x=copy();x.observations[0].visible_citations=[];
 const r=check(x);assert.equal(r.groups[0].with_brand_mention_without_citation,1);
 assert.equal(r.groups[0].with_owned_visible_citation,0);
});
test('Owner reporting cannot be combined with citation prompt denominator',()=>{
 const x=copy();x.owner_reports=[{kind:'GOOGLE_GSC_GENERATIVE_AI',impressions:2000}];
 const r=check(x);assert.equal(r.status,'OBSERVATIONAL_SELF_REPORTED_ONLY');assert.equal(r.owner_report_authenticated,false);
 assert.ok(r.unknown.some(z=>z.includes('self-reported')));
});
test('Publisher revenue and fake rank in citation sample rejected',()=>{
 for(const key of ['publisher_revenue','official_ai_rank','global_citation_share','human_referrals']){
 const x=copy();x.observations[0][key]=900000;assert.equal(check(x).status,'FAIL',key);
 }
});
test('Unknown provider and model names are not treated as comparable surfaces',()=>{
 const x=copy();x.observations[0].surface='every-LLM-at-once';assert.equal(check(x).status,'FAIL');
});
test('Unavailable response cannot have citation or brand mention',()=>{
 const x=copy();x.observations[1].brand_mentioned=true;assert.equal(check(x).status,'FAIL');
});
test('Observed response requires capture reference but file reference alone is not proof',()=>{
 const x=copy();x.observations[0].artifact_ref='';assert.equal(check(x).status,'FAIL');
});
test('Invalid citation URLs and missing search mode are rejected',()=>{
 const x=copy();x.observations[0].visible_citations=['javascript:alert(1)'];assert.equal(check(x).status,'FAIL');
});
test('Host list cannot include URL paths, ports or hidden credentials',()=>{
 const x=copy();x.target_hosts=['https://sense.exampletools.org/a'];assert.equal(check(x).status,'FAIL');
});
test('Panel sampling methodology must be real human task/question based',()=>{
 const x=copy();x.study.panel_method='KEYWORD_STUFFING_GENERATED_PROMPTS';assert.equal(check(x).status,'FAIL');
});
test('CLI clearly labels fake demonstration and observational result',()=>{
 const p=spawnSync(process.execPath,['scripts/evaluate-ai-visibility-v14.mjs','--file','templates/ai-visibility-v14.SYNTHETIC.json'],{cwd:root,encoding:'utf8'});
 assert.equal(p.status,0,p.stderr);assert.match(p.stdout,/OBSERVATIONAL_SELF_REPORTED_ONLY/);
});
