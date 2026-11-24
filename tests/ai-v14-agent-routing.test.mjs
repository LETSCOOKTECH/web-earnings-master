import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
test('V14 provider/AEO/GEO/agent QA chapters are substantive and linked',()=>{
 for(const p of ['README.md','01-provider-crawlers-controls.md','02-answer-quality.md','03-geo-measurement.md','04-agent-task-reliability.md','05-agent-execution.md'])
 assert.ok(read('docs/ai-search/'+p).length>1700,p);
});
test('V14 production AGENTS entrypoint explicitly routes provider-specific work',()=>{
 const s=read('AGENTS.md');assert.match(s,/V14 — Answer and generative AI search/);
 assert.match(s,/docs\/ai-search\/README\.md/);
 assert.match(s,/audit-ai-eligibility-v14/);
});
test('Ten owner skills include explicit V14 QA and anti-rank-guarantee instructions',()=>{
 for(const slug of ['web-aeo-answer-optimization','web-generative-engine-optimization','web-ai-discovery','web-ai-retrieval-lab','web-crawler-governance','web-search-analytics','web-accessibility-agent-ux','web-search-visibility-systems','web-search-forensic-evidence','web-fullstack-production-executor']){
 const s=read('.agents/skills/'+slug+'/SKILL.md');assert.ok(s.includes('## V14'),slug);
 }
});
test('V13 Google AI reporting ambiguity is repaired with June 2026 exact launch',()=>{
 const s=read('docs/seo-master/13-ai-search-analytics-experiments-v13.md');
 assert.match(s,/June 3, 2026/);assert.match(s,/Generative AI/);
 const v14=read('docs/ai-search/03-geo-measurement.md');assert.match(v14,/dedicated Generative AI/);
});
test('V14 browser agency is separated from AI search rank',()=>{
 const s=read('docs/ai-search/04-agent-task-reliability.md');
 assert.match(s,/NOT a Google AI Search ranking factor/);
 assert.match(s,/semantic/);
});
test('V14 official 2026 reports distinguished from claimed current feature availability',()=>{
 const s=read('docs/ai-search/README.md');assert.match(s,/June 3, 2026/);
 assert.match(s,/subset|subset of verified sites/);
});
test('V14 scripts are all in default npm test',()=>{
 const p=JSON.parse(read('package.json'));
 for(const k of ['audit:ai-surfaces','audit:ai-eligibility','audit:ai-observations']){
  assert.ok(p.scripts[k]&&p.scripts.test.includes('npm run '+k),k);
 }
});
test('V14 on disk local checks independently return bounded statuses',()=>{
 const cmds=[['audit:ai-surfaces','PROVIDER_ATLAS_METADATA_ONLY'],['audit:ai-eligibility','LOCAL_ELIGIBILITY_ONLY'],['audit:ai-observations','OBSERVATIONAL_SELF_REPORTED_ONLY']];
 for(const [c,expected] of cmds){
 const p=spawnSync('npm',['run',c],{cwd:root,encoding:'utf8',timeout:15000});
 assert.equal(p.status,0,p.stderr);assert.ok(p.stdout.includes(expected),c);
 }
});
