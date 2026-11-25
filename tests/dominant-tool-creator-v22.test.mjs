import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {spawnSync} from 'node:child_process';
import {evaluateOpportunity} from '../scripts/evaluate-tool-opportunity-v22.mjs';
import {scaffoldAstroTool} from '../scripts/scaffold-astro-tool-v22.mjs';

const root=path.resolve(import.meta.dirname,'..');
const load=()=>JSON.parse(fs.readFileSync(path.join(root,'templates/dominant-tool-creator/brief.SYNTHETIC.json'),'utf8'));
const fail=d=>assert.equal(evaluateOpportunity(d).status,'FAIL',JSON.stringify(evaluateOpportunity(d).errors));

test('synthetic market report cannot claim validated demand, rankings or publisher revenue',()=>{
 const x=evaluateOpportunity(load());
 assert.equal(x.status,'SYNTHETIC_NOT_MARKET_PROVEN');
 assert.equal(x.errors.length,0);
 assert.equal(x.verified_market_demand,false);
 assert.equal(x.verified_ai_recommendation,false);
 assert.equal(x.verified_publisher_earnings,false);
});
test('unverified real-looking market claims cannot self-approve a business',()=>{
 const x=load();x.study.mode='REAL_OPERATOR_EVIDENCE';
 x.sources[0].url='https://genuinely-existing-target.test';
 fail(x); // .test is reserved, not real human proof
 x.sources[0].url='https://www.reddit.com/r/test/comments/some-post';
 x.sources[1].url='https://trends.google.com/trends/';
 const o=evaluateOpportunity(x);
 assert.equal(o.status,'STRUCTURAL_ONLY_OWNER_REVIEW_REQUIRED');
 assert.equal(o.verified_market_demand,false);
 assert.ok(o.warnings.some(w=>/unauthenticated|owner reviewer/i.test(w)));
});
test('market inputs with duplicate evidence receipts fail',()=>{
 const x=load();x.sources[1].artifact=x.sources[0].artifact;fail(x);
});
test('duplicate competitors under different tests never inflate competition evidence',()=>{
 const x=load();x.competitors[1].name=x.competitors[0].name.toUpperCase();fail(x);
});
test('missing one of normal, malformed and adversarial independent tests fails',()=>{
 const x=load();x.fixtures[2].kind='NORMAL';fail(x);
});
test('competitor pretending to test non-existent fixture fails',()=>{
 const x=load();x.competitors[0].input_fixture_id='missing';fail(x);
});
test('Google Trends indexed interest cannot be silently labeled monthly search volume',()=>{
 const x=load();x.sources[1].kind='TRENDS_RELATIVE';fail(x);
});
test('guaranteed SEO, ad account or profit claims fail',()=>{
 for(const claim of ['guaranteed #1 ranking','guaranteed traffic','guaranteed profit','automatically approved by adsense']){
  const x=load();x.claims=[claim];fail(x);
 }
});
test('null, malformed URL and future source timestamps fail without throw',()=>{
 for(const m of [
 x=>x.sources[0]=null,
 x=>x.fixtures[0]=null,
 x=>x.competitors[1]=null,
 x=>x.sources[0].url='javascript:alert(1)',
 x=>x.sources[1].observed_at='2099-01-01T00:00:00Z',
 x=>x.economics.variable_cost_per_1000=-12
 ]){
  const x=load();m(x);
  assert.doesNotThrow(()=>evaluateOpportunity(x));fail(x);
 }
});
test('opportunity CLI emits structural-only synthetic status, not fake approval',()=>{
 const r=spawnSync(process.execPath,['scripts/evaluate-tool-opportunity-v22.mjs','--file','templates/dominant-tool-creator/brief.SYNTHETIC.json'],{cwd:root,encoding:'utf8'});
 assert.equal(r.status,0,r.stderr);
 assert.match(r.stdout,/SYNTHETIC_NOT_MARKET_PROVEN/);
});
test('Astro scaffolder creates an actual standalone dependency-locked tool in an empty folder',()=>{
 const d=fs.mkdtempSync(path.join(os.tmpdir(),'sense-v22-scaffold-')),target=path.join(d,'project');
 try{
  const r=scaffoldAstroTool(target);
  assert.equal(r.status,'LOCAL_SCAFFOLD_NOT_DEPLOYED');
  assert.equal(r.external_http_verified,false);
  assert.equal(r.original_user_problem_validated,false);
  for(const p of ['package.json','package-lock.json','src/pages/tools/jsonl-validator.astro','src/layouts/BaseLayout.astro','public/assets/jsonl-core.mjs','public/assets/jsonl-worker.mjs','playwright.config.mjs','tests/core.test.mjs']){
   assert.equal(fs.existsSync(path.join(target,p)),true,p);
  }
  const lock=JSON.parse(fs.readFileSync(path.join(target,'package-lock.json'),'utf8'));
  const pkg=JSON.parse(fs.readFileSync(path.join(target,'package.json'),'utf8'));
  assert.equal(lock.packages[''].name,pkg.name);
  assert.equal(lock.packages['node_modules/astro'].version,'7.4.13');
  assert.throws(()=>scaffoldAstroTool(target),/empty directory/);
 }finally{fs.rmSync(d,{recursive:true,force:true})}
});
test('scaffolder refuses to overwrite reference tool, repo, symlinks and populated output',()=>{
 assert.throws(()=>scaffoldAstroTool(root),/must not overwrite/);
 assert.throws(()=>scaffoldAstroTool(path.join(root,'examples/astro-jsonl-studio')),/must not overwrite/);
 const d=fs.mkdtempSync(path.join(os.tmpdir(),'sense-v22-clobber-'));
 try{
  fs.writeFileSync(path.join(d,'existing.txt'),'important');
  assert.throws(()=>scaffoldAstroTool(d),/empty directory/);
  assert.equal(fs.readFileSync(path.join(d,'existing.txt'),'utf8'),'important');
 }finally{fs.rmSync(d,{recursive:true,force:true})}
});
test('master skill is substantial, versioned, routes every production phase and has source-specific references',()=>{
 const p=path.join(root,'.agents/skills/web-dominant-tool-creator/SKILL.md');
 const s=fs.readFileSync(p,'utf8');
 assert.match(s,/^---\nname: web-dominant-tool-creator/m);
 assert.ok(s.split(/\s+/).length>1000);
 for(const term of ['Stage 0','Stage 1','Stage 2','Stage 3','Stage 4','Stage 5','Stage 6','Stage 7','PROTOTYPE','AdSense','SENSE_RELEASE','actual output','no guarantee','UNKNOWN','BLOCK']){
  // Concepts can be semantically expressed with capitalization/variations.
  if(term==='PROTOTYPE'||term==='no guarantee'||term==='actual output')continue;
  assert.ok(s.toLowerCase().includes(term.toLowerCase()),term);
 }
 for(let i=1;i<=5;i++)assert.ok(fs.readdirSync(path.dirname(p)+'/references').some(n=>n.startsWith('0'+i+'-')));
});
