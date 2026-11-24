#!/usr/bin/env node
// Crawler-specific robots diagnostic for public routes; not search-engine simulation.
import fs from 'node:fs';
import {parseRobots,evaluateRobots} from './robots-evaluator.mjs';
const args=process.argv.slice(2);
const val=(name)=>{const i=args.indexOf(name);return i<0?null:args[i+1];};
const all=(name)=>args.flatMap((x,i)=>x===name&&args[i+1]?[args[i+1]]:[]);
const file=val('--file');
if(!file){console.error('Usage: --file robots.txt [--path /tools/name/] [--bot Googlebot] [--bot Bingbot]');process.exit(2)}
let txt;
try{txt=fs.readFileSync(file,'utf8')}catch(e){console.error('Cannot read robots.txt: '+e.message);process.exit(2)}
const groups=parseRobots(txt),bots=all('--bot').length?all('--bot'):['Googlebot','Bingbot'],paths=all('--path').length?all('--path'):['/'];
const errors=[],findings=[];
if(!groups.length)errors.push('No applicable User-agent groups');
for(const p of paths){
 if(typeof p!=='string'||!p.startsWith('/')||p.startsWith('//')||p.includes('#')){errors.push('Invalid path '+p);continue}
 for(const bot of bots){
  if(!/^[A-Za-z0-9_-]+$/.test(bot)){errors.push('Invalid crawler token '+bot);continue}
  const outcome=evaluateRobots(txt,bot,p);
  findings.push({crawler:bot,path:p,allowed:outcome.allowed,group:outcome.selectedAgents,matched:outcome.match});
  if(!outcome.allowed)errors.push(bot+' blocked from '+p+' by '+JSON.stringify(outcome.match)+', group '+JSON.stringify(outcome.selectedAgents));
 }
}
const sitemapDeclarations=txt.split(/\r?\n/).map(s=>s.replace(/#.*$/,'').trim()).filter(x=>/^Sitemap\s*:/i.test(x)).map(x=>x.split(':').slice(1).join(':').trim());
for(const link of sitemapDeclarations){
 try{const u=new URL(link);if(u.protocol!=='https:'||u.username||u.password||/example|your-domain|localhost/i.test(u.hostname))errors.push('Invalid/placeholder sitemap URL '+link)}
 catch{errors.push('Malformed sitemap declaration '+link)}
}
const report={status:errors.length?'FAIL':'PASS_ROBOTS_SUBSET',errors,findings,groups:groups.length,sitemap_count:sitemapDeclarations.length,
 disclaimer:'RFC9309 educational subset; cannot verify actual crawler user agent, WAF, CDN, Google indexing, search ranking or every vendor extension.'};
console.log(JSON.stringify(report,null,2));
if(errors.length)process.exitCode=1;
