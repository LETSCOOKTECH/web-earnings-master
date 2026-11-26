import {MAX_INPUT_BYTES,detectExtension} from './studio-core.mjs';
/**
 * Uses File.stream and fatal streaming UTF-8 decode. Accumulates a bounded text
 * buffer; this is not a promised 500 MB or unlimited-memory parser.
 */
export async function readLocalText(file){
 if(!file||typeof file.stream!=='function')throw Error('Choose a local file');
 const kind=detectExtension(file.name);
 if(['parquet','md'].includes(kind.type))throw Error('This build does not implement binary Parquet or Markdown input');
 if(kind.type==='unknown'||['zstd','snappy'].includes(kind.compression))throw Error('Unsupported input compression/type');
 if(file.size>MAX_INPUT_BYTES&&kind.compression!=='gzip')throw Error('File exceeds the 16 MiB browser safety limit');
 if(kind.compression==='gzip'&&typeof DecompressionStream!=='function')throw Error('Gzip requires a browser with DecompressionStream support');
 let stream=file.stream();
 if(kind.compression==='gzip')stream=stream.pipeThrough(new DecompressionStream('gzip'));
 const decoder=new TextDecoder('utf-8',{fatal:true});
 const reader=stream.getReader();let total=0,text='';
 try{
  while(true){
   const {value,done}=await reader.read();if(done)break;
   total+=value.byteLength;
   if(total>MAX_INPUT_BYTES){await reader.cancel('Compressed output exceeds safety limit');throw Error('Uncompressed file exceeds the 16 MiB browser safety limit');}
   text+=decoder.decode(value,{stream:true});
  }
  text+=decoder.decode();
 }catch(error){
  // Safari/WebKit commonly reports malformed UTF-8 as a bare TypeError.
  // Present a stable, actionable error without weakening fatal decoding.
  if(error instanceof TypeError)throw Error('File is not valid UTF-8');
  throw error;
 }finally{reader.releaseLock();}
 return text;
}
