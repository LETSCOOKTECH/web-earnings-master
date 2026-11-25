/**
 * V29 experimental, bounded, browser-local deterministic transformation core.
 * No network, persistence, or implicit conversion of string IDs to numbers.
 * JSON numeric values beyond Number.MAX_SAFE_INTEGER are NOT lossless in JS.
 */
export const MAX_INPUT_BYTES=16*1024*1024;
export const STUDIO_ROUTES=Object.freeze([
 {id:'csv-to-jsonl',group:'csv',label:'CSV to JSONL',kind:'csv'},
 {id:'csv-to-json',group:'csv',label:'CSV to JSON',kind:'csv'},
 {id:'csv-to-tsv',group:'csv',label:'CSV to TSV',kind:'csv'},
 {id:'csv-to-markdown',group:'csv',label:'CSV to Markdown Table',kind:'csv'},
 {id:'csv-to-html',group:'csv',label:'CSV to HTML Table',kind:'csv'},
 {id:'csv-to-sql',group:'csv',label:'CSV to SQL INSERT',kind:'csv'},
 {id:'csv-to-excel-csv',group:'csv',label:'CSV to Excel-friendly UTF-8',kind:'csv'},
 {id:'csv-deduplicate',group:'csv',label:'Remove Duplicate CSV Rows',kind:'csv'},
 {id:'tsv-to-csv',group:'tsv',label:'TSV to CSV',kind:'tsv'},
 {id:'tsv-to-json',group:'tsv',label:'TSV to JSON',kind:'tsv'},
 {id:'tsv-to-jsonl',group:'tsv',label:'TSV to JSONL',kind:'tsv'},
 {id:'jsonl-to-json',group:'jsonl',label:'JSONL to JSON Array',kind:'jsonl'},
 {id:'jsonl-to-csv',group:'jsonl',label:'JSONL to CSV',kind:'jsonl'},
 {id:'jsonl-to-markdown',group:'jsonl',label:'JSONL to Markdown',kind:'jsonl'},
 {id:'jsonl-validator',group:'jsonl',label:'Validate JSON Lines',kind:'jsonl'},
 {id:'json-to-jsonl',group:'json',label:'JSON Array to JSONL',kind:'json'},
 {id:'json-to-csv',group:'json',label:'JSON Array to CSV',kind:'json'},
 {id:'json-to-markdown',group:'json',label:'JSON Array to Markdown',kind:'json'},
 {id:'json-pretty',group:'json',label:'Format JSON',kind:'json'},
 {id:'json-minify',group:'json',label:'Minify JSON',kind:'json'}
]);
export const findStudioRoute=id=>STUDIO_ROUTES.find(x=>x.id===id)||null;
export function detectExtension(filename){
 const name=String(filename||'').toLowerCase();
 const kinds=['.parquet.snappy','.parquet.zst','.jsonl.gz','.csv.gz','.tsv.gz','.parquet','.jsonl','.tsv','.csv','.json','.md'];
 const suffix=kinds.find(ext=>name.endsWith(ext));
 if(!suffix)return {type:'unknown',compression:null};
 const compound=suffix.endsWith('.gz')?suffix.slice(0,-3):suffix;
 return {type:compound.slice(1),compression:suffix.endsWith('.gz')?'gzip':suffix.endsWith('.zst')?'zstd':suffix.endsWith('.snappy')?'snappy':null};
}
const NEGATIVE=/^-(?:(?:\d+(?:\.\d*)?)|(?:\.\d+))(?:[eE][+-]?\d+)?$/;
export function protectSpreadsheetCell(value){
 const original=String(value??'');
 if(original.startsWith("'"))return original;
 // Inspect leading invisible characters; do not silently remove user data.
 const unwrapped=original.replace(/^[\s\u200b-\u200f\u2060\ufeff]+/u,'');
 if(NEGATIVE.test(original))return original;
 if(/^[=+\-@\uFF1D\uFF0B\uFF0D\uFF20]/u.test(unwrapped)||
    /^[\t\r]/u.test(original))return "'"+original;
 return original;
}
function ensureText(text){
 if(typeof text!=='string'||text.trim()==='')throw Error('Input must contain readable text');
 if(new TextEncoder().encode(text).length>MAX_INPUT_BYTES)throw Error('Input exceeds the 16 MiB local safety limit');
 return text.charCodeAt(0)===0xfeff?text.slice(1):text;
}
export function parseDelimited(text,separator=','){
 text=ensureText(text);
 if(separator!==','&&separator!=='\t')throw Error('Unsupported delimiter');
 const rows=[];let row=[],field='',quoted=false,closed=false,any=false;
 function finishField(){row.push(field);field='';closed=false;}
 function finishRow(){finishField();rows.push(row);row=[];any=false;if(rows.length>200_000)throw Error('Input exceeds the 200,000-row browser safety limit');}
 for(let i=0;i<text.length;i++){
  const ch=text[i];any=true;
  if(quoted){
   if(ch==='"'&&text[i+1]==='"'){field+='"';i++;continue;}
   if(ch==='"'){quoted=false;closed=true;continue;}
   field+=ch;continue;
  }
  if(closed){
   if(ch===separator){finishField();continue;}
   if(ch==='\r'||ch==='\n'){if(ch==='\r'&&text[i+1]==='\n')i++;finishRow();continue;}
   throw Error('Unexpected character after a closing quote at offset '+i);
  }
  if(ch==='"'){
   if(field!=='')throw Error('Quote encountered in unquoted field at offset '+i);
   quoted=true;continue;
  }
  if(ch===separator){finishField();continue;}
  if(ch==='\r'||ch==='\n'){
   if(ch==='\r'&&text[i+1]==='\n')i++;
   finishRow();continue;
  }
  field+=ch;
 }
 if(quoted)throw Error('Unclosed quoted field');
 if(any||field.length||row.length||closed)finishRow();
 if(!rows.length||!rows[0].length)throw Error('No records found');
 const width=rows[0].length;
 if(width>500)throw Error('Too many columns for this browser build');
 for(let i=1;i<rows.length;i++)if(rows[i].length!==width)throw Error('Inconsistent column count on row '+(i+1));
 return rows;
}
function validateHeader(rows){
 if(rows.length<2)throw Error('Expected a header and at least one data row');
 const h=rows[0];const seen=new Set();
 for(const name of h){
  if(!name.trim()||seen.has(name))throw Error('Headers must be non-empty and unique');
  seen.add(name);
 }
 return h;
}
function recordsFromRows(rows){
 const header=validateHeader(rows);
 return rows.slice(1).map(row=>Object.fromEntries(header.map((name,i)=>[name,row[i]])));
}
function rowsFromRecords(records){
 if(!Array.isArray(records)||!records.length)throw Error('Input must be a nonempty JSON array');
 const first=records[0];
 if(first===null||Array.isArray(first)||typeof first!=='object')throw Error('Expected an array of flat JSON objects');
 const keys=[...new Set(records.flatMap(r=>{
  if(r===null||Array.isArray(r)||typeof r!=='object')throw Error('Only JSON objects are supported');
  return Object.keys(r);
 }))];
 if(!keys.length||keys.length>500)throw Error('No usable fields or too many columns');
 return [keys,...records.map(obj=>keys.map(key=>{
  const v=obj[key];
  if(v===undefined||v===null)return '';
  if(typeof v==='object')throw Error('Nested JSON values are not supported by this flat table converter');
  if(typeof v==='number'&&!Number.isSafeInteger(v)&&Number.isInteger(v))throw Error('Unsafe JSON integer; quote IDs as strings');
  return String(v);
 }))];
}
function parseJsonl(text){
 const lines=ensureText(text).split(/\r\n|\r|\n/);if(lines.at(-1)==='')lines.pop();
 const objects=[];
 for(let i=0;i<lines.length;i++){
  if(!lines[i].trim())throw Error('Blank JSONL record on line '+(i+1));
  try{objects.push(JSON.parse(lines[i]));}catch{throw Error('Invalid JSONL value on line '+(i+1));}
 }
 return objects;
}
function flatJsonRows(text){const value=JSON.parse(ensureText(text));return rowsFromRecords(value);}
export function serializeDelimited(rows,separator=',',{sanitize=true,bom=false}={}){
 if(!Array.isArray(rows)||!rows.length)throw Error('No rows to export');
 return (bom?'\ufeff':'')+rows.map((row,rowIndex)=>row.map(cell=>{
  let str=String(cell??'');
  if(sanitize&&rowIndex>0)str=protectSpreadsheetCell(str);
  return str.includes('"')||str.includes(separator)||/[\r\n]/.test(str)?'"'+str.replaceAll('"','""')+'"':str;
 }).join(separator)).join('\r\n')+'\r\n';
}
function escHtml(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function markdown(rows){
 return rows.map((r,i)=>'| '+r.map(v=>String(v).replaceAll('|','\\|').replace(/\r?\n/g,' ')).join(' | ')+' |'+(i===0?'\n| '+r.map(()=> '---').join(' | ')+' |':'')).join('\n')+'\n';
}
function htmlTable(rows){
 const [head,...body]=rows;
 return '<table>\n<thead><tr>'+head.map(x=>'<th>'+escHtml(x)+'</th>').join('')+'</tr></thead>\n<tbody>\n'+body.map(r=>'<tr>'+r.map(x=>'<td>'+escHtml(x)+'</td>').join('')+'</tr>').join('\n')+'\n</tbody>\n</table>\n';
}
function sql(rows){
 validateHeader(rows);
 const names=rows[0].map(x=>'"'+x.replaceAll('"','""')+'"').join(', ');
 return rows.slice(1).map(r=>'INSERT INTO "records" ('+names+') VALUES ('+r.map(v=>"'"+String(v).replaceAll("'","''")+"'").join(', ')+');').join('\n')+'\n';
}
export function maskLikelySecrets(text){
 return String(text).replace(/\bAKIA[0-9A-Z]{16}\b/g,'[AWS_KEY_REDACTED]')
 .replace(/\bsk-[A-Za-z0-9_-]{12,}\b/g,'[API_KEY_REDACTED]')
 .replace(/\bBearer\s+[A-Za-z0-9._~+/-]{12,}\b/gi,'Bearer [TOKEN_REDACTED]')
 .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,'[EMAIL_REDACTED]');
}
export function executeStudio(id,input,{sanitize=true,maskSecrets=false}={}){
 const route=findStudioRoute(id);
 if(!route)throw Error('Unknown or unimplemented route: '+id);
 const source=ensureText(input),start=Date.now();
 let output='',mime='text/plain',ext='txt',count=0;
 const csv=()=>parseDelimited(source,','),tsv=()=>parseDelimited(source,'\t');
 const json=()=>JSON.parse(source);
 const jl=()=>parseJsonl(source);
 function set(o,type,extension){output=o;mime=type;ext=extension;}
 const rows=route.kind==='csv'?csv():route.kind==='tsv'?tsv():null;
 const objects=route.kind==='jsonl'?jl():null;
 if(id==='csv-to-jsonl'||id==='csv-to-json'||id==='tsv-to-json'||id==='tsv-to-jsonl'){
  const data=recordsFromRows(rows);
  set(id.endsWith('jsonl')?data.map(x=>JSON.stringify(x)).join('\n')+'\n':JSON.stringify(data,null,2)+'\n','application/json',id.endsWith('jsonl')?'jsonl':'json');
 }else if(id==='csv-to-tsv'||id==='tsv-to-csv'||id==='csv-to-excel-csv'||id==='csv-deduplicate'){
  let data=rows;
  if(id==='csv-deduplicate'){
   const seen=new Set([JSON.stringify(rows[0])]);
   data=[rows[0],...rows.slice(1).filter(row=>{const key=JSON.stringify(row);if(seen.has(key))return false;seen.add(key);return true;})];
  }
  const separator=id==='csv-to-tsv'?'\t':',';
  set(serializeDelimited(data,separator,{sanitize,bom:id==='csv-to-excel-csv'}),'text/'+(separator==='\t'?'tab-separated-values':'csv'),separator==='\t'?'tsv':'csv');
 }else if(['csv-to-markdown','jsonl-to-markdown','json-to-markdown'].includes(id)){
  set(markdown(rows||rowsFromRecords(id==='jsonl-to-markdown'?objects:json())),'text/markdown','md');
 }else if(id==='csv-to-html')set(htmlTable(rows),'text/html','html');
 else if(id==='csv-to-sql')set(sql(rows),'application/sql','sql');
 else if(id==='jsonl-validator'||id==='jsonl-to-json'){
  set(id==='jsonl-validator'?source.split(/\r\n|\r|\n/).filter(Boolean).join('\n')+'\n':JSON.stringify(objects,null,2)+'\n','application/json',id==='jsonl-validator'?'jsonl':'json');
 }else if(id==='jsonl-to-csv')set(serializeDelimited(rowsFromRecords(objects),',',{sanitize}),'text/csv','csv');
 else if(id==='json-to-csv')set(serializeDelimited(rowsFromRecords(json()),',',{sanitize}),'text/csv','csv');
 else if(id==='json-to-jsonl'){
  const values=json();if(!Array.isArray(values)||!values.length)throw Error('Expected nonempty JSON array');
  set(values.map(x=>JSON.stringify(x)).join('\n')+'\n','application/json','jsonl');
 }else if(id==='json-pretty')set(JSON.stringify(json(),null,2)+'\n','application/json','json');
 else if(id==='json-minify')set(JSON.stringify(json())+'\n','application/json','json');
 else throw Error('Unhandled route');
 if(maskSecrets)output=maskLikelySecrets(output);
 if(!output.length)throw Error('No output generated');
 count=(rows?.length??objects?.length??0);
 return {route:id,output,mime,filename:id+'.'+ext,inputBytes:new TextEncoder().encode(source).length,outputBytes:new TextEncoder().encode(output).length,records:count,elapsedMs:Date.now()-start,privateProcessing:true,warnings:['CSV/TSV do not preserve JSON null/type information. Large JSON numeric IDs must be strings. Spreadsheet formula escaping is best effort; test your target spreadsheet.']};
}
