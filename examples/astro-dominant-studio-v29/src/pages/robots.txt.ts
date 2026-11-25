import type {APIRoute} from 'astro';
export const GET:APIRoute=({site})=>{
 const u=site??new URL('https://studio.example.org');
 const placeholder=/(?:^|\.)example\.(?:org|com|net)$/.test(u.hostname);
 const text=placeholder?'User-agent: *\nDisallow: /\n':'User-agent: *\nAllow: /\nSitemap: '+new URL('/sitemap-index.xml',u).href+'\n';
 return new Response(text,{headers:{'Content-Type':'text/plain; charset=utf-8'}});
};
