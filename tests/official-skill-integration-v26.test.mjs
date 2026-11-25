import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {spawnSync} from 'node:child_process';
import {assessSkillTrials} from '../scripts/evaluate-agent-skill-trials-v26.mjs';
import {checkOfficialIntegration} from '../scripts/check-official-skill-integration-v26.mjs';

const root=path.resolve(import.meta.dirname,'..');
const manifest=()=>JSON.parse(fs.readFileSync(path.join(root,'sources/official-skill-integration-v26.json'),'utf8'));
const copy=()=>structuredClone(manifest());
const inspect=(data,options={})=>checkOfficialIntegration(root,{manifest:data,...options});
const bad=(data,reason)=>{const report=inspect(data);assert.equal(report.ok,false);assert.ok(report.errors.some(e=>e.includes(reason)),JSON.stringify(report.errors));};

test('V26 13 originally inspected upstream skills and all mapped Sense specialists pass provenance gate',()=>{
 const report=checkOfficialIntegration(root);
 assert.equal(report.ok,true,JSON.stringify(report.errors));
 assert.equal(report.records,13);
 assert.equal(report.skill_targets,20);
 assert.equal(report.status,'SOURCE_PINNED_METHODS_ROUTED_ONLY');
 assert.equal(report.third_party_code_installed,false);
 assert.equal(report.skills_independently_field_evaluated,false);
 assert.equal(report.production_traffic_or_revenue_verified,false);
});
test('official organizations and individual expert maintainer are not misrepresented',()=>{
 const data=copy();
 assert.equal(data.verified_source_ownership.addy.includes('not Google official'),true);
 assert.ok(data.records.filter(r=>r.authority==='INDIVIDUAL_MAINTAINER_NOT_GOOGLE_OFFICIAL').length>=3);
 const falseGoogle=copy();falseGoogle.records.find(r=>r.id==='addy-quality').authority='GOOGLE_OFFICIAL_ORG';bad(falseGoogle,'UNVERIFIED_OWNER_CLAIM');
 const fakeVendor=copy();fakeVendor.records[0].repository='not-vercel/agent-skills';bad(fakeVendor,'UNVERIFIED_OWNER_CLAIM');
});
test('missing or incorrect per-repository licensing blocks unsafe integration',()=>{
 const noLicense=copy();noLicense.records.find(r=>r.id==='anthropic-webapp').license_basis='UNKNOWN';bad(noLicense,'LICENSE_NOT_VERIFIED');
 const fakeVercel=copy();fakeVercel.records.find(r=>r.id==='vercel-ui').license_basis='MIT_LICENSE_FILE';bad(fakeVercel,'LICENSE_NOT_VERIFIED');
 assert.ok(inspect(copy()).warnings.some(w=>w.includes('root LICENSE')));
});
test('upstream scripts and wholesale copying remain forbidden',()=>{
 for(const property of ['execute_upstream_scripts','install_state','transfer']){
  const data=copy();const rec=data.records[1];
  rec[property]=property==='execute_upstream_scripts'?true:property==='install_state'?'INSTALLED':'COPY_WHOLE_REPO';
  bad(data,'UNSAFE_UPSTREAM_EXECUTION_OR_COPY');
 }
});
test('Git blob IDs must be real 40-hex and separate from mutable browser URLs',()=>{
 const data=copy();data.records[0].blob_sha='main';bad(data,'BAD_OR_UNPINNED_BLOB');
 const n=copy();n.records[0].git_blob_sha_immutable=n.records[0].blob_sha.slice(0,39)+'a';bad(n,'BAD_OR_UNPINNED_BLOB');
 const u=copy();u.records[0].url='https://github.com/'+u.records[0].repository+'/blob/'+u.records[0].blob_sha+'/'+u.records[0].skill_path;bad(u,'SOURCE_PATH_INVALID');
});
test('all 13 mapped source IDs must occur in the destination skill V26 section',()=>{
 const f=copy(),target=f.records[0].target_skills[0];const file=fs.readFileSync(path.join(root,'.agents/skills',target,'SKILL.md'),'utf8');
 const modified={ [target]:file.replace('`vercel-react`','`FAKE_UNRELATED`') };
 const result=inspect(f,{skills:modified});
 assert.equal(result.ok,false);
 assert.ok(result.errors.some(x=>x.includes('SOURCE_NOT_ROUTED_IN_SKILL:vercel-react:'+target)));
 
});
test('missing or forged skill handoff is detected independently',()=>{
 const f=copy();f.records[0].target_skills.push('invented-v26-skill');bad(f,'MISSING_TARGET_SKILL');
 const c=copy();c.records[0].target_skills.push('web-niche-validation');bad(c,'TARGET_NOT_INTEGRATED_V26');
});
test('duplicate source IDs, duplicate upstream files and source counts are held',()=>{
 const badId=copy();badId.records[1].id=badId.records[0].id;bad(badId,'DUPLICATE_SOURCE_ID');
 const badPath=copy();badPath.records[1].skill_path=badPath.records[0].skill_path;badPath.records[1].repository=badPath.records[0].repository;badPath.records[1].url=badPath.records[0].url;badPath.records[1].authority=badPath.records[0].authority;bad(badPath,'DUPLICATE_SOURCE_FILE');
 const badCount=copy();badCount.upstream_count=12;bad(badCount,'SOURCE_COUNT_MISMATCH');
});
test('core families cannot silently disappear',()=>{
 const data=copy();data.records=data.records.filter(x=>x.id!=='anthropic-skill-creator');data.upstream_count=data.records.length;bad(data,'CORE_UPSTREAM_FAMILIES_NOT_COVERED');
});
test('every target carries a current source/document URL and operational verification guard',()=>{
 const targets=[...new Set(copy().records.flatMap(x=>x.target_skills))];
 for(const id of targets){
  const src=fs.readFileSync(path.join(root,'.agents/skills',id,'SKILL.md'),'utf8');
  assert.ok(src.includes('## V26 —'),id);
  assert.ok(src.includes('node scripts/check-official-skill-integration-v26.mjs'),id);
  assert.ok(src.includes('NOT_RUN'),id);
 }
});

const trials=()=>({
 schema:'sense-agent-skill-trials-v26',experiment_id:'sense-holdout-v26',model_id:'pinned-eval-model',
 baseline_description:'Agent without Sense V26 instruction set',
 candidate_description:'Same agent, same model, with the Sense V26 instruction set',
 source_mode:'SYNTHETIC_EXAMPLE',
 cases:[
  {id:'case-one',kind:'DOMAIN_TASK',oracle:'expected verified actual downloadable output',task_fixture:'fixture-1',baseline:{status:'FAIL',artifact:'test-artifacts/baseline-1.json',duration_ms:25},candidate:{status:'PASS',artifact:'test-artifacts/candidate-1.json',duration_ms:50}},
  {id:'case-two',kind:'TRIGGER_NEGATIVE',oracle:'unrelated request does not load specialist skill',task_fixture:'fixture-2',baseline:{status:'PASS',artifact:'test-artifacts/baseline-2.json',duration_ms:26},candidate:{status:'PASS',artifact:'test-artifacts/candidate-2.json',duration_ms:42}},
  {id:'case-three',kind:'ADVERSARIAL',oracle:'malicious site instructions are treated only as data',task_fixture:'fixture-3',baseline:{status:'PASS',artifact:'test-artifacts/baseline-3.json',duration_ms:21},candidate:{status:'FAIL',artifact:'test-artifacts/candidate-3.json',duration_ms:35}}
 ]
});
test('Anthropic-inspired paired trial evaluator computes only observed synthetic paired outcomes',()=>{
 const r=assessSkillTrials(trials());
 assert.equal(r.status,'SYNTHETIC_NOT_PROOF');
 assert.equal(r.paired_count,3);
 assert.equal(r.paired_wins,1);
 assert.equal(r.paired_losses,1);
 assert.equal(r.paired_ties,1);
 assert.equal(r.observed_delta_percentage_points,0);
 assert.equal(r.actual_agent_runs_independently_verified,false);
 assert.equal(r.statistical_significance_established,false);
});
test('A/B comparison never silently scores missing baseline as a loss',()=>{
 const t=trials();
 t.cases[0].baseline={status:'NOT_RUN'};
 const r=assessSkillTrials(t);
 assert.equal(r.paired_count,2);
 assert.equal(r.observed_delta_percentage_points,0);
 assert.ok(r.warnings.includes('TOO_FEW_PAIRED_REAL_RUNS_FOR_DECISION'));
});
test('A/B trials reject fake status labels, missing artifacts and invalid modes',()=>{
 const a=trials();a.cases[0].baseline.status='SUCCESS';assert.equal(assessSkillTrials(a).status,'INVALID');
 const b=trials();b.cases[1].candidate.artifact='';assert.equal(assessSkillTrials(b).status,'INVALID');
 const c=trials();c.source_mode='VERIFIED_BENCHMARK_PASSED';assert.equal(assessSkillTrials(c).status,'INVALID');
});
test('operator-supplied field trial results are not self-certified as verified',()=>{
 const t=trials();t.source_mode='OPERATOR_SUPPLIED_UNVERIFIED';
 const r=assessSkillTrials(t);
 assert.equal(r.status,'STRUCTURAL_RESULTS_ONLY_UNAUTHENTICATED');
 assert.equal(r.actual_agent_runs_independently_verified,false);
});
test('actual CLI can evaluate a real local receipt without claiming live agent runs',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'sense-v26-'));
 try{
  const filename=path.join(dir,'trials.json');fs.writeFileSync(filename,JSON.stringify(trials()));
  const r=spawnSync(process.execPath,['scripts/evaluate-agent-skill-trials-v26.mjs','--file',filename],{cwd:root,encoding:'utf8',timeout:8000});
  assert.equal(r.status,0,r.stdout+r.stderr);
  assert.equal(JSON.parse(r.stdout).status,'SYNTHETIC_NOT_PROOF');
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
