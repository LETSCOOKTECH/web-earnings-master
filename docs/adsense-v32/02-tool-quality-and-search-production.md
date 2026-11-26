# 02 — Production-ready tools, classic SEO, AI search and release verification

**Date:** 2026-11-26. **Owners:** web-astro-engineering, web-browser-runtime, web-product-validation, web-security-performance, web-technical-seo, web-ai-search-optimization. This is implementation guidance with fail-closed receipts, not a promise that any framework dominates Google.

## 1. Convert the research thesis to a testable software contract

Every approved tool must specify:
- Human actor, task trigger, input artifact, desired output, success oracle, failure behavior, geo-language, privacy classification.
- Real constraints: file type/magic/encoding, limits/quotas, rounding/source of facts, version compatibility, calibration and uncertainty.
- Verification: independent reference formula or known-good file; no algorithm derived solely from the same AI prompt that generated the tool.
- Real runtime cost: client worker memory and CPU, server invocations when needed, storage/egress, error costs, abuse bounds, maintenance and security.
- Release and rollback: scoped feature flags, data migrations where applicable, owner approval and monitoring.

Choosing Astro is an **engineering tradeoff** (static HTML, partial hydration, routing, deployment), not a Google ranking guarantee. Use Astro when its static/SSR islands fit. Use another tech for real-time shared state, legacy code, complex auth or an app engine if that better preserves correctness. Make HTML readable without JS; hydrate the actual calculator/editor as necessary. Browser-only conversion can save server compute but is not free of device limitations, upload metadata exposures or vendor scripts.

## 2. Functional test matrix for actual user trust

- NORMAL: exact expected result, a second independent method, reproducible input/output and download.
- BOUNDARY: 0, negative, fractions, large integers, max input, integer overflow, rounding precision, unit mismatch.
- INVALID: empty/truncated file, wrong extension/mime, bad UTF-8, duplicate JSON keys where relevant, missing fields, malicious characters.
- PERFORMANCE: file size beyond recommended limit, slow mobile CPU, memory constraints, handling 10x traffic and real page interaction performance. A valid 16 MB cap should be disclosed honestly; streaming File APIs alone do not mean 500 MB bounded-memory streaming.
- OUTPUT: escaped CSV/TSV spreadsheet formula injection including **headers**, actual encoded BOM only when promised, binary output integrity, error reports, schema constraints, duplicate preservation, privacy and user consent.
- ACCESSIBILITY: keyboard, screen reader names/errors, focus order, high contrast, zoom/reduced motion, responsive action labels, mobile keyboard types, tooltips not essential to comprehension.
- RELIABILITY: no user input loss on reload, abort/cancel, error recovery, download/retry, idempotence and monitoring.
- SECURITY: CSP, dependency/bundle audit, scoped API keys, CSRF/authz for stateful endpoints, SSRF protections for URL fetchers, no unsafe remote execution and safe temporary artifact lifecycle.

An AI-produced mockup with a calculating form is not production-ready. Unit and browser tests must run against the **actual built code** and detect wrong outputs; screenshots alone do not validate mathematical correctness.

## 3. Structured high-quality tool page

Template per truly distinct user job:
1. Honest page title/H1: what exact task is performed, with units/platform when material.
2. Immediate working interaction, not ads or huge hero text.
3. Example inputs and output with actual computed expected values (not invented user analytics).
4. Explanation of assumptions, edge cases, data provenance and when the answer is inapplicable.
5. Output format, file privacy and retention disclosure; accessible copy/export/download controls.
6. Meaningful adjacent links only to tasks users naturally perform next, not forced multistep pageview chains.
7. Compact on-page original references / methodology, support/contact info, limitations and updated-on date only when an actual update happened.
8. Page-specific text tied to real distinct functionality. Shared boilerplate must not be disguised as 100 independent tool guides.

Don't artificially inflate text to satisfy a word-count myth. Google Search & AdSense prioritize meaningful unique publisher value. The number of generated pages and schema tags do not guarantee indexing or approval. Avoid mass permutation of one converter's inputs unless there is unique distinct value for the query.

## 4. Rendering, crawl and index correctness

A production URL must be HTTPS (except local tests), publicly accessible where intended, return appropriate status (200 for actual content, real 404 for missing routes), respond without unintended redirects, expose useful canonical HTML in the initial response, and not ship accidental robots.txt Disallow, meta noindex or X-Robots-Tag noindex. JS metadata fixes after initial noindex are unsafe (Google may skip rendering). Verify resource accessibility (JS/CSS), sitemap with canonical URLs and internal links that the crawler can traverse. Prefer stable URLs; use hreflang only for real language/regional variants, not geo-keyword stuffing.

Define canonical clusters for interchangeable versions and non-indexed temporary task-output URLs. Avoid indexing user-upload filenames, generated personal content, search parameters or other sensitive/private data. Robots controls influence crawling; noindex influences indexing; a blocked crawler cannot reliably inspect a meta noindex hidden on a blocked page. Test using authorized Google Search Console URL Inspection and Page Indexing reports; don't invent results from static HTML.

Google crawls and renders, indexes, then serves separately. A sitemap is a hint, not an indexing order. A well-formed SoftwareApplication JSON-LD may be eligible for documented rich results, but no rich appearance is promised. Google's AI guidance states there is **no mandatory llms.txt or special AI markup** to participate in Google AI Search. Real structured data must match visible content.

## 5. Performance without false ranking guarantees

Track real-user Core Web Vitals: LCP <=2.5 seconds, INP <=200 ms and CLS <=0.1 at P75 where applicable, plus functionality and overall usability. Page experience is broader than these numbers and Google says passing them does NOT guarantee higher rankings. Lab Lighthouse scores are diagnostics not real field percentiles. Reserve ad slots and image dimensions; prevent layout shifts on lazy-loading and consent; avoid large layout changes during file input. Use HTTP caching carefully for static assets, pre-compute immutable content and minimize unnecessary JS; do not ship a giant WASM binary without an asset-size gate or cache impact test.

Run Playwright in Chromium, Firefox and WebKit for main user flow, cross-origin ad failure mocks, no-JS readable main content, mobile, error handling, keyboard, download, robots/prod noindex and canonical checks. Add field Real User Monitoring only with user consent/appropriate data minimization.

## 6. AI/LLM discovery without superstition

Separate four systems: Google Search traditional results, Google AI Overviews/AI Mode, third-party search-backed assistants and foundation model memorized responses. They do not have identical indexing pipelines or citation rules. Crawl access depends on provider robots preferences and actual client behavior. Verify official bot names, policies and current control surfaces before editing robots. Never assert that allowing all AI crawlers ensures citations or traffic.

For Google generative features follow Google Search technical requirements, useful original data, extractable clear factual explanations and Search Console property verification. Google introduced optional generative AI visibility reporting to a **subset of properties in June 2026**. It must not be claimed to be universally present. A brand citation may generate **no referral click**; measure traffic separately. Citation share studies can illustrate probabilities but aren't platform guarantees. Never mass-create near-duplicate short answers for every possible prompt fan-out.

## 7. Security and content policy before publication

Original data and legal rights: no copied restricted calculators, no copyright scraping, no misleading rankings, no undisclosed AI-generated medical/legal calculations, no harmful software, no covert downloads, no dark-pattern subscriptions or permission prompts. Validate external formulas against reliable source versions. For money/legal/health tools, higher expert validation and disclaimers are necessary and failure can be more expensive than ad revenue. For an ordinary utility tool, minimize data collection and state needed; if no account needed, do not create one.

## 8. Release checklist

- Product: task complete with independent expected result, accessibility and abuse bounds.
- Engineering: actual green build, unit + E2E, output and security review, performance budget.
- Search: initial HTML, canonical, robots/noindex, sitemap, real internal navigation, page-intent distinction, metadata, HTTP 404.
- Analytics: privacy-respecting conversion measurement (successful fulfilled task) separate from ad impressions; owned Search Console property and consent notices.
- Monetization: AdSense status UNKNOWN until account and site approved; no invented publisher ID.
- Public deployment: owner-authorized HTTPS site observed, crawl and Search Console receipts.
- Revenue: NEVER infer earnings from an ad-looking div.

**Primary sources:** https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics ; https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap ; https://developers.google.com/search/docs/appearance/structured-data/software-app ; https://developers.google.com/search/docs/fundamentals/ai-optimization-guide ; https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports ; https://developers.google.com/search/docs/appearance/page-experience ; https://web.dev/articles/defining-core-web-vitals-thresholds .

**Claims requiring independent review:** Exact current bot access, ad/AI report availability, real site indexing, page quality review, Core Web Vitals at P75, traffic and user satisfaction. No local test can certify any of these external outcomes.
