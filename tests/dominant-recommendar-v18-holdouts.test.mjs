import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {evaluateRecommendar} from '../scripts/evaluate-recommendar-v17.mjs';
import {checkRecommendarRegistry} from '../scripts/check-dominant-recommendar-v17.mjs';
const root=path.resolve(import.meta.dirname,'..');
const fixture=()=>JSON.parse(fs.readFileSync(path.join(root,'templates/dominant-recommendar/SYNTHETIC-panel.json'),'utf8'));
const atlas=()=>JSON.parse(fs.readFileSync(path.join(root,'sources/dominant_recommendar_v17_sources.json'),'utf8'));
const check=x=>evaluateRecommendar(x,{now:Date.parse('2026-11-25T16:00:00Z')});
const invalid=x=>{const r=check(x);assert.equal(r.status,'FAIL',JSON.stringify(r.errors));};

test('V18 HOLDOUT baseline all observed fixture captures have one distinct artifact per attempt',()=>{
 const xs=fixture().observations.filter(r=>r.status==='OBSERVED').map(r=>r.capture.artifact);
 assert.equal(new Set(xs).size,xs.length,'Repeated evidence artifact reused for distinct prompt observations');
});
test('V18 HOLDOUT baseline provider version is the preregistered cohort version',()=>{
 const j=fixture();for(const r of j.observations.filter(r=>r.status==='OBSERVED')){
  const group=j.study.expected_groups.find(g=>g.surface===r.surface&&g.locale===r.locale);
  assert.equal(r.capture.product_version,group.product_version);
 }
});
test('V18 HOLDOUT one screenshot reused across different prompts cannot pass as independent sample',()=>{
 const x=fixture();const a=x.observations.filter(r=>r.status==='OBSERVED');
 a[1].capture.artifact=a[0].capture.artifact;invalid(x);
});
test('V18 HOLDOUT a changed provider/model version cannot pass preregistered sample',()=>{
 const x=fixture();x.observations[0].capture.product_version='different-model-release';invalid(x);
});
test('V18 HOLDOUT missing actual execution geography invalidates claimed country comparison',()=>{
 const x=fixture();delete x.observations[0].capture.geo;invalid(x);
});
test('V18 HOLDOUT capture location different from question region is not a matched cohort',()=>{
 const x=fixture();x.observations[0].capture.geo='GB';invalid(x);
});
test('V18 HOLDOUT malformed null recommendation item produces controlled FAIL not crash',()=>{
 const x=fixture();x.observations[0].answer.recommendations[0]=null;
 assert.doesNotThrow(()=>check(x));invalid(x);
});
test('V18 HOLDOUT old provider source review cannot silently be called current',()=>{
 const x=atlas();x.sources[0].reviewed_at_utc='2020-01-01T00:00:00Z';
 const r=checkRecommendarRegistry(x,{now:Date.parse('2026-11-25T12:00:00Z')});
 assert.equal(r.status,'FAIL',JSON.stringify(r.errors));
});
test('V18 HOLDOUT obvious avoid-use wording is not a positive recommendation',()=>{
 const x=fixture(),a=x.observations[0].answer;
 a.raw_excerpt='Avoid NovaTools for this exact task. AtlasSuite is a strong alternative for advanced teams.';
 a.recommendations[0].evidence_quote='Avoid NovaTools for this exact task.';
 invalid(x);
});
