/**
 * Bounded release checks for declared indexable and ad-monetized routes.
 * Only examines initial HTML, returned headers and supplied robots.txt text.
 * Not a provider crawler, live browser audit or AdSense approval assertion.
 */
import {evaluateRobots} from './robots-evaluator.mjs';

const DIRECTIVE_BLOCK=/(?:^|[\s,])(?:noindex|none)(?=$|[\s,])/i;
const SEARCH_AGENTS=['Googlebot','Bingbot'];
const OPTIONAL_AI_AGENTS=['OAI-SearchBot','PerplexityBot'];
const AD_AGENT='Mediapartners-Google';

function getHeader(headers,name){
 if(headers&&typeof headers.get==='function')return String(headers.get(name)||'');
 const key=Object.keys(headers||{}).find(k=>k.toLowerCase()===name.toLowerCase());
 return key===undefined?'':String(headers[key]??'');
}
function parseAttributes(tag){
 const attrs={};
 for(const [,key,dq,sq,bare] of tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g))
  attrs[key.toLowerCase()]=dq??sq??bare;
 return attrs;
}
export function findNoindexDirectives(html,headers={}){
 const directives=[];
 for(const match of String(html).matchAll(/<meta\b[^>]*>/gi)){
  const a=parseAttributes(match[0]);
  if(!['robots','googlebot','bingbot','oai-searchbot','perplexitybot'].includes((a.name||'').toLowerCase()))continue;
  if(DIRECTIVE_BLOCK.test(a.content||''))directives.push({source:'html',agent:a.name.toLowerCase(),value:a.content});
 }
 const x=getHeader(headers,'x-robots-tag');
 // Inspect comma-separated directives independently: an AI-only noindex is not a Googlebot noindex.
 for(const part of x.split(',')){
  const raw=part.trim();if(!raw)continue;
  const colon=raw.indexOf(':');
  const agent=colon>=0?raw.slice(0,colon).trim().toLowerCase():'all';
  const value=colon>=0?raw.slice(colon+1).trim():raw;
  if(DIRECTIVE_BLOCK.test(value))directives.push({source:'header',agent,value});
 }
 return directives;
}
export function auditPublisherRoute({html='',headers={},robotsText=null,route='/',indexable=true,monetized=false,aiDiscovery=false}={}){
 if(typeof route!=='string'||!route.startsWith('/'))throw Error('Route must be an absolute path');
 const failures=[],warnings=[],observed={robots_checked:typeof robotsText==='string',html_checked:typeof html==='string',headers_checked:!!headers,monetized,aiDiscovery};
 if(indexable){
  for(const d of findNoindexDirectives(html,headers)){
   const msg=`${d.source} ${d.agent} noindex/none directive on ${route}`;
   if(['robots','all','googlebot','bingbot'].includes(d.agent))failures.push('INDEXABLE_ROUTE_NOINDEX: '+msg);
   else if(aiDiscovery&&OPTIONAL_AI_AGENTS.map(x=>x.toLowerCase()).includes(d.agent))warnings.push('AI_DISCOVERY_NOINDEX: '+msg);
  }
  if(typeof robotsText==='string'){
   for(const agent of SEARCH_AGENTS){
    if(!evaluateRobots(robotsText,agent,route).allowed)failures.push(`ROBOTS_BLOCKS_${agent.toUpperCase()}: ${route}`);
   }
   if(aiDiscovery)for(const agent of OPTIONAL_AI_AGENTS){
    if(!evaluateRobots(robotsText,agent,route).allowed)warnings.push(`ROBOTS_BLOCKS_OPTIONAL_${agent.toUpperCase()}: ${route}`);
   }
  }
 }
 if(monetized){
  if(typeof robotsText==='string'&&!evaluateRobots(robotsText,AD_AGENT,route).allowed)
   failures.push(`ROBOTS_BLOCKS_MEDIAPARTNERS_GOOGLE: ${route}`);
  const coep=getHeader(headers,'cross-origin-embedder-policy').trim().toLowerCase();
  if(/^require-corp(?:\s*[;,]|$)/.test(coep))
   failures.push(`AD_ROUTE_REQUIRES_CROSS_ORIGIN_ISOLATION: ${route}`);
  else if(/^credentialless(?:\s*[;,]|$)/.test(coep))
   warnings.push(`AD_ROUTE_COEP_CREDENTIALLESS_REQUIRES_BROWSER_AD_TEST: ${route}`);
 }
 return {status:failures.length?'FAIL':'PASS_BOUNDED_ONLY',failures,warnings,observed};
}
