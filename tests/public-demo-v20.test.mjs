import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {validatePublicSiteOrigin} from '../scripts/validate-public-origin-v20.mjs';
import {buildPublicCsvDemo} from '../scripts/build-public-csv-demo-v20.mjs';
import {startSeoCsvLab} from '../scripts/serve-seo-csv-lab.mjs';

const root=path.resolve(import.meta.dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');

test('reserved example.org subdomain is NOT an actual public deployment',()=>{
 const p=validatePublicSiteOrigin('https://csv-lab.example.org/');
 assert.equal(p.ok,false);
 assert.match(p.issues.join(' '),/IANA example domain/);
});
test('all IANA example and test domains blocked even on alternate subdomains',()=>{
 for(const h of ['example.com','example.org','example.net','docs.example.com','csv-lab.example.org','test','foo.test','dev.invalid','my-host.example','my.localhost','dev.internal']){
  assert.equal(validatePublicSiteOrigin('https://'+h+'/').ok,false,h);
 }
});
test('unknown non-reserved public-looking origin is syntax-only, never proof',()=>{
 const r=validatePublicSiteOrigin('https://candidate-web-tool-domain.com/');
 assert.equal(r.ok,true);assert.equal(r.status,'SYNTAX_ONLY_EXTERNAL_DEPLOYMENT_UNVERIFIED');
});
test('malformed, local, non-HTTPS, credential and path-based launch origins rejected',()=>{
 for(const u of ['http://candidate-web-tool-domain.com/','https://127.0.0.1/','https://[::1]/','https://localhost/','https://user:pass@candidate-web-tool-domain.com/','https://candidate-web-tool-domain.com:8080/','https://candidate-web-tool-domain.com/other/','https://candidate-web-tool-domain.com/?q=1']){
  assert.equal(validatePublicSiteOrigin(u).ok,false,u);
 }
});
test('reserved origin never enters live HTTP audit even with a pretend authorization string',()=>{
 const d=fs.mkdtempSync(path.join(os.tmpdir(),'sense-v20-live-'));
 try{
  fs.writeFileSync(path.join(d,'routes.json'),JSON.stringify({pages:[{path:'/',indexable:true}]}));
  const p=spawnSync(process.execPath,['scripts/audit-live-site.mjs','--origin','https://csv-lab.example.org/','--authorized-origin','https://csv-lab.example.org','--routes-file',path.join(d,'routes.json')],{cwd:root,encoding:'utf8',timeout:3000});
  assert.equal(p.status,2,p.stdout+p.stderr);
  assert.match(p.stderr,/IANA example domain/);
 }finally{fs.rmSync(d,{recursive:true,force:true});}
});
test('production static audit rejects fixture placeholder before pretending it was deployed',()=>{
 const p=spawnSync(process.execPath,['scripts/audit-static-site.mjs','--dist','examples/seo-csv-lab/site','--origin','https://csv-lab.example.org','--production'],{cwd:root,encoding:'utf8'});
 assert.equal(p.status,2,p.stdout+p.stderr);
 assert.match(p.stderr,/IANA example domain/);
});
test('public build rejects reserved origin and never silently rewrites fixture into a deployment',()=>{
 const d=fs.mkdtempSync(path.join(os.tmpdir(),'sense-v20-build-'));
 try{assert.throws(()=>buildPublicCsvDemo({origin:'https://csv-lab.example.org/',outDir:path.join(d,'out')}),/IANA example domain/);}
 finally{fs.rmSync(d,{recursive:true,force:true});}
});
test('build produces real-origin canonical, robots and sitemap but explicitly NOT_DEPLOYED',()=>{
 const d=fs.mkdtempSync(path.join(os.tmpdir(),'sense-v20-publish-'));
 const o='https://candidate-web-tool-domain.com';
 try{
  const output=path.join(d,'out'),r=buildPublicCsvDemo({origin:o+'/',outDir:output});
  assert.equal(r.status,'BUILD_ONLY_NOT_DEPLOYED');
  for(const name of ['index.html','robots.txt','sitemap-index.xml','sitemap-0.xml']){
   const v=fs.readFileSync(path.join(output,name),'utf8');
   assert.ok(v.includes(o),name+' missing new origin');
   assert.ok(!v.includes('csv-lab.example.org'),name+' leaked test host');
  }
  assert.equal(fs.readFileSync(path.join(output,'assets/tool.mjs'),'utf8'),read('examples/seo-csv-lab/site/assets/tool.mjs'));
  const gate=spawnSync(process.execPath,['scripts/audit-static-site.mjs','--dist',output,'--origin',o,'--production'],{cwd:root,encoding:'utf8'});
  assert.equal(gate.status,0,gate.stdout+gate.stderr);
  const evidence=JSON.parse(fs.readFileSync(path.join(output,'BUILD_EVIDENCE.json')));
  assert.equal(evidence.external_http_verified,false);
  assert.equal(evidence.owner_authorized,false);
  assert.equal(evidence.search_index_verified,false);
  assert.equal(evidence.adsense_approved_verified,false);
 }finally{fs.rmSync(d,{recursive:true,force:true});}
});
test('build refuses to destroy the source or overwrite an unrelated populated folder',()=>{
 const d=fs.mkdtempSync(path.join(os.tmpdir(),'sense-v20-noclobber-')),f=path.join(d,'out');
 try{
  assert.throws(()=>buildPublicCsvDemo({origin:'https://candidate-web-tool-domain.com',outDir:path.join(root,'examples/seo-csv-lab/site')}),/overwrite/);
  fs.mkdirSync(f);fs.writeFileSync(path.join(f,'important.txt'),'retain me');
  assert.throws(()=>buildPublicCsvDemo({origin:'https://candidate-web-tool-domain.com',outDir:f}),/overwrite/);
  assert.equal(fs.readFileSync(path.join(f,'important.txt'),'utf8'),'retain me');
 }finally{fs.rmSync(d,{recursive:true,force:true});}
});
test('real shipped CSV lab responds over actual local HTTP, not example.org DNS',async()=>{
 const server=await startSeoCsvLab();
 try{
  const r=await fetch(server.origin+'/');
  assert.equal(r.status,200);
  const html=await r.text();
  assert.match(html,/Remove Duplicate CSV Rows in Your Browser/);
  assert.match(html,/csv-lab.example.org/); // local fixture metadata intentionally NOT a public site
 }finally{await server.close();}
});
test('operational README makes a runnable LOCAL command prominent, not a dead live demo link',()=>{
 const s=read('examples/seo-csv-lab/README.md');
 assert.match(s,/node scripts\/preview-seo-csv-lab-v20\.mjs/);
 assert.match(s,/NOT DEPLOYED|not deployed/i);
 assert.doesNotMatch(s,/\]\(https?:\/\/csv-lab\.example\.org/);
});
test('README does not claim it hosts any working CSV demo URL',()=>{
 const r=read('README.md');
 assert.match(r,/LOCAL CSV LAB.*NOT.*PUBLIC|CSV LAB.*LOCAL.*NOT PUBLIC/i);
 assert.doesNotMatch(r,/\]\(https:\/\/csv-lab\.example\.org/);
});
