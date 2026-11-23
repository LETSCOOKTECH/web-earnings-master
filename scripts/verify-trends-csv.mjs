import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// Offline parser for a user-/browser-exported Google Trends chart. No live scraping or hidden endpoints.
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export function parseCsvRecords(input){
 if(typeof input!=='string'||Buffer.byteLength(input)>2_000_000)throw new Error('CSV absent or oversized');
 const s=input.replace(/^\uFEFF/,'');const records=[];let field='',row=[],quote=false;
 for(let i=0;i<s.length;i++){
  const ch=s[i];
  if(ch==='"'){
   if(quote&&s[i+1]==='"'){field+='"';i++;}else quote=!quote;
  }else if(!quote&&ch===','){row.push(field);field='';}
  else if(!quote&&(ch==='\n'||ch==='\r')){
   if(ch==='\r'&&s[i+1]==='\n')i++;
   row.push(field);if(row.some(x=>x.trim()))records.push(row);row=[];field='';
  }else field+=ch;
 }
 if(quote)throw new Error('Unterminated quoted CSV cell');
 row.push(field);if(row.some(x=>x.trim()))records.push(row);
 return records;
}
const DATEISH=/^(?:\d{4}-\d{2}-\d{2}|\d{4}-\d{2}|\d{4}|week|day|month|date|time)/i;
const PERIOD=/^([0-9]+)(?:\.0+)?$/;
export function validateTrendsExport(csv,meta){
 const errors=[];
 if(!meta||meta.source!=='google_trends'||meta.scale!=='relative_index')errors.push('Trends metadata must declare relative_index');
 for(const field of ['query','geo','time_window','term_or_topic','search_type','observed_at','source_url','artifact']){
  if(typeof meta?.[field]!=='string'||meta[field].trim().length<2)errors.push('Metadata '+field+' missing');
 }
 if(meta?.source_url&&!meta.source_url.startsWith('https://trends.google.com/'))errors.push('Source must be Google Trends URL');
 if(meta?.term_or_topic&&!['term','topic'].includes(meta.term_or_topic))errors.push('Term/topic must be explicit');
 const records=parseCsvRecords(csv);
 if(records.length<3)errors.push('No useful chart rows');
 let headerIndex=-1;
 for(let i=0;i<records.length;i++){
  const r=records[i];if(r.length>=2&&DATEISH.test(r[0].trim())&&r.slice(1).some(x=>x.trim().length>0)){headerIndex=i;break;}
 }
 if(headerIndex<0)errors.push('No recognized date/term table header');
 let values=[],belowOne=0;
 if(headerIndex>=0){
  const h=records[headerIndex];
  for(const r of records.slice(headerIndex+1)){
   if(r.length<2)continue;
   for(const cell of r.slice(1)){
    const v=cell.trim().replace(/^["']|["']$/g,'');
    if(v==='<1'){belowOne++;continue;}
    if(v==='')continue;
    if(!PERIOD.test(v)){errors.push('Non-index value: '+v);continue;}
    const n=Number(v);
    if(n>100||n<0)errors.push('Trend index not in 0..100');
    else values.push(n);
   }
  }
  if(h.length<2||!values.length&&belowOne===0)errors.push('No valid normalized observations');
 }
 return {valid:errors.length===0,errors,metrics:{points:values.length,below_one:belowOne,
  max:values.length?Math.max(...values):null,min:values.length?Math.min(...values):null,
  note:'0 and <1 are not proof of zero searches. Values are normalized within the captured comparison context.'},
 comparison:{query:meta?.query,geo:meta?.geo,time_window:meta?.time_window,term_or_topic:meta?.term_or_topic,search_type:meta?.search_type},
 browser_verified:false};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const a=process.argv.indexOf('--csv'),b=process.argv.indexOf('--meta');
 if(a<0||b<0||!process.argv[a+1]||!process.argv[b+1]){console.error('Usage: node scripts/verify-trends-csv.mjs --csv download.csv --meta receipt.json');process.exit(2);}
 try{
  const raw=fs.readFileSync(process.argv[a+1],'utf8'),meta=JSON.parse(fs.readFileSync(process.argv[b+1],'utf8'));
  const result=validateTrendsExport(raw,meta);console.log(JSON.stringify(result,null,2));
  if(!result.valid)process.exitCode=1;
 }catch(e){console.error(e.message);process.exitCode=1;}
}
