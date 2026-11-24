import {cleanCsv,LIMITS} from './csv-core.mjs';
const form=document.getElementById('csv-form');
const file=document.getElementById('csv-file');
const paste=document.getElementById('csv-paste');
const status=document.getElementById('status');
const output=document.getElementById('download');
let objectURL;
function clear(){if(objectURL){URL.revokeObjectURL(objectURL);objectURL=undefined;}output.hidden=true;output.removeAttribute('href');}
function setStatus(msg,error=false){status.textContent=msg;status.dataset.state=error?'error':'ok';}
form.addEventListener('submit',async event=>{
 event.preventDefault();clear();
 try{
  const f=file.files?.[0];
  if(f&&f.size>LIMITS.maxBytes)throw Error('File exceeds 2 MB');
  const input=f?await f.text():paste.value;
  if(!input.length)throw Error('Paste CSV text or choose a file');
  const result=cleanCsv(input,{
   hasHeader:document.getElementById('header').checked,
   caseSensitive:document.getElementById('case').checked,
   guardSpreadsheetFormulas:document.getElementById('spreadsheet').checked
  });
  const blob=new Blob([result.csv],{type:'text/csv;charset=utf-8'});
  objectURL=URL.createObjectURL(blob);
  output.href=objectURL;output.hidden=false;output.download='cleaned.csv';
  setStatus('Removed '+result.removed+' duplicate rows; kept '+result.kept+' rows.');
 }catch(e){setStatus(e instanceof Error?e.message:'Unable to process CSV',true)}
});
window.addEventListener('pagehide',clear);
