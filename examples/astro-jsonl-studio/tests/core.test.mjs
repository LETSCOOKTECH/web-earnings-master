import test from 'node:test';
import assert from 'node:assert/strict';
import {analyzeJsonl,LIMITS} from '../public/assets/jsonl-core.mjs';

test('exact input and downloaded JSONL output preserve lexical values',()=>{
 const sample='{"name":"Asha","n":90071992547409931234}\r\n{"name":"Lee","n":2}\r\n';
 const r=analyzeJsonl(sample);
 assert.equal(r.valid,2);assert.equal(r.invalid,0);assert.equal(r.lines,2);
 assert.equal(r.output,'{"name":"Asha","n":90071992547409931234}\n{"name":"Lee","n":2}\n');
 assert.equal(r.canDownload,true);
});
test('one invalid record reports exact source line and blocks partial export',()=>{
 const r=analyzeJsonl('{"valid":true}\n{"broken":}\n{"valid":false}\n');
 assert.equal(r.valid,2);assert.equal(r.invalid,1);assert.equal(r.errors[0].line,2);
 assert.equal(r.output,null);assert.equal(r.canDownload,false);
});
test('blank lines and BOM are handled without inventing records',()=>{
 const r=analyzeJsonl('\ufeff{"a":1}\n\n{"b":2}\n');
 assert.equal(r.lines,3);assert.equal(r.blank,1);assert.equal(r.valid,2);
 assert.equal(r.output,'{"a":1}\n{"b":2}\n');
});
test('bare numbers booleans arrays strings and null are JSON values',()=>{
 const r=analyzeJsonl('1\ntrue\nnull\n[1,2]\n"abc"\n');
 assert.equal(r.valid,5);assert.deepEqual(r.preview.map(x=>x.type),['number','boolean','null','array','string']);
});
test('oversized input, 5001 lines, only blank records and wrong types fail closed',()=>{
 assert.throws(()=>analyzeJsonl('a'.repeat(LIMITS.maxBytes+1)),/2 MB/);
 assert.throws(()=>analyzeJsonl('0\n'.repeat(5001)),/5,000/);
 assert.throws(()=>analyzeJsonl('\n\n'),/Paste JSON|No JSON/);
 assert.throws(()=>analyzeJsonl(null),/Expected pasted/);
 assert.throws(()=>analyzeJsonl('0',{maxBytes:LIMITS.maxBytes+1}),/Invalid input byte limit/);
});
test('2MB exact size and 5k rows accepted without losing a byte',()=>{
 const row='{"x":"'+ 'a'.repeat(391) +'"}\n';
 assert.equal(new TextEncoder().encode(row).length,400);
 const source=row.repeat(5000); // exactly 2,000,000 bytes across exactly 5,000 lines
 const r=analyzeJsonl(source);
 assert.equal(r.lines,5000);assert.equal(r.valid,5000);assert.equal(r.invalid,0);
 assert.equal(r.output,source);
});
test('malicious-looking cell content is not sanitized or executed by pure parser',()=>{
 const malicious='{"name":"<img src=x onerror=alert(1)>"}\n';
 const r=analyzeJsonl(malicious);
 assert.equal(r.output,malicious);assert.equal(r.preview[0].type,'object');
});
test('no partial data export on invalid 100+ rows, errors capped',()=>{
 const source='{"bad":}\n'.repeat(110);
 const r=analyzeJsonl(source);
 assert.equal(r.canDownload,false);assert.equal(r.invalid,100);assert.equal(r.valid,0);
 assert.equal(r.errors.length,100);
});
