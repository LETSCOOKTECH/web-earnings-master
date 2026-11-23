#!/usr/bin/env node
// Security control presence triage against scoped OWASP ASVS 5.0 intentions. NOT penetration testing.
import fs from 'node:fs';import path from 'node:path';import {pathToFileURL} from 'node:url';
export function auditWebSecurityManifest(m){
 const blockers=[],unknown=[],warnings=[],required=[];
 if(!m||typeof m!=='object')return {status:'FAIL_KNOWN',blockers:['Security manifest object required'],unknown,warnings,required};
 if(m.standard!=='OWASP-ASVS-5.0.0')blockers.push('OWASP ASVS 5.0.0 control baseline not selected');
 if(typeof m.system_name!=='string'||!m.system_name.trim())blockers.push('Missing system identity');
 if(!Array.isArray(m.threat_boundaries)||m.threat_boundaries.length===0)blockers.push('Trust boundaries must be enumerated');
 if(m.uses_external_api===true){
  required.push('API schema input bounds','request quota','error/timeout');
  if(m.server_input_schema_validated!==true)blockers.push('API request/input schema not validated on server');
  if(m.api_resource_quotas_enforced!==true)blockers.push('Unbounded API resource consumption');
 }
 if(m.requires_login===true){
  required.push('Authentication/authorization','session safety');
  if(m.object_level_authorization_verified!==true)blockers.push('BOLA: object-level authorization tests missing');
  if(m.session_protection_verified!==true)unknown.push('Session/cookie/CSRF hardening not verified');
  if(m.csrf_tested!==true)unknown.push('CSRF request test not run');
 }
 if(m.user_file_uploads===true){
  required.push('File signature','resource limits','upload isolation','retention');
  if(m.file_type_content_validated!==true)blockers.push('File types need content-signature and decoder validation');
  if(m.file_input_resource_caps_enforced!==true)blockers.push('File-size/pages/zip-bomb resource ceilings missing');
  if(m.file_parser_isolated!==true)blockers.push('Untrusted file parser execution isolation missing');
  if(m.storage_owner_authorization_verified!==true)blockers.push('Owner checks missing on uploaded file/result');
  if(m.data_retention_verified!==true)unknown.push('File lifecycle/retention/deletion proof missing');
 }
 if(m.remote_url_fetch===true){
  required.push('SSRF network controls');
  if(m.ssrf_private_network_block_verified!==true)blockers.push('SSRF private/link-local/metadata network block missing');
  if(m.ssrf_redirect_dns_rebinding_tested!==true)unknown.push('SSRF DNS rebinding and redirect test missing');
 }
 if(m.costed_jobs===true){
  required.push('Paid compute admission','hard spend caps');
  if(m.per_tenant_budget_limit_enforced!==true)blockers.push('Unbounded paid compute per tenant');
  if(m.global_budget_stop_enforced!==true)blockers.push('No global hard spending stop');
  if(m.idempotent_job_execution_verified!==true)unknown.push('Paid job duplicate/idempotency tests missing');
 }
 if(m.third_party_ad_scripts===true){
  required.push('Ads scripts and consent');
  if(m.ad_data_does_not_include_private_files!==true)blockers.push('User private file content not isolated from ad/analytics scripts');
  if(m.ad_script_csp_compatibility_tested!==true)unknown.push('Live ad scripts/CSP interoperability not tested');
  if(m.region_consent_flow_tested!==true)unknown.push('Region-specific CMP/consent runtime not verified');
  if(m.ad_insecure_cross_origin_isolation===true)blockers.push('Ad tags incompatible with enforced cross-origin isolation in target runtime');
 }
 if(m.sql_backend===true&&m.parameterized_queries_verified!==true)blockers.push('SQL injection defenses/parameterized query use not tested');
 if(m.renders_untrusted_html===true&&m.contextual_encoding_verified!==true)blockers.push('Untrusted HTML/SVG output not contextually encoded/sanitized');
 if(m.server_secrets_exposed_to_client===true)blockers.push('Server secrets exposed in frontend bundle');
 if(m.crawler_waf_user_agent_only===true)blockers.push('Crawler identity inferred solely from spoofable User-Agent');
 if(m.dependency_audit_reviewed!==true)unknown.push('SCA/advisory and license review not complete');
 if(m.secrets_scan_passed!==true)unknown.push('Secrets scan not completed');
 if(m.backup_restore_tested!==true && (m.sql_backend===true||m.user_file_uploads===true))unknown.push('Backup/restore execution not observed');
 if(m.independent_security_reviewed!==true)unknown.push('Independent security review not completed');
 if(m.real_adversarial_tests_executed!==true)unknown.push('Real malformed-file/API/SSRF attack suite not executed');
 if(!Array.isArray(m.asvs_control_ids)||m.asvs_control_ids.length===0)blockers.push('Map implementation to versioned ASVS control IDs');
 else if(m.asvs_control_ids.some(x=>typeof x!=='string'||!/^v5\.0\.0-\d+(?:\.\d+){2}$/.test(x)))warnings.push('Check official exact ASVS control ID syntax and existence; input strings not source-verified');
 return {status:blockers.length?'FAIL_KNOWN':unknown.length?'UNKNOWN_EXTERNAL':'DESIGN_CONTROLS_REVIEW_ONLY',system:m.system_name,required,blockers,unknown,warnings,
 disclaimer:'This manifest checker reads user assertions only. It cannot verify ASVS conformance, exploit resistance, policy, deployment security, or absence of vulnerabilities.'};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 const i=process.argv.indexOf('--file');
 if(i<0||!process.argv[i+1]){console.error('Usage: node scripts/audit-web-security-manifest.mjs --file <manifest.json>');process.exitCode=2;}
 else try{const x=auditWebSecurityManifest(JSON.parse(fs.readFileSync(process.argv[i+1],'utf8')));console.log(JSON.stringify(x,null,2));if(x.status==='FAIL_KNOWN')process.exitCode=1;}catch(e){console.error(String(e));process.exitCode=2;}
}
