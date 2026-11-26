import {defineConfig} from 'astro/config';
import sitemap from '@astrojs/sitemap';
const raw=(process.env.SITE_URL||'https://studio.example.org').replace(/\/$/,'');
const release=process.env.SENSE_RELEASE||'local';
if(!['local','public'].includes(release))throw Error('Invalid SENSE_RELEASE');
let url;try{url=new URL(raw);}catch{throw Error('SITE_URL must be HTTPS origin');}
if(url.protocol!=='https:'||url.origin!==raw||url.username||url.password||url.port)throw Error('SITE_URL must be HTTPS root without query or port');
const placeholder=/(?:^|\.)example\.(?:org|com|net)$/.test(url.hostname)||/(\.|^)(local|test|invalid)$/.test(url.hostname);
if(release==='public'&&placeholder)throw Error('PUBLIC RELEASE BLOCKED: reserved example origin');
export default defineConfig({site:raw,output:'static',trailingSlash:'always',integrations:[sitemap()]});
