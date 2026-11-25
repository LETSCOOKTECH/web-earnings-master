import {LIMITS} from './csv-core.mjs';
const $=id=>document.getElementById(id);
const form=$('csv-form'),file=$('csv-file'),paste=$('csv-paste'),status=$('status');
const link=$('download'),copy=$('copy-result'),output=$('result-view'),empty=$('empty-state');
const run=$('run-tool'),cancel=$('cancel-tool'),scope=$('scope'),column=$('column');
let objectURL=null,active=null,serial=0,lastCsv='';

function clearDownload(){
 if(objectURL){URL.revokeObjectURL(objectURL);objectURL=null;}
 link.hidden=true;link.removeAttribute('href');copy.hidden=true;lastCsv='';
}
function setStatus(text,state='ok'){status.textContent=text;status.dataset.state=state;}
function stopActive(){
 if(active){active.worker.terminate();active=null;}
 run.disabled=false;cancel.hidden=true;
}
function invalidate(message='Inputs changed. Process again.'){
 stopActive();clearDownload();output.hidden=true;empty.hidden=false;
 setStatus(message);
}
function setBusy(busy){
 run.disabled=busy;cancel.hidden=!busy;
 if(busy)setStatus('Processing locally…','working');
}
function addCell(row,tag,text){
 const el=document.createElement(tag);
 // No untrusted data is ever interpolated as HTML.
 el.textContent=String(text);
 if(tag==='th')el.scope='col';
 el.title=String(text).slice(0,240);
 row.append(el);
}
function renderPreview(result){
 const table=$('result-table'),head=table.tHead,body=table.tBodies[0];
 head.replaceChildren();body.replaceChildren();
 const headerRow=document.createElement('tr');
 for(const value of result.headings)addCell(headerRow,'th',value);
 head.append(headerRow);
 for(const values of result.previewRows){
  const tr=document.createElement('tr');
  for(const cell of values)addCell(tr,'td',cell);
  body.append(tr);
 }
 $('stat-original').textContent=result.original.toLocaleString('en-US');
 $('stat-kept').textContent=result.kept.toLocaleString('en-US');
 $('stat-removed').textContent=result.removed.toLocaleString('en-US');
 $('preview-count').textContent='Showing '+result.previewRows.length+' of '+result.kept+' data rows';
 const mode=result.matchColumn===null?'all columns':'column '+result.matchColumn;
 $('result-note').textContent='Compared '+mode+'. First match retained. Preview limited to 8 rows; the download contains all '+result.kept+' kept records.';
 output.hidden=false;empty.hidden=true;
}
function showResult(result,sourceName){
 renderPreview(result);
 const blob=new Blob([result.csv],{type:'text/csv;charset=utf-8'});
 objectURL=URL.createObjectURL(blob);
 const base=(sourceName||'cleaned').replace(/\.csv$/i,'').replace(/[^a-z0-9._-]/gi,'-').slice(0,70)||'cleaned';
 link.download=(sourceName?base+'-cleaned':'cleaned')+'.csv';
 link.href=objectURL;link.hidden=false;copy.hidden=false;lastCsv=result.csv;
 setStatus('Removed '+result.removed+' duplicate rows; kept '+result.kept+' rows.');
}
async function processSource(){
 const selected=file.files?.[0];
 if(selected&&selected.size>LIMITS.maxBytes)throw Error('File exceeds 2 MB');
 if(selected){
  let bytes;
  try{bytes=await selected.arrayBuffer()}catch{throw Error('Cannot read the selected file');}
  try{return {input:new TextDecoder('utf-8',{fatal:true}).decode(bytes),name:selected.name};}
  catch{throw Error('File is not valid UTF-8. Convert it to UTF-8 before continuing.');}
 }
 return {input:paste.value,name:''};
}
function getOptions(){
 const isColumn=scope.value==='column';
 const index=Number(column.value);
 if(isColumn&&(!Number.isInteger(index)||index<1||index>LIMITS.maxColumns))
  throw Error('Column number must be between 1 and '+LIMITS.maxColumns);
 return {
  hasHeader:$('header').checked,
  caseSensitive:$('case').checked,
  trimForMatching:$('trim').checked,
  guardSpreadsheetFormulas:$('spreadsheet').checked,
  matchColumn:isColumn?index:null
 };
}
form.addEventListener('submit',async event=>{
 event.preventDefault();
 invalidate('Starting cleanup…');
 const id=++serial;
 try{
  const options=getOptions();
  const {input,name}=await processSource();
  if(id!==serial)return;
  if(!input.length)throw Error('Paste CSV text or choose a file');
  // The CSV parser validates bytes, row/column bounds and malformed quotation.
  if(typeof Worker!=='function')throw Error('Background processing is unavailable in this browser');
  const worker=new Worker(new URL('./csv-worker.mjs',import.meta.url),{type:'module'});
  active={id,worker};setBusy(true);
  worker.addEventListener('message',event=>{
   if(active?.id!==id)return;
   const data=event.data||{};stopActive();
   if(!data.ok){invalidate(data.error||'Unable to process CSV');setStatus(data.error||'Unable to process CSV','error');return;}
   showResult(data.result,name);
  });
  worker.addEventListener('error',()=>{
   if(active?.id!==id)return;
   invalidate('Background CSV processing failed. Check the file and retry.');
   setStatus('Background CSV processing failed. Check the file and retry.','error');
  });
  worker.postMessage({id,input,options});
 }catch(error){
  if(id!==serial)return;
  invalidate();
  setStatus(error instanceof Error?error.message:'Unable to process CSV','error');
 }
});
cancel.addEventListener('click',()=>{
 serial++;invalidate('Processing cancelled. No output was saved.');
});
function sourceChanged(message){
 serial++;invalidate(message);
}
paste.addEventListener('input',()=>{
 if(file.value)file.value='';
 sourceChanged('Pasted data changed. Process again.');
});
file.addEventListener('change',()=>{
 if(file.files?.length){
  paste.value='';
  sourceChanged('Selected '+file.files[0].name+'. Ready to clean.');
 }else sourceChanged('File selection cleared.');
});
for(const id of ['header','case','trim','spreadsheet','column']){
 $(id).addEventListener('change',()=>sourceChanged('Cleanup settings changed. Process again.'));
}
scope.addEventListener('change',()=>{
 $('column-controls').hidden=scope.value!=='column';
 sourceChanged('Match mode changed. Process again.');
});
$('load-sample').addEventListener('click',()=>{
 file.value='';
 paste.value='id,name,city\n1,Asha,Jaipur\n1,Asha,Jaipur\n2,Lee,Delhi\n3,Noor,Jaipur\n3,Noor,Jaipur\n';
 sourceChanged('Sample loaded. Press Remove duplicate rows.');
 paste.focus();
});
$('reset-tool').addEventListener('click',()=>{
 serial++;form.reset();paste.value='';file.value='';
 $('column-controls').hidden=true;invalidate('Workspace cleared. No file processed.');
 paste.focus();
});
copy.addEventListener('click',async()=>{
 if(!lastCsv)return;
 try{
  if(!navigator.clipboard?.writeText)throw Error('Clipboard access unavailable');
  await navigator.clipboard.writeText(lastCsv);
  setStatus('Cleaned CSV copied to clipboard.');
 }catch{setStatus('Copy was blocked by your browser. Use Download cleaned CSV instead.','error');}
});
window.addEventListener('pagehide',()=>{serial++;stopActive();clearDownload()});
