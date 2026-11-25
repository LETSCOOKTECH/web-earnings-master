#!/usr/bin/env node
/**
 * V20 domain truth: a static audit and a developer's written hostname are NOT deployment proof.
 * This validator only rejects definitely non-public / reserved origins; it never
 * establishes domain ownership, live DNS, TLS or a deployed service by itself.
 */
import net from 'node:net';
const FORBIDDEN_SUFFIXES=['localhost','local','internal','invalid','test','example'];
const FORBIDDEN_EXACT=['example.com','example.org','example.net'];
export function validatePublicSiteOrigin(value,{allowPath=false}={}){
 const issues=[];
 let u;
 try{u=new URL(value)}catch{return {ok:false,issues:['Origin must be an absolute URL'],origin:null}}
 if(u.protocol!=='https:')issues.push('Public launch requires HTTPS');
 if(u.username||u.password)issues.push('Credentials embedded in origin are prohibited');
 if(u.port)issues.push('Do not use a custom port as proof of public deployment');
 if(u.search||u.hash)issues.push('Public origin may not include query or fragment');
 if(!allowPath&&u.pathname!=='/')issues.push('Site origin must be the domain root');
 if(allowPath&&!/^\/(?:[a-z0-9-_]+\/)*$/i.test(u.pathname))issues.push('Only a normalized directory base path can be a site origin');
 const h=u.hostname.toLowerCase().replace(/\.$/,'');
 if(!h.includes('.'))issues.push('Public origin needs a fully qualified host');
 if(FORBIDDEN_EXACT.some(s=>h===s||h.endsWith('.'+s)))issues.push('IANA example domain is for documentation, not an owned live demo');
 if(FORBIDDEN_SUFFIXES.some(s=>h===s||h.endsWith('.'+s)))issues.push('Reserved/internal or test DNS suffix is not a public site');
 if(net.isIP(h)!==0)issues.push('Do not use literal IPs for production-domain verification');
 if(h.includes('..')||h.startsWith('-')||h.endsWith('-'))issues.push('Malformed hostname');
 if(/[^a-z0-9.-]/.test(h)&&net.isIP(h)===0)issues.push('Host contains invalid DNS characters');
 return {ok:issues.length===0,issues,origin:u.origin,path:u.pathname,hostname:h,
  status:issues.length?'REJECTED_NONPUBLIC_ORIGIN':'SYNTAX_ONLY_EXTERNAL_DEPLOYMENT_UNVERIFIED'};
}
