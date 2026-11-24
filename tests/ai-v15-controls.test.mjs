import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {auditGoogleAiControlsV15 as audit} from '../scripts/audit-ai-controls-v15.mjs';
import {evaluateAiVisibilityV14 as sample} from '../scripts/evaluate-ai-visibility-v14.mjs';
const html='<html><head><title>Useful CSV transform</title></head><body><main><h1>Working tool</h1><p>Actual task description.</p></main></body></html>';
const root=path.resolve(import.meta.dirname,'..');
const fixture=()=>JSON.parse(fs.readFileSync(path.join(root,'templates/ai-visibility-v14.SYNTHETIC.json'),'utf8'));
test('search crawler remains allowed while independent Google-Extended training/non-Search grounding preference is blocked',()=>{
  const r=audit({html,robots:'User-agent: Google-Extended\nDisallow: /\nUser-agent: Googlebot\nAllow: /'});
  assert.equal(r.status,'LOCAL_ONLY_EXTERNAL_UNKNOWN');
  assert.equal(r.google_search_ai.googlebot_robots_allowed,true);
  assert.equal(r.independent_non_search_controls.google_extended_robots_allowed,false);
  assert.equal(r.independent_non_search_controls.search_ai_inclusion_inferred_from_google_extended,false);
  assert.equal(r.google_search_ai.owner_control_authenticated,false);
});
test('Googlebot disallow causes inclusion conflict even when Google-Extended allowed',()=>{
  const r=audit({html,robots:'User-agent: Googlebot\nDisallow: /\nUser-agent: Google-Extended\nAllow: /'});
  assert.equal(r.status,'LOCAL_CONFLICT');
  assert.ok(r.blockers.some(x=>x.includes('Googlebot')));
});
test('specific Allow for Googlebot path overrides less specific Disallow',()=>{
  const r=audit({html,route:'/tools/clean/',robots:'User-agent: Googlebot\nDisallow: /tools/\nAllow: /tools/clean/'});
  assert.equal(r.google_search_ai.googlebot_robots_allowed,true);
  assert.equal(r.status,'LOCAL_ONLY_EXTERNAL_UNKNOWN');
});
test('page-wide nosnippet is a search AI eligibility blocker',()=>{
  const r=audit({html:html.replace('<head>','<head><meta name="googlebot" content="nosnippet">'),robots:''});
  assert.equal(r.status,'LOCAL_CONFLICT');assert.equal(r.google_search_ai.nosnippet,true);
});
test('max-snippet:0 X-Robots header is a preview blocker, not a positive citation signal',()=>{
  const r=audit({html,robots:'',xRobotsTag:'max-snippet:0'});
  assert.equal(r.status,'LOCAL_CONFLICT');assert.equal(r.google_search_ai.max_snippet_zero,true);
});
test('noindex header is a Search index blocker',()=>{
  const r=audit({html,robots:'',xRobotsTag:'googlebot: noindex'});
  assert.equal(r.status,'LOCAL_CONFLICT');assert.equal(r.google_search_ai.noindex,true);
});
test('data-nosnippet is selective and does not independently suppress the whole page',()=>{
  const r=audit({html:html.replace('Actual task','<span data-nosnippet>Private example</span> Actual task'),robots:''});
  assert.equal(r.status,'LOCAL_ONLY_EXTERNAL_UNKNOWN');
  assert.equal(r.google_search_ai.selective_data_nosnippet,true);
});
test('Search Console generative exclusion is distinct from Google-Extended and never authenticated by JSON',()=>{
  const r=audit({html,robots:'',ownerSetting:'EXCLUDED_SELF_DECLARED'});
  assert.equal(r.status,'LOCAL_CONFLICT');assert.equal(r.google_search_ai.owner_control_authenticated,false);
  const b=audit({html,robots:'User-agent: Google-Extended\nDisallow: /',intent:'EXCLUDE_SEARCH_AI'});
  assert.equal(b.status,'LOCAL_ONLY_EXTERNAL_UNKNOWN');
  assert.ok(b.warnings.some(x=>x.includes('Search Console')));
});
test('future 2027 training preference never becomes present Search requirement',()=>{
  const r=audit({html,robots:'User-agent: __usage_ai-training\nDisallow: /'});
  assert.equal(r.status,'LOCAL_ONLY_EXTERNAL_UNKNOWN');
  assert.equal(r.independent_non_search_controls.training_2027_signal,'FUTURE_NOT_CURRENT');
});
test('unexpected inputs and false owner assertion cannot pass',()=>{
  assert.equal(audit({html,robots:'',ownerSetting:'VERIFIED_BY_ME'}).status,'FAIL_INPUT');
  assert.equal(audit({html,robots:'',route:'https://other.example/'}).status,'FAIL_INPUT');
});
test('citation panel cannot omit prompts for one observed provider group',()=>{
  const x=fixture();
  x.observations.push({...x.observations[0],surface:'bing-ai-performance',artifact_ref:'synthetic-bing-capture',observed_at:'2026-11-24T10:06:00Z'});
  const r=sample(x,{now:Date.parse('2026-11-25T00:00:00Z')});
  assert.equal(r.status,'FAIL');
  assert.ok(r.errors.some(e=>e.includes('Missing pre-registered prompt')&&e.includes('bing-ai-performance')),JSON.stringify(r.errors));
});
test('pre-registered provider group missing entirely cannot be hidden by a different group',()=>{
  const x=fixture();
  x.study.expected_groups.push({surface:'claude-search',locale:'en-US'});
  const r=sample(x,{now:Date.parse('2026-11-25T00:00:00Z')});
  assert.equal(r.status,'FAIL');
  assert.ok(r.errors.some(e=>e.includes('Missing expected provider group')),JSON.stringify(r.errors));
});
