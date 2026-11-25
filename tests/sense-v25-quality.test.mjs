import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {huntWebTools} from '../scripts/hunt-web-tools-v25.mjs';
import {auditAstro,auditAstroProject} from '../scripts/audit-astro-v25.mjs';
import {analyzeSiteDepth} from '../scripts/analyze-site-depth-v25.mjs';
import {auditSkillLibrary} from '../scripts/audit-skill-depth-v20.mjs';

const root=path.resolve(import.meta.dirname,'..');
const candidate=()=>JSON.parse(fs.readFileSync(path.join(root,'templates/opportunity/idea.example.json'),'utf8'));
test('hunter holds unverified synthetic proposal, never calls it revenue evidence',()=>{
 const p=candidate();const r=huntWebTools({schema:'sense-tool-hunter-v25',candidates:[{id:'photo',plan:p,evidence_source:'SYNTHETIC_TEST'}]},{now:Date.parse('2026-11-25T15:00:00Z')});
 assert.equal(r.candidates[0].state,'SYNTHETIC_ONLY');
 assert.equal(r.candidates[0].actual_demand_verified,false);
 assert.equal(r.candidates[0].automatically_authorized_to_build,false);
});
test('hunter policy violations cannot outrank safe but unverified concepts',()=>{
 const a=candidate(),b=candidate();a.risk_flags=['unauthorized_scrape'];
 const r=huntWebTools({schema:'sense-tool-hunter-v25',candidates:[{id:'unsafe',plan:a,evidence_source:'OWNER_EXPORT'},{id:'safe',plan:b,evidence_source:'OWNER_EXPORT'}]});
 assert.equal(r.candidates[0].id,'safe');
 assert.equal(r.candidates[1].state,'POLICY_STOP');
});
test('hunter refuses duplicate IDs and unsupported fabricated evidence source',()=>{
 const p=candidate();
 assert.throws(()=>huntWebTools({schema:'sense-tool-hunter-v25',candidates:[{id:'x',plan:p,evidence_source:'SYNTHETIC_TEST'},{id:'x',plan:p,evidence_source:'OWNER_EXPORT'}]}),/Invalid/);
 assert.throws(()=>huntWebTools({schema:'sense-tool-hunter-v25',candidates:[{id:'x',plan:p,evidence_source:'LIVE_SEMRUSH'}]}),/Invalid/);
});
test('current Astro static/server mode check blocks old hybrid and missing adapters',()=>{
 const pkg={dependencies:{astro:'^7.4.13'}};
 assert.equal(auditAstro({config:"output: 'hybrid'",packageJson:pkg}).status,'FAIL');
 assert.ok(auditAstro({config:"output: 'server'",packageJson:pkg}).failures.includes('DYNAMIC_ROUTES_REQUIRE_ADAPTER'));
 assert.ok(auditAstro({config:"output: 'static'",packageJson:pkg,pages:{'api.ts':'export const prerender = false;'}}).failures.includes('DYNAMIC_ROUTES_REQUIRE_ADAPTER'));
 assert.equal(auditAstro({config:"output: 'static'",packageJson:pkg}).status,'SOURCE_ONLY_NOT_DEPLOYED');
});
test('Astro build-only release requires actual HTML and non-reserved owner HTTPS origin',()=>{
 const pkg={dependencies:{astro:'^7.4.13'}};
 const bad=auditAstro({config:"output: 'static'",packageJson:pkg,origin:'https://example.org/',production:true});
 assert.ok(bad.failures.includes('REAL_PUBLIC_ORIGIN_REQUIRED'));
 assert.ok(bad.failures.includes('BUILT_HTML_REQUIRED'));
 const loopback=auditAstro({config:"output:'static'",packageJson:pkg,origin:'https://127.0.0.1/',production:true,builtHtml:[{name:'index.html',html:'<html lang="en"><title>A</title><link rel="canonical" href="https://127.0.0.1/"><main><h1>A</h1></main></html>'}]});
 assert.ok(loopback.failures.includes('REAL_PUBLIC_ORIGIN_REQUIRED'));

 const good='<html lang="en"><head><title>Useful app</title><link rel="canonical" href="https://tools-domain.com/"></head><body><main><h1>Real tool</h1></main></body></html>';
 const r=auditAstro({config:"output:'static'",packageJson:pkg,origin:'https://tools-domain.com/',production:true,builtHtml:[{name:'index.html',html:good}]});
 assert.equal(r.status,'BUILD_ONLY_PASS_NOT_DEPLOYED');assert.equal(r.public_deployment_verified,false);
});
test('Astro real checked source example is recognized, never promoted to deployed site',()=>{
 const p=auditAstroProject(path.join(root,'examples/astro-jsonl-studio'));
 assert.equal(p.mode,'static');assert.equal(p.status,'SOURCE_ONLY_NOT_DEPLOYED');
});
test('deep site audit flags observed issues, never invents Google indexing or true orphan state',()=>{
 const origin='https://real-site.org';
 const sample={schema:'sense-site-intelligence-v24',origin,observed_at:'2026-11-25T00:00:00Z',pages:[
   {url:origin+'/',status:'HTTP_200',title:'Same',h1:'Home',description:'x',canonical:origin+'/',links:[origin+'/broken'],noindex:false},
   {url:origin+'/tool',status:'HTTP_200',title:'Same',h1:'',description:null,canonical:null,links:[],noindex:true},
   {url:origin+'/broken',status:'HTTP_404',links:[]}
 ],sitemap_urls:[origin+'/tool',origin+'/broken'],sitemaps:[{status:'PARSED'}],graph:{possible_unlinked_sitemap_pages:[origin+'/tool']},truncated:true};
 const r=analyzeSiteDepth(sample);
 const names=r.findings.map(x=>x.code);
 for(const name of ['SAMPLED_DUPLICATE_TITLE','SITEMAP_NOINDEX','MISSING_H1','MISSING_CANONICAL','BUDGET_TRUNCATED','LINKED_SAMPLED_ERROR','POSSIBLY_UNLINKED_SITEMAP_URL'])assert.ok(names.includes(name),name);
 assert.equal(r.public_production_verified,false);
 assert.ok(r.unknowns.includes('Search indexing/rank'));
 assert.throws(()=>analyzeSiteDepth({schema:'bogus',pages:[],sitemaps:[]}),/V24_SITE_REPORT_REQUIRED/);
});

test('all 50 active skill entrypoints physically exist, match frontmatter and carry bounded evidence audit',()=>{
 const registry=JSON.parse(fs.readFileSync(path.join(root,'sources/skill-network-v23.json'),'utf8'));
 const ids=registry.stages.flatMap(s=>s.skills.map(x=>x.id));
 assert.equal(ids.length,50);
 assert.equal(new Set(ids).size,50);
 const active=path.join(root,'.agents/skills');
 const files=Object.fromEntries(fs.readdirSync(active,{withFileTypes:true}).filter(x=>x.isDirectory()).map(x=>[x.name,fs.readFileSync(path.join(active,x.name,'SKILL.md'),'utf8')]));
 const report=auditSkillLibrary(files,ids);
 assert.equal(report.counts.registered,50);
 assert.equal(report.counts.found,50);
 assert.equal(report.inventory_matches_registry,true,JSON.stringify(report.errors));
 assert.equal(report.all_skills_production_certified,false);
 assert.equal(report.agent_realworld_task_outcomes_verified,false);
 assert.ok(report.counts.lacking_executable_reference>=0);
});
test('master, research, competitor and Astro entries route to actual V25 modules',()=>{
 const paths=['web-dominant-tool-creator','web-opportunity-intelligence','web-competitor-audit','web-astro-engineering'];
 const files=paths.map(id=>fs.readFileSync(path.join(root,'.agents','skills',id,'SKILL.md'),'utf8'));
 assert.match(files[0],/scripts\/run-tool-hunter-v25.mjs/);
 assert.match(files[1],/docs\/skills\/2026-11-25-v25-validation-field-playbook.md/);
 assert.match(files[2],/analyzeSiteDepth/);
 assert.match(files[3],/scripts\/audit-astro-v25.mjs/);
});

test('Astro SSR build is not rejected for missing static HTML, but is held for runtime proof',()=>{
 const r=auditAstro({config:"output:'server'",packageJson:{dependencies:{astro:'^7.4.13','@astrojs/node':'^9.0.0'}},production:true,origin:'https://tools-domain.com/',builtHtml:[]});
 assert.equal(r.status,'SERVER_BUILD_RUNTIME_UNVERIFIED');
 assert.ok(r.unknowns.includes('SERVER_RUNTIME_SMOKE_REQUIRED_NO_STATIC_HTML'));
 assert.equal(r.public_deployment_verified,false);
});

test('Astro dynamic output and nonliteral route prerender are held rather than assumed static',()=>{
 const pkg={dependencies:{astro:'^7.4.13'}};
 const r=auditAstro({config:'output: process.env.ASTRO_RENDER_MODE',packageJson:pkg});
 assert.equal(r.status,'HOLD_DYNAMIC_CONFIG_UNRESOLVED');
 assert.ok(r.unknowns.includes('OUTPUT_MODE_DYNAMIC_UNRESOLVED'));
 const s=auditAstro({config:"output:'static'",packageJson:pkg,pages:{'api.ts':'export const prerender = process.env.SSR_ENABLED'}});
 assert.equal(s.status,'HOLD_DYNAMIC_CONFIG_UNRESOLVED');
 assert.ok(s.unknowns.some(x=>x.includes('ROUTE_PRERENDER_DYNAMIC_UNRESOLVED')));
});

test('V25 official-source atlas retains per-source review depth and concrete skill ownership',()=>{
 const atlas=JSON.parse(fs.readFileSync(path.join(root,'sources/v25-astro-demand-officials.json'),'utf8'));
 assert.equal(atlas.source_count,8);
 assert.equal(atlas.sources.length,8);
 const ids=new Set();
 for(const s of atlas.sources){
  assert.ok(!ids.has(s.id));ids.add(s.id);
  const u=new URL(s.url);assert.equal(u.protocol,'https:');
  assert.ok(['docs.astro.build','support.google.com','developers.google.com'].includes(u.hostname));
  assert.ok(Array.isArray(s.applies_to)&&s.applies_to.length>=1);
  assert.match(s.review,/original-body-opened|reopen-before-action/);
 }
 assert.match(atlas.scope,/reopened before consequential action/);
});
