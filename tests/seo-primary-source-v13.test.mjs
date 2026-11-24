import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {spawnSync} from 'node:child_process';
import {validateAtlas,captureOfficial} from '../scripts/seo-source-capture-v13.mjs';
const root=path.resolve(import.meta.dirname,'..');
const atlas=JSON.parse(fs.readFileSync(path.join(root,'sources/seo_v13_primary_atlas.json'),'utf8'));
const clone=()=>structuredClone(atlas);
const textBody='<html><head><title>Google SEO documentation</title></head><body><h1>Indexing</h1><p>Original public technical document text, subject to first-party current review.</p></body></html>';
const respond=(body=textBody,status=200,headers={'content-type':'text/html; charset=utf-8'})=>new Response(body,{status,headers});
const check=async({f=async()=>respond(),id='google-technical',text='',clock}={})=>captureOfficial(atlas,id,{fetchFn:f,now:clock||(()=>new Date('2026-11-24T12:00:00Z')),assertText:text});
test('V13 curated atlas has 70+ unique first-party sources in 7 distinct domains of work',()=>{
 const r=validateAtlas(atlas);assert.equal(r.valid,true,JSON.stringify(r.errors));
 assert.ok(r.count>=70);assert.equal(r.categories.length,7);
});
test('Atlas rejects id duplication',()=>{
 const a=clone();a.entries[1].id=a.entries[0].id;assert.equal(validateAtlas(a).valid,false);
});
test('Atlas rejects URL duplication',()=>{
 const a=clone();a.entries[1].url=a.entries[0].url;assert.equal(validateAtlas(a).valid,false);
});
test('Atlas rejects deceptive hostname and credentials',()=>{
 for(const u of ['https://developers.google.com.evil.example.com/','https://developer.google.com@evil.invalid/test',
 'http://developers.google.com/search','https://developers.google.com:444/search','https://localhost/a']){
  const a=clone();a.entries[0].url=u;assert.equal(validateAtlas(a).valid,false,u);
 }
});
test('Atlas missing category fails completeness',()=>{
 const a=clone();a.entries.forEach(e=>{if(e.area==='PUBLISHER')e.area='WEB_ENGINEERING'});
 assert.equal(validateAtlas(a).valid,false);
});
test('Atlas refuses self-attested meaning verified true',()=>{
 const a=clone();a.entries[0].content_meaning_verified_for_this_task=true;
 assert.equal(validateAtlas(a).valid,false);
});
test('Atlas refuses a missing mandatory original-body-review gate',()=>{
 const a=clone();a.entries[0].requires_original_body_before_action=false;
 assert.equal(validateAtlas(a).valid,false);
});
test('Explicit offline audit never fetches or certifies live facts',()=>{
 const x=spawnSync(process.execPath,['scripts/seo-source-capture-v13.mjs','--offline'],{cwd:root,encoding:'utf8'});
 assert.equal(x.status,0,x.stderr);assert.match(x.stdout,/ATLAS_METADATA_ONLY_NOT_LIVE_PROVIDER_VERIFICATION/);
});
test('CLI refuses live fetch without --live',()=>{
 const x=spawnSync(process.execPath,['scripts/seo-source-capture-v13.mjs','--source-id','google-spam'],{cwd:root,encoding:'utf8'});
 assert.equal(x.status,2);assert.match(x.stderr,/HOLD/);
});
test('Known original document fetch returns SHA and NEVER semantic validation',async()=>{
 const fetched=[];const r=await check({f:async(url,opts)=>{fetched.push({url,opts});return respond()}});
 assert.equal(r.status,'BODY_FETCHED_REVIEW_REQUIRED');assert.equal(r.eligible_for_semantic_claim,false);
 assert.match(r.body_sha256,/^[a-f0-9]{64}$/);assert.equal(r.source_id,'google-technical');
 assert.equal(fetched.length,1);assert.equal(fetched[0].opts.method,'GET');
 assert.equal(fetched[0].opts.redirect,'manual');
});
test('Original text assertion is existence-only; not proof of interpretation',async()=>{
 const x=await check({text:'Original public technical document text'});
 assert.equal(x.assertion_present_in_body,true);assert.equal(x.eligible_for_semantic_claim,false);
});
test('Unmatched exact text refuses evidence promotion',async()=>{
 const x=await check({text:'Google guarantees #1 for keyword density 4%'});
 assert.equal(x.status,'ASSERTION_NOT_FOUND_HOLD');assert.equal(x.eligible_for_semantic_claim,false);
});
test('Long quoted original passages are not allowed in record',async()=>{
 const x=await check({text:'a '.repeat(28)});
 assert.equal(x.status,'INVALID');
});
test('Unknown source id refuses fetch',async()=>{
 let called=false;const x=await check({id:'google-hacker-portal',f:async()=>{called=true;return respond()}});
 assert.equal(x.status,'INVALID');assert.equal(called,false);
});
test('HTTP 429 remains unknown not a policy cancellation',async()=>{
 const x=await check({f:async()=>respond('Throttle',429)});
 assert.equal(x.status,'UNKNOWN_HTTP_429');assert.equal(x.eligible_for_semantic_claim,false);
});
test('503 remains unknown, not a policy truth',async()=>{
 const x=await check({f:async()=>respond('Backend error',503)});
 assert.equal(x.status,'UNKNOWN_HTTP_503');
});
test('Cross-host redirect not in curated official hosts blocked without following',async()=>{
 let count=0;const x=await check({f:async()=>{count++;return new Response(null,{status:302,headers:{location:'https://attacker.invalid/private/'}})}});
 assert.equal(x.status,'BLOCKED_UNTRUSTED_REDIRECT');assert.equal(count,1);
});
test('Safe same-host redirect succeeds only with explicit bounded manual follow',async()=>{
 let count=0;const x=await check({f:async(url)=>{count++;return count===1?new Response(null,{status:301,headers:{location:'/search/docs/essentials'}}):respond()}});
 assert.equal(x.status,'BODY_FETCHED_REVIEW_REQUIRED');assert.equal(x.redirects,1);assert.equal(count,2);
});
test('Three redirects refuse infinite navigation',async()=>{
 const x=await check({f:async()=>new Response(null,{status:302,headers:{location:'/search/docs/essentials'}})});
 assert.equal(x.status,'UNKNOWN_TOO_MANY_REDIRECTS');
});
test('JSON content cannot stand in for original human-readable document',async()=>{
 const x=await check({f:async()=>respond(JSON.stringify({valid:true}),200,{'content-type':'application/json'})});
 assert.equal(x.status,'UNKNOWN_CONTENT_TYPE');
});
test('Empty body cannot be represented as a verified current policy page',async()=>{
 const x=await check({f:async()=>respond('empty')});
 assert.equal(x.status,'UNKNOWN_EMPTY_BODY');
});
test('Large body aborted and not cached',async()=>{
 const x=await check({f:async()=>respond('A'.repeat(560000))});
 assert.equal(x.status,'UNKNOWN_OVERSIZED_BODY');
});
test('Fetch exception returns UNKNOWN_NETWORK rather than automatic knowledge',async()=>{
 const x=await check({f:async()=>{throw Error('No network')}});assert.equal(x.status,'UNKNOWN_NETWORK');
});
test('No location redirect stays UNKNOWN',async()=>{
 const x=await check({f:async()=>new Response(null,{status:302})});assert.equal(x.status,'UNKNOWN_REDIRECT');
});
test('Policy-sensitive help URLs remain blocked/unverified baseline, not claimed opened',()=>{
 const blocked=atlas.entries.filter(x=>x.area==='PUBLISHER');
 assert.ok(blocked.length>=7);assert.ok(blocked.every(x=>x.access_snapshot!=='ORIGINAL_BODY_OPENED_PARTIAL'));
});
test('Capturing without email/account credentials remains read-only and cannot certify GSC',async()=>{
 const x=await check({id:'gsc-api-query'});
 assert.equal(x.eligible_for_semantic_claim,false);assert.equal(x.manual_review_required,true);
});
