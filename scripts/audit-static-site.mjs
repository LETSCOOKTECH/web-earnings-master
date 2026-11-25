#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {evaluateRobots} from './robots-evaluator.mjs';
import {validatePublicSiteOrigin} from './validate-public-origin-v20.mjs';

function args(a){const m={};for(let i=0;i<a.length;i++){if(!a[i].startsWith('--'))continue;const key=a[i].slice(2);if(a[i+1]&&!a[i+1].startsWith('--'))m[key]=a[++i];else m[key]=true;}return m;}
const opt=args(process.argv.slice(2));
if(!opt.dist||!opt.origin){console.error('Usage: node scripts/audit-static-site.mjs --dist dist --origin https://example.com');process.exit(2);}
let origin;try{origin=new URL(opt.origin)}catch{console.error('Invalid --origin');process.exit(2)}
if(origin.protocol!=='https:'||origin.pathname!=='/'||origin.search){console.error('HTTPS origin must have / path and no query');process.exit(2)}
if(opt.production){const g=validatePublicSiteOrigin(opt.origin);if(!g.ok){console.error('PRODUCTION FAIL: '+g.issues.join('; '));process.exit(2)}}
const dir=path.resolve(opt.dist);if(!fs.existsSync(dir)){console.error(`Missing dist folder: ${dir}`);process.exit(2)}
const warnings=[],errors=[];
const titleMap=new Map(),canonicalMap=new Map(),siteUrls=[];
function list(p){return fs.readdirSync(p,{withFileTypes:true}).flatMap(x=>x.isDirectory()?list(path.join(p,x.name)):[path.join(p,x.name)]);}
const files=list(dir),htmls=files.filter(f=>f.endsWith('.html') && !/(^|\/)404\.html$/.test(f));
if(htmls.length===0)errors.push('No HTML output found');
const clean=s=>s.replace(/\s+/g,' ').trim();
function tag(html,key){const m=[...html.matchAll(/<meta\s+[^>]*>/gi)].map(x=>x[0]);return m.find(t=>new RegExp(`(?:name|property)=["']${key}["']`,'i').test(t))?.match(/content=["']([^"']*)["']/i)?.[1]??'';}
for(const f of htmls){
 const relative=path.relative(dir,f).replace(/\\/g,'/');
 let slug=relative==='index.html'?'/':'/'+relative.replace(/\/index\.html$/,'/').replace(/\.html$/,'/');
 const html=fs.readFileSync(f,'utf8');
 // Test referenced local asset PRESENCE; actual JS execution requires E2E.
 for(const match of html.matchAll(/<(?:script|link)\b[^>]*>/gi)){
  const element=match[0];
  const isScript=/^<script\b/i.test(element);
  const stylesheet=!isScript&&/\brel=["']stylesheet["']/i.test(element);
  if(!isScript&&!stylesheet)continue;
  const attrs=new Map([...element.matchAll(/([a-z-]+)\s*=\s*["']([^"']+)["']/gi)].map(m=>[m[1].toLowerCase(),m[2]]));
  const asset=attrs.get(isScript?'src':'href');
  if(!asset)continue;
  let resolved;
  try{resolved=new URL(asset,new URL(slug,origin));}catch{errors.push(relative+': malformed script/stylesheet asset '+asset);continue}
  if(resolved.origin!==origin.origin){warnings.push(relative+': third-party script/style needs source, CSP and privacy review '+resolved.href);continue}
  const candidate=path.resolve(dir,decodeURIComponent(resolved.pathname).replace(/^\//,''));
  if(!candidate.startsWith(dir+path.sep)||!fs.existsSync(candidate)||!fs.statSync(candidate).isFile())
   errors.push(relative+': missing or unsafe local script/stylesheet '+asset);
 }

 const title=clean(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]??'');
 const h1=[...html.matchAll(/<h1\b[^>]*>/gi)].length;
 const description=tag(html,'description');
 const canTag=[...html.matchAll(/<link\s+[^>]*rel=["']canonical["'][^>]*>/gi)].map(x=>x[0]);
 const canonical=canTag[0]?.match(/href=["']([^"']*)["']/i)?.[1]??'';
 const target=new URL(slug,origin).href;
 if(!/<html\s[^>]*lang=/i.test(html))warnings.push(`${relative}: missing html lang`);
 if(!title||title.length<8)errors.push(`${relative}: missing/short title`);
 if(!description||description.length<40)errors.push(`${relative}: missing/short description`);
 if(h1!==1)errors.push(`${relative}: expected one h1, got ${h1}`);
 if(canTag.length!==1)errors.push(`${relative}: expected exactly one canonical link`);
 if(canonical!==target)errors.push(`${relative}: expected canonical ${target}, got ${canonical}`);
 if(/<meta\s+[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html))errors.push(`${relative}: noindex on a built page in this indexable-page audit; use an explicit noindex-aware project route manifest for intentional exclusions`);
 if(titleMap.has(title))errors.push(`${relative}: duplicate title with ${titleMap.get(title)}`);titleMap.set(title,relative);
 if(canonicalMap.has(canonical))errors.push(`${relative}: duplicate canonical with ${canonicalMap.get(canonical)}`);canonicalMap.set(canonical,relative);
 siteUrls.push(target);
}
const robots=path.join(dir,'robots.txt'),index=path.join(dir,'sitemap-index.xml');
if(!fs.existsSync(robots))errors.push('Missing robots.txt');
else{
 const r=fs.readFileSync(robots,'utf8');
 for(const target of siteUrls){
   const pathname=new URL(target).pathname;
   for(const bot of ['Googlebot','Bingbot']){
    const decision=evaluateRobots(r,bot,pathname);
    if(!decision.allowed)errors.push(`Robots blocks ${bot} from indexable ${pathname}; applicable group: ${decision.selectedAgents.join(',')} matched: ${JSON.stringify(decision.match)}`);
   }
  }
 if(!r.includes('Sitemap: '+new URL('/sitemap-index.xml',origin).href))errors.push('Robots Sitemap path missing/mismatch');
}
if(!fs.existsSync(index))errors.push('Missing sitemap-index.xml');
else{
 const indexTxt=fs.readFileSync(index,'utf8');
 const sitemapNames=[...indexTxt.matchAll(/<loc>([^<]+)<\/loc>/gi)].map(x=>x[1]);
 if(!sitemapNames.length)errors.push('Sitemap index has no entries');
 const urlsInMaps=new Set();
 for(const u of sitemapNames){
  let loc;try{loc=new URL(u)}catch{errors.push(`Bad sitemap reference ${u}`);continue}
  if(loc.origin!==origin.origin)errors.push(`External sitemap ${u}`);
  const p=path.join(dir,decodeURIComponent(loc.pathname).replace(/^\//,''));
  if(!fs.existsSync(p)){errors.push(`Referenced sitemap not found ${loc.pathname}`);continue;}
  const xml=fs.readFileSync(p,'utf8');
  for(const m of xml.matchAll(/<loc>([^<]+)<\/loc>/gi))urlsInMaps.add(m[1]);
 }
 for(const u of siteUrls)if(!urlsInMaps.has(u))errors.push(`Canonical page omitted from sitemap: ${u}`);
 for(const u of urlsInMaps)if(!siteUrls.includes(u))warnings.push(`Sitemap URL has no matching built HTML: ${u}`);
}
console.log(`Checked ${htmls.length} built HTML pages, robots, sitemap. (STATIC SIGNALS ONLY)`);
if(warnings.length)console.warn('WARNINGS:\n'+warnings.join('\n'));
if(errors.length){console.error('FAIL:\n'+errors.join('\n'));process.exitCode=1;}
else console.log('PASS: static SEO artifact checks (does NOT prove indexing, ranking, live HTTP or policy approval).');

