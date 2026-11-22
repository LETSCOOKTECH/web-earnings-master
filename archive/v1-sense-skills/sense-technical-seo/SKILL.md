---
name: sense-technical-seo
description: Audit and implement Google/Bing search crawlability, indexability, canonical URLs, sitemaps, metadata, structured data, image SEO and Core Web Vitals.
---


# Technical SEO / indexing gate

## Checklist (evidence required)
1. DNS/HTTPS/one production host; status 200 for valid public pages; 301/308 for aliases; real 404/410 for missing pages (not SPA soft-404). No chain loops.
2. Verify raw HTML with JS disabled: meaningful title, unique H1, descriptive summary, actual anchor navigation, full tool context. Test rendered DOM separately.
3. Canonical absolute production URL, self-canonical for unique pages; avoid conflicts with redirects, sitemap, hreflang, internal links, meta robots and X-Robots-Tag.
4. `robots.txt` correct user-agent semantics and real sitemap index path. No sensitive paths mistakenly exposed; note robots blocking does not enforce confidentiality and can hide noindex directive from crawler.
5. Sitemap contains only desired canonical, indexable, 200 URLs; accurate XML and lastmod only when materially changed; submit via Google Search Console and Bing Webmaster Tools.
6. Check mobile usability; no obstructive overlays; LCP <=2.5s, INP <=200ms, CLS <=0.1 at p75 from field data where available. Passing CWV not a guarantee of high rank.
7. Structured data matches visible content; `SoftwareApplication` / `WebApplication` only when supported; validate with Rich Results Test; no fake ratings or reviews.
8. Original descriptive imagery with meaningful alt text and text context; crawlable src URLs and image licenses; include image sitemap when useful.
9. Natural internal anchors and connected topic clusters. Avoid keyword stuffing, doorway/parameter pages and scaled low-value content.
10. Inspect Google Search Console URL Inspection and page indexing report, canonical selected by Google, manual actions and security issues; no indexing guarantee.

## Commands
- Build the site; run `node scripts/audit-static-site.mjs --dist ./dist --origin https://example.com` from this library.
- After deploy, `node scripts/audit-live-site.mjs --origin https://example.com`; follow up manually with Search Console and Bing.

## No false shortcuts
Indexing does not mean ranking; site speed, schema, `llms.txt`, DNS freshness, frequent sitemap re-submissions and keyword density have no guaranteed ranking effect. See `references/search-technical.md` and Google official source registry.

