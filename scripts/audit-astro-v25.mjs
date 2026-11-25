// Astro 7 static/server and adapter source audit; not a deployment certificate.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {validatePublicSiteOrigin} from './validate-public-origin-v20.mjs';
export function auditAstro({config='',packageJson={},pages={},builtHtml=[],production=false,origin=null}={}){
 const failures=[],warnings=[],unknowns=[];
 const dep={...packageJson.dependencies,...packageJson.devDependencies};
 if(!dep.astro)failures.push('ASTRO_DEPENDENCY_MISSING');
 const mode=/\boutput\s*:\s*['"](static|server|hybrid)['"]/i.exec(config)?.[1]||'static';
 if(mode==='hybrid')failures.push('OBSOLETE_ASTRO_OUTPUT_HYBRID');
 const adapters=Object.keys(dep).filter(x=>['@astrojs/node','@astrojs/cloudflare','@astrojs/vercel','@astrojs/netlify'].includes(x));
 const dynamic=Object.entries(pages).filter(([_,c])=>/export\s+const\s+prerender\s*=\s*false\b/.test(c)).map(([name])=>name);
 if((mode==='server'||dynamic.length)&&adapters.length===0)failures.push('DYNAMIC_ROUTES_REQUIRE_ADAPTER');
 if(adapters.length>1)warnings.push('MULTIPLE_ADAPTERS_REVIEW_DEPLOYMENT');
 if(production&&(!origin||!validatePublicSiteOrigin(origin).ok))failures.push('REAL_PUBLIC_ORIGIN_REQUIRED');
 if(production&&builtHtml.length===0)failures.push('BUILT_HTML_REQUIRED');
 for(const p of builtHtml){
  if(!p||typeof p.html!=='string'||typeof p.name!=='string'){failures.push('INVALID_BUILT_PAGE');continue;}
  for(const [k,re] of [['TITLE',/<title\b[^>]*>[^<]+<\/title>/i],['H1',/<h1\b/i],['MAIN',/<main\b/i],['LANG',/<html\b[^>]*\blang=/i],['CANONICAL',/<link\b[^>]*rel=["']canonical["']/i]])
   if(!re.test(p.html))failures.push('PAGE_'+p.name+'_MISSING_'+k);
 }
 if(!builtHtml.length)unknowns.push('NO_COMPILED_HTML_INSPECTED');
 unknowns.push('FULL_BROWSER_TASK_OUTPUT_AND_EXTERNAL_HOST_NOT_VERIFIED');
 return {schema:'sense-astro-audit-v25',status:failures.length?'FAIL':production?'BUILD_ONLY_PASS_NOT_DEPLOYED':'SOURCE_ONLY_NOT_DEPLOYED',
  mode,adapters,dynamic_routes:dynamic,pages_checked:builtHtml.length,failures,warnings,unknowns,
  public_deployment_verified:false,seo_ranking_verified:false,adsense_verified:false};
}
export function auditAstroProject(directory,{origin=null,production=false}={}){
 const root=path.resolve(directory),config=fs.readFileSync(path.join(root,'astro.config.mjs'),'utf8');
 const packageJson=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
 const pages={},src=path.join(root,'src','pages');
 function scan(dir,depth=0){if(depth>8)throw Error('ROUTE_DEPTH_LIMIT');
  if(!fs.existsSync(dir))return;
  for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
   const f=path.join(dir,entry.name);if(entry.isSymbolicLink())throw Error('SYMLINK_REFUSED');
   if(entry.isDirectory())scan(f,depth+1);
   else if(/\.(?:astro|js|ts)$/.test(entry.name)){
    if(Object.keys(pages).length>500||fs.statSync(f).size>1_000_000)throw Error('SOURCE_LIMIT');
    pages[path.relative(src,f)]=fs.readFileSync(f,'utf8');
   }
  }
 }scan(src);
 const builtHtml=[];const dist=path.join(root,'dist');
 function scanBuilt(dir,depth=0){if(!fs.existsSync(dir))return;if(depth>8)throw Error('BUILD_DEPTH_LIMIT');
  for(const ent of fs.readdirSync(dir,{withFileTypes:true})){
   const full=path.join(dir,ent.name);if(ent.isSymbolicLink())throw Error('SYMLINK_DIST_REFUSED');
   if(ent.isDirectory())scanBuilt(full,depth+1);
   else if(ent.name.endsWith('.html')){
    if(builtHtml.length>=1000||fs.statSync(full).size>2_000_000)throw Error('HTML_OUTPUT_LIMIT');
    builtHtml.push({name:path.relative(dist,full).replace(/\\/g,'/'),html:fs.readFileSync(full,'utf8')});
   }
  }
 }scanBuilt(dist);
 return auditAstro({config,packageJson,pages,builtHtml,origin,production});
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{
  const i=process.argv.indexOf('--project'),o=process.argv.indexOf('--origin');
  if(i<0||!process.argv[i+1])throw Error('Usage: --project DIR [--production --origin https://owned-site.tld/]');
  const report=auditAstroProject(process.argv[i+1],{production:process.argv.includes('--production'),origin:o<0?null:process.argv[o+1]});
  console.log(JSON.stringify(report,null,2));if(report.failures.length)process.exitCode=1;
 }catch(e){console.error('ASTRO_GATE_FAIL: '+e.message);process.exitCode=2;}
}
