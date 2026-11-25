/**
 * Chrome WebMCP recommended character budgets (not normative W3C hard limits).
 * Conservative 1,400-byte local response budget, below current 1.5K-character guidance.
 * This helper stores no full output bytes: caller must retain output in UI/file buffer.
 */
export const WEBMCP_BUDGETS=Object.freeze({nameChars:30,toolDescriptionChars:500,paramDescriptionChars:150,outputBytes:1400});
export function validateWebMcpTool(tool){
 const errors=[];
 if(!tool||typeof tool!=='object')return ['INVALID_TOOL'];
 const fail=(x,n,field)=>{if(typeof x!=='string'||!x.trim()||x.length>n)errors.push('INVALID_'+field);};
 fail(tool.name,WEBMCP_BUDGETS.nameChars,'NAME');
 fail(tool.description,WEBMCP_BUDGETS.toolDescriptionChars,'DESCRIPTION');
 for(const [name,meta] of Object.entries(tool.inputSchema?.properties||{})){
  fail(name,WEBMCP_BUDGETS.nameChars,'PARAM_NAME');
  fail(meta.description,WEBMCP_BUDGETS.paramDescriptionChars,'PARAM_DESCRIPTION');
 }
 if(tool.annotations?.readOnlyHint!==true&&tool.annotations?.consequentialHint!==true)errors.push('ACTION_SAFETY_ANNOTATION_MISSING');
 return errors;
}
export function compactAgentReceipt({status='READY',route='',hasOutput=false,processedBytes=0,preview=''},{maxBytes=WEBMCP_BUDGETS.outputBytes}={}){
 if(!Number.isInteger(maxBytes)||maxBytes<120||maxBytes>WEBMCP_BUDGETS.outputBytes)throw Error('Invalid summary byte budget');
 const payload={status:String(status).slice(0,40),route:String(route).slice(0,60),hasOutput:hasOutput===true,processedBytes:Number.isSafeInteger(processedBytes)?processedBytes:0,preview:String(preview)};
 const size=()=>new TextEncoder().encode(JSON.stringify(payload)).length;
 while(size()>maxBytes&&payload.preview.length)payload.preview=payload.preview.slice(0,Math.floor(payload.preview.length*.65));
 if(size()>maxBytes)throw Error('Agent receipt metadata exceeds byte budget');
 return {payload,serialized:JSON.stringify(payload),bytes:size(),fullOutputIncluded:false};
}
