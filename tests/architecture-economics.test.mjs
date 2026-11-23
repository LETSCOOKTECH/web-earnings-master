import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {estimateToolEconomics} from '../scripts/model-tool-economics.mjs';
import {assessToolArchitecture} from '../scripts/assess-tool-architecture.mjs';
import {evaluateHostingOptions} from '../scripts/evaluate-hosting-options.mjs';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const rates=read('sources/architecture_rate_card_2026-11-23.json');
const s=n=>read('templates/architecture/scenarios/million-'+n+'.json');
const clone=o=>structuredClone(o);
const local=s('browser-local'),hybrid=s('hybrid-file-tools'),cloud=s('cloud-video'),ai=s('ai-token-tool');
const tool=read('templates/architecture/tool-design-input.example.json');
test('five differentiated engineering skills exist with thorough workflow and primary URLs',()=>{
 const names=['web-workload-architecture-router','web-browser-compute','web-conversion-job-platform','web-unit-economics-finops','web-scale-reliability','web-hosting-vendor-evaluation'];
 const dirs=fs.readdirSync(path.join(root,'.agents/skills'),{withFileTypes:true}).filter(x=>x.isDirectory());
 assert.equal(dirs.length,38);
 for(const n of names){
  const content=fs.readFileSync(path.join(root,'.agents/skills',n,'SKILL.md'),'utf8');
  assert.match(content,new RegExp('^---\\nname: '+n+'\\n'));
  assert.match(content,/https:\/\//);assert.match(content,/Release blockers/);
  assert.ok(content.length>4800,'Insufficient skill detail '+n);
 }
});
test('five architecture manuals plus source card and scenario fixtures exist',()=>{
 for(const n of ['01-workload-placement-decision.md','02-client-and-media-pipelines.md','03-million-user-economics.md','04-scale-and-product-quality.md','05-ai-and-external-data-cost.md','06-vendor-cost-comparison.md']){
  const b=fs.readFileSync(path.join(root,'docs/architecture',n),'utf8');
  assert.ok(b.length>2800,n);
  assert.match(b,/https:\/\//);
 }
 assert.equal(rates.version,'2026-11-23.v1');
 assert.equal(rates.workers_paid.request_included,10_000_000);
 assert.equal(rates.r2_standard.egress_usd_per_gb,0);
 assert.ok(rates.source_urls.workers.startsWith('https://'));
});
test('1M monthly users does not become 1M simultaneous jobs',()=>{
 const r=estimateToolEconomics(local,rates);
 assert.equal(r.traffic.monthly_active_users,1_000_000);
 assert.equal(r.traffic.attempted_jobs,3_000_000);
 assert.equal(r.traffic.remote_jobs,0);
 assert.equal(r.capacity.peak_remote_inflight_jobs,0);
});
test('all-client tools avoid remote task compute, but omitted costs stay visible',()=>{
 const r=estimateToolEconomics(local,rates);
 assert.equal(r.known_costs_usd.external_cpu_usd,null);
 assert.equal(r.known_subtotal_usd,0);
 assert.ok(r.omitted_unpriced_categories.includes('engineering'));
 assert.equal(r.status,'MODELED_ONLY_NOT_PRODUCTION_VERIFIED');
});
test('5 percent hybrid routing yields 150k remote jobs and separate storage/queue meters',()=>{
 const r=estimateToolEconomics(hybrid,rates);
 assert.equal(r.traffic.remote_jobs,150_000);
 assert.equal(r.traffic.browser_local_jobs,2_850_000);
 assert.equal(r.meters.r2_class_a,300_000);
 assert.equal(r.meters.r2_class_b,300_000);
 assert.equal(r.meters.queue_operations,450_000);
 assert.ok(r.capacity.indicative_peak_cpu_cores>0);
 assert.ok(r.within_budget_on_known_line_items);
});
test('expensive cloud-heavy video triggers modeled budget breach, not a claim to scale',()=>{
 const r=estimateToolEconomics(cloud,rates);
 assert.equal(r.traffic.remote_jobs,3_000_000);
 assert.equal(r.status,'BUDGET_BREACH_MODELED');
 assert.ok(r.known_subtotal_usd>cloud.spend_budget_usd_per_month);
 assert.ok(r.capacity.indicative_peak_cpu_cores>100);
});
test('cloud video accounts for one point three five petabytes of monthly input and output',()=>{
 const r=estimateToolEconomics(cloud,rates);
 assert.equal(r.traffic.remote_input_output_transfer_gb,1_350_000);
 assert.ok(r.capacity.peak_remote_inflight_jobs>1000);
});
test('AI inference costs differ from edge compute and require token rate',()=>{
 const r=estimateToolEconomics(ai,rates);
 assert.equal(r.traffic.remote_jobs,300_000);
 assert.ok(r.known_costs_usd.ai_input_usd>0);
 assert.ok(r.known_costs_usd.ai_output_usd>r.known_costs_usd.ai_input_usd);
 assert.equal(r.missing_rate_components.length,0);
 const broken=clone(ai);broken.ai_output_usd_per_million_tokens=null;
 const rb=estimateToolEconomics(broken,rates);
 assert.equal(rb.status,'MISSING_REQUIRED_PRICES');
 assert.equal(rb.known_costs_usd.ai_output_usd,null);
});
test('unknown CPU core rate is NOT silently priced at zero',()=>{
 const x=clone(hybrid);x.external_compute_usd_per_core_hour=null;
 const r=estimateToolEconomics(x,rates);
 assert.equal(r.status,'MISSING_REQUIRED_PRICES');
 assert.ok(r.missing_rate_components.includes('UNPRICED_external_compute_usd_per_core_hour'));
});
test('negative/NaN/infinite inputs fail and cannot disguise costs',()=>{
 for(const value of [-1,Infinity,NaN]){
  const x=clone(hybrid);x.monthly_active_users=value;
  assert.throws(()=>estimateToolEconomics(x,rates));
 }
});
test('unsafe usage integer overflow fails rather than fabricating a near-zero budget',()=>{
 const x=clone(hybrid);x.monthly_active_users=1e15;x.jobs_per_mau=1e15;
 assert.throws(()=>estimateToolEconomics(x,rates),/Unsafe count overflow/);
});
test('Workers CPU charges are computed independently of invocations',()=>{
 const x=clone(hybrid);x.worker_requests_per_visit=20;x.worker_cpu_ms_per_request=100;
 const a=estimateToolEconomics(x,rates);
 assert.ok(a.known_costs_usd.worker_requests_usd>0);
 assert.ok(a.known_costs_usd.worker_cpu_usd>0);
});
test('Cloudflare R2 free thresholds and billable-unit rounding do not make free egress infinite free jobs',()=>{
 const x=clone(hybrid);x.r2_extra_storage_gb_month=15.1;
 const r=estimateToolEconomics(x,rates);
 assert.ok(r.known_costs_usd.r2_storage_usd>0);
 assert.equal(r.meters.r2_class_a,300_000);
 assert.equal(r.known_costs_usd.r2_class_a_usd,0);
});
test('Queue retried and oversized message multiplies billed operations',()=>{
 const x=clone(hybrid);x.queue_message_bytes=65_000;x.queue_retry_reads_per_remote_job=2;
 const r=estimateToolEconomics(x,rates);
 assert.equal(r.meters.queue_operations,1_500_000);
 assert.ok(r.known_costs_usd.queue_usd>0);
});
test('A remote paid Worker cannot be called totally free when modeled on free tier',()=>{
 const x=clone(hybrid);x.paid_workers_plan=false;
 const r=estimateToolEconomics(x,rates);
 assert.ok(r.warnings.some(w=>w.includes('Free Workers request')));
});
test('Architecture for browser-native image returns candidate with UNKNOWN real-world support',()=>{
 const r=assessToolArchitecture(tool);
 assert.equal(r.status,'UNKNOWN_EXTERNAL');
 assert.ok(r.routes.includes('BROWSER_WORKER_OR_WASM'));
 assert.ok(r.unknown.some(x=>x.includes('fixtures')));
});
test('Cloud media job without per-job budget or admission quotas fails',()=>{
 const x=clone(tool);x.workload_family='heavy_media';x.cloud_execution_allowed=true;x.local_processing_allowed=false;
 const r=assessToolArchitecture(x);
 assert.equal(r.status,'FAIL');
 assert.ok(r.fail.some(x=>x.includes('budget')));
 assert.ok(r.fail.some(x=>x.includes('quotas')));
});
test('Edge Worker memory above 128MB rejects design at the published resource limit',()=>{
 const x=clone(tool);x.edge_worker_execution_proposed=true;x.peak_edge_memory_mb=256;
 assert.ok(assessToolArchitecture(x).fail.some(y=>y.includes('128MB')));
});
test('Full-file input >100MB cannot use edge Worker as proxy by default',()=>{
 const x=clone(tool);x.max_input_mb=250;x.edge_worker_execution_proposed=true;x.edge_worker_full_file_processing=true;
 assert.ok(assessToolArchitecture(x).fail.some(y=>y.includes('full-file')));
});
test('Local-only privacy assertion requires actual network upload test',()=>{
 const x=clone(tool);x.local_claim=true;
 assert.ok(assessToolArchitecture(x).fail.some(y=>y.includes('network trace')));
 x.network_upload_tested=true;
 assert.ok(!assessToolArchitecture(x).fail.some(y=>y.includes('network trace')));
});
test('False 1M-user readiness claim and spoofed crawler exception are refused',()=>{
 const x=clone(tool);x.claims_million_user_ready=true;x.waf_bot_exception_by_user_agent=true;
 const a=assessToolArchitecture(x);
 assert.equal(a.status,'FAIL');
 assert.ok(a.fail.some(y=>y.includes('1M MAU')));
 assert.ok(a.fail.some(y=>y.includes('User-Agent')));
});
test('Only explicit all-gates-confirmed design may be a design candidate (never load tested)',()=>{
 const x=clone(tool);x.real_fixture_tested=true;x.one_million_mau_load_tested=true;x.browser_capability_tested=true;
 const a=assessToolArchitecture(x);
 assert.equal(a.status,'DESIGN_CANDIDATE_ONLY');
 assert.match(a.disclaimer,/not actual/);
});
test('CLI executable examples separate valid model from intentional breach',()=>{
 for(const file of ['million-browser-local','million-hybrid-file-tools','million-ai-token-tool']){
  const r=spawnSync(process.execPath,['scripts/model-tool-economics.mjs','--scenario','templates/architecture/scenarios/'+file+'.json'],{cwd:root,encoding:'utf8'});
  assert.equal(r.status,0,file+' '+r.stderr);
  assert.match(r.stdout,/MODELED_ONLY_NOT_PRODUCTION_VERIFIED/);
 }
 const bad=spawnSync(process.execPath,['scripts/model-tool-economics.mjs','--scenario','templates/architecture/scenarios/million-cloud-video.json'],{cwd:root,encoding:'utf8'});
 assert.equal(bad.status,1);
 assert.match(bad.stdout,/BUDGET_BREACH_MODELED/);
});
test('Architecture sample CLI executes without claiming production readiness',()=>{
 const r=spawnSync(process.execPath,['scripts/assess-tool-architecture.mjs','--file','templates/architecture/tool-design-input.example.json'],{cwd:root,encoding:'utf8'});
 assert.equal(r.status,0,r.stderr);
 assert.match(r.stdout,/UNKNOWN_EXTERNAL/);
});


test('commercial Vercel Hobby is disqualified by first-party plan restriction',()=>{
 const x=read('templates/architecture/hosting-choice.example.json');
 const r=evaluateHostingOptions(x);
 assert.equal(r.status,'MODEL_ONLY');
 const hobby=r.candidates.find(y=>y.name==='Vercel / Hobby');
 assert.equal(hobby.status,'DISQUALIFIED');
 assert.ok(hobby.fail.some(y=>y.includes('commercial plan restriction')));
});
test('hosting choice never declares a universal cheapest provider with unpriced items/capacity',()=>{
 const x=read('templates/architecture/hosting-choice.example.json');
 const r=evaluateHostingOptions(x);
 assert.equal(r.lowest_validated_plan_only,null);
 assert.ok(r.candidates.some(y=>y.unknown.some(s=>s.includes('capacity')||s.includes('actual workload'))));
});
test('hosting choice rejects missing mandatory capability even if plan costs zero',()=>{
 const x=read('templates/architecture/hosting-choice.example.json');
 x.required_capabilities.push('2gb_video_cpu_sandbox');
 const r=evaluateHostingOptions(x);
 assert.ok(r.candidates.every(p=>p.status==='DISQUALIFIED'));
 assert.equal(r.lowest_validated_plan_only,null);
});
test('valid provider comparison still only recommends a plan when load proof and all costs are supplied',()=>{
 const x=read('templates/architecture/hosting-choice.example.json');
 x.candidates=[x.candidates[2]];
 x.candidates[0].real_capacity_load_tested=true;
 x.candidates[0].unpriced_cost_categories=[];
 const r=evaluateHostingOptions(x);
 assert.equal(r.lowest_validated_plan_only,'Vercel / Pro');
 assert.equal(r.candidates[0].status,'CANDIDATE_VALIDATED_IN_SCOPE');
 assert.match(r.disclaimer,/[Pp]rovider/);
});
test('hosting options CLI runs and returns modeled unknowns',()=>{
 const r=spawnSync(process.execPath,['scripts/evaluate-hosting-options.mjs','--file','templates/architecture/hosting-choice.example.json'],{cwd:root,encoding:'utf8'});
 assert.equal(r.status,0,r.stderr);
 assert.match(r.stdout,/commercial plan restriction/);
 assert.match(r.stdout,/lowest_validated_plan_only/);
});
test('Architecture evidence contract checks all six specialized skills and dated claims',()=>{
 const r=spawnSync(process.execPath,['scripts/check-architecture-evidence.mjs'],{cwd:root,encoding:'utf8'});
 assert.equal(r.status,0,r.stderr+'\n'+r.stdout);
 assert.match(r.stdout,/38 skill manifests/);
 assert.match(r.stdout,/NOT actual invoices/);
});
