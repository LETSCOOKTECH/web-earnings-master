# Traditional SEO engineering for Astro

## How ranking actually happens
Discovery/crawling → index evaluation → retrieval and ranking for a query → SERP presentation → human click → task completion. Google uses many relevance/quality systems; no single markup, CWV threshold, LLM document, framework, XML file or site submission can force #1.

## Architecture
- Static HTML output for public titles/headings/explanations/links, with client islands for CPU-bound file tools. Minimal JS on the initial view; worker/codec loaded only when needed.
- A single canonical origin and consistent trailing slash policy, meaningful URL hierarchy, real navigation, correct HTTP responses, siteconfig. Use `@astrojs/sitemap` and inspect output (`sitemap-index.xml`, `sitemap-0.xml` when integration emits these); no example.com in production.
- Reusable SEOHead/Layout. Page-specific title/meta/OG/canonical, real structured data only, supported schema feature testing. Use page-intent map to avoid overlapping nearly identical URLs.
- Tool-centric pages: task description and accessible editor first, then specific method, file support, real examples, limitations and troubleshooting. No filler or fabricated stats.
- Security headers and responsive accessible UI, low-end mobile worker tests, LCP/INP/CLS in actual field reports where possible.

## SEO decision tree
- Not discovered → audit internal links/sitemap/robots, logs, HTTP.
- Discovered but not indexed → check 200, canonical, duplication/thinness, noindex, crawl/redirect, Google selected canonical, manual actions.
- Indexed but no impressions → revisit demand, query relevance, semantic intent, product fit, topical coverage; do not manufacture pages.
- Impressions but low clicks → inspect SERP layout and search intent, wording of title/snippet, AI/ads/visual features, compare by country/device/position.
- Clicks but user doesn't use tool → real UX/product failure, mismatched page promise.
- Tool completion but no traffic growth → genuine external distribution, referrals, repeated demand, authority and performance improvements.

## Content/authority
Rank for many phrases by **solving a coherent task** rather than keyword-stuffing. Create a separate URL only for genuinely different workflows. Produce source-worthy original evidence: actual benchmark methodology, reproducible fixtures, software limitations, comparisons. Earn real third-party references and partnerships without paid link schemes.

## Measurement
GSC for impressions/clicks/indexing, Bing Webmaster for search, first-party analytics for human conversions, separate GenAI reports and referral analytics. Use Trends for relative history, Semrush for modeled demand/KD, not promise. Review real query-level results and adjust on evidence.

## International
If user demand warrants localization, translate and test the actual interface and examples. Use hreflang and canonical carefully; geo-specific ad consent, formats and instructions. Avoid copy/paste mass-localized pages without unique value.
