#!/usr/bin/env node
/**
 * No ambient IndexNow pings. Dry-run by default. Live mode requires owner
 * authorization, a real public HTTPS domain, key URL proof and HTTP 200 checks.
 * Submission requests discovery; it never proves indexing.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {validatePublicSiteOrigin} from './validate-public-origin-v20.mjs';
export function buildIndexNowDiff(doc,origin){
 if(!doc||!Array.isArray(doc.previous)||!Array.isArray(doc.current))throw Error('Expected previous/current URL hash arrays');
 const url=new URL(origin),before=new Map();
 for(const entry of doc.previous){if(typeof entry?.path!=='string'||typeof entry?.sha256!=='string')throw Error('Invalid previous entry');before.set(entry.path,entry.sha256);}
 const changed=[];
 for(const entry of doc.current){
  if(typeof entry?.path!=='string'||!/^\/(?:[a-z0-9._-]+\/)*$/i.test(entry.path)||!/^([0-9a-f]{64})$/i.test(entry.sha256))throw Error('Invalid current path or content sha256');
  const target=new URL(entry.path,url);
  if(target.origin!==url.origin)throw Error('Cross-origin URL blocked');
  if(before.get(entry.path)!==entry.sha256)changed.push(target.href);
 }
 if(changed.length>100)throw Error('Submission is limited to 100 changed URLs');
 if(new Set(changed).size!==changed.length)throw Error('Duplicate changed URL');
 return changed;
}
const args=process.argv.slice(2),get=name=>{const i=args.indexOf(name);return i<0?null:args[i+1];};
async function main(){
 const file=get('--file'),origin=get('--origin');
 if(!file||!origin)throw Error('Requires --file changed-file.json and --origin');
 const plan=JSON.parse(fs.readFileSync(path.resolve(file),'utf8'));
 const urls=buildIndexNowDiff(plan,origin);
 if(!args.includes('--live'))return {status:'DRY_RUN_ONLY',urls,posted:false,indexed_verified:false};
 if(get('--authorized-origin')!==origin)throw Error('Exact authorized owner origin required for network actions');
 const valid=validatePublicSiteOrigin(origin);
 if(!valid.ok)throw Error('Public HTTPS origin rejected: '+valid.issues.join('; '));
 const key=get('--key'),keyLocation=get('--key-location');
 if(typeof key!=='string'||!/^[a-z0-9-]{8,128}$/i.test(key))throw Error('Valid IndexNow key required');
 const keyUrl=new URL(keyLocation||'',origin);
 if(keyUrl.origin!==new URL(origin).origin||keyUrl.protocol!=='https:')throw Error('Key URL must be on owned HTTPS origin');
 const keyResponse=await fetch(keyUrl,{redirect:'manual',signal:AbortSignal.timeout(9000)});
 if(keyResponse.status!==200||(await keyResponse.text()).trim()!==key)throw Error('Key ownership verification failed');
 for(const address of urls){
  const r=await fetch(address,{method:'GET',redirect:'manual',signal:AbortSignal.timeout(9000)});
  if(r.status!==200)throw Error('Changed page not publicly HTTP 200: '+address+' '+r.status);
 }
 if(!urls.length)return {status:'NO_CHANGED_URLS',posted:false,indexed_verified:false};
 const post=await fetch('https://api.indexnow.org/indexnow',{method:'POST',
  headers:{'Content-Type':'application/json'},body:JSON.stringify({host:new URL(origin).hostname,key,keyLocation:keyUrl.href,urlList:urls}),redirect:'manual',signal:AbortSignal.timeout(10000)});
 return {status:post.ok?'SUBMITTED_NOT_INDEXED':'PROVIDER_REJECTED',http_status:post.status,urls,posted:post.ok,indexed_verified:false};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{const report=await main();console.log(JSON.stringify(report,null,2));if(report.status==='PROVIDER_REJECTED')process.exitCode=1;}
 catch(e){console.error('INDEXNOW_HOLD:'+e.message);process.exitCode=2;}
}
