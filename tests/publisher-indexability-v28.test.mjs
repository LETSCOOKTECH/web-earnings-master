import test from 'node:test';
import assert from 'node:assert/strict';
import {auditPublisherRoute,findNoindexDirectives} from '../scripts/publisher-indexability-v28.mjs';
const ok='User-agent: *\nAllow: /\n';
test('detects noindex independent of HTML attribute order and meta casing',()=>{
 for(const html of ['<meta content="noindex,follow" name="robots">','<META NAME="GOOGLEBOT" CONTENT="none">']){
  const r=auditPublisherRoute({html,robotsText:ok});
  assert.equal(r.status,'FAIL');
  assert.ok(r.failures.some(x=>x.includes('INDEXABLE_ROUTE_NOINDEX')));
 }
});
test('scoped optional AI noindex does not impersonate global noindex',()=>{
 const r=auditPublisherRoute({headers:{'X-Robots-Tag':'OAI-SearchBot: noindex'},robotsText:ok,aiDiscovery:true});
 assert.equal(r.status,'PASS_BOUNDED_ONLY');
 assert.ok(r.warnings.some(x=>x.includes('AI_DISCOVERY_NOINDEX')));
 assert.deepEqual(findNoindexDirectives('',{'X-Robots-Tag':'OAI-SearchBot: noindex'}).map(x=>x.agent),['oai-searchbot']);
});
test('detects route-level search crawler blocks and optional bot warnings',()=>{
 const robots='User-agent: Googlebot\nDisallow: /tools/\n\nUser-agent: OAI-SearchBot\nDisallow: /tools/\n\nUser-agent: *\nAllow: /\n';
 const r=auditPublisherRoute({route:'/tools/convert/',robotsText:robots,aiDiscovery:true});
 assert.equal(r.status,'FAIL');
 assert.ok(r.failures.some(x=>x.includes('ROBOTS_BLOCKS_GOOGLEBOT')));
 assert.ok(r.warnings.some(x=>x.includes('OAI-SEARCHBOT')));
});
test('Mediapartners-Google restrictions matter only for declared monetized routes',()=>{
 const robots='User-agent: Mediapartners-Google\nDisallow: /tools/\n\nUser-agent: *\nAllow: /\n';
 assert.equal(auditPublisherRoute({route:'/tools/a/',robotsText:robots}).status,'PASS_BOUNDED_ONLY');
 const r=auditPublisherRoute({route:'/tools/a/',robotsText:robots,monetized:true});
 assert.ok(r.failures.some(x=>x.includes('MEDIAPARTNERS_GOOGLE')));
});
test('COEP require-corp is a release blocker only for ad-enabled routes',()=>{
 const headers=new Headers({'Cross-Origin-Embedder-Policy':'require-corp'});
 assert.equal(auditPublisherRoute({headers}).status,'PASS_BOUNDED_ONLY');
 const r=auditPublisherRoute({headers,monetized:true});
 assert.equal(r.status,'FAIL');
 assert.ok(r.failures.some(x=>x.includes('CROSS_ORIGIN_ISOLATION')));
});
test('COEP credentialless is not auto-certified as ad compatible',()=>{
 const r=auditPublisherRoute({headers:{'Cross-Origin-Embedder-Policy':'credentialless'},monetized:true});
 assert.equal(r.status,'PASS_BOUNDED_ONLY');
 assert.ok(r.warnings.some(x=>x.includes('BROWSER_AD_TEST')));
});
test('indexable false excludes search indexes but still inspects ad hosting',()=>{
 const r=auditPublisherRoute({html:'<meta name="robots" content="noindex">',indexable:false,monetized:true,headers:{'Cross-Origin-Embedder-Policy':'require-corp'}});
 assert.equal(r.failures.length,1);
 assert.ok(r.failures[0].includes('CROSS_ORIGIN_ISOLATION'));
});
