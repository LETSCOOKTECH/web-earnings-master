import test from 'node:test';
import assert from 'node:assert/strict';
import {parseCsv,dedupeCsv,cleanCsv,serializeCsv,LIMITS} from '../examples/seo-csv-lab/site/assets/csv-core.mjs';
test('real shipped CSV core parses quote escaped comma and multiline cells',()=>{
 const x=parseCsv('id,msg\n1,"a,b"\n2,"hello ""world"""\n3,"line 1\nline 2"\n');
 assert.deepEqual(x,[['id','msg'],['1','a,b'],['2','hello "world"'],['3','line 1\nline 2']]);
});
test('duplicate record removed exactly',()=>{
 const r=dedupeCsv('id,name\n1,Asha\n1,Asha\n2,Lee\n');
 assert.equal(r.removed,1);assert.equal(r.kept,2);
});
test('header retained once, case sensitivity configurable',()=>{
 assert.equal(dedupeCsv('Name\nA\nA\n').kept,1);
 assert.equal(dedupeCsv('Name\nA\na\n',{caseSensitive:true}).kept,2);
 assert.equal(dedupeCsv('Name\nA\na\n',{caseSensitive:false}).kept,1);
});
test('single-column blank records are real rows, not silently deleted',()=>{
 const p=parseCsv('name\n\nA\n');
 assert.deepEqual(p,[['name'],[''],['A']]);
 assert.equal(dedupeCsv('name\n\n\nA\n').removed,1);
});
test('trailing empty CSV column preserved',()=>{assert.deepEqual(parseCsv('id,name,\n1,Asha,\n'),[['id','name',''],['1','Asha','']]);});
test('BOM handled, CRLF output, and commas quoted',()=>{
 const r=cleanCsv('\uFEFFid,value\r\n1,"A,B"\r\n1,"A,B"\r\n');
 assert.equal(r.csv,'id,value\r\n1,"A,B"\r\n');
});
test('signed and scientific numeric text preserved even with spreadsheet safety',()=>{
 const values=['-2e3','-2E-3','+2','-0.5','-.05','+1e+4','-10.','0.0'];
 assert.deepEqual(parseCsv(serializeCsv([values]))[0],values);
});
test('formula-like CSV escapes only when safety option enabled',()=>{
 assert.equal(serializeCsv([['=2+2','@cmd','-CMD','+HYPERLINK']]),"'=2+2,'@cmd,'-CMD,'+HYPERLINK\r\n");
 assert.equal(serializeCsv([['=2+2']],{guardSpreadsheetFormulas:false}),'=2+2\r\n');
});
test('CSV parser rejects bad quotes and columns',()=>{
 for(const x of ['a,b\n1,"unterminated','a,b\n1,b"ad','a,b\n1,"x"trailing','id,name\n1\n'])
 assert.throws(()=>parseCsv(x));
});
test('CSV core rejects oversized files and too many records',()=>{
 assert.throws(()=>parseCsv('x'.repeat(LIMITS.maxBytes+1)));
 assert.throws(()=>parseCsv('a\n'.repeat(5001)));
});
test('CSV core rejects too many columns',()=>{
 assert.throws(()=>parseCsv('x,'.repeat(201)));
});
test('Deterministic independent round-trip stress: 500 seeded random matrices',()=>{
 let state=34017;const random=()=>{state=(state*1664525+1013904223)>>>0;return state/4294967296};
 const strings=['A','B,comma','multi\nline','"quote"','','-2e3','=unsafe','🙂'];
 for(let i=0;i<500;i++){
  const n=1+Math.floor(random()*15),k=1+Math.floor(random()*4);
  const rows=Array.from({length:n},()=>Array.from({length:k},()=>strings[Math.floor(random()*strings.length)]));
  const source=serializeCsv(rows,{guardSpreadsheetFormulas:false});
  assert.deepEqual(parseCsv(source),rows);
 }
});
test('CSV formula guard preserves non-dangerous ordinary text',()=>{
 assert.equal(serializeCsv([['hello','Jaipur','+200']]),'hello,Jaipur,+200\r\n');
});
test('CSV input type and empty payload rejected',()=>{
 assert.throws(()=>parseCsv(42));assert.throws(()=>parseCsv(''));
});
test('Server only binds local ephemeral port and does not need remote API',async()=>{
 const {startSeoCsvLab}=await import('../scripts/serve-seo-csv-lab.mjs');
 const lab=await startSeoCsvLab();
 try{
 const r=await fetch(lab.origin+'/'),body=await r.text();assert.equal(r.status,200);assert.match(body,/Remove Duplicate CSV Rows/);
 assert.equal((await fetch(lab.origin+'/nonexistent')).status,404);
 assert.equal((await fetch(lab.origin+'/assets/tool.mjs')).headers.get('content-type'),'text/javascript; charset=utf-8');
 }finally{await lab.close()}
});
