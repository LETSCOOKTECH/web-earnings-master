---
name: sense-astro-architecture
description: Build clean, fast, accessible Astro web-tool applications with static SEO HTML, browser processing, secure handling and reusable layouts.
---


# Astro production architecture

## Target structure
`astro.config.mjs` + `src/pages/`, `src/layouts/BaseLayout.astro`, `src/components/SEOHead.astro`, `src/components/ToolShell.astro`, `src/lib/processing/`, `src/lib/seo/`, `src/lib/analytics/`, `src/styles/`, `public/`, `tests/`. See `references/astro-production.md` and `templates/astro/`.

## Requirements
1. Keep all public tool descriptions, supported formats, limits, headings, methodology, FAQs where genuinely useful, related HTML `<a>` links, author/publisher info and error guidance in pre-rendered HTML. Hydrate ONLY processing widgets using `client:*` where necessary.
2. One canonical route per materially distinct task. Clean path, consistent trailing slash/host redirects; no indexable query variations, upload filenames, result URLs, empty user-generated results or duplicate paginated pages.
3. Use Astro `site` production origin and `@astrojs/sitemap` with an explicit robots Sitemap pointing to *actual* `/sitemap-index.xml` (when the integration emits it). Exclude unsupported/duplicate pages from sitemap.
4. Centralized SEOHead: unique title/description, canonical, OG/Twitter metadata, image alt, accurate applicable JSON-LD. No fake aggregateRating or nonsensical FAQ schema.
5. UI: compact typography, high contrast, task front-and-center, stable layout, semantic controls, keyboard/focus/reduced-motion support, visible loading/error/success states. No intrusive ads, fake buttons or fake animations.
6. Use the File API, Canvas or open-source codecs/Web Workers/WASM when justified. Put pixel/byte/worker limits in place; test low-memory mobile and legacy compatibility. Validate ACTUAL decoded result (header, size, dimensions); do not claim impossible lossless targets.
7. No image upload to server when local processing is advertised; never put uploaded content into analytics/logs. Sanitize user filenames, enforce output MIME, memory limits and ZIP integrity.
8. Security: restrictive headers and CSP tested with third-party ads/CMP; dependency audit and SRI where practical; server-side validation if any server processing is added. Separate CDN security and verified bot allow rules.
9. Run `npm run build` in the consuming site, actual Playwright browser tests, mobile tests, `audit-static-site.mjs` against dist/ and real HTTP checks after deployment.

## Output
Architecture Decision Record, URL manifest, tool spec, implementation and tests, browser/device matrix, results with logs. Never declare production-ready from unrun static source.

