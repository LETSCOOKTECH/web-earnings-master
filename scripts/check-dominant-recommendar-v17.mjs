#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {SURFACES} from './evaluate-recommendar-v17.mjs';
const official={
 Google:new Set(['developers.google.com']),OpenAI:new Set(['developers.openai.com','help.openai.com']),
 Perplexity:new Set(['docs.perplexity.ai']),Microsoft:new Set(['blogs.bing.com']),
 Anthropic:new Set(['support.claude.com'])
};
export function checkRecommendarRegistry(data){
 const errors=[],warnings=[];
 if(data?.schema!=='sense-recommendar-v17-official-sources'||!Array.isArray(data?.sources)||!Array.isArray(data?.providers))
  return {status:'FAIL',errors:['Missing recommendation source atlas schema'],warnings};
 const ids=new Set();
 for(const x of data.sources){
  if(!x?.id||ids.has(x.id))errors.push('Duplicate/missing source ID');ids.add(x.id);
  if(!official[x.provider]){errors.push('No official primary-source provider allowlist '+x.provider);continue;}
  let url;try{url=new URL(x.url)}catch{errors.push('Bad source URL '+x.id);continue}
  if(url.protocol!=='https:'||!official[x.provider].has(url.hostname)||url.username||url.password||url.port)
   errors.push('First-party original URL host invalid '+x.id);
  if(x.original_opened!==true||!Number.isFinite(Date.parse(x.reviewed_at_utc))||Date.parse(x.reviewed_at_utc)>Date.now()+300000||typeof x.claim!=='string'||x.claim.length<40||typeof x.limitation!=='string'||x.limitation.length<30)
   errors.push('Source claim must be dated, directly opened, scoped and limited '+x.id);
  if(/guaranteed rank|guaranteed #1|secret algorithm|100% inclusion/i.test(x.claim||''))errors.push('Source makes fabricated rank promise '+x.id);
 }
 const seen=new Set();
 for(const p of data.providers){
  if(!SURFACES.includes(p.id)||seen.has(p.id))errors.push('Invalid/duplicate provider surface '+p.id);
  seen.add(p.id);
  if(p.rank_one_formula_known!==false||p.owner_property_authenticated!==false||p.provider_response_authenticated!==false)
   errors.push('Atlas cannot self-certify actual provider output, owner property or #1 algorithm '+p.id);
  if(!['FIRST_PARTY_SCOPE_ONLY','UNVERIFIED_PROVIDER_RECOMMENDATION_MECHANICS'].includes(p.evidence_level))
   errors.push('Invalid source certainty '+p.id);
  if(!Array.isArray(p.documented_originals)||p.documented_originals.some(x=>!ids.has(x)))
   errors.push('Unknown original source reference '+p.id);
  if(p.evidence_level==='FIRST_PARTY_SCOPE_ONLY'&&!p.documented_originals.length)errors.push('Documented claims must cite provider original '+p.id);
  if(p.evidence_level==='UNVERIFIED_PROVIDER_RECOMMENDATION_MECHANICS'&&p.documented_originals.length)warnings.push('Provider has sources but cannot validate ranking mechanism: '+p.id);
 }
 for(const p of SURFACES)if(!seen.has(p))errors.push('Missing provider surface '+p);
 if(data.sources.length<14||data.providers.length!==SURFACES.length)errors.push('Recommendation atlas insufficient coverage');
 return {status:errors.length?'FAIL':'PROVIDER_METADATA_ONLY',errors,warnings,
  listed_surfaces:data.providers.length,opened_originals:data.sources.length,
  exact_ranking_algorithms_verified:false,actual_citations_verified:false,
  source_metadata_not_live_proof:true};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{const root=path.resolve(import.meta.dirname,'..');
 const r=checkRecommendarRegistry(JSON.parse(fs.readFileSync(path.join(root,'sources/dominant_recommendar_v17_sources.json'),'utf8')));
 console.log(JSON.stringify(r,null,2));if(r.status==='FAIL')process.exitCode=1;
 }catch(e){console.error(String(e.message||e));process.exitCode=2;}
}
