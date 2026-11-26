#!/usr/bin/env node
/**
 * Bounded first-party monetization research. No paid API keys or network by default.
 * Live mode: explicit domain allowlist, HTTPS only, pinned public IPv4, no redirects,
 * robots.txt check before HTML/ads.txt, strict time/size caps, no JS execution.
 */
import fs from 'node:fs';
import path from 'node:path';
import dns from 'node:dns/promises';
import https from 'node:https';
import net from 'node:net';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {evaluateRobots} from './robots-evaluator.mjs';
import {recommendStack,validateRegistry,inspectCandidate,fingerprintPublic} from './omni-monetization-core.mjs';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const REGISTRY=path.join(ROOT,'sources/monetization_providers_registry.json');
const USER_AGENT='Sense-Monetization-ReadOnly-Research/1.0';
const argv=process.argv.slice(2);
function flag(n){const i=argv.indexOf(n);return i>=0?argv[i+1]:null;}
function output(object){process.stdout.write(JSON.stringify(object,null,2)+'\n');}
function localJSON(filename){
 if(!filename)throw Error('LOCAL_JSON_FILE_REQUIRED');
 const name=path.resolve(filename);
 const stat=fs.statSync(name);
 if(!stat.isFile()||stat.size>1000000)throw Error('LOCAL_JSON_FILE_TOO_LARGE');
 return JSON.parse(fs.readFileSync(name,'utf8'));
}
export function validPublicIPv4(ip){
 if(net.isIP(ip)!==4)return false;
 const [a,b,c,d]=ip.split('.').map(Number);
 if(a===0||a===10||a===127||a>=224||a===169&&b===254||a===172&&b>=16&&b<=31||
 a===192&&b===168||a===100&&b>=64&&b<=127||a===198&&(b===18||b===19)||
 a===192&&(b===0||b===88&&c===99)||a===198&&b===51&&c===100||
 a===203&&b===0&&c===113||a===192&&b===0&&c===2||a===255)return false;
 return true;
}
export function guardLiveURL(raw,allowDomain){
 const u=new URL(raw);
 if(u.protocol!=='https:'||u.username||u.password||u.port||u.hash||!allowDomain||u.hostname!==allowDomain.toLowerCase()||
 net.isIP(u.hostname)||u.hostname==='localhost'||!u.hostname.includes('.'))throw Error('LIVE_URL_NOT_AUTHORIZED_HTTPS_EXACT_DOMAIN');
 return u;
}
async function pinHost(host){
 const ipv4=await dns.resolve4(host);
 if(!ipv4.length||ipv4.some(ip=>!validPublicIPv4(ip)))throw Error('HOLD_NONPUBLIC_OR_MIXED_DNS_RESULT');
 return ipv4[0];
}
async function requestPinned(u,{ip,max=500000}={}){
 return new Promise((resolve,reject)=>{
  const req=https.request(u,{
   method:'GET',timeout:12000,maxHeaderSize:16000,
   lookup:(_host,_opts,cb)=>cb(null,ip,4),
   headers:{'User-Agent':USER_AGENT,'Accept':'text/plain,text/html;q=0.9,*/*;q=0.1','Accept-Encoding':'identity'}
  },res=>{
   const chunks=[];let size=0;
   if(res.statusCode>=300&&res.statusCode<400){res.resume();reject(Error('HOLD_REDIRECT_NOT_FOLLOWED'));return;}
   res.on('data',b=>{size+=b.length;if(size>max){req.destroy(Error('HOLD_RESPONSE_SIZE_LIMIT'));return;}chunks.push(b);});
   res.on('end',()=>resolve({status:res.statusCode,content:Buffer.concat(chunks).toString('utf8'),contentType:String(res.headers['content-type']||''),finalUrl:u.href}));
   res.on('error',reject);
  });
  req.on('timeout',()=>req.destroy(Error('HOLD_REMOTE_TIMEOUT')));
  req.on('error',reject);req.end();
 });
}
export async function auditedPublicGet(raw,{allowDomain,allow404=false}={}){
 const u=guardLiveURL(raw,allowDomain);
 const ip=await pinHost(u.hostname);
 const robots=new URL('/robots.txt',u);
 const robotsResult=await requestPinned(robots,{ip,max:250000});
 if(robotsResult.status===200){
  const decision=evaluateRobots(robotsResult.content,USER_AGENT,u.pathname+u.search);
  if(!decision.allowed)throw Error('HOLD_ROBOTS_DISALLOW:'+decision.match?.path);
 }else if(robotsResult.status!==404&&robotsResult.status!==410)throw Error('HOLD_ROBOTS_UNAVAILABLE:'+robotsResult.status);
 const result=await requestPinned(u,{ip});
 if(result.status!==200&&!(allow404&&result.status===404))throw Error('HOLD_HTTP_'+result.status);
 if(result.status===200&&!/text\/|application\/(?:json|javascript|xml|xhtml)/i.test(result.contentType))throw Error('HOLD_NON_TEXT_CONTENT_TYPE');
 return {...result,robotsStatus:robotsResult.status,robotsRespected:true,pinnedPublicIPv4:true};
}
export async function run(args=argv){
 const get=k=>{const i=args.indexOf(k);return i<0?null:args[i+1];};
 const has=k=>args.includes(k);
 const registry=localJSON(REGISTRY),quality=validateRegistry(registry);
 if(quality.errors.length)throw Error('PROVIDER_REGISTRY_INVALID:'+quality.errors.join(','));
 if(has('--catalog')){
  return {schema:'sense-earning-channel-catalog-v31',source_snapshot:registry.snapshot_date_utc,
   channels:registry.public_channels,
   provider_evidence:registry.providers.map(p=>({id:p.id,category:p.category,status:p.verification_status,official_policy_url:p.official_policy_url,
    last_verified:p.last_verified,india_payout_supported:p.india_payout_supported,coexists_with_adsense:p.coexists_with_adsense})),
   registry_health:quality,net_earning_claims_verified:false,
   instruction:'Use this category universe for task-based research, not as a claim that all 25 channels fit or produce money.'};
 }
 if(has('--recommend')){
  const profile=get('--profile')?localJSON(get('--profile')):{
   niche:get('--niche'),expected_adblock_rate:get('--expected-adblock-rate')??0.2,
   desktop_pct:get('--desktop-pct')??50,primary_geo:get('--primary-geo')??'mixed',
   server_cost:get('--server-cost')??0
  };
  return {...recommendStack(profile,registry),registry_health:quality};
 }
 if(has('--ingest-candidate')){
  const packet=localJSON(get('--ingest-candidate'));
  return {schema:'sense-candidate-research-v31',candidate_id:packet.id??null,...inspectCandidate(packet),registry_mutated:false,
   instruction:'Original provider page and country/legal account conditions require independent human/agent source review before a PR. Nothing is auto-registered.'};
 }
 if(has('--fingerprint')){
  const url=get('--fingerprint');
  if(!url)throw Error('TARGET_URL_REQUIRED');
  let html='',adsTxt='',sourceMode='OFFLINE_FIXTURE_ONLY',network={};
  if(has('--live')){
   const domain=get('--allow-domain');
   const target=guardLiveURL(url,domain);
   const page=await auditedPublicGet(target.href,{allowDomain:domain});
   html=page.content;network.page={status:page.status,url:page.finalUrl};
   const ads=await auditedPublicGet(new URL('/ads.txt',target).href,{allowDomain:domain,allow404:true});
   adsTxt=ads.status===200?ads.content:'';network.ads={status:ads.status,url:ads.finalUrl};
   sourceMode='LIVE_PUBLIC_READONLY';
  }else{
   const htmlPath=get('--html-file'),adsPath=get('--ads-file');
   if(!htmlPath&&!adsPath)throw Error('OFFLINE_REQUIRES_HTML_OR_ADS_FILE; USE_EXPLICIT_--live_--allow-domain_FOR_NETWORK');
   for(const [p,label] of [[htmlPath,'html'],[adsPath,'ads']]){
    if(p&&fs.statSync(path.resolve(p)).size>500000)throw Error('FIXTURE_TOO_LARGE:'+label);
   }
   html=htmlPath?fs.readFileSync(path.resolve(htmlPath),'utf8'):'';
   adsTxt=adsPath?fs.readFileSync(path.resolve(adsPath),'utf8'):'';
  }
  return {...fingerprintPublic({html,adsTxt,targetUrl:url}),sourceMode,network,real_revenue_verified:false,
   contentHash: createHash('sha256').update(html+'\0'+adsTxt).digest('hex'),headers_do_not_prove_ad_fill:true};
 }
 if(has('--watch')){
  if(!has('--live'))throw Error('WATCH_REQUIRES_--live_EXPLICIT');
  const id=get('--provider'),p=registry.providers.find(x=>x.id===id);
  if(!p)throw Error('UNKNOWN_PROVIDER');
  const domain=new URL(p.official_policy_url).hostname;
  if(get('--allow-domain')!==domain)throw Error('WATCH_REQUIRE_EXACT_OFFICIAL_DOMAIN_ALLOWLIST');
  const response=await auditedPublicGet(p.official_policy_url,{allowDomain:domain});
  return {schema:'sense-provider-policy-fetch-v31',provider:id,observed_at:new Date().toISOString(),
   source_url:response.finalUrl,http_status:response.status,robots_respected:true,
   body_sha256:createHash('sha256').update(response.content).digest('hex'),
   inspection:'FETCH_ONLY_HUMAN_SEMANTIC_REVIEW_REQUIRED',country_and_contract_unverified:true,registry_mutated:false};
 }
 throw Error('USAGE: --recommend --niche X [--expected-adblock-rate .4 --desktop-pct 90 --primary-geo US --server-cost 5] | --fingerprint https://site [--html-file file --ads-file file] | --fingerprint https://site --live --allow-domain site | --ingest-candidate file.json | --watch --provider ID --live --allow-domain official.domain');
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{const result=await run();output(result);
 if(result.status==='HOLD_UNVERIFIED_PROVIDER')process.exitCode=1;
 }catch(error){console.error('MONETIZATION_HOLD:'+error.message);process.exitCode=2;}
}
