#!/usr/bin/env node
/**
 * Complete 49-skill inventory: measurable text/evidence proxies, NOT skill-quality certification.
 * Linked chapters and first-party source passages require separate semantic review.
 */
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const folder=path.join(root,'.agents/skills');
const registry=JSON.parse(fs.readFileSync(path.join(root,'sources/production_skills_v7.json'),'utf8'));
export function auditSkillText(name,content){
 const words=content.split(/\s+/).filter(Boolean).length;
 const triggers=/\b(?:Trigger|Use when|When to use|Invoked by|Mission)\b/i.test(content);
 const references=/(?:docs\/|sources\/|references\/|https:\/\/)/.test(content);
 const executable=/(?:npm\s+(?:run|test)|node\s+(?:--test|scripts\/)|curl\s|dig\s|pytest|pnpm\s|bun\s+test|npx\s|git\s+|Playwright)/i.test(content);
 const ownerBoundary=/(?:deployed|owner|production|external|live|actual\s+account|real\s+site)/i.test(content);
 const negative=/(?:FAIL|BLOCK|HOLD|UNKNOWN|counterexample|negative\s+test|adversarial)/i.test(content);
 const referenceTokens=(content.match(/\b(?:docs|sources|references)\/[A-Za-z0-9_.\/-]+/g)||[]);
 const officialUrls=[...new Set(content.match(/https:\/\/[A-Za-z0-9./?=&%#_-]+/g)||[])];
 const warnings=[];
 if(words<650)warnings.push('Short entrypoint (<650 words): inspect linked domain manual and whether its tests are real');
 if(!executable)warnings.push('No concrete executable check cited within skill; verify external linked tests or add a runnable oracle');
 if(!references)warnings.push('No explicit source/document link in skill; require original provider guidance mapping');
 if(!negative)warnings.push('No explicit negative/UNKNOWN proof rule in skill');
 if(!ownerBoundary)warnings.push('No visible boundary between local and externally deployed evidence');
 if(!triggers)warnings.push('No explicit usage trigger');
 return {name,words,chapters:(content.match(/^## /gm)||[]).length,localReferenceMentions:referenceTokens.length,
  distinctOfficialUrlMentions:officialUrls.length,signals:{triggers,references,executable,ownerBoundary,negative},
  warnings,status:warnings.length?'DOMAIN_REVIEW_REQUIRED':'TEXT_SIGNALS_PRESENT_NOT_CERTIFIED'};
}
export function auditSkillLibrary(files,registeredNames){
 const errors=[],rows=[];
 const unique=new Set(registeredNames);
 if(unique.size!==registeredNames.length)errors.push('Duplicate skill IDs in registry');
 for(const [name,content] of Object.entries(files)){
  if(!unique.has(name))errors.push('Unregistered skill '+name);
  if(!content.match(new RegExp('^---\\s*\\nname:\\s*'+name+'(?:\\s*\\n|\\s*$)')))errors.push('Malformed frontmatter or name '+name);
  rows.push(auditSkillText(name,content));
 }
 for(const name of unique)if(!(name in files))errors.push('Missing registered skill '+name);
 if(rows.length!==registeredNames.length)errors.push('Actual manifest count differs from contract');
 const review=rows.filter(x=>x.warnings.length);
 const report={
  schema:'sense-skill-depth-observatory-v20',
  status:errors.length?'INVALID_INVENTORY':review.length?'INVENTORY_VALID_DOMAIN_REVIEW_REQUIRED':'TEXT_SIGNALS_ONLY',
  inventory_matches_registry:errors.length===0,
  source_originals_semantically_verified:false,
  all_skills_production_certified:false,
  agent_realworld_task_outcomes_verified:false,
  disclaimer:'This is a manifest coverage and missing-signal detector. Neither word count, direct URL mentions, reviewed-source flags, nor a full local CI suite proves expert correctness or production success.',
  counts:{registered:registeredNames.length,found:rows.length,needs_domain_review:review.length,
   shorter_than_650_words:rows.filter(x=>x.words<650).length,
   lacking_executable_reference:rows.filter(x=>!x.signals.executable).length,
   lacking_direct_source_or_doc_pointer:rows.filter(x=>!x.signals.references).length},
  errors,skills:rows.sort((a,b)=>a.words-b.words)
 };
 return report;
}
if(process.argv[1]&&path.resolve(process.argv[1])===path.resolve(import.meta.filename||'')){
 const files=Object.fromEntries(fs.readdirSync(folder,{withFileTypes:true}).filter(x=>x.isDirectory())
  .map(x=>[x.name,fs.readFileSync(path.join(folder,x.name,'SKILL.md'),'utf8')]));
 const r=auditSkillLibrary(files,registry.skills.map(x=>x.id));
 console.log(JSON.stringify(r,null,2));
 if(r.status==='INVALID_INVENTORY')process.exitCode=1;
}
