import {executeStudio} from './studio-core.mjs';
self.addEventListener('message',e=>{
 const data=e.data||{};
 if(!Number.isSafeInteger(data.job)||typeof data.route!=='string'||typeof data.input!=='string'){
  self.postMessage({job:data.job,ok:false,error:'Invalid local transformation request'});return;
 }
 try{self.postMessage({job:data.job,ok:true,result:executeStudio(data.route,data.input,{sanitize:data.sanitize!==false,maskSecrets:data.maskSecrets===true})});}
 catch(error){self.postMessage({job:data.job,ok:false,error:error instanceof Error?error.message:'Conversion error'});}
});
