#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {inspectSite,diffSiteReports} from '../lib/site-intelligence/engine.mjs';
import {buildDiscoveryInventory} from '../lib/site-intelligence/discovery.mjs';
import {summarizeHAR} from '../lib/site-intelligence/har.mjs';
import {buildSkillHandoffs} from '../lib/site-intelligence/knowledge.mjs';

const args=process.argv.slice(2);
function option(name){const index=args.indexOf(name);if(index<0)return null;const value=args[index+1];if(!value||value.startsWith('--'))throw new Error('MISSING_VALUE_'+name);return value;}
function has(name){return args.includes(name);}
function loadJSON(p){const file=path.resolve(p);if(fs.statSync(file).size>3_000_000)throw new Error('INPUT_JSON_SIZE_LIMIT');return JSON.parse(fs.readFileSync(file,'utf8'));}
function writeResult(out,data){
 const body=JSON.stringify(data,null,2)+'\n';
 if(!out){process.stdout.write(body);return;}
 const destination=path.resolve(out);
 if(path.extname(destination)!=='.json')throw new Error('OUTPUT_MUST_BE_JSON');
 fs.writeFileSync(destination,body,{flag:has('--overwrite')?'w':'wx',mode:0o600});
 process.stdout.write(JSON.stringify({file:destination,status:data.status,pages:data.pages?.length??0,sites:data.sites?.length??0,errors:data.errors?.length??0})+'\n');
}
async function run(){
 if(has('--help')||!args.length){
   process.stdout.write([
     'Sense Website Intelligence v24 — non-authenticated read-only public evidence',
     'Discovery: node scripts/site-intelligence.mjs --discover path/search-results.json --out path/discovery.json',
     'Audit: node scripts/site-intelligence.mjs --origin https://site.tld/ --authorized-origin https://site.tld/ --out path/report.json [--seed-file inputs.json]',
     'Options: --max-pages N --max-sitemaps N --min-delay-ms N --previous previous-report.json --har-file SANITIZED.har --packets-out skill-evidence.json --overwrite',
     'Never run on private services, inaccessible networks, logged-in accounts or sites where automation is disallowed.',
     'The --authorized-origin flag records operator intent, NOT verified ownership/terms clearance.',
     'Search-result imports are leads only; there is no built-in search-engine scraping.',
   ].join('\n')+'\n');return;
 }
 const out=option('--out');
 if(option('--discover')){
   const inventory=buildDiscoveryInventory(loadJSON(option('--discover')));
   writeResult(out,inventory);return;
 }
 const origin=option('--origin'),approved=option('--authorized-origin');
 if(!origin||!approved)throw new Error('EXPLICIT_ORIGIN_AND_AUTHORIZATION_REQUIRED');
 const seedFile=option('--seed-file');
 let seeds=[];
 if(seedFile){
   const input=loadJSON(seedFile);
   seeds=Array.isArray(input)?input:Array.isArray(input.seeds)?input.seeds:null;
   if(!seeds)throw new Error('SEED_FILE_MUST_HAVE_ARRAY');
 }
 const overrides={};
 for(const [arg,key] of [['--max-pages','maxPages'],['--max-sitemaps','maxSitemaps'],['--min-delay-ms','minDelayMs']]){
   const value=option(arg);
   if(value!==null){
     if(!/^(0|[1-9]\d{0,8})$/.test(value))throw new Error('INVALID_NUMERIC_LIMIT_'+arg);
     overrides[key]=Number(value);
   }
 }
 const report=await inspectSite({origin,authorizedOrigin:approved,seedUrls:seeds,limits:overrides});
 const harPath=option('--har-file');
 if(harPath){
   const har=loadJSON(harPath);
   report.operator_har_observations=summarizeHAR(har,{origin:report.origin});
   report.architecture??={source:'NOT_OBSERVED',hosting_backend_database:'UNKNOWN_NOT_OBSERVABLE'};
   report.architecture.har_source='OPERATOR_SUPPLIED_HAR_NOT_INDEPENDENTLY_AUTHENTICATED';
 }
 if(option('--previous'))report.comparison_to_previous=diffSiteReports(loadJSON(option('--previous')),report);
 report.skill_evidence_ref='Run --packets-out for verified-scope claims and 10 specialist handoffs; not a model training operation.';
 writeResult(out,report);
 const packetsFile=option('--packets-out');
 if(packetsFile)writeResult(packetsFile,buildSkillHandoffs(report));
 if(report.status.startsWith('BLOCKED'))process.exitCode=1;
}
run().catch(e=>{process.stderr.write(JSON.stringify({status:'REFUSED_OR_FAILED',error:String(e.message).slice(0,250)})+'\n');process.exitCode=2;});
