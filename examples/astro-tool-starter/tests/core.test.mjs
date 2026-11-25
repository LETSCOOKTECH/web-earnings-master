import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeJsonl,LIMITS} from '../public/scripts/jsonl-core.mjs';
test('exact JSONL normalization and preview from original records',()=>{
 const r=normalizeJsonl(' { "id": 1, "name": "Asha" }\r\n{"id":2,"name":"Lee"}\r\n');
 assert.equal(r.records,2);assert.equal(r.lines,2);assert.equal(r.skipped,0);
 assert.equal(r.jsonl,'{"id":1,"name":"Asha"}\n{"id":2,"name":"Lee"}\n');
 assert.equal(r.bytes,new TextEncoder().encode(r.jsonl).length);
 assert.deepEqual(r.preview.map(x=>x.line),[1,2]);
});
test('blank lines never silently disappear unless user permits it',()=>{
 const bad='{"id":1}\n\n{"id":2}\n';
 assert.throws(()=>normalizeJsonl(bad),/line 2/);
 const r=normalizeJsonl(bad,{allowBlank:true});
 assert.equal(r.records,2);assert.equal(r.skipped,1);assert.equal(r.lines,3);
});
test('malformed JSON reveals first offending line',()=>{
 assert.throws(()=>normalizeJsonl('{"id":1}\n{"id":}\n{"id":3}'),/line 2/);
});
test('JSONL only permits top-level objects, not primitive values or arrays',()=>{
 for(const line of ['1','false','null','"text"','[]','[{"id":1}]'])assert.throws(()=>normalizeJsonl(line),/JSON object/,line);
});
test('HTML-like JSONL values are inert data and stay in the result',()=>{
 const x='{"payload":"<img src=x onerror=alert(1)>"}';
 const r=normalizeJsonl(x);
 assert.equal(JSON.parse(r.jsonl).payload,'<img src=x onerror=alert(1)>');
});
test('Unicode survives correct UTF-8 normalization and byte accounting',()=>{
 const r=normalizeJsonl('{"city":"जयपुर","note":"日本語"}\n');
 assert.equal(JSON.parse(r.jsonl).city,'जयपुर');
 assert.equal(r.bytes,new TextEncoder().encode(r.jsonl).length);
});
test('initial BOM and LF/CR/CRLF line endings are normalized, not counted as records',()=>{
 const r=normalizeJsonl('\uFEFF{"a":1}\r{"b":2}\r\n{"c":3}\n');
 assert.equal(r.records,3);assert.equal(r.jsonl,'{"a":1}\n{"b":2}\n{"c":3}\n');
});
test('empty input and blank-only input are rejected',()=>{
 assert.throws(()=>normalizeJsonl(''),/No JSON/);
 assert.throws(()=>normalizeJsonl('\n\n',{allowBlank:true}),/No JSON/);
});
test('output preview is capped at 8 but exported file contains every record',()=>{
 const r=normalizeJsonl(Array.from({length:20},(_,i)=>'{"n":'+i+'}').join('\n'));
 assert.equal(r.records,20);assert.equal(r.preview.length,8);assert.equal(r.jsonl.trim().split('\n').length,20);
});
test('input over exact declared 1 MiB byte limit is rejected',()=>{
 const payload='{"t":"'+('a'.repeat(LIMITS.maxBytes-9))+'"}\n';
 assert.equal(new TextEncoder().encode(payload).length,LIMITS.maxBytes);
 assert.equal(normalizeJsonl(payload).records,1);
 assert.throws(()=>normalizeJsonl(payload+'x'),/1 MiB/);
});
test('the 5000-record limit rejects a 5001st object, no truncation',()=>{
 const line='{"v":1}\n',five=line.repeat(5000);
 assert.equal(normalizeJsonl(five).records,5000);
 assert.throws(()=>normalizeJsonl(five+line),/5,000/);
});
test('bad option types cannot enable silent skipping',()=>{
 const text='{"a":1}\n\n';
 assert.throws(()=>normalizeJsonl(text,{allowBlank:false}),/line 2/);
 assert.throws(()=>normalizeJsonl(text,{allowBlank:0}),/line 2/);
});
