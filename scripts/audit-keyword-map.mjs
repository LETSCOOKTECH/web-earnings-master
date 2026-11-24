import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// Intent and keyword research evidence structure only.
// Never claims real Google searches, organic ranking, AdSense earnings or human customers.
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const STATES=new Set(['HYPOTHESIS_NOT_MEASURED','LICENSED_ESTIMATE','VERIFIED_OWNER_GSC','ORIGINAL_PUBLIC_USER_JOB','UNKNOWN']);
const isText=(s,n=3)=>typeof s==='string'&&s.trim().length>=n;
const route=(p)=>typeof p==='string'&&/^\/(?:[a-z0-9_-]+\/)*$/.test(p);
const domain=(u)=>{try{const x=new URL(u);return x.protocol==='https:'&&!x.username&&!x.password&&x.pathname==='/'&&!x.search&&!x.hash;}catch{return false;}};
export function auditKeywordMap(map,{requireMeasured=false}={}){
 const errors=[],warnings=[],unknown=[];
 if(map?.schema!=='seo-v11-page-brief'||!Array.isArray(map?.pages))return {valid:false,errors:['Invalid keyword/page map schema'],warnings,unknown};
 if(!domain(map.site_origin))errors.push('HTTPS origin required');
 if(!map.pages.length)errors.push('At least one page required');
 const paths=new Set(),jobs=new Set(),canonical=new Set(),queries=new Map();
 for(const p of map.pages){
  if(!route(p?.path))errors.push('Invalid canonical route '+String(p?.path));
  if(paths.has(p.path))errors.push('Duplicate canonical route '+p.path);paths.add(p.path);
  if(!isText(p.primary_user_job,15))errors.push('Missing specific human job '+p.path);
  const job=String(p.primary_user_job||'').trim().toLowerCase();
  if(jobs.has(job))errors.push('Duplicate user job; avoid doorway pages: '+job);jobs.add(job);
  if(!isText(p.query_hypothesis,4))errors.push('Missing human search query for '+p.path);
  if(!STATES.has(p.keyword_evidence_type))errors.push('Unsupported source evidence status '+p.path);
  if(p.keyword_evidence_type==='HYPOTHESIS_NOT_MEASURED'||p.keyword_evidence_type==='UNKNOWN')unknown.push('Demand not measured for '+p.path);
  if(['LICENSED_ESTIMATE','VERIFIED_OWNER_GSC','ORIGINAL_PUBLIC_USER_JOB'].includes(p.keyword_evidence_type)){
   if(!p.evidence?.source_url||!p.evidence?.observed_at||!p.evidence?.access_mode||!p.evidence?.geo||!p.evidence?.measurement_unit)
    unknown.push('Measured/observed source fields incomplete for '+p.path);
   else unknown.push('Source self-declared only; external original/body and account access not verified for '+p.path);
  }
  if(p.canonical!==(map.site_origin.endsWith('/')?map.site_origin.slice(0,-1):map.site_origin)+p.path)
   errors.push('Canonical differs from route '+p.path);
  const query=String(p.query_hypothesis||'').toLowerCase().trim();
  if(queries.has(query)&&queries.get(query)!==job)warnings.push('Same query assigned to distinct jobs; inspect SERP intent '+query);
  queries.set(query,job);
  if(p.keyword_density_target!==undefined||p.meta_keywords!==undefined||p.google_rank_guarantee===true)
   errors.push('Fabricated Google keyword/rank rule '+p.path);
  if(p.indexable===true&&p.path.startsWith('/tools/')&&!isText(p.output_test_ref,5))
   errors.push('Working tool output fixture required '+p.path);
  if(p.estimated_monthly_searches!==undefined&&p.keyword_evidence_type==='HYPOTHESIS_NOT_MEASURED')
   errors.push('Estimated search volume cannot be attached to unmeasured hypothesis '+p.path);
 }
 if(requireMeasured&&unknown.length)errors.push('Demand not independently verified; do not claim measured Google opportunity');
 return {valid:!errors.length,errors,warnings,unknown,checked_pages:map.pages.length,
  status:errors.length?'FAIL':unknown.length?'UNKNOWN_EXTERNAL':'EVIDENCE_DECLARED_NOT_INDEPENDENTLY_VERIFIED',
  disclaimer:'Structural keyword-to-user-job map only; no independent keyword volume, SERP, indexing, ranking, publisher approval or revenue verified.'};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const ix=process.argv.indexOf('--file');
 const name=ix<0?path.join(ROOT,'templates/seo-v11-page-map.example.json'):process.argv[ix+1];
 try{
  if(!name)throw Error('Missing file after --file');
  const v=auditKeywordMap(JSON.parse(fs.readFileSync(name,'utf8')),{requireMeasured:process.argv.includes('--require-measured')});
  console.log(JSON.stringify(v,null,2));
  if(!v.valid)process.exitCode=1;
 }catch(e){console.error(e.message);process.exitCode=2;}
}
