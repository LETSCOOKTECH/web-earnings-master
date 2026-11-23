# 17 — Comprehensive operational SEO, GEO, AEO and vertical-search engineering
Date 2026-11-23. Purpose: conversion from real user job to discoverable, reliable, compliant result. No ranking guarantees.

## 1. Research the job before keywords
For each target segment capture trigger/problem, input, output, exact correctness oracle, time-to-task, typical repeat frequency, alternatives and country/language. Intent clusters: navigation, simple fact/answer, explanation, comparison, local, commerce, creation, diagnostics, file transformation, recurring monitoring. Synonyms do not automatically need unique URLs. A niche with high search volume but near-zero outbound clicks may produce poor ad economics. Normalize vendor data definitions: Trends 0–100 relative; Keyword Planner advertiser CPC/competition; Semrush/Ahrefs modeled volume, KD, backlinks; GSC first-party impressions/clicks.

## 2. Crawl discovery and technical controls
Check canonical origin/HTTPS and 3xx redirects; 200 real page, accurate 404/410 missing pages, no soft-404, server consistency. Robots root per scheme/hostname; RFC9309 and engine-specific differences; meta robots/X-Robots-Tag; canonical/link HTTP headers; XML sitemaps canonical URLs and truthful lastmod; internal anchors (real href); orphan pages and crawl traps. Authentication and private content protected server side. Always compare CDN/WAF and origin response for intended crawler, but user-agent spoofing does not establish authenticity.

## 3. Rendering/indexing
Important pages need understandable initial HTML, title/H1 and direct task interface or meaningful description. Google can render JavaScript, but client-only apps may fail on other crawlers, timeout or blocked resources. Test network disabled JS, actual browser DOM, accessibility tree and stored canonical. SSG/SSR/CSR decisions should follow task and reliability; Astro is not a direct ranking signal. Canonical is a hint and Google chooses actual; use Search Console URL Inspection, not site: as definitive index proof. Discovered/crawled not indexed ≠ automatically low quality; examine status, duplicates, manual actions and meaningful content.

## 4. Query-language and editorial relevance
Unique descriptive title reflecting task and verified constraints; metadata for a useful snippet; semantic headings, immediate answer/primary controls, original examples, linked methodology, date of tested measurements, visible limitations and privacy. No keyword stuffing, generated doorway combinations, fake publication updates, hidden bot-only text or invented reviews. E-E-A-T describes an evaluative framework, not a single numeric search rank score. Search quality raters don't directly edit your page's ranking.

## 5. Structured data and rich results
schema.org is vocabulary, Google Search supports only selected feature types and eligible representations. JSON-LD/other permitted formats must reflect actual visible content. SoftwareApplication schema does not guarantee app star snippets; fabricated AggregateRating is invalid. Validate with Google's current Rich Results Test and property enhancement reports where supported; a schema validator pass ≠ rich feature approval. FAQ and other feature availability can be deprecated; consult change logs, not 2022 tutorials. No special AI schema is necessary for Google generative features.

## 6. Media and multimodal
Original image file at crawlable src, meaningful alt (empty for decorative), captions/context, intrinsic dimensions, responsive srcset/sizes, supported codecs, image rights and page usefulness. Google Images, Lens and other visual search use different signals and measurement surfaces. Video watch-page relevance, actual playable source, poster/thumbnail, transcript and eligible structured data; media files and hosting access matter. Search Console 2026 multimodal reporting must be interpreted in the exact property/account and reporting definitions. Don't claim image sitemap/schema guarantees Google Lens discovery.

## 7. Localization and international
HTML lang, human-quality localization, canonical language-specific URLs and hreflang only for actual equivalents; x-default where useful, return references and regional task units; ccTLD and country targeting can affect perception. Don't create 100 geo pages if jobs are identical. Date and number formatting, legal/privacy, accessibility and device expectations are country-specific. Inspect SERP and source local language; translated keyword tool outputs alone are insufficient.

## 8. Technical experience: performance, security and accessibility
Measure mobile field Core Web Vitals LCP, INP, CLS at appropriate p75, compare lab traces, handle caching and resource priority. Speed is one part of page experience, not a top-1 switch. Semantic native controls, keyboard focus, error messages, reduced motion, screen reader labels, successful upload/convert/download and low memory reliability are product requirements. CORS, CSP, CSRF, XSS, sandbox, auth, third-party trackers and CDN policies separate; do not allow agents privileged actions without confirmed authorization.

## 9. Ranking reality and SERP analysis
Competing relevant pages, answer modules, local packs, ads, shopping and AI features can drastically alter click potential. Position is query, device, language, place and time-specific. Compare top 10 on actual job completion and first-party evidence, not only DA/DR. A new site cannot force outranking a dominant navigational brand through titles or schema. Link earning: original replicable benchmarks, useful utilities, public tooling, earned editorial citations and respectful partnerships; no PBN, buying followed links or spam syndication.

## 10. AI search / answer engines
For Google AI Mode and Overviews use standard Search crawl/index/snippet eligibility and current generative inclusion preference; Google says no need for llms.txt, artificially sliced chunks or fake citations. For OpenAI, Anthropic and Perplexity distinguish search bots, training bots and user fetchers. For Microsoft note future training/grounding controls and observed AI Performance citations. Publish original data that other parties actually find useful, but whether an AI cites it is independently selected. AI citation != human click; agent task completion may generate no ad-eligible pageview.

## 11. Off-page and multi-channel visibility
Legitimate references, real community participation, GitHub packages, educational integrations, helpful YouTube demos, newsletters, brand search and user shares are channels separate from rankings. Only create publishable content if it solves a need better than available sources. Repeatability, trust and actual output quality drive durable use more reliably than fake SEO page counts. Paid search/affiliate/social traffic and organic should be attributed separately; never buy invalid ad clicks.

## 12. Search data and anomaly diagnosis
A property-level Search Console search appearance report, country/device/URL analysis, query anonymization and aggregation require proper denominators. Bing AI grounding counts not comparable to Google impressions. GA4 human session attribution can lose AI referrers. Define event flow: indexed -> impressions -> clicks -> landed sessions -> tool start -> validated completion -> return/share -> ad-eligible pageviews -> publisher revenue -> net margin. When a site falls from 1000 to 10 visits, investigate channel, date, country, query mix, SERP feature and index/canonical changes before blaming a penalty.

## 13. From research to launch operational phases
(1) Query and real-user problem sample; (2) competitor task fixture benchmarking; (3) architecture and privacy spec; (4) tested original tool; (5) raw HTML/JS/accessibility/canonical/robots checks; (6) verified domain DNS/TLS/redirect/sitemap; (7) live Search Console/Bing and crawler logs; (8) qualify user traffic; (9) publisher review and lawful consent; (10) conversion, retention, AI citations and cost review; (11) isolated evidence-driven experiments; (12) maintain or stop under explicit gates. Don't multiply sites or thin pages on speculation.

## 14. Negative release gates
FAIL if default 200 for 404, deceptive download-ad placement, invented star ratings, private uploads exposed, policy by checksum without semantic review, invalid result files, nonaccessible primary task, JS-only navigation with broken crawler path, false AI Search requirement, GSC claim without access, unverified crawler whitelisting, paid/fake link network, or an owned site that cannot complete its advertised job.

## 15. Reproducible audit and reporting
Record date/time UTC, URLs, deployment hash, registrar/CDN, device/browser, query/country, HTTP chain, page HTML vs DOM, official indexing states, source citations and scripts. Distinguish PASS, FAIL and UNKNOWN; calculate user-task and revenue metrics only from actual measured denominators. Commit source links and test artifacts, NOT secrets, exact IP, user files or personal analytics. Fail uncertainty-sensitive release gate if provider account/policy cannot be verified.

## First-party core references
https://developers.google.com/search/docs/fundamentals/seo-starter-guide
https://developers.google.com/search/docs/fundamentals/how-search-works
https://developers.google.com/search/docs/fundamentals/creating-helpful-content
https://developers.google.com/search/docs/essentials/spam-policies
https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
https://developers.google.com/search/docs/appearance/structured-data/sd-policies
https://developers.google.com/search/docs/appearance/ai-features
https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
https://developers.google.com/search/docs/appearance/core-web-vitals
https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
https://developers.google.com/search/updates
https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a
https://www.w3.org/TR/WCAG22/

A URL printed here is an entry point; re-open the original section and record last checked when making a consequential site or policy decision.
