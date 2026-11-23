import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {tokenize,invertedIndex,bm25,rrf,pageRank} from '../scripts/ir-reference-lab.mjs';
const root=path.resolve(import.meta.dirname,'..');
test('IR toy corpus makes deterministic term postings',()=>{
 const docs=['compress image locally','image calculator','resize a photo'];
 assert.deepEqual(tokenize('PNG-to-JPEG 200KB'),['png','to','jpeg','200kb']);
 assert.deepEqual([...invertedIndex(docs).get('image').keys()],[0,1]);
});
test('BM25 uses textual relevance and can fail semantic synonym',()=>{
 const docs=['compress image locally','image calculator','download a painting'];
 assert.equal(bm25(docs,'compress image')[0].id,0);
 assert.ok(bm25(docs,'unknownword').every(x=>x.score===0));
});
test('rank fusion combines ordinal lists rather than requiring compatible scores',()=>{
 assert.equal(rrf([[1,2,3],[2,1,4]])[0].id,1);
 assert.throws(()=>rrf([[1]],0));
});
test('toy PageRank converges to normalized scores with dangling nodes',()=>{
 const v=pageRank({A:['B'],B:['A','C'],C:[]});
 assert.ok(Math.abs(Object.values(v).reduce((a,b)=>a+b,0)-1)<1e-7);
 assert.ok(Object.values(v).every(n=>n>0));
});
test('source monitor validates approved manifest offline without pretending live policy checks',()=>{
 const r=spawnSync(process.execPath,['scripts/watch-official-updates.mjs'],{cwd:root,encoding:'utf8'});
 assert.equal(r.status,0,r.stdout+'\n'+r.stderr);
 assert.match(r.stdout,/OFFLINE PASS/);
 assert.match(r.stdout,/No live fetch/);
 const data=JSON.parse(fs.readFileSync(path.join(root,'sources/foundation_refresh_targets.json'),'utf8'));
 assert.ok(data.monitored.length>=20);
 assert.ok(data.monitored.every(x=>x.semantic_review_required===true&&x.url.startsWith('https://')));
});
test('current policy deadlines and previews are distinguished from current implemented controls',()=>{
 const doc=fs.readFileSync(path.join(root,'docs/foundations/16-modern-search-changes-2026-2027.md'),'utf8');
 for(const term of ['February 1, 2027','March 1','Sept 30','Internet-Draft','WebMCP','August 31 2026'])
  assert.ok(doc.includes(term),'missing temporal test '+term);
});
test('broader engine atlas contains actual independent and partner engines',()=>{
 const doc=fs.readFileSync(path.join(root,'docs/foundations/14-search-engine-provider-atlas.md'),'utf8');
 for(const term of ['Brave','Kagi','Mojeek','Yandex','Naver','Seznam','Baidu','DuckDuckGo','UNKNOWN'])
  assert.ok(doc.includes(term),'missing engine '+term);
});
