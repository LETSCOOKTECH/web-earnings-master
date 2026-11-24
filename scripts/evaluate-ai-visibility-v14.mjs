#!/usr/bin/env node
// V14 honest fixed-panel observational AI citations. Never infer Google rank, owner account, clicks or ad money.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const validHost=s=>typeof s==='string'&&s.length>=4&&s.length<=253&&/^(?:[a-z0-9-]+\.)+[a-z]{2,}$/i.test(s)&&!s.startsWith('-')&&!/example\.(?:com|org|net)$/i.test(s);
const absolute=s=>{try{let u=new URL(s);return u.protocol==='https:'&&!u.username&&!u.password&&u.hostname.includes('.');}catch{return false}};
const unique=x=>new Set(x).size===x.length;
const validDate=x=>typeof x==='string'&&Number.isFinite(Date.parse(x))&&/^\d{4}-\d{2}-\d{2}T/.test(x);
const normalizeHost=s=>{try{return new URL(s).hostname.toLowerCase()}catch{return ''}};
const fields=['google-ai-overviews','google-ai-mode','openai-chatgpt-search','bing-ai-performance','claude-search','perplexity-search'];
export function evaluateAiVisibilityV14(data,{now=Date.now()}={}){
 const errors=[],warnings=[],unknown=['Real provider answers, source links, account report availability, human sessions and revenue are not independently authenticated by this manifest audit'];
 if(data?.schema!=='sense-ai-visibility-sample-v14'||!Array.isArray(data?.observations)||!data.observations.length)
  return {status:'FAIL',errors:['V14 schema and at least one fixed-panel observation required'],warnings,unknown};
 const hosts=data?.target_hosts,study=data?.study;
 if(!Array.isArray(hosts)||!hosts.length||hosts.some(h=>!validHost(h))||!unique(hosts))errors.push('Actual distinct public target hostnames required');
 if(!study||!validDate(study.preregistered_at)||!Array.isArray(study.prompt_ids)||!study.prompt_ids.length||!unique(study.prompt_ids))
  errors.push('Fixed dated pre-registered prompt panel required');
 if(study?.panel_method!=='HUMAN_TASK_SAMPLED'&&study?.panel_method!=='DOCUMENTED_USER_QUESTIONS')
  errors.push('Panel sampling must come from real user questions/tasks');
 const rows=new Set(),groups=new Map(),observedPromptIds=new Set(),seenGroupPrompts=new Set();
 for(const [i,r] of data.observations.entries()){
  const loc=i+1;
  if(!fields.includes(r.surface))errors.push('Unknown/incomparable AI product '+loc);
  if(!study?.prompt_ids?.includes(r.prompt_id))errors.push('Prompt run not registered in fixed panel '+loc);
  observedPromptIds.add(r.prompt_id);seenGroupPrompts.add(JSON.stringify([r.surface,r.locale,r.prompt_id]));
  if(typeof r.locale!=='string'||r.locale.length<2||!validDate(r.observed_at))errors.push('Provider locale/observation date missing '+loc);
  if(r.status!=='OBSERVED'&&r.status!=='UNAVAILABLE')errors.push('Observed or unavailable state required '+loc);
  const key=[r.surface,r.locale,r.prompt_id,r.repeat_id??''].join('|');
  if(rows.has(key))errors.push('Duplicate prompt run inflates denominator '+loc);rows.add(key);
  if(validDate(study?.preregistered_at)&&validDate(r.observed_at)&&Date.parse(r.observed_at)<Date.parse(study.preregistered_at))
   errors.push('Prompt result predates preregistered panel '+loc);
  if(validDate(r.observed_at)&&Date.parse(r.observed_at)>now+300000)errors.push('Future-looking observation '+loc);
  if(r.human_referrals!==undefined||r.publisher_revenue!==undefined||r.official_ai_rank!==undefined||r.global_citation_share!==undefined)
   errors.push('AI citation samples must not self-assert referral, earnings or global rank '+loc);
  const gkey=[r.surface,r.locale].join('|');
  if(!groups.has(gkey))groups.set(gkey,{surface:r.surface,locale:r.locale,attempted:0,observed:0,unavailable:0,with_owned_visible_citation:0,with_owned_background_only:0,with_brand_mention_without_citation:0});
  const g=groups.get(gkey);g.attempted++;
  if(r.status==='UNAVAILABLE'){
   g.unavailable++;
   if((r.visible_citations||[]).length||r.brand_mentioned===true)errors.push('Unavailable response cannot have citation/mention '+loc);
   if(typeof r.unavailable_reason!=='string'||r.unavailable_reason.length<5)errors.push('Unavailable run needs evidence-based reason '+loc);
   continue;
  }
  g.observed++;
  if(!['HUMAN_OBSERVED','PERMITTED_API_OUTPUT'].includes(r.capture_mode)||!r.artifact_ref||String(r.artifact_ref).length<8)
   errors.push('Observed answer requires authorized capture mode and actual artifact reference '+loc);
  if(!Array.isArray(r.visible_citations)||!Array.isArray(r.background_retrieval))
   errors.push('Visible citations and background retrieval must be separately declared arrays '+loc);
  for(const u of [...(r.visible_citations||[]),...(r.background_retrieval||[])])
   if(!absolute(u))errors.push('Invalid visible/background source URL '+loc);
  const cited=(r.visible_citations||[]).some(u=>hosts?.includes(normalizeHost(u)));
  const bg=(r.background_retrieval||[]).some(u=>hosts?.includes(normalizeHost(u)));
  if(cited)g.with_owned_visible_citation++;
  else if(bg)g.with_owned_background_only++;
  else if(r.brand_mentioned===true)g.with_brand_mention_without_citation++;
  if((r.visible_citations||[]).some(u=>(r.background_retrieval||[]).includes(u)))
   warnings.push('Same URL in visible and background arrays; verify capture semantics '+loc);
 }
 for(const prompt of study?.prompt_ids||[])if(!observedPromptIds.has(prompt))errors.push('Pre-registered prompt missing from panel '+prompt);
 for(const g of groups.values())for(const prompt of study?.prompt_ids||[]){
  if(!seenGroupPrompts.has(JSON.stringify([g.surface,g.locale,prompt])))
   errors.push('Missing pre-registered prompt '+prompt+' for provider group '+g.surface+' / '+g.locale);
 }
 if(Array.isArray(study?.expected_groups)){
  const expectedKeys=new Set();
  for(const entry of study.expected_groups){
   const k=JSON.stringify([entry?.surface,entry?.locale]);
   if(!fields.includes(entry?.surface)||typeof entry?.locale!=='string'||entry.locale.length<2||expectedKeys.has(k))
    errors.push('Invalid or duplicate expected provider group');
   expectedKeys.add(k);
   if(!groups.has([entry?.surface,entry?.locale].join('|')))
    errors.push('Missing expected provider group '+String(entry?.surface)+' / '+String(entry?.locale));
  }
  for(const g of groups.values())if(!expectedKeys.has(JSON.stringify([g.surface,g.locale])))
   errors.push('Observed provider group was not pre-registered '+g.surface+' / '+g.locale);
 }else warnings.push('Missing pre-registered expected provider/locale groups: entire absent cohorts cannot be detected');
 if(data?.owner_reports!==undefined){
  if(!Array.isArray(data.owner_reports))errors.push('Owner report metrics must be an array');
  else for(const report of data.owner_reports){
   if(!['GOOGLE_GSC_GENERATIVE_AI','BING_WEBMASTER_AI_PERFORMANCE','FIRST_PARTY_REFERRALS','FIRST_PARTY_TASK_SUCCESS'].includes(report?.kind))
    errors.push('Unknown owner report metric kind');
   unknown.push('Owner report '+String(report?.kind)+' is self-reported; account access and units require independent review');
  }
 }
 const out=[...groups.values()].map(g=>({...g,sampled_visible_citation_rate:g.attempted?Number((g.with_owned_visible_citation/g.attempted).toFixed(4)):0,
  observed_only_rate:g.observed?Number((g.with_owned_visible_citation/g.observed).toFixed(4)):null,
  denominator_policy:'attempted prompt runs; unavailable preserved, never discarded'}));
 if(out.some(g=>g.attempted<5))warnings.push('Tiny or biased prompt panel: do not infer stable citation frequency or population share');
 return {status:errors.length?'FAIL':'OBSERVATIONAL_SELF_REPORTED_ONLY',errors,warnings,unknown,groups:out,
  provider_citation_verified:false,owner_report_authenticated:false,human_referral_verified:false,revenue_verified:false,
  disclaimer:'No live provider execution or owner-account authentication. This is a fixed-panel artifact/denominator consistency checker, not SEO, Google AI citation probability or global market share.'};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const i=process.argv.indexOf('--file'),file=i<0?null:process.argv[i+1];
 if(!file){console.error('Usage: node scripts/evaluate-ai-visibility-v14.mjs --file sample.json');process.exit(2)}
 try{const r=evaluateAiVisibilityV14(JSON.parse(fs.readFileSync(file,'utf8')));
 console.log(JSON.stringify(r,null,2));if(r.status==='FAIL')process.exitCode=1;
 }catch(e){console.error(String(e?.message||e));process.exitCode=2}
}
