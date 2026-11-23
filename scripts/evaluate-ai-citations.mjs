#!/usr/bin/env node
// Observed sample citations are NOT provider ranking weights, official engine share or valid ad impressions.
import fs from 'node:fs';import path from 'node:path';import {pathToFileURL} from 'node:url';
const validUrl=s=>{try{return new URL(s).protocol==='https:'}catch{return false}};
export function evaluateAiCitations(data){
 const errors=[],groups=new Map(),seen=new Set();
 const hosts=Array.isArray(data?.target_hosts)?data.target_hosts:[];
 if(hosts.length===0||hosts.some(h=>typeof h!=='string'||h.includes('/')||h.includes(':')))errors.push('Provide exact target hostnames');
 if(!Array.isArray(data?.observations)||!data.observations.length)errors.push('Observed prompt runs required');
 for(const [i,r] of (data?.observations||[]).entries()){
  const loc=i+1;
  if(!r.provider||!r.surface||!r.prompt_id||!r.checked_at||!r.locale)errors.push('Missing provider/surface/prompt/time/locale row '+loc);
  if(!Array.isArray(r.visible_citations))errors.push('visible_citations must be an observed array '+loc);
  if(!Array.isArray(r.retrieved_background))errors.push('retrieved_background must be separate from visible citations '+loc);
  const id=[r.provider,r.surface,r.prompt_id,r.checked_at,r.sample_id??''].join('|');
  if(seen.has(id))errors.push('Duplicate observation id '+id);else seen.add(id);
  for(const u of r.visible_citations||[])if(!validUrl(u))errors.push('Invalid observed citation URL '+loc);
  for(const u of r.retrieved_background||[])if(!validUrl(u))errors.push('Invalid background retrieval URL '+loc);
  const key=[r.provider,r.surface,r.locale].join('|');
  if(!groups.has(key))groups.set(key,{provider:r.provider,surface:r.surface,locale:r.locale,observed_prompt_runs:0,with_visible_citation:0,with_background_retrieval:0,with_brand_mention:0});
  const g=groups.get(key),isOwn=u=>{try{return hosts.includes(new URL(u).hostname)}catch{return false}};
  g.observed_prompt_runs++;
  if((r.visible_citations||[]).some(isOwn))g.with_visible_citation++;
  if((r.retrieved_background||[]).some(isOwn))g.with_background_retrieval++;
  if(r.brand_mentioned===true)g.with_brand_mention++;
 }
 const out=[...groups.values()].map(g=>({...g,sampled_visible_citation_fraction:Number((g.with_visible_citation/g.observed_prompt_runs).toFixed(4))}));
 const obs=data?.owned_referral_measurement;
 if(obs!==undefined&&(!obs||!obs.method||!obs.period||!Number.isSafeInteger(obs.human_sessions)||!Number.isSafeInteger(obs.completed_tasks)||obs.completed_tasks<0||obs.human_sessions<0||obs.completed_tasks>obs.human_sessions))errors.push('Owned referral measurement requires method/period/nonnegative session and task counts');
 return {status:errors.length?'FAIL':'OBSERVATIONAL_ONLY',errors,groups:out,owned_human_referral:obs??'UNKNOWN_NOT_CONNECTED',sample_count:(data?.observations||[]).length,
 warning:'Observed prompt samples are nonrandom and provider/version/time/locale-dependent. This is NOT search ranking, general model citation market share, attributable publisher revenue or proof of crawler access.'};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 const i=process.argv.indexOf('--file');if(i<0||!process.argv[i+1]){console.error('Usage: node scripts/evaluate-ai-citations.mjs --file <samples.json>');process.exitCode=2;}
 else try{const out=evaluateAiCitations(JSON.parse(fs.readFileSync(process.argv[i+1],'utf8')));console.log(JSON.stringify(out,null,2));if(out.status==='FAIL')process.exitCode=1;}catch(e){console.error(String(e));process.exitCode=2;}
}
