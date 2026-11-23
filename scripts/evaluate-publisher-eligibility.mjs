#!/usr/bin/env node
// Provider admission estimates based on dated first-party policy excerpts. NO acceptance or earned revenue.
import fs from 'node:fs';import path from 'node:path';import {pathToFileURL} from 'node:url';
const okNum=x=>typeof x==='number'&&Number.isFinite(x)&&x>=0;
export function evaluatePublisherEligibility(site,registry){
 const errors=[],results=[];
 if(!site||typeof site!=='object'||!Array.isArray(registry?.rows))return {status:'FAIL',errors:['Site and provider registry are required'],results};
 for(const k of ['monthly_pageviews','annual_ad_revenue_usd','domain_age_months','tier1_geography_share','organic_traffic_share']){
  if(!okNum(site[k]))errors.push('Invalid or missing '+k);
 }
 for(const k of ['tier1_geography_share','organic_traffic_share'])if(okNum(site[k])&&site[k]>1)errors.push(k+' fraction must be 0..1');
 if(!site.site_type)errors.push('site_type required');
 if(errors.length)return {status:'FAIL',errors,results};
 for(const p of registry.rows){
  const blockers=[],unknown=[],notes=[];
  const name=p.name;
  if(p.min_monthly_pageviews!==null&&site.monthly_pageviews<p.min_monthly_pageviews)blockers.push('minimum monthly pageviews not met');
  if(p.min_annual_ad_revenue_usd!==null&&site.annual_ad_revenue_usd<p.min_annual_ad_revenue_usd)blockers.push('minimum annual ad revenue not met');
  if(p.min_domain_age_months!==null&&site.domain_age_months<p.min_domain_age_months)blockers.push('minimum domain age not met');
  if(name==='Raptive'){
   if(site.monthly_pageviews>=25000&&site.monthly_pageviews<100000){
    if(site.tier1_geography_share<0.50)blockers.push('25k-99k traffic needs >=50% specified high-value countries');
    if(site.majority_long_form_content!==true)blockers.push('majority long-form original content required for 25k-99k tier');
   }else if(site.monthly_pageviews>=100000&&site.tier1_geography_share<0.40)blockers.push('100k+ traffic needs >=40% specified high-value countries');
   if(site.google_analytics_validated!==true)unknown.push('Google Analytics and origin of traffic not independently verified');
  }
  if(site.exclusive_programmatic_network && site.exclusive_programmatic_network!==name && ['managed_display','managed_header_bidding','managed_programmatic','contextual_display','header_bidding_managed','multi_format_popunder_display','push_popunder_directlink','ad_server_exchange'].includes(p.category))
    blockers.push('Possible existing exclusive programmatic contract conflict; needs signed agreement');
  if(site.site_type==='utility_tools'&&name==='Raptive'&&site.majority_long_form_content!==true)notes.push('Utility-only site likely mismatches long-form publisher program');
  if(site.live_content_tested!==true)unknown.push('Original page content and real tool task not verified');
  if(site.invalid_traffic_reviewed!==true)unknown.push('Traffic quality/IVT review missing');
  if(site.consent_policy_reviewed!==true)unknown.push('Region-specific CMP/ads consent review missing');
  if(site.actual_provider_accounts?.[p.id]==='approved')notes.push('User supplied provider approval status; require actual owner account proof');
  else unknown.push('Publisher approval NOT verified in provider owner account');
  if(['CHANGING_REQUIREMENTS_2026_11_18','PROVIDER_PRIMARY_ELIGIBILITY_UNVERIFIED','FIRST_PARTY_MARKETING'].includes(p.evidence_state))unknown.push('Provider threshold/source needs current original terms verification');
  if(name==='Google AdSense'&&site.screens_without_publisher_content===true)blockers.push('AdSense Google-served ads on screens without publisher-content are at risk');
  if(site.site_type==='utility_tools'&&name==='Mediavine Official'&&site.majority_long_form_content!==true)notes.push('Check premium editorial reader experience; revenue alone insufficient');
  const status=blockers.length?'KNOWN_BARRIER':unknown.length?'POTENTIAL_CANDIDATE_UNVERIFIED':'ELIGIBILITY_REVIEW_ONLY';
  results.push({provider:name,category:p.category,source:p.official_source,status,blockers,unknown,notes,
    disclaimer:'Published thresholds are entry hints. Only provider owner account review and current agreement can prove approval; this tool does not apply or serve ads.'});
 }
 return {status:'OFFLINE_POLICY_TRIAGE',site_name:site.name||'unidentified',date:registry.version,results,errors,disclaimer:'No live site visited, no ad account accessed, no traffic verified. All estimates depend on supplied inputs.'};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 const i=process.argv.indexOf('--file'),j=process.argv.indexOf('--registry');
 if(i<0||!process.argv[i+1]){console.error('Usage: node scripts/evaluate-publisher-eligibility.mjs --file <site.json> [--registry <registry.json>]');process.exitCode=2;}
 else try{
  const site=JSON.parse(fs.readFileSync(process.argv[i+1],'utf8'));
  const rpath=j>=0?process.argv[j+1]:path.resolve(import.meta.dirname,'../sources/v6_publisher_network_registry_2026-11-23.json');
  const registry=JSON.parse(fs.readFileSync(rpath,'utf8'));
  const out=evaluatePublisherEligibility(site,registry);console.log(JSON.stringify(out,null,2));if(out.status==='FAIL')process.exitCode=1;
 }catch(e){console.error(String(e));process.exitCode=2;}
}
