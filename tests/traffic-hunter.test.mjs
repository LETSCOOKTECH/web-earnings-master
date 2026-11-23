import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
 FAMILIES,SCORE_WEIGHTS,HARD_STOP_FLAGS,urlAssessment,buildExternalCampaignUrl,attributeArrival,
 scoreCandidate,calculateObservedEconomics,policyFresh,validateManifest,evaluateCandidate,
 evaluateTrafficPlan,auditSourceRegistry
} from '../scripts/evaluate-traffic-hunter.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const sample=JSON.parse(fs.readFileSync(path.join(root,'templates/traffic-hunter/opportunity-plan.example.json'),'utf8'));
const sources=JSON.parse(fs.readFileSync(path.join(root,'sources/traffic_hunter_sources_2026_11_23.json'),'utf8'));
const realLooking='https://www.utility-labs.tools/compress';
const NOW=Date.parse('2026-11-23T19:00:00.000Z');
const newCopy=()=>structuredClone(sample);
function prepared(){
 const m=newCopy();
 m.demo=false;m.site.url=realLooking;m.site.verified_working=true;m.site.task_fixture='artifacts/output-fixture-sha256.txt';
 m.constraints.ads_monetized=false;m.constraints.consent_recheck_required=false;m.constraints.owner_authorized=true;
 m.constraints.paid_budget_limit=100;
 m.candidates=m.candidates.slice(0,1);
 const c=m.candidates[0];c.landing_url=realLooking;c.approval=true;
 c.policy={url:'https://developers.google.com/search/docs/essentials',status:'verified',reviewed_at:'2026-11-23T18:30:00.000Z',original_body_opened:true};
 return m;
}
test('registry has at least twenty primary source leads and honest inspection states',()=>{
 assert.ok(sources.records.length>=20);assert.deepEqual(auditSourceRegistry(sources),[]);
 assert.ok(sources.records.some(x=>x.verification==='opened_primary_page'));
 assert.ok(sources.records.some(x=>x.verification==='search_confirmed'));
});
test('source registry rejects duplicated key',()=>{const a=structuredClone(sources);a.records.push({...a.records[0]});assert.ok(auditSourceRegistry(a).some(s=>s.includes('Duplicate')));});
test('source registry rejects HTTP URL',()=>{const a=structuredClone(sources);a.records[0].url='http://bad.example';assert.ok(auditSourceRegistry(a).some(s=>s.includes('HTTPS')));});
test('exact score weights sum to 100 and channels include required families',()=>{
 assert.equal(Object.values(SCORE_WEIGHTS).reduce((a,b)=>a+b,0),100);
 for(const k of ['ai_search','community','paid','developer','institutional'])assert.ok(FAMILIES.includes(k));
});
test('example plan is parseable but remains fully unapproved',()=>{
 assert.deepEqual(validateManifest(sample),[]);
 const r=evaluateTrafficPlan(sample,NOW);assert.equal(r.valid,true);assert.equal(r.summary.ready_for_review,0);
 assert.equal(r.suggested_pilots.length,0);assert.equal(r.remote_actions,false);
});
test('candidate ordinal priority is deterministic and never traffic prediction',()=>{
 const m=newCopy();const r=evaluateTrafficPlan(m,NOW);
 assert.ok(r.candidates[0].ordinal_priority>=r.candidates[1].ordinal_priority);
 assert.ok(r.candidates.every(x=>x.warning.includes('not predicted visits')));
});
test('reject invalid score dimensions',()=>{
 assert.throws(()=>scoreCandidate({}),/integer/);assert.throws(()=>scoreCandidate({...sample.candidates[0].score,speed:6}),/integer/);
});
test('all scores 5 => 100; all 0 => 0',()=>{
 const scores=sample.candidates[0].score;
 assert.equal(scoreCandidate(Object.fromEntries(Object.keys(scores).map(k=>[k,5]))),100);
 assert.equal(scoreCandidate(Object.fromEntries(Object.keys(scores).map(k=>[k,0]))),0);
});
test('duplicate candidate IDs invalid',()=>{const m=newCopy();m.candidates[1].id=m.candidates[0].id;assert.ok(validateManifest(m).some(e=>e.includes('duplicate')));});
test('missing user job invalid',()=>{const m=newCopy();m.site.user_job='';assert.ok(validateManifest(m).some(e=>e.includes('Site identity')));});
test('wrong family invalid',()=>{const m=newCopy();m.candidates[0].family='growth_hack';assert.ok(validateManifest(m).some(e=>e.includes('unknown channel')));});
test('no candidates invalid',()=>{const m=newCopy();m.candidates=[];assert.ok(validateManifest(m).some(e=>e.includes('At least one')));});
test('missing owner authorization state invalid',()=>{const m=newCopy();delete m.constraints.owner_authorized;assert.ok(validateManifest(m).some(e=>e.includes('controls')));});
test('invalid HTTPS/referrer credentials blocked',()=>{
 assert.equal(urlAssessment('http://site.invalid').ok,false);
 assert.equal(urlAssessment('https://alice:secret@public.example.com').ok,false);
});
test('reject sensitive email and token parameters in external URLs',()=>{
 assert.equal(urlAssessment('https://www.utility-labs.tools?a=2&email=a%40b.com').ok,false);
 assert.equal(urlAssessment('https://www.utility-labs.tools?token=abc').ok,false);
});
test('reserved example host cannot count as production evidence',()=>{
 assert.equal(urlAssessment('https://tools.example.org/').ok,true);
 assert.equal(urlAssessment('https://tools.example.org/',{production:true}).ok,false);
});
test('external UTM builder creates tagged URL with no internal links',()=>{
 const u=buildExternalCampaignUrl(realLooking,{source:'youtube',medium:'organic_video',campaign:'photo_50kb_demo'});
 assert.equal(new URL(u).searchParams.get('utm_source'),'youtube');assert.ok(u.includes('utm_campaign='));
 assert.throws(()=>buildExternalCampaignUrl(realLooking,{source:'x',medium:'social',campaign:'launch'},{internal:true}),/internal/);
});
test('UTM builder refuses inherited UTM attribution collision',()=>{
 assert.throws(()=>buildExternalCampaignUrl(realLooking+'?utm_campaign=old',{source:'youtube',medium:'social',campaign:'new'}),/Existing/);
});
test('UTM builder rejects email and unsupported keys',()=>{
 assert.throws(()=>buildExternalCampaignUrl(realLooking,{source:'hello@example.com',medium:'social',campaign:'x'}),/unsafe/);
 assert.throws(()=>buildExternalCampaignUrl(realLooking,{source:'reddit',medium:'social',campaign:'a',email:'x'}),/Unsupported/);
});
test('an AI referrer is observed, not inferred from Direct',()=>{
 assert.equal(attributeArrival({referrer:'https://chatgpt.com/c/abc'}).channel,'ai_referral_observed');
 assert.equal(attributeArrival({referrer:''}).channel,'unknown');
});
test('domain-lookalike is not a ChatGPT source',()=>{
 assert.notEqual(attributeArrival({referrer:'https://notchatgpt.com/'}).channel,'ai_referral_observed');
});
test('UTM self-report without genuine referrer is not verified AI',()=>{
 const r=attributeArrival({utm_source:'chatgpt',utm_medium:'referral'});assert.equal(r.channel,'campaign_declared');assert.equal(r.certainty,'utm_not_user_verified');
});
test('candidate with verified form and current policy only becomes human review ready',()=>{
 const m=prepared();const r=evaluateTrafficPlan(m,NOW);
 assert.equal(r.summary.ready_for_review,1);
 assert.equal(r.candidates[0].status,'READY_FOR_HUMAN_REVIEW');
 assert.equal(r.candidates[0].allowed_remote_actions,false);
});
test('no owner approval blocks even high-scoring candidate',()=>{
 const m=prepared();m.candidates[0].approval=false;const r=evaluateTrafficPlan(m,NOW);
 assert.equal(r.candidates[0].status,'HOLD');
});
test('stale official policy blocks candidate',()=>{
 const m=prepared();m.candidates[0].policy.reviewed_at='2026-11-20T12:00:00.000Z';
 assert.equal(policyFresh(m.candidates[0].policy,NOW),false);
 assert.equal(evaluateTrafficPlan(m,NOW).candidates[0].status,'HOLD');
});
test('future-dated or excerpt-only policy blocks candidate',()=>{
 const m=prepared();m.candidates[0].policy.original_body_opened=false;
 assert.equal(evaluateTrafficPlan(m,NOW).candidates[0].status,'HOLD');
 m.candidates[0].policy.original_body_opened=true;m.candidates[0].policy.reviewed_at='2026-11-25T00:00:00.000Z';
 assert.equal(evaluateTrafficPlan(m,NOW).candidates[0].status,'HOLD');
});
test('hard stop traffic exchanges even with all approval and high scores',()=>{
 const m=prepared();m.candidates[0].risk_flags=['traffic_inflation'];
 assert.ok(HARD_STOP_FLAGS.has('traffic_inflation'));
 assert.equal(evaluateTrafficPlan(m,NOW).candidates[0].status,'STOP');
});
test('hard stop compensated fake reviews',()=>{
 const m=prepared();m.candidates[0].risk_flags=['fake_reviews'];
 assert.equal(evaluateTrafficPlan(m,NOW).candidates[0].status,'STOP');
});
test('hard stop unapproved source policy',()=>{
 const m=prepared();m.candidates[0].policy.status='prohibited';
 assert.equal(evaluateTrafficPlan(m,NOW).candidates[0].status,'STOP');
});
test('unknown risk flag cannot silently be accepted',()=>{
 const m=prepared();m.candidates[0].risk_flags=['novel_regulatory_unknown'];
 assert.equal(evaluateTrafficPlan(m,NOW).candidates[0].status,'HOLD');
});
test('paid channel must be capped even with apparent benefit',()=>{
 const m=prepared();m.candidates[0].family='paid';m.constraints.paid_budget_limit=0;
 assert.equal(evaluateTrafficPlan(m,NOW).candidates[0].status,'STOP');
});
test('expense above approved cap stops a campaign',()=>{
 const m=prepared();m.candidates[0].planned_cost=101;
 assert.equal(evaluateTrafficPlan(m,NOW).candidates[0].status,'STOP');
});
test('publisher policy recheck keeps campaign in hold',()=>{
 const m=prepared();m.constraints.ads_monetized=true;m.constraints.consent_recheck_required=true;
 assert.equal(evaluateTrafficPlan(m,NOW).candidates[0].status,'HOLD');
});
test('unknown economics stays unknown, never fake zero',()=>{
 const e=calculateObservedEconomics(null);
 assert.equal(e.status,'UNKNOWN');assert.equal(e.contribution,null);assert.equal(e.cost_per_completion,null);
});
test('valid observed economics uses same measured cohort',()=>{
 const e=calculateObservedEconomics({qualified_sessions:100,task_starts:60,validated_completions:40,attributed_revenue:100,media_spend:20,incremental_cost:10});
 assert.equal(e.task_success_rate,40/60);assert.equal(e.cost_per_completion,30/40);assert.equal(e.contribution,70);
});
test('zero conversions cannot produce artificially cheap CPA',()=>{
 const e=calculateObservedEconomics({task_starts:10,validated_completions:0,attributed_revenue:null,media_spend:25,incremental_cost:10});
 assert.equal(e.status,'NO_COMPLETIONS');assert.equal(e.cost_per_completion,null);assert.equal(e.contribution,null);
});
test('reject negative or infinity observations',()=>{
 assert.throws(()=>calculateObservedEconomics({task_starts:-1}),/negative/);
 assert.throws(()=>calculateObservedEconomics({media_spend:Infinity}),/negative/);
});
test('reject impossible successful tasks and qualified sessions',()=>{
 assert.throws(()=>calculateObservedEconomics({task_starts:2,validated_completions:3}),/exceed/);
 assert.throws(()=>calculateObservedEconomics({sessions:2,qualified_sessions:3}),/exceed/);
});
test('no destination user data permitted in campaign URL',()=>{
 assert.throws(()=>buildExternalCampaignUrl(realLooking+'?filename=private.jpg',{source:'youtube',medium:'video',campaign:'foo'}),/Sensitive/);
});
test('no implicit publishing capability present in evaluator',()=>{
 const r=evaluateTrafficPlan(prepared(),NOW);
 assert.equal(r.remote_actions,false);assert.ok(r.disclaimer.includes('No live posting'));
});
