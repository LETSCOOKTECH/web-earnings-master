import {createHash} from 'node:crypto';
import {evaluateRobots} from '../../scripts/robots-evaluator.mjs';
import {BOT_NAME,DEFAULT_LIMITS,safeURL,validateOrigin,fetchPublic} from './safe-http.mjs';
import {decodeSitemapBody,parseSitemapXML,sitemapLocationsFromRobots} from './xml.mjs';
import {inspectHTML} from './html.mjs';

const LIMIT_MAX={maxPages:250,maxSitemaps:40,maxDepth:8,maxSitemapDepth:6,maxLinksPerPage:300,maxSeeds:100,maxBytesPerPage:2_000_000,maxBytesPerSitemap:4_000_000,maxTotalBytes:80_000_000,maxTimeMs:300_000,minDelayMs:30_000,timeoutMs:30_000};
const safeNumber=(n,def,max,min=0)=>Number.isSafeInteger(n)&&n>=min?Math.min(n,max):def;
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const BODY_EXCLUDED=/\.(?:xml|gz|pdf|zip|tar|7z|png|jpe?g|gif|ico|svg|webp|avif|woff2?|css|js|mjs|map|mp3|mp4|webm|webmanifest|json|txt)$/i;
const SIDE_EFFECT_PATH=/(?:^|\/)(?:logout|signout|delete|destroy|remove|purchase|checkout|payment|pay-now)(?:\/|$)/i;
function isCandidatePage(href){
  const u=new URL(href);
  return !BODY_EXCLUDED.test(u.pathname)&&!SIDE_EFFECT_PATH.test(u.pathname)&&!u.pathname.startsWith('/api/');
}
export function compactSiteDigest(report){
  const clean={origin:report.origin,site_map_urls:report.sitemap_urls,
    page_summaries:report.pages.map(p=>[p.url,p.status,p.html_sha256,p.canonical,p.noindex,p.links]),
    network_headers:report.pages.map(p=>[p.url,p.technology_indicators])};
  return createHash('sha256').update(JSON.stringify(clean)).digest('hex');
}
export function diffSiteReports(previous,current){
  if(previous.origin!==current.origin)throw new Error('SITE_DIFF_ORIGIN_MISMATCH');
  const before=new Map((previous.pages??[]).map(p=>[p.url,p]));
  const after=new Map((current.pages??[]).map(p=>[p.url,p]));
  const added=[...after.keys()].filter(u=>!before.has(u));
  const removed=[...before.keys()].filter(u=>!after.has(u));
  const changed=[...after.keys()].filter(u=>before.has(u)&&(
    before.get(u).html_sha256!==after.get(u).html_sha256||
    before.get(u).status!==after.get(u).status||
    before.get(u).canonical!==after.get(u).canonical
  ));
  return {origin:current.origin,added,removed,changed,limitations:'Removed means absent from sampled crawl, not proven removed from remote website. Compare equivalent crawl budgets and robots decisions.'};
}
export function buildSiteGraph({origin,pages,sitemap_urls}){
  const nodes=new Map(pages.map(p=>[p.url,p]));
  const edges=[...new Map(pages.flatMap(p=>(p.links??[]).map(to=>[p.url+' -> '+to,{from:p.url,to}]))).values()];
  const incoming=new Map();
  for(const e of edges)incoming.set(e.to,(incoming.get(e.to)??0)+1);
  const root=origin+'/',distance=new Map([[root,0]]),front=[root];
  for(let i=0;i<front.length;i++){
    const source=front[i],next=(nodes.get(source)?.links??[]);
    for(const to of next){if(!distance.has(to)){distance.set(to,distance.get(source)+1);front.push(to);}}
  }
  const sitemapSet=new Set(sitemap_urls);
  const linkedSet=new Set(edges.map(e=>e.to));
  return {
    nodes:pages.length,edges:edges.length,
    edge_sample:edges.slice(0,500),
    sampled_navigation_depths:pages.map(p=>({url:p.url,depth:distance.get(p.url)??null,observed_inlinks:incoming.get(p.url)??0})),
    possible_unlinked_sitemap_pages:[...sitemapSet].filter(u=>!linkedSet.has(u)&&u!==root).slice(0,100),
    link_only_pages:[...new Set(edges.map(e=>e.to))].filter(x=>!sitemapSet.has(x)).slice(0,100),
    limitations:'Navigation graph is a sampled, raw-HTML link graph; sitemap-only pages are NOT proven true site orphans. JS-rendered links are not included.',
  };
}
export async function inspectSite({
  origin,authorizedOrigin,seedUrls=[],limits={},fetcher=fetchPublic,
  fixture=false,includeQueries=false,now=()=>Date.now(),delay=sleep,
}={}){
  if(!origin||!authorizedOrigin)throw new Error('EXPLICIT_AUTHORIZED_ORIGIN_REQUIRED');
  const site=validateOrigin(origin,{fixture}),authorized=validateOrigin(authorizedOrigin,{fixture});
  if(site!==authorized)throw new Error('ORIGIN_AUTHORIZATION_MISMATCH');
  const cap={};
  for(const [key,max] of Object.entries(LIMIT_MAX))cap[key]=safeNumber(limits[key],DEFAULT_LIMITS[key],max,key==='maxPages'||key==='maxSitemaps'?1:0);
  if(!Array.isArray(seedUrls)||seedUrls.length>cap.maxSeeds)throw new Error('SEED_BUDGET_EXCEEDED');
  const began=now(),errors=[],warnings=[],sitemap_urls=[],sitemaps=[],pages=[];
  const knownPages=new Set(),pendingLinked=[],pendingSitemaps=[],requestedPages=new Set();
  const knownSitemaps=new Set(),mapQueue=[];
  let bytes=0,requests=0,lastRequest=0,robots='',robotsStatus='NOT_CHECKED',truncated=false;
  let abort=false;
  const log=(code,url,detail)=>errors.push({code,url:url??site,detail:String(detail??'').slice(0,200)});
  const timeLeft=()=>now()-began<cap.maxTimeMs;
  const enqueue=(value,{sitemap=false,depth=0}={})=>{
    const href=safeURL(value,site,{includeQueries,fixture});
    if(!href||!isCandidatePage(href))return false;
    if(!knownPages.has(href)){
      knownPages.add(href);
      if(sitemap)pendingSitemaps.push({url:href,depth});
      else pendingLinked.push({url:href,depth});
    }else if(!sitemap&&!requestedPages.has(href)&&!pendingLinked.some(x=>x.url===href)){
      // Site link discovered after a sitemap entry: prioritize within the remaining budget.
      pendingLinked.push({url:href,depth});
    }
    return true;
  };
  const canFetch=(href)=>evaluateRobots(robots,BOT_NAME,new URL(href).pathname+new URL(href).search).allowed;
  const get=async(href,maxBytes)=>{
    if(!timeLeft()){truncated=true;throw new Error('GLOBAL_TIME_BUDGET');}
    if(bytes>=cap.maxTotalBytes){truncated=true;throw new Error('GLOBAL_BYTE_BUDGET');}
    if(requests>0&&cap.minDelayMs>0)await delay(Math.max(0,cap.minDelayMs-(now()-lastRequest)));
    if(!timeLeft()){truncated=true;throw new Error('GLOBAL_TIME_BUDGET');}
    lastRequest=now();requests++;
    const remain=cap.maxTotalBytes-bytes;
    if(remain<=0)throw new Error('GLOBAL_BYTE_BUDGET');
    const response=await fetcher(href,{maxBytes:Math.min(maxBytes,remain),timeoutMs:cap.timeoutMs,userAgent:BOT_NAME});
    if(!response||!Number.isInteger(response.status)||!Buffer.isBuffer(response.body))throw new Error('INVALID_TRANSPORT_RESULT');
    bytes+=response.body.length;
    if(bytes>cap.maxTotalBytes){truncated=true;throw new Error('GLOBAL_BYTE_BUDGET');}
    return response;
  };
  try{
    const check=await get(site+'/robots.txt',512*1024);
    if(check.status===200){
      robots=new TextDecoder('utf-8',{fatal:false}).decode(check.body);
      robotsStatus='READ_AND_ENFORCED_SUBSET';
    }else if(check.status===404||check.status===410){
      robotsStatus='ABSENT_404_ALLOW';
    }else{robotsStatus='BLOCKED_ROBOTS_STATUS_'+check.status;abort=true;log('ROBOTS_UNAVAILABLE',site+'/robots.txt','Fail closed for errors/redirects/403/429');}
  }catch(e){abort=true;robotsStatus='BLOCKED_ROBOTS_ERROR';log('ROBOTS_FETCH_FAILED',site+'/robots.txt',e.message);}
  if(abort)return {
    schema:'sense-site-intelligence-v24',origin:site,authorization:'OPERATOR_DECLARED_NOT_OWNERSHIP_VERIFIED',
    observed_at:new Date().toISOString(),status:'BLOCKED_ROBOTS_UNAVAILABLE',limits:cap,
    robots:{status:robotsStatus,compliance:'RFC9309_SUBSET_NOT_NORMATIVE'},requests,bytes,errors,warnings,
    sitemap_urls,sitemaps,pages,graph:null,architecture:null,truncated,
    external_unknowns:['Private backend','Databases','Source code','Infrastructure cost','Actual search rankings'],
  };
  const baseMaps=sitemapLocationsFromRobots(robots);
  for(const value of [...baseMaps,site+'/sitemap.xml',site+'/sitemap_index.xml',site+'/sitemap-index.xml']){
    const href=safeURL(value,site,{includeQueries:false,fixture});
    if(href&&!knownSitemaps.has(href)){knownSitemaps.add(href);mapQueue.push({url:href,depth:0});}
    else if(value&&!href)warnings.push({code:'CROSS_ORIGIN_SITEMAP_SKIPPED',url:String(value).slice(0,250)});
  }
  while(mapQueue.length&&sitemaps.length<cap.maxSitemaps&&timeLeft()){
    const item=mapQueue.shift();
    if(item.depth>cap.maxSitemapDepth){truncated=true;continue;}
    if(!canFetch(item.url)){sitemaps.push({url:item.url,status:'BLOCKED_ROBOTS'});continue;}
    try{
      const response=await get(item.url,cap.maxBytesPerSitemap);
      if(response.status!==200){sitemaps.push({url:item.url,status:'HTTP_'+response.status});continue;}
      const xml=decodeSitemapBody(response.body,{maxInflatedBytes:8_000_000});
      const parsed=parseSitemapXML(xml);
      sitemaps.push({url:item.url,status:'PARSED',kind:parsed.kind,entries:parsed.entries.length,bytes:response.body.length,sha256:createHash('sha256').update(response.body).digest('hex')});
      for(const entry of parsed.entries){
        const href=safeURL(entry.url,site,{includeQueries,fixture});
        if(!href){warnings.push({code:'CROSS_ORIGIN_SITEMAP_ENTRY_SKIPPED',source:item.url});continue;}
        if(parsed.kind==='index'){
          if(!knownSitemaps.has(href)){
            knownSitemaps.add(href);
            mapQueue.push({url:href,depth:item.depth+1});
          }
        }else if(isCandidatePage(href)&&!sitemap_urls.includes(href)){
          if(sitemap_urls.length>=2000){truncated=true;break;}
          sitemap_urls.push(href);enqueue(href,{sitemap:true});
        }
      }
    }catch(e){log('SITEMAP_UNREADABLE',item.url,e.message);sitemaps.push({url:item.url,status:'ERROR',error:String(e.message).slice(0,160)});}
  }
  if(mapQueue.length){truncated=true;warnings.push({code:'SITEMAP_CRAWL_BUDGET_REACHED',remaining:mapQueue.length});}
  enqueue(site+'/',{depth:0});
  for(const input of seedUrls){const href=typeof input==='string'?input:input?.url;if(href)enqueue(href,{depth:0});}
  let turn=0;
  while((pendingLinked.length||pendingSitemaps.length)&&pages.length<cap.maxPages&&timeLeft()){
    const group=turn++%2===0?(pendingLinked.length?pendingLinked:pendingSitemaps):(pendingSitemaps.length?pendingSitemaps:pendingLinked);
    const item=group.shift();
    if(requestedPages.has(item.url))continue;
    requestedPages.add(item.url);
    if(item.depth>cap.maxDepth)continue;
    if(!canFetch(item.url)){pages.push({url:item.url,status:'BLOCKED_ROBOTS',links:[],in_sitemap:sitemap_urls.includes(item.url),analysis_scope:'NOT_FETCHED'});continue;}
    try{
      const response=await get(item.url,cap.maxBytesPerPage);
      const type=(response.headers?.['content-type']??'').toLowerCase();
      if(response.status!==200){pages.push({url:item.url,status:'HTTP_'+response.status,links:[],in_sitemap:sitemap_urls.includes(item.url),analysis_scope:'HTTP_ONLY'});continue;}
      if(!type.includes('text/html')&&!/^\s*<!doctype html|^\s*<html/i.test(response.body.toString('utf8',0,100))){
        pages.push({url:item.url,status:'NON_HTML',content_type:type,links:[],in_sitemap:sitemap_urls.includes(item.url),analysis_scope:'HTTP_ONLY'});continue;
      }
      let body=response.body;
      if(response.headers?.['content-encoding']==='gzip')body=Buffer.from(decodeSitemapBody(response.body,{maxInflatedBytes:cap.maxBytesPerPage*3}));
      const p=inspectHTML({url:item.url,origin:site,body,headers:response.headers,includeQueries,fixture,maxLinks:cap.maxLinksPerPage});
      pages.push({...p,status:'HTTP_200',content_type:type,in_sitemap:sitemap_urls.includes(item.url)});
      for(const href of p.links)if(item.depth<cap.maxDepth)enqueue(href,{depth:item.depth+1});
    }catch(e){log('PAGE_UNREADABLE',item.url,e.message);pages.push({url:item.url,status:'ERROR',links:[],in_sitemap:sitemap_urls.includes(item.url),error:String(e.message).slice(0,180),analysis_scope:'HTTP_OR_PARSE_ERROR'});}
  }
  if(pendingLinked.length||pendingSitemaps.length||!timeLeft())truncated=true;
  const graph=buildSiteGraph({origin:site,pages,sitemap_urls});
  const indicators=new Map();
  for(const p of pages)for(const x of p.technology_indicators??[]){
    const key=x.technology+'::'+x.signal;
    if(!indicators.has(key))indicators.set(key,{...x,observed_pages:0});
    indicators.get(key).observed_pages++;
  }
  const architecture={
    source:'PUBLIC_STATIC_HTTP_ONLY',
    observed_signals:[...indicators.values()].slice(0,80),
    form_actions:[...new Set(pages.flatMap(p=>(p.forms??[]).map(x=>x.action).filter(Boolean)))].slice(0,80),
    hosting_backend_database:'UNKNOWN_NOT_OBSERVABLE',
    private_api_methods:'UNKNOWN_NOT_PROBED',
    confidence_policy:'Headers are observations; framework identification from assets is an inference; no private architecture is claimed',
  };
  const report={
    schema:'sense-site-intelligence-v24',origin:site,authorization:'OPERATOR_DECLARED_NOT_OWNERSHIP_VERIFIED',
    observed_at:new Date().toISOString(),status:truncated?'PARTIAL_BUDGET_LIMIT':errors.length?'PARTIAL_WITH_ERRORS':'PUBLIC_HTTP_OBSERVED',
    limits:cap,robots:{status:robotsStatus,compliance:'RFC9309_SUBSET_NOT_NORMATIVE'},requests,bytes,
    errors,warnings,truncated,sitemap_urls,sitemaps,pages,graph,architecture,
    external_unknowns:['Private backend/source','Databases and infrastructure topology','Real financial cost','Private user journeys','Actual indexing, AI citation and publisher account'],
  };
  report.digest=compactSiteDigest(report);
  return report;
}
