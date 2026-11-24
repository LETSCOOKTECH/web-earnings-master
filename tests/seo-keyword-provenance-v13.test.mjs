import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {validateKeywordResearch} from '../scripts/seo-keyword-provenance-v13.mjs';
const root=path.resolve(import.meta.dirname,'..');
const get=x=>JSON.parse(fs.readFileSync(path.join(root,x),'utf8'));
const atlas=get('sources/seo_v13_primary_atlas.json');
const sample=get('templates/seo-keyword-research-v13.example.json');
const copy=()=>structuredClone(sample);
const now=Date.parse('2026-11-24T12:00:00Z');
const audit=b=>validateKeywordResearch(b,atlas,{now});
const metric=(kind,opts={})=>({
 kind,value:40,unit:kind==='TRENDS_NORMALIZED'?'relative_index_0_100':kind==='ADS_PLANNER_ESTIMATE'?'estimated_monthly_searches':'owned_property_impressions',
 source_id:kind==='TRENDS_NORMALIZED'?'google-trends':kind==='ADS_PLANNER_ESTIMATE'?'google-keyword-planner':'gsc-api-query',
 source_url:kind==='TRENDS_NORMALIZED'?'https://trends.google.com/trends/':kind==='ADS_PLANNER_ESTIMATE'?'https://support.google.com/google-ads/answer/7337243':'https://developers.google.com/webmaster-tools/v1/searchanalytics/query',
 observed_at:'2026-11-24T10:00:00Z',access_method:'OWNER_PERMITTED_CSV',capture_reference:'private/export-2026-11-24.csv',...opts
});
test('V13 synthetic hypothetical intent map is valid but never a verified opportunity',()=>{
 const r=audit(copy());assert.equal(r.valid,true);assert.equal(r.status,'STRUCTURAL_PASS_EXTERNAL_EVIDENCE_UNVERIFIED');
 assert.equal(r.verified_keyword_volume,false);assert.equal(r.verified_traffic,false);
});
test('Missing market locale/device is fatal',()=>{const x=copy();delete x.market.country;assert.equal(audit(x).valid,false)});
test('Duplicate canonical page for distinct jobs fails',()=>{
 const x=copy();x.clusters.push({...x.clusters[0],id:'csv-merge',job:'Merge multiple CSV files into one output',primary_query:'merge CSV'});
 assert.equal(audit(x).valid,false);
});
test('Same exact human task scattered across different pages is a doorway risk',()=>{
 const x=copy();x.clusters.push({...x.clusters[0],id:'csv-merge',page:'/tools/duplicate-csv-rows/'});
 assert.ok(audit(x).errors.some(s=>s.includes('doorway')));
});
test('Distinct job and distinct route can share a research bundle',()=>{
 const x=copy();x.clusters.push({...x.clusters[0],id:'csv-merge',page:'/tools/merge-csv/',job:'Merge multiple CSV inputs into a single correctly ordered CSV result',primary_query:'merge CSV files',output_oracle:'tests/csv-merge.test.mjs'});
 assert.equal(audit(x).valid,true);
});
test('Missing output oracle for tool page fails',()=>{const x=copy();x.clusters[0].output_oracle='';assert.equal(audit(x).valid,false)});
test('Keyword density and meta keywords are prohibited fake SEO tactics',()=>{
 for(const key of ['meta_keywords','keyword_density','guaranteed_rank','page_rpm_from_advertiser_cpc']){
 const x=copy();x.clusters[0][key]=true;assert.equal(audit(x).valid,false,key);
 }
});
test('Unmeasured hypothesis with numerical search volume fails',()=>{
 const x=copy();x.clusters[0].evidence[0].value=50000;assert.equal(audit(x).valid,false);
});
test('Unmeasured hypothesis with CPC or source ID fails',()=>{
 for(const field of ['cpc','source_id']){const x=copy();x.clusters[0].evidence[0][field]='Google';assert.equal(audit(x).valid,false)}
});
test('Real-looking Trends record is unit-correct but external accuracy UNKNOWN',()=>{
 const x=copy();x.clusters[0].evidence=[metric('TRENDS_NORMALIZED')];const r=audit(x);
 assert.equal(r.valid,true);assert.equal(r.verified_keyword_volume,false);
 assert.ok(r.unknown.some(s=>s.includes('permissions')));
});
test('Trends 100 is relative, number above 100 fails',()=>{
 const x=copy();x.clusters[0].evidence=[metric('TRENDS_NORMALIZED',{value:120})];assert.equal(audit(x).valid,false);
});
test('Trends cannot claim estimated monthly searches unit',()=>{
 const x=copy();x.clusters[0].evidence=[metric('TRENDS_NORMALIZED',{unit:'estimated_monthly_searches'})];assert.equal(audit(x).valid,false);
});
test('Planner advertiser metric cannot claim organic KD',()=>{
 const x=copy();x.clusters[0].evidence=[metric('ADS_PLANNER_ESTIMATE',{organic_keyword_difficulty:20})];assert.equal(audit(x).valid,false);
});
test('Planner advertiser CPC cannot claim publisher RPM',()=>{
 const x=copy();x.clusters[0].evidence=[metric('ADS_PLANNER_ESTIMATE',{publisher_rpm:100})];assert.equal(audit(x).valid,false);
});
test('Planner metric must reference real Planner source id',()=>{
 const x=copy();x.clusters[0].evidence=[metric('ADS_PLANNER_ESTIMATE',{source_id:'google-trends'})];assert.equal(audit(x).valid,false);
});
test('GSC owner metric cannot be declared as a public market-wide search count',()=>{
 const x=copy();x.clusters[0].evidence=[metric('OWNER_GSC_OBSERVED',{unit:'market_global_searches'})];assert.equal(audit(x).valid,false);
});
test('GSC-looking record remains self-declared, not owner observed',()=>{
 const x=copy();x.clusters[0].evidence=[metric('OWNER_GSC_OBSERVED')];const r=audit(x);
 assert.equal(r.valid,true);assert.equal(r.verified_traffic,false);assert.ok(r.unknown.length>0);
});
test('No original source/artifact reference prevents optimistic measurement record',()=>{
 const x=copy();x.clusters[0].evidence=[metric('TRENDS_NORMALIZED',{capture_reference:''})];
 assert.equal(audit(x).valid,false);
});
test('HTTP link cannot use javascript or deceptive username form',()=>{
 const x=copy();x.clusters[0].evidence=[metric('TRENDS_NORMALIZED',{source_url:'http://trends.google.com/trends/'})];assert.equal(audit(x).valid,false);
 const y=copy();y.clusters[0].evidence=[metric('TRENDS_NORMALIZED',{source_url:'https://trends.google.com@attacker.invalid/trends'})];assert.equal(audit(y).valid,false);
});
test('Unknown evidence type must not be upgraded silently',()=>{
 const x=copy();x.clusters[0].evidence=[{kind:'GOOGLE_MAGIC_RANK',value:999}];assert.equal(audit(x).valid,false);
});
test('Bare claim of AdSense approval, rank, traffic or human demand fails',()=>{
 for(const field of ['adSense_approved','guaranteed_search_rank','estimated_traffic','verified_user_demand']){
 const x=copy();x[field]=true;assert.equal(audit(x).valid,false,field);
 }
});
test('Missing evidence even as hypothesis is invalid',()=>{const x=copy();x.clusters[0].evidence=[];assert.equal(audit(x).valid,false)});
test('Invalid routes rejected, root homepage allowed if meaningful',()=>{
 const x=copy();x.clusters[0].page='//fake/';assert.equal(audit(x).valid,false);
 const y=copy();y.clusters[0].page='/';assert.equal(audit(y).valid,true);
});
test('CLI self-contained example passes without inventing market metrics',()=>{
 const p=spawnSync(process.execPath,['scripts/seo-keyword-provenance-v13.mjs','--file','templates/seo-keyword-research-v13.example.json'],{cwd:root,encoding:'utf8'});
 assert.equal(p.status,0,p.stderr);assert.match(p.stdout,/EXTERNAL_EVIDENCE_UNVERIFIED/);
});
