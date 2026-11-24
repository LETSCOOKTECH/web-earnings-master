import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {checkCoverage,REQUIRED} from '../scripts/check-seo-coverage-v13.mjs';
const root=path.resolve(import.meta.dirname,'..');
const contract=JSON.parse(fs.readFileSync(path.join(root,'sources/seo_v13_coverage_contract.json'),'utf8'));
const atlas=JSON.parse(fs.readFileSync(path.join(root,'sources/seo_v13_primary_atlas.json'),'utf8'));
const clone=()=>structuredClone(contract);
const audit=x=>checkCoverage(x,atlas,{root});
test('29 scope domains with all seven first-party source categories pass local contract',()=>{
 const o=audit(clone());assert.equal(o.valid,true,JSON.stringify(o.errors));
 assert.ok(o.domains>=28);assert.equal(o.official_source_categories.length,7);assert.equal(o.status,'PASS_COVERAGE_METADATA_ONLY');
});
test('Every highest-risk required lifecycle contract is represented',()=>{
 assert.ok(REQUIRED.size>=15);
 const ids=new Set(contract.domains.map(x=>x.id));
 for(const x of REQUIRED)assert.ok(ids.has(x),x);
});
test('Coverage fails if SEO user need omitted',()=>{
 const x=clone();x.domains=x.domains.filter(v=>v.id!=='user-need');
 assert.equal(audit(x).valid,false);
});
test('Coverage fails if evidence-based source domain removed',()=>{
 const x=clone();x.domains=x.domains.filter(v=>v.id!=='query-provenance');
 assert.equal(audit(x).valid,false);
});
test('Unknown official source is rejected',()=>{
 const x=clone();x.domains[0].official_source_id='imaginary-google-internal-weight';
 assert.equal(audit(x).valid,false);
});
test('Missing actual skill file fails rather than trusting manifest claim',()=>{
 const x=clone();x.domains[0].owner_skill='super-google-rank-agent';
 assert.equal(audit(x).valid,false);
});
test('Missing guide fails; link-only references are not actual files',()=>{
 const x=clone();x.domains[0].guide='docs/seo-master/not-here.md';
 assert.equal(audit(x).valid,false);
});
test('Directory traversal in guide path is refused',()=>{
 const x=clone();x.domains[0].guide='docs/seo-master/../../secrets.txt';
 assert.equal(audit(x).valid,false);
});
test('Missing critical failure proof makes a domain incomplete',()=>{
 const x=clone();x.domains[0].critical_failure='none';
 assert.equal(audit(x).valid,false);
});
test('Missing observable acceptance proof makes a domain incomplete',()=>{
 const x=clone();x.domains[0].acceptance_evidence='pass';
 assert.equal(audit(x).valid,false);
});
test('A coverage map cannot certify external indexing or approval',()=>{
 const x=clone();x.domains[0].external_outcome_not_certified=false;
 assert.equal(audit(x).valid,false);
});
test('Duplicate domain id is invalid',()=>{
 const x=clone();x.domains.push({...x.domains[0]});
 assert.equal(audit(x).valid,false);
});
test('Unsupported lifecycle phase is invalid',()=>{
 const x=clone();x.domains[0].phase='RANK_NUMBER_ONE';
 assert.equal(audit(x).valid,false);
});
test('Missing all publisher references fails category completeness',()=>{
 const x=clone();x.domains.forEach(v=>{if(['publisher-page','publisher-account','revenue-evidence','privacy'].includes(v.id))v.official_source_id='google-technical'});
 assert.equal(audit(x).valid,false);
});
test('On-disk offline coverage checker returns scope-only not Google certification',()=>{
 const x=spawnSync(process.execPath,['scripts/check-seo-coverage-v13.mjs'],{cwd:root,encoding:'utf8'});
 assert.equal(x.status,0,x.stderr);assert.match(x.stdout,/PASS_COVERAGE_METADATA_ONLY/);
});
