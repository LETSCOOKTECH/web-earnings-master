#!/usr/bin/env node
/**
 * Sense Evidence Firewall v12: a fail-closed release decision evaluator.
 *
 * Key invariant: no JSON value can certify Google indexing, publisher
 * acceptance, traffic, consent, or a real browser run. Local artifact hashes
 * establish file integrity ONLY; they do not establish semantic correctness.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';

export const GATES=Object.freeze({
 task_output:'LOCAL',
 html_search:'LOCAL',
 crawler_rules:'LOCAL',
 privacy_security:'LOCAL',
 browser_output:'BROWSER',
 accessibility_mobile:'BROWSER',
 deployed_http:'EXTERNAL',
 owner_search_console:'OWNER_ACCOUNT',
 publisher_approval:'OWNER_ACCOUNT',
 real_human_tasks:'EXTERNAL',
 revenue_reconciled:'OWNER_ACCOUNT'
});
export const EXTERNAL_GATES=new Set(['deployed_http','owner_search_console','publisher_approval','real_human_tasks','revenue_reconciled']);
const statuses=new Set(['PASS','FAIL','UNKNOWN','NOT_APPLICABLE']);
const sensitive=new Set(['owner_search_console','publisher_approval','real_human_tasks','revenue_reconciled']);
const localGates=new Set(Object.keys(GATES).filter(k=>GATES[k]==='LOCAL'));
const date=s=>typeof s==='string'?Date.parse(s):NaN;
const safeText=s=>typeof s==='string'&&s.trim().length>=8;
const sha256=b=>crypto.createHash('sha256').update(b).digest('hex');
const within=(p,r)=>p===r||p.startsWith(r+path.sep);

export function evaluateRelease(manifest,{root=process.cwd(),now=Date.now()}={}){
 const errors=[],defects=[],unknown=[],verifiedLocal=[],unverified=[],review=[];
 if(!manifest||manifest.schema!=='sense-release-truth-v12'||!Array.isArray(manifest.gates))
  return {valid:false,decision:'INVALID',errors:['Missing V12 release schema/gates'],production_ready:false};
 const declared=new Map();
 const rootReal=fs.realpathSync(path.resolve(root));
 if(!safeText(manifest?.project?.job)||!safeText(manifest?.project?.release_commit))errors.push('Project job and source commit required');
 for(const record of manifest.gates){
  const id=record?.id,status=record?.status;
  if(!(id in GATES)){errors.push('Unknown gate '+String(id));continue}
  if(declared.has(id)){errors.push('Duplicate gate '+id);continue}
  declared.set(id,record);
  if(!statuses.has(status))errors.push(id+': invalid status');
  if(status==='FAIL'){defects.push(id+': '+String(record.reason||'reported failing'));continue}
  if(status==='UNKNOWN'){unknown.push(id+': no validated observation');continue}
  if(status==='NOT_APPLICABLE'){
   if(id!=='publisher_approval'&&id!=='revenue_reconciled')errors.push(id+': not applicable requires explicit custom scope and reviewer; cannot skip critical gate');
   if(!safeText(record.reason))errors.push(id+': explanation required for not-applicable');
   unknown.push(id+': excluded from scoped assessment, not certified');
   continue;
  }
  if(status!=='PASS')continue;
  if(sensitive.has(id)){
   unverified.push(id+': self-declared external/customer/account PASS cannot be independently verified by local file metadata');
   unknown.push(id+': provider-account or genuine-user evidence not verified in this evaluator');
   continue;
  }
  const receipts=record.evidence;
  if(!Array.isArray(receipts)||receipts.length===0){errors.push(id+': PASS needs an evidence artifact');continue}
  let validArtifacts=0;
  for(const ev of receipts){
   const method=ev?.method,stamp=date(ev?.observed_at);
   if(!['LOCAL_ARTIFACT','CI_ARTIFACT','BROWSER_ARTIFACT','LIVE_HTTP_RECORD'].includes(method)){
    errors.push(id+': unsupported receipt method');continue;
   }
   if(!Number.isFinite(stamp)||stamp>now+300000||now-stamp>30*86400000){errors.push(id+': stale/invalid evidence timestamp');continue}
   if(!safeText(ev?.artifact)||!(/^[a-f0-9]{64}$/i.test(String(ev?.sha256||'')))){errors.push(id+': artifact path and SHA-256 required');continue}
   const candidate=path.resolve(rootReal,ev.artifact);
   let real;
   try{real=fs.realpathSync(candidate);}catch{errors.push(id+': missing artifact '+ev.artifact);continue}
   if(!within(real,rootReal)||!fs.statSync(real).isFile()){errors.push(id+': artifact escapes project root or is not file');continue}
   if(fs.statSync(real).size>10_000_000){errors.push(id+': artifact too large for local verifier');continue}
   if(sha256(fs.readFileSync(real))!==ev.sha256.toLowerCase()){errors.push(id+': artifact checksum mismatch '+ev.artifact);continue}
   validArtifacts++;
   if(method==='LOCAL_ARTIFACT'&&GATES[id]!=='LOCAL')unverified.push(id+': local file cannot prove a real browser or public HTTP run');
  }
  if(validArtifacts>0){
   if(localGates.has(id))verifiedLocal.push(id);
   else {
    review.push(id+': artifact integrity checked, original execution/bot/device not independently authenticated');
    unknown.push(id+': external execution semantics require separate CI/browser/operator check');
   }
  }
 }
 for(const id of Object.keys(GATES))if(!declared.has(id)){errors.push('Missing mandatory gate '+id);unknown.push(id+': gate absent')}
 const eligibleLocal=[...localGates].every(id=>verifiedLocal.includes(id));
 let decision='BLOCKED_EXTERNAL';
 if(errors.length)decision='INVALID';
 else if(defects.length)decision='BLOCKED_DEFECTS';
 else if(!eligibleLocal)decision='BLOCKED_LOCAL_EVIDENCE';
 else decision='LOCAL_GATE_REVIEW_ONLY';
 // An offline release manifest is not independently authenticated evidence of
 // accounts, policy, live crawler, real customer or revenue. Never certify production.
 return {valid:errors.length===0,decision,eligible_for_local_review:decision==='LOCAL_GATE_REVIEW_ONLY',
  production_ready:false,indexed:false,publisher_approved:false,financial_outcome_verified:false,
  errors,defects,unknown,verified_local_artifacts:verifiedLocal,unverified_claims:unverified,review,
  disclaimer:'Manifest cannot prove claims; hash only attests local bytes. Agent must execute real tool/browser/HTTP/owner-account verification in appropriate authorized environment.'};
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===path.resolve(process.argv[1])){
 const i=process.argv.indexOf('--file'),arg=i<0?'templates/release-truth-v12.example.json':process.argv[i+1];
 if(!arg){console.error('Missing --file');process.exit(2)}
 try{
  const result=evaluateRelease(JSON.parse(fs.readFileSync(arg,'utf8')),{root:process.cwd()});
  console.log(JSON.stringify(result,null,2));
  if(!result.valid||process.argv.includes('--require-local')&&!result.eligible_for_local_review)process.exitCode=1;
 }catch(e){console.error(e.message);process.exitCode=2}
}
