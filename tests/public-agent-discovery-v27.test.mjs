import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {inspectPublicAgentFiles} from '../scripts/check-public-agent-access-v27.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
function local(){return inspectPublicAgentFiles(root);}
test('all 50 publicly linked agent skill files have correct release and direct-read index',()=>{
 const r=local();
 assert.equal(r.ok,true,JSON.stringify(r.errors));
 assert.equal(r.skills,50);
 assert.equal(r.indexed,50);
});
test('root LICENSE is an actual permissive open source license, not proprietary rights',()=>{
 const license=fs.readFileSync(path.join(root,'LICENSE'),'utf8');
 assert.match(license,/Apache License/);
 assert.match(license,/Version 2.0, January 2004/);
 assert.doesNotMatch(license,/LETSCOOKTECH PROPRIETARY LICENSE/);
 assert.match(fs.readFileSync(path.join(root,'NOTICE'),'utf8'),/Copyright 2026 LETSCOOKTECH/);
});
test('readability documented without pretending third-party platforms have web tools',()=>{
 const guide=fs.readFileSync(path.join(root,'docs/AGENT_ACCESS.md'),'utf8');
 assert.match(guide,/raw\.githubusercontent\.com/);
 assert.match(guide,/api\.github\.com/);
 assert.match(guide,/indexing is independent/);
 assert.match(guide,/No repo setting fixes/);
});
test('public index has no repeated skill links and points to the physically existing entrypoints',()=>{
 const index=fs.readFileSync(path.join(root,'SKILLS.md'),'utf8');
 const links=[...index.matchAll(/^\d{2}\. \[`[a-z0-9-]+`\]\(\.agents\/skills\/([a-z0-9-]+)\/SKILL\.md\)$/gm)].map(x=>x[1]);
 assert.equal(links.length,50);
 assert.equal(new Set(links).size,50);
 for(const name of links)assert.equal(fs.existsSync(path.join(root,'.agents/skills',name,'SKILL.md')),true,name);
});
test('source notice does not mislicense external engineering skills as ours',()=>{
 const notice=fs.readFileSync(path.join(root,'NOTICE'),'utf8');
 assert.match(notice,/third-party|Third-party/);
 assert.match(notice,/not automatically|does not relicense/i);
 const sources=fs.readFileSync(path.join(root,'sources/official-skill-integration-v26.json'),'utf8');
 assert.match(sources,/REFERENCE_ONLY/);
});
