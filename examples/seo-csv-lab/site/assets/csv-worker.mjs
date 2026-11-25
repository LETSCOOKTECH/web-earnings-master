import {cleanCsv,LIMITS} from './csv-core.mjs';
self.addEventListener('message',event=>{
 const {id,input,options}=event.data||{};
 if(!Number.isSafeInteger(id)||typeof input!=='string'||!options||typeof options!=='object'){
  self.postMessage({id,ok:false,error:'Invalid background job request'});return;
 }
 try{
  const result=cleanCsv(input,options);
  const previewRows=result.rows.slice(result.hasHeader?1:0,(result.hasHeader?1:0)+8);
  const headings=result.hasHeader?result.rows[0]:Array.from({length:result.width},(_,i)=>'Column '+(i+1));
  self.postMessage({id,ok:true,result:{
   csv:result.csv,removed:result.removed,kept:result.kept,original:result.original,
   width:result.width,previewRows,headings,matchColumn:result.matchColumn,
   maxPreview:8,maxBytes:LIMITS.maxBytes
  }});
 }catch(error){
  self.postMessage({id,ok:false,error:error instanceof Error?error.message:'Unable to process this CSV'});
 }
});