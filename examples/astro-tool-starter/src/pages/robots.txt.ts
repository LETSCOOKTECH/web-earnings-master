import type {APIRoute} from 'astro';
export const prerender=true;
export const GET:APIRoute=({site})=>{
 const fixture=process.env.RELEASE_STAGE!=='BUILD_ONLY_NOT_DEPLOYED';
 const base=site?.origin||'https://starter.example.org';
 const content=fixture?'User-agent: *\nDisallow: /\n':'User-agent: *\nAllow: /\nSitemap: '+base+'/sitemap-index.xml\n';
 return new Response(content,{headers:{'Content-Type':'text/plain; charset=utf-8'}});
};
