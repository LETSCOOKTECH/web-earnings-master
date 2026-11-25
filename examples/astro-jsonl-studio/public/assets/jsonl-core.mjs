// This parser validates JSONL without reserializing numbers or modifying string values.
// Preserve original valid record text to avoid JavaScript number precision loss.
export const LIMITS=Object.freeze({maxBytes:2_000_000,maxLines:5000,maxErrors:100});

export function analyzeJsonl(input,{maxBytes=LIMITS.maxBytes,maxLines=LIMITS.maxLines}={}){
 if(typeof input!=='string')throw new TypeError('Expected pasted JSONL text');
 const bytes=new TextEncoder().encode(input).byteLength;
 if(!Number.isInteger(maxBytes)||maxBytes<1||maxBytes>LIMITS.maxBytes)throw Error('Invalid input byte limit');
 if(!Number.isInteger(maxLines)||maxLines<1||maxLines>LIMITS.maxLines)throw Error('Invalid line limit');
 if(bytes>maxBytes)throw Error('Input exceeds 2 MB');
 if(!input.length||!input.trim())throw Error('Paste JSON Lines or choose a UTF-8 file');
 const source=input.startsWith('\uFEFF')?input.slice(1):input;
 const lines=source.split(/\r\n|\n|\r/);
 if(lines.at(-1)==='')lines.pop(); // a final newline is a terminator, not a blank record
 if(lines.length>maxLines)throw Error('Input exceeds 5,000 lines');
 const errors=[],valid=[],preview=[];
 let blanks=0;
 for(let i=0;i<lines.length;i++){
  const text=lines[i].trim();
  if(!text){blanks++;continue;}
  try{
   const parsed=JSON.parse(text);
   // Keep raw lexemes, including arbitrary-precision integers, exactly as input.
   valid.push(text);
   if(preview.length<6)preview.push({line:i+1,type:Array.isArray(parsed)?'array':parsed===null?'null':typeof parsed,
     sample:text.length>120?text.slice(0,117)+'...':text});
  }catch(e){
   if(errors.length<LIMITS.maxErrors)errors.push({line:i+1,message:'Invalid JSON value: '+(e instanceof Error?e.message:'parse failed').slice(0,160)});
  }
 }
 if(!valid.length&&errors.length===0)throw Error('No JSON values found; input contains only blank lines');
 return {
  lines:lines.length,valid:valid.length,invalid:errors.length,blank:blanks,
  errors,preview,
  output:errors.length===0?valid.join('\n')+'\n':null,
  canDownload:errors.length===0&&valid.length>0,
  note:errors.length?'Fix invalid lines before downloading; partial data export is blocked.':'Original valid JSON values are preserved; blank lines are removed.'
 };
}
