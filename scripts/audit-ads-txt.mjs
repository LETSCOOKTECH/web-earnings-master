#!/usr/bin/env node
import fs from 'node:fs';
const arg=n=>{const i=process.argv.indexOf(n);return i===-1?undefined:process.argv[i+1]};
const file=arg('--file'),seller=arg('--seller');
if(!file){console.error('Usage: node scripts/audit-ads-txt.mjs --file public/ads.txt [--seller google.com] [--pub-id pub-...]');process.exit(2)}
const lines=fs.readFileSync(file,'utf8').split(/\r?\n/).map(x=>x.trim()).filter(x=>x&&!x.startsWith('#'));
const errors=[],warn=[],found=[];const seen=new Set();
for(const line of lines){
 if(line.toLowerCase().startsWith('subdomain='))continue;
 const fields=line.split(',').map(x=>x.trim());
 if(fields.length<3||fields.length>4){errors.push('malformed line: '+line);continue}
 if(!/^([a-z0-9-]+\.)+[a-z]{2,}$/i.test(fields[0]))errors.push('invalid seller domain: '+fields[0]);
 if(!fields[1])errors.push('missing publisher ID');
 if(!['DIRECT','RESELLER'].includes(fields[2].toUpperCase()))errors.push('invalid relationship: '+line);
 if(/pub-0{10,}|example|your[-_ ]?publisher/i.test(fields[1]))errors.push('placeholder publisher ID');
 if(seen.has(line))warn.push('duplicate ads.txt line: '+line);
 seen.add(line);found.push(fields);
}
if(seller&&!found.some(x=>x[0].toLowerCase()===seller.toLowerCase()))errors.push('seller not listed: '+seller);
const id=arg('--pub-id');if(id&&!found.some(x=>x[1]===id))errors.push('requested publisher ID not listed');
if(!lines.length)warn.push('No ads.txt seller entries. This is valid before an ad account, but may need setup after activation.');
if(errors.length){console.error('FAIL\n'+errors.join('\n'));process.exit(1)}
console.log(`PASS: ${found.length} syntactically valid seller entries; network authorization, correct IDs and live crawler access remain external checks.`);
if(warn.length)console.warn(warn.join('\n'));
