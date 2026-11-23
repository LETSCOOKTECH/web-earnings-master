import test from 'node:test';
import assert from 'node:assert/strict';
import {parseRobots,evaluateRobots} from '../scripts/robots-evaluator.mjs';
import {startOwnedWebLab} from '../scripts/owned-web-lab.mjs';
const policy='User-agent: *\nDisallow: /private/\nAllow: /private/public/\nUser-agent: GPTBot\nDisallow: /\nUser-agent: OAI-SearchBot\nAllow: /\n';
test('RFC subset: specific agent overrides wildcard, not the other way around',()=>{
 assert.equal(evaluateRobots(policy,'GPTBot/1.0','/document').allowed,false);
 assert.equal(evaluateRobots(policy,'OAI-SearchBot/1.0','/document').allowed,true);
 assert.equal(evaluateRobots(policy,'Googlebot','/private/user').allowed,false);
 assert.equal(evaluateRobots(policy,'Googlebot','/private/public/readme').allowed,true);
});
test('RFC subset: longest path wins, equal-length allow beats disallow',()=>{
 const t='User-agent: *\nDisallow: /x\nAllow: /x\nDisallow: /a*\nAllow: /a/b\n';
 assert.equal(evaluateRobots(t,'TestBot','/x').allowed,true);
 assert.equal(evaluateRobots(t,'TestBot','/a/b').allowed,true);
 assert.equal(evaluateRobots(t,'TestBot','/a/z').allowed,false);
});
test('RFC subset: group accumulates consecutive UA and ignores sitemap without splitting',()=>{
 const t='User-agent: BotOne\nUser-agent: BotTwo\nSitemap: https://test.invalid/map.xml\nDisallow: /blocked\n';
 assert.deepEqual(parseRobots(t).map(g=>g.agents),[['botone','bottwo']]);
 assert.equal(evaluateRobots(t,'BotTwo','/blocked').allowed,false);
});
test('RFC subset: empty disallow is not a crawl ban',()=>{
 assert.equal(evaluateRobots('User-agent: *\nDisallow:\n','Foo','/').allowed,true);
});
test('RFC subset: explicit end anchor and wildcard work',()=>{
 const t='User-agent: *\nDisallow: /*.pdf$\n';
 assert.equal(evaluateRobots(t,'Foo','/manual.pdf').allowed,false);
 assert.equal(evaluateRobots(t,'Foo','/manual.pdf?download=1').allowed,true);
});
test('RFC subset: multiple matching groups combine, empty/unknown policy is allow',()=>{
 const t='User-agent: Gbot\nDisallow: /one\nUser-agent: Gbot\nDisallow: /two\n';
 assert.equal(evaluateRobots(t,'Gbot','/two').allowed,false);
 assert.equal(evaluateRobots('','Foo','/foo').allowed,true);
});
const live=await startOwnedWebLab();
test.after(async()=>await live.close());
const get=async(path,options={})=>fetch(live.origin+path,{redirect:'manual',...options});
test('owned server: real HTTP 200, 404, 503 and 308 redirect statuses',async()=>{
 for(const [p,status] of [['/document',200],['/missing',404],['/unavailable',503],['/redirect',308]]){
  const r=await get(p);assert.equal(r.status,status,p);
 }
 const r=await get('/redirect');assert.equal(r.headers.get('location'),'/document');
});
test('owned server: honest noindex header vs HTML robots vs canonical mismatch',async()=>{
 const h=await get('/header-noindex'),m=await get('/meta-noindex'),c=await get('/canonical-conflict');
 assert.match(h.headers.get('x-robots-tag'),/noindex/);
 assert.match(await m.text(),/name="robots" content="noindex/);
 assert.match(await c.text(),/canonical" href="[^"]+\/document"/);
 assert.equal(c.status,200); // canonical is a hint, not redirect
});
test('owned server: soft404 HTTP 200 demonstrates content/status discrepancy',async()=>{
 const r=await get('/soft404');assert.equal(r.status,200);
 assert.match(await r.text(),/Not found/);
});
test('owned server: never serve protected content just because robots disallows it',async()=>{
 const r=await get('/private/account');assert.equal(r.status,401);
 assert.match(await r.text(),/Authentication required/);
});
test('owned server: ETag conditional request has 304 and no body',async()=>{
 const first=await get('/etag');assert.equal(first.status,200);assert.equal(first.headers.get('etag'),'"fixture-v1"');
 const second=await get('/etag',{headers:{'If-None-Match':'"fixture-v1"'}});
 assert.equal(second.status,304);assert.equal(await second.text(),'');
});
test('owned server: crawl policies per bot actually fetched and evaluated',async()=>{
 const body=await (await get('/robots.txt')).text();
 assert.equal(evaluateRobots(body,'GPTBot','/document').allowed,false);
 assert.equal(evaluateRobots(body,'OAI-SearchBot','/document').allowed,true);
 assert.equal(evaluateRobots(body,'Googlebot','/private/account').allowed,false);
 assert.equal(evaluateRobots(body,'Googlebot','/document').allowed,true);
});
test('owned server: sitemap includes public canonical and excludes secret/results',async()=>{
 const xml=await (await get('/sitemap.xml')).text();
 assert.match(xml,/<urlset/);assert.match(xml,/\/document/);assert.doesNotMatch(xml,/private\/account|\/soft404/);
});
test('owned server: raw JS-only fixture has no discoverable H1 before rendering',async()=>{
 const raw=await (await get('/hydration-only')).text();
 assert.doesNotMatch(raw.split('<script>')[0],/<h1>/i);assert.match(raw,/innerHTML/);
});
test('owned server: CSP header is actually sent and blocking scripts',async()=>{
 const r=await get('/csp-block');assert.equal(r.headers.get('content-security-policy'),"default-src 'self'; script-src 'none'");
});
