import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {auditPortfolio,auditFieldPacket} from '../scripts/audit-tier1-opportunity-v34.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const load=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const portfolio=load('sources/tier1_utility_market_v34.json');
const blank=load('templates/tier1-v34/evidence-packet.NOT_RUN.json');
const today=Date.parse('2026-11-26T23:59:00Z');
test('V34 portfolio has 40 distinct hypotheses and source mappings with no fictional verified ROI',()=>{
 const r=auditPortfolio(portfolio);
 assert.equal(r.status,'RESEARCH_INDEX_STRUCTURAL_PASS_NOT_MARKET_VALIDATED',JSON.stringify(r));
 assert.equal(r.ranked_opportunity_verified,false);
 assert.equal(r.revenue_verified,false);
 assert.equal(portfolio.candidates.length,40);
 assert.ok(portfolio.sources.length>=25);
});
test('V34 provisional evidence packet blocks discovery and never approves a build',()=>{
 const r=auditFieldPacket(blank,{now:today});
 assert.equal(r.status,'HOLD_DISCOVERY');
 assert.equal(r.errors.length,0);
 assert.ok(r.hold.some(x=>x.includes('US_KEYWORD')));
 assert.equal(r.build_authorized_by_this_tool,false);
});
test('V34 rejects self-proclaimed GO without external benchmarks',()=>{
 const p=structuredClone(blank);p.decision_requested='GO';
 const r=auditFieldPacket(p,{now:today});
 assert.equal(r.status,'HOLD_INVALID');assert.ok(r.errors.includes('PREMATURE_GO_MISSING_EXTERNAL_EVIDENCE'));
});
test('V34 rejects advertising click farms and purported external AdSense approval',()=>{
 const p=structuredClone(blank);p.artificial_traffic=true;p.adsense_approval_claimed=true;
 const r=auditFieldPacket(p,{now:today});
 assert.ok(r.errors.includes('INVALID_TRAFFIC_HARD_STOP'));
 assert.ok(r.errors.includes('UNAUTHENTICATED_EXTERNAL_OUTCOME_CLAIM'));
});
test('V34 rejects Trends relative interest called monthly search volume',()=>{
 const p=structuredClone(blank);p.keyword_receipts=[{
  country:'US',keyword:'heic to jpg',source_url:'https://trends.google.com/trends/explore',
  original_export_receipt:'Synthetic artifact for test purposes only',
  metric:'GOOGLE_TRENDS_RELATIVE',monthly_searches:10000
 }];
 const r=auditFieldPacket(p,{now:today});
 assert.ok(r.errors.includes('TRENDS_VOLUME_FABRICATION'));
});
test('V34 rejects advertiser CPC as publisher RPM and organic keyword difficulty',()=>{
 const p=structuredClone(blank);p.keyword_receipts=[{
  country:'US',keyword:'heic to jpg',source_url:'https://ads.google.com/',
  original_export_receipt:'Synthetic artifact for test purposes only',
  metric:'ADVERTISER_CPC',publisher_rpm:8,organic_difficulty:'LOW'
 }];
 const r=auditFieldPacket(p,{now:today});
 assert.ok(r.errors.includes('ADVERTISER_TO_PUBLISHER_OR_SEO_CONFUSION'));
});
test('V34 rejects a third-party research source mislabeled as authenticated demand',()=>{
 const bad=structuredClone(portfolio);bad.candidates[0].geo_volume_verified.US='OWN_GSC_VERIFIED';
 const r=auditPortfolio(bad);assert.ok(r.errors.some(x=>x.startsWith('MODELED_VOLUME_MISLABELED:')));
});
test('V34 rejects made-up source IDs and ranking proofs',()=>{
 const bad=structuredClone(portfolio);bad.candidates[0].source_ids=['FAKE_ACCOUNT_REPORT'];
 bad.candidates[1].adsense_rpm=10;
 const r=auditPortfolio(bad);
 assert.ok(r.errors.some(x=>x.startsWith('UNKNOWN_SOURCE_ID:')));
 assert.ok(r.errors.some(x=>x.startsWith('UNVERIFIED_PUBLISHER_RPM:')));
});
test('V34 allows structurally complete packet only as unverified human review, never GO by program',()=>{
 const p=structuredClone(blank);
 p.owner_authorized=true;p.authentic_exports_confirmed=true;p.independent_reviewer_confirmed=true;
 p.product_oracle_confirmed=true;
 for(const country of ['US','GB','CA','AU']){
  const key=country==='US'?'GKP_US_MONTHLY_SEARCHES':'MODELED_MONTHLY_SEARCHES';
  p.keyword_receipts.push({country,keyword:'heic to jpg',source_url:'https://support.google.com/google-ads/answer/7337243',
   original_export_receipt:'Synthetic operator report identifier not authentically reviewed',
   metric:key,searches:100,export_authenticated_by_owner:true});
 }
 p.keyword_receipts=p.keyword_receipts.filter(k=>k.country==='US'); // other region models are not authenticated US Google exports
 p.fixtures=['NORMAL','MALFORMED','BOUNDARY'].map((kind,i)=>({id:'fixture-'+i,kind,source_receipt:'Synthetic test binary and golden result path',oracle:'Independent desktop converter image test receipt'}));
 p.competitor_runs=['a.example.net','b.example.net','c.example.net'].map((d)=>({site_url:'https://'+d,actual_output_receipt:'Synthetic output file retained',independent_test_receipt:'Independent oracle row receipt'}));
 p.user_sessions=Array.from({length:5},(_,i)=>({consented_session_receipt:'Synthetic consented note '+i,actual_file_task:'Synthetic task to convert an old HEIC file'}));
 const r=auditFieldPacket(p,{now:today});
 assert.equal(r.build_authorized_by_this_tool,false);
 assert.equal(r.source_artifact_authenticity_verified,false);
 assert.ok(r.hold.some(x=>x.startsWith('GB_')));
});
