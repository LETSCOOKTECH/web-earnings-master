export const LIMITS=Object.freeze({maxBytes:1048576,maxRecords:5000,preview:8});
const encoder=new TextEncoder();
export function normalizeJsonl(input,{allowBlank=false}={}){
 if(typeof input!=='string')throw Error('Input must be UTF-8 text');
 if(encoder.encode(input).length>LIMITS.maxBytes)throw Error('Input exceeds 1 MiB');
 const text=input.startsWith('\uFEFF')?input.slice(1):input;
 const lines=text.split(/\r\n|\n|\r/);
 if(lines.at(-1)==='')lines.pop();
 const normalized=[],preview=[];let blanks=0;
 for(let i=0;i<lines.length;i++){
  const raw=lines[i];
  if(raw.trim()===''){
   if(!allowBlank)throw Error('Empty JSONL record at line '+(i+1));
   blanks++;continue;
  }
  if(normalized.length>=LIMITS.maxRecords)throw Error('Input exceeds 5,000 JSONL records');
  let value;
  try{value=JSON.parse(raw)}catch{throw Error('Invalid JSON at line '+(i+1))}
  if(value===null||typeof value!=='object'||Array.isArray(value))
   throw Error('Each JSONL line must contain a JSON object (line '+(i+1)+')');
  const encoded=JSON.stringify(value);
  if(typeof encoded!=='string')throw Error('Cannot serialize record at line '+(i+1));
  normalized.push(encoded);
  if(preview.length<LIMITS.preview)preview.push({line:i+1,text:encoded.slice(0,360)});
 }
 if(normalized.length===0)throw Error('No JSON object records found');
 const jsonl=normalized.join('\n')+'\n';
 return {jsonl,records:normalized.length,skipped:blanks,lines:lines.length,
  preview,bytes:encoder.encode(jsonl).length};
}
