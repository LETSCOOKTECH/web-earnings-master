import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {checkAiSurfaceAtlas} from '../scripts/check-ai-surface-v14.mjs';
const root=path.resolve(import.meta.dirname,'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'sources/ai_search_v14_surface_atlas.json'),'utf8'));
const copy=()=>structuredClone(data);
const check=d=>checkAiSurfaceAtlas(d,{hasFile:p=>fs.existsSync(path.join(root,p))});
test('19 distinct provider surfaces, 8 modes and professional docs exist',()=>{
 const r=check(copy());assert.equal(r.valid,true,JSON.stringify(r.errors));assert.equal(r.count,19);assert.equal(r.modes.length,8);
});
test('Google 2026 dedicated Generative AI report is not hidden by old Search Web-only claims',()=>{
 const g=data.surfaces.find(x=>x.id==='google-gsc-ai-report');
 assert.equal(g.source_status,'ORIGINAL_BODY_OPENED');assert.match(g.policy_summary,/June 3 2026/);
});
test('Google shared training preference 2027 not mislabeled live requirement',()=>{
 const g=data.surfaces.find(x=>x.id==='google-training-2027');assert.equal(g.mode,'FUTURE_CONTROL');
});
test('Search and training agents are kept separate',()=>{
 const o=data.surfaces.find(x=>x.id==='openai-chatgpt-search'),t=data.surfaces.find(x=>x.id==='openai-gptbot');
 assert.equal(o.agent,'OAI-SearchBot');assert.equal(t.agent,'GPTBot');
 assert.notEqual(o.mode,t.mode);
});
test('Perplexity uninspected original stays a reference lead',()=>{
 assert.equal(data.surfaces.find(x=>x.id==='perplexity-search').source_status,'REFERENCE_LEAD');
});
test('Missing primary bot surface fails provider coverage',()=>{
 const d=copy();d.surfaces=d.surfaces.filter(x=>x.id!=='openai-chatgpt-search');
 assert.equal(check(d).valid,false);
});
test('Duplicate product surface id cannot double count coverage',()=>{
 const d=copy();d.surfaces[1].id=d.surfaces[0].id;assert.equal(check(d).valid,false);
});
test('AI training 2027 incorrectly marked current is rejected',()=>{
 const d=copy();d.surfaces.find(x=>x.id==='google-training-2027').mode='SEARCH_INDEX';
 assert.equal(check(d).valid,false);
});
test('Unopened Perplexity document cannot be magically marked opened',()=>{
 const d=copy();d.surfaces.find(x=>x.id==='perplexity-search').source_status='ORIGINAL_BODY_OPENED';
 assert.equal(check(d).valid,false);
});
test('Malicious lookalike official URL is rejected',()=>{
 const d=copy();d.surfaces[0].source_url='https://developers.google.com.attacker.tld/ai';
 assert.equal(check(d).valid,false);
});
test('Self-certified semantics and owner verified cannot replace evidence',()=>{
 const d=copy();d.surfaces[0].official_semantics_not_independently_certified=false;
 assert.equal(check(d).valid,false);
});
test('Missing safety/verification context fails',()=>{
 const d=copy();d.surfaces[0].owner_external_evidence_needed='';
 assert.equal(check(d).valid,false);
});
test('Actual repository CLI labels scope metadata only',()=>{
 const p=spawnSync(process.execPath,['scripts/check-ai-surface-v14.mjs'],{cwd:root,encoding:'utf8'});
 assert.equal(p.status,0,p.stderr);assert.match(p.stdout,/PROVIDER_ATLAS_METADATA_ONLY/);
});
test('Professional AEO and GEO docs must exist',()=>{
 for(const p of ['README.md','01-provider-crawlers-controls.md','02-answer-quality.md','03-geo-measurement.md','04-agent-task-reliability.md','05-agent-execution.md'])
  assert.ok(fs.readFileSync(path.join(root,'docs/ai-search',p),'utf8').length>1500,p);
});

test('V14 evaluation research requires preregistered panel, scope and distinct metrics',()=>{
 const s=fs.readFileSync(path.join(root,'docs/ai-search/06-evaluation-research-playbook.md'),'utf8');
 assert.match(s,/Attempted prompts/);assert.match(s,/HUMAN_REFERRAL/);assert.match(s,/NET_AD_REVENUE/);
 const h=fs.readFileSync(path.join(root,'templates/ai-search-v14-observation-ledger.csv'),'utf8');
 assert.match(h,/visible_owned_citation/);assert.match(h,/unavailable_reason/);
});
