#!/usr/bin/env node
import fs from 'node:fs';
const i=process.argv.indexOf('--file'),file=i<0?null:process.argv[i+1];if(!file){console.error('Usage: node scripts/check-robots-policy.mjs --file public/robots.txt');process.exit(2)}
const txt=fs.readFileSync(file,'utf8');const lines=txt.split(/\r?\n/).map(x=>x.replace(/#.*/, '').trim()).filter(Boolean);
const groups=[];let active=null;let pending=[];
for(const l of lines){const m=l.match(/^([^:]+):\s*(.*)$/);if(!m)continue;const k=m[1].toLowerCase().trim(),v=m[2].trim();
 if(k==='user-agent'){if(active&&active.rules.length){groups.push(active);active=null}if(active){active.agents.push(v)}else active={agents:[v],rules:[]};}
 else if(k==='allow'||k==='disallow'){if(!active)active={agents:['*'],rules:[]};active.rules.push([k,v]);}
 else if(k==='sitemap'){if(active){groups.push(active);active=null}pending.push(v)}
}
if(active)groups.push(active);
const bad=groups.filter(g=>g.agents.includes('*')&&g.rules.some(([k,v])=>k==='disallow'&&v==='/'));
const errors=[];if(bad.length)errors.push('Wildcard Disallow: / blocks intended public indexing');
if(!groups.length)errors.push('No User-agent group');
if(pending.some(s=>!s.startsWith('https://')||/example|YOUR/i.test(s)))errors.push('Invalid/placeholder sitemap URL');
if(errors.length){console.error('FAIL\n'+errors.join('\n'));process.exit(1)}
console.log(`PASS basic local robots check: ${groups.length} groups, ${pending.length} sitemap declarations. Requires live host/WAF tests and correct robots group semantics.`);
