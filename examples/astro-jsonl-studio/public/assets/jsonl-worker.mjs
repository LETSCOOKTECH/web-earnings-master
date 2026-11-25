import {analyzeJsonl} from './jsonl-core.mjs';
self.addEventListener('message',event=>{
 const {id,text}=event.data||{};
 if(!Number.isSafeInteger(id)||typeof text!=='string'){
  self.postMessage({id,ok:false,message:'Invalid JSONL job request'});return;
 }
 try{self.postMessage({id,ok:true,result:analyzeJsonl(text)});}
 catch(error){self.postMessage({id,ok:false,message:error instanceof Error?error.message:'Processing failed'});}
});
