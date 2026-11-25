#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {startOwnedWebLab} from './owned-web-lab.mjs';
import {inspectSite} from '../lib/site-intelligence/engine.mjs';
import {buildSkillHandoffs} from '../lib/site-intelligence/knowledge.mjs';

const outIndex=process.argv.indexOf('--out');
const out=outIndex>=0?process.argv[outIndex+1]:null;
const live=await startOwnedWebLab();
try{
  const fetcher=async(url,{maxBytes,timeoutMs})=>{
    const response=await fetch(url,{redirect:'manual',signal:AbortSignal.timeout(timeoutMs)});
    const buffer=Buffer.from(await response.arrayBuffer());
    if(buffer.length>maxBytes)throw new Error('OWNED_LAB_BODY_SIZE_LIMIT');
    return {url,status:response.status,headers:Object.fromEntries(response.headers.entries()),body:buffer,redirect_followed:false};
  };
  const report=await inspectSite({
    origin:live.origin+'/',authorizedOrigin:live.origin+'/',fixture:true,fetcher,
    limits:{maxPages:8,maxSitemaps:4,maxDepth:2,minDelayMs:0,maxTimeMs:5000},
  });
  const packet=buildSkillHandoffs(report);
  if(report.status.startsWith('BLOCKED'))throw new Error('Unexpected robots block in owned HTTP laboratory');
  if(!report.pages.some(p=>p.url===live.origin+'/document'&&p.status==='HTTP_200'))throw new Error('Document page never observed by the real HTTP crawler');
  if(!report.sitemaps.some(s=>s.status==='PARSED'))throw new Error('No real XML sitemap parsed');
  if(!report.graph||report.graph.edges<1)throw new Error('Link graph missing despite real local page links');
  if(Object.keys(packet.handoffs).length!==10)throw new Error('Not all ten specialist handoffs generated');
  const evidence={
    schema:'sense-owned-http-site-intelligence-acceptance-v24',
    result:'PASS_LOCAL_HTTP_ONLY',origin:'LOOPBACK_PRIVATE_FIXTURE_REDACTED',
    observed_pages:report.pages.length,parsed_sitemaps:report.sitemaps.filter(x=>x.status==='PARSED').length,
    graph_edges:report.graph.edges,skill_handoffs:Object.keys(packet.handoffs),
    no_public_production_or_search_claims:true,
    limits:'Explicit fixture injection; production network transport rejects loopback/private origins',
  };
  if(out){
    const filename=path.resolve(out);fs.mkdirSync(path.dirname(filename),{recursive:true});
    fs.writeFileSync(filename,JSON.stringify(evidence,null,2)+'\n',{flag:'w',mode:0o600});
  }
  console.log(JSON.stringify(evidence,null,2));
}finally{
  await live.close();
}
