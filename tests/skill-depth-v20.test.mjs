import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {auditSkillText,auditSkillLibrary} from '../scripts/audit-skill-depth-v20.mjs';
const root=path.resolve(import.meta.dirname,'..');
const rootNames=fs.readdirSync(path.join(root,'.agents/skills'));
const registered=JSON.parse(fs.readFileSync(path.join(root,'sources/production_skills_v7.json'),'utf8')).skills.map(x=>x.id);
const load=()=>Object.fromEntries(rootNames.map(name=>[name,fs.readFileSync(path.join(root,'.agents/skills',name,'SKILL.md'),'utf8')]));
test('audits exactly 49 active skills, not stale README milestone counts',()=>{
 const r=auditSkillLibrary(load(),registered);
 assert.equal(r.inventory_matches_registry,true);
 assert.equal(r.counts.registered,49);
 assert.equal(r.counts.found,49);
});
test('skill coverage audit does NOT call source links or local checks verified production',()=>{
 const r=auditSkillLibrary(load(),registered);
 assert.equal(r.all_skills_production_certified,false);
 assert.equal(r.source_originals_semantically_verified,false);
 assert.equal(r.agent_realworld_task_outcomes_verified,false);
});
test('no executable checks and short domains are flagged rather than approved',()=>{
 const s='---\nname: web-demo\n---\n# Demo\n**Trigger:** hello. Read docs/README.md. Production unknown.';
 const r=auditSkillText('web-demo',s);
 assert.ok(r.warnings.some(x=>x.includes('650')));
 assert.ok(r.warnings.some(x=>x.includes('executable')));
});
test('missing a registered skill fails the coverage inventory',()=>{
 const x=load();delete x[registered[0]];
 assert.equal(auditSkillLibrary(x,registered).status,'INVALID_INVENTORY');
});
test('unregistered extra skill does not inflate counts to a false PASS',()=>{
 const x=load();x['new-fake-skill']='---\nname: new-fake-skill\n---\n';
 assert.equal(auditSkillLibrary(x,registered).status,'INVALID_INVENTORY');
});
test('a manifest name mismatch fails regardless of word count',()=>{
 const x=load();const name=registered[0];x[name]=x[name].replace('name: '+name,'name: another-skill');
 assert.equal(auditSkillLibrary(x,registered).status,'INVALID_INVENTORY');
});
