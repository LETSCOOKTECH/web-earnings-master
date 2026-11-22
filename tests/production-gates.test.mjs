import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {spawnSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
const run=(script,...args)=>spawnSync(process.execPath,[script,...args],{cwd:root,encoding:'utf8'});
test('evidence fixture allows unknown but cannot certify by default',()=>{
 let r=run('scripts/check-evidence.mjs','--file','templates/evidence-manifest.example.json'); assert.equal(r.status,0,r.stderr);
 r=run('scripts/check-evidence.mjs','--file','templates/evidence-manifest.example.json','--strict');assert.notEqual(r.status,0);
});
test('PASS without evidence is rejected',()=>{
 const tmp=path.join(os.tmpdir(),'web-evidence-test-'+process.pid+'.json');
 try{fs.writeFileSync(tmp,JSON.stringify({site_url:'https://example.test',checks:[{id:'adsense',status:'pass',evidence:[]}]}));
 const r=run('scripts/check-evidence.mjs','--file',tmp);assert.notEqual(r.status,0);}
 finally{fs.rmSync(tmp,{force:true})}
});
test('synthetic ads.txt parses but placeholder is rejected',()=>{
 const okay=run('scripts/audit-ads-txt.mjs','--file','tests/fixtures/ads.txt','--seller','google.com');assert.equal(okay.status,0,okay.stderr);
 const tmp=path.join(os.tmpdir(),'web-ads-txt-test-'+process.pid+'.txt');
 try{fs.writeFileSync(tmp,'google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0');assert.notEqual(run('scripts/audit-ads-txt.mjs','--file',tmp).status,0)}
 finally{fs.rmSync(tmp,{force:true})}
});
test('intent map rejects duplicated user jobs',()=>{
 const okay=run('scripts/audit-page-intents.mjs','--file','templates/page-intents.example.json');assert.equal(okay.status,0,okay.stderr);
 const tmp=path.join(os.tmpdir(),'web-intent-test-'+process.pid+'.json');
 try{fs.writeFileSync(tmp,JSON.stringify({pages:[{path:'/tools/a/',user_job:'The same repeated user job exactly',demand_evidence_status:'hypothesis',title:'A',status:'index'},{path:'/tools/b/',user_job:'The same repeated user job exactly',demand_evidence_status:'hypothesis',title:'B',status:'index'}]}));assert.notEqual(run('scripts/audit-page-intents.mjs','--file',tmp).status,0)}
 finally{fs.rmSync(tmp,{force:true})}
});
test('robots wildcard disallow is caught',()=>{
 const r=run('scripts/check-robots-policy.mjs','--file','tests/fixtures/robots-policy-valid.txt');assert.equal(r.status,0,r.stderr);
 const tmp=path.join(os.tmpdir(),'web-robots-test-'+process.pid+'.txt');
 try{fs.writeFileSync(tmp,'User-agent: *\nDisallow: /\nSitemap: https://real-site.org/sitemap.xml');assert.notEqual(run('scripts/check-robots-policy.mjs','--file',tmp).status,0)}
 finally{fs.rmSync(tmp,{force:true})}
});
test('education and official-source registries structured',()=>{
 const s=JSON.parse(fs.readFileSync(path.join(root,'sources/official_sources.json'),'utf8'));
 const l=JSON.parse(fs.readFileSync(path.join(root,'learning/verified-learning-links.json'),'utf8'));
 assert.ok(s.sources.length>=90);assert.ok(l.items.length>=8);
});
