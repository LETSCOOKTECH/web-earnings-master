---
name: web-astro-engineering
description: "Implement production-oriented Astro websites with search-readable static HTML, accessible islands, reusable SEO components, secure browser processing and tests."
---

# Astro Engineering

**Use when:** Implement production-oriented Astro websites with search-readable static HTML, accessible islands, reusable SEO components, secure browser processing and tests.

**Workflow contract:** Follow the next steps proportionally to the request. Prefer current primary sources to saved claims. Adapt the sequence when evidence suggests a better route; do not overbuild a minor task. Show exact verification, uncertainty, and safety boundaries. Read `AGENTS.md` and the matching `references/` files when carrying out substantial work.

## Architecture and code workflow
1. At run time consult current Astro docs for version/deprecation changes. Default to static builds for public tool landing pages if feasible; use server/hybrid only when justified. Required: production origin config not example.com, redirect policy and deterministic output.
2. Separate `src/pages` from `src/components`, `src/lib`, `src/layouts`, `src/content`, `public` and `tests`. Canonical identity and page metadata come from validated site config. Never use fake domains or staging canonicals in deployable output.
3. Pre-render title, H1, body explanation, meaningful text, breadcrumbs, real anchors and schema in HTML. Interactive application can be a hydrated island; users and crawlers shouldn't need JS to understand which task is provided.
4. Avoid loading the entire editor/workers/codecs above the fold. Use component-level hydration, progressive loading, lazy imports, cancellable processing, memory caps and object URL cleanup. Test both no-JS explanatory content and JS-enabled tool function.
5. Use `@astrojs/sitemap`, correct sitemap-index location, status codes, security headers appropriate to host, canonical and hreflang only when real translated content exists. Never include results/session/upload URLs in XML.
6. Build responsive compact tool-first UI; correct labels/status events; no popunder or ad-shaped download. Respect reduced motion and accessible keyboard controls.
7. Host statically where possible, use CDN and content-hashed assets, monitor bandwidth and free-tier limits. Use privacy-by-design; only add analytics after consent review.
8. Implement proper lint, type checks, unit/integration/E2E and built-output audit. Capture run logs and real test results; do not treat scaffold or CI yaml as proof.

## Starter examples
`templates/astro/astro.config.mjs`, `templates/astro/src/components/SEOHead.astro`, `templates/astro/src/layouts/BaseLayout.astro`, `templates/astro/src/lib/seo/schema.ts`, `templates/astro/src/pages/robots.txt.ts`; test with `node scripts/audit-static-site.mjs` and `scripts/audit-live-site.mjs`.
