/**
 * V31 original, deterministic monetization planning and public-signal analysis.
 * No guessed RPM, traffic, provider eligibility, payouts, advertising clicks or scraping.
 */
export const REVISION='2026-11-26';
export const EVIDENCE_TTL_DAYS=45;
export const CHANNEL_FAMILIES=Object.freeze({
 ads:['contextual-display','managed-display','developer-native','direct-sponsorship'],
 product:['subscription','one-time-license','usage-credits','licensing','white-label','enterprise-support','digital-products'],
 distribution:['affiliate','lead-generation','newsletter','jobs-and-listings','marketplace'],
 emerging:['agent-api-licensing','ai-crawler-licensing','data-products']
});
export function isFreshDate(date,{now=Date.now(),maxDays=EVIDENCE_TTL_DAYS}={}){
 if(typeof date!=='string'||!/\d{4}-\d{2}-\d{2}/.test(date)||!/^\d{4}-\d{2}-\d{2}$/.test(date))return false;
 const then=Date.parse(date+'T00:00:00Z');
 return Number.isFinite(then)&&then<=now&&then>=now-maxDays*86400000;
}
export function validateRegistry(registry,{now=Date.now()}={}){
 const errors=[],warnings=[];
 if(registry?.schema!=='sense-omni-monetization-registry-v31')errors.push('REGISTRY_SCHEMA_INVALID');
 if(!Array.isArray(registry?.public_channels)||registry.public_channels.length<15)errors.push('CHANNEL_COVERAGE_TOO_NARROW');
 if(!Array.isArray(registry?.providers)||registry.providers.length<10)errors.push('PROVIDER_COVERAGE_TOO_NARROW');
 const ids=new Set();
 for(const p of registry?.providers||[]){
  if(typeof p?.id!=='string'||ids.has(p.id))errors.push('PROVIDER_DUPLICATE_OR_MISSING');ids.add(p.id);
  let url=null;try{url=new URL(p.official_policy_url);}catch{}
  if(!url||url.protocol!=='https:'||url.username||url.password||url.hostname==='example.com')errors.push('OFFICIAL_URL_INVALID:'+p.id);
  if(!['OFFICIAL_REVIEWED','CANDIDATE_SOURCE_ONLY','STALE_REVERIFY','HOLD_UNVERIFIED_PROVIDER','REJECTED_POLICY_RISK'].includes(p.verification_status))errors.push('PROVIDER_STATUS_INVALID:'+p.id);
  if(p.verification_status==='OFFICIAL_REVIEWED'){
   if(!isFreshDate(p.last_verified,{now}))warnings.push('RECHECK_STALE_OFFICIAL_POLICY:'+p.id);
   if(!p.official_claim_scope)errors.push('VERIFIED_CLAIM_SCOPE_MISSING:'+p.id);
  }
  if(![true,false,null].includes(p.india_payout_supported))errors.push('INDIA_PAYOUT_STATUS_UNSUPPORTED:'+p.id);
  if(![true,false,null].includes(p.coexists_with_adsense))errors.push('COEXISTENCE_STATUS_UNSUPPORTED:'+p.id);
  if(p.approval_confirmed===true)errors.push('PUBLIC_REGISTRY_CANNOT_ASSERT_ACCOUNT_APPROVAL:'+p.id);
 }
 return {status:errors.length?'FAIL':'SOURCE_STRUCTURE_ONLY_NOT_ACCOUNT_APPROVAL',errors,warnings,providers:registry?.providers?.length||0,channels:registry?.public_channels?.length||0};
}
const number=(value,min,max,label)=>{
 const n=Number(value);
 if(!Number.isFinite(n)||n<min||n>max)throw Error('INVALID_PROFILE_'+label);
 return n;
};
export function recommendStack(profile,registry,{now=Date.now()}={}){
 const niche=String(profile?.niche||'').trim().toLowerCase();
 if(!niche||niche.length>120)throw Error('INVALID_NICHE');
 const adblockRate=number(profile.adblockRate??profile.expected_adblock_rate??0.2,0,1,'ADBLOCK');
 const desktopPct=number(profile.desktopPct??profile.desktop_pct??50,0,100,'DESKTOP');
 const monthlyServerCost=number(profile.serverCost??profile.server_cost??0,0,10000000,'SERVER_COST');
 const geo=String(profile.primaryGeo??profile.primary_geo??'mixed').toUpperCase();
 if(!/^[A-Z0-9 _-]{2,32}$/.test(geo))throw Error('INVALID_GEO');
 const dev=/developer|programmer|data|csv|json|parquet|engineering|code|api|sql|software|ai/.test(niche);
 const heavy=monthlyServerCost>0||/video|render|model|compute|gpu|audio|batch/.test(niche);
 const highBlock=adblockRate>=0.3;
 const layers=[];
 const add=(id,reason,evidence)=>layers.push({id,reason,eligibility:'NEEDS_PROVIDER_APPLICATION_AND_OWNER_REVIEW',evidence_required:evidence});
 const chosen=highBlock||dev?'B2B_UTILITY_MIX':heavy?'COMPUTE_COST_RECOVERY':'GENERAL_CONTENT';
 if(highBlock||dev){
  add('direct-sponsorship','Sell a clearly labeled placement by negotiated contract; first-party disclosure is not an ad-block circumvention guarantee.','Verified impressions, audience, signed placement and geographic attribution');
  add('paid-product-features','Offer optional team automation, premium batch jobs, SLA or licensing. Keep advertised free workflow intact.','Customer willingness to pay, fulfilled feature and chargeback/fee records');
  add('developer-native-ONE-NETWORK-ONLY','Evaluate ONE eligible native network (e.g., Carbon OR EthicalAds), not Carbon plus AdSense or fallback networks.','Provider contract, page-level exclusivity, India payout, actual consent and quality review');
 }else{
  add('contextual-display-candidate','Candidate AdSense after real site review, legal consent and publisher account approval, not instant or guaranteed fill.','AdSense account Ready, Google Publisher Policies, CMP and ads.txt where applicable');
  add('disclosed-affiliate','Relevant user-chosen recommendations with rel=sponsored and material connection disclosure.','Actual partner approval, product fit and accepted commission terms');
  add('direct-sponsorship','Optional labeled first-party sponsorship that does not mimic download or navigation controls.','Contract, genuine sponsor and user-facing disclosure');
 }
 if(heavy){
  add('metered-compute','Price real server-side API, bulk conversion or execution credits to cover verified infrastructure spend.','Cost/task at p95, abuse/quotas, signed purchase agreement, server charge logs');
  add('b2b-white-label','Commercial licensing/embedding where product rights and support obligations are clear.','Sales pipeline, license/legal counsel and support costs');
 }
 const model={
  schema:'sense-omni-recommendation-v31',
  profile:{niche,adblockRate,desktopPct,primaryGeo:geo,monthlyServerCost},
  profile_class:chosen,ranked_layers:layers,
  measured_revenue:null,projected_revenue:null,guaranteed_fill:false,
  provider_candidates:registry?.providers?.filter(p=>p.verification_status==='OFFICIAL_REVIEWED').map(p=>({id:p.id,verification_status:isFreshDate(p.last_verified,{now})?p.verification_status:'STALE_REVERIFY',india_payout_supported:p.india_payout_supported,coexists_with_adsense:p.coexists_with_adsense,official_policy_url:p.official_policy_url}))??[],
  block_before_live:['REAL_DOMAIN_HTTPS','USER_VALUE_AND_MARKET_EVIDENCE','PROVIDER_APPROVAL','CONTRACT_EXCLUSIVITY','GEO_CONSENT','INDIA_PAYOUT_AND_TAX','ACTIVE_AD_LAYOUT_BROWSER_AUDIT','ACTUAL_COST_AND_REVENUE_LEDGER'],
  slot_policy:{preallocated_space:true,internal_margin_px:32,actual_cls_measured:false,actual_ad_fill_measured:false,no_auto_refresh:true,no_forced_adblock_bypass:true},
  business_case:'EXPERIMENT_REQUIRED_NOT_OPTIMALITY_PROOF'
 };
 return model;
}
export function guardRefresh({provider,seconds=0,partnerAuthorized=false,inventoryDeclared=false,ownerApproved=false,policyUrl=null}={}){
 const time=Number(seconds);
 if(!Number.isFinite(time)||time<0)throw Error('INVALID_REFRESH');
 if(time===0)return {status:'NO_REFRESH',automatic:false};
 if(String(provider).toLowerCase()==='adsense')throw Error('POLICY_VIOLATION_ADSENSE_AUTO_REFRESH');
 if(provider!=='gam_authorized_partner')throw Error('POLICY_HOLD_UNREVIEWED_AD_REFRESH');
 if(!(partnerAuthorized&&inventoryDeclared&&ownerApproved&&policyUrl==='https://developers.google.com/publisher-tag/samples/refresh'))throw Error('POLICY_HOLD_UNDECLARED_GAM_REFRESH');
 return {status:'OWNER_APPROVED_CONTRACT_ELIGIBILITY_ONLY',automatic:false,requires_real_deployment_check:true};
}
export function parseAdsTxt(text){
 const sellers=[],invalid=[];
 const lines=String(text||'').replace(/^\uFEFF/,'').split(/\r?\n/);
 for(let i=0;i<lines.length;i++){
  const s=lines[i].split('#')[0].trim();
  if(!s||/^(OWNERDOMAIN|MANAGERDOMAIN|CONTACT|SUBDOMAIN|INVENTORYPARTNERDOMAIN)\s*=/i.test(s))continue;
  const cols=s.split(',').map(x=>x.trim());
  if(cols.length<3||cols.length>4||!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(cols[0])||!cols[1]||!['DIRECT','RESELLER'].includes(cols[2].toUpperCase())){invalid.push(i+1);continue;}
  sellers.push({domain:cols[0].toLowerCase(),sellerId:cols[1],relationship:cols[2].toUpperCase(),certAuthority:cols[3]||null,line:i+1});
 }
 return {sellers,invalidLines:invalid,proves_active_serving:false};
}
export function fingerprintPublic({html='',adsTxt='',targetUrl='https://example.org/'}={}){
 const text=String(html).slice(0,500000),ads=parseAdsTxt(String(adsTxt).slice(0,500000));
 const hits=[];
 const detect=(label,pattern)=>{if(pattern.test(text))hits.push(label);};
 detect('GOOGLE_ADSENSE_SCRIPT',/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js|adsbygoogle\b/i);
 detect('GOOGLE_PUBLISHER_TAG',/securepubads\.g\.doubleclick\.net\/tag\/js\/gpt\.js|googletag\.cmd/i);
 detect('CARBON_SCRIPT',/cdn\.carbonads\.com|carbonads\.net\/carbon/i);
 detect('ETHICALADS_SCRIPT',/ethicalads\.io\/(?:ethicalads|api|latest|assets)|ethical-ad/i);
 detect('BUYSELLADS_SIGNAL',/buysellads\.com|bsa\.js/i);
 detect('MEDIAVINE_SIGNAL',/mediavine|journeymv/i);
 detect('SNIGEL_SIGNAL',/snigel|adengine/i);
 detect('FREESTAR_SIGNAL',/freestar\.io|freestarpub/i);
 detect('PRICING_LINK',/(?:href|action)\s*=\s*["'][^"']*\/(?:pricing|plans|subscribe)(?:[\/?#"' ]|$)/i);
 detect('SPONSOR_LINK',/(?:href|action)\s*=\s*["'][^"']*\/(?:sponsor|advertise|support-us)(?:[\/?#"' ]|$)/i);
 detect('CHECKOUT_SIGNAL',/lemonsqueezy\.com|paddle\.com\/checkout|polar\.sh\/checkout|buy\.stripe\.com/i);
 detect('AFFILIATE_MARKER',/rel\s*=\s*["'][^"']*\bsponsored\b/i);
 return {schema:'sense-public-monetization-fingerprint-v31',targetUrl,
  observedHtmlSignals:hits,publicSellerDeclarations:ads.sellers,invalidAdsTxtLines:ads.invalidLines,
  classifications:[
   ...(hits.includes('GOOGLE_PUBLISHER_TAG')?['POSSIBLE_GPT_TAG_NOT_ACTIVE_BIDDING_PROOF']:[]),
   ...(hits.includes('CARBON_SCRIPT')?['POSSIBLE_NATIVE_DEVELOPER_AD']:[]),
   ...(hits.includes('SPONSOR_LINK')?['SPONSOR_ROUTE_LINK_OBSERVED']:[]),
   ...(hits.includes('PRICING_LINK')?['PRICING_ROUTE_LINK_OBSERVED']:[]),
   ...(ads.sellers.length?['ADS_TXT_AUTHORIZED_SELLERS_DECLARED_NOT_ADS_SERVED']:[])
  ],
  limits:['NO_PRIVATE_REVENUE','NO_AD_FILL_FROM_STATIC_HTML','NO_PRIVATE_CONTRACTS','ADS_TXT_MAY_BE_STALE','JAVASCRIPT_MAY_NOT_RUN','PUBLIC_ORIGIN_ONLY']
 };
}
export function inspectCandidate(candidate,{now=Date.now()}={}){
 const missing=[],p=candidate||{};
 for(const key of ['id','category','official_policy_url','last_verified','integration_risk_notes'])if(typeof p[key]!=='string'||p[key].trim().length<4)missing.push(key);
 let u=null;try{u=new URL(p.official_policy_url);}catch{}
 if(!u||u.protocol!=='https:'||u.username||u.password||u.hostname==='example.org')missing.push('OFFICIAL_HTTPS_POLICY_URL');
 if(typeof p.india_payout_supported!=='boolean')missing.push('INDIA_PAYOUT_BOOLEAN_WITH_PRIMARY_PROOF');
 if(!isFreshDate(p.last_verified,{now}))missing.push('FRESH_POLICY_DATE');
 if(!Array.isArray(p.official_claim_receipts)||!p.official_claim_receipts.some(x=>x&&x.source_url===p.official_policy_url&&typeof x.excerpt==='string'&&x.excerpt.length>=35))missing.push('OFFICIAL_CLAIM_RECEIPT');
 if(p.india_payout_supported===true&&!p.payout_official_url)missing.push('INDIA_PAYOUT_ORIGINAL_URL');
 return {status:missing.length?'HOLD_UNVERIFIED_PROVIDER':'PENDING_INDEPENDENT_PRIMARY_SOURCE_REVIEW',errors:missing,
  mayWriteCanonicalRegistry:false,verified_income:false,checked_at:new Date(now).toISOString().slice(0,10)};
}
