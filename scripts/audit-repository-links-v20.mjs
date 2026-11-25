#!/usr/bin/env node
/**
 * Check local Markdown links across README, skill manifests and docs.
 * This never claims that remote HTTP destinations are live or safe.
 */
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const excluded=new Set(['node_modules','.git','.tmp','dist','coverage']);
function recurse(dir){if(!fs.existsSync(dir))return [];
 return fs.readdirSync(dir,{withFileTypes:true}).flatMap(x=>{
  if(x.isDirectory())return excluded.has(x.name)?[]:recurse(path.join(dir,x.name));
  return x.isFile()&&x.name.endsWith('.md')?[path.join(dir,x.name)]:[];
 });
}
const isRealFile=f=>fs.existsSync(f)&&(fs.statSync(f).isFile()||fs.statSync(f).isDirectory()&&fs.existsSync(path.join(f,'README.md')));
export function auditMarkdownLocalLinks(rootDir,{paths=null}={}){
 const input=paths||['README.md','AGENTS.md',...['docs','references','learning','examples','.agents/skills'].flatMap(x=>recurse(path.join(rootDir,x)).map(f=>path.relative(rootDir,f)))];
 const failures=[],warnings=[],checked=[];
 for(const rel of input){
  const full=path.resolve(rootDir,rel);
  if(!fs.existsSync(full)){failures.push({source:rel,target:'',issue:'Source document missing'});continue;}
  const data=fs.readFileSync(full,'utf8');
  // Extract ordinary Markdown inline links; reference-style/HTML links need a separate reviewer.
  for(const m of data.matchAll(/!?\[[^\]\n]*\]\(([^)\n]+)\)/g)){
   let target=m[1].trim().split(/\s+["']/)[0].replace(/^<|>$/g,'');
   if(!target||target[0]==='#')continue;
   if(/^(?:https?:|mailto:|tel:|data:)/i.test(target)){
    if(/^https?:\/\/(?:[^/]*\.)?example\.(?:com|net|org)(?:\/|$)/i.test(target)&&
     (rel==='README.md'||rel.startsWith('examples/')))warnings.push({source:rel,target,issue:'Clickable documentation-only example domain; never label public demo'});
    continue;
   }
   if(/^[a-z][a-z0-9+.-]*:/i.test(target)){warnings.push({source:rel,target,issue:'Unexpected scheme in Markdown link'});continue;}
   target=target.split('#')[0].split('?')[0];
   let decoded;try{decoded=decodeURIComponent(target)}catch{failures.push({source:rel,target,issue:'Bad URL encoding'});continue}
   const candidate=path.resolve(path.dirname(full),decoded);
   checked.push({source:rel,target});
   if(candidate!==rootDir&&!candidate.startsWith(rootDir+path.sep)){
    failures.push({source:rel,target,issue:'Link escapes repository root'});continue;
   }
   if(!isRealFile(candidate))failures.push({source:rel,target,issue:'Local destination file or README directory missing'});
  }
 }
 const critical=failures.filter(x=>x.source==='README.md'||x.source==='AGENTS.md'||x.source==='docs/START_HERE.md'||x.source==='examples/seo-csv-lab/README.md');
 return {status:failures.length?'BROKEN_LOCAL_LINKS':'LOCAL_LINKS_OK_EXTERNAL_UNKNOWN',checked:checked.length,
  documents:input.length,failures,critical,warnings,
  external_links_verified:false,public_demo_verified:false,
  disclaimer:'This checks only ordinary local Markdown links; it cannot test HTTP availability, dynamic markdown, embedded HTML, private links or deployed product quality.'};
}
if(process.argv[1]&&path.resolve(process.argv[1])===path.resolve(import.meta.filename||'')){
 const r=auditMarkdownLocalLinks(root);
 console.log(JSON.stringify(r,null,2));
 if(process.argv.includes('--strict-all')&&r.failures.length)process.exitCode=1;
 if(process.argv.includes('--strict-critical')&&r.critical.length)process.exitCode=1;
}
