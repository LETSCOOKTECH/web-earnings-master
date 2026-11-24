#!/usr/bin/env node
// Google generative-AI control independence audit. Bounded local evidence ONLY.
// Robots matching delegates to the existing tested RFC9309-subset parser.
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {evaluateRobots} from './robots-evaluator.mjs';
import {extractGoogleRobotHeaderDirectives} from './google-robots-directives.mjs';

const OWNER=new Set(['UNKNOWN','INCLUDED_SELF_DECLARED','EXCLUDED_SELF_DECLARED']);
const INTENT=new Set(['INCLUDE_SEARCH_AI','EXCLUDE_SEARCH_AI','AUDIT_ONLY']);
function attr(tag,name){
  const attrs={};
  for(const m of tag.matchAll(/([a-z][\w-]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi))
    attrs[m[1].toLowerCase()]=m[2]??m[3]??m[4];
  return attrs[name]??'';
}
function robotDirectives(html,header){
  const metas=[...html.matchAll(/<meta\b[^>]*>/gi)]
    .map(m=>m[0]).filter(tag=>['robots','googlebot'].includes(attr(tag,'name').toLowerCase()))
    .map(tag=>attr(tag,'content'));
  return metas.concat(extractGoogleRobotHeaderDirectives(header)).join(' , ').toLowerCase();
}
const token=(s,t)=>new RegExp('(?:^|[,;\\s])'+t+'(?:$|[,;\\s])','i').test(s);
export function auditGoogleAiControlsV15({html,robots,route='/',xRobotsTag='',ownerSetting='UNKNOWN',intent='INCLUDE_SEARCH_AI'}={}){
  const errors=[],blockers=[],warnings=[],unknowns=[];
  if(typeof html!=='string'||typeof robots!=='string')errors.push('Local HTML and robots.txt text required');
  if(typeof route!=='string'||!/^\/[a-z0-9/_\-.]*$/i.test(route)||route.includes('..'))errors.push('Invalid absolute local route');
  if(typeof xRobotsTag!=='string')errors.push('X-Robots-Tag must be captured header text');
  if(!OWNER.has(ownerSetting))errors.push('Owner state enum invalid: no pretending owner settings are verified');
  if(!INTENT.has(intent))errors.push('Intent enum invalid');
  if(errors.length)return {status:'FAIL_INPUT',errors,blockers,warnings,unknowns};
  const bot=evaluateRobots(robots,'Googlebot',route);
  const extended=evaluateRobots(robots,'Google-Extended',route);
  const other=evaluateRobots(robots,'GoogleOther',route);
  const directives=robotDirectives(html,xRobotsTag);
  const noindex=token(directives,'noindex')||token(directives,'none');
  const nosnippet=token(directives,'nosnippet');
  const maxSnippetZero=/(?:^|[,;\s])max-snippet\s*:\s*0(?:$|[,;\s])/i.test(directives);
  const selective=/\bdata-nosnippet\b/i.test(html);
  const searchIssues=[];
  if(!bot.allowed)searchIssues.push('Googlebot robots disallow for this path');
  if(noindex)searchIssues.push('noindex prevents Search index eligibility');
  if(nosnippet)searchIssues.push('nosnippet prevents snippet eligibility');
  if(maxSnippetZero)searchIssues.push('max-snippet:0 removes usable Search snippet/direct grounding input');
  if(ownerSetting==='EXCLUDED_SELF_DECLARED')searchIssues.push('Owner declares Search generative AI excluded (not independently authenticated)');
  if(intent==='INCLUDE_SEARCH_AI')blockers.push(...searchIssues);
  if(intent==='EXCLUDE_SEARCH_AI'&&ownerSetting!=='EXCLUDED_SELF_DECLARED')
    warnings.push('Search AI exclusion intent requires owner Search Console control verification; Google-Extended is not the Search AI opt-out');
  if(selective)warnings.push('data-nosnippet is a selective passage control, not page-level noindex');
  if(!extended.allowed)warnings.push('Google-Extended disallowed: affects documented non-Search generative product uses, not Search AI inclusion');
  if(!other.allowed)warnings.push('GoogleOther disallowed: does not independently block Googlebot Search');
  unknowns.push('Actual Search Console property inclusion is not authenticated by this local checker');
  unknowns.push('Actual Google indexing, served snippets, citations, visits and revenue not tested');
  unknowns.push('Real HTTP/CDN/WAF response and verified crawler identity require independent live checks');
  unknowns.push('Future __usage_ai-training preference signal is not a currently enforceable Search AI requirement');
  return {
    status:blockers.length?'LOCAL_CONFLICT':'LOCAL_ONLY_EXTERNAL_UNKNOWN',
    errors,blockers,warnings,unknowns,intent,
    google_search_ai:{
      googlebot_robots_allowed:bot.allowed,googlebot_matched_rule:bot.match,
      noindex,nosnippet,max_snippet_zero:maxSnippetZero,selective_data_nosnippet:selective,
      owner_setting_self_declared:ownerSetting,local_search_issues:searchIssues,
      owner_control_authenticated:false,indexed_or_cited_verified:false
    },
    independent_non_search_controls:{
      google_extended_robots_allowed:extended.allowed,
      google_other_robots_allowed:other.allowed,
      training_2027_signal:'FUTURE_NOT_CURRENT',
      search_ai_inclusion_inferred_from_google_extended:false
    },
    disclaimer:'LOCAL POLICY DIAGNOSTIC ONLY. No Google search index, crawler identity, owner account, AI citation, referral, publisher approval or financial result is certified.'
  };
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const args=process.argv.slice(2),v=n=>{const i=args.indexOf(n);return i<0?null:args[i+1];};
  const html=v('--html'),robots=v('--robots');
  if(!html||!robots){console.error('Usage: node scripts/audit-ai-controls-v15.mjs --html public/index.html --robots public/robots.txt [--route /] [--x-robots value] [--owner UNKNOWN] [--intent INCLUDE_SEARCH_AI]');process.exitCode=2;}
  else{
    try{const out=auditGoogleAiControlsV15({html:fs.readFileSync(html,'utf8'),robots:fs.readFileSync(robots,'utf8'),route:v('--route')||'/',xRobotsTag:v('--x-robots')||'',ownerSetting:v('--owner')||'UNKNOWN',intent:v('--intent')||'INCLUDE_SEARCH_AI'});
      console.log(JSON.stringify(out,null,2));if(out.status==='LOCAL_CONFLICT'||out.status==='FAIL_INPUT')process.exitCode=1;
    }catch(e){console.error(String(e?.message||e));process.exitCode=2;}
  }
}
