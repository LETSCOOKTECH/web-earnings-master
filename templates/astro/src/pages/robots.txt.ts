// Astro static route: output depends on configured production site.
export const prerender = true;
import type { APIRoute } from 'astro';
export const GET: APIRoute = ({ site }) => {
  if (!site || !/^https:\/\//.test(site.href) || site.hostname.endsWith('.example')) {
    throw new Error('Set actual HTTPS site origin before publishing robots.txt');
  }
  const text = ['User-agent: *','Allow: /','',`Sitemap: ${new URL('sitemap-index.xml',site).href}`,''].join('\n');
  return new Response(text,{headers:{'Content-Type':'text/plain; charset=utf-8'}});
};
