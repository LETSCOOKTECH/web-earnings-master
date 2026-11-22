# Astro production implementation reference

## Build and rendering
- `output: 'static'` plus `site: 'https://real-origin'`, exact `trailingSlash` agreement with hosting redirects.
- `@astrojs/sitemap` integration creates `sitemap-index.xml` and `sitemap-0.xml` by default; confirm actual build rather than guessing the path. Filter nonindexable pages.
- `src/pages` routes prerender meaningful HTML; islands hydrate only interactive file tools. Avoid client-rendering page title, content, nav and internal links.
- Place low-priority media behind lazy loading; do not lazy-load the main LCP image. Optimize actual image assets and original screenshots.
- SEOHead should own canonical, title, meta description, OG image, robots meta and truthful schema; do not accidentally double canonical.
- Example starter under `templates/astro/`; replace example origin and legal information. It is scaffolding, not production proof.

## Processing engine
- Resizer: predictable aspect ratio control and pixel limit.
- Compressor: iterative quality + optional resolution tradeoff; always verify actual bytes and explain if target cannot be reached.
- Converter: JPG/PNG/WebP, alpha/solid background policy, MIME/headers verification; HEIC/AVIF need format-specific codec QA.
- Batch: worker/off-main-thread, bounded concurrency, partial failure tracking, ZIP CRC/integrity tests, cancellation and memory budget.
- No user image content in analytics or server logs; local-only claim must match network inspection.

## Developer quality gates
- Node dependency versions pinned in project lockfile; lint/types/tests/build; Playwright real-browser tests; low-memory Android performance checks; automated SEO artifacts plus live HTTP and Search Console verification.
- Correct 404/redirect behavior verified on actual CDN (Astro dev server alone is insufficient).
- Protect user privacy; third-party ad scripts and CMP can add CSP/CWV complexity.

Official: https://docs.astro.build/en/concepts/islands/ ; https://docs.astro.build/en/guides/integrations-guide/sitemap/ ; https://docs.astro.build/en/reference/configuration-reference/

