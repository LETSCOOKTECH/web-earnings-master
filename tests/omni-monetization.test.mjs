import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {recommendStack,guardRefresh,parseAdsTxt,fingerprintPublic,inspectCandidate,validateRegistry,isFreshDate,CHANNEL_FAMILIES} from '../scripts/omni-monetization-core.mjs';
import {run,validPublicIPv4,guardLiveURL} from '../scripts/discover-monetization-stack.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const registry=JSON.parse(fs.readFileSync(path.join(root,'sources/monetization_providers_registry.json'),'utf8'));
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const day=Date.parse('2026-11-26T12:00:00Z');

test('provider registry enumerates broad earning opportunities with source-scoped official review',()=>{
 assert.equal(registry.schema,'sense-omni-monetization-registry-v31');
 assert.ok(registry.public_channels.length>=25);
 assert.ok(registry.providers.length>=18);
 assert.deepEqual(validateRegistry(registry,{now:day}).errors,[]);
 assert.equal(registry.providers.find(p=>p.id==='carbon-ads').coexists_with_adsense,false);
 assert.equal(registry.providers.find(p=>p.id==='lemon-squeezy').india_payout_supported,null);
 assert.ok(registry.public_channels.some(x=>x.id==='agent-api-licensing'));
 assert.ok(registry.public_channels.some(x=>x.id==='direct-sponsorship'));
 assert.ok(Object.keys(CHANNEL_FAMILIES).length>=4);
});
test('source freshness detects old and fabricated future dates and never treats unknown as verified',()=>{
 assert.equal(isFreshDate('2026-11-26',{now:day}),true);
 assert.equal(isFreshDate('2024-01-01',{now:day}),false);
 assert.equal(isFreshDate('2099-01-01',{now:day}),false);
 assert.equal(isFreshDate('not-a-date',{now:day}),false);
 const stale=structuredClone(registry);
 stale.providers.find(p=>p.id==='adsense').last_verified='2025-01-01';
 assert.ok(validateRegistry(stale,{now:day}).warnings.some(x=>x.includes('STALE')));
});
test('developer high-adblock audience never receives AdSense-only stack or Carbon plus AdSense',()=>{
 const result=recommendStack({niche:'developer JSON SQL data tools',adblockRate:0.42,desktopPct:94,primaryGeo:'mixed',serverCost:0},registry,{now:day});
 assert.equal(result.profile_class,'B2B_UTILITY_MIX');
 assert.equal(result.projected_revenue,null);
 assert.equal(result.guaranteed_fill,false);
 assert.ok(result.ranked_layers.some(x=>x.id==='direct-sponsorship'));
 assert.ok(result.ranked_layers.some(x=>x.id==='paid-product-features'));
 assert.ok(result.ranked_layers.some(x=>x.id==='developer-native-ONE-NETWORK-ONLY'));
 assert.ok(!result.ranked_layers.some(x=>x.id==='contextual-display-candidate'));
 assert.ok(result.block_before_live.includes('PROVIDER_APPROVAL'));
 assert.equal(result.slot_policy.no_forced_adblock_bypass,true);
});
test('general audience routes to eligibility-gated display, affiliate and direct sponsorship',()=>{
 const r=recommendStack({niche:'student math reference site',expected_adblock_rate:0.1,desktop_pct:45,primary_geo:'IN',server_cost:0},registry,{now:day});
 assert.equal(r.profile_class,'GENERAL_CONTENT');
 assert.ok(r.ranked_layers.some(x=>x.id==='contextual-display-candidate'));
 assert.ok(r.ranked_layers.some(x=>x.id==='disclosed-affiliate'));
 assert.equal(r.measured_revenue,null);
});
test('expensive workloads add verified-cost based metering and B2B licensing',()=>{
 const r=recommendStack({niche:'media batch processor',adblockRate:0.35,desktopPct:90,primaryGeo:'US',serverCost:1500},registry,{now:day});
 assert.ok(r.ranked_layers.some(x=>x.id==='metered-compute'));
 assert.ok(r.ranked_layers.some(x=>x.id==='b2b-white-label'));
});
test('invalid profiles are rejected rather than silently normalizing nonsense',()=>{
 assert.throws(()=>recommendStack({niche:'csv',adblockRate:1.1},registry),/INVALID_PROFILE/);
 assert.throws(()=>recommendStack({niche:'csv',adblockRate:-0.2},registry),/INVALID_PROFILE/);
 assert.throws(()=>recommendStack({niche:'csv',desktopPct:200},registry),/INVALID_PROFILE/);
 assert.throws(()=>recommendStack({niche:''},registry),/INVALID_NICHE/);
});
test('AdSense auto-refresh is hard-blocked, GAM requires explicit declarations and owner approval',()=>{
 assert.throws(()=>guardRefresh({provider:'adsense',seconds:30}),/POLICY_VIOLATION/);
 assert.throws(()=>guardRefresh({provider:'gam_authorized_partner',seconds:30}),/POLICY_HOLD/);
 assert.throws(()=>guardRefresh({provider:'unknown',seconds:30}),/POLICY_HOLD/);
 const allowed=guardRefresh({provider:'gam_authorized_partner',seconds:30,partnerAuthorized:true,inventoryDeclared:true,ownerApproved:true,policyUrl:'https://developers.google.com/publisher-tag/samples/refresh'});
 assert.equal(allowed.status,'OWNER_APPROVED_CONTRACT_ELIGIBILITY_ONLY');
 assert.equal(allowed.automatic,false);
 assert.equal(guardRefresh({provider:'adsense',seconds:0}).automatic,false);
});
test('ads.txt parser differentiates seller entries from directives and rejects malformed lines',()=>{
 const r=parseAdsTxt(read('tests/fixtures/omni/sample-ads.txt'));
 assert.equal(r.sellers.length,2);
 assert.equal(r.sellers[0].relationship,'DIRECT');
 assert.equal(r.sellers[1].relationship,'RESELLER');
 assert.equal(r.invalidLines.length,1);
 assert.equal(r.proves_active_serving,false);
});
test('stale ads.txt does not establish live ads, even without actual scripts',()=>{
 const r=fingerprintPublic({html:'<html><h1>Tool</h1></html>',adsTxt:'google.com, pub-123, DIRECT',targetUrl:'https://example.org/'});
 assert.equal(r.publicSellerDeclarations.length,1);
 assert.equal(r.observedHtmlSignals.length,0);
 assert.equal(r.classifications.includes('ADS_TXT_AUTHORIZED_SELLERS_DECLARED_NOT_ADS_SERVED'),true);
 assert.ok(r.limits.includes('NO_PRIVATE_REVENUE'));
});
test('static HTML identifies developer ads and separate sponsor/pricing without asserting actual paid placement',()=>{
 const r=fingerprintPublic({html:read('tests/fixtures/omni/sample.html'),adsTxt:read('tests/fixtures/omni/sample-ads.txt'),targetUrl:'https://example.org/'});
 assert.ok(r.observedHtmlSignals.includes('CARBON_SCRIPT'));
 assert.ok(r.observedHtmlSignals.includes('SPONSOR_LINK'));
 assert.ok(r.observedHtmlSignals.includes('PRICING_LINK'));
 assert.ok(r.observedHtmlSignals.includes('AFFILIATE_MARKER'));
 assert.ok(!r.observedHtmlSignals.includes('GOOGLE_PUBLISHER_TAG'));
 assert.ok(r.limits.includes('NO_AD_FILL_FROM_STATIC_HTML'));
});
test('GAM markup signal is not claimed to prove live header bidding or Snigel earnings',()=>{
 const r=fingerprintPublic({html:'<script src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>',adsTxt:''});
 assert.ok(r.classifications.includes('POSSIBLE_GPT_TAG_NOT_ACTIVE_BIDDING_PROOF'));
 assert.equal(r.publicSellerDeclarations.length,0);
 assert.ok(!r.classifications.includes('ACTIVE_GAM_BIDDING_VERIFIED'));
});
test('new AI ad network without valid official claims or India proof stays HOLD',()=>{
 const bad=JSON.parse(read('templates/monetization/provider-candidate.example.json'));
 const r=inspectCandidate(bad,{now:day});
 assert.equal(r.status,'HOLD_UNVERIFIED_PROVIDER');
 assert.ok(r.errors.includes('INDIA_PAYOUT_BOOLEAN_WITH_PRIMARY_PROOF'));
 assert.ok(r.errors.includes('OFFICIAL_CLAIM_RECEIPT'));
 assert.equal(r.mayWriteCanonicalRegistry,false);
});
test('even well-formed provider candidate remains independent-review pending, not automatically registered',()=>{
 const p={id:'brand-new-provider',category:'direct-sponsorship',official_policy_url:'https://realprovider.test/terms',last_verified:'2026-11-26',integration_risk_notes:'Trial with site-owner commercial review and sponsor agreement',india_payout_supported:false,official_claim_receipts:[{source_url:'https://realprovider.test/terms',excerpt:'Provider accepts select publishers under a manual review process.'}]};
 const r=inspectCandidate(p,{now:day});
 assert.equal(r.status,'PENDING_INDEPENDENT_PRIMARY_SOURCE_REVIEW');
 assert.equal(r.mayWriteCanonicalRegistry,false);
});
test('unsafe live URL targets, local IPs, redirects and non-HTTPS are not authorized',()=>{
 for(const x of ['https://127.0.0.1/','http://safe.test/','https://safe.test:8443/','https://user:pass@safe.test/']){
  assert.throws(()=>guardLiveURL(x,'safe.test'),/LIVE_URL_NOT_AUTHORIZED/);
 }
 assert.throws(()=>guardLiveURL('https://different.test/','safe.test'),/LIVE_URL_NOT_AUTHORIZED/);
 assert.equal(guardLiveURL('https://safe.test/','safe.test').hostname,'safe.test');
 for(const ip of ['127.0.0.1','10.0.0.8','172.16.4.3','192.168.1.1','169.254.1.1','100.64.0.1','198.18.0.1','192.0.2.1','198.51.100.10','203.0.113.20','224.1.1.1']){
  assert.equal(validPublicIPv4(ip),false,ip);
 }
 assert.equal(validPublicIPv4('8.8.8.8'),true);
});
test('CLI pure offline recommendation and footprint paths do not require paid APIs or external HTTP',async()=>{
 const rec=await run(['--recommend','--niche','developer data studio','--expected-adblock-rate','0.42','--desktop-pct','93','--primary-geo','mixed']);
 assert.equal(rec.profile_class,'B2B_UTILITY_MIX');
 const fp=await run(['--fingerprint','https://synthetic.invalid/','--html-file',path.join(root,'tests/fixtures/omni/sample.html'),'--ads-file',path.join(root,'tests/fixtures/omni/sample-ads.txt')]);
 assert.equal(fp.sourceMode,'OFFLINE_FIXTURE_ONLY');
 assert.equal(fp.real_revenue_verified,false);
 assert.equal(typeof fp.contentHash,'string');
});
test('CLI requires explicit network authorization and never auto-discovers from a bare target',async()=>{
 await assert.rejects(run(['--fingerprint','https://somewhere.example/']),/OFFLINE_REQUIRES/);
 await assert.rejects(run(['--watch','--provider','adsense']),/WATCH_REQUIRES/);
 await assert.rejects(run(['--watch','--provider','adsense','--live','--allow-domain','evil.example']),/EXACT_OFFICIAL_DOMAIN_ALLOWLIST/);
});
test('Astro slot is an opt-in static sponsor or owner-approved placeholder, not stealth adblock script',()=>{
 const s=read('templates/astro-monetization-slot/MonetizationSlot.astro');
 assert.match(s,/HOLD_AD_SLOT_OWNER_APPROVAL_REQUIRED/);
 assert.match(s,/POLICY_HOLD_NO_AUTOMATIC_REFRESH_IN_THIS_TEMPLATE/);
 assert.match(s,/Sponsored · Paid placement/);
 assert.match(s,/rel="sponsored nofollow noopener noreferrer"/);
 assert.match(s,/margin-block:32px/);
 assert.ok(!/setInterval\s*\(/.test(s));
 assert.ok(!/adsbygoogle\.push\s*\(/.test(s));
 assert.ok(!/setTimeout\s*\(/.test(s));
 assert.ok(s.includes("mode='none'"));
});
test('original V23 50-skill registry remains frozen and extension is readable',()=>{
 const original=JSON.parse(read('sources/skill-network-v23.json'));
 assert.equal(original.declared_active_skills,50);
 assert.ok(read('extensions/v31/skills/web-omni-monetization-engine/SKILL.md').startsWith('---\nname: web-omni-monetization-engine'));
 assert.equal(read('AGENTS.md').startsWith('## V13 MANDATORY'),true);
});

test('CLI catalog exposes the entire researched earning-channel universe without claiming income',async()=>{
 const r=await run(['--catalog']);
 assert.equal(r.schema,'sense-earning-channel-catalog-v31');
 assert.ok(r.channels.length>=25);
 assert.ok(r.provider_evidence.length>=20);
 assert.equal(r.net_earning_claims_verified,false);
 const lemon=r.provider_evidence.find(x=>x.id==='lemon-squeezy');
 assert.equal(lemon.india_payout_supported,null);
 assert.equal(lemon.status,'OFFICIAL_REVIEWED');
});
