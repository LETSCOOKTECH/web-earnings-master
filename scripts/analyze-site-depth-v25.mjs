import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
// Source-limited diagnostics for V24 public HTTP observations, not full site reconstruction.
export function analyzeSiteDepth(report){
 if(report?.schema!=='sense-site-intelligence-v24'||!Array.isArray(report.pages)||!Array.isArray(report.sitemaps))throw Error('V24_SITE_REPORT_REQUIRED');
 if(report.pages.length>500)throw Error('SITE_SAMPLE_TOO_LARGE');
 const findings=[],byTitle=new Map(),sitemap=new Set(report.sitemap_urls||[]);
 const observed=new Map(report.pages.map(p=>[p.url,p]));
 function flag(p,code,classification,detail){
  if(findings.length>=1500)return;
  findings.push({code,page:p?.url||report.origin,classification,detail});
 }
 for(const p of report.pages){
  if(!p?.url)continue;
  if(sitemap.has(p.url)&&p.status!=='HTTP_200')flag(p,'SITEMAP_URL_NON200_OR_BLOCKED','DIRECT_STATUS','Check access and indexability separately');
  if(p.status!=='HTTP_200')continue;
  if(sitemap.has(p.url)&&p.noindex)flag(p,'SITEMAP_NOINDEX','DIRECT_HTTP_HTML','Sitemap links to noindex page');
  if(!p.title)flag(p,'MISSING_TITLE','DIRECT_STATIC_HTML','Inspect original HTML');
  if(!p.h1)flag(p,'MISSING_H1','DIRECT_STATIC_HTML','Inspect initial HTML and browser output');
  if(!p.description)flag(p,'MISSING_DESCRIPTION','DIRECT_STATIC_HTML','Not a guaranteed ranking penalty');
  if(!p.canonical)flag(p,'MISSING_CANONICAL','DIRECT_STATIC_HTML','Verify canonical on published page');
  else try{if(new URL(p.canonical).origin!==report.origin)flag(p,'OTHER_ORIGIN_CANONICAL','DIRECT_HTML','Confirm intentional cross-site canonical')}catch{flag(p,'INVALID_CANONICAL','DIRECT_HTML','Malformed canonical')};
  if(p.title){const key=p.title.trim().toLowerCase();if(byTitle.has(key))flag(p,'SAMPLED_DUPLICATE_TITLE','SAMPLED_HEURISTIC','Same title as '+byTitle.get(key));else byTitle.set(key,p.url);}
  for(const link of p.links||[]){const target=observed.get(link);if(target&&/^HTTP_[45]/.test(target.status))flag(p,'LINKED_SAMPLED_ERROR','DIRECT_HTTP','Observed error at '+link);}
 }
 for(const url of (report.graph?.possible_unlinked_sitemap_pages||[]).slice(0,80))
  flag({url},'POSSIBLY_UNLINKED_SITEMAP_URL','SAMPLED_HEURISTIC','Not a proven orphan; static crawl incomplete');
 if(report.truncated)flag(null,'BUDGET_TRUNCATED','DIRECT_RUN_STATE','Sample is incomplete by declared limits');
 return {schema:'sense-site-depth-v25',origin:report.origin,scope:'SAMPLED_STATIC_HTTP_ONLY',
  observed_pages:report.pages.length,sitemap_urls:sitemap.size,findings,
  unknowns:['True orphan status','Private backend','Search indexing/rank','AI citations','User task success','AdSense/revenue'],
  public_production_verified:false};
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{
  const index=process.argv.indexOf('--file');
  if(index<0||!process.argv[index+1])throw Error('Usage: --file previously-captured-v24-report.json');
  const file=path.resolve(process.argv[index+1]);
  if(fs.statSync(file).size>15_000_000)throw Error('REPORT_EXCEEDS_15MB');
  console.log(JSON.stringify(analyzeSiteDepth(JSON.parse(fs.readFileSync(file,'utf8'))),null,2));
 }catch(e){console.error('SITE_DEPTH_HOLD: '+e.message);process.exitCode=2;}
}
