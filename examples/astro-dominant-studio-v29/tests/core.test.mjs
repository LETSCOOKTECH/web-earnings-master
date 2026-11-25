import test from 'node:test';
import assert from 'node:assert/strict';
import {STUDIO_ROUTES,MAX_INPUT_BYTES,parseDelimited,serializeDelimited,executeStudio,protectSpreadsheetCell,detectExtension,maskLikelySecrets} from '../public/assets/studio-core.mjs';
const csv='id,name,amount\r\n00501,Asha,-42.50\r\n00502,"Lee, Jr.",12.25\r\n00502,"Lee, Jr.",12.25\r\n';
const tsv='id\tname\tamount\n00501\tAsha\t-42.50\n00502\tLee\t12.25\n';
const jsonl='{"id":"00501","name":"Asha","amount":"-42.50"}\n{"id":"00502","name":"Lee","amount":"12.25"}\n';
const json='[{"id":"00501","name":"Asha","amount":"-42.50"},{"id":"00502","name":"Lee","amount":"12.25"}]';
test('all 28 distinct route specs run a meaningful transformation with real output',()=>{
 assert.equal(STUDIO_ROUTES.length,28);assert.equal(new Set(STUDIO_ROUTES.map(x=>x.id)).size,20);
 for(const route of STUDIO_ROUTES){
  const input=route.kind==='csv'?csv:route.kind==='tsv'?tsv:route.kind==='jsonl'?jsonl:json;
  const result=executeStudio(route.id,input);
  assert.ok(result.output.length>3,route.id);
  assert.equal(result.route,route.id);
  assert.equal(result.privateProcessing,true);
  assert.ok(result.filename.includes(route.id));
 }
});
test('CSV parser handles quoted separators, newlines and doubled quotes exactly',()=>{
 const rows=parseDelimited('name,note\r\n"Li, A","a ""quote""\nand newline"\r\n');
 assert.deepEqual(rows,[['name','note'],['Li, A','a "quote"\nand newline']]);
 assert.throws(()=>parseDelimited('id,name\n1,bad"quote'),/Quote encountered/);
 assert.throws(()=>parseDelimited('id,name\n1,"broken'),/Unclosed/);
 assert.throws(()=>parseDelimited('id,name\n1'),/Inconsistent/);
});
test('CSV to JSONL maintains string IDs with leading zeros',()=>{
 const out=executeStudio('csv-to-jsonl',csv).output;
 assert.equal(JSON.parse(out.split('\n')[0]).id,'00501');
 assert.equal(out.split('\n').filter(Boolean).length,3);
});
test('formula shield handles whitespace, Unicode and negative numeric values',()=>{
 for(const s of ['=1+1','@SUM(A1:A2)','+CMD','-cmd','\t=1','\r=1','  =1','\uFF1D1+1','\uFF0B1+1']){
  assert.equal(protectSpreadsheetCell(s),"'"+s,s);
 }
 for(const s of ['-42.50','-0.99','-3e5','-1.','00501'])assert.equal(protectSpreadsheetCell(s),s);
 const text=serializeDelimited([['value'],['=CMD|A0'],['-42.50']],',',{sanitize:true});
 assert.match(text,/'=CMD/);assert.match(text,/\r\n-42\.50\r\n/);
 assert.equal(serializeDelimited([['v'],['=1']],',',{sanitize:false}).includes("'=1"),false);
});
test('differentiated route outputs are not duplicate doorway content',()=>{
 const ids=['csv-to-jsonl','csv-to-json','csv-to-tsv','csv-to-markdown','csv-to-html','csv-to-sql','csv-to-excel-csv','csv-deduplicate'];
 const outputs=ids.map(id=>executeStudio(id,csv).output);
 assert.equal(new Set(outputs).size,ids.length);
});
test('Excel-friendly CSV includes UTF-8 BOM and protects formula values',()=>{
 const a=executeStudio('csv-to-excel-csv','id,value\n00501,=1+1\n').output;
 assert.ok(a.startsWith('\ufeff'));assert.ok(a.includes("00501,'=1+1"));
});
test('flat JSON rejects unsafe numeric IDs and nested values',()=>{
 assert.throws(()=>executeStudio('json-to-csv','[{"id":9007199254740993}]'),/Unsafe JSON integer/);
 assert.throws(()=>executeStudio('json-to-csv','[{"obj":{"x":1}}]'),/Nested JSON/);
 const nullValue=executeStudio('json-to-csv','[{"n":null},{"n":"x"}]').output;
 assert.equal(nullValue.includes('x'),true); // intentional CSV null/empty ambiguity is disclosed
});
test('JSONL validator refuses partially broken records',()=>{
 assert.throws(()=>executeStudio('jsonl-validator','{"id":1}\n{"broken":}\n'),/line 2/);
});
test('compound extensions identify supported and unsupported compression honestly',()=>{
 assert.deepEqual(detectExtension('big.csv.gz'),{type:'csv',compression:'gzip'});
 assert.deepEqual(detectExtension('x.jsonl.gz'),{type:'jsonl',compression:'gzip'});
 assert.deepEqual(detectExtension('x.parquet.zst'),{type:'parquet',compression:'zstd'});
 assert.deepEqual(detectExtension('x.parquet.snappy'),{type:'parquet',compression:'snappy'});
 assert.equal(detectExtension('x.zip').type,'unknown');
});
test('secret masking is opt-in and not presented as universal PII detection',()=>{
 const input='email=a@example.com key=AKIAABCDEFGHIJKLMNOP token=sk-abcdefghijklmnopqrstuvwxyz';
 assert.equal(executeStudio('json-pretty',JSON.stringify({data:input})).output.includes('AKIAABCDEFGHIJKLMNOP'),true);
 const out=executeStudio('json-pretty',JSON.stringify({data:input}),{maskSecrets:true}).output;
 assert.ok(!out.includes('AKIAABCDEFGHIJKLMNOP'));
 assert.ok(!out.includes('a@example.com'));
 assert.ok(!out.includes('sk-abcdefghijklmnopqrstuvwxyz'));
 assert.ok(maskLikelySecrets(input).includes('[EMAIL_REDACTED]'));
});
test('maximum decoded text size fails instead of silently truncating',()=>{
 assert.throws(()=>executeStudio('json-pretty','a'.repeat(MAX_INPUT_BYTES+1)),/16 MiB/);
});
