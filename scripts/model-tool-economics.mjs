#!/usr/bin/env node
// 2026-11-23 dated list-rate illustrative model; NOT a cloud bill, capacity test or hosting endorsement.
// CLI node scripts/model-tool-economics.mjs --scenario templates/architecture/scenarios/million-hybrid-file-tools.json
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const r2max=(a,b)=>Math.max(0,a-b);
const fixed=(n,d=2)=>Number(n.toFixed(d));
const roundUpBillableUnits=(usage,included,unit)=>Math.ceil(r2max(usage,included)/unit);
const n=(obj,key,{max=1e15,min=0,positive=false}={})=>{
 const value=obj[key];
 if(typeof value!=='number'||!Number.isFinite(value)||value<min||value>max||(positive&&value===0))
 throw new Error('Invalid scenario numeric '+key);
 return value;
};
const validOptional=(v,key)=>{
 if(v===null||v===undefined)return null;
 if(typeof v!=='number'||!Number.isFinite(v)||v<0)throw new Error('Invalid optional rate '+key);
 return v;
};
export function estimateToolEconomics(s,card){
 if(!s||!card||typeof s!=='object'||typeof card!=='object')throw Error('Scenario and rate card objects required');
 for(const key of ['workers_paid','r2_standard','queues_paid','d1_paid'])if(!card[key])throw Error('Missing provider rate card '+key);
 const fields=['monthly_active_users','days','visits_per_mau','pageviews_per_visit','jobs_per_mau','peak_to_average','job_wall_seconds','job_cpu_seconds','static_mb_per_pageview','worker_requests_per_visit','worker_requests_per_remote_job','worker_cpu_ms_per_request','r2_input_mb_per_remote_job','r2_output_mb_per_remote_job','r2_retention_hours','r2_class_a_per_remote_job','r2_class_b_per_remote_job','r2_extra_storage_gb_month','queue_operations_per_remote_job','queue_message_bytes','queue_retry_reads_per_remote_job','d1_rows_read_per_remote_job','d1_rows_written_per_remote_job','d1_storage_gb_month','external_egress_gb_per_remote_job','fixed_known_usd_per_month','spend_budget_usd_per_month'];
 for(const key of fields)n(s,key);
 for(const key of ['remote_fraction','compute_utilization','job_success_fraction'])n(s,key,{max:1,min:0});
 if(s.days<1||s.compute_utilization<=0||s.job_success_fraction<=0||s.peak_to_average<1)throw Error('Days/utilization/success/peak constraints violated');
 if(typeof s.paid_workers_plan!=='boolean')throw Error('paid_workers_plan must be boolean');
 const prices={};
 const missing=[],warnings=[],lineItems={};
 const optional=(key,needed)=>{const v=validOptional(s[key],key);if(needed&&v===null)missing.push('UNPRICED_'+key);return v};
 const mul=(x,y)=>{const v=x*y;if(!Number.isFinite(v)||!Number.isSafeInteger(Math.floor(v)))throw Error('Unsafe count overflow');return v};
 const visits=mul(s.monthly_active_users,s.visits_per_mau);
 const pageviews=mul(visits,s.pageviews_per_visit);
 const jobs=mul(s.monthly_active_users,s.jobs_per_mau);
 const remote=mul(jobs,s.remote_fraction),local=jobs-remote;
 const successes=jobs*s.job_success_fraction;
 const avgJobsPerSecond=jobs/(s.days*86400),peakJobsPerSecond=avgJobsPerSecond*s.peak_to_average;
 const peakRemoteJobsPerSecond=peakJobsPerSecond*s.remote_fraction;
 const peakRunningJobs=peakRemoteJobsPerSecond*s.job_wall_seconds;
 const peakCpuCores=s.job_cpu_seconds>0?peakRemoteJobsPerSecond*s.job_cpu_seconds/s.compute_utilization:0;
 const coreHours=remote*s.job_cpu_seconds/(3600*s.compute_utilization);
 const edgeRequests=visits*s.worker_requests_per_visit+remote*s.worker_requests_per_remote_job;
 const edgeCpuMs=edgeRequests*s.worker_cpu_ms_per_request;
 if(edgeRequests>0&&!s.paid_workers_plan)warnings.push('Free Workers request/CPU daily quotas and features are not included; cannot call this paid-model cost a production quote.');
 const workers=s.paid_workers_plan?card.workers_paid:null;
 lineItems.worker_subscription_usd=workers?workers.base_usd_per_month:0;
 lineItems.worker_requests_usd=workers?r2max(edgeRequests,workers.request_included)/1000000*workers.request_usd_per_million:0;
 lineItems.worker_cpu_usd=workers?r2max(edgeCpuMs,workers.cpu_ms_included)/1000000*workers.cpu_usd_per_million_ms:0;
 const standard=card.r2_standard;
 const storedGbMonth=remote*(s.r2_input_mb_per_remote_job+s.r2_output_mb_per_remote_job)/1000*s.r2_retention_hours/(s.days*24)+s.r2_extra_storage_gb_month;
 const writes=remote*s.r2_class_a_per_remote_job;
 const reads=remote*s.r2_class_b_per_remote_job;
 lineItems.r2_storage_usd=roundUpBillableUnits(storedGbMonth,standard.included_storage_gb_month,1)*standard.storage_usd_per_gb_month;
 lineItems.r2_class_a_usd=roundUpBillableUnits(writes,standard.free_class_a_ops,1000000)*standard.class_a_usd_per_million_ops;
 lineItems.r2_class_b_usd=roundUpBillableUnits(reads,standard.free_class_b_ops,1000000)*standard.class_b_usd_per_million_ops;
 const queueUnits=remote*(s.queue_operations_per_remote_job+s.queue_retry_reads_per_remote_job)*Math.max(1,Math.ceil(s.queue_message_bytes/card.queues_paid.operation_chunk_bytes));
 lineItems.queue_usd=r2max(queueUnits,card.queues_paid.free_operations)/1000000*card.queues_paid.usd_per_million_operations;
 const readsDb=remote*s.d1_rows_read_per_remote_job,writesDb=remote*s.d1_rows_written_per_remote_job,db=card.d1_paid;
 lineItems.d1_reads_usd=r2max(readsDb,db.included_rows_read)/1000000*db.rows_read_usd_per_million;
 lineItems.d1_writes_usd=r2max(writesDb,db.included_rows_written)/1000000*db.rows_written_usd_per_million;
 lineItems.d1_storage_usd=r2max(s.d1_storage_gb_month,db.included_storage_gb_month)*db.storage_usd_per_gb_month;
 const computeRate=optional('external_compute_usd_per_core_hour',coreHours>0);
 lineItems.external_cpu_usd=computeRate===null?null:coreHours*computeRate;
 const inputTokens=n(s,'ai_input_tokens_per_remote_job'),outputTokens=n(s,'ai_output_tokens_per_remote_job');
 const aiInputRate=optional('ai_input_usd_per_million_tokens',remote*inputTokens>0);
 const aiOutputRate=optional('ai_output_usd_per_million_tokens',remote*outputTokens>0);
 lineItems.ai_input_usd=aiInputRate===null?null:remote*inputTokens/1000000*aiInputRate;
 lineItems.ai_output_usd=aiOutputRate===null?null:remote*outputTokens/1000000*aiOutputRate;
 const cdnRate=optional('static_cdn_usd_per_gb',pageviews*s.static_mb_per_pageview>0);
 const staticTransferGb=pageviews*s.static_mb_per_pageview/1000;
 lineItems.static_cdn_usd=cdnRate===null?null:cdnRate*staticTransferGb;
 const extGb=remote*s.external_egress_gb_per_remote_job;
 const egressRate=optional('external_egress_usd_per_gb',extGb>0);
 lineItems.external_egress_usd=egressRate===null?null:extGb*egressRate;
 lineItems.fixed_known_usd=s.fixed_known_usd_per_month;
 const knownTotal=Object.values(lineItems).reduce((total,value)=>total+(value??0),0);
 const unpriced=Array.isArray(s.extra_unpriced_categories)?s.extra_unpriced_categories:[];
 if(unpriced.some(x=>typeof x!=='string'||!x.trim()))throw Error('Invalid extra_unpriced_categories');
 warnings.push('No actual hosting bill, device memory benchmark, browser success logs, queue deployment or load test was used.');
 if(card.r2_standard.billing_rounding_note)warnings.push(card.r2_standard.billing_rounding_note);
 const status=knownTotal>s.spend_budget_usd_per_month?'BUDGET_BREACH_MODELED':missing.length?'MISSING_REQUIRED_PRICES':'MODELED_ONLY_NOT_PRODUCTION_VERIFIED';
 if(unpriced.length)warnings.push('Costs omitted by explicit scenario categories: '+unpriced.join(', '));
 return {
  status,rate_card_version:card.version,scenario_name:s.name,rate_checked_on:card.checked_on,
  traffic:{monthly_active_users:s.monthly_active_users,visits:visits,pageviews,attempted_jobs:jobs,expected_successful_jobs:successes,browser_local_jobs:local,remote_jobs:remote,static_transfer_gb:fixed(staticTransferGb,3),remote_input_output_transfer_gb:fixed(remote*(s.r2_input_mb_per_remote_job+s.r2_output_mb_per_remote_job)/1000,3)},
  capacity:{mean_jobs_per_second:fixed(avgJobsPerSecond,4),peak_jobs_per_second:fixed(peakJobsPerSecond,3),peak_remote_jobs_per_second:fixed(peakRemoteJobsPerSecond,3),peak_remote_inflight_jobs:fixed(peakRunningJobs,1),indicative_peak_cpu_cores:fixed(peakCpuCores,1),remote_core_hours_illustrative:fixed(coreHours,1)},
  meters:{worker_invocations:edgeRequests,worker_cpu_ms:edgeCpuMs,r2_storage_gb_month:fixed(storedGbMonth,3),r2_class_a:writes,r2_class_b:reads,queue_operations:queueUnits,d1_rows_read:readsDb,d1_rows_written:writesDb},
  known_costs_usd:Object.fromEntries(Object.entries(lineItems).map(([k,v])=>[k,v===null?null:fixed(v,4)])),
  known_subtotal_usd:fixed(knownTotal,2),known_cost_per_success_usd:successes>0?fixed(knownTotal/successes,6):null,
  monthly_budget_usd:s.spend_budget_usd_per_month,within_budget_on_known_line_items:knownTotal<=s.spend_budget_usd_per_month,
  missing_rate_components:missing,omitted_unpriced_categories:unpriced,
  warnings,
  disclaimer:'ILLUSTRATIVE pricing arithmetic; unknowns not zero; actual provider bills/AdSense revenue/scale reliability need separate validated evidence.'
 };
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 const i=process.argv.indexOf('--scenario'),j=process.argv.indexOf('--rates');
 if(i<0||!process.argv[i+1]){console.error('Usage: node scripts/model-tool-economics.mjs --scenario <json> [--rates <json>]');process.exitCode=2;}
 else try{
 const scenario=JSON.parse(fs.readFileSync(process.argv[i+1],'utf8'));
 const rates=JSON.parse(fs.readFileSync(j>=0?process.argv[j+1]:path.resolve(import.meta.dirname,'../sources/architecture_rate_card_2026-11-23.json'),'utf8'));
 const out=estimateToolEconomics(scenario,rates);console.log(JSON.stringify(out,null,2));
 if(out.status==='BUDGET_BREACH_MODELED'||out.status==='MISSING_REQUIRED_PRICES')process.exitCode=1;
 }catch(e){console.error('MODEL_INPUT_FAIL '+String(e));process.exitCode=2;}
}
