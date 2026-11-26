#!/usr/bin/env node
/**
 * V29 bounded artifact gate: no claim of deployment, ranking, ads or demand.
 * Reject production-specific source/robots errors on an explicitly provided origin.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {validatePublicSiteOrigin} from './validate-public-origin-v20.mjs';
import {evaluateRobots} from './robots-evaluator.mjs';
import {STUDIO_ROUTES,executeStudio} from '../examples/astro-dominant-studio-v29/public/assets/studio-core.mjs';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const CAP=24*1024*1024;
export function scanAssetSizes(dist,{limit=CAP}={}){
 const failures=[],assets=[];const base=path.resolve(dist);
 if(!fs.existsSync(base))return {failures:['DIST_NOT_FOUND'],assets};
 function visit(dir,depth=0){
  if(depth>14){failures.push('DIST_DEPTH_LIMIT');return;}
  for(const e of fs.readdirSync(dir,{withFileTypes:true})){
   const full=path.join(dir,e.name),relative=path.relative(base,full).replace(/\\/g,'/');
   if(e.isSymbolicLink()){failures.push('SYMLINK_FORBIDDEN:'+relative);continue;}
   if(e.isDirectory())visit(full,depth+1);
   else if(e.isFile()){
    const size=fs.statSync(full).size;assets.push({path:relative,bytes:size});
    if(size>limit)failures.push('CLOUDFLARE_24_MIB_SAFETY_LIMIT:'+relative+'='+size);
   }
  }
 }
 visit(base);
 return {failures,assets};
}
export function checkNoindex(html,{production=false}={}){
 const hasNoindex=[...String(html).matchAll(/<meta\b[^>]*>/gi)].some(m=>/\bname\s*=\s*["']robots["']/i.test(m[0])&&/\bnoindex\b/i.test(m[0]));
 const hasNosnippet=/\bnosnippet\b|\bmax-snippet\s*:\s*0\b/i.test(html);
 const failures=[];
 if(production&&hasNoindex)failures.push('PRODUCTION_NOINDEX');
 if(production&&hasNosnippet)failures.push('PRODUCTION_SNIPPET_BLOCK');
 if(!production&&!hasNoindex)failures.push('LOCAL_EXAMPLE_NOINDEX_MISSING');
 return failures;
}
export function verifyMutatingRoutes(routes=STUDIO_ROUTES){
 const failures=[];const ids=new Set(),perGroup=new Map();
 for(const r of routes){
  if(ids.has(r.id))failures.push('DUPLICATE_ROUTE:'+r.id);
  ids.add(r.id);
  const sample=r.kind==='csv'?'id,name\n00502,Lee\n, \n00501,Asha\n00502,Lee\n':r.kind==='tsv'?'id\tname\n00501\tAsha\n00502\tLee\n':
    r.kind==='jsonl'?'{"id":"00501","name":"Asha"}\n{"id":"00502","name":"Lee"}\n':
    '[{"id":"00501","name":"Asha"},{"id":"00502","name":"Lee"}]';
  try{
   const output=executeStudio(r.id,sample).output;
   const h=r.kind+'|'+output;
   if(perGroup.has(h))failures.push('SAME_INPUT_DUPLICATE_OUTPUT:'+r.id+' and '+perGroup.get(h));
   else perGroup.set(h,r.id);
  }catch(e){failures.push('ROUTE_ORACLE_FAILED:'+r.id+':'+e.message);}
 }
 return {failures,checked:routes.length};
}
/**
 * Conservative build-time check that 28 route pages explain their REAL jobs.
 * Distinct metadata is a product-quality gate, not evidence of Google ranking.
 */
export function verifyEditorialDistinctness(toolEntries){
 const failures=[],seen=new Set();
 if(!Array.isArray(toolEntries))return {failures:['TOOL_METADATA_MISSING'],checked:0};
 const byId=new Map(toolEntries.map(x=>[x.id,x]));
 if(byId.size!==STUDIO_ROUTES.length||toolEntries.length!==STUDIO_ROUTES.length)failures.push('ROUTE_METADATA_COUNT_MISMATCH');
 for(const route of STUDIO_ROUTES){
  const tool=byId.get(route.id);
  if(!tool){failures.push('ROUTE_METADATA_MISSING:'+route.id);continue;}
  if(tool.group!==route.group||tool.kind!==route.kind||tool.label!==route.label)failures.push('ROUTE_METADATA_MISMATCH:'+route.id);
  for(const field of ['description','useCase','outputNotes','caveat']){
   const value=tool[field];
   if(typeof value!=='string'||value.trim().length<50){failures.push('ROUTE_EXPLANATION_THIN:'+route.id+':'+field);continue;}
   const fingerprint=field+':'+value.trim().toLowerCase();
   if(seen.has(fingerprint))failures.push('DUPLICATE_ROUTE_EXPLANATION:'+route.id+':'+field);
   seen.add(fingerprint);
  }
 }
 return {failures,checked:STUDIO_ROUTES.length};
}
export function checkBuiltRoute(html,route,{production=false}={}){
 const failures=checkNoindex(html,{production});
 if(!/<h1\b/i.test(html))failures.push('H1_MISSING:'+route);
 if(!/<main\b/i.test(html))failures.push('MAIN_MISSING:'+route);
 if(!/<table\b/i.test(html))failures.push('CONSTRAINT_TABLE_MISSING:'+route);
 if(!/<script\b[^>]*type=["']application\/ld\+json["']/i.test(html))failures.push('WEB_APPLICATION_SCHEMA_MISSING:'+route);
 for(const field of ['use-case','output','caveat'])if(!html.includes('data-route-'+field))failures.push('ROUTE_GUIDANCE_MISSING:'+route+':'+field);
 // Neither FAQPage nor 400+ words is an official Search requirement.
 return failures;
}
export function auditV29({dist,origin,production=false}={}){
 const errors=[],warnings=[];
 if(!dist||!origin)throw Error('Requires --dist and --origin');
 const asset=scanAssetSizes(dist);errors.push(...asset.failures);
 const originResult=validatePublicSiteOrigin(origin);
 if(production&&!originResult.ok)errors.push(...originResult.issues.map(x=>'INVALID_PRODUCTION_ORIGIN:'+x));
 if(!production&&originResult.ok)warnings.push('LOCAL_AUDIT_WITH_PUBLIC_ORIGIN: supply --production only for authorized release');
 const pathroot=path.resolve(dist);
 const index=path.join(pathroot,'index.html');
 if(!fs.existsSync(index))errors.push('LANDING_PAGE_MISSING');
 const roots=['csv','tsv','jsonl','json'];
 for(const group of roots){
  if(!fs.existsSync(path.join(pathroot,'hubs',group,'index.html')))errors.push('HUB_MISSING:'+group);
 }
 for(const tool of STUDIO_ROUTES){
  const page=path.join(pathroot,'tools',tool.id,'index.html');
  if(!fs.existsSync(page)){errors.push('TOOL_PAGE_MISSING:'+tool.id);continue;}
  const html=fs.readFileSync(page,'utf8');
  errors.push(...checkBuiltRoute(html,tool.id,{production}));
  if(!html.includes(tool.label))errors.push('TOOL_LABEL_MISSING:'+tool.id);
 }
 for(const name of ['about','privacy','terms','contact']){
  if(!fs.existsSync(path.join(pathroot,name,'index.html')))errors.push('DISCLOSURE_MISSING:'+name);
 }
 const robotsFile=path.join(pathroot,'robots.txt');
 if(!fs.existsSync(robotsFile))errors.push('ROBOTS_MISSING');
 else{
  const robots=fs.readFileSync(robotsFile,'utf8');
  if(production){
   for(const agent of ['Googlebot','Bingbot','Mediapartners-Google']){
    if(!evaluateRobots(robots,agent,'/tools/csv-to-jsonl/').allowed)errors.push('ROBOTS_BLOCKS_'+agent);
   }
   for(const agent of ['OAI-SearchBot','PerplexityBot']){
    if(!evaluateRobots(robots,agent,'/tools/csv-to-jsonl/').allowed)warnings.push('OPTIONAL_AI_CRAWLER_BLOCKED:'+agent);
   }
  }else if(evaluateRobots(robots,'Googlebot','/tools/csv-to-jsonl/').allowed)errors.push('LOCAL_EXAMPLE_ROBOTS_NOT_BLOCKED');
 }
 const headerFile=path.join(pathroot,'_headers');
 if(production&&fs.existsSync(headerFile)&&/cross-origin-embedder-policy\s*:\s*require-corp/i.test(fs.readFileSync(headerFile,'utf8')))
  errors.push('MONETIZED_ROUTE_COEP_REQUIRES_BROWSER_AD_REVIEW'); // Conservatively block until route scoping verified.
 const editorial=verifyEditorialDistinctness(JSON.parse(fs.readFileSync(path.join(ROOT,'examples/astro-dominant-studio-v29/src/data/tools.json'),'utf8')));
 errors.push(...editorial.failures);
 const oracle=verifyMutatingRoutes();errors.push(...oracle.failures);
 return {schema:'sense-v29-local-studio-gate',status:errors.length?'FAIL':production?'SOURCE_AND_BUILD_ONLY_NOT_DEPLOYED':'LOCAL_BUILD_ONLY',production,origin,asset_count:asset.assets.length,route_count:STUDIO_ROUTES.length,mutation_oracles_checked:oracle.checked,editorial_route_guidance_checked:editorial.checked,errors,warnings,observed_search_ranking:false,observed_ai_citations:false,observed_adsense_approval:false,observed_revenue:false};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const arg=n=>{const i=process.argv.indexOf(n);return i>=0?process.argv[i+1]:null;};
 try{const report=auditV29({dist:arg('--dist'),origin:arg('--origin'),production:process.argv.includes('--production')});
 console.log(JSON.stringify(report,null,2));if(report.errors.length)process.exitCode=1;}
 catch(e){console.error('STUDIO_V29_HOLD:'+e.message);process.exitCode=2;}
}
