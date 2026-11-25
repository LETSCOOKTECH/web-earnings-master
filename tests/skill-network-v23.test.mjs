import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { checkNetwork } from '../scripts/check-skill-network-v23.mjs';

const reference=JSON.parse(fs.readFileSync(new URL('../sources/skill-network-v23.json',import.meta.url),'utf8'));
function fixture(edit=()=>{}){
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'sense-v23-'));
  const data=structuredClone(reference);
  edit(data,root);
  for(const s of data.stages.flatMap(x=>x.skills)){
    const dir=path.join(root,'.agents','skills',s.id);
    fs.mkdirSync(dir,{recursive:true});
    fs.writeFileSync(path.join(dir,'SKILL.md'),`---\nname: ${s.id}\ndescription: simulated acceptance fixture\n---\n`);
  }
  fs.mkdirSync(path.join(root,'sources'),{recursive:true});
  fs.writeFileSync(path.join(root,'sources/skill-network-v23.json'),JSON.stringify(data));
  const skills=reference.stages.flatMap(stage=>stage.skills);
  const ids=[...new Set(skills.flatMap(s=>s.official_source_ids??[]))];
  while(ids.length<data.first_party_source_count)ids.push(`fixture-${ids.length}`);
  fs.writeFileSync(path.join(root,'sources/official_sources.json'),JSON.stringify({sources:ids.map(id=>({id,url:'https://example.org/original-doc'}))}));
  fs.writeFileSync(path.join(root,'sources/skill-evidence-crosswalk-v20.json'),JSON.stringify({skills:skills.map(s=>({id:s.id,reference_source_ids:s.official_source_ids??[]}))}));
  return root;
}
function run(edit){const root=fixture(edit);try{return checkNetwork(root);}finally{fs.rmSync(root,{recursive:true,force:true});}}
test('all 50 routes are unique, reachable, sourced and gated',()=>{
  const r=run();assert.equal(r.ok,true,JSON.stringify(r.errors));assert.equal(r.skills,50);assert.equal(r.upstreams,26);assert.equal(r.stages,7);
});
test('reject unowned real on-disk specialist',()=>{
  const r=run((_data,root)=>{const d=path.join(root,'.agents','skills','web-orphan');fs.mkdirSync(d,{recursive:true});fs.writeFileSync(path.join(d,'SKILL.md'),'test');});
  assert.equal(r.ok,false);assert.match(r.errors.join('\n'),/on-disk skill without network owner/);
});
test('reject nonexistent upstream source',()=>{
  const r=run(d=>d.stages[1].skills[0].upstreams.push('invented-expert'));assert.equal(r.ok,false);assert.match(r.errors.join('\n'),/unknown upstream/);
});
test('reject duplicate ownership',()=>{
  const r=run(d=>d.stages[1].skills.push({...d.stages[2].skills[0]}));assert.equal(r.ok,false);assert.match(r.errors.join('\n'),/duplicate\/invalid skill/);
});
test('reject unverified upstream declared certified',()=>{
  const r=run(d=>d.upstreams[0].install_state='certified');assert.equal(r.ok,false);assert.match(r.errors.join('\n'),/improperly declared installed/);
});
test('reject full-file review missing immutable SHA',()=>{
  const r=run(d=>d.upstreams[0].blob_sha=null);assert.equal(r.ok,false);assert.match(r.errors.join('\n'),/immutable blob SHA/);
});
test('reject nonallowlisted remote instruction origin',()=>{
  const r=run(d=>d.upstreams[0].url='http://malicious.invalid/run');assert.equal(r.ok,false);assert.match(r.errors.join('\n'),/invalid source URL/);
});
test('reject missing source limitations',()=>{
  const r=run(d=>delete d.upstreams[0].risk);assert.equal(r.ok,false);assert.match(r.errors.join('\n'),/missing scope or limitation/);
});
test('reject fabricated active skill totals',()=>{
  const r=run(d=>d.declared_active_skills=100);assert.equal(r.ok,false);assert.match(r.errors.join('\n'),/declared skill count/);
});
test('reject impossible handoff stage',()=>{
  const r=run(d=>d.stages[1].next_stage_ids.push('imaginary-stage'));assert.equal(r.ok,false);assert.match(r.errors.join('\n'),/missing next stage/);
});

test('reject missing actual first-party original lead',()=>{
  const r=run(d=>d.stages[1].skills[0].official_source_ids.push('fabricated-official-policy'));
  assert.equal(r.ok,false);assert.match(r.errors.join('\n'),/unresolvable first-party source/);
});
test('reject individual skill lacking a local output oracle',()=>{
  const r=run(d=>delete d.stages[2].skills[0].local_oracle);
  assert.equal(r.ok,false);assert.match(r.errors.join('\n'),/missing individual deliverable/);
});
