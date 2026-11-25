#!/usr/bin/env node
// Local release contract + OPTIONAL anonymous GitHub GET checks for public agent readability.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const REPO='LETSCOOKTECH/web-earnings-master';

export function inspectPublicAgentFiles(root=ROOT){
 const errors=[],find=p=>fs.readFileSync(path.join(root,p),'utf8');
 let license='',notice='',index='',readme='',agents='';
 try{license=find('LICENSE');notice=find('NOTICE');index=find('SKILLS.md');readme=find('README.md');agents=find('AGENTS.md');}catch(e){return {ok:false,errors:['RELEASE_FILE_MISSING:'+e.message],skills:0};}
 if(!license.includes('Apache License')||!license.includes('Version 2.0, January 2004'))errors.push('NOT_STANDARD_APACHE_2_LICENSE');
 if(license.includes('LETSCOOKTECH PROPRIETARY LICENSE'))errors.push('PROPRIETARY_LICENSE_REMAINS');
 if(!notice.includes('Copyright 2026 LETSCOOKTECH')||!notice.includes('third-party')&&!notice.includes('Third-party'))errors.push('MISSING_COPYRIGHT_OR_THIRD_PARTY_NOTICE');
 if(!readme.includes('Public open-source agent skill system')||readme.includes('**Private Codex skill system'))errors.push('README_PUBLIC_STATUS_INVALID');
 if(!readme.includes('(SKILLS.md)')||!readme.includes('(docs/AGENT_ACCESS.md)'))errors.push('README_ACCESS_LINKS_MISSING');
 if(!agents.includes('## V27 — Public Apache-2.0')||!agents.startsWith('## V13 MANDATORY'))errors.push('AGENT_POLICY_OR_HISTORY_GUARD_MISSING');
 if(!fs.existsSync(path.join(root,'docs/AGENT_ACCESS.md')))errors.push('ACCESS_GUIDE_MISSING');
 const basedir=path.join(root,'.agents/skills');
 let skills=[];
 try{skills=fs.readdirSync(basedir,{withFileTypes:true}).filter(d=>d.isDirectory()&&fs.existsSync(path.join(basedir,d.name,'SKILL.md'))).map(d=>d.name).sort();}catch(e){errors.push('SKILL_DIRECTORY_MISSING');}
 if(skills.length!==50)errors.push('SKILL_REGISTRY_EXPECTED_50_GOT_'+skills.length);
 const links=[...index.matchAll(/\]\(\.agents\/skills\/([a-z0-9-]+)\/SKILL\.md\)/g)].map(m=>m[1]);
 if(links.length!==skills.length||new Set(links).size!==links.length||links.slice().sort().join('|')!==skills.join('|'))errors.push('INDEX_NOT_COMPLETE_OR_DUPLICATE');
 for(const s of skills){
  const file=find('.agents/skills/'+s+'/SKILL.md');
  if(!file.startsWith('---')||!file.includes('name:'))errors.push('INVALID_SKILL_FRONTMATTER:'+s);
 }
 const access=find('docs/AGENT_ACCESS.md');
 if(!access.includes('raw.githubusercontent.com')||!access.includes('api.github.com')||!access.includes('No repo setting fixes')&&!access.includes('no repo setting fixes'))errors.push('ACCESS_FALLBACK_OR_NETWORK_LIMIT_MISSING');
 return {schema:'sense-public-agent-discovery-v27',ok:errors.length===0,skills:skills.length,indexed:links.length,errors,license:'Apache-2.0 for eligible original materials',does_not_verify_external_agent_capabilities:true};
}
async function publicGet(url,{json=false}={}){
 let last;
 for(let n=0;n<3;n++){
  const ctrl=new AbortController(),tm=setTimeout(()=>ctrl.abort(),15000);
  try{
   const r=await fetch(url,{headers:{'User-Agent':'Sense-public-access-check-v27','Accept':json?'application/vnd.github+json':'text/plain'},signal:ctrl.signal,redirect:'follow'});
   const content=await r.text();
   if(r.status!==200)throw new Error('HTTP_'+r.status+':'+content.slice(0,150));
   return json?JSON.parse(content):content;
  }catch(e){last=e;if(n<2)await new Promise(resolve=>setTimeout(resolve,800*(n+1)));}finally{clearTimeout(tm);}
 }
 throw last;
}
export async function checkAnonymousGitHub({ref='main'}={}){
 if(!/^[a-zA-Z0-9._/-]+$/.test(ref)||ref.includes('..')||ref.startsWith('/')||ref.endsWith('/'))throw new Error('INVALID_REF');
 const failures=[],receipts=[];
 const metadata=await publicGet('https://api.github.com/repos/'+REPO,{json:true});
 if(metadata.private!==false||metadata.visibility!=='public')failures.push('REPO_NOT_PUBLIC');
 else receipts.push('API_REPOSITORY_PRIVATE_FALSE');
 const tree=await publicGet('https://api.github.com/repos/'+REPO+'/git/trees/'+encodeURIComponent(ref)+'?recursive=1',{json:true});
 const paths=new Set((tree.tree??[]).filter(i=>i.type==='blob').map(i=>i.path));
 if(tree.truncated)failures.push('TREE_TRUNCATED');
 const skills=[...paths].filter(p=>/^\.agents\/skills\/[a-z0-9-]+\/SKILL\.md$/.test(p));
 if(skills.length!==50)failures.push('PUBLIC_TREE_SKILL_COUNT_'+skills.length);
 else receipts.push('PUBLIC_TREE_50_SKILL_PATHS');
 const samples=['AGENTS.md','SKILLS.md','LICENSE','.agents/skills/web-dominant-tool-creator/SKILL.md','.agents/skills/web-astro-engineering/SKILL.md','.agents/skills/web-opportunity-intelligence/SKILL.md'];
 for(const p of samples){
  if(!paths.has(p)){failures.push('TREE_FILE_MISSING:'+p);continue;}
  const raw=await publicGet('https://raw.githubusercontent.com/'+REPO+'/'+ref+'/'+p);
  if(raw.length<150)failures.push('RAW_TOO_SHORT:'+p);
  else receipts.push('HTTP_200_RAW:'+p);
 }
 return {schema:'sense-anonymous-github-check-v27',ok:failures.length===0,ref,skills_in_public_tree:skills.length,receipts,failures,anonymous_requests_without_token:true,search_indexing_tested:false};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{
  const i=process.argv.indexOf('--root'),root=i>=0?path.resolve(process.argv[i+1]):ROOT;
  const offline=inspectPublicAgentFiles(root);
  const live=process.argv.includes('--live')?await checkAnonymousGitHub({ref:process.argv.includes('--ref')?process.argv[process.argv.indexOf('--ref')+1]:'main'}):null;
  console.log(JSON.stringify({offline,live},null,2));
  if(!offline.ok||(live&&!live.ok))process.exitCode=1;
 }catch(e){console.error('PUBLIC_AGENT_ACCESS_HOLD: '+e.message);process.exitCode=2;}
}
