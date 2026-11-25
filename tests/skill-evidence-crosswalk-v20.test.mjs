import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {checkCrosswalk} from '../scripts/check-skill-evidence-crosswalk-v20.mjs';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const base=()=>read('sources/skill-evidence-crosswalk-v20.json');
const registry=read('sources/production_skills_v7.json');
const official=new Set(read('sources/official_sources.json').sources.map(x=>x.id));
const check=x=>checkCrosswalk(x,registry,official);
test('all 49 skills have explicit first party source leads with local and external tests',()=>{
 const r=check(base());assert.equal(r.status,'MAPPED_NOT_CERTIFIED');assert.equal(r.mapped_skills,49);assert.ok(r.source_ids_referenced>=50);
});
test('every mapped source still fails to independently certify actual expert quality or real website',()=>{
 const r=check(base());assert.equal(r.current_original_semantics_automatically_verified,false);assert.equal(r.user_task_production_certified,false);
});
test('fabricated source ID must break every skill source evidence contract',()=>{
 const x=base();x.skills[0].reference_source_ids=['fake-vendor-credential'];assert.equal(check(x).status,'FAIL');
});
test('missing skill cannot be hidden by a green source index',()=>{
 const x=base();x.skills.pop();assert.equal(check(x).status,'FAIL');
});
test('duplicate skill entries cannot mask missing domain knowledge',()=>{
 const x=base();x.skills[1].id=x.skills[0].id;assert.equal(check(x).status,'FAIL');
});
test('false source original certification is rejected',()=>{
 const x=base();x.skills[0].source_status='ALL_SOURCES_CURRENT_AND_VERIFIED';assert.equal(check(x).status,'FAIL');
});
test('self-certified live web traffic and index readiness are rejected',()=>{
 const x=base();x.skills[0].external_status='CERTIFIED_PRODUCTION';assert.equal(check(x).status,'FAIL');
});
test('reference without actual local gate is insufficient',()=>{
 const x=base();x.skills[0].local_evidence_expected='';assert.equal(check(x).status,'FAIL');
});
