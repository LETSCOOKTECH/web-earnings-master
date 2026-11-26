import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {checkResearchPacket,calculateScenario,STAGES,UNITS} from '../scripts/audit-adsense-business-v32.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const sample=JSON.parse(read('templates/adsense-v32/operator-evidence.example.json'));
const date=Date.parse('2026-11-26T15:00:00Z');
const e=(id,kind,origin_id,unit=UNITS[kind])=>({id,kind,origin_id,unit,observed_at:'2026-11-26',
 url:'https://support.google.com/adsense/answer/48182',receipt:'Operator original evidence artifact reference '+id,
 observation:'Synthetic fixture claims are not verified actual performance and need independent source review',
 ...(kind==='FIRST_PARTY_POLICY'?{claim_scope:'Current Google publisher policy and account approval are externally controlled'}:{})});
function full(){
 const p=structuredClone(sample);
 p.evidence=[
  e('user1','USER_PAIN','interview1'),
  e('planner1','PLANNER_SEARCH_ESTIMATE','google-ads-authorized1'),
  e('serp1','PUBLIC_SERP','search-visible'),
  e('competitor1','COMPETITOR_TASK','same-input-lab'),
  e('ownedgsc1','OWN_SEARCH_CONSOLE','owner-account'),
  e('product1','OWN_PRODUCT','owner-analytics'),
  e('policy1','FIRST_PARTY_POLICY','google-policy'),
  e('adsense1','OWN_ADSENSE','owner-adsense'),
  e('cost1','COST_RECEIPT','owner-invoices')
 ];
 p.fixtures=[
  {id:'normal',kind:'NORMAL',input:'valid CSV sample.csv',expected:'Golden complete JSON output',oracle:'Independent deterministic converter oracle'},
  {id:'malformed',kind:'MALFORMED',input:'malformed invalid JSON',expected:'Explicit typed parsing error',oracle:'Independent invalid data fixture validator'},
  {id:'boundary',kind:'BOUNDARY',input:'unusual high 64bit input',expected:'Exact preserved precision',oracle:'Independent extended numeric precision tool'}
 ];
 p.competitors=['one.testcase.io','two.testcase.io','three.testcase.io'].map((domain,i)=>({
  domain,fixture_id:['normal','malformed','boundary'][i],
  observed_result:'Simulated competitor output inspected with test artifact',
  weakness_or_counterevidence:'Simulated failure only; actual origin must be independently retested',
  receipt:'synthetic competitor browser run reference '+i
 }));
 p.competitor_gap_confirmed_by_independent_test=true;
 p.product={independent_test_passed:true,security_review_passed:true,accessibility_review_passed:true,build_receipt:'CI simulated green output receipt'};
 p.deployment={production_url:'https://sampledomain-research.org/',owner_confirms_deployed:true,robots_allows_googlebot:true,
 noindex_removed:true,canonical_checked:true,real_gsc_inspection_receipt:'Synthetic GSC owner screenshot reference'};
 p.distribution={invalid_traffic_checks_passed:true,forced_or_incentivized_ad_interactions:false,proxies_or_fake_visitors:false,
 human_acquisition_receipt:'Synthetic human analytics acquisition record'};
 p.adsense={site_status:'Ready',owner_attests_real_google_account:true,publisher_value_review:true,current_policy_recheck:true,
 ad_placement_browser_review:true,consent_applicability_review:true,account_evidence_receipt:'Synthetic owner Google Sites screenshot proof'};
 p.economics={pageviews:10000,estimated_earnings_usd:35,settled_revenue_usd:30,cash_costs_usd:25,
 owner_reconciled_cash:true,settlement_receipt:'Synthetic owner invoice and bank transfer'};
 return p;
}
test('V32 atlas covers exactly seven stage families with dated original-source links',()=>{
 const data=JSON.parse(read('sources/adsense_growth_primary_atlas_v32.json'));
 assert.equal(data.schema,'sense-adsense-source-atlas-v32');
 assert.equal(data.stages.length,7);
 assert.ok(data.records.length>=35);
 for(const stage of STAGES)assert.ok(data.records.filter(x=>x.stage===stage).length>=3,stage);
 assert.ok(data.records.some(x=>x.id==='competitor_ai'&&x.evidence_status==='OPENED_OFFICIAL_PAGE_2026_11_26'));
 assert.ok(data.records.every(x=>/^https:\/\/(developers\.google\.com|support\.google\.com|web\.dev)\//.test(x.official_url)));
});
test('original 50 registered skills preserved; V32 is not silently counted in .agents',()=>{
 const registry=JSON.parse(read('sources/skill-network-v23.json'));
 assert.equal(registry.declared_active_skills,50);
 assert.ok(read('extensions/v32/skills/web-adsense-evidence-growth-operator/SKILL.md').includes('name: web-adsense-evidence-growth-operator'));
 assert.ok(read('AGENTS.md').startsWith('## V13 MANDATORY'));
});
test('sample is explicitly hypothetical and all seven stages block before build',()=>{
 const r=checkResearchPacket(sample,{now:date});
 assert.equal(r.status,'EVIDENCE_PACKET_VALID_NOT_BUSINESS_CERTIFIED');
 assert.equal(r.errors.length,0);
 assert.equal(r.blockers.length,7);
 assert.equal(r.authorized_to_build_automatically,false);
 assert.equal(r.ad_approval_verified_by_google,false);
 assert.equal(r.income_verified_by_bank,false);
 assert.equal(r.ranking_guarantee,false);
});
test('a synthetic fully populated packet is still not independently authenticated or approved',()=>{
 const r=checkResearchPacket(full(),{now:date});
 assert.equal(r.errors.length,0,JSON.stringify(r.errors));
 assert.equal(r.blockers.length,0,JSON.stringify(r.stageDetails));
 assert.equal(r.status,'EVIDENCE_PACKET_VALID_NOT_BUSINESS_CERTIFIED');
 assert.equal(r.authorized_to_build_automatically,false);
 assert.equal(r.ad_approval_verified_by_google,false);
 assert.equal(r.income_verified_by_bank,false);
 assert.equal(r.reconciled_owner_data.independently_authenticated,false);
});
test('do not manufacture monthly search volume from Trends relative indices',()=>{
 const p=full();p.evidence.push({...e('trends2','TRENDS_RELATIVE','google-trends'),monthly_searches:8000});
 const r=checkResearchPacket(p,{now:date});
 assert.ok(r.errors.some(x=>x.startsWith('TRENDS_CANNOT_ASSERT_ABSOLUTE_VOLUME')));
});
test('Google Ads advertiser competition cannot be recast as easy organic keyword difficulty',()=>{
 const p=full();p.evidence.push({...e('adscompetition','PLANNER_AD_COMPETITION','gads'),organic_keyword_difficulty:'LOW'});
 assert.ok(checkResearchPacket(p,{now:date}).errors.some(x=>x.startsWith('ADVERTISER_COMPETITION_NOT_ORGANIC_KD')));
});
test('Ahrefs modeled organic traffic does not count as verified owned GSC data',()=>{
 const p=full();p.evidence.push({...e('estimate1','THIRD_PARTY_ORGANIC','ahrefs'),claimed_verified_traffic:true});
 assert.ok(checkResearchPacket(p,{now:date}).errors.some(x=>x.startsWith('MODELED_TRAFFIC_NOT_REAL_GSC')));
});
test('sources must be unique, dated, real HTTPS, match units and contain receipts',()=>{
 const p=full();p.evidence[1].id=p.evidence[0].id;
 p.evidence[2].url='http://localhost:8123';
 p.evidence[3].unit='KEYWORDS_PER_MINUTE';
 p.evidence[4].observed_at='2099-10-20';
 p.evidence[5].receipt='';
 const r=checkResearchPacket(p,{now:date});
 for(const x of ['DUPLICATE_OR_MISSING_EVIDENCE_ID','HTTPS_REAL_SOURCE_URL_REQUIRED','EVIDENCE_KIND_UNIT_MISMATCH','EVIDENCE_DATE_INVALID','RAW_RECEIPT_OR_OBSERVATION_MISSING'])
 assert.ok(r.errors.some(y=>y.startsWith(x)),x);
});
test('source age triggers recheck warnings; future date fails',()=>{
 const p=full();p.evidence.find(x=>x.kind==='FIRST_PARTY_POLICY').observed_at='2026-01-01';
 let r=checkResearchPacket(p,{now:date});
 assert.ok(r.warnings.some(x=>x.startsWith('STALE_REVERIFY:')));
 p.researched_on='2099-01-01';
 r=checkResearchPacket(p,{now:date});
 assert.ok(r.errors.includes('RESEARCH_DATE_MISSING_OR_INVALID'));
});
test('invalid traffic proxy farms block even when every other synthetic gate claims PASS',()=>{
 const p=full();p.distribution.proxies_or_fake_visitors=true;
 const r=checkResearchPacket(p,{now:date});
 assert.equal(r.status,'HOLD_INVALID');
 assert.ok(r.errors.includes('INVALID_TRAFFIC_RISK_HARD_STOP'));
 assert.equal(r.stageDetails.find(x=>x.stage==='REAL_DISTRIBUTION').passed,false);
});
test('synthetic AdSense Ready without owner attestation is hard-held',()=>{
 const p=full();p.adsense.owner_attests_real_google_account=false;
 const r=checkResearchPacket(p,{now:date});
 assert.ok(r.errors.includes('READY_CLAIM_WITHOUT_ACCOUNT_OWNER_ATTESTATION'));
 assert.equal(r.stageDetails.find(x=>x.stage==='ADSENSE_SITE_ACCOUNT').passed,false);
});
test('ads.txt or code cannot replace actual account-ready claim',()=>{
 const p=full();p.adsense.site_status='OWNERSHIP_VERIFIED';
 const r=checkResearchPacket(p,{now:date});
 assert.equal(r.errors.length,0);
 assert.equal(r.stageDetails.find(x=>x.stage==='ADSENSE_SITE_ACCOUNT').passed,false);
});
test('three competitors must be distinct, same-input and artifact-backed',()=>{
 const p=full();p.competitors[1].domain=p.competitors[0].domain;
 let r=checkResearchPacket(p,{now:date});
 assert.equal(r.stageDetails.find(x=>x.stage==='COMPETITOR_GAP').passed,false);
 p.competitors=full().competitors;
 p.competitors[0].fixture_id='missing-from-test-set';
 r=checkResearchPacket(p,{now:date});
 assert.equal(r.stageDetails.find(x=>x.stage==='COMPETITOR_GAP').passed,false);
});
test('product does not pass without normal malformed and boundary independent oracles',()=>{
 const p=full();p.fixtures=p.fixtures.filter(x=>x.kind!=='BOUNDARY');
 const r=checkResearchPacket(p,{now:date});
 assert.equal(r.stageDetails.find(x=>x.stage==='PRODUCT_ORACLE').passed,false);
});
test('site cannot be claimed indexed without actual GSC and production evidence',()=>{
 const p=full();p.deployment.noindex_removed=false;
 const r=checkResearchPacket(p,{now:date});
 assert.equal(r.stageDetails.find(x=>x.stage==='SEARCH_DEPLOYMENT').passed,false);
});
test('earnings cannot be reconciled without publisher revenue and cost receipts',()=>{
 const p=full();p.evidence=p.evidence.filter(x=>x.kind!=='COST_RECEIPT');
 const r=checkResearchPacket(p,{now:date});
 assert.equal(r.stageDetails.find(x=>x.stage==='RECONCILED_ECONOMICS').passed,false);
});
test('estimated earnings below settled payouts is held for human cross-period reconciliation',()=>{
 const p=full();p.economics.settled_revenue_usd=100;
 const r=checkResearchPacket(p,{now:date});
 assert.ok(r.errors.includes('SETTLED_EARNINGS_EXCEED_ESTIMATED_VERIFY_REPORTING'));
});
test('fake guarantee language fails instead of becoming SEO 100/100 proof',()=>{
 const p=full();p.job.hypothesis='100% Adsense approved guaranteed ranking and profit';
 const r=checkResearchPacket(p,{now:date});
 assert.ok(r.errors.includes('GUARANTEED_OUTCOME_CLAIM'));
});
test('RPM calculation is correct but explicitly only a scenario, not real revenue',()=>{
 const r=calculateScenario({monthly_pageviews:100000,page_rpm_usd:1,monthly_cash_costs_usd:40});
 assert.equal(r.gross_revenue_usd,100);
 assert.equal(r.net_before_taxes_adjustments_usd,60);
 assert.equal(r.min_pageviews_to_cover_cash_costs,40000);
 assert.equal(r.does_not_predict_real_income,true);
 assert.equal(r.kind,'HYPOTHETICAL_ONLY_NOT_PROVIDER_BENCHMARK');
});
test('scenario protects against input NaN, negative values and impossible source assertions',()=>{
 assert.throws(()=>calculateScenario({monthly_pageviews:-10,page_rpm_usd:1}),/NONNEGATIVE/);
 assert.throws(()=>calculateScenario({monthly_pageviews:NaN,page_rpm_usd:1}),/NONNEGATIVE/);
 assert.throws(()=>calculateScenario({monthly_pageviews:1e12,page_rpm_usd:1}),/IMPLAUSIBLE/);
 assert.equal(calculateScenario({monthly_pageviews:0,page_rpm_usd:0,monthly_cash_costs_usd:10}).min_pageviews_to_cover_cash_costs,null);
});
test('no extra special AI schema or automatic ranking/approval claims in V32 contract',()=>{
 const s=read('extensions/v32/skills/web-adsense-evidence-growth-operator/SKILL.md');
 assert.match(s,/no mandatory/);
 assert.match(s,/not a Google ranking guarantee/i);
 assert.match(s,/AdSense site/account/i);
 assert.match(s,/no automatic background/i);
});
