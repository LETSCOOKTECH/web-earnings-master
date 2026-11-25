#!/usr/bin/env node
// Offline verifier of supplied agent-trial receipts. Never invokes models or authenticates task outcomes.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const statuses=new Set(['PASS','FAIL','NOT_RUN']);
const kinds=new Set(['DOMAIN_TASK','TRIGGER_POSITIVE','TRIGGER_NEGATIVE','ADVERSARIAL']);
const is=s=>typeof s==='string'&&s.trim().length>=3;
export function assessSkillTrials(plan){
 const errors=[],warnings=[];
 if(plan?.schema!=='sense-agent-skill-trials-v26')errors.push('BAD_SCHEMA');
 if(!is(plan?.experiment_id)||!is(plan?.model_id)||!is(plan?.baseline_description)||!is(plan?.candidate_description))
  errors.push('MISSING_PINNED_CONDITIONS');
 const enrolled=plan?.cases;
 if(!Array.isArray(enrolled)||enrolled.length<3||enrolled.length>60)errors.push('REQUIRE_3_TO_60_CASES');
 const ids=new Set(),paired=[];
 if(Array.isArray(enrolled))for(const item of enrolled){
  if(!is(item?.id)||ids.has(item.id))errors.push('DUPLICATE_OR_BAD_CASE_ID');
  ids.add(item?.id);
  if(!kinds.has(item?.kind)||!is(item?.oracle)||!is(item?.task_fixture))errors.push('MISSING_CASE_ORACLE_OR_TYPE');
  for(const label of ['baseline','candidate']){
   const run=item?.[label];
   if(!run||!statuses.has(run.status)){errors.push('UNRECOGNIZED_RUN_STATUS:'+label);continue;}
   if(run.status!=='NOT_RUN'&&(!is(run.artifact)||!Number.isFinite(run.duration_ms)||run.duration_ms<0))
    errors.push('MISSING_RUNTIME_ARTIFACT:'+label);
  }
  if(statuses.has(item?.baseline?.status)&&statuses.has(item?.candidate?.status)&&
     item.baseline.status!=='NOT_RUN'&&item.candidate.status!=='NOT_RUN')paired.push(item);
 }
 if(!enrolled?.some(x=>x.kind==='TRIGGER_NEGATIVE'))warnings.push('NO_NEGATIVE_TRIGGER_CASES');
 if(!enrolled?.some(x=>x.kind==='ADVERSARIAL'))warnings.push('NO_ADVERSARIAL_CASES');
 if(plan?.source_mode!=='SYNTHETIC_EXAMPLE'&&plan?.source_mode!=='OPERATOR_SUPPLIED_UNVERIFIED')errors.push('SOURCE_MODE_REQUIRED');
 if(!errors.length&&paired.length<3)warnings.push('TOO_FEW_PAIRED_REAL_RUNS_FOR_DECISION');
 const wins=paired.filter(x=>x.candidate.status==='PASS'&&x.baseline.status==='FAIL').length;
 const losses=paired.filter(x=>x.candidate.status==='FAIL'&&x.baseline.status==='PASS').length;
 const ties=paired.length-wins-losses;
 const b=paired.filter(x=>x.baseline.status==='PASS').length;
 const c=paired.filter(x=>x.candidate.status==='PASS').length;
 return {schema:'sense-agent-skill-trials-assessment-v26',status:errors.length?'INVALID':plan.source_mode==='SYNTHETIC_EXAMPLE'?'SYNTHETIC_NOT_PROOF':'STRUCTURAL_RESULTS_ONLY_UNAUTHENTICATED',
  case_count:enrolled?.length??0,paired_count:paired.length,
  baseline_passes:b,candidate_passes:c,paired_wins:wins,paired_losses:losses,paired_ties:ties,
  observed_delta_percentage_points:paired.length?Math.round((c-b)/paired.length*10000)/100:null,
  errors,warnings,
  actual_agent_runs_independently_verified:false,statistical_significance_established:false,
  guidance:'Inspect independent output artifacts and blind ratings; include all failed/unavailable attempts before claiming skill uplift. This evaluator does not run agents or authenticate external tasks.'};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{const i=process.argv.indexOf('--file');if(i<0||!process.argv[i+1])throw Error('Usage: --file recorded-agent-trials.json');
  const p=path.resolve(process.argv[i+1]);if(fs.statSync(p).size>2_000_000)throw Error('TRIAL_FILE_LIMIT_2MB');
  const r=assessSkillTrials(JSON.parse(fs.readFileSync(p,'utf8')));console.log(JSON.stringify(r,null,2));
  if(r.status==='INVALID')process.exitCode=1;
 }catch(e){console.error('SKILL_TRIAL_HOLD: '+e.message);process.exitCode=2;}
}
