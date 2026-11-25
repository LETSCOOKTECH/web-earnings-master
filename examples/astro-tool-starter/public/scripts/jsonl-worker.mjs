import {normalizeJsonl} from './jsonl-core.mjs';
self.addEventListener('message',event=>{
 const {id,input,options}=event.data||{};
 if(!Number.isSafeInteger(id)||typeof input!=='string'||!options||typeof options!=='object'){
  self.postMessage({id,ok:false,error:'Invalid processing request'});return;
 }
 try{self.postMessage({id,ok:true,result:normalizeJsonl(input,options)})}
 catch(e){self.postMessage({id,ok:false,error:e instanceof Error?e.message:'Cannot parse JSONL'})}
});
