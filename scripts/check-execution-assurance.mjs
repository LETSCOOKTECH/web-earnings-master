import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const isObject=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const nonempty=x=>typeof x==='string'&&x.trim().length>=3;
const iso=(x,now)=>{const n=Date.parse(x||'');return Number.isFinite(n)&&n<=now+60_000&&n>=0};
const url=x=>{try{const u=new URL(x);return u.protocol==='https:'&&!/^(localhost|127\.|0\.|example\.|.*\.example$)/i.test(u.hostname)}catch{return false}};
export const STAGES=['DISCOVERY','VALIDATION','BUILD','RELEASE','ACQUISITION','MEASUREMENT'];
export const STATES=['PASS_LOCAL','PASS_EXTERNAL','BLOCKED','UNKNOWN','FAIL','NOT_APPLICABLE'];
export function assessExecution(run,registry,{now=Date.now()}={}){
 const errors=[],warnings=[],blockers=[];
 if(!isObject(run))return {valid:false,decision:'REJECT',errors:['Run is not an object'],warnings,blockers};
 if(!nonempty(run.task_id)||!nonempty(run.objective)||!nonempty(run.acceptance_criterion))errors.push('Missing task, objective or measurable acceptance');
 if(!STAGES.includes(run.stage))errors.push('Unknown stage');
 const skills=Array.isArray(registry?.skills)?new Set(registry.skills.map(x=>x.id)):new Set();
 if(!Array.isArray(run.selected_skills)||run.selected_skills.length===0||run.selected_skills.length>8)errors.push('Select 1-8 focused skills');
 else {if(new Set(run.selected_skills).size!==run.selected_skills.length)errors.push('Duplicate skills');for(const skill of run.selected_skills)if(!skills.has(skill))errors.push('Unregistered skill: '+skill)}
 const b=run.budget;
 if(!isObject(b)||!['max_sources','max_actions','max_tokens','max_cash_usd','spent_sources','spent_actions','spent_tokens','spent_cash_usd'].every(k=>Number.isFinite(b[k])&&b[k]>=0))errors.push('Missing/invalid bounded research budget');
 else for(const [spent,max] of [['spent_sources','max_sources'],['spent_actions','max_actions'],['spent_tokens','max_tokens'],['spent_cash_usd','max_cash_usd']])if(b[spent]>b[max])blockers.push('Budget exceeded: '+spent);
 if(!Array.isArray(run.evidence))errors.push('Evidence must be an array');
 const evidence=Array.isArray(run.evidence)?run.evidence:[];
 const ids=new Set(),originGroups=new Map(),supports=new Set(),contradicts=new Set(),kinds=new Set();
 for(const e of evidence){
  if(!isObject(e)||!nonempty(e.id)||!nonempty(e.claim)||!nonempty(e.original_url)||!nonempty(e.origin_group)){errors.push('Malformed evidence');continue}
  if(ids.has(e.id))errors.push('Duplicate evidence id: '+e.id);ids.add(e.id);
  if(!url(e.original_url))errors.push('Evidence URL must be plausible HTTPS: '+e.id);
  if(!iso(e.observed_at,now))errors.push('Invalid evidence observation timestamp: '+e.id);
  if(!['FIRST_PARTY','DEVELOPER','HUMAN','OWNED_TEST','INDEPENDENT'].includes(e.kind))errors.push('Invalid evidence kind: '+e.id);
  if(!['SUPPORTS','CONTRADICTS','NEUTRAL'].includes(e.direction))errors.push('Invalid evidence direction: '+e.id);
  if(!['ORIGINAL_OPENED','REPRODUCED','ACCOUNT_EXPORT','SEARCH_SNIPPET','UNAVAILABLE'].includes(e.access))errors.push('Invalid evidence access: '+e.id);
  if(!nonempty(e.artifact))errors.push('Missing evidence artifact: '+e.id);
  if(e.access==='SEARCH_SNIPPET'||e.access==='UNAVAILABLE')warnings.push('Evidence not directly verified: '+e.id);
  const group=e.origin_group.trim().toLowerCase();originGroups.set(group,(originGroups.get(group)||0)+1);
  if(e.direction==='SUPPORTS'&&['ORIGINAL_OPENED','REPRODUCED','ACCOUNT_EXPORT'].includes(e.access)&&now-Date.parse(e.observed_at)<=({FIRST_PARTY:86400000,DEVELOPER:30*86400000,HUMAN:90*86400000,OWNED_TEST:7*86400000,INDEPENDENT:30*86400000}[e.kind]??0))supports.add(group);
  if(e.direction==='CONTRADICTS')contradicts.add(group);
  if(e.direction==='SUPPORTS'&&['ORIGINAL_OPENED','REPRODUCED','ACCOUNT_EXPORT'].includes(e.access)&&now-Date.parse(e.observed_at)<=({FIRST_PARTY:86400000,DEVELOPER:30*86400000,HUMAN:90*86400000,OWNED_TEST:7*86400000,INDEPENDENT:30*86400000}[e.kind]??0))kinds.add(e.kind);
  if(e.kind==='HUMAN'&&e.human_identity_verified===true&&e.identity_method!=='CONSENTED_INTERVIEW')errors.push('Unsupported human identity assertion: '+e.id);
  if(e.kind==='FIRST_PARTY'&&e.access==='SEARCH_SNIPPET'&&e.provider_rule_effective===true)blockers.push('Snippet cannot establish effective provider rule: '+e.id);
 }
 if(evidence.some(e=>e?.direction==='CONTRADICTS')&&!nonempty(run.contradiction_resolution))blockers.push('Unresolved contradictory evidence');
 if(run.claims?.includes?.('GUARANTEED_RANKING')||run.claims?.includes?.('GUARANTEED_REVENUE'))blockers.push('Unsupported outcome guarantee');
 if(!isObject(run.review)||!nonempty(run.review.reviewer)||!nonempty(run.review.critical_failure_test)||!nonempty(run.review.alternative_hypothesis))errors.push('Missing adversarial reviewer and falsification');
 else if(run.review.same_actor===true&&!nonempty(run.review.self_review_disclosure))warnings.push('Self-review must be explicitly disclosed');
 if(!Array.isArray(run.gates)||run.gates.length===0)errors.push('No acceptance gates');
 else {const gateIds=new Set();for(const g of run.gates){
  if(!isObject(g)){errors.push('Malformed acceptance gate');continue}
  if(!nonempty(g.id)||!STATES.includes(g.status)||typeof g.required!=='boolean')errors.push('Malformed acceptance gate');
  if(nonempty(g.id)){if(gateIds.has(g.id))errors.push('Duplicate acceptance gate: '+g.id);gateIds.add(g.id)}
  if(typeof g.status==='string'&&g.status.startsWith('PASS')&&(!nonempty(g.artifact)||!nonempty(g.reviewer)))errors.push('Passing gate lacks artifact and reviewer: '+g.id);
  if(g.required&&['FAIL','BLOCKED','UNKNOWN'].includes(g.status))blockers.push('Mandatory gate unresolved: '+g.id);
  if(g.status==='NOT_APPLICABLE'&&(!nonempty(g.reason)||!nonempty(g.reviewer)))errors.push('Not-applicable gate needs reason and reviewer: '+g.id);
 }}
 if(run.external_action_requested===true)blockers.push('External action not authorized by receipt alone; trusted host approval required');
 if(run.decision_requested==='GO_FOR_MVP'&&!['DISCOVERY','VALIDATION'].includes(run.stage))errors.push('MVP decision incompatible with stage');
 if(run.decision_requested==='PRODUCTION_READY'&&!['RELEASE','ACQUISITION','MEASUREMENT'].includes(run.stage))errors.push('Production decision incompatible with stage');
 if(run.stage==='DISCOVERY'||run.stage==='VALIDATION'){
  if(supports.size===0)blockers.push('No independent supporting observation');
  if(!nonempty(run.cheapest_falsification))blockers.push('No cheapest falsification identified');
  if(run.decision_requested==='GO_FOR_MVP'){
   if(!kinds.has('HUMAN'))blockers.push('No directly inspected original human demand evidence');
   if(!kinds.has('OWNED_TEST'))blockers.push('No reproduced product feasibility proof');
   if(!kinds.has('DEVELOPER')&&!kinds.has('FIRST_PARTY'))blockers.push('No original developer or provider evidence');
   if(run.human_signoff!==true)blockers.push('Human signoff required for MVP GO');
  }
 }
 if(['RELEASE','ACQUISITION','MEASUREMENT'].includes(run.stage)&&run.decision_requested==='PRODUCTION_READY'){
  for(const k of ['OWNED_TEST','FIRST_PARTY'])if(!kinds.has(k))blockers.push('Missing independently inspected '+k+' evidence');
  if(run.human_signoff!==true)blockers.push('Human signoff required before production');
  if(!run.gates?.some?.(g=>g?.status==='PASS_EXTERNAL'))blockers.push('Missing external property verification');
 }
 if(run.review?.same_actor===true&&!nonempty(run.review.self_review_disclosure))blockers.push('Self-review cannot be disguised as independent verification');
 return {valid:errors.length===0,decision:errors.length?'REJECT':blockers.length?'BLOCKED':'ELIGIBLE_FOR_REVIEW',errors,warnings,blockers,independent_origins:originGroups.size,independent_supports:supports.size,independent_contradictions:contradicts.size,verified_kinds:[...kinds]};
}
export function verifyLocalArtifacts(run,{artifactRoot=ROOT,maxBytes=50*1024*1024}={}){
 const errors=[];
 const root=fs.realpathSync(path.resolve(artifactRoot));
 const candidates=[];
 for(const e of Array.isArray(run?.evidence)?run.evidence:[])if(e&&e.artifact)candidates.push({id:e.id,artifact:e.artifact,sha256:e.sha256});
 for(const g of Array.isArray(run?.gates)?run.gates:[])if(g&&g.status?.startsWith?.('PASS')&&g.artifact)candidates.push({id:g.id,artifact:g.artifact,sha256:g.sha256});
 for(const item of candidates){
  const id=item.id||'UNKNOWN';
  const p=item.artifact;
  if(typeof p!=='string'||p.length<3||path.isAbsolute(p)||p.includes('\\0')){errors.push(id+': invalid relative artifact path');continue}
  let full=path.resolve(root,p);
  if(!(full.startsWith(root+path.sep))){errors.push(id+': artifact escapes approved root');continue}
  let actual;
  try{actual=fs.realpathSync(full)}catch{errors.push(id+': missing artifact');continue}
  if(!actual.startsWith(root+path.sep)){errors.push(id+': symlink escapes approved root');continue}
  let stat;try{stat=fs.statSync(actual)}catch{errors.push(id+': unreadable artifact');continue}
  if(!stat.isFile()||stat.size===0||stat.size>maxBytes){errors.push(id+': empty, non-file or oversized artifact');continue}
  if(typeof item.sha256!=='string'||!/^[a-f0-9]{64}$/i.test(item.sha256)){errors.push(id+': SHA-256 required for strict proof');continue}
  const found=createHash('sha256').update(fs.readFileSync(actual)).digest('hex');
  if(found!==item.sha256.toLowerCase())errors.push(id+': artifact SHA-256 mismatch');
 }
 if(!candidates.length)errors.push('No inspectable local evidence artifacts supplied');
 return errors;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const i=process.argv.indexOf('--file');if(i<0||!process.argv[i+1]){console.error('Usage: node scripts/check-execution-assurance.mjs --file receipt.json');process.exit(2)}
 try{const reg=JSON.parse(fs.readFileSync(path.join(ROOT,'sources/production_skills_v7.json'),'utf8'));const data=JSON.parse(fs.readFileSync(path.resolve(process.argv[i+1]),'utf8'));const result=assessExecution(data,reg);if(process.argv.includes('--verify-artifacts')||['GO_FOR_MVP','PRODUCTION_READY'].includes(data.decision_requested)){const i=process.argv.indexOf('--artifact-root');const artifactRoot=i>=0?process.argv[i+1]:ROOT;result.artifact_errors=verifyLocalArtifacts(data,{artifactRoot});if(result.artifact_errors.length){if(result.valid)result.decision='BLOCKED';result.blockers.push(...result.artifact_errors)}}console.log(JSON.stringify(result,null,2));if(!result.valid||result.decision==='BLOCKED')process.exitCode=1}catch(e){console.error('Invalid assurance receipt: '+e.message);process.exitCode=1}
}
