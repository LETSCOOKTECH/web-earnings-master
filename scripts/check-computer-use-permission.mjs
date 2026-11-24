import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// Structural permission validator only. The caller MUST inspect real tool schemas
// and current provider terms independently. This script cannot browse or authorize itself.
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export const MODES=new Set(['NONE','PUBLIC_SEARCH','READ_ONLY_TABS','INTERACTIVE_GUI','OWNED_BROWSER','LICENSED_API']);
export const ACTIONS=new Set(['read','navigate','click','type','export','download','api_read','login','publish','purchase','submit_form','upload_private','bypass_challenge']);
const HIGH_IMPACT=new Set(['login','publish','purchase','submit_form','upload_private','bypass_challenge']);
const AGE=86400000;
const finite=n=>typeof n==='number'&&Number.isFinite(n)&&n>=0;
const date=s=>typeof s==='string'?Date.parse(s):NaN;
const str=s=>typeof s==='string'&&s.trim().length>2;
function secureURL(s){
 try{const u=new URL(s);return u.protocol==='https:'&&!u.username&&!u.password&&!['example.com','example.org','example.net','localhost'].includes(u.hostname);}
 catch{return false;}
}
function allowedOrigin(url,arr){
 try{const origin=new URL(url).origin;return arr.some(s=>{try{return new URL(s).origin===origin;}catch{return false;}});}
 catch{return false;}
}
export function checkComputerUse(record,{now=Date.now()}={}){
 const issues=[],holds=[];
 const facts={tool_discovered:false,computer_use_available:false,action_supported:false,provider_permission:false,user_permission:false,budget_available:false};
 const result=(status,extra=[])=>({status,eligible:false,issues:[...extra,...issues,...holds],facts,action_executed:false});
 if(!record||typeof record!=='object'||Array.isArray(record))return result('INVALID',['Missing preflight record']);
 const mode=record.runtime?.mode,tool=record.runtime?.tool,action=record.request?.action;
 if(!MODES.has(mode))issues.push('Unknown runtime mode');
 if(!ACTIONS.has(action))issues.push('Unknown requested action');
 if(!secureURL(record.request?.url))issues.push('HTTPS destination required');
 const origins=record.request?.allowed_origins;
 if(!Array.isArray(origins)||origins.length<1||origins.some(x=>!secureURL(x)))issues.push('Explicit valid HTTPS origin allowlist required');
 else if(!allowedOrigin(record.request?.url,origins))issues.push('Destination origin outside declared scope');
 if(HIGH_IMPACT.has(action))return result('BLOCKED',['Posting, login, payment, form submission, private uploads and challenge bypass require separate human-operated workflows']);
 const inspected=date(tool?.inspected_at);
 facts.tool_discovered=tool?.source==='ACTUAL_TOOL_SCHEMA'&&str(tool?.name)&&Array.isArray(tool?.advertised_actions)&&
  tool.advertised_actions.every(x=>ACTIONS.has(x))&&Number.isFinite(inspected)&&inspected<=now+60000&&now-inspected<=AGE;
 if(!facts.tool_discovered)holds.push('Actual current runtime tool-schema evidence missing; tool name or user claim alone insufficient');
 const allowedByMode=({
  NONE:[],PUBLIC_SEARCH:['read'],READ_ONLY_TABS:['read'],
  INTERACTIVE_GUI:['read','navigate','click','type','export','download'],
  OWNED_BROWSER:['read','navigate','click','type','export','download'],
  LICENSED_API:['api_read']
 })[mode]||[];
 facts.action_supported=facts.tool_discovered&&allowedByMode.includes(action)&&tool.advertised_actions.includes(action);
 facts.computer_use_available=facts.tool_discovered&&['INTERACTIVE_GUI','OWNED_BROWSER'].includes(mode)&&
   ['navigate','click','type','export','download'].some(x=>tool.advertised_actions.includes(x));
 if(!facts.action_supported)holds.push('Requested action unsupported by actual advertised runtime mode');
 if(mode==='OWNED_BROWSER'&&record.request?.owned_site!==true)holds.push('Owned-browser automation cannot be used on third-party site by default');
 const policy=record.policy||{},policyTime=date(policy.checked_at);
 if(policy.automation_status==='PROHIBITED')return result('BLOCKED',['Provider disallows automated action']);
 facts.provider_permission=secureURL(policy.original_url)&&str(policy.scope)&&policy.original_opened===true&&
  Number.isFinite(policyTime)&&policyTime<=now+60000&&now-policyTime<=AGE&&
  policy.automation_status==='PERMITTED'&&Array.isArray(policy.allowed_actions)&&policy.allowed_actions.includes(action);
 if(!facts.provider_permission)holds.push('Current original provider terms do not explicitly permit this action and automation mode');
 const user=record.user||{};
 facts.user_permission=user.authorized===true&&user.account_access_authorized===true&&str(user.scope)&&
  Array.isArray(user.allowed_actions)&&user.allowed_actions.includes(action);
 if(!facts.user_permission)holds.push('User and account authorization for scoped action not established');
 const b=record.budget||{},step=action==='read'?0:1;
 if(![b.max_actions,b.used_actions,b.max_paid_units,b.used_paid_units,b.max_cash_usd,b.used_cash_usd].every(finite))issues.push('Budget must have six finite nonnegative values');
 else {
  facts.budget_available=b.used_actions+step<=b.max_actions&&b.used_paid_units<=b.max_paid_units&&b.used_cash_usd<=b.max_cash_usd;
  if(action==='api_read'&&(b.max_paid_units===0||user.approved_paid_api!==true))holds.push('Paid API entitlement and authorized unit cap not established');
  if(!facts.budget_available)holds.push('Action or paid budget exhausted');
 }
 if(record.challenge_detected===true)return result('BLOCKED',['Challenge, MFA, CAPTCHA or rate limit: no bypass or stealth retry']);
 if(record.private_data_risk===true)return result('BLOCKED',['Private data or secrets risk']);
 if(issues.length)return result('INVALID');
 if(holds.length)return result('HOLD');
 return {status:'ELIGIBLE_FOR_ONE_ACTION',eligible:true,issues:[],facts,action_executed:false,
 warning:'Only checks the supplied receipt. Actual tool availability, original provider permission and user authority must be independently verified by the invoking agent; no browser action was performed.'};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const ix=process.argv.indexOf('--file');
 const input=ix<0?path.join(ROOT,'templates/opportunity/computer-use-preflight.example.json'):process.argv[ix+1];
 try{
  const data=JSON.parse(fs.readFileSync(input,'utf8'));
  const outcome=checkComputerUse(data);
  console.log(JSON.stringify(outcome,null,2));
  if(outcome.status==='INVALID'||(process.argv.includes('--require-eligible')&&!outcome.eligible))process.exitCode=1;
 }catch(e){console.error(e.message);process.exitCode=1;}
}
