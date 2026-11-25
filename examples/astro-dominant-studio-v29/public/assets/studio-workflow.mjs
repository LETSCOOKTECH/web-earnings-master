/**
 * Optional same-origin browser-local workflow handoff.
 * Nothing is saved until a user explicitly clicks Continue and confirms.
 * 30-minute logical expiry; expired records are deleted on next open/read.
 * IndexedDB is persistent storage; users should clear site data to purge sooner.
 */
export const WORKFLOW_DB='lct_pipeline_v1';
export const WORKFLOW_TTL_MS=30*60_000;
export const MAX_CHAIN_BYTES=2*1024*1024;
const STORE='jobs';
function open(){
 if(typeof indexedDB==='undefined')return Promise.reject(Error('IndexedDB not supported in this browser'));
 return new Promise((resolve,reject)=>{
  const request=indexedDB.open(WORKFLOW_DB,1);
  request.onupgradeneeded=()=>{const db=request.result;if(!db.objectStoreNames.contains(STORE))db.createObjectStore(STORE,{keyPath:'id'});};
  request.onsuccess=()=>resolve(request.result);
  request.onerror=()=>reject(request.error||Error('IndexedDB open failed'));
 });
}
function transact(db,mode,fn){
 return new Promise((resolve,reject)=>{
  const tx=db.transaction(STORE,mode),request=fn(tx.objectStore(STORE));
  let value;
  request.onsuccess=()=>{value=request.result;};
  tx.oncomplete=()=>{db.close();resolve(value);};
  tx.onerror=()=>{db.close();reject(tx.error||Error('IndexedDB transaction failed'));};
  tx.onabort=()=>{db.close();reject(tx.error||Error('IndexedDB transaction aborted'));};
 });
}
export function chooseFollowUp(route,filename){
 const ext=String(filename||'').split('.').at(-1);
 if(ext==='csv')return route==='csv-to-jsonl'?'csv-deduplicate':'csv-to-jsonl';
 if(ext==='jsonl')return route==='jsonl-validator'?'jsonl-to-json':'jsonl-validator';
 if(ext==='json')return route==='json-pretty'?'json-minify':'json-pretty';
 if(ext==='tsv')return 'tsv-to-csv';
 return null;
}
export async function saveWorkflow({route,filename,output},now=Date.now()){
 if(typeof output!=='string'||!output.length)throw Error('No processed result to hand off');
 const bytes=new TextEncoder().encode(output).length;
 if(bytes>MAX_CHAIN_BYTES)throw Error('Workflow handoff limited to 2 MiB; download larger results instead');
 const target=chooseFollowUp(route,filename);
 if(!target)throw Error('There is no compatible next tool for this output format');
 if(typeof crypto?.randomUUID!=='function')throw Error('Secure random browser IDs required');
 const id=crypto.randomUUID();
 const db=await open();
 await transact(db,'readwrite',store=>store.put({id,route,target,filename,output,created:now,expires:now+WORKFLOW_TTL_MS}));
 return {id,target,expires:now+WORKFLOW_TTL_MS,bytes};
}
export async function loadWorkflow(id,expectedTarget,now=Date.now()){
 if(!/^[a-f0-9-]{30,50}$/i.test(String(id)))throw Error('Invalid workflow reference');
 const db=await open();const record=await transact(db,'readonly',store=>store.get(id));
 if(!record)return null;
 const fresh=record.expires>now&&record.target===expectedTarget;
 // One-time use deletes local sensitive payload even when a wrong target is attempted.
 const second=await open();await transact(second,'readwrite',store=>store.delete(id));
 return fresh?{output:record.output,filename:record.filename,bytes:new TextEncoder().encode(record.output).length}:null;
}
