#!/usr/bin/env node
// Structure-only tool architecture recommendation. Does not run a benchmark or guarantee feasibility.
import fs from 'node:fs';import path from 'node:path';import {pathToFileURL} from 'node:url';
const families=new Set(['deterministic','browser_media','heavy_media','document','database','ai_inference','web_network','collaboration']);
export function assessToolArchitecture(x){
 const fail=[],unknown=[],warnings=[],routes=[];
 if(!x||typeof x!=='object')return {status:'FAIL',fail:['Input object required'],unknown,warnings,routes};
 if(!families.has(x.workload_family))fail.push('Unsupported workload family');
 if(!Array.isArray(x.output_oracles)||x.output_oracles.length===0)fail.push('Must specify objective output tests');
 if(!Number.isFinite(x.max_input_mb)||x.max_input_mb<0)fail.push('Need max_input_mb nonnegative');
 if(!Number.isFinite(x.peak_browser_ram_mb)||x.peak_browser_ram_mb<0)fail.push('Need measured/estimated peak browser RAM');
 if(!Number.isFinite(x.cpu_seconds_per_job)||x.cpu_seconds_per_job<0)fail.push('Need CPU seconds per job');
 if(typeof x.browser_capability_tested!=='boolean')unknown.push('Browser capability matrix not executed');
 if(typeof x.real_fixture_tested!=='boolean'||!x.real_fixture_tested)unknown.push('Real output-oracle fixtures not verified');
 if(typeof x.one_million_mau_load_tested!=='boolean'||!x.one_million_mau_load_tested)unknown.push('1M MAU equivalent peak load not demonstrated');
 if(x.local_claim===true&&x.network_upload_tested!==true)fail.push('Local-only promise without checked upload/network trace');
 if(x.local_processing_allowed===true){
  if(!x.browser_capability_tested)warnings.push('Browser local option is only candidate; real device/codec support unknown');
  if(x.device_ram_budget_mb!==undefined&&x.peak_browser_ram_mb>x.device_ram_budget_mb)warnings.push('Device RAM budget exceeded: local processing requires fallback/degradation');
  routes.push('BROWSER_WORKER_OR_WASM');
 }
 if(['heavy_media','ai_inference','collaboration','web_network'].includes(x.workload_family)||x.local_processing_allowed===false)routes.push('BOUNDED_SERVER_OR_PROVIDER');
 if(x.max_input_mb>100)warnings.push('Large input: do not stream through edge worker; use directly scoped object-store upload or fully local browser processing');
 if(x.edge_worker_execution_proposed===true){
  if(x.peak_edge_memory_mb===undefined)unknown.push('Edge-worker memory unknown');
  else if(x.peak_edge_memory_mb>128)fail.push('Cloudflare Workers memory exceeds 128MB isolate documented limit');
  if(x.edge_worker_full_file_processing===true&&x.max_input_mb>100)fail.push('Multi-hundred-MB full-file processing routed through edge worker without direct upload');
 }
 if(x.cloud_execution_allowed===true)routes.push('PRESIGNED_UPLOAD_QUEUE_ISOLATED_COMPUTE');
 if(x.cloud_execution_allowed===true && (!x.per_job_cost_budget_usd||x.per_job_cost_budget_usd<=0))fail.push('Cloud jobs require positive per-job budget cap');
 if(x.cloud_execution_allowed===true && x.has_admission_quotas!==true)fail.push('Cloud jobs require server-enforced admission and quotas');
 if(x.workload_family==='ai_inference' && x.model_price_verified!==true)unknown.push('Current AI inference provider price/model not verified');
 if(x.claims_million_user_ready===true&&!x.one_million_mau_load_tested)fail.push('Cannot claim 1M MAU capacity from static architecture');
 if(x.waf_bot_exception_by_user_agent===true)fail.push('User-Agent spoof cannot verify crawler identity');
 if(x.output_oracles?.some(y=>typeof y!=='string'||y.length<6))fail.push('Invalid output oracle');
 return {status:fail.length?'FAIL':unknown.length?'UNKNOWN_EXTERNAL':'DESIGN_CANDIDATE_ONLY',workload_family:x.workload_family,routes:[...new Set(routes)],fail,unknown,warnings,
 disclaimer:'Architecture candidate, not actual file conversion, cloud account approval, price guarantee or 1M-user load proof.'};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 const i=process.argv.indexOf('--file');
 if(i<0||!process.argv[i+1]){console.error('Usage: node scripts/assess-tool-architecture.mjs --file <tool.json>');process.exitCode=2;}
 else try{const x=assessToolArchitecture(JSON.parse(fs.readFileSync(process.argv[i+1],'utf8')));console.log(JSON.stringify(x,null,2));if(x.status==='FAIL')process.exitCode=1;}catch(e){console.error(String(e));process.exitCode=2;}
}
