#!/usr/bin/env node
/**
 * Build a root-hosted, self-canonical CSV lab artifact from the local fixture.
 * This ONLY creates files. No HTTP deployment, DNS/TLS, index, AdSense or revenue proof.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {validatePublicSiteOrigin} from './validate-public-origin-v20.mjs';

const projectRoot=path.resolve(import.meta.dirname,'..');
const sourceRoot=path.join(projectRoot,'examples/seo-csv-lab/site');
const files=['index.html','404.html','robots.txt','sitemap-index.xml','sitemap-0.xml',
 'assets/csv-core.mjs','assets/csv-worker.mjs','assets/tool.mjs','assets/style.css'];
export function buildPublicCsvDemo({origin,outDir}){
 const gate=validatePublicSiteOrigin(origin);
 if(!gate.ok)throw new Error('Invalid production-candidate origin: '+gate.issues.join('; '));
 if(typeof outDir!=='string'||!outDir.trim())throw new Error('Explicit output folder required');
 const dest=path.resolve(outDir),src=path.resolve(sourceRoot);
 if(dest===src||dest.startsWith(src+path.sep)||src.startsWith(dest+path.sep))
  throw new Error('Output cannot overwrite or contain the original fixture');
 if(fs.existsSync(dest)&&fs.readdirSync(dest).length>0)
  throw new Error('Refusing to overwrite an existing nonempty output folder');
 if(fs.existsSync(dest)&&fs.lstatSync(dest).isSymbolicLink())throw new Error('Output cannot be symlink');
 const fixture='https://csv-lab.example.org';
 fs.mkdirSync(dest,{recursive:true});
 for(const name of files){
  const p=path.join(sourceRoot,name),target=path.join(dest,name);
  let contents=fs.readFileSync(p,'utf8');
  if(/\.(html|txt|xml)$/.test(name))contents=contents.replaceAll(fixture,gate.origin);
  fs.mkdirSync(path.dirname(target),{recursive:true});
  fs.writeFileSync(target,contents);
 }
 const found=files.filter(name=>fs.readFileSync(path.join(dest,name),'utf8').includes(fixture));
 if(found.length)throw new Error('Failed to replace test-only canonical/sitemap origin: '+found.join(', '));
 const manifest={schema:'sense-csv-demo-build-v20',status:'BUILD_ONLY_NOT_DEPLOYED',
  origin:gate.origin,build_artifacts:files,generated_at:new Date().toISOString(),
  external_http_verified:false,owner_authorized:false,search_index_verified:false,
  browser_production_verified:false,adsense_approved_verified:false,
  warning:'The caller must deploy on a domain they control and run real HTTPS, browser, ownership and external owner-account checks. No live URL is inferred.'};
 fs.writeFileSync(path.join(dest,'BUILD_EVIDENCE.json'),JSON.stringify(manifest,null,2)+'\n');
 return manifest;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const args=process.argv.slice(2);
 const flag=k=>{const i=args.indexOf(k);return i<0?null:args[i+1]};
 try{const data=buildPublicCsvDemo({origin:flag('--origin'),outDir:flag('--out')});
 console.log(JSON.stringify(data,null,2));
 }catch(e){console.error('BUILD STOP:',e.message);process.exitCode=1;}
}
