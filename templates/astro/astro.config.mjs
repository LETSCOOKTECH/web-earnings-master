import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Set SITE_URL to the real canonical HTTPS origin in the deployment environment.
const site = process.env.SITE_URL;
if (!site || !/^https:\/\/[^/]+\/?$/.test(site) || site.includes('example.com')) {
  throw new Error('SITE_URL must be the real HTTPS production origin before building');
}
export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
