# Technical SEO and ranking fundamentals — Astro web tools

**SEO isn't a Google switch.** Crawling, indexing, serving/ranking, AI selection, referral traffic, revenue are separate systems. Technical correctness is necessary for eligibility, but not sufficient for rank 1.

## Initial HTML and URL strategy
- Pages must return meaningful semantic HTML from the server/static build, accessible before JS hydrates.
- Real 200/404/410 HTTP status; avoid JS-only error routes or soft 404. Canonicals absolute, never point to unrelated task; align redirects, hreflang and sitemap.
- `robots.txt` only access preferences; private data belongs behind auth, not robots. A robots-blocked URL cannot show a noindex that Google's crawler never fetches.
- Sitemap index URLs point to real sitemaps; include canonical live URLs only. XML sitemap is a hint, not indexing guarantee.
- Content-led link architecture: home -> categories -> distinct tool pages -> real guides -> original research. Real HTML `<a href>` with descriptive anchors.
- Meta description is a suggestion for snippet, not a guaranteed displayed text; titles may be rewritten. Avoid manipulative keyword stuffing.
- Structured data: accurate WebSite, Organization, BreadcrumbList, SoftwareApplication/WebApplication *if relevant*, visible factual values only, rich-result eligibility not ranking guarantee; validate feature support.
- Image SEO: original screenshot/figures with real alt text, contextual prose and accessible image URL; no fabricated examples.
- Localization: fully translated usable UI/guides and `hreflang` only when real localized versions exist; don't auto-clone keyword pages for every country.

## Performance
Aim at good field values p75 LCP ≤2.5 sec, INP ≤200ms, CLS ≤0.1. Test low-end Android, physical mobile, poor network and heavy processing. JS islands/lazy WASM/worker processing; ads cause extra layout shift and must be measured.

## Ranking work after eligibility
Research exact search intent, outperform competing workflows, earn authentic references from original data, build repeat use and legitimate distribution, observe Search Console clicks/impressions vs task success, then revise.

## Manual verification
Live Google Search Console URL Inspection, Bing Webmaster URL inspection, rich-result test, mobile QA, server log verified bot access. Local static audit cannot prove these.

