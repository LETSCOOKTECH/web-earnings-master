#!/usr/bin/env node
// Provider-specific AI Search surface metadata check: links/docs and timeline, never runtime owner proof.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const HOSTS=new Set(['developers.google.com','developers.openai.com','support.claude.com','blogs.bing.com','docs.perplexity.ai','web.dev']);
const MODES=new Set(['SEARCH_INDEX','OWNER_CONTROL','OWNER_REPORT','SEARCH_CRAWLER','USER_FETCH','TRAINING_CRAWLER','AGENT_BROWSER','FUTURE_CONTROL']);
const STATES=new Set(['ORIGINAL_BODY_OPENED','SEARCH_RESULT_ONLY','REFERENCE_LEAD']);
const IDS=new Set(['google-ai-overviews','google-ai-mode','google-generative-control','google-gsc-ai-report','google-multimodal-report',
'openai-chatgpt-search','openai-chatgpt-user','openai-gptbot','bing-ai-performance','bing-ai-intents','bing-ai-topics',
'claude-search','claude-user','claude-training','claude-cloud-browser','perplexity-search','agent-browser-access','google-training-2027']);
const DOCS=['README.md','01-provider-crawlers-controls.md','02-answer-quality.md','03-geo-measurement.md','04-agent-task-reliability.md','05-agent-execution.md','06-evaluation-research-playbook.md'];
export function checkAiSurfaceAtlas(atlas,{hasFile=()=>true}={}){
 const errors=[],surfaces=atlas?.surfaces;
 if(atlas?.schema!=='sense-ai-search-v14-surface-atlas'||!Array.isArray(surfaces)||surfaces.length<19)
  return {valid:false,errors:['Missing V14 provider surface atlas of 19 entries'],status:'FAIL'};
 const seen=new Set(),modes=new Set();
 for(const s of surfaces){
  if(typeof s?.id!=='string'||seen.has(s.id))errors.push('Invalid/duplicate provider surface '+String(s?.id));
  seen.add(s.id);modes.add(s.mode);
  if(!MODES.has(s.mode))errors.push('Unsupported provider surface mode '+s.id);
  if(!STATES.has(s.source_status)||s.official_semantics_not_independently_certified!==true)
   errors.push('Provider source status overclaimed '+s.id);
  let u;try{u=new URL(s.source_url)}catch{errors.push('Invalid first-party original URL '+s.id);continue}
  if(u.protocol!=='https:'||!HOSTS.has(u.hostname)||u.username||u.password)errors.push('Invalid/unknown first-party host '+s.id);
  if(!s.policy_summary||s.policy_summary.length<30||!s.owner_external_evidence_needed||s.owner_external_evidence_needed.length<12)
   errors.push('Missing documented scope or owner observation '+s.id);
 }
 for(const id of IDS)if(!seen.has(id))errors.push('Required current AI Search product surface absent '+id);
 for(const m of MODES)if(!modes.has(m))errors.push('Missing AI crawler/product mode '+m);
 if(surfaces.find(s=>s.id==='google-gsc-ai-report')?.source_status!=='ORIGINAL_BODY_OPENED')
  errors.push('Dedicated June 2026 Google GenAI report source was originally opened');
 if(surfaces.find(s=>s.id==='google-training-2027')?.mode!=='FUTURE_CONTROL')
  errors.push('Announced early-2027 training signal cannot be current search setting');
 // Do not reject a newly verified first-party original: source status must advance after review.
 // The registry is still self-reported metadata; a source status never certifies citations.
 for(const p of DOCS)if(!hasFile('docs/ai-search/'+p))errors.push('Required professional guide missing '+p);
 return {valid:!errors.length,status:errors.length?'FAIL':'PROVIDER_ATLAS_METADATA_ONLY',errors,count:surfaces.length,modes:[...modes].sort(),
  source_bodies_and_owner_settings_currently_verified:false,ai_citation_outcome_verified:false,
  disclaimer:'Metadata and guide existence only. Source snapshot is not current policy certification, live bot verification, indexed state, AI citation or real referrals.'};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
 try{const atlas=JSON.parse(fs.readFileSync(path.join(root,'sources/ai_search_v14_surface_atlas.json'),'utf8'));
 const result=checkAiSurfaceAtlas(atlas,{hasFile:p=>fs.existsSync(path.join(root,p))});
 console.log(JSON.stringify(result,null,2));if(!result.valid)process.exitCode=1;
 }catch(e){console.error(String(e?.message||e));process.exitCode=2}
}
