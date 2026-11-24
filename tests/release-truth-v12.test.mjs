import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {evaluateRelease,GATES} from '../scripts/release-truth-gate.mjs';
const NOW=Date.parse('2026-11-24T10:00:00Z');
const original=JSON.parse(fs.readFileSync(new URL('../templates/release-truth-v12.example.json',import.meta.url),'utf8'));
const make=()=>structuredClone(original);
const check=(m,root=process.cwd())=>evaluateRelease(m,{root,now:NOW});
const withLab=fn=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'truth-v12-'));
 try{
  const p=path.join(dir,'observed-result.txt'),bytes='A real local artifact; not a Google account\n';
  fs.writeFileSync(p,bytes);
  const sha=crypto.createHash('sha256').update(bytes).digest('hex');
  return fn(dir,sha);
 }finally{fs.rmSync(dir,{recursive:true,force:true})}
};
function setLocal(m,sha){
 for(const g of m.gates.filter(g=>GATES[g.id]==='LOCAL')){
  g.status='PASS';g.evidence=[{method:'LOCAL_ARTIFACT',artifact:'observed-result.txt',sha256:sha,observed_at:'2026-11-24T09:00:00Z'}];
 }
}
test('default no-evidence fixture never ready for local or production',()=>{
 const r=check(make());assert.equal(r.production_ready,false);assert.equal(r.eligible_for_local_review,false);
});
test('all self-declared PASS records without artifacts are invalid, not production',()=>{
 const m=make();m.gates.forEach(g=>g.status='PASS');
 const r=check(m);assert.equal(r.production_ready,false);assert.equal(r.valid,false);
});
test('genuine local file hashes permit local REVIEW but not production approval',()=>withLab((dir,sha)=>{
 const m=make();setLocal(m,sha);
 const r=check(m,dir);assert.equal(r.valid,true);assert.equal(r.decision,'LOCAL_GATE_REVIEW_ONLY');
 assert.equal(r.verified_local_artifacts.length,4);assert.equal(r.production_ready,false);
}));
test('external self-certified indexed/AdSense/users/revenue PASS never upgrades assessment',()=>withLab((dir,sha)=>{
 const m=make();setLocal(m,sha);
 for(const id of ['owner_search_console','publisher_approval','real_human_tasks','revenue_reconciled'])
  m.gates.find(x=>x.id===id).status='PASS';
 const r=check(m,dir);assert.equal(r.production_ready,false);
 assert.equal(r.publisher_approved,false);assert.equal(r.indexed,false);assert.equal(r.financial_outcome_verified,false);
 assert.ok(r.unverified_claims.length>=4);
}));
test('external screenshot with valid hash still cannot prove user account truth',()=>withLab((dir,sha)=>{
 const m=make();setLocal(m,sha);
 const g=m.gates.find(x=>x.id==='browser_output');g.status='PASS';
 g.evidence=[{method:'BROWSER_ARTIFACT',artifact:'observed-result.txt',sha256:sha,observed_at:'2026-11-24T09:00:00Z'}];
 const r=check(m,dir);assert.equal(r.valid,true);
 assert.ok(r.unknown.some(x=>x.includes('browser_output')));assert.equal(r.production_ready,false);
}));
test('missing artifact is caught',()=>withLab((dir,sha)=>{
 const m=make();setLocal(m,sha);m.gates[0].evidence[0].artifact='missing.txt';
 assert.equal(check(m,dir).valid,false);
}));
test('changed artifact bytes invalidates hash',()=>withLab((dir,sha)=>{
 const m=make();setLocal(m,sha);m.gates[0].evidence[0].sha256='0'.repeat(64);
 assert.ok(check(m,dir).errors.some(x=>x.includes('checksum')));
}));
test('directory traversal out of project root fails',()=>withLab((dir,sha)=>{
 const m=make();setLocal(m,sha);m.gates[0].evidence[0].artifact='../outside.txt';
 assert.equal(check(m,dir).valid,false);
}));
test('stale/future evidence timestamps are rejected',()=>withLab((dir,sha)=>{
 for(const stamp of ['2025-01-01T00:00:00Z','2028-01-01T00:00:00Z']){
  const m=make();setLocal(m,sha);m.gates[0].evidence[0].observed_at=stamp;
  assert.equal(check(m,dir).valid,false);
 }
}));
test('one failed critical task always blocks local readiness',()=>withLab((dir,sha)=>{
 const m=make();setLocal(m,sha);m.gates[0].status='FAIL';
 const r=check(m,dir);assert.equal(r.decision,'BLOCKED_DEFECTS');
}));
test('unknown mandatory local output blocks review',()=>withLab((dir,sha)=>{
 const m=make();setLocal(m,sha);m.gates[0].status='UNKNOWN';
 assert.equal(check(m,dir).eligible_for_local_review,false);
}));
test('cannot mark core task not applicable',()=>{
 const m=make();m.gates[0].status='NOT_APPLICABLE';m.gates[0].reason='Skipped';
 assert.equal(check(m).valid,false);
});
test('missing gate and duplicate evidence ids are rejected',()=>{
 const m=make();m.gates.pop();assert.equal(check(m).valid,false);
 const n=make();n.gates.push({...n.gates[0]});assert.equal(check(n).valid,false);
});
test('unknown extra optimistic release gate is rejected',()=>{
 const m=make();m.gates.push({id:'google_rank_number_one',status:'PASS',evidence:[]});
 assert.equal(check(m).valid,false);
});
test('invalid project source-commit or human job is rejected',()=>{
 const m=make();m.project.release_commit='';
 assert.equal(check(m).valid,false);
});
