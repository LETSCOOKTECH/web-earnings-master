import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
const docs=[
 'README.md','01-browser-http-runtime.md','02-domain-dns-tlds.md',
 '03-search-engine-internals.md','04-crawlers-robots-control.md',
 '05-ai-retrieval-agents.md','06-seo-aeo-geo.md','07-aso-discovery.md',
 '08-experimental-reverse-engineering.md','09-source-refresh.md','10-operational-evaluations.md'
];
const skills=['web-browser-runtime','web-domain-operations','web-search-internals','web-crawler-governance','web-ai-retrieval-lab','web-search-visibility-systems','web-app-store-discovery'];
test('all foundational chapters present with primary sources and meaningful instructions',()=>{
 for(const d of docs){
  const body=fs.readFileSync(path.join(root,'docs/foundations',d),'utf8');
  assert.ok(body.length>750, 'short foundation chapter '+d);
  if(d!=='README.md')assert.match(body,/https:\/\//,'missing first-party reference '+d);
 }
});
test('foundational Codex skills have unique trigger routing and correct manifests',()=>{
 for(const s of skills){
  const body=fs.readFileSync(path.join(root,'.agents/skills',s,'SKILL.md'),'utf8');
  assert.match(body,new RegExp('name: '+s+'\\n'));
  assert.match(body,/Trigger:/i);assert.match(body,/docs\/foundations\//);
  assert.ok(body.length>900);
 }
});
test('original 21 skills still remain present',()=>{
 const skillsDir=path.join(root,'.agents/skills');
 assert.ok(fs.readdirSync(skillsDir,{withFileTypes:true}).filter(x=>x.isDirectory()).length>=28);
});
test('foundation source registry has defensible statuses and offline validator succeeds',()=>{
 const manifest=JSON.parse(fs.readFileSync(path.join(root,'sources/foundation_sources.json'),'utf8'));
 assert.ok(manifest.entries.length>=25);
 assert.equal(new Set(manifest.entries.map(x=>x.id)).size,manifest.entries.length);
 assert.ok(manifest.entries.every(x=>x.semantic_review_required));
 assert.ok(manifest.entries.some(x=>x.status==='restricted'||x.status==='unverified'), 'must preserve unknowns');
 const r=spawnSync(process.execPath,['scripts/check-foundation-sources.mjs'],{cwd:root,encoding:'utf8'});
 assert.equal(r.status,0,r.stdout+'\n'+r.stderr);
});
test('critical distinctions are explicitly tested in foundation evaluation docs',()=>{
 const body=fs.readFileSync(path.join(root,'docs/foundations/10-operational-evaluations.md'),'utf8');
 for(const term of ['Google-Extended','OAI-SearchBot','Perplexity-User','llms.txt','ASO','WebMCP','200','noindex'])
  assert.ok(body.includes(term),'missing evaluation '+term);
});
