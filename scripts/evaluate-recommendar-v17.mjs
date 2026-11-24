#!/usr/bin/env node
/**
 * Dominant Recommendar v17: fail-closed pre-registered AI recommendation panels.
 *
 * It checks an operator's data structure and denominator integrity ONLY.
 * It never executes an external AI provider, checks an owner account, proves that
 * text/artifacts are authentic, or certifies #1 ranking, citations or revenue.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const SURFACES = Object.freeze([
 'google-ai-overviews','google-ai-mode','openai-chatgpt-search',
 'perplexity-search','bing-copilot','bing-ai-summaries','claude-web-search',
 'google-gemini-app','openai-deep-research','brave-ai-answer',
 'duckduckgo-search-assist','yandex-alice','naver-ai','baidu-ernie',
 'meta-ai','grok-search','you-com'
]);
const SURFACE_SET=new Set(SURFACES);
const INTENTS=new Set(['HOW_TO','COMPARISON','BEST_FOR','ALTERNATIVES','LOCAL','PRODUCT','TROUBLESHOOT','RESEARCH']);
const CAPTURES=new Set(['HUMAN_UI_CAPTURE','AUTHORIZED_PROVIDER_API']);
const isObj=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const str=(x,n=1)=>typeof x==='string'&&x.trim().length>=n&&x.length<=20000;
const unique=x=>new Set(x).size===x.length;
const date=x=>typeof x==='string'&&/^\d{4}-\d{2}-\d{2}T/.test(x)&&Number.isFinite(Date.parse(x));
const host=x=>{
 if(!str(x,4)||x.length>253||!/^(?:[a-z0-9-]+\.)+[a-z]{2,}$/i.test(x)||/(?:^|\.)(?:localhost|example|invalid|test)$/.test(x))return false;
 return !x.split('.').some(s=>s.startsWith('-')||s.endsWith('-')||s.length>63);
};
const validUrl=x=>{try{const u=new URL(x);return u.protocol==='https:'&&!u.username&&!u.password&&!u.port&&host(u.hostname);}catch{return false}};
const urlHost=x=>{try{return new URL(x).hostname.toLowerCase()}catch{return null}};
const compact=x=>String(x||'').replace(/\s+/g,' ').trim().toLocaleLowerCase('en');
function mark(s,msg){s.push(msg)}
export function wilson(success,total,z=1.96){
 if(!Number.isSafeInteger(total)||total<0||!Number.isSafeInteger(success)||success<0||success>total||total===0)return null;
 const p=success/total,t=z*z,denom=1+t/total,center=(p+t/(2*total))/denom,margin=z*Math.sqrt(p*(1-p)/total+t/(4*total*total))/denom;
 return {lower:+Math.max(0,center-margin).toFixed(4),upper:+Math.min(1,center+margin).toFixed(4),
  note:'Illustrative Wilson interval for the preregistered sample only; selection bias and provider drift are NOT removed'};
}
export function evaluateRecommendar(data,{now=Date.now()}={}){
 const errors=[],warnings=[],unknown=[
  'Provider output, UI screenshot/API provenance, reviewer classification, real index state and actual competitor identity have not been independently authenticated',
  'No model ranking weights, market-wide first position, Search Console property, genuine referral, AdSense income or revenue verified'
 ];
 if(!isObj(data)||data.schema!=='sense-dominant-recommendar-v17')
  return {status:'INVALID',errors:['Missing exact sense-dominant-recommendar-v17 schema'],warnings,unknown,production_rank_verified:false};
 const study=data.study||{},target=data.target||{},questions=data.questions,groups=study.expected_groups,repeats=study.repeat_ids,obs=data.observations;
 if(!date(study.preregistered_at)||Date.parse(study.preregistered_at)>now+300000)mark(errors,'Study must be preregistered in the past');
 if(study.panel_method!=='HUMAN_TASK_SAMPLED'&&study.panel_method!=='DOCUMENTED_USER_QUESTIONS')mark(errors,'Pre-registered panel must originate in human tasks, not keyword fanout manufactured as human demand');
 if(!str(target.entity_id,3)||!str(target.brand,2))mark(errors,'Target identity and brand required');
 if(!Array.isArray(target.hosts)||!target.hosts.length||!unique(target.hosts)||target.hosts.some(x=>!host(x)||x!==x.toLowerCase()))mark(errors,'Exact distinct public target hosts required');
 if(!Array.isArray(target.competitors)||target.competitors.length<2||!unique(target.competitors.map(x=>x?.entity_id))||target.competitors.some(x=>!str(x?.entity_id,3)||!str(x?.brand,2)))mark(errors,'At least two distinct real competitor IDs and brands required; no invented competitors');
 const entityMap=new Map();
 if(str(target.entity_id,3)&&str(target.brand,2))entityMap.set(target.entity_id,target.brand);
 for(const c of Array.isArray(target.competitors)?target.competitors:[]){
  if(entityMap.has(c.entity_id))mark(errors,'Target and competing entity IDs must be distinct');
  else if(str(c.entity_id,3)&&str(c.brand,2))entityMap.set(c.entity_id,c.brand);
 }
 if(!Array.isArray(questions)||!questions.length||questions.length>250||!unique(questions.map(x=>x?.id)))mark(errors,'One to 250 distinct preregistered human questions required');
 const questionMap=new Map();
 for(const q of Array.isArray(questions)?questions:[]){
  if(!str(q?.id,2)||!str(q?.text,12)||!INTENTS.has(q?.intent)||typeof q?.branded!=='boolean'||!str(q?.locale,4)||!str(q?.geo,2)||!str(q?.segment,3))
   mark(errors,'Question must have id, exact prompt, intent, branded flag, locale, region and audience segment');
  if(str(q?.id,2))questionMap.set(q.id,q);
 }
 if(!Array.isArray(groups)||!groups.length||groups.length>25||!unique(groups.map(x=>JSON.stringify([x?.surface,x?.locale]))))mark(errors,'Distinct expected surface+locale cohorts required');
 const groupMap=new Map();
 for(const g of Array.isArray(groups)?groups:[]){
  if(!SURFACE_SET.has(g?.surface)||!str(g?.locale,4)||!str(g?.product_version,2))mark(errors,'Expected provider surface/locale/version invalid');
  if(SURFACE_SET.has(g?.surface)&&str(g?.locale,4))groupMap.set(JSON.stringify([g.surface,g.locale]),g);
 }
 if(!Array.isArray(repeats)||!repeats.length||repeats.length>20||repeats.some(x=>!str(x,1))||!unique(repeats))mark(errors,'Distinct pre-registered repeat IDs required');
 if(!Array.isArray(obs)||!obs.length||obs.length>100000)mark(errors,'Nonempty bounded observation array required');
 if(!Number.isFinite(now))mark(errors,'Evaluation clock invalid');
 const keys=new Set(),counts=new Map();
 const groupExpected=Array.isArray(groups)?groups:[];
 for(const g of groupExpected){
  if(!SURFACE_SET.has(g?.surface)||!str(g?.locale,4))continue;
  counts.set(JSON.stringify([g.surface,g.locale]),{
   surface:g.surface,locale:g.locale,attempted:0,observed:0,unavailable:0,
   unbranded_attempted:0,unbranded_recommended:0,unbranded_visible_citation:0,
   unbranded_brand_mentions_only:0,unbranded_ranked_comparisons:0,
   unbranded_explicit_first:0,unbranded_disrecommended:0,
   validity:'UNAUTHENTICATED_OPERATOR_LABELS'
  });
 }
 for(const [i,r] of (Array.isArray(obs)?obs:[]).entries()){
  const n=i+1,gKey=JSON.stringify([r?.surface,r?.locale]),question=questionMap.get(r?.question_id),group=groupMap.get(gKey);
  const repeat=r?.repeat_id,key=JSON.stringify([r?.surface,r?.locale,r?.question_id,repeat]);
  if(keys.has(key))mark(errors,'Duplicate attempt inflates denominator at row '+n);
  keys.add(key);
  if(!group)mark(errors,'Unregistered surface/locale cohort '+n);
  if(!question)mark(errors,'Unregistered question '+n);
  if(!Array.isArray(repeats)||!repeats.includes(repeat))mark(errors,'Unregistered repeat '+n);
  if(question&&r.locale!==question.locale)mark(errors,'Prompt locale differs from provider locale '+n);
  if(!date(r?.observed_at)||Date.parse(r.observed_at)<Date.parse(study.preregistered_at)||Date.parse(r.observed_at)>now+300000)
   mark(errors,'Invalid/out-of-order observed timestamp '+n);
  if(!['OBSERVED','UNAVAILABLE'].includes(r?.status))mark(errors,'Invalid observation status '+n);
  for(const forbidden of ['rank_one','global_rank','rank_one_probability','revenue','referrals','ai_market_share','impressions','indexed','authenticated'])
   if(Object.hasOwn(r||{},forbidden))mark(errors,'Outcome claim cannot be self-certified in observations: '+forbidden+' '+n);
  const stats=counts.get(gKey);
  if(stats)stats.attempted++;
  if(stats&&question&&!question.branded)stats.unbranded_attempted++;
  if(r?.status==='UNAVAILABLE'){
   if(stats)stats.unavailable++;
   if(!str(r?.unavailable_reason,8)||r?.answer!==undefined||r?.capture!==undefined)mark(errors,'Unavailable attempt must state cause and contain no fabricated answer '+n);
   continue;
  }
  if(r?.status!=='OBSERVED')continue;
  if(stats)stats.observed++;
  if(!isObj(r.capture)||!CAPTURES.has(r.capture.method)||!str(r.capture.artifact,8)||!str(r.capture.reviewer,2)||!str(r.capture.product_version,2))
   mark(errors,'Observed row needs named reviewer, version, permitted capture mode and artifact locator '+n);
  if(!isObj(r.answer)||!str(r.answer.raw_excerpt,15)||typeof r.answer.explicit_ranked!=='boolean'||!Array.isArray(r.answer.recommendations)||!Array.isArray(r.answer.visible_citations)||!Array.isArray(r.answer.mentions))
   {mark(errors,'Observed row requires raw answer excerpt, ranking state and separate recommendation/citation/mention arrays '+n);continue;}
  const answer=r.answer,rec=answer.recommendations;
  if(rec.length>50||answer.mentions.length>50||answer.visible_citations.length>100)mark(errors,'Unbounded result classification '+n);
  let rankCorrect=true;
  const seenEntities=new Set(),seenRanks=new Set();
  for(const item of rec){
   if(!entityMap.has(item?.entity_id))mark(errors,'Unknown recommendation entity '+n);
   if(seenEntities.has(item?.entity_id))mark(errors,'Duplicate recommended entity '+n);
   seenEntities.add(item?.entity_id);
   if(!['POSITIVE','NEGATIVE'].includes(item?.sentiment))mark(errors,'Recommendation sentiment missing '+n);
   if(!str(item?.evidence_quote,10)||!compact(answer.raw_excerpt).includes(compact(item.evidence_quote))||
    (entityMap.has(item?.entity_id)&&!compact(item.evidence_quote).includes(compact(entityMap.get(item.entity_id)))))
    mark(errors,'Evidence quote must literally appear in captured answer and identify the entity '+n);
   if(answer.explicit_ranked){
    if(!Number.isInteger(item?.rank)||item.rank<1||item.rank>rec.length||seenRanks.has(item.rank))rankCorrect=false;
    seenRanks.add(item.rank);
   }else if(item?.rank!==null)mark(errors,'Unordered response must not pretend to have a numeric rank '+n);
  }
  if(answer.explicit_ranked&&(rec.length<2||!rankCorrect||seenRanks.size!==rec.length))mark(errors,'Explicit #1 requires real ordered competitive list with contiguous ranks and at least two entities '+n);
  for(const m of answer.mentions){
   if(!entityMap.has(m))mark(errors,'Unknown entity in mentions array '+n);
   if(entityMap.has(m)&&!compact(answer.raw_excerpt).includes(compact(entityMap.get(m))))mark(errors,'Mentioned entity absent from captured answer '+n);
  }
  for(const u of answer.visible_citations)if(!validUrl(u))mark(errors,'Invalid citation URL '+n);
  const own=(answer.visible_citations||[]).some(u=>(target.hosts||[]).includes(urlHost(u)));
  const targetRec=rec.find(x=>x.entity_id===target.entity_id);
  if(stats&&question&&!question.branded){
   if(targetRec?.sentiment==='POSITIVE')stats.unbranded_recommended++;
   if(targetRec?.sentiment==='NEGATIVE')stats.unbranded_disrecommended++;
   if(own)stats.unbranded_visible_citation++;
   if(!targetRec&&answer.mentions.includes(target.entity_id))stats.unbranded_brand_mentions_only++;
   if(answer.explicit_ranked){stats.unbranded_ranked_comparisons++;
    if(targetRec?.sentiment==='POSITIVE'&&targetRec.rank===1)stats.unbranded_explicit_first++;
   }
  }
 }
 if(Array.isArray(groups)&&Array.isArray(questions)&&Array.isArray(repeats)){
  const expected=groups.length*questions.filter(q=>groupMap.has(JSON.stringify([groups[0]?.surface,q.locale]))||groups.some(g=>g.locale===q.locale)).length*repeats.length;
  if(expected>100000)mark(errors,'Panel exceeds 100,000 attempt guard; split into bounded studies');
  for(const g of groups)for(const q of questions.filter(q=>q.locale===g.locale))for(const rp of repeats){
   if(!keys.has(JSON.stringify([g.surface,g.locale,q.id,rp])))mark(errors,'Missing preregistered attempt '+g.surface+'/'+g.locale+'/'+q.id+'/'+rp);
  }
  for(const q of questions)if(!groups.some(g=>g.locale===q.locale))mark(errors,'No provider cohort for registered question locale '+q.id);
  for(const g of groups)if(!questions.some(q=>q.locale===g.locale))mark(errors,'No registered questions for provider locale '+g.surface+'/'+g.locale);
 }
 const out=[...counts.values()].map(g=>({...g,
  sampled_unbranded_recommendation_rate:g.unbranded_attempted?+(g.unbranded_recommended/g.unbranded_attempted).toFixed(4):null,
  sampled_unbranded_citation_rate:g.unbranded_attempted?+(g.unbranded_visible_citation/g.unbranded_attempted).toFixed(4):null,
  sampled_explicit_first_rate:g.unbranded_ranked_comparisons?+(g.unbranded_explicit_first/g.unbranded_ranked_comparisons).toFixed(4):null,
  recommendation_interval:g.unbranded_attempted>=5?wilson(g.unbranded_recommended,g.unbranded_attempted):null,
  denominator:'All preregistered unbranded attempted runs including UNAVAILABLE; #1 denominator only explicit ordered competitive replies'
 }));
 if(out.some(x=>x.unbranded_attempted<10))warnings.push('Small or biased unbranded panel: no universal recommendation probability can be inferred');
 if(out.some(x=>x.unbranded_ranked_comparisons<3))warnings.push('Too few explicitly ranked comparative answers; no reliable #1 claim');
 if(!out.some(x=>x.unbranded_attempted))warnings.push('No unbranded human-task opportunities measured: brand-prompted mentions do not prove recommendations');
 return {
  status:errors.length?'FAIL':'STRUCTURAL_ONLY_EXTERNAL_UNVERIFIED',errors,warnings,unknown,
  groups:out,counts:{questions:Array.isArray(questions)?questions.length:0,expected_cohorts:groupExpected.length,
   expected_repeats:Array.isArray(repeats)?repeats.length:0,attempts:Array.isArray(obs)?obs.length:0},
  local_manifest_verified:errors.length===0,provider_output_authenticated:false,
  production_rank_verified:false,global_rank_one_verified:false,google_indexed_verified:false,
  human_referrals_verified:false,real_revenue_verified:false,
  disclaimer:'The evidence classifier uses operator-authored captures and labels. Passing does not authenticate actual AI answers, recommendation truth, external rank, impressions or earnings.'
 };
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const i=process.argv.indexOf('--file'),f=i===-1?null:process.argv[i+1];
 if(!f){console.error('Usage: node scripts/evaluate-recommendar-v17.mjs --file templates/dominant-recommendar/SYNTHETIC-panel.json');process.exit(2);}
 try{const out=evaluateRecommendar(JSON.parse(fs.readFileSync(f,'utf8')));
 console.log(JSON.stringify(out,null,2));if(out.status==='FAIL'||out.status==='INVALID')process.exitCode=1;
 }catch(e){console.error(String(e?.message||e));process.exitCode=2;}
}
