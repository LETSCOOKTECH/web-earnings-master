import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root=path.resolve(import.meta.dirname,'..');
const read=relative=>fs.readFileSync(path.join(root,relative),'utf8');
const companion='extensions/v29/skills/web-dominant-studio-v29/SKILL.md';

test('the repository actually has an OSI-approved Apache-2.0 root license and preserved rights caveat',()=>{
 const license=read('LICENSE'),notice=read('NOTICE');
 assert.match(license,/Apache License\s+Version 2\.0, January 2004/);
 assert.match(notice,/Copyright 2026 LETSCOOKTECH/);
 assert.match(notice,/third-party works|third-party materials/i);
});

test('public skill index retains 50 original registered skills and resolves the V29 opt-in companion',()=>{
 const skills=read('SKILLS.md'),instructions=read('AGENTS.md');
 const indexed=[...skills.matchAll(/^\d{2}\. \[`([^\x60]+)`\]\((\.agents\/skills\/[^)]+\/SKILL\.md)\)/gm)];
 assert.equal(indexed.length,50);
 assert.equal(new Set(indexed.map(x=>x[1])).size,50);
 for(const match of indexed)assert.ok(fs.existsSync(path.join(root,match[2])),match[2]);
 assert.match(skills,/extensions\/v29\/skills\/web-dominant-studio-v29\/SKILL\.md/);
 assert.match(instructions,/web-dominant-studio-v29\/SKILL\.md/);
 const content=read(companion);
 assert.match(content,/^---\nname: web-dominant-studio-v29\n/m);
 assert.match(content,/28/i);
});

test('the optional skill has stable public raw and API URLs and preserves copied MIT attribution',()=>{
 const guide=read('docs/AGENT_ACCESS.md'),sample=read('examples/astro-dominant-studio-v29/README.md');
 assert.ok(guide.includes('https://raw.githubusercontent.com/LETSCOOKTECH/web-earnings-master/main/'+companion));
 assert.ok(guide.includes('https://api.github.com/repos/LETSCOOKTECH/web-earnings-master/contents/'+companion+'?ref=main'));
 assert.ok(fs.existsSync(path.join(root,'examples/astro-dominant-studio-v29/CROFTWEAVER_LICENSE')));
 assert.ok(fs.existsSync(path.join(root,'examples/astro-dominant-studio-v29/THIRD_PARTY_NOTICES.md')));
 assert.match(read('examples/astro-dominant-studio-v29/CROFTWEAVER_LICENSE'),/MIT License/);
 assert.match(sample,/THIRD_PARTY_NOTICES\.md/);
});
