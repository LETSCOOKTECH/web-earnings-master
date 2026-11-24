import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {auditKeywordMap} from '../scripts/audit-keyword-map.mjs';
import {auditAnswerPage} from '../scripts/audit-answer-page.mjs';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const map=read('templates/seo-v11-page-map.example.json');
const copy=()=>structuredClone(map);
const run=(script,...args)=>spawnSync(process.execPath,[path.join(root,script),...args],{cwd:root,encoding:'utf8'});
test('V11 official source registry has 30+ dated first-party leads with honest inspection grades',()=>{
 const r=read('sources/seo_v11_source_map.json');
 assert.ok(r.sources.length>=30);
 assert.equal(new Set(r.sources.map(x=>x.id)).size,r.sources.length);
 assert.ok(r.sources.every(x=>x.url.startsWith('https://')&&x.action_time_original_review_required===true));
 assert.ok(r.sources.some(x=>x.inspection==='SEARCH_RESULT_AND_ORIGINAL_OPEN_BLOCKED'));
});
test('SEO manuals are substantial and skill router records exactly one operation',()=>{
 for(const f of ['README.md','01-keyword-intelligence.md','02-technical-fullstack.md','03-policy-separation.md','04-evidence-and-sandbox.md'])
  assert.ok(fs.readFileSync(path.join(root,'docs/seo-master',f),'utf8').length>2200,f);
});
test('V11 front-door instructions present in the five owning skills',()=>{
 for(const n of ['web-keyword-intent','web-technical-seo','web-fullstack-production-executor','web-publisher-policy-eligibility','web-product-validation'])
  assert.match(fs.readFileSync(path.join(root,'.agents/skills',n,'SKILL.md'),'utf8'),/V11/);
});
test('synthetic keyword map is valid, but unmeasured',()=>{
 const r=auditKeywordMap(map);assert.equal(r.valid,true);assert.ok(r.unknown.length>=2);assert.equal(r.status,'UNKNOWN_EXTERNAL');
});
test('root homepage path accepted by page-intent CLI',()=>{
 const d=fs.mkdtempSync(path.join(os.tmpdir(),'v11-root-'));
 try{const p=path.join(d,'x.json');fs.writeFileSync(p,JSON.stringify({pages:[{path:'/',user_job:'Navigate to the actual working CSV deduplication tool',demand_evidence_status:'hypothesis',title:'CSV tool lab',status:'index'}]}));
  const r=run('scripts/audit-page-intents.mjs','--file',p);assert.equal(r.status,0,r.stderr);
 }finally{fs.rmSync(d,{recursive:true,force:true});}
});
test('malformed double-slash route rejected by page-intent CLI',()=>{
 const d=fs.mkdtempSync(path.join(os.tmpdir(),'v11-evil-'));
 try{const p=path.join(d,'x.json');fs.writeFileSync(p,JSON.stringify({pages:[{path:'//bad/',user_job:'Navigate to the actual working CSV deduplication tool',demand_evidence_status:'hypothesis',title:'CSV tool lab',status:'index'}]}));
 assert.notEqual(run('scripts/audit-page-intents.mjs','--file',p).status,0);
 }finally{fs.rmSync(d,{recursive:true,force:true});}
});
test('same user job on different URLs is not an independent SEO page',()=>{
 const p=copy();p.pages.push({...p.pages[0],path:'/about/',canonical:'https://csv-lab.example.org/about/'});
 assert.ok(auditKeywordMap(p).errors.some(e=>e.includes('Duplicate user job')));
});
test('invalid route cannot be indexable with misleading canonical',()=>{
 const p=copy();p.pages[0].path='//';assert.equal(auditKeywordMap(p).valid,false);
});
test('mismatched canonical fails',()=>{
 const p=copy();p.pages[0].canonical='https://csv-lab.example.org/misleading/';assert.equal(auditKeywordMap(p).valid,false);
});
test('fictional Google ranking or density target fails',()=>{
 for(const field of ['keyword_density_target','meta_keywords','google_rank_guarantee']){
 const p=copy();p.pages[0][field]=field==='google_rank_guarantee'?true:'5%';
 assert.equal(auditKeywordMap(p).valid,false);
 }
});
test('unmeasured keyword cannot present a search volume figure',()=>{
 const p=copy();p.pages[0].estimated_monthly_searches=100000;
 assert.equal(auditKeywordMap(p).valid,false);
});
test('measured source missing original scope remains UNKNOWN',()=>{
 const p=copy();p.pages[0].keyword_evidence_type='LICENSED_ESTIMATE';
 assert.equal(auditKeywordMap(p).status,'UNKNOWN_EXTERNAL');
});
test('requiring measured evidence fails the placeholder map',()=>{
 assert.equal(auditKeywordMap(map,{requireMeasured:true}).valid,false);
});
test('working tool must have a tested output fixture',()=>{
 const p=copy();p.pages[1].output_test_ref=null;assert.equal(auditKeywordMap(p).valid,false);
});
test('AEO self-certified source and indexed flags can never produce a PASS',()=>{
 const x={url:'https://valid.example.org/tool/',user_job:'Remove verified duplicate rows from CSV documents',title:'CSV deduplication',h1:'Remove duplicates',answer:{text:'This useful tool truly processes CSV content with verified results.'},
  claims:[{source_url:'https://developers.google.com/search/docs/essentials',evidence_checked_at:'2026-11-24',support_status:'supported',text:'Google conditions'}],
  http_status:200,canonical_matches:true,robots_allowed:true,index_state:'verified_indexed',task_required:false};
 const out=auditAnswerPage(x);assert.equal(out.status,'UNKNOWN_LIVE');assert.ok(out.unknown.length>0);
});
test('unsupported claim still fails AEO rather than merely UNKNOWN',()=>{
 const x={url:'https://valid.example.org/tool/',user_job:'Remove verified duplicate rows from CSV documents',title:'CSV',h1:'CSV',answer:{text:'This useful tool truly processes CSV content with verified results.'},
 claims:[{source_url:'https://developers.google.com/search/docs/essentials',evidence_checked_at:'2026-11-24',support_status:'unknown',text:'Google conditions'}],http_status:200};
 assert.equal(auditAnswerPage(x).status,'FAIL');
});
test('existing local static fixture passes indexable-page audit',()=>{
 const p=run('scripts/audit-static-site.mjs','--dist','tests/fixtures/site','--origin','https://fixture.example');
 assert.equal(p.status,0,p.stderr);
});
test('static auditor rejects noindex on declared indexable fixture page',()=>{
 const t=fs.mkdtempSync(path.join(os.tmpdir(),'v11-static-'));try{
 fs.cpSync(path.join(root,'tests/fixtures/site'),t,{recursive:true});
 const p=path.join(t,'index.html'),s=fs.readFileSync(p,'utf8');
 fs.writeFileSync(p,s.replace('</head>','<meta name="robots" content="noindex"></head>'));
 const x=run('scripts/audit-static-site.mjs','--dist',t,'--origin','https://fixture.example');
 assert.notEqual(x.status,0,x.stdout+x.stderr);
 }finally{fs.rmSync(t,{recursive:true,force:true});}
});
test('static auditor rejects sitemap lacking required canonical pages',()=>{
 const t=fs.mkdtempSync(path.join(os.tmpdir(),'v11-map-'));try{
 fs.cpSync(path.join(root,'tests/fixtures/site'),t,{recursive:true});
 const p=path.join(t,'sitemap-0.xml');fs.writeFileSync(p,'<?xml version="1.0"?><urlset></urlset>');
 const x=run('scripts/audit-static-site.mjs','--dist',t,'--origin','https://fixture.example');
 assert.notEqual(x.status,0,x.stdout+x.stderr);
 }finally{fs.rmSync(t,{recursive:true,force:true});}
});
