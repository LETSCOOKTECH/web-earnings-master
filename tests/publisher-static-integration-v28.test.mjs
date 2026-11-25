import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const root=path.resolve(import.meta.dirname,'..');
const origin='https://ownedtools.dev';
function withSite({meta='',robots=null}={},fn){
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'sense-static-v28-'));
 try{
  const html='<html lang="en"><head><title>Useful deterministic file converter</title><meta name="description" content="A useful local converter with a clear output and reliable interface for file tasks."><link rel="canonical" href="'+origin+'/">'+meta+'</head><body><main><h1>File converter</h1></main></body></html>';
  fs.writeFileSync(path.join(tmp,'index.html'),html);
  fs.writeFileSync(path.join(tmp,'robots.txt'),robots??('User-agent: *\nAllow: /\nSitemap: '+origin+'/sitemap-index.xml\n'));
  fs.writeFileSync(path.join(tmp,'sitemap-index.xml'),'<sitemapindex><sitemap><loc>'+origin+'/sitemap.xml</loc></sitemap></sitemapindex>');
  fs.writeFileSync(path.join(tmp,'sitemap.xml'),'<urlset><url><loc>'+origin+'/</loc></url></urlset>');
  fn(tmp);
 }finally{fs.rmSync(tmp,{recursive:true,force:true})}
}
function audit(tmp,monetized=false){
 return spawnSync(process.execPath,['scripts/audit-static-site.mjs','--dist',tmp,'--origin',origin,...(monetized?['--monetized']:[])],{cwd:root,encoding:'utf8'});
}
test('v28 static auditor accepts a clean bounded site fixture',()=>withSite({},tmp=>{
 const r=audit(tmp);assert.equal(r.status,0,r.stderr);assert.match(r.stdout,/PASS: static SEO artifact checks/);
}));
test('v28 static auditor blocks swapped-order indexable noindex tag',()=>withSite({meta:'<meta content="NOINDEX,follow" name="Robots">'},tmp=>{
 const r=audit(tmp);assert.equal(r.status,1,r.stdout);assert.match(r.stderr,/indexable built page has robots html noindex/i);
}));
test('v28 ad-enabled static auditor fails blocked Mediapartners without blocking Googlebot',()=>withSite({
 robots:'User-agent: Mediapartners-Google\nDisallow: /\n\nUser-agent: *\nAllow: /\nSitemap: '+origin+'/sitemap-index.xml\n'
},tmp=>{
 const normal=audit(tmp);assert.equal(normal.status,0,normal.stderr);
 const ad=audit(tmp,true);assert.equal(ad.status,1,ad.stdout);
 assert.match(ad.stderr,/Robots blocks Mediapartners-Google/);
}));
