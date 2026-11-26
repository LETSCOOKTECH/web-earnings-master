import {readLocalText} from './studio-reader.mjs';
import {saveWorkflow,loadWorkflow,clearAllWorkflows,chooseFollowUp,MAX_CHAIN_BYTES} from './studio-workflow.mjs';
const el=id=>document.getElementById(id);
const box=document.querySelector('[data-studio-route]');
if(box){
 const route=box.dataset.studioRoute,form=el('studio-form'),file=el('studio-file'),input=el('studio-input');
 const status=el('studio-status'),preview=el('studio-preview'),download=el('studio-download'),copy=el('studio-copy'),run=el('studio-run'),receipt=el('studio-receipt'),chain=el('studio-chain');
 let active=null,serial=0,objectUrl=null,output='',lastResult=null;
 function revoke(){if(objectUrl){URL.revokeObjectURL(objectUrl);objectUrl=null;}download.hidden=true;download.removeAttribute('href');copy.disabled=true;chain.hidden=true;lastResult=null;output='';}
 function message(value,error=false){status.textContent=value;status.dataset.error=error?'true':'false';}
 function reset(reason){serial++;if(active){active.terminate();active=null;}run.disabled=false;revoke();preview.textContent='Output preview will appear here.';receipt.textContent='No current result.';message(reason);}
 function invalidate(){reset('Input changed. Run conversion again.');}
 input.addEventListener('input',()=>{if(file.value)file.value='';invalidate();});
 file.addEventListener('change',()=>{if(file.files?.length)input.value='';invalidate();});
 el('studio-escape').addEventListener('change',invalidate);
 el('studio-mask').addEventListener('change',invalidate);
 el('studio-reset').addEventListener('click',()=>{file.value='';input.value='';reset('Cleared.');});
 el('studio-sample').addEventListener('click',()=>{
  const example=JSON.parse(el('studio-example').textContent);
  file.value='';input.value=example;reset('Example loaded. Convert to inspect its output.');
 });
 form.addEventListener('submit',async event=>{
  event.preventDefault();reset('Reading source locally…');const id=serial;run.disabled=true;
  try{
   const text=file.files?.length?await readLocalText(file.files[0],route.split('-')[0]):input.value;
   if(id!==serial)return;
   if(!text.trim())throw Error('Choose a file or paste nonempty text');
   if(typeof Worker!=='function')throw Error('This browser does not support module Workers');
   const worker=new Worker('/assets/studio-worker.mjs',{type:'module'});active=worker;
   message('Transforming in a local Worker…');
   worker.addEventListener('message',event=>{
    if(id!==serial)return;
    active?.terminate();active=null;run.disabled=false;
    const data=event.data||{};
    if(data.job!==id||!data.ok){message(data.error||'Local processing failed.',true);return;}
    const result=data.result;lastResult=result;output=result.output;
    // Render data as text, never as untrusted HTML.
    preview.textContent=output.length>20000?output.slice(0,20000)+'\n[Preview clipped; download contains full output]':output;
    objectUrl=URL.createObjectURL(new Blob([output],{type:result.mime+';charset=utf-8'}));
    download.href=objectUrl;download.download=result.filename;download.hidden=false;copy.disabled=false;
    receipt.textContent='Input '+result.inputBytes.toLocaleString()+' bytes · Output '+result.outputBytes.toLocaleString()+' bytes · '+result.elapsedMs+' ms (local Worker).';
    chain.hidden=!(result.outputBytes<=MAX_CHAIN_BYTES&&chooseFollowUp(route,result.filename));
    message('Conversion completed. Inspect the preview and download.');
   },{once:true});
   worker.addEventListener('error',()=>{if(id!==serial)return;active?.terminate();active=null;run.disabled=false;message('Worker failed. No output produced.',true);},{once:true});
   worker.postMessage({job:id,route,input:text,sanitize:el('studio-escape').checked,maskSecrets:el('studio-mask').checked});
  }catch(error){if(id!==serial)return;active?.terminate();active=null;run.disabled=false;message(error instanceof Error?error.message:'Input failed.',true);}
 });
 el('studio-clear-workflows').addEventListener('click',async()=>{
  try{await clearAllWorkflows();message('Saved local workflow handoffs deleted from this browser.');}
  catch{message('Could not clear local handoffs; use browser site-data controls.',true);}
 });
 chain.addEventListener('click',async()=>{
  if(!lastResult||!output)return;
  const accepted=window.confirm('Save this processed output in browser-local IndexedDB for a one-time workflow handoff? It may persist in site data until used or next-expiry cleanup. Do not use for secrets.');
  if(!accepted)return;
  try{
   const item=await saveWorkflow({route,filename:lastResult.filename,output});
   window.location.assign('/tools/'+item.target+'/#chain='+encodeURIComponent(item.id));
  }catch(error){message(error instanceof Error?error.message:'Could not save local workflow',true);}
 });
 const requested=new URLSearchParams(window.location.hash.slice(1)).get('chain');
 if(requested){
  loadWorkflow(requested,route).then(item=>{
   if(item){file.value='';input.value=item.output;reset('Previous output loaded locally. Inspect and convert again.');}
   else message('Workflow was expired, used already, or meant for another tool.',true);
  }).catch(()=>message('Local workflow data could not be accessed.',true))
   .finally(()=>window.history.replaceState(null,'',window.location.pathname+window.location.search));
 }
 copy.addEventListener('click',async()=>{
  if(!output)return;
  try{await navigator.clipboard.writeText(output);message('Output copied locally.');}
  catch{message('Clipboard permission denied. Use Download.',true);}
 });
 window.addEventListener('pagehide',()=>{if(active)active.terminate();revoke();},{once:true});
 // Experimental WebMCP is opt-in by browser capability. Never expose private file contents.
 const context=document.modelContext??navigator.modelContext;
 if(context&&typeof context.registerTool==='function'){
  try{context.registerTool({name:'get_studio_status',description:'Return the active file converter name and whether a local output is available; never reveal private file data.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false,consequentialHint:false},execute:async()=>({content:[{type:'text',text:JSON.stringify({route,hasOutput:Boolean(output),privacy:'browser-local'})}]})});}
  catch{ /* Early-preview WebMCP is optional. */ }
 }
}
