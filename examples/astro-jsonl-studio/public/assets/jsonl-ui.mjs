const $=id=>document.getElementById(id);
const form=$('jsonl-form'),file=$('jsonl-file'),paste=$('jsonl-paste'),message=$('status');
const result=$('result'),empty=$('empty'),download=$('download'),reset=$('reset'),button=$('run'),cancel=$('cancel');
let active=null,current=null,generation=0,url=null;
function status(text,error=false){message.textContent=text;message.dataset.error=String(error);}
function revoke(){if(url){URL.revokeObjectURL(url);url=null;}download.hidden=true;download.removeAttribute('href');}
function clear(messageText='Change detected. Run validation again.'){
 generation++;if(active){active.terminate();active=null;}
 button.disabled=false;cancel.hidden=true;revoke();current=null;result.hidden=true;empty.hidden=false;status(messageText);
}
function addTextCell(parent,tag,text){
 const node=document.createElement(tag);node.textContent=String(text);if(tag==='th')node.scope='col';parent.append(node);
}
function render(data){
 $('stat-lines').textContent=String(data.lines);
 $('stat-valid').textContent=String(data.valid);
 $('stat-errors').textContent=String(data.invalid);
 $('stat-blank').textContent=String(data.blank);
 const body=$('preview-body');body.replaceChildren();
 for(const row of data.preview){const tr=document.createElement('tr');addTextCell(tr,'td',row.line);addTextCell(tr,'td',row.type);addTextCell(tr,'td',row.sample);body.append(tr);}
 const list=$('errors');list.replaceChildren();
 for(const error of data.errors){const li=document.createElement('li');li.textContent='Line '+error.line+': '+error.message;list.append(li);}
 $('error-heading').hidden=!data.errors.length;
 $('note').textContent=data.note;
 result.hidden=false;empty.hidden=true;
 if(data.canDownload){
  const blob=new Blob([data.output],{type:'application/x-ndjson;charset=utf-8'});
  url=URL.createObjectURL(blob);download.href=url;download.hidden=false;
 }
 status(data.invalid?data.invalid+' invalid record(s). Resolve errors before exporting.':'Validation passed: '+data.valid+' JSON values.',data.invalid>0);
}
async function getInput(){
 const selected=file.files?.[0];
 if(!selected)return paste.value;
 if(selected.size>2_000_000)throw Error('File exceeds 2 MB');
 try{return new TextDecoder('utf-8',{fatal:true}).decode(await selected.arrayBuffer());}
 catch{throw Error('File is not valid UTF-8 or cannot be read');}
}
form.addEventListener('submit',async e=>{
 e.preventDefault();clear('Starting validation…');
 const id=generation;
 try{
  const text=await getInput();if(id!==generation)return;
  if(!text.trim())throw Error('Paste JSON Lines or choose a UTF-8 file');
  if(typeof Worker!=='function')throw Error('Module Workers are unavailable in this browser');
  const worker=new Worker('/assets/jsonl-worker.mjs',{type:'module'});
  active=worker;button.disabled=true;cancel.hidden=false;status('Validating locally…');
  worker.addEventListener('message',e=>{
   if(id!==generation||active!==worker)return;
   worker.terminate();active=null;button.disabled=false;cancel.hidden=true;
   if(!e.data?.ok){status(e.data?.message||'Validation failed',true);return;}
   current=e.data.result;render(current);
  });
  worker.addEventListener('error',()=>{
   if(id!==generation||active!==worker)return;
   clear('Worker execution failed');status('Background validation failed',true);
  });
  worker.postMessage({id,text});
 }catch(e){if(id!==generation)return;clear();status(e instanceof Error?e.message:'Unable to validate JSONL',true);}
});
paste.addEventListener('input',()=>{if(file.value)file.value='';clear()});
file.addEventListener('change',()=>{
 if(file.files?.length){paste.value='';clear('Selected '+file.files[0].name+'. Ready to validate.');}
 else clear('File selection cleared.');
});
$('sample').addEventListener('click',()=>{file.value='';paste.value='{"name":"Asha","id":1}\n{"name":"Lee","id":2}\n';clear('Sample loaded. Validate to continue.');paste.focus();});
reset.addEventListener('click',()=>{form.reset();paste.value='';clear('Workspace reset.');paste.focus();});
cancel.addEventListener('click',()=>clear('Validation cancelled. No export was created.'));
window.addEventListener('pagehide',()=>clear('Workspace closed.'));
