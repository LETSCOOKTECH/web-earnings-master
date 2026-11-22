---
name: web-technical-seo
description: "Audit and improve crawlability, indexability, rendered HTML, canonicalization, internal links, sitemaps, structured data and Core Web Vitals for actual search eligibility."
---

# Technical Seo

**Use when:** Audit and improve crawlability, indexability, rendered HTML, canonicalization, internal links, sitemaps, structured data and Core Web Vitals for actual search eligibility.

**Workflow contract:** Follow the next steps proportionally to the request. Prefer current primary sources to saved claims. Adapt the sequence when evidence suggests a better route; do not overbuild a minor task. Show exact verification, uncertainty, and safety boundaries. Read `AGENTS.md` and the matching `references/` files when carrying out substantial work.

## Full search technical audit
1. Prove public origin, DNS, TLS, response codes (200 real pages; 301/308 chosen host; 404/410 missing; no soft-404), valid redirects and crawlable HTML.
2. Check raw HTML with JavaScript disabled: useful content, unique title/H1, text summary, real `<a href>` navigation, alt where relevant, canonical and indexability. Then compare fully rendered DOM and user workflow.
3. Check robots directives for each important crawler using proper group semantics, `noindex` and `X-Robots-Tag` conflicts, canonical collision, parameters, sessions, trailing slash, hreflang/locale conflicts and sitemap inclusion.
4. Sitemaps list only desired canonical/indexable pages; correct absolute host, accurate lastmod, correct `.xml` or sitemap index configured in actual Astro build. Google Search Console/Bing ownership and URL Inspection verify indexed state.
5. Validate proper structured data **supported by real page content** and Google's eligible rich-result features; distinguish Schema.org properties from actual Google rich-result support. No invented rating values, unsupported FAQ markup or AI-only schema claims.
6. Real mobile usability; Core Web Vitals LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 at p75 from field observations; synthetic PageSpeed is diagnostic, not proof of field performance. Test responsive controls and worker interactions.
7. Optimize image/video URLs, file size, original evidence, alt, src, license where appropriate and indexing; inspect Google Images traffic separately.
8. Check manual actions, security issues, site migration/redirect changes, log bot responses, CDN challenges; avoid chasing “crawl budget” fixes on tiny sites without evidence.
9. Build dynamic action plan: symptom → test → root cause → repair → re-inspect. Indexing/ranking not guaranteed by a PASS.

## Commands and artifacts
`node scripts/audit-static-site.mjs --dist ./dist --origin https://yourdomain`, then live tests after deployment, Search Console URL Inspection and source registry. `references/search-technical.md` details each layer.
