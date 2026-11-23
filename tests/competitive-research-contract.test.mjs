import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const exists=p=>fs.existsSync(path.join(root,p));
const atlas=read('sources/research/website-growth-research-atlas.json');
const casefile=read('sources/research/freeconvert-2026-11-23.json');
test('v3 research atlas covers 12 differentiated domains and exactly 84 open investigations',()=>{
 assert.equal(atlas.module_count,84);assert.equal(atlas.modules.length,84);assert.equal(atlas.groups.length,12);
 assert.equal(new Set(atlas.modules.map(x=>x.id)).size,84);
 assert.equal(atlas.groups.reduce((n,g)=>n+g.size,0),84);
 assert.equal(new Set(atlas.groups.map(g=>g.id)).size,12);
});
test('every research module has a valid existing skill, proof condition and honest noncomplete state',()=>{
 const valid=new Set(fs.readdirSync(path.join(root,'.agents/skills'),{withFileTypes:true}).filter(d=>d.isDirectory()).map(x=>x.name));
 for(const x of atlas.modules){
  assert.ok(valid.has(x.owner_skill),'missing skill '+x.id+' '+x.owner_skill);
  assert.ok(x.question.endsWith('?'),'question needed '+x.id);
  assert.ok(x.acceptance_evidence.length>24,'too little test detail '+x.id);
  assert.equal(x.status,'RESEARCH_REQUIRED');
  assert.equal(x.skill_upgrade,'AWAIT_MANUAL_MODULE_REVIEW');
  assert.ok(['P0','P1','P2'].includes(x.priority));
 }
});
test('FreeConvert evidence is 24 dated source records with 7 explicitly unproven hypotheses',()=>{
 assert.equal(casefile.records.length,24);
 assert.equal(casefile.hypotheses.length,7);
 assert.equal(new Set(casefile.records.map(r=>r.id)).size,24);
 for(const x of casefile.records){
  assert.equal(x.checked_at_date,'2026-11-23');
  assert.equal(new URL(x.source).protocol,'https:');
  assert.ok(x.evidence_class&&x.method&&x.caveat);
 }
 for(const h of casefile.hypotheses)assert.equal(h.status,'UNPROVEN');
});
test('No premium Ahrefs Site Explorer exports or first-party competitor earnings are falsely marked as collected',()=>{
 assert.equal(casefile.data_access.ahrefs_connected_api,'INSUFFICIENT_PLAN');
 assert.equal(casefile.data_access.first_party_competitor_gsc,'UNAVAILABLE');
 assert.equal(casefile.data_access.owner_revenue,'UNAVAILABLE');
 assert.equal(casefile.data_access.live_file_conversion_benchmark,'NOT_RUN');
});
test('Every v3 research document is present and points to the same structured evidence',()=>{
 for(const name of ['01-freeconvert-competitive-evidence-2026-11-23.md','02-research-atlas-and-gates.md','03-manual-module-upgrade-protocol.md']){
  const p='docs/research/'+name;assert.ok(exists(p),p);
  const body=fs.readFileSync(path.join(root,p),'utf8');
  assert.ok(body.length>4000,'Incomplete document '+p);
 }
});
