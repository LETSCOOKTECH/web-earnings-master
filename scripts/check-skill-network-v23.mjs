import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MASTER='web-dominant-tool-creator';
const reviewed=new Set(['full-file-reviewed','readme-reviewed','candidate-only','original-doc-reviewed']);
const transfers=new Set(['method-adaptation-only','reference-only']);

export function checkNetwork(root) {
  const errors=[];
  let network;
  try {network=JSON.parse(fs.readFileSync(path.join(root,'sources/skill-network-v23.json'),'utf8'));}
  catch(e){return {ok:false,errors:[`manifest: ${e.message}`],skills:0,upstreams:0};}
  const fail=m=>errors.push(m);
  if(network.schema!=='sense-skill-network-v23')fail('schema mismatch');
  if(!Array.isArray(network.upstreams)||!Array.isArray(network.stages))return {ok:false,errors:[...errors,'upstreams/stages must be arrays'],skills:0,upstreams:0};
  const upstreamIds=new Set(), deprecatedIds=new Set();
  for(const source of network.upstreams){
    if(!source||typeof source.id!=='string'||upstreamIds.has(source.id)){fail(`duplicate or missing upstream id: ${source?.id}`);continue;}
    upstreamIds.add(source.id);
    if(source.deprecated)deprecatedIds.add(source.id);
    if(source.copy_authorization!=='NOT_GRANTED'||!source.license_observed)fail(`${source.id}: missing license/copy quarantine`);
    if(!reviewed.has(source.review))fail(`${source.id}: invalid review depth`);
    if(!transfers.has(source.transfer))fail(`${source.id}: unsafe transfer declaration`);
    if(!/^https:\/\/(github\.com|agentskills\.io|developers\.google\.com|docs\.astro\.build|developers\.cloudflare\.com|support\.google\.com)\//.test(source.url))fail(`${source.id}: invalid source URL`);
    if(source.review==='full-file-reviewed'&&!/^[a-f0-9]{40}$/.test(source.blob_sha??''))fail(`${source.id}: complete inspection requires immutable blob SHA`);
    if(source.review!=='full-file-reviewed'&&source.blob_sha&&!/^[a-f0-9]{40}$/.test(source.blob_sha))fail(`${source.id}: malformed SHA`);
    if(['certified','installed','trusted-executable','production-ready'].includes(source.install_state))fail(`${source.id}: upstream improperly declared installed/certified`);
    if(!source.scope||!source.risk)fail(`${source.id}: missing scope or limitation`);
  }
  let officialIds=new Set(), legacySkills=new Map();
  try {
    const official=JSON.parse(fs.readFileSync(path.join(root,network.official_source_registry??'sources/official_sources.json'),'utf8'));
    if(!Array.isArray(official.sources))throw new Error('official sources is not an array');
    for(const s of official.sources){
      if(!s.id||officialIds.has(s.id)||!/^https:\/\//.test(s.url))fail(`invalid/duplicate first-party source: ${s.id}`);
      officialIds.add(s.id);
    }
    if(network.first_party_source_count!==official.sources.length)fail('first-party source count mismatch');
    const legacy=JSON.parse(fs.readFileSync(path.join(root,network.existing_skill_source_crosswalk??'sources/skill-evidence-crosswalk-v20.json'),'utf8'));
    if(!Array.isArray(legacy.skills))throw new Error('legacy crosswalk is not an array');
    legacySkills=new Map(legacy.skills.map(x=>[x.id,x]));
  } catch(e){fail(`first-party source/crosswalk unavailable: ${e.message}`);}
  const skillsDir=path.join(root,'.agents','skills');
  let onDisk=[];
  try{onDisk=fs.readdirSync(skillsDir,{withFileTypes:true}).filter(e=>e.isDirectory()&&fs.existsSync(path.join(skillsDir,e.name,'SKILL.md'))).map(e=>e.name).sort();}
  catch(e){fail(`skills directory: ${e.message}`);}
  const skills=new Map(),owners=new Map();
  for(const stage of network.stages){
    if(!stage.id||!stage.owner||!Array.isArray(stage.skills)||!stage.output||!stage.gate){fail(`bad stage ${stage.id}`);continue;}
    if(!stage.skills.some(s=>s.id===stage.owner))fail(`${stage.id}: owner must be included in stage`);
    owners.set(stage.id,stage.owner);
    for(const item of stage.skills){
      if(!item||!item.id||skills.has(item.id)){fail(`duplicate/invalid skill ${item?.id}`);continue;}
      skills.set(item.id,{stage:stage.id,owner:stage.owner,item});
      if(!Array.isArray(item.upstreams))fail(`${item.id}: upstreams must be an array`);
      if(Array.isArray(item.upstreams)){
        const expected=item.upstreams.length?'vetted-external-method-plus-official-originals':'official-originals-only';
        if(item.source_strategy!==expected)fail(`${item.id}: false or missing source strategy`);
      }
      for(const ref of item.upstreams??[]){if(!upstreamIds.has(ref))fail(`${item.id}: unknown upstream ${ref}`);if(deprecatedIds.has(ref))fail(`${item.id}: deprecated upstream ${ref}`);}
      if(!item.deliverable||!item.fail_case||!item.local_oracle||!item.external_gate)fail(`${item.id}: missing individual deliverable, local/real-world oracle or fail case`);
      const original=legacySkills.get(item.id);
      if(!original)fail(`${item.id}: missing first-party crosswalk record`);
      if(!Array.isArray(item.official_source_ids)||item.official_source_ids.length===0)fail(`${item.id}: no first-party original source IDs`);
      if(original&&Array.isArray(item.official_source_ids))for(const expected of original.reference_source_ids)if(!item.official_source_ids.includes(expected))fail(`${item.id}: dropped original first-party source ${expected}`);
      for(const ref of item.official_source_ids??[]){
        if(!officialIds.has(ref))fail(`${item.id}: unresolvable first-party source ${ref}`);
        if(original&&!original.reference_source_ids.includes(ref))fail(`${item.id}: source ${ref} not in first-party crosswalk`);
      }

    }
  }
  if(!skills.has(MASTER))fail('missing master orchestrator');
  for(const skill of onDisk)if(!skills.has(skill))fail(`on-disk skill without network owner: ${skill}`);
  for(const skill of skills.keys())if(!onDisk.includes(skill))fail(`network skill missing on disk: ${skill}`);
  if(network.declared_active_skills!==onDisk.length||network.declared_active_skills!==skills.size)fail(`declared skill count does not match installed network (${network.declared_active_skills}/${onDisk.length}/${skills.size})`);
  const edges=new Map([...skills.keys()].map(id=>[id,new Set()]));
  for(const [id,entry] of skills)if(id!==entry.owner)edges.get(entry.owner)?.add(id);
  for(const stage of network.stages){
    if(stage.owner!==MASTER)edges.get(MASTER)?.add(stage.owner);
    for(const next of stage.next_stage_ids??[]){
      if(!owners.has(next))fail(`${stage.id}: missing next stage ${next}`);
      else edges.get(stage.owner)?.add(owners.get(next));
    }
  }
  const visited=new Set([MASTER]),q=[MASTER];
  for(let i=0;i<q.length;i++)for(const to of edges.get(q[i])??[])if(!visited.has(to)){visited.add(to);q.push(to);}
  for(const id of skills.keys())if(!visited.has(id))fail(`unreachable from master: ${id}`);
  return {ok:errors.length===0,errors,skills:onDisk.length,upstreams:upstreamIds.size,stages:network.stages.length};
}

if(process.argv[1]&&fileURLToPath(import.meta.url)===path.resolve(process.argv[1])){
  const root=path.resolve(process.argv[2]??path.join(path.dirname(fileURLToPath(import.meta.url)),'..'));
  const result=checkNetwork(root);
  console.log(JSON.stringify(result,null,2));
  process.exitCode=result.ok?0:1;
}
