import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {auditMarkdownLocalLinks} from '../scripts/audit-repository-links-v20.mjs';
const root=path.resolve(import.meta.dirname,'..');
test('report critical local links separately and never claim external availability',()=>{
 const r=auditMarkdownLocalLinks(root,{paths:['README.md','examples/seo-csv-lab/README.md','docs/START_HERE.md','AGENTS.md']});
 assert.equal(r.external_links_verified,false);
 assert.equal(r.public_demo_verified,false);
 assert.ok(r.checked>=5);
});
test('missing local Markdown target is a discovered failure',()=>{
 const d=fs.mkdtempSync(path.join(os.tmpdir(),'sense-md-'));
 try{fs.writeFileSync(path.join(d,'README.md'),'[dead manual](docs/missing.md)');const r=auditMarkdownLocalLinks(d,{paths:['README.md']});
  assert.equal(r.status,'BROKEN_LOCAL_LINKS');assert.equal(r.critical.length,1);
 }finally{fs.rmSync(d,{recursive:true,force:true});}
});
test('relative directory with README and exact file path accepted',()=>{
 const d=fs.mkdtempSync(path.join(os.tmpdir(),'sense-md-'));
 try{fs.mkdirSync(path.join(d,'manual'));fs.writeFileSync(path.join(d,'manual/README.md'),'# Guide');
  fs.writeFileSync(path.join(d,'README.md'),'[manual](manual/) [page](manual/README.md)');
  const r=auditMarkdownLocalLinks(d,{paths:['README.md']});assert.equal(r.status,'LOCAL_LINKS_OK_EXTERNAL_UNKNOWN');
 }finally{fs.rmSync(d,{recursive:true,force:true});}
});
test('reserved example URL is explicitly warned and not passed as public demo',()=>{
 const d=fs.mkdtempSync(path.join(os.tmpdir(),'sense-md-'));
 try{fs.writeFileSync(path.join(d,'README.md'),'[Use online demo](https://csv-lab.example.org/)');
  const r=auditMarkdownLocalLinks(d,{paths:['README.md']});assert.equal(r.warnings.length,1);
  assert.equal(r.public_demo_verified,false);
 }finally{fs.rmSync(d,{recursive:true,force:true});}
});
test('cannot link outside repository root',()=>{
 const d=fs.mkdtempSync(path.join(os.tmpdir(),'sense-md-'));
 try{fs.writeFileSync(path.join(d,'README.md'),'[escape](../secrets.txt)');
  const r=auditMarkdownLocalLinks(d,{paths:['README.md']});assert.match(r.failures[0].issue,/escapes repository/);
 }finally{fs.rmSync(d,{recursive:true,force:true});}
});


test('GitHub directory links without README are valid navigation targets',()=>{
 const d=fs.mkdtempSync(path.join(os.tmpdir(),'sense-dir-'));
 try{fs.mkdirSync(path.join(d,'assets'));fs.writeFileSync(path.join(d,'README.md'),'[assets](assets/)');
  const r=auditMarkdownLocalLinks(d,{paths:['README.md']});
  assert.equal(r.status,'LOCAL_LINKS_OK_EXTERNAL_UNKNOWN');
 }finally{fs.rmSync(d,{recursive:true,force:true});}
});
