import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {auditGoogleAiControlsV15} from '../scripts/audit-ai-controls-v15.mjs';
import {auditAiEligibility} from '../scripts/audit-ai-eligibility-v14.mjs';
import {checkAiSurfaceAtlas} from '../scripts/check-ai-surface-v14.mjs';
import {evaluateAiVisibilityV14} from '../scripts/evaluate-ai-visibility-v14.mjs';
import {evaluateRobots} from '../scripts/robots-evaluator.mjs';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const fixture=()=>JSON.parse(read('templates/ai-visibility-v14.SYNTHETIC.json'));
const simple='<html><head><title>Reliable public CSV tool</title></head><body><main><h1>CSV cleanup</h1><p>Upload a local file, process it without server transfer, review the output and save the result.</p></main></body></html>';
test('HOLDOUT Google robots meta none must be equivalent to noindex (official rule)',()=>{
 const html=simple.replace('</head>','<meta name="robots" content="none"></head>');
 assert.equal(auditGoogleAiControlsV15({html,robots:''}).status,'LOCAL_CONFLICT');
 assert.equal(auditAiEligibility({html,robots:''}).status,'FAIL');
});
test('HOLDOUT X-Robots-Tag none must prevent Google AI index eligibility',()=>{
 assert.equal(auditGoogleAiControlsV15({html:simple,robots:'',xRobotsTag:'none'}).status,'LOCAL_CONFLICT');
 assert.equal(auditAiEligibility({html:simple,robots:'',xRobotsTag:'none'}).status,'FAIL');
});
test('HOLDOUT directly inspected first-party Perplexity official crawler doc is an upgrade, not a schema error',()=>{
 const atlas=JSON.parse(read('sources/ai_search_v14_surface_atlas.json'));
 const p=atlas.surfaces.find(x=>x.id==='perplexity-search');
 assert.ok(p);
 p.source_status='ORIGINAL_BODY_OPENED';
 assert.equal(checkAiSurfaceAtlas(atlas).valid,true);
});
test('HOLDOUT missing provider/locale preregistration fails closed',()=>{
 const data=fixture();
 delete data.study.expected_groups;
 const r=evaluateAiVisibilityV14(data,{now:Date.parse('2026-11-25T00:00:00Z')});
 assert.equal(r.status,'FAIL');
});
test('HOLDOUT missing registered repeat for one question cannot inflate sample rate',()=>{
 const data=fixture();
 data.study.repeat_ids=['1','2'];
 data.observations.push({...data.observations[0],repeat_id:'2',observed_at:'2026-11-24T10:10:00Z',artifact_ref:'synthetic-second-trial'});
 const r=evaluateAiVisibilityV14(data,{now:Date.parse('2026-11-25T00:00:00Z')});
 assert.equal(r.status,'FAIL');
});
test('HOLDOUT per-crawler separation is preserved while strengthening rules',()=>{
 const robots='User-agent: Google-Extended\nDisallow: /\nUser-agent: Googlebot\nAllow: /\nUser-agent: OAI-SearchBot\nAllow: /';
 assert.equal(evaluateRobots(robots,'Google-Extended','/').allowed,false);
 assert.equal(evaluateRobots(robots,'Googlebot','/').allowed,true);
 assert.equal(evaluateRobots(robots,'OAI-SearchBot','/').allowed,true);
});
test('HOLDOUT owner-account and external outcomes remain explicitly unknown in local audit',()=>{
 const a=auditGoogleAiControlsV15({html:simple,robots:''});
 assert.equal(a.google_search_ai.owner_control_authenticated,false);
 assert.equal(a.google_search_ai.indexed_or_cited_verified,false);
 const b=evaluateAiVisibilityV14(fixture(),{now:Date.parse('2026-11-25T00:00:00Z')});
 assert.equal(b.provider_citation_verified,false);
 assert.equal(b.revenue_verified,false);
});
test('HOLDOUT provider guidance distinguishes Anthropic already-supported AIPREF from future Google support',()=>{
 const s=read('docs/ai-search/01-provider-crawlers-controls.md');
 assert.match(s,/Anthropic[\s\S]*October 30, 2026/);
 assert.match(s,/__usage_ai-training/);
 assert.match(s,/Perplexity-User/);
});
test('HOLDOUT README current skill count is not misleading to a new agent',()=>{
 const count=fs.readdirSync(path.join(root,'.agents/skills'),{withFileTypes:true}).filter(x=>x.isDirectory()&&fs.existsSync(path.join(root,'.agents/skills',x.name,'SKILL.md'))).length;
 assert.equal(count,48);
 const readme=read('README.md');
 assert.doesNotMatch(readme,/\*\*28 specialized Codex skills\*\*/);
});
