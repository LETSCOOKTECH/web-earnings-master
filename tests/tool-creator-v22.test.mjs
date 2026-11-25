import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {evaluateToolCreator} from '../scripts/evaluate-tool-creator-v22.mjs';
const root=path.resolve(import.meta.dirname,'..');
const fresh=()=>JSON.parse(fs.readFileSync(path.join(root,'templates/creator/BRIEF.SYNTHETIC.json'),'utf8'));
const evalIt=x=>evaluateToolCreator(x,{now:Date.parse('2026-11-25T16:00:00Z')});
const bad=x=>assert.equal(evalIt(x).status,'INVALID',JSON.stringify(evalIt(x)));
test('SYNTHETIC brief stays RESEARCH_REQUIRED despite full-looking market fields',()=>{
 const r=evalIt(fresh());assert.equal(r.status,'RESEARCH_REQUIRED');assert.equal(r.external_proof_verified,false);
});
test('null input fails closed rather than crashing',()=>bad(null));
test('missing actual user job blocks',()=>{const x=fresh();x.job=null;bad(x)});
test('two copies of same originating complaint fail',()=>{const x=fresh();x.market_evidence[1].origin_url=x.market_evidence[0].origin_url;bad(x)});
test('duplicate evidence source id fails',()=>{const x=fresh();x.market_evidence[1].id=x.market_evidence[0].id;bad(x)});
test('synthetic Google Trends index cannot exceed 100',()=>{const x=fresh();x.market_evidence[1].metric.value=101;bad(x)});
test('metric has no unit or a fabricated searches unit',()=>{const x=fresh();x.market_evidence[1].metric.unit='GUARANTEED_CLICKS';bad(x)});
test('invalid negative keyword estimates fail',()=>{const x=fresh();x.market_evidence[1].metric.value=-1;bad(x)});
test('future fake complaint is rejected',()=>{const x=fresh();x.market_evidence[0].observed_at='2099-01-01';bad(x)});
test('hostile javascript URL cannot be source evidence',()=>{const x=fresh();x.market_evidence[0].url='javascript:alert(1)';bad(x)});
test('competitor null is controlled fail',()=>{const x=fresh();x.competitors[0]=null;bad(x)});
test('duplicate incumbent brand is rejected',()=>{const x=fresh();x.competitors[1].name=x.competitors[0].name;bad(x)});
test('two competitor products must use same input fixture',()=>{const x=fresh();x.competitors[1].common_fixture_id='OTHER_FIXTURE';bad(x)});
test('missing competitor outcome fails',()=>{const x=fresh();x.competitors[0].observed_output='';bad(x)});
test('nonexistent architecture budget fails',()=>{const x=fresh();x.architecture.estimated_cost_per_1000_jobs_usd=-2;bad(x)});
test('malformed architecture record fails rather than crashing',()=>{const x=fresh();x.architecture=null;bad(x)});
test('cannot self-certify real AI citation/rank from a JSON file',()=>{const x=fresh();x.claims.ai_recommendation_observed=true;bad(x)});
test('cannot self-certify real ad account approval',()=>{const x=fresh();x.claims.ad_network_approved=true;bad(x)});
test('cannot self-certify public ownership via a text field',()=>{const x=fresh();x.claims.live_public_host_verified=true;bad(x)});
test('live stage requires actual independent external review',()=>{const x=fresh();x.release.stage='EXTERNAL_HTTP_OBSERVED';bad(x)});
test('example.org canonical cannot be an actual deployed tool',()=>{const x=fresh();x.release.public_url='https://my-tool.example.org/';bad(x)});
test('manifest even with non-synthetic sources is structurally limited to REVIEW',()=>{
 const x=fresh();x.synthetic=false;
 for(const [i,s] of x.market_evidence.entries()){s.url='https://source-'+i+'.com/';s.origin_url=s.url;}
 const r=evalIt(x);assert.equal(r.status,'STRUCTURAL_CANDIDATE_REVIEW_REQUIRED');assert.equal(r.external_proof_verified,false);
});
test('missing real competitor samples means research not build',()=>{
 const x=fresh();x.competitors=[];assert.equal(evalIt(x).status,'RESEARCH_REQUIRED');
});
test('all keyword estimates are not enough to certify direct human need',()=>{
 const x=fresh();x.synthetic=false;
 for(const [i,s] of x.market_evidence.entries()){s.kind='ESTIMATED_KEYWORD';s.metric={value:42,unit:'TRENDS_INDEX_0_100'};s.url='https://source-'+i+'.com/';s.origin_url=s.url;}
 assert.equal(evalIt(x).status,'RESEARCH_REQUIRED');
});
test('primary orchestrator references every phase and deployed-site distinction',()=>{
 const s=fs.readFileSync(path.join(root,'.agents/skills/web-dominant-tool-creator/SKILL.md'),'utf8');
 for(const term of ['web-astro-engineering','web-opportunity-intelligence','web-dominant-recommendar','web-publisher-policy-eligibility','BUILD_ONLY_NOT_DEPLOYED','EXTERNAL_HTTP_OBSERVED'])
  assert.ok(s.includes(term),term);
});
