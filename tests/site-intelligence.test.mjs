import test from 'node:test';
import assert from 'node:assert/strict';
import {gzipSync} from 'node:zlib';
import {isPublicIPv4,isPublicIPv6,validateOrigin,safeURL,resolvePinnedPublicIPv4,resolvePinnedPublicAddress,fetchPublic} from '../lib/site-intelligence/safe-http.mjs';
import {summarizeHAR} from '../lib/site-intelligence/har.mjs';
import {buildSkillHandoffs} from '../lib/site-intelligence/knowledge.mjs';
import {buildSiteAtlas} from '../lib/site-intelligence/portfolio.mjs';
import {summarizeRenderedDOM} from '../lib/site-intelligence/rendered.mjs';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {decodeXmlEntities,decodeSitemapBody,parseSitemapXML,sitemapLocationsFromRobots} from '../lib/site-intelligence/xml.mjs';
import {inspectHTML} from '../lib/site-intelligence/html.mjs';
import {buildDiscoveryInventory} from '../lib/site-intelligence/discovery.mjs';
import {inspectSite,diffSiteReports,compactSiteDigest} from '../lib/site-intelligence/engine.mjs';

const base='http://127.0.0.1:9472';
const body=x=>Buffer.isBuffer(x)?x:Buffer.from(String(x));
function fakeTransport(routes,record=[]){
 return async(url,opts)=>{
   record.push({url,opts});
   const key=new URL(url).pathname;
   const item=routes[key]??{status:404,body:'Not found'};
   if(item.throw)throw new Error(item.throw);
   return {url,status:item.status??200,headers:item.headers??{'content-type':key==='/robots.txt'?'text/plain':key.endsWith('.xml')||key.endsWith('.gz')?'application/xml':'text/html'},body:body(item.body??''),redirect_followed:false};
 };
}
const mkHTML=(title,links=[],extra='')=>`<!doctype html><html><head><title>${title}</title><link rel="canonical" href="${base}/${title.toLowerCase().replace(/\s+/g,'-')}"></head><body><main><h1>${title}</h1><nav>${links.map(x=>'<a href="'+x+'">Next</a>').join('')}</nav>${extra}</main></body></html>`;
const opts={origin:base+'/',authorizedOrigin:base+'/',fixture:true,limits:{maxPages:12,maxSitemaps:5,minDelayMs:0,maxTimeMs:5000}};
test('safe origin rejects forged, reserved, private and non-HTTPS public targets',()=>{
 for(const bad of ['http://example.org/','https://example.com/','https://foo.localhost/','https://127.0.0.1/','https://[::1]/','https://user:pass@real-site.com/','https://site.com:8443/','https://site.com/account/']){
   assert.throws(()=>validateOrigin(bad),undefined,bad);
 }
 assert.equal(validateOrigin('https://www.example-research-site.com/'),'https://www.example-research-site.com');
 assert.equal(validateOrigin(base+'/',{fixture:true}),base);
});
test('same origin normalization resolves relative links from full page URL',()=>{
 assert.equal(safeURL('../tools/?sid=abc#foo','https://example-research-site.com/guides/'), 'https://example-research-site.com/tools/');
 assert.equal(safeURL('https://evil.site/x','https://example-research-site.com/'),null);
 assert.equal(safeURL('javascript:alert(1)','https://example-research-site.com/'),null);
});
test('ip safety blocks RFC1918, link-local, test ranges, CGNAT, broadcast and public example ipv6',()=>{
 for(const ip of ['127.0.0.1','10.2.3.4','169.254.1.2','172.31.0.1','192.168.1.2','100.64.4.4','192.0.2.4','198.51.100.6','203.0.113.5','8.8.8.8x','::1'])assert.equal(isPublicIPv4(ip),false,ip);
 assert.equal(isPublicIPv4('8.8.8.8'),true);
 assert.equal(isPublicIPv4('1.1.1.1'),true);
});
test('pinned DNS rejects any mixed private record or ipv6 in IPv4-only mode',async()=>{
 await assert.rejects(resolvePinnedPublicIPv4('site.com',{resolver:async()=>[{family:4,address:'8.8.8.8'},{family:4,address:'127.0.0.1'}]}),/NON_PUBLIC/);
 await assert.rejects(resolvePinnedPublicIPv4('site.com',{resolver:async()=>[{family:6,address:'::1'}]}),/NON_PUBLIC/);
 assert.equal(await resolvePinnedPublicIPv4('site.com',{resolver:async()=>[{family:4,address:'8.8.8.8'}]}),'8.8.8.8');
});
test('XML sitemap parser supports namespace, escaped URLs, lastmod and index files',()=>{
 const index='<sm:sitemapindex xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"><sm:sitemap><sm:loc>https://example-research-site.com/a.xml</sm:loc></sm:sitemap></sm:sitemapindex>';
 assert.equal(parseSitemapXML(index).kind,'index');
 assert.equal(parseSitemapXML(index).entries[0].url,'https://example-research-site.com/a.xml');
 const xml='<urlset><url><loc>https://example-research-site.com/a?x=1&amp;y=2</loc><lastmod>2026-11-25</lastmod></url><url><loc>https://example-research-site.com/&#x74;ool</loc></url></urlset>';
 const parsed=parseSitemapXML(xml);assert.equal(parsed.entries.length,2);
 assert.equal(parsed.entries[0].url,'https://example-research-site.com/a?x=1&y=2');
 assert.equal(parsed.entries[1].url,'https://example-research-site.com/tool');
 assert.equal(parsed.entries[0].lastmod,'2026-11-25');
});
test('XML parser rejects DTD/ENTITY, wrong root, oversized gzip output and invalid utf8',()=>{
 assert.throws(()=>parseSitemapXML('<!DOCTYPE a [<!ENTITY x SYSTEM "file:///etc/passwd">]><urlset></urlset>'),/FORBIDDEN/);
 assert.throws(()=>parseSitemapXML('<html></html>'),/ROOT/);
 assert.throws(()=>decodeSitemapBody(gzipSync('a'.repeat(90000)),{maxInflatedBytes:2000}),/GZIP_INVALID_OR_INFLATION_LIMIT/);
 assert.throws(()=>decodeSitemapBody(Buffer.from([255,254,253])),/INVALID_XML_UTF8/);
});
test('robots sitemap directives are case insensitive; no arbitrary cross-origin request',()=>{
 assert.deepEqual(sitemapLocationsFromRobots('Sitemap: https://sample.test/sitemap.xml\nsitemap: https://sample.test/other.xml'),
 ['https://sample.test/sitemap.xml','https://sample.test/other.xml']);
});
test('HTML inspect captures static links, forms and framework evidence but not private backend claims',()=>{
 const html='<html><head><title>Tool &amp; Docs</title><meta name="generator" content="Astro 7"><link href="/help" rel="canonical"></head><body><h1>File Tool</h1><a class="x" href="../guide/?token=fake">Guide</a><a href="https://other.site/pay">External</a><script src="/_astro/bundle.js"></script><form action="/api/upload" method="post"></form></body></html>';
 const p=inspectHTML({url:base+'/tools/',origin:base,body:Buffer.from(html),fixture:true});
 assert.equal(p.title,'Tool & Docs');
 assert.deepEqual(p.links,[base+'/guide/']);assert.equal(p.forms[0].method,'POST');
 assert.ok(p.technology_indicators.some(x=>x.technology.includes('Astro')));
 assert.equal(p.analysis_scope,'STATIC_HTML_AND_RESPONSE_HEADERS_ONLY');
 assert.ok(!JSON.stringify(p).includes('private backend source'));
});
test('discovery import normalizes many leads into unique sites, preserving provenance',()=>{
 const out=buildDiscoveryInventory([
  {url:'https://demo-tools.org/tool?a=1',query:'online tool',region:'US',provider:'manual-serp',source_url:'https://search.example.net/result'},
  {url:'https://demo-tools.org/about',query:'about'}, {url:'https://another-tools.org/app'},
  {url:'http://127.0.0.1/private'}, {url:'https://example.com/demo'},
 ]);
 assert.equal(out.sites.length,2);assert.equal(out.rejected.length,2);
 assert.equal(out.sites[0].seeds[0],'https://demo-tools.org/tool');
 assert.equal(out.status,'SEARCH_RESULT_IMPORT_ONLY_NOT_A_LIVE_SEARCH');
});
test('recursive nested sitemaps + non-sitemap links -> real sampled graph and observable signals',async()=>{
 const seen=[];
 const routes={
 '/robots.txt':{body:'User-agent: *\nDisallow: /private/\nSitemap: '+base+'/index.xml\n',headers:{'content-type':'text/plain'}},
 '/index.xml':{body:'<sitemapindex><sitemap><loc>'+base+'/nested.xml.gz</loc></sitemap><sitemap><loc>https://evil.site/secrets.xml</loc></sitemap></sitemapindex>'},
 '/nested.xml.gz':{body:gzipSync('<urlset><url><loc>'+base+'/docs</loc></url><url><loc>'+base+'/tool</loc></url><url><loc>'+base+'/private/keys</loc></url></urlset>')},
 '/':{body:mkHTML('Home',['/tool','/hidden'])},
 '/tool':{body:mkHTML('Tool',['/docs'],'<script src="/_astro/main.js"></script><form action="/upload" method="post"></form>'),headers:{'content-type':'text/html','cf-ray':'fixture-ray'}},
 '/docs':{body:mkHTML('Docs',[])},
 '/hidden':{body:mkHTML('Hidden',[])},
 '/private/keys':{body:mkHTML('Private',[])},
 };
 const r=await inspectSite({...opts,fetcher:fakeTransport(routes,seen)});
 assert.equal(r.robots.status,'READ_AND_ENFORCED_SUBSET');
 assert.equal(r.sitemaps.filter(x=>x.status==='PARSED').length,2);
 assert.equal(r.sitemap_urls.length,3);
 assert.ok(r.pages.some(p=>p.url===base+'/hidden'));
 assert.ok(r.pages.find(p=>p.url===base+'/private/keys').status==='BLOCKED_ROBOTS');
 assert.ok(r.graph.edges>=2);
 assert.ok(r.architecture.observed_signals.some(s=>s.technology==='Astro asset pipeline'));
 assert.equal(r.architecture.hosting_backend_database,'UNKNOWN_NOT_OBSERVABLE');
 assert.ok(seen.every(x=>new URL(x.url).origin===base));
 assert.ok(!seen.some(x=>x.url.includes('/private/keys')));
 assert.ok(!seen.some(x=>x.url.includes('evil.site')));
 assert.equal(r.digest,compactSiteDigest(r));
});
test('failed robots and forbidden robots fail closed without sitemap or page fetch',async()=>{
 for(const status of [401,403,429,500,302]){
   const seen=[],r=await inspectSite({...opts,fetcher:fakeTransport({'/robots.txt':{status}},seen)});
   assert.equal(r.status,'BLOCKED_ROBOTS_UNAVAILABLE',String(status));
   assert.equal(seen.length,1);assert.equal(r.pages.length,0);
 }
});
test('robots network error stops all crawling instead of silently allowing',async()=>{
 const calls=[],r=await inspectSite({...opts,fetcher:fakeTransport({'/robots.txt':{throw:'DNS lookup failed'}},calls)});
 assert.equal(r.status,'BLOCKED_ROBOTS_UNAVAILABLE');assert.equal(calls.length,1);
});
test('missing robots.txt 404 permits bounded public observations',async()=>{
 const seen=[],r=await inspectSite({...opts,fetcher:fakeTransport({'/':{body:mkHTML('Home',[]) }},seen),limits:{...opts.limits,maxSitemaps:3}});
 assert.equal(r.robots.status,'ABSENT_404_ALLOW');
 assert.ok(r.pages.some(x=>x.url===base+'/'));
});
test('sitemap cycles, external sitemap links, URLs and duplicate entries cannot escape origin',async()=>{
 const seen=[];
 const routes={
 '/robots.txt':{body:'Sitemap: '+base+'/a.xml'},
 '/a.xml':{body:'<sitemapindex><sitemap><loc>'+base+'/b.xml</loc></sitemap><sitemap><loc>'+base+'/a.xml</loc></sitemap></sitemapindex>'},
 '/b.xml':{body:'<urlset><url><loc>'+base+'/one</loc></url><url><loc>'+base+'/one</loc></url><url><loc>https://evil.site/payload</loc></url></urlset>'},
 '/':{body:mkHTML('Home',[])},'/one':{body:mkHTML('One',[])}
 };
 const r=await inspectSite({...opts,fetcher:fakeTransport(routes,seen)});
 assert.equal(r.sitemaps.filter(x=>x.status==='PARSED').length,2);
 assert.deepEqual(r.sitemap_urls,[base+'/one']);
 assert.ok(r.warnings.some(x=>x.code==='CROSS_ORIGIN_SITEMAP_ENTRY_SKIPPED'));
});
test('crawl hard budgets produce PARTIAL not fake full reconstruction',async()=>{
 const routes={'/robots.txt':{status:404},'/':{body:mkHTML('Home',['/a','/b','/c'])},'/a':{body:mkHTML('A',[])},'/b':{body:mkHTML('B',[])},'/c':{body:mkHTML('C',[])}};
 const r=await inspectSite({...opts,limits:{...opts.limits,maxPages:1},fetcher:fakeTransport(routes)});
 assert.equal(r.pages.length,1);assert.equal(r.truncated,true);assert.equal(r.status,'PARTIAL_BUDGET_LIMIT');
});
test('robots disallow blocks linked paths including publicly leaked sitemaps',async()=>{
 const seen=[];
 const r=await inspectSite({...opts,fetcher:fakeTransport({
 '/robots.txt':{body:'User-agent: *\nDisallow: /hidden\n'},'/':{body:mkHTML('Home',['/hidden'])},'/hidden':{body:mkHTML('Hidden',[])}
 },seen)});
 assert.ok(r.pages.some(x=>x.url===base+'/hidden'&&x.status==='BLOCKED_ROBOTS'));
 assert.ok(!seen.some(x=>x.url.endsWith('/hidden')));
});
test('diff reports do not claim absent site pages are permanently deleted',()=>{
 const a={origin:base,pages:[{url:base+'/a',html_sha256:'one',status:'HTTP_200'},{url:base+'/b',html_sha256:'two',status:'HTTP_200'}]};
 const b={origin:base,pages:[{url:base+'/a',html_sha256:'three',status:'HTTP_200'},{url:base+'/c',html_sha256:'four',status:'HTTP_200'}]};
 const d=diffSiteReports(a,b);assert.deepEqual(d.added,[base+'/c']);assert.deepEqual(d.removed,[base+'/b']);assert.deepEqual(d.changed,[base+'/a']);assert.match(d.limitations,/not proven removed/);
});
test('cannot audit unapproved origin or inject default-network fixture mode accidentally',async()=>{
 await assert.rejects(inspectSite({origin:base+'/',authorizedOrigin:'https://other-site.com/',fixture:true}),/MISMATCH/);
 await assert.rejects(inspectSite({origin:base+'/',authorizedOrigin:base+'/'}),/HTTPS_STANDARD_PORT_REQUIRED/);
 await assert.rejects(inspectSite({origin:base+'/',authorizedOrigin:base+'/',fixture:true,seedUrls:Array(200).fill(base)}),/SEED_BUDGET_EXCEEDED/);
});
test('non-html files are not misclassified as web pages and redirects are not followed',async()=>{
 const seen=[];
 const routes={'/robots.txt':{status:404},'/':{body:mkHTML('Home',['/image','/move'])},
 '/image':{body:'not html',headers:{'content-type':'image/png'}},'/move':{status:302,headers:{location:'/admin'},body:''}};
 const r=await inspectSite({...opts,fetcher:fakeTransport(routes,seen)});
 assert.equal(r.pages.find(x=>x.url===base+'/image').status,'NON_HTML');
 assert.equal(r.pages.find(x=>x.url===base+'/move').status,'HTTP_302');
 assert.ok(!seen.some(x=>x.url.endsWith('/admin')));
});
test('private backend claims and actual revenue never appear in deterministic observation fields',async()=>{
 const routes={'/robots.txt':{status:404},'/':{body:mkHTML('Home',['/about'])},'/about':{body:mkHTML('About',[])}};
 const result=await inspectSite({...opts,fetcher:fakeTransport(routes)});
 assert.ok(result.external_unknowns.includes('Databases and infrastructure topology'));
 assert.ok(result.external_unknowns.some(x=>x.includes('publisher')));
 assert.equal(result.authorization,'OPERATOR_DECLARED_NOT_OWNERSHIP_VERIFIED');
});

test('dual-stack DNS supports public IPv6 and IPv4 while pinning IPv4 where available',async()=>{
 assert.equal(isPublicIPv6('2606:4700:4700::1111'),true);
 assert.equal(isPublicIPv6('2001:db8::1'),false);
 assert.equal(isPublicIPv6('fc00::1'),false);
 const x=await resolvePinnedPublicAddress('example-research-site.com',{resolver:async()=>[
   {family:6,address:'2606:4700:4700::1111'},{family:4,address:'1.1.1.1'}]});
 assert.deepEqual(x,{address:'1.1.1.1',family:4});
 const y=await resolvePinnedPublicAddress('only-v6-site.com',{resolver:async()=>[{family:6,address:'2606:4700:4700::1111'}]});
 assert.equal(y.family,6);
});
test('HAR summaries preserve public network shapes but never leak query, tokens, bodies or cookies',()=>{
 const har={log:{entries:[
   {request:{url:'https://research-site.org/api/files/123456?secret=VERY_SECRET',method:'POST',headers:[{name:'Authorization',value:'Bearer TOPSECRET'}],postData:{text:'PASSWORDDATA'}},response:{status:201,content:{mimeType:'application/json',text:'PRIVATE'},headers:[{name:'Set-Cookie',value:'cookie_secret'}]},time:123.45},
   {request:{url:'https://tracker.tld/track?email=LEAK_PROBE_QUERY_123',method:'GET'},response:{status:200},time:2},
   {request:{url:'https://research-site.org/assets/site.js',method:'GET'},response:{status:200,content:{mimeType:'application/javascript'}},time:6},
 ]}};
 const out=summarizeHAR(har,{origin:'https://research-site.org/'});
 const serialized=JSON.stringify(out);
 assert.equal(out.stats.same_origin,2);assert.equal(out.stats.external,1);
 assert.ok(out.observable_routes.some(r=>r.path==='/api/files/:redacted'&&r.classification==='api_candidate'));
 for(const secret of ['VERY_SECRET','TOPSECRET','PASSWORDDATA','PRIVATE','cookie_secret','LEAK_PROBE_QUERY_123'])assert.ok(!serialized.includes(secret),secret);
 assert.equal(out.sensitive_fields_retained,false);
});
test('HAR import rejects invalid logs and massive entries',()=>{
 assert.throws(()=>summarizeHAR({log:{}},{origin:'https://research-site.org/'}),/INVALID_HAR/);
 assert.throws(()=>summarizeHAR({log:{entries:Array(3001).fill({})}},{origin:'https://research-site.org/'}),/HAR_REQUEST_ENTRY_CAP/);
});

test('evidence graph routes real source-scoped observations to ten existing specialists',async()=>{
 const routes={'/robots.txt':{status:404},'/':{body:mkHTML('Home',['/tool'])},'/tool':{body:mkHTML('Tool',[])}};
 const report=await inspectSite({...opts,fetcher:fakeTransport(routes)});
 const packet=buildSkillHandoffs(report);
 assert.equal(packet.schema,'sense-site-skill-handoffs-v24');
 assert.equal(Object.keys(packet.handoffs).length,10);
 assert.ok(packet.claims.every(c=>c.id.startsWith('web-observation-')&&c.source_url.startsWith(base)));
 assert.equal(packet.handoffs.competitor.owner,'web-competitor-audit');
 assert.equal(packet.handoffs.ai_discovery.owner,'web-ai-discovery');
 assert.match(packet.trust,/UNTRUSTED/);
 assert.equal(packet.production_gate,'NOT_A_PUBLIC_SITE_OWNERSHIP_INDEXING_AD_REVENUE_CERTIFICATE');
});
test('evidence graph rejects an unrelated JSON claim pretending to be an actual scan',()=>{
 assert.throws(()=>buildSkillHandoffs({schema:'hacked',origin:base}),/NOT_A_SITE/);
});

test('multi-site atlas retains only reproducible public evidence and never fabricates private internals',async()=>{
 const make=async(originName)=>inspectSite({...opts,origin:'http://'+originName+':9472/',authorizedOrigin:'http://'+originName+':9472/',fetcher:fakeTransport({'/robots.txt':{status:404},'/':{body:'<html><title>A tool</title><form action="/calculate" method="post"></form></html>'}})});
 const a=await make('first.fixture'),b=await make('second.fixture');
 const atlas=buildSiteAtlas([a,b]);
 assert.equal(atlas.site_count,2);
 assert.equal(atlas.status,'OBSERVED_PARTIAL_REFERENCE_COMPARISON');
 assert.ok(atlas.sites.every(x=>!('estimated_traffic' in x)&&!('private_backend' in x)));
 assert.ok(atlas.analysis_limitations.some(x=>x.includes('NOT normalized')));
 assert.throws(()=>buildSiteAtlas([a,a]),/DUPLICATE_ORIGIN/);
 assert.throws(()=>buildSiteAtlas([a,{foo:1}]),/INVALID_REPORT/);
});
test('real CLI can import discovery leads and produce a JSON file with explicit unknowns',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'sense-v24-cli-'));
 try{
   const seed=path.join(dir,'seeds.json'),out=path.join(dir,'discovered.json');
   fs.writeFileSync(seed,JSON.stringify([{url:'https://real-competitor-demo.org/tool',query:'test research',region:'US'}]));
   const result=spawnSync(process.execPath,['scripts/site-intelligence.mjs','--discover',seed,'--out',out],{cwd:path.resolve(import.meta.dirname,'..'),encoding:'utf8',timeout:8000});
   assert.equal(result.status,0,result.stdout+'\n'+result.stderr);
   const data=JSON.parse(fs.readFileSync(out,'utf8'));
   assert.equal(data.sites.length,1);
   assert.equal(data.status,'SEARCH_RESULT_IMPORT_ONLY_NOT_A_LIVE_SEARCH');
   assert.equal(data.sites[0].site_status,'DISCOVERED_UNFETCHED_AUTHORIZATION_REQUIRED');
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
test('real CLI rejects unsafe local crawl before network I/O',()=>{
 const r=spawnSync(process.execPath,['scripts/site-intelligence.mjs','--origin','http://127.0.0.1:9999/','--authorized-origin','http://127.0.0.1:9999/'],
 {cwd:path.resolve(import.meta.dirname,'..'),encoding:'utf8',timeout:8000});
 assert.equal(r.status,2);
 assert.match(r.stderr,/HTTPS_STANDARD_PORT_REQUIRED/);
});

test('robots HTML challenge is not silently misinterpreted as permission',async()=>{
 const seen=[];
 const r=await inspectSite({...opts,fetcher:fakeTransport({'/robots.txt':{body:'<html><title>Just a moment</title><body>Checking your browser</body></html>',headers:{'content-type':'text/html'}}},seen)});
 assert.equal(r.status,'BLOCKED_ROBOTS_UNAVAILABLE');
 assert.equal(r.robots.status,'BLOCKED_ROBOTS_HTML_OR_CHALLENGE');
 assert.equal(seen.length,1);
});
test('public crawler cannot disable minimum polite pacing',async()=>{
 await assert.rejects(inspectSite({origin:'https://reliable-research-site.com/',authorizedOrigin:'https://reliable-research-site.com/',limits:{minDelayMs:0},fetcher:async()=>{throw Error('Must not call transport');}}),/PUBLIC_CRAWL_DELAY_MINIMUM/);
});
test('out-of-origin input seeds are explicitly rejected rather than silently studied',async()=>{
 const r=await inspectSite({...opts,seedUrls:['https://evil.example/login'],fetcher:fakeTransport({'/robots.txt':{status:404},'/':{body:mkHTML('Home',[])}})});
 assert.ok(r.warnings.some(x=>x.code==='SEED_SKIPPED_OUT_OF_SCOPE_OR_NONPAGE'));
});

test('public fetch transport bounds stalled DNS without making a TLS connection',async()=>{
 await assert.rejects(
   fetchPublic('https://reliable-research-site.com/',{resolver:async()=>new Promise(()=>{}),timeoutMs:25}),
   /DNS_RESOLUTION_TIMEOUT/
 );
});

test('public crawling skips account, reset token and destructive GET routes even if linked',async()=>{
 const seen=[];
 const html=mkHTML('Home',['/tool','/account/reset/secret','/unsubscribe/abc','/delete/123','/invite/abcd1234','/api/user','/public/abcdef0123456789abcdef0123456789']);
 const r=await inspectSite({...opts,fetcher:fakeTransport({
 '/robots.txt':{status:404},'/':{body:html},'/tool':{body:mkHTML('Tool',[])}
 },seen)});
 assert.ok(r.pages.some(p=>p.url===base+'/tool'));
 for(const path of ['/account/','/unsubscribe/','/delete/','/invite/','/api/','/public/abcdef0123456789abcdef0123456789']){
   assert.ok(!seen.some(x=>x.url.includes(path)),path);
 }
});

test('operator-supplied rendered HTML detects extra public links without copying raw DOM',async()=>{
 const report=await inspectSite({...opts,fetcher:fakeTransport({
   '/robots.txt':{status:404},'/':{body:mkHTML('Home',['/docs'])},'/docs':{body:mkHTML('Docs',[])}
 })});
 const full='<html><body><h1>Enhanced</h1><a href="/docs">Docs</a><a href="/js-tool">Dynamic</a><a href="/account/reset/secret">Private</a><script>topsecret_password_string</script></body></html>';
 const summary=summarizeRenderedDOM([{url:base+'/',html:full}],{report,fixture:true});
 assert.deepEqual(summary.observations[0].links_not_in_static_html,[base+'/js-tool']);
 assert.ok(!JSON.stringify(summary).includes('topsecret_password_string'));
 assert.ok(!JSON.stringify(summary).includes('/account/reset/secret'));
 assert.equal(summary.sensitive_html_retained,false);
 report.operator_rendered_dom_observations=summary;
 const packet=buildSkillHandoffs(report);
 assert.ok(packet.claims.some(x=>x.category==='rendered_dom'));
});
test('rendered HTML must be from in-scope scanned public pages and within bounded bytes',async()=>{
 const report=await inspectSite({...opts,fetcher:fakeTransport({'/robots.txt':{status:404},'/':{body:mkHTML('Home',[])}})});
 assert.throws(()=>summarizeRenderedDOM([{url:'https://third-party.com/',html:'<html/>'}],{report,fixture:true}),/ORIGIN_OR_PAGE/);
 assert.throws(()=>summarizeRenderedDOM([{url:base+'/',html:'x'.repeat(1_000_001)}],{report,fixture:true}),/BYTE_BUDGET/);
});

test('valid robots disallowing captcha paths does not become a false WAF block',async()=>{
 const r=await inspectSite({...opts,fetcher:fakeTransport({
   '/robots.txt':{body:'User-agent: *\nDisallow: /captcha/\n',headers:{'content-type':'text/plain'}},
   '/':{body:mkHTML('Home',['/captcha/challenge','/docs'])},'/docs':{body:mkHTML('Docs',[])}
 })});
 assert.equal(r.robots.status,'READ_AND_ENFORCED_SUBSET');
 assert.ok(r.pages.some(p=>p.url===base+'/docs'&&p.status==='HTTP_200'));
 assert.ok(r.pages.some(p=>p.url===base+'/captcha/challenge'&&p.status==='BLOCKED_ROBOTS'));
});
test('gzip robots is decompressed before access rules are evaluated',async()=>{
 const r=await inspectSite({...opts,fetcher:fakeTransport({
   '/robots.txt':{body:gzipSync('User-agent: *\nDisallow: /blocked\n'),headers:{'content-type':'text/plain','content-encoding':'gzip'}},
   '/':{body:mkHTML('Home',['/blocked','/docs'])},'/docs':{body:mkHTML('Docs',[])}
 })});
 assert.equal(r.robots.status,'READ_AND_ENFORCED_SUBSET');
 assert.ok(r.pages.some(p=>p.url===base+'/blocked'&&p.status==='BLOCKED_ROBOTS'));
});
test('unsupported HTTP HTML content encoding fails as an observation, not a fabricated page parse',async()=>{
 const r=await inspectSite({...opts,fetcher:fakeTransport({
   '/robots.txt':{status:404},
   '/':{body:Buffer.from([0xca,0xfe]),headers:{'content-type':'text/html','content-encoding':'br'}}
 })});
 assert.ok(r.errors.some(x=>x.code==='PAGE_UNREADABLE'&&x.detail.includes('UNSUPPORTED_HTML_ENCODING')));
 assert.equal(r.pages.find(p=>p.url===base+'/').status,'ERROR');
});
test('site digest changes with sanitized HAR and rendered-DOM evidence, and claim packet fingerprints match',async()=>{
 const report=await inspectSite({...opts,fetcher:fakeTransport({
   '/robots.txt':{status:404},'/':{body:mkHTML('Home',['/docs'])},'/docs':{body:mkHTML('Docs',[])}
 })});
 const baseline=report.digest;
 report.operator_har_observations=summarizeHAR({log:{entries:[
   {request:{url:base+'/api/check?token=hidden',method:'GET'},response:{status:200,content:{mimeType:'application/json'}},time:30}
 ]}},{origin:base,fixture:true});
 report.operator_rendered_dom_observations=summarizeRenderedDOM([{url:base+'/',html:mkHTML('Home',['/docs','/js-new'])}],{report,fixture:true});
 report.digest=compactSiteDigest(report);
 assert.notEqual(report.digest,baseline);
 const packet=buildSkillHandoffs(report);
 assert.equal(packet.source_report_digest,report.digest);
 assert.ok(packet.claims.some(c=>c.category==='network'));
 assert.ok(packet.claims.some(c=>c.category==='rendered_dom'));
});
