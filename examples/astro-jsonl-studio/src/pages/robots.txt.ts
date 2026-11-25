import type {APIRoute} from 'astro';
export const GET:APIRoute=({site})=>{
 const url=site??new URL('https://jsonl-studio.example.org');
 const placeholder=/(?:^|\.)example\.(?:org|com|net)$/.test(url.hostname);
 const content=placeholder
  ?'User-agent: *\nDisallow: /\n'
  :'User-agent: *\nAllow: /\nSitemap: '+new URL('/sitemap-index.xml',url).toString()+'\n';
 return new Response(content,{headers:{'Content-Type':'text/plain; charset=utf-8'}});
};
