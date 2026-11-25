import {LIMITS} from './jsonl-core.mjs';
const $=id=>document.getElementById(id);
const form=$('jsonl-form'),paste=$('jsonl-paste'),file=$('jsonl-file'),status=$('status');
const results=$('result'),preview=$('preview'),download=$('download'),cancel=$('cancel'),run=$('process');
let worker=null,downloadUrl=null,sequence=0;
function clear(){
 if(worker){worker.terminate();worker=null;}
 if(downloadUrl){URL.revokeObjectURL(downloadUrl);downloadUrl=null;}
 download.removeAttribute('href');download.hidden=true;results.hidden=true;
 run.disabled=false;cancel.hidden=true;preview.replaceChildren();
}
function report(message,state='ready'){status.textContent=message;status.dataset.state=state;}
function change(message){sequence++;clear();report(message);}
function show(data){
 $('records').textContent=String(data.records);
 $('skipped').textContent=String(data.skipped);
 $('bytes').textContent=String(data.bytes);
 preview.replaceChildren();
 for(const value of data.preview){
  const li=document.createElement('li');
  li.textContent='Line '+value.line+': '+value.text;
  preview.append(li);
 }
 downloadUrl=URL.createObjectURL(new Blob([data.jsonl],{type:'application/x-ndjson;charset=utf-8'}));
 download.href=downloadUrl;download.hidden=false;results.hidden=false;
 report('Validated '+data.records+' JSONL records. Download is ready.','success');
}
paste.addEventListener('input',()=>{if(file.value)file.value='';change('Pasted text changed. Revalidate.')});
file.addEventListener('change',()=>{if(file.files?.length)paste.value='';change('File selection changed. Revalidate.')});
$('allow-blank').addEventListener('change',()=>change('Options changed. Revalidate.'));
$('sample').addEventListener('click',()=>{
 file.value='';
 paste.value='{"id":1,"name":"Asha"}\n{"id":2,"name":"Lee"}\n';
 change('Example loaded. Select Validate JSONL.');
});
$('reset').addEventListener('click',()=>{form.reset();paste.value='';file.value='';change('Workspace reset.')});
cancel.addEventListener('click',()=>change('Processing cancelled; no output saved.'));
form.addEventListener('submit',async event=>{
 event.preventDefault();change('Reading JSONL file...');
 const id=sequence;
 try{
  let input=paste.value;
  if(file.files?.length){
   const selected=file.files[0];
   if(selected.size>LIMITS.maxBytes)throw Error('File exceeds 1 MiB');
   let bytes;try{bytes=await selected.arrayBuffer()}catch{throw Error('File could not be read')}
   try{input=new TextDecoder('utf-8',{fatal:true}).decode(bytes)}catch{throw Error('File is not valid UTF-8')}
  }
  if(id!==sequence)return;
  if(!input.length)throw Error('Paste JSONL or select a file');
  if(typeof Worker!=='function')throw Error('Web Workers unavailable in this browser');
  worker=new Worker('/scripts/jsonl-worker.mjs',{type:'module'});
  run.disabled=true;cancel.hidden=false;report('Validating records locally...','working');
  worker.addEventListener('message',event=>{
   if(id!==sequence)return;
   const data=event.data||{};if(worker){worker.terminate();worker=null}
   run.disabled=false;cancel.hidden=true;
   if(!data.ok){report(data.error||'Validation failed','error');return}
   show(data.result);
  });
  worker.addEventListener('error',()=>{
   if(id!==sequence)return;
   clear();report('Background processing failed. Retry.','error');
  });
  worker.postMessage({id,input,options:{allowBlank:$('allow-blank').checked}});
 }catch(e){if(id===sequence){clear();report(e instanceof Error?e.message:'Processing failed','error')}}
});
window.addEventListener('pagehide',()=>change('Processing stopped.'));
