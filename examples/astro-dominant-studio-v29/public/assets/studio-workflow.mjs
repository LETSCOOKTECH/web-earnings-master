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
/**
 * Prune all expired records on explicit workflow interaction. No background timer:
 * browser storage may retain them until the next visit or manual site-data clearing.
 */
export async function pruneExpiredWorkflows(now=Date.now()){
 const db=await open();
 return new Promise((resolve,reject)=>{
  const tx=db.transaction(STORE,'readwrite'),store=tx.objectStore(STORE);
  const request=store.openCursor();let deleted=0;
  request.onsuccess=()=>{
   const cursor=request.result;
   if(!cursor)return;
   if(cursor.value?.expires<=now){cursor.delete();deleted++;}
   cursor.continue();
  };
  tx.oncomplete=()=>{db.close();resolve(deleted);};
  tx.onerror=()=>{db.close();reject(tx.error||Error('Workflow pruning failed'));};
  tx.onabort=()=>{db.close();reject(tx.error||Error('Workflow pruning aborted'));};
 });
}
export async function clearAllWorkflows(){
 const db=await open();
 await transact(db,'readwrite',store=>store.clear());
 return true;
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
 await pruneExpiredWorkflows(now);
 const db=await open();
 await transact(db,'readwrite',store=>store.put({id,route,target,filename,output,created:now,expires:now+WORKFLOW_TTL_MS}));
 return {id,target,expires:now+WORKFLOW_TTL_MS,bytes};
}
export async function loadWorkflow(id,expectedTarget,now=Date.now()){
 if(!/^[a-f0-9-]{30,50}$/i.test(String(id)))throw Error('Invalid workflow reference');
 await pruneExpiredWorkflows(now);
 const db=await open();
 return new Promise((resolve,reject)=>{
  const tx=db.transaction(STORE,'readwrite'),store=tx.objectStore(STORE),req=store.get(id);
  let record=null;
  req.onsuccess=()=>{
   record=req.result||null;
   if(record)store.delete(id); // Consume atomically with read in the same transaction.
  };
  tx.oncomplete=()=>{
   db.close();
   const fresh=record&&record.expires>now&&record.target===expectedTarget;
   resolve(fresh?{output:record.output,filename:record.filename,bytes:new TextEncoder().encode(record.output).length}:null);
  };
  tx.onerror=()=>{db.close();reject(tx.error||Error('Workflow read failed'));};
  tx.onabort=()=>{db.close();reject(tx.error||Error('Workflow read aborted'));};
 });
}
