import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {spawnSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
const original=path.join(root,'examples/seo-csv-lab/site');
function audit(dist,...extra){return spawnSync(process.execPath,[path.join(root,'scripts/audit-static-site.mjs'),'--dist',dist,'--origin','https://csv-lab.example.org',...extra],{cwd:root,encoding:'utf8'});}
function withCopy(fn){const dir=fs.mkdtempSync(path.join(os.tmpdir(),'sense-assets-'));try{fs.cpSync(original,dir,{recursive:true});return fn(dir)}finally{fs.rmSync(dir,{recursive:true,force:true})}}
test('Example actual shipped HTML and local JS/CSS assets pass static SEO',()=>{const r=audit(original);assert.equal(r.status,0,r.stdout+r.stderr);});
test('Removing actual shipped tool JS is a static missing asset blocker',()=>withCopy(dir=>{fs.rmSync(path.join(dir,'assets/tool.mjs'));const r=audit(dir);assert.equal(r.status,1);assert.match(r.stderr,/missing or unsafe local script/);}));
test('Removing actual CSS is a missing stylesheet blocker',()=>withCopy(dir=>{fs.rmSync(path.join(dir,'assets/style.css'));const r=audit(dir);assert.equal(r.status,1);assert.match(r.stderr,/missing or unsafe local script\/stylesheet/);}));
test('Production static audit refuses synthetic example.org canonical/host',()=>{const r=audit(original,'--production');assert.equal(r.status,2);assert.match(r.stderr,/IANA example domain|placeholder or test origin/);});
test('Production cannot be certified from a local CSV lab even when SEO passes',()=>{const r=audit(original);assert.equal(r.status,0);assert.match(r.stdout,/STATIC SIGNALS ONLY/);});
