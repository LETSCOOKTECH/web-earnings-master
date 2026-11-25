import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const required=['index.html','tools/jsonl-inspector/index.html','privacy/index.html',
 'about/index.html','404.html','robots.txt','favicon.svg','scripts/jsonl-ui.mjs',
 'scripts/jsonl-core.mjs','scripts/jsonl-worker.mjs','sitemap-index.xml'];
const errors=[];
for(const file of required)if(!fs.existsSync(path.join(dist,file)))errors.push('Missing built file: '+file);
const fixture=(process.env.RELEASE_STAGE||'FIXTURE_ONLY')==='FIXTURE_ONLY';
if(fs.existsSync(path.join(dist,'index.html'))){
 const home=fs.readFileSync(path.join(dist,'index.html'),'utf8');
 const tool=fs.readFileSync(path.join(dist,'tools/jsonl-inspector/index.html'),'utf8');
 const target=process.env.SITE_URL||'https://starter.example.org';
 const expected=target.replace(/\/$/,'');
 for(const [where,html,url] of [['home',home,expected+'/'],['tool',tool,expected+'/tools/jsonl-inspector/']]){
  if(!html.includes('rel="canonical"')||!html.includes(url))errors.push(where+' missing exact expected canonical');
  if(fixture&&!/name="robots"[^>]*content="noindex,nofollow"/.test(html))errors.push(where+' fixture not marked noindex');
  if(!html.includes('<h1'))errors.push(where+' lacks meaningful initial headline');
 }
 if(!tool.includes('jsonl-ui.mjs'))errors.push('Tool page did not load the functional application');
}
if(fs.existsSync(path.join(dist,'robots.txt'))){
 const r=fs.readFileSync(path.join(dist,'robots.txt'),'utf8');
 if(fixture&&!r.includes('Disallow: /'))errors.push('Fixture robots must disallow crawling');
 if(!fixture&&r.includes('Disallow: /'))errors.push('Candidate robots disallow all crawling');
}
const report={status:errors.length?'FAIL':'BUILD_ARTIFACT_ONLY_NOT_DEPLOYED',checked:required.length,errors,
 external_http_verified:false,search_index_verified:false,ai_citations_verified:false,publisher_approved_verified:false,
 warning:'Exact compiled files were inspected locally. Public hosting, GSC/AI visibility and revenue require independent external evidence.'};
console.log(JSON.stringify(report,null,2));
if(errors.length)process.exitCode=1;
