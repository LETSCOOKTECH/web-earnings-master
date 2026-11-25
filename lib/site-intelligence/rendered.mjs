import {createHash} from 'node:crypto';
import {inspectHTML} from './html.mjs';
import {safeURL,validateOrigin} from './safe-http.mjs';

const RISKY=/(?:^|\/)(?:auth|account|profile|login|signin|signup|register|reset|password|token|invite|unsubscribe|checkout|payment|delete|destroy)(?:\/|$)/i;
function safeVisibleLink(input,origin,fixture){
  const url=safeURL(input,origin,{fixture});
  if(!url)return null;
  const u=new URL(url);
  if(RISKY.test(u.pathname)||u.pathname.split('/').some(s=>s.length>100||/^[0-9a-f]{28,}$/i.test(s)))return null;
  return url;
}
export function summarizeRenderedDOM(snapshots,{report,fixture=false}={}){
  if(report?.schema!=='sense-site-intelligence-v24'||!report.origin)throw new Error('RENDERED_DOM_REQUIRES_SITE_REPORT');
  const origin=validateOrigin(report.origin+'/',{fixture});
  if(!Array.isArray(snapshots)||snapshots.length>15)throw new Error('RENDERED_DOM_SNAPSHOT_COUNT_LIMIT');
  const existing=new Map((report.pages??[]).map(page=>[page.url,page]));
  let sum=0;
  const observations=[];
  for(const item of snapshots){
    if(!item||typeof item.html!=='string'||typeof item.url!=='string')throw new Error('RENDERED_DOM_INVALID_SNAPSHOT');
    const url=safeURL(item.url,origin,{fixture});
    if(!url||!existing.has(url))throw new Error('RENDERED_DOM_ORIGIN_OR_PAGE_NOT_IN_SCAN');
    const size=Buffer.byteLength(item.html);
    sum+=size;
    if(size>1_000_000||sum>6_000_000)throw new Error('RENDERED_DOM_BYTE_BUDGET');
    const analysis=inspectHTML({url,origin,body:item.html,fixture,maxLinks:150});
    const original=existing.get(url);
    const links=[...new Set(analysis.links.map(x=>safeVisibleLink(x,origin,fixture)).filter(Boolean))];
    const staticLinks=new Set((original.links??[]).map(x=>safeVisibleLink(x,origin,fixture)).filter(Boolean));
    observations.push({
      url,html_sha256:createHash('sha256').update(item.html).digest('hex'),
      public_rendered_h1:analysis.h1??null,observed_static_h1:original.h1??null,
      rendered_internal_links:links.slice(0,120),
      links_not_in_static_html:links.filter(x=>!staticLinks.has(x)).slice(0,120),
      classification:'OPERATOR_SUPPLIED_RENDERED_DOM_UNVERIFIED',
    });
  }
  return {
    schema:'sense-rendered-dom-summary-v24',origin,
    source:'OPERATOR_SUPPLIED_RENDERED_DOM_NOT_INDEPENDENTLY_AUTHENTICATED',
    observations,sensitive_html_retained:false,
    limitations:'This reads no remote page and executes no scripts. The operator must capture an unauthenticated public DOM. JS links may still be absent, and the report cannot prove private architecture or site completeness.',
  };
}
