import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {auditAiEligibility,SEARCH_MODES} from '../scripts/audit-ai-eligibility-v14.mjs';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'examples/seo-csv-lab/site/index.html'),'utf8');
const robots=fs.readFileSync(path.join(root,'examples/seo-csv-lab/site/robots.txt'),'utf8');
const check=o=>auditAiEligibility({html,robots,...o});
test('19-surface lab HTML has 5 crawler families with separate diagnostics',()=>{
 const r=check();assert.equal(Object.keys(r.results).length,5);assert.equal(r.status,'LOCAL_ELIGIBILITY_ONLY');
 assert.ok(r.unknown.length>=5);assert.equal(r.controls_are_owner_verified,false);
});
test('synthetic site never claims actual Google indexing or actual citations',()=>{
 const r=check({googleControl:'INCLUDED_SELF_DECLARED'});
 assert.equal(r.results.google_ai.status,'UNKNOWN_EXTERNAL');
 assert.equal(r.results.google_ai.index_or_citation_verified,false);
 assert.ok(r.unknown.some(s=>s.includes('self-declared')));
});
test('Googlebot denied while wildcard allowed blocks Google Search AI eligibility',()=>{
 const r=check({robots:'User-agent: Googlebot\nDisallow: /\nUser-agent: *\nAllow: /\n'});
 assert.equal(r.status,'FAIL');assert.equal(r.results.google_ai.blocked,true);
 assert.equal(r.results.chatgpt_search.blocked,false);
});
test('OAI-SearchBot denied while GPTBot allowed does not pass ChatGPT Search',()=>{
 const r=check({robots:'User-agent: OAI-SearchBot\nDisallow: /\nUser-agent: GPTBot\nAllow: /\nUser-agent: *\nAllow: /\n'});
 assert.equal(r.status,'FAIL');assert.equal(r.results.chatgpt_search.blocked,true);
 assert.equal(r.results.google_ai.blocked,false);
});
test('Blocking training bot GPTBot alone does not block OpenAI search crawler',()=>{
 const r=check({robots:'User-agent: GPTBot\nDisallow: /\nUser-agent: OAI-SearchBot\nAllow: /\nUser-agent: *\nAllow: /\n'});
 assert.equal(r.status,'LOCAL_ELIGIBILITY_ONLY');assert.equal(r.results.chatgpt_search.robots_allowed,true);
});
test('Claude-SearchBot denied while ClaudeBot training allowed is separate',()=>{
 const r=check({robots:'User-agent: Claude-SearchBot\nDisallow: /\nUser-agent: ClaudeBot\nAllow: /\nUser-agent: *\nAllow: /\n'});
 assert.equal(r.results.claude_search.blocked,true);assert.equal(r.results.google_ai.blocked,false);
});
test('PerplexityBot-specific block cannot be hidden behind wildcard allow',()=>{
 const r=check({robots:'User-agent: PerplexityBot\nDisallow: /\nUser-agent: *\nAllow: /\n'});
 assert.equal(r.results.perplexity_search.blocked,true);assert.equal(r.results.google_ai.blocked,false);
});
test('noindex in initial HTML prevents Google supporting-link eligibility',()=>{
 const r=check({html:html.replace('</head>','<meta name="robots" content="noindex,follow"></head>')});
 assert.equal(r.status,'FAIL');assert.ok(r.results.google_ai.blockers.some(s=>s.includes('noindex')));
});
test('nosnippet in initial HTML prevents Google AI supporting-link eligibility',()=>{
 const r=check({html:html.replace('</head>','<meta content="nosnippet" name="robots"></head>')});
 assert.equal(r.status,'FAIL');assert.ok(r.results.google_ai.blockers.some(s=>s.includes('snippet excluded')));
});
test('X-Robots-Tag nosnippet also blocked for Google',()=>{
 const r=check({xRobotsTag:'nosnippet'});assert.equal(r.status,'FAIL');
});
test('Owner-declared exclusion is a blocker but property is never independently verified',()=>{
 const r=check({googleControl:'EXCLUDED_SELF_DECLARED'});assert.equal(r.status,'FAIL');
 assert.ok(r.results.google_ai.blockers.some(s=>s.includes('property excluded')));
 assert.equal(r.controls_are_owner_verified,false);
});
test('JS-only shell with no meaningful initial HTML is a failure',()=>{
 const r=check({html:'<!doctype html><html><head><title>App</title></head><body><div id="root"></div><script src="app.js"></script></body></html>'});
 assert.equal(r.status,'FAIL');assert.ok(r.errors.some(e=>e.includes('main')));
});
test('Missing visible H1 fails; short main is not real answer page',()=>{
 const r=check({html:html.replace(/<h1\b[^>]*>[\s\S]*?<\/h1>/i,'')});
 assert.equal(r.status,'FAIL');
});
test('Invalid path or provider mode never passes',()=>{
 assert.equal(check({path:'//path/'}).status,'FAIL');
 assert.equal(check({modes:['invented-magical-llm']}).status,'FAIL');
 assert.equal(check({modes:['google_ai','google_ai']}).status,'FAIL');
});
test('Optional llms.txt does not certify citation, fake guarantees are rejected',()=>{
 const r=check({html:html.replace('</main>','<p>llms.txt guarantees Google AI Mode ranking</p></main>')});
 assert.equal(r.status,'FAIL');
});
test('Explicit 0 max-snippet flagged as risk rather than fake guaranteed ranking',()=>{
 const r=check({html:html.replace('</head>','<meta name="robots" content="max-snippet:0"></head>')});
 assert.equal(r.status,'LOCAL_ELIGIBILITY_ONLY');
 assert.ok(r.warnings.some(w=>w.includes('max-snippet:0')));
});
test('Custom target crawler set only reports requested product',()=>{
 const r=check({modes:['chatgpt_search']});
 assert.deepEqual(Object.keys(r.results),['chatgpt_search']);
});
test('CLI on real sample is zero-failure but explicitly local-only',()=>{
 const p=spawnSync(process.execPath,['scripts/audit-ai-eligibility-v14.mjs','--html','examples/seo-csv-lab/site/index.html','--robots','examples/seo-csv-lab/site/robots.txt'],{cwd:root,encoding:'utf8'});
 assert.equal(p.status,0,p.stderr);assert.match(p.stdout,/LOCAL_ELIGIBILITY_ONLY/);
});
