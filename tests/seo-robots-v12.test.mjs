import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {evaluateRobots,parseRobots} from '../scripts/robots-evaluator.mjs';
const ROOT=path.resolve(import.meta.dirname,'..');
function withFile(txt,fn){
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'sense-robots-v12-'));
 try{const p=path.join(dir,'robots.txt');fs.writeFileSync(p,txt);return fn(p)}
 finally{fs.rmSync(dir,{recursive:true,force:true})}
}
const check=(txt,...extra)=>withFile(txt,f=>spawnSync(process.execPath,[path.join(ROOT,'scripts/check-robots-policy.mjs'),'--file',f,...extra],{cwd:ROOT,encoding:'utf8'}));
function staticWithRobots(txt){
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'sense-static-v12-'));
 try{
  fs.cpSync(path.join(ROOT,'tests/fixtures/site'),dir,{recursive:true});
  fs.writeFileSync(path.join(dir,'robots.txt'),txt);
  return spawnSync(process.execPath,[path.join(ROOT,'scripts/audit-static-site.mjs'),'--dist',dir,'--origin','https://fixture.example'],{cwd:ROOT,encoding:'utf8'});
 }finally{fs.rmSync(dir,{recursive:true,force:true})}
}
const sitemap='\nSitemap: https://fixture.example/sitemap-index.xml\n';
test('Googlebot group overrides wildcard Allow and audit rejects its block',()=>{
 const r='User-agent: Googlebot\nDisallow: /\nUser-agent: *\nAllow: /\n'+sitemap;
 assert.equal(evaluateRobots(r,'Googlebot','/tools/image-resizer/').allowed,false);
 assert.equal(evaluateRobots(r,'Bingbot','/tools/image-resizer/').allowed,true);
 const c=check(r,'--path','/tools/image-resizer/');assert.equal(c.status,1);assert.match(c.stdout,/Googlebot blocked/);
 const a=staticWithRobots(r);assert.equal(a.status,1);assert.match(a.stderr,/Robots blocks Googlebot/);
});
test('Bingbot-only disallow is identified as Bingbot not false wildcard block',()=>{
 const r='User-agent: *\nAllow: /\nUser-agent: Bingbot\nDisallow: /\n'+sitemap;
 const c=check(r,'--path','/tools/image-compressor/');
 assert.equal(c.status,1);assert.match(c.stdout,/Bingbot blocked/);assert.doesNotMatch(c.stdout,/Googlebot blocked/);
 const a=staticWithRobots(r);assert.equal(a.status,1);assert.match(a.stderr,/Robots blocks Bingbot/);
});
test('Wildcard disallow overridden by specific Googlebot Allow is permitted for Googlebot only',()=>{
 const r='User-agent: *\nDisallow: /\nUser-agent: Googlebot\nAllow: /\n';
 assert.equal(evaluateRobots(r,'Googlebot','/tool').allowed,true);
 assert.equal(evaluateRobots(r,'Bingbot','/tool').allowed,false);
});
test('Rule specificity: allow exception allows intended nested page',()=>{
 const r='User-agent: *\nDisallow: /tools/\nAllow: /tools/csv-deduper/\n'+sitemap;
 const c=check(r,'--path','/tools/csv-deduper/');
 assert.equal(c.status,0,c.stdout+c.stderr);
 assert.equal(evaluateRobots(r,'Googlebot','/tools/csv-deduper/').allowed,true);
 assert.equal(evaluateRobots(r,'Googlebot','/tools/private/').allowed,false);
});
test('Rule specificity: disallow files even if root allowed',()=>{
 const r='User-agent: *\nAllow: /\nDisallow: /*.pdf$\n';
 assert.equal(evaluateRobots(r,'Googlebot','/manual.pdf').allowed,false);
 assert.equal(evaluateRobots(r,'Googlebot','/manual.pdf?copy=1').allowed,true);
});
test('Consecutive multiple user-agents belong to same group',()=>{
 const r='User-agent: Googlebot\nUser-agent: Bingbot\nDisallow: /blocked\n';
 assert.deepEqual(parseRobots(r)[0].agents,['googlebot','bingbot']);
 assert.equal(evaluateRobots(r,'Googlebot','/blocked').allowed,false);
 assert.equal(evaluateRobots(r,'Bingbot','/blocked').allowed,false);
});
test('Repeated matching Googlebot groups combine',()=>{
 const r='User-agent: Googlebot\nDisallow: /first\nUser-agent: Googlebot\nDisallow: /second\nUser-agent: *\nAllow: /\n';
 assert.equal(evaluateRobots(r,'Googlebot','/first').allowed,false);
 assert.equal(evaluateRobots(r,'Googlebot','/second').allowed,false);
});
test('Googlebot-Image group selection more specific than generic Googlebot',()=>{
 const r='User-agent: Googlebot\nAllow: /\nUser-agent: Googlebot-Image\nDisallow: /photos/\n';
 assert.equal(evaluateRobots(r,'Googlebot-Image','/photos/pic.jpg').allowed,false);
 assert.equal(evaluateRobots(r,'Googlebot','/photos/pic.jpg').allowed,true);
});
test('Whitespace comments and case-insensitive group names are handled',()=>{
 const r='# text\n USER-AGENT: Googlebot # comment\n DISALLOW: /private/\n USER-AGENT: *\n ALLOW: /\n';
 assert.equal(evaluateRobots(r,'gOoGlEbOt','/private/').allowed,false);
 assert.equal(evaluateRobots(r,'Bingbot','/private/').allowed,true);
});
test('Empty Disallow never blocks root',()=>{
 const r='User-agent: *\nDisallow:\n';
 assert.equal(check(r).status,0);
});
test('Matching allow beats equivalent disallow under RFC tie',()=>{
 const r='User-agent: *\nDisallow: /\nAllow: /\n';
 assert.equal(evaluateRobots(r,'Googlebot','/example').allowed,true);
 assert.equal(check(r).status,0);
});
test('All-bot ban is a release blocker',()=>{
 const r='User-agent: *\nDisallow: /\n';
 assert.equal(check(r).status,1);
 assert.equal(staticWithRobots(r).status,1);
});
test('No matching group means allowed in RFC subset',()=>{
 const r='User-agent: GPTBot\nDisallow: /\n';
 assert.equal(evaluateRobots(r,'Googlebot','/').allowed,true);
 assert.equal(evaluateRobots(r,'Bingbot','/').allowed,true);
});
test('Diagnostic only tests declared path and bot, not blanket speculations',()=>{
 const r='User-agent: Bingbot\nDisallow: /private/\n';
 assert.equal(check(r,'--bot','Googlebot','--path','/').status,0);
 assert.equal(check(r,'--bot','Bingbot','--path','/private/').status,1);
});
test('Invalid bot token rejects before pretending to observe actual crawler',()=>{
 const r='User-agent: *\nAllow: /\n';
 assert.equal(check(r,'--bot','Bingbot/unknown!').status,1);
});
