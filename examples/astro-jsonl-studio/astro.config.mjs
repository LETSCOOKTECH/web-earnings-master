import {defineConfig} from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site=(process.env.SITE_URL||'https://jsonl-studio.example.org').replace(/\/$/,'');
const release=process.env.SENSE_RELEASE||'local';
let parsed;
try{parsed=new URL(site);}catch{throw Error('SITE_URL must be an absolute HTTPS site origin');}
if(parsed.protocol!=='https:'||parsed.origin!==site||parsed.username||parsed.password||parsed.port)
 throw Error('SITE_URL must be an HTTPS root origin without credentials, ports or paths');
const host=parsed.hostname.toLowerCase();
const placeholder=['example.org','example.com','example.net'].some(s=>host===s||host.endsWith('.'+s))||
 /(^|\.)(test|invalid|localhost|local|internal)$/.test(host);
if(release==='public'&&placeholder)
 throw Error('PUBLIC RELEASE BLOCKED: documentation/internal origin is not a deployed website');
if(!['local','public'].includes(release))throw Error('SENSE_RELEASE must be local or public');
export default defineConfig({
  site,
  output:'static',
  trailingSlash:'always',
  integrations:[sitemap()],
});
