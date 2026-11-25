#!/usr/bin/env node
/**
 * Copy a real, pinned Astro 7 Studio prototype to an empty working directory.
 * Safe local copy only. No deployment, domain ownership or market claim.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const repo=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const src=path.join(repo,'examples/astro-dominant-studio-v29');
const banned=new Set(['node_modules','dist','.astro','artifacts','.env','.git']);
export function scaffoldDominantStudio(dest){
 if(typeof dest!=='string'||!dest.trim())throw Error('Explicit destination required');
 const absolute=path.resolve(dest);
 if(absolute===repo||absolute===src||repo.startsWith(absolute+path.sep)||src.startsWith(absolute+path.sep)||absolute.startsWith(src+path.sep))
  throw Error('Refusing to overwrite repository or prototype');
 if(fs.existsSync(absolute)){
  if(fs.lstatSync(absolute).isSymbolicLink()||!fs.statSync(absolute).isDirectory()||fs.readdirSync(absolute).length)throw Error('Destination must be empty directory without symlinks');
 }
 fs.mkdirSync(absolute,{recursive:true});
 fs.cpSync(src,absolute,{recursive:true,filter:p=>p===src||!banned.has(path.basename(p))});
 const receipt={schema:'sense-studio-scaffold-v29',status:'LOCAL_COPY_NOT_DEPLOYED',path:absolute,
  routes:20,parquet_implemented:false,toon_implemented:false,large_file_500mb_verified:false,
  public_https_verified:false,adsense_verified:false,real_search_demand_verified:false,
  next:'npm ci && npm run check && npm run build && npm test; browser tests require installed Playwright browsers'};
 fs.writeFileSync(path.join(absolute,'SENSE_STUDIO_RECEIPT.json'),JSON.stringify(receipt,null,2)+'\n');
 return receipt;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const i=process.argv.indexOf('--out');try{console.log(JSON.stringify(scaffoldDominantStudio(i<0?'':process.argv[i+1]),null,2));}
 catch(e){console.error('V29_SCAFFOLD_BLOCKED:'+e.message);process.exitCode=1;}
}
