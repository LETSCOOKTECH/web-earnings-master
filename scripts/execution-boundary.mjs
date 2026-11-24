// Host-owned, in-process budget and capability boundary. Never expose the host object to untrusted agents.
export function createExecutionBoundary({limits,handlers,authorize=async()=>false}){
 const keys=['actions','tokens','cashMicros','sources'];
 const valid=x=>Number.isSafeInteger(x)&&x>=0;
 if(!limits||!keys.every(k=>valid(limits[k])))throw Error('Invalid host limits');
 const caps=Object.freeze({...limits}),spent=Object.fromEntries(keys.map(k=>[k,0]));
 const registry=new Map(Object.entries(handlers??{}));
 const journal=[];let halted=false,busy=false;
 return Object.freeze({
  snapshot:()=>({limits:{...caps},spent:{...spent},halted,journal:structuredClone(journal)}),
  halt:()=>{halted=true},
  async execute(name,input){
   if(halted||busy)throw Error('Boundary halted or busy');
   const h=registry.get(name);
   if(!h||typeof h.run!=='function'||typeof h.reserve!=='function')throw Error('Unknown capability');
   busy=true;
   try{
    const payload=structuredClone(input);
    const reservation=await h.reserve(structuredClone(payload));
    if(!reservation||!keys.every(k=>valid(reservation[k]))||reservation.actions<1)throw Error('Invalid reservation');
    if(keys.some(k=>reservation[k]>caps[k]-spent[k]))throw Error('Budget exhausted');
    if(h.effect!=='READ_ONLY'&&!(await authorize({name,input:structuredClone(payload),reservation:{...reservation}})))throw Error('Host authorization denied');
    if(halted)throw Error('Boundary halted');
    for(const k of keys)spent[k]+=reservation[k];
    const entry={name,reservation:{...reservation},status:'STARTED'};journal.push(entry);
    try{
     // Adapter must enforce the reservation upstream (e.g. max output tokens). No refund on failure.
     const result=await h.run(payload,Object.freeze({...reservation}));
     if(!result||!result.usage||!keys.every(k=>valid(result.usage[k])&&result.usage[k]<=reservation[k])){halted=true;throw Error('Untrusted or excessive adapter usage')}
     entry.status='COMPLETED';entry.usage={...result.usage};return result.value;
    }catch(e){entry.status='FAILED';halted=true;throw e}
   }finally{busy=false}
  }
 });
}
