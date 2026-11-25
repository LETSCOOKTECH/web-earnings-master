import {createHash} from 'node:crypto';

function observedTechnologySignals(report){
  return [...new Map((report.architecture?.observed_signals??[]).map(s=>[s.technology+'|'+s.signal,{
    technology:s.technology,signal:s.signal,confidence:s.confidence,
    classification:s.classification,observed_pages:s.observed_pages
  }])).values()].slice(0,30);
}
function pathFamilies(report){
  const grouped=new Map();
  for(const page of report.pages??[]){
    if(!page.url)continue;
    const u=new URL(page.url);
    const segment=u.pathname.split('/').filter(Boolean)[0]??'(homepage)';
    if(!grouped.has(segment))grouped.set(segment,{family:segment,sampled_pages:0,static_interactive_candidates:0,noindex_observations:0});
    const r=grouped.get(segment);
    r.sampled_pages++;
    if(page.page_type_hypotheses?.includes('interactive-ui-candidate'))r.static_interactive_candidates++;
    if(page.noindex)r.noindex_observations++;
  }
  return [...grouped.values()].sort((a,b)=>b.sampled_pages-a.sampled_pages).slice(0,30);
}
export function buildSiteAtlas(inputs){
  if(!Array.isArray(inputs)||inputs.length===0||inputs.length>50)throw new Error('ATLAS_REQUIRES_1_TO_50_REPORTS');
  const seen=new Set(),sites=[];
  for(const report of inputs){
    if(report?.schema!=='sense-site-intelligence-v24'||!report.origin||!Array.isArray(report.pages)||!Array.isArray(report.sitemaps))
      throw new Error('ATLAS_INVALID_REPORT');
    if(seen.has(report.origin))throw new Error('ATLAS_DUPLICATE_ORIGIN_USE_CHANGE_REPORTS_FOR_HISTORY');
    seen.add(report.origin);
    const observedPages=report.pages.filter(p=>p.status==='HTTP_200');
    sites.push({
      origin:report.origin,source_digest:report.digest??null,observed_at:report.observed_at??null,
      authorization:report.authorization,status:report.status,truncated:report.truncated,
      observed_html_pages:observedPages.length,sitemap_discovered_candidate_urls:report.sitemap_urls?.length??0,
      sitemap_documents_parsed:report.sitemaps.filter(s=>s.status==='PARSED').length,
      sampled_graph_nodes:report.graph?.nodes??0,sampled_graph_edges:report.graph?.edges??0,
      sampled_max_link_depth:Math.max(0,...(report.graph?.sampled_navigation_depths??[]).map(x=>x.depth??0)),
      path_families:pathFamilies(report),observed_technology_clues:observedTechnologySignals(report),
      public_form_actions:(report.architecture?.form_actions??[]).slice(0,30),
      declared_robots_status:report.robots?.status??null,
      unknowns:report.external_unknowns??[],
    });
  }
  sites.sort((a,b)=>a.origin.localeCompare(b.origin));
  const evidenceFingerprint=createHash('sha256').update(JSON.stringify(sites.map(s=>[s.origin,s.source_digest,s.observed_at]))).digest('hex');
  return {
    schema:'sense-cross-site-intelligence-v24',status:'OBSERVED_PARTIAL_REFERENCE_COMPARISON',
    site_count:sites.length,evidence_fingerprint:evidenceFingerprint,sites,
    analysis_limitations:[
      'Sites differ in robots access, page budgets and crawl times; raw counts are NOT normalized competitor size or market share.',
      'Technology signals identify public headers/assets only, not databases, internal code, scalability or financial costs.',
      'A route family or static interactive candidate does not prove a tool is functional; run same-input tests before product ranking.',
      'Google Search rankings, AI citations, keyword demand and monetized human traffic are not inferred from crawler output.',
    ],
    next_handoff:'web-competitor-audit must run independent equal-fixture functionality and legal browser UX comparisons',
  };
}
