import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
const cmd=(...args)=>spawnSync(process.execPath,[path.join(root,'scripts/audit-live-site.mjs'),...args],{cwd:root,encoding:'utf8'});
const goodFile='templates/seo-v11-page-map.example.json';
test('live audit fails closed with no explicitly authorized domain and manifest',()=>{
 const x=cmd('--origin','https://candidate-live-site.com/');assert.equal(x.status,2);
});
test('live audit rejects http and nonexistent manifest without external fetch',()=>{
 const x=cmd('--origin','http://candidate-live-site.com/','--routes-file',goodFile,'--authorized-origin','http://candidate-live-site.com/');assert.equal(x.status,2);
});
test('live audit rejects mismatched user-approved origin',()=>{
 const x=cmd('--origin','https://candidate-live-site.com/','--routes-file',goodFile,'--authorized-origin','https://another-approved-site.com/');
 assert.equal(x.status,2);assert.match(x.stderr,/authorized origin/);
});
test('live audit rejects sample fixture as production evidence',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'sense-v20-synthetic-'));
 try{
  const file=path.join(dir,'fixture.json');
  const sample=JSON.parse(fs.readFileSync(path.join(root,goodFile),'utf8'));
  sample.site_origin='https://candidate-live-site.com';
  fs.writeFileSync(file,JSON.stringify(sample));
  const x=cmd('--origin','https://candidate-live-site.com/','--routes-file',file,'--authorized-origin','https://candidate-live-site.com/');
  assert.equal(x.status,2);assert.match(x.stderr,/Synthetic route/);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
test('live audit rejects missing route manifest file rather than hardcoding image routes',()=>{
 const x=cmd('--origin','https://candidate-live-site.com/','--routes-file','NOT-EXISTING.json','--authorized-origin','https://candidate-live-site.com/');
 assert.equal(x.status,2);assert.match(x.stderr,/Cannot read page/);
});
test('live audit rejects malformed routes before external fetch',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'v11-routes-'));
 try{
  const f=path.join(dir,'bad.json');
  fs.writeFileSync(f,JSON.stringify({pages:[{path:'//bad/',indexable:true}],fixture:false,site_origin:'https://candidate-live-site.com'}));
  const x=cmd('--origin','https://candidate-live-site.com/','--routes-file',f,'--authorized-origin','https://candidate-live-site.com/');
  assert.equal(x.status,2);assert.match(x.stderr,/Invalid project route/);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
