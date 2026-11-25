import {defineConfig} from 'astro/config';
import sitemap from '@astrojs/sitemap';
const stage=process.env.RELEASE_STAGE||'FIXTURE_ONLY';
const target=process.env.SITE_URL||'https://starter.example.org';
if(!['FIXTURE_ONLY','BUILD_ONLY_NOT_DEPLOYED'].includes(stage))throw Error('Unknown RELEASE_STAGE');
let url;
try{url=new URL(target)}catch{throw Error('SITE_URL must be an absolute HTTPS origin')}
if(url.protocol!=='https:'||url.pathname!=='/'||url.username||url.password||url.search||url.hash||url.port)throw Error('SITE_URL must be an HTTPS root domain');
const host=url.hostname.toLowerCase();
const reserved=['example.com','example.org','example.net','localhost','invalid','test','local'];
const forbidden=reserved.some(v=>host===v||host.endsWith('.'+v))||!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(host);
if(stage!=='FIXTURE_ONLY'&&forbidden)throw Error('Production candidate cannot use reserved or invalid domain');
if(stage==='FIXTURE_ONLY'&&!forbidden&&process.env.ALLOW_REAL_FIXTURE_HOST!=='yes')throw Error('Fixture must use reserved example domain unless explicitly approved');
export default defineConfig({site:url.origin,output:'static',trailingSlash:'always',integrations:[sitemap()],vite:{preview:{strictPort:true}}});
