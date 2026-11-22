import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
test('all reusable skills exist and have real manifests',()=>{
 const dirs=fs.readdirSync(path.join(root,'.agents/skills'));
 assert.ok(dirs.length>=21);
 for(const d of dirs)assert.match(fs.readFileSync(path.join(root,'.agents/skills',d,'SKILL.md'),'utf8'),new RegExp('name: '+d));
});
test('registry contains unique official URLs',()=>{
 const a=JSON.parse(fs.readFileSync(path.join(root,'sources/official_sources.json'),'utf8')).sources;
 assert.ok(a.length>=90); assert.equal(new Set(a.map(x=>x.id)).size,a.length);
});
test('static audit succeeds for known good fixture',()=>{
 const r=spawnSync(process.execPath,['scripts/audit-static-site.mjs','--dist','tests/fixtures/site','--origin','https://fixture.example'],{cwd:root,encoding:'utf8'});
 assert.equal(r.status,0,r.stdout+'\n'+r.stderr);
});
test('static audit fails if canonical origin is inconsistent',()=>{
 const r=spawnSync(process.execPath,['scripts/audit-static-site.mjs','--dist','tests/fixtures/site','--origin','https://wrong.example'],{cwd:root,encoding:'utf8'});
 assert.notEqual(r.status,0);
});

