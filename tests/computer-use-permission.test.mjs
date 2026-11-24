import test from 'node:test';
import assert from 'node:assert/strict';
import {checkComputerUse} from '../scripts/check-computer-use-permission.mjs';
const NOW=Date.parse('2026-11-24T10:00:00Z');
const base=()=>({
 runtime:{mode:'INTERACTIVE_GUI',tool:{source:'ACTUAL_TOOL_SCHEMA',name:'tool.browser.click',advertised_actions:['read','navigate','click','type','export','download'],inspected_at:'2026-11-24T09:00:00Z'}},
 request:{action:'click',url:'https://trends.google.com/trends/explore',allowed_origins:['https://trends.google.com'],owned_site:false},
 policy:{original_url:'https://policies.google.com/terms',scope:'Automated research in visible UI',original_opened:true,checked_at:'2026-11-24T09:00:00Z',automation_status:'PERMITTED',allowed_actions:['click','read','navigate']},
 user:{authorized:true,account_access_authorized:true,scope:'Trends research only',allowed_actions:['click','read'],approved_paid_api:false},
 budget:{max_actions:30,used_actions:2,max_paid_units:0,used_paid_units:0,max_cash_usd:0,used_cash_usd:0},
 challenge_detected:false,private_data_risk:false
});
const run=b=>checkComputerUse(b,{now:NOW});
test('one permitted action is eligible but never executed by preflight',()=>{const x=run(base());assert.equal(x.eligible,true);assert.equal(x.action_executed,false);});
test('missing tool schema is hold',()=>{const b=base();delete b.runtime.tool;assert.equal(run(b).eligible,false);});
test('tool name is not capability evidence',()=>{const b=base();b.runtime.tool={name:'browser.click'};assert.equal(run(b).eligible,false);});
test('readonly cannot click',()=>{const b=base();b.runtime.mode='READ_ONLY_TABS';assert.equal(run(b).eligible,false);});
test('readonly can read when action and policy allow',()=>{const b=base();b.runtime.mode='READ_ONLY_TABS';b.runtime.tool.advertised_actions=['read'];b.request.action='read';assert.equal(run(b).eligible,true);});
test('public search cannot export',()=>{const b=base();b.runtime.mode='PUBLIC_SEARCH';b.request.action='export';assert.equal(run(b).eligible,false);});
test('API mode cannot click',()=>{const b=base();b.runtime.mode='LICENSED_API';assert.equal(run(b).eligible,false);});
test('tool capability omitted blocks action',()=>{const b=base();b.runtime.tool.advertised_actions=['read'];assert.equal(run(b).eligible,false);});
test('stale runtime schema blocks',()=>{const b=base();b.runtime.tool.inspected_at='2026-11-21T10:00:00Z';assert.equal(run(b).eligible,false);});
test('future runtime schema blocks',()=>{const b=base();b.runtime.tool.inspected_at='2026-12-01T10:00:00Z';assert.equal(run(b).eligible,false);});
test('prohibited provider automation blocks',()=>{const b=base();b.policy.automation_status='PROHIBITED';assert.equal(run(b).status,'BLOCKED');});
test('unknown provider terms hold',()=>{const b=base();b.policy.automation_status='UNKNOWN';assert.equal(run(b).status,'HOLD');});
test('manual only terms hold',()=>{const b=base();b.policy.automation_status='MANUAL_ONLY';assert.equal(run(b).eligible,false);});
test('source not actually opened holds',()=>{const b=base();b.policy.original_opened=false;assert.equal(run(b).eligible,false);});
test('stale provider policy holds',()=>{const b=base();b.policy.checked_at='2026-11-20T10:00:00Z';assert.equal(run(b).eligible,false);});
test('action not on provider allowlist holds',()=>{const b=base();b.policy.allowed_actions=['read'];assert.equal(run(b).eligible,false);});
test('missing user approval holds',()=>{const b=base();b.user.authorized=false;assert.equal(run(b).eligible,false);});
test('no account access holds',()=>{const b=base();b.user.account_access_authorized=false;assert.equal(run(b).eligible,false);});
test('origin mismatch invalid',()=>{const b=base();b.request.url='https://semrush.com/';assert.equal(run(b).status,'INVALID');});
test('insecure URL invalid',()=>{const b=base();b.request.url='http://trends.google.com';assert.equal(run(b).status,'INVALID');});
test('budget exhaustion holds',()=>{const b=base();b.budget.used_actions=30;assert.equal(run(b).status,'HOLD');});
test('negative budget invalid',()=>{const b=base();b.budget.max_paid_units=-1;assert.equal(run(b).status,'INVALID');});
test('challenge blocks',()=>{const b=base();b.challenge_detected=true;assert.equal(run(b).status,'BLOCKED');});
test('privacy risk blocks',()=>{const b=base();b.private_data_risk=true;assert.equal(run(b).status,'BLOCKED');});
test('high impact actions never approved by research gate',()=>{for(const a of ['publish','purchase','login','submit_form','upload_private','bypass_challenge']){const b=base();b.request.action=a;assert.equal(run(b).status,'BLOCKED');}});
test('owned browser cannot assume third-party permission',()=>{const b=base();b.runtime.mode='OWNED_BROWSER';assert.equal(run(b).status,'HOLD');});
test('api needs paid authorization',()=>{const b=base();b.runtime.mode='LICENSED_API';b.runtime.tool.advertised_actions=['api_read'];b.request.action='api_read';b.policy.allowed_actions=['api_read'];b.user.allowed_actions=['api_read'];assert.equal(run(b).status,'HOLD');});
test('runtime NONE cannot act',()=>{const b=base();b.runtime.mode='NONE';assert.equal(run(b).eligible,false);});
