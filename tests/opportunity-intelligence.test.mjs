import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {PILLARS,KINDS,DECISIONS,HIGH_RISK,isPlaceholderUrl,normalizeIdeaScope,
 validateBudget,checkSource,validatePlan,assessOpportunity,safeSourceSnapshot} from '../scripts/evaluate-opportunity.mjs';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const plan=JSON.parse(fs.readFileSync(path.join(ROOT,'templates/opportunity/idea.example.json'),'utf8'));
const registry=JSON.parse(fs.readFileSync(path.join(ROOT,'sources/opportunity_source_registry_2026-11-24.json'),'utf8'));
const NOW=Date.parse('2026-11-24T07:00:00Z');
const copy=()=>structuredClone(plan);
const baseSource={
 id:'demand_01',pillar:'demand',kind:'public_market_observation',observation_type:'observed',
 url:'https://trends.google.com/trends/explore',observed_at:'2026-11-24T06:00:00Z',
 query:'image compress 50kb',geo:'IN',claim:'Interest shows a bounded relative pattern in selected geography',
 method:'Read visible interface chart and capture export',source_platform:'google_trends',
 independence_group:'google_trends_explore_photo',direction:'SUPPORTS',capture_mode:'DIRECT_EXPORT',access:'OPENED_ORIGINAL',
 artifact:'artifacts/trends-chart-export.csv',human_verified:false,
 metric:{name:'search_interest',unit:'index_0_100',scale:'relative_index',value:50,
 comparison_context:{time_window:'past_12_months',geo:'IN',term_or_topic:'term'}}
};
const e=()=>structuredClone(baseSource);
const goodPlan=()=>{
 const p=copy();p.idea.product='browser-local image tool';p.owner_authorized=true;p.license_approved=true;
 p.evidence=[e()];return p;
};
test('schema and six pillars defined',()=>{assert.equal(PILLARS.size,6);assert.ok(KINDS.has('original_user_report'));assert.ok(DECISIONS.has('GO_FOR_MVP'));});
test('safe empty example validates but cannot GO',()=>{
 assert.deepEqual(validatePlan(plan,NOW),[]);
 const x=assessOpportunity(plan,{now:NOW});assert.equal(x.valid,true);assert.notEqual(x.decision,'GO_FOR_MVP');assert.equal(x.build_authorized,false);
});
test('no evidence starts INSUFFICIENT not fake confidence',()=>{assert.equal(assessOpportunity(plan,{now:NOW}).decision,'INSUFFICIENT_EVIDENCE');});
test('idea scope explicitly includes geo and language',()=>{assert.ok(normalizeIdeaScope(plan.idea).includes('in | en'));});
test('no paid budget by default',()=>{assert.equal(plan.budget.max_paid_api_units,0);assert.equal(plan.budget.max_cash_usd,0);});
test('budget missing is rejected',()=>{assert.ok(validateBudget(null).length>0);});
test('budget rejects negative credits',()=>{const p=copy();p.budget.max_paid_api_units=-1;assert.ok(validatePlan(p,NOW).some(s=>s.includes('budget')));});
test('budget rejects NaN and Infinity',()=>{const p=copy();p.budget.max_cash_usd=Infinity;assert.ok(validatePlan(p,NOW).some(s=>s.includes('budget')));});
test('budget rejects spent greater than owner limit',()=>{const p=copy();p.budget.spent.browser_actions=40;assert.ok(validatePlan(p,NOW).some(s=>s.includes('Spent exceeds')));});
test('budget ceiling prevents runaway research',()=>{const p=copy();p.budget.max_sources=10000;assert.ok(validatePlan(p,NOW).some(s=>s.includes('review ceiling')));});
test('risk policy stop overrides every opportunity',()=>{
 const p=copy();p.risk_flags=['unauthorized_scrape'];const x=assessOpportunity(p,{now:NOW});
 assert.equal(x.decision,'STOP_POLICY');assert.equal(x.build_authorized,false);
});
test('fake human signal cannot promote idea',()=>{
 const p=goodPlan();p.evidence=[{...e(),kind:'original_user_report',human_verified:true}];
 assert.equal(assessOpportunity(p,{now:NOW}).valid,false);
});
test('one good demand source not enough for GO',()=>{const p=goodPlan();p.decision.requested='GO_FOR_MVP';const x=assessOpportunity(p,{now:NOW});assert.equal(x.decision,'TEST_FIRST');assert.ok(x.gaps.length>4);});
test('official source URL present with access and method',()=>{assert.deepEqual(checkSource(e(),NOW),[]);});
test('source with only search snippet cannot be direct observed page',()=>{const x=e();x.access='SOURCE_SNIPPET';assert.ok(checkSource(x,NOW).some(s=>s.includes('Snippet')));});
test('future source timestamp invalid',()=>{const x=e();x.observed_at='2026-12-10T00:00:00Z';assert.ok(checkSource(x,NOW).some(s=>s.includes('future')));});
test('ancient source fails freshness gate',()=>{const x=e();x.observed_at='2020-01-01T00:00:00Z';assert.ok(checkSource(x,NOW).some(s=>s.includes('stale')));});
test('metric unit required',()=>{const x=e();delete x.metric.unit;assert.ok(checkSource(x,NOW).some(s=>s.includes('Metric')));});
test('Trends chart score above 100 invalid',()=>{const x=e();x.metric.value=105;assert.ok(checkSource(x,NOW).some(s=>s.includes('outside')));});
test('Trends absolute searches mislabeled forbidden',()=>{const x=e();x.metric.scale='absolute';assert.ok(checkSource(x,NOW).some(s=>s.includes('relative')));});
test('Trends zero does not establish no demand',()=>{const x=e();x.metric.value=0;x.claim='There is no demand for this search term';assert.ok(checkSource(x,NOW).some(s=>s.includes('zero')));});
test('Trends missing comparison window invalid',()=>{const x=e();delete x.metric.comparison_context.time_window;assert.ok(checkSource(x,NOW).some(s=>s.includes('context')));});
test('Keyword Planner advertiser competition cannot equal organic difficulty',()=>{
 const x=e();x.source_platform='google_keyword_planner';x.metric={name:'competition',unit:'organic_difficulty',scale:'estimate',value:15};
 assert.ok(checkSource(x,NOW).some(s=>s.includes('advertiser')));
});
test('Semrush competitor visits must be modeled',()=>{
 const x=e();x.source_platform='semrush';x.kind='licensed_estimate';x.observation_type='estimated';
 x.metric={name:'competitor_organic_visits',unit:'visits_per_month',scale:'absolute',value:12000};
 assert.ok(checkSource(x,NOW).some(s=>s.includes('modeled')));
});
test('licensed estimate cannot assert owner-observed traffic',()=>{
 const x=e();x.kind='licensed_estimate';assert.ok(checkSource(x,NOW).some(s=>s.includes('not owner-observed')));
});
test('two syndications same independence group not two independent pains',()=>{
 const p=goodPlan();const a=e();a.id='user1';a.kind='original_user_report';a.pillar='human_pain';a.source_platform='reddit';a.metric=undefined;a.observation_type='quoted';
 const b={...a,id:'user2',url:'https://www.news.example.org/copy'};
 p.evidence=[e(),a,b];
 const x=assessOpportunity(p,{now:NOW});assert.equal(x.gates.per_pillar.human_pain,1);
});
test('independent user reports still do not prove market fit',()=>{
 const p=goodPlan();const a=e();a.id='u1';a.pillar='human_pain';a.kind='original_user_report';a.observation_type='quoted';delete a.metric;a.source_platform='reddit';
 const b={...a,id:'u2',independence_group:'other_thread',url:'https://github.com/example/example/issues/1'};
 p.evidence=[e(),a,b];p.decision.requested='GO_FOR_MVP';
 const x=assessOpportunity(p,{now:NOW});assert.equal(x.decision,'TEST_FIRST');assert.equal(x.gates.per_pillar.human_pain,2);
});
test('contradictory evidence is reported not silently discarded',()=>{
 const p=goodPlan();const b=e();b.id='counter';b.direction='CONTRADICTS';b.independence_group='negative_result';
 p.evidence.push(b);const x=assessOpportunity(p,{now:NOW});
 assert.deepEqual(x.gates.contradicting_sources,['counter']);assert.ok(x.gaps.some(s=>s.includes('Contradictory')));
});
test('synthetic/placeholder data cannot count as external',()=>{
 const x=e();x.capture_mode='SIMULATED';assert.ok(checkSource(x,NOW).some(s=>s.includes('Synthetic')));
});
test('placeholder source URL cannot be external proof',()=>{
 const x=e();x.url='https://example.com/';assert.equal(isPlaceholderUrl(x.url),true);
 assert.ok(checkSource(x,NOW).some(s=>s.includes('Synthetic')));
});
test('HTTP source not allowed',()=>{const x=e();x.url='http://trends.google.com';assert.ok(checkSource(x,NOW).some(s=>s.includes('HTTPS')));});
test('incorrect input source type rejected',()=>{const x=e();x.kind='mystery';assert.ok(checkSource(x,NOW).some(s=>s.includes('classification')));});
test('missing privacy-safe capture artifact rejected',()=>{const x=e();x.artifact='';assert.ok(checkSource(x,NOW).some(s=>s.includes('artifact')));});
test('duplicate evidence IDs rejected',()=>{const p=goodPlan();p.evidence.push(e());assert.ok(validatePlan(p,NOW).some(s=>s.includes('Duplicate')));});
test('missing candidate customer invalid',()=>{const p=copy();p.idea.customer='';assert.ok(validatePlan(p,NOW).some(s=>s.includes('customer')));});
test('unexpected stage fails',()=>{const p=copy();p.stage='rank_domination';assert.ok(validatePlan(p,NOW).some(s=>s.includes('stage')));});
test('unknown permission flags fail',()=>{const p=copy();delete p.license_approved;assert.ok(validatePlan(p,NOW).some(s=>s.includes('Permission')));});
test('unknown risk array fails',()=>{const p=copy();delete p.risk_flags;assert.ok(validatePlan(p,NOW).some(s=>s.includes('Risk')));});
test('owner authorization absent blocks MVP',()=>{const p=goodPlan();p.owner_authorized=false;p.decision.requested='GO_FOR_MVP';assert.equal(assessOpportunity(p,{now:NOW}).decision,'TEST_FIRST');});
test('unseen competitor test leaves hard epistemic gap',()=>{const p=goodPlan();assert.ok(assessOpportunity(p,{now:NOW}).gaps.some(s=>s.includes('competitor')));});
test('no validated output oracle leaves gap',()=>{const p=goodPlan();assert.ok(assessOpportunity(p,{now:NOW}).gaps.some(s=>s.includes('output-oracle')));});
test('no independent acquisition pilot leaves gap',()=>{const p=goodPlan();assert.ok(assessOpportunity(p,{now:NOW}).gaps.some(s=>s.includes('acquisition')));});
test('no cost scenario leaves gap',()=>{const p=goodPlan();assert.ok(assessOpportunity(p,{now:NOW}).gaps.some(s=>s.includes('costed')));});
test('local decision includes caveat about real source verification',()=>{const x=assessOpportunity(goodPlan(),{now:NOW});assert.ok(x.rationale.includes('structural only'));});
test('remove secrets from snapshots before downstream report',()=>{
 const x=safeSourceSnapshot({cookie:'c',authorization:'b',token:'t',email:'a@b.test',api_key:'key',username:'bob',password:'pass',personal_data:'private',source:'Google'});
 assert.deepEqual(x,{source:'Google'});
});
test('source registry has 25+ providers and original access distinctions',()=>{
 assert.ok(registry.records.length>=25);
 assert.ok(registry.records.some(x=>x.inspection==='ORIGINAL_OPENED'));
 assert.ok(registry.records.some(x=>x.inspection==='SEARCH_EXCERPT'));
 assert.ok(registry.records.every(x=>x.url.startsWith('https://')));
 assert.equal(new Set(registry.records.map(x=>x.id)).size,registry.records.length);
});
test('actual browser GUI is not claimed by fixture',()=>{
 const x=assessOpportunity(plan,{now:NOW});assert.equal(x.build_authorized,false);assert.equal(x.gates.valid_sources,0);
});
test('same source can be neutral and does not count supporting group',()=>{
 const p=goodPlan();p.evidence[0].direction='NEUTRAL';const x=assessOpportunity(p,{now:NOW});
 assert.equal(x.gates.per_pillar.demand,0);
});
test('full negative evidence can trigger project reject without pretending source verification',()=>{
 const p=copy();p.decision.requested='REJECT';assert.equal(assessOpportunity(p,{now:NOW}).decision,'REJECT');
});
test('fake account data not silently accepted as first party metric',()=>{
 const x=e();x.kind='licensed_estimate';x.metric.name='competitor_organic_visits';x.source_platform='semrush';x.observation_type='observed';
 assert.ok(checkSource(x,NOW).length>0);
});
