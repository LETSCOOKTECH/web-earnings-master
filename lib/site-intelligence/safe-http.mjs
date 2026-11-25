import {lookup} from 'node:dns/promises';
import https from 'node:https';
import {BlockList,isIP} from 'node:net';

export const BOT_NAME='SenseSiteIntelligence';
export const DEFAULT_LIMITS=Object.freeze({
  maxPages:24,maxSitemaps:8,maxDepth:3,maxSitemapDepth:3,maxLinksPerPage:120,
  maxSeeds:20,maxBytesPerPage:1_000_000,maxBytesPerSitemap:2_000_000,
  maxTotalBytes:12_000_000,maxTimeMs:90_000,minDelayMs:350,timeoutMs:9_000,
});
const BLOCKED_TLDS=['.localhost','.local','.internal','.invalid','.test','.example'];
const EXAMPLE_HOSTS=new Set(['localhost','example.com','example.net','example.org','test','invalid']);

export function isPublicIPv4(ip){
  if(isIP(ip)!==4)return false;
  const [a,b,c,d]=ip.split('.').map(Number);
  if([a,b,c,d].some(x=>!Number.isInteger(x)||x<0||x>255))return false;
  if(a===0||a===10||a===127||a>=224)return false;
  if(a===100&&b>=64&&b<=127)return false;
  if(a===169&&b===254)return false;
  if(a===172&&b>=16&&b<=31)return false;
  if(a===192&&(b===0&&c===0||b===0&&c===2||b===88&&c===99||b===168))return false;
  if(a===198&&(b===18||b===19||b===51&&c===100))return false;
  if(a===203&&b===0&&c===113)return false;
  return true;
}
export function validateOrigin(input,{fixture=false}={}){
  let url;
  try{url=new URL(input);}catch{throw new Error('INVALID_ORIGIN_URL');}
  if(url.username||url.password||url.search||url.hash||url.pathname!=='/'||url.hostname.endsWith('.'))throw new Error('INVALID_ORIGIN_SHAPE');
  if(!fixture&&(url.protocol!=='https:'||url.port))throw new Error('HTTPS_STANDARD_PORT_REQUIRED');
  if(fixture&&!['http:','https:'].includes(url.protocol))throw new Error('UNSUPPORTED_SCHEME');
  if(!fixture){
    const h=url.hostname.toLowerCase();
    if(isIP(h)||EXAMPLE_HOSTS.has(h)||BLOCKED_TLDS.some(t=>h.endsWith(t))||[...EXAMPLE_HOSTS].some(x=>h.endsWith('.'+x)))throw new Error('PRIVATE_OR_RESERVED_ORIGIN');
    if(!/^(?=.{4,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/.test(h))throw new Error('UNRECOGNIZED_DOMAIN');
  }
  return url.origin;
}
export function safeURL(value,origin,{includeQueries=false,fixture=false}={}){
  let u;
  try{u=new URL(value,origin);}catch{return null;}
  const intended=new URL(origin).origin;
  if(u.origin!==intended||u.username||u.password||!['http:','https:'].includes(u.protocol))return null;
  if(!fixture&&u.protocol!=='https:')return null;
  if(u.pathname.length>2048||u.search.length>512)return null;
  u.hash='';
  if(!includeQueries)u.search='';
  return u.href;
}
const BLOCKED_IPV6=new BlockList();
for(const [subnet,bits] of [['::',128],['::1',128],['fc00::',7],['fe80::',10],['ff00::',8],['2001:db8::',32],['2001::',32],['2002::',16],['::ffff:0:0',96]])BLOCKED_IPV6.addSubnet(subnet,bits,'ipv6');
export function isPublicIPv6(ip){
  if(isIP(ip)!==6||BLOCKED_IPV6.check(ip,'ipv6'))return false;
  // Constrain to global-unicast addresses (2000::/3).
  const first=Number.parseInt(ip.split(':')[0],16);
  return Number.isFinite(first)&&first>=0x2000&&first<=0x3fff;
}
export async function resolvePinnedPublicAddress(hostname,{resolver=lookup}={}){
  const all=await resolver(hostname,{all:true,verbatim:true});
  if(!Array.isArray(all)||!all.length)throw new Error('DNS_EMPTY');
  if(all.length>24)throw new Error('EXCESSIVE_DNS_RECORDS');
  if(all.some(x=>x.family===4?!isPublicIPv4(x.address):x.family===6?!isPublicIPv6(x.address):true))throw new Error('NON_PUBLIC_DNS_RESPONSE');
  const selected=all.find(x=>x.family===4)??all[0];
  return {address:selected.address,family:selected.family};
}
export async function resolvePinnedPublicIPv4(hostname,{resolver=lookup}={}){
  const selected=await resolvePinnedPublicAddress(hostname,{resolver});
  if(selected.family!==4)throw new Error('IPV4_UNAVAILABLE');
  return selected.address;
}
export async function fetchPublic(url,{maxBytes=1_000_000,timeoutMs=9_000,resolver=lookup,userAgent=BOT_NAME}={}){
  const u=new URL(url);
  validateOrigin(u.origin+'/');
  if(u.username||u.password||u.protocol!=='https:'||u.port)throw new Error('UNSAFE_FETCH_TARGET');
  const selected=await resolvePinnedPublicAddress(u.hostname,{resolver});
  return await new Promise((resolve,reject)=>{
    let finished=false;
    const done=(err,value)=>{if(finished)return;finished=true;clearTimeout(timer);if(err)reject(err);else resolve(value);};
    const req=https.request(u,{
      method:'GET',agent:false,lookup:(_host,_options,callback)=>callback(null,selected.address,selected.family),
      headers:{'User-Agent':userAgent,'Accept':'text/html,application/xml,text/xml,text/plain;q=0.8,*/*;q=0.2','Accept-Encoding':'identity'},
      maxHeaderSize:16_384,rejectUnauthorized:true,
    },res=>{
      const chunks=[];let total=0;
      const headers={};
      for(const name of ['content-type','content-encoding','location','server','x-powered-by','x-vercel-id','cf-ray','x-nf-request-id','x-robots-tag','content-security-policy','strict-transport-security','cache-control','etag']){
        const value=res.headers[name];if(typeof value==='string')headers[name]=value.slice(0,1000);
      }
      if(Number(res.headers['content-length']||0)>maxBytes){res.destroy(new Error('BODY_SIZE_LIMIT'));return;}
      res.on('data',chunk=>{
        total+=chunk.length;
        if(total>maxBytes){res.destroy(new Error('BODY_SIZE_LIMIT'));return;}
        chunks.push(chunk);
      });
      res.on('error',error=>done(error));
      res.on('end',()=>done(null,{url:u.href,status:res.statusCode,headers,body:Buffer.concat(chunks),address_family:selected.family,redirect_followed:false}));
    });
    const timer=setTimeout(()=>req.destroy(new Error('REQUEST_TIMEOUT')),timeoutMs);
    req.on('error',error=>done(error));
    req.end();
  });
}
