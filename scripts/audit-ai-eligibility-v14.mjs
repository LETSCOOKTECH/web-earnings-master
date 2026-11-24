#!/usr/bin/env node
// V14 actual local HTML+robots eligibility diagnostics. NO owner indexing/citation claims.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {evaluateRobots} from './robots-evaluator.mjs';
import {extractGoogleRobotHeaderDirectives} from './google-robots-directives.mjs';
export const SEARCH_MODES=Object.freeze({
 google_ai:{crawler:'Googlebot',requiresSnippet:true,requiresIndex:true},
 chatgpt_search:{crawler:'OAI-SearchBot',requiresSnippet:false,requiresIndex:false},
 bing_copilot:{crawler:'Bingbot',requiresSnippet:false,requiresIndex:false},
 claude_search:{crawler:'Claude-SearchBot',requiresSnippet:false,requiresIndex:false},
 perplexity_search:{crawler:'PerplexityBot',requiresSnippet:false,requiresIndex:false}
});
const attr=(tag,name)=>{const rx=new RegExp('(?:^|\\s)'+name+'\\s*=\\s*(?:"([^"]*)"|\\x27([^\\x27]*)\\x27|([^\\s>]+))','i');const m=rx.exec(tag);return m?(m[1]??m[2]??m[3]):null};
const tags=(html,name)=>[...String(html).matchAll(new RegExp('<'+name+'\\b[^>]*>','gi'))].map(x=>x[0]);
const findMeta=(html,name)=>tags(html,'meta').filter(x=>String(attr(x,'name')||'').toLowerCase()===name).map(x=>String(attr(x,'content')||'').toLowerCase());
const text=s=>String(s).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&(?:nbsp|amp|lt|gt);/gi,' ').replace(/\s+/g,' ').trim();
const isRoute=x=>typeof x==='string'&&/^\/(?:[a-z0-9_-]+\/)*$/.test(x);

export function auditAiEligibility({html,robots,path:route='/',modes=Object.keys(SEARCH_MODES),googleControl='UNKNOWN',xRobotsTag=''}={}){
 const errors=[],warnings=[],unknown=['Offline HTML+robots parser cannot prove live HTTP/WAF, actual provider crawler identity, indexing, owner property inclusion, citation selection or human referrals'];
 if(typeof html!=='string'||typeof robots!=='string')return {status:'FAIL',errors:['Actual HTML and robots.txt source text required'],warnings,unknown};
 if(!isRoute(route))errors.push('Invalid public canonical route');
 if(!Array.isArray(modes)||!modes.length||new Set(modes).size!==modes.length||modes.some(m=>!SEARCH_MODES[m]))
  errors.push('Invalid/duplicate provider mode requested');
 if(!['UNKNOWN','INCLUDED_SELF_DECLARED','EXCLUDED_SELF_DECLARED'].includes(googleControl))
  errors.push('Invalid property generative AI inclusion setting');
 if(!/<html(?:\s|>)/i.test(html)||!/<head(?:\s|>)/i.test(html))errors.push('Missing full initial HTML document');
 const title=/<title\b[^>]*>([\s\S]*?)<\/title>/i.exec(html);
 if(!title||text(title[1]).length<6)errors.push('Missing useful initial HTML title');
 const main=/<main\b[^>]*>([\s\S]*?)<\/main>/i.exec(html);
 if(!main||text(main[1]).length<80)errors.push('Missing useful human-readable main content in initial HTML');
 if(!/<h1\b[^>]*>[\s\S]+?<\/h1>/i.test(html))errors.push('Missing visible primary page heading');
 const metas=[...findMeta(html,'robots'),...findMeta(html,'googlebot'),...extractGoogleRobotHeaderDirectives(xRobotsTag).map(x=>x.toLowerCase())];
 const noindex=metas.some(x=>/(?:^|[,\s])(?:noindex|none)(?:$|[,\s])/.test(x));
 const nosnippet=metas.some(x=>/(?:^|[,\s])nosnippet(?:$|[,\s])/.test(x));
 if(noindex)warnings.push('Initial HTML/header noindex: Google Search indexed supporting-link eligibility unavailable');
 if(nosnippet)warnings.push('Initial HTML/header nosnippet: Google AI supporting-link eligibility unavailable');
 const maxSnippetZero=metas.some(x=>/max-snippet\s*:\s*0(?:[,\s]|$)/.test(x));
 if(maxSnippetZero)warnings.push('max-snippet:0 restricts Google Search snippets and direct grounding input; inspect live behavior');
 const results={};
 for(const m of Array.isArray(modes)?modes:[]){
  const mode=SEARCH_MODES[m];if(!mode)continue;
  const decision=evaluateRobots(robots,mode.crawler,route);
  const blockers=[];
  if(!decision.allowed)blockers.push(mode.crawler+' blocked by robots for '+route);
  if(m==='google_ai'){
   if(noindex)blockers.push('Google Search page noindex');
   if(nosnippet)blockers.push('Google AI supporting-link snippet excluded');
   if(maxSnippetZero)blockers.push('Google AI supporting-link snippet max-snippet:0 excluded');
   if(googleControl==='EXCLUDED_SELF_DECLARED')blockers.push('Owner declares generative AI property excluded; independently review setting');
   if(googleControl!=='INCLUDED_SELF_DECLARED')unknown.push('Google AI Search Console property inclusion not independently observed');
   else unknown.push('Google property inclusion only self-declared, not owner-account authenticated');
   unknown.push('Actual Google Search index and snippet eligibility not established by HTML parser');
  }else unknown.push(m+' real verified crawler and answer inclusion not established by local robots');
  results[m]={crawler:mode.crawler,robots_allowed:decision.allowed,matched_rule:decision.match,blocked:!!blockers.length,blockers,
   status:blockers.length?'FAIL_LOCAL_ELIGIBILITY':'UNKNOWN_EXTERNAL',index_or_citation_verified:false};
  if(blockers.length)errors.push(m+': '+blockers.join('; '));
 }
 if(/(?:llms\.txt.*guarantee|guaranteed ai citation|guaranteed google ai mode ranking|ai schema guarantees)/i.test(html))
  errors.push('Unsupported claim of required AI markup or guaranteed AI citation');
 return {status:errors.length?'FAIL':'LOCAL_ELIGIBILITY_ONLY',errors,warnings,unknown,results,
  initial_content_chars:main?text(main[1]).length:0,controls_are_owner_verified:false,
  disclaimer:'This is a bounded parser of local HTML and robots directives, not live Google indexed status, authoritatively identified bot traffic, answer citation, publisher approval or revenue.'};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const a=process.argv.slice(2),val=name=>{const i=a.indexOf(name);return i<0?null:a[i+1]};
 const h=val('--html'),r=val('--robots');if(!h||!r){console.error('Usage: node scripts/audit-ai-eligibility-v14.mjs --html path/index.html --robots path/robots.txt [--path /] [--mode google_ai]');process.exit(2)}
 try{
  const out=auditAiEligibility({html:fs.readFileSync(h,'utf8'),robots:fs.readFileSync(r,'utf8'),path:val('--path')||'/',modes:val('--mode')?[val('--mode')]:Object.keys(SEARCH_MODES),googleControl:val('--google-control')||'UNKNOWN'});
  console.log(JSON.stringify(out,null,2));if(out.status==='FAIL')process.exitCode=1;
 }catch(e){console.error(String(e?.message||e));process.exitCode=2}
}
