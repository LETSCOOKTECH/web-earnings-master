import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {buildPublicCsvDemo} from '../scripts/build-public-csv-demo-v20.mjs';
import os from 'node:os';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
test('V21 premium studio is real static UI with named input, worker output and accessibility states',()=>{
 const h=read('examples/seo-csv-lab/site/index.html');
 assert.equal((h.match(/<h1\b/g)||[]).length,1);
 for(const fragment of ['id="csv-form"','id="csv-file"','id="csv-paste"','id="scope"','id="column"','id="result-table"','id="cancel-tool"','role="status"','<noscript>'])
  assert.ok(h.includes(fragment),fragment);
 assert.match(h,/This is an independently testable local demonstration/);
});
test('V21 real shipped local server and candidate artifact must include the CSV Worker',()=>{
 const server=read('scripts/serve-seo-csv-lab.mjs');
 const build=read('scripts/build-public-csv-demo-v20.mjs');
 assert.match(server,/csv-worker\.mjs/);
 assert.match(server,/worker-src 'self'/);
 assert.match(build,/csv-worker\.mjs/);
 assert.match(read('examples/seo-csv-lab/site/assets/tool.mjs'),/new Worker\(/);
});
test('V21 raw uploaded CSV cannot be treated as HTML in output preview',()=>{
 const code=read('examples/seo-csv-lab/site/assets/tool.mjs');
 assert.match(code,/el\.textContent=String\(text\)/);
 assert.doesNotMatch(code,/(?:\.innerHTML|insertAdjacentHTML|document\.write)\s*(?:=|\()/);
});
test('V21 source registry maps RFC/OWASP/MDN/WCAG originals with honest limits',()=>{
 const j=JSON.parse(read('sources/official_sources.json'));
 const ids=new Set(j.sources.map(x=>x.id));
 for(const id of ['v21-rfc4180','v21-owasp-wstg-csv','v21-owasp-community-csv','v21-mdn-textdecoder','v21-whatwg-encoding','v21-mdn-worker','v21-mdn-blob-url','v21-wcag22'])
  assert.ok(ids.has(id),id);
 const m=JSON.parse(read('sources/skill-evidence-crosswalk-v20.json'));
 assert.ok(m.skills.find(x=>x.id==='web-security-assurance-asvs').reference_source_ids.includes('v21-owasp-wstg-csv'));
});
test('V21 actual first-party owner skills route to executable task proof guide',()=>{
 const names=['web-browser-compute','web-frontend-experience-engineering','web-security-assurance-asvs',
  'web-product-validation','web-fullstack-production-executor','web-technical-seo','web-launch-review','web-adsense-readiness'];
 for(const name of names)assert.match(read('.agents/skills/'+name+'/SKILL.md'),/## V21/,name);
 assert.match(read('AGENTS.md'),/V21 mandatory/);
});
test('V21 deployable root artifact contains worker but NEVER establishes public service',()=>{
 const d=fs.mkdtempSync(path.join(os.tmpdir(),'sense-v21-build-'));
 try{
  const r=buildPublicCsvDemo({origin:'https://candidate-web-tool-domain.com/',outDir:path.join(d,'dist')});
  assert.ok(r.build_artifacts.includes('assets/csv-worker.mjs'));
  assert.equal(fs.existsSync(path.join(d,'dist/assets/csv-worker.mjs')),true);
  assert.equal(r.external_http_verified,false);
  assert.equal(r.status,'BUILD_ONLY_NOT_DEPLOYED');
 }finally{fs.rmSync(d,{recursive:true,force:true})}
});
test('V21 acceptance states expressly preserve external uncertainty',()=>{
 const s=read('docs/quality/21-premium-csv-studio-acceptance.md');
 assert.match(s,/NOT VERIFIED/);
 assert.match(s,/OWNED|owner-/i);
 assert.match(s,/WO[Rr]KER|Worker/);
 assert.match(s,/RFC 4180/);
 assert.match(s,/OWASP/);
});
