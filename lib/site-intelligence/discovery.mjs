import {validateOrigin,safeURL} from './safe-http.mjs';

// Pure, read-only adapter: consumes licensed/manual/public search-result exports.
// This module DOES NOT scrape Google, Bing, Semrush, Ahrefs, or bypass any API.
export function buildDiscoveryInventory(records,{maxSites=50}={}){
  if(!Array.isArray(records))throw new Error('DISCOVERY_INPUT_NOT_ARRAY');
  if(records.length>1000)throw new Error('DISCOVERY_RESULT_CAP');
  const byOrigin=new Map(),rejected=[];
  for(let i=0;i<records.length;i++){
    const item=records[i];
    if(!item||typeof item!=='object'||typeof item.url!=='string'){
      rejected.push({row:i,reason:'MISSING_URL'});continue;
    }
    let origin;
    try{origin=validateOrigin(new URL(item.url).origin+'/');}
    catch{rejected.push({row:i,reason:'UNSAFE_ORIGIN'});continue;}
    const url=safeURL(item.url,origin);
    if(!url){rejected.push({row:i,reason:'UNSAFE_ORIGIN_OR_PATH'});continue;}
    if(!byOrigin.has(origin)){
      if(byOrigin.size>=Math.min(50,Math.max(1,maxSites))){rejected.push({row:i,reason:'SITE_CAP'});continue;}
      byOrigin.set(origin,{origin,seeds:[],evidence:[],site_status:'DISCOVERED_UNFETCHED_AUTHORIZATION_REQUIRED'});
    }
    const site=byOrigin.get(origin);
    if(!site.seeds.includes(url)&&site.seeds.length<100)site.seeds.push(url);
    site.evidence.push({
      url,query:typeof item.query==='string'?item.query.slice(0,150):null,
      region:typeof item.region==='string'?item.region.slice(0,80):null,
      provider:typeof item.provider==='string'?item.provider.slice(0,100):'UNSPECIFIED',
      source_url:typeof item.source_url==='string'&&item.source_url.startsWith('https://')?item.source_url.slice(0,350):null,
      observed_at:typeof item.observed_at==='string'?item.observed_at.slice(0,35):null,
      verification:'OPERATOR_DECLARED_NOT_INDEPENDENTLY_RETRIEVED',
    });
  }
  return {
    schema:'sense-site-discovery-v24',
    status:'SEARCH_RESULT_IMPORT_ONLY_NOT_A_LIVE_SEARCH',
    sites:[...byOrigin.values()],rejected,
    limitations:'A search export is not complete market coverage, true search volume, authorized crawling permission, or evidence of actual backend architecture',
  };
}
