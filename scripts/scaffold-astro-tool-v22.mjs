#!/usr/bin/env node
/**
 * Copy the already-tested Astro 7 JSONL starter into a new local directory.
 * This is NOT an automatic new business, public hosting, indexing or SEO certificate.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=path.join(root,'examples/astro-jsonl-studio');
const excluded=new Set(['node_modules','dist','.astro','artifacts','.tmp','.env','.git']);
export function scaffoldAstroTool(output){
 if(typeof output!=='string'||!output.trim())throw Error('Explicit output directory is required');
 const dest=path.resolve(output);
 if(dest===root||dest===source||root.startsWith(dest+path.sep)||source.startsWith(dest+path.sep)||
    dest.startsWith(source+path.sep))
  throw Error('Output must not overwrite the repository or its reference starter');
 if(fs.existsSync(dest)){
  if(fs.lstatSync(dest).isSymbolicLink())throw Error('Symlink destination prohibited');
  if(!fs.statSync(dest).isDirectory()||fs.readdirSync(dest).length)throw Error('Output must be an empty directory');
 }
 fs.mkdirSync(dest,{recursive:true});
 fs.cpSync(source,dest,{recursive:true,filter:p=>p===source||!excluded.has(path.basename(p))});
 const receipt={
  schema:'sense-tool-creator-scaffold-v22',status:'LOCAL_SCAFFOLD_NOT_DEPLOYED',
  source:'examples/astro-jsonl-studio',path:dest,
  original_user_problem_validated:false,external_http_verified:false,
  astro_tested_in_this_copy:false,owner_authorized:false,
  search_indexed_verified:false,adsense_approved_verified:false,
  instructions:'Update user job, product behavior, legal copy, source research, brand and owner-controlled HTTPS origin before build, deployment and marketing. This is the JSONL sample, not a magically generated new tool.'
 };
 fs.writeFileSync(path.join(dest,'SENSE_BUILD_RECEIPT.json'),JSON.stringify(receipt,null,2)+'\n');
 return receipt;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const ix=process.argv.indexOf('--out'),dest=ix>=0?process.argv[ix+1]:null;
 try{console.log(JSON.stringify(scaffoldAstroTool(dest),null,2));}
 catch(e){console.error('SCAFFOLD BLOCKED: '+e.message);process.exitCode=1;}
}
