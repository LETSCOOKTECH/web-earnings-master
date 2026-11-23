# Search-engine architecture forensic audit: research, not a proprietary ranking exploit
**Reviewed 2026-11-23. Source:** User-supplied `Pasted text(5).txt` (118,420 bytes, 2,304 lines) and the five-stage diagram. Indexed claim assessment: `sources/v6_claims_2026-11-23.json` (45 priority claims). This chapter does not certify every sentence of the upload.

## What the diagram depicts
It divides Google-style web search into **(1) crawl frontier → (2) render → (3) hybrid index → (4) scoring → (5) serving/SERP**, with feedback for crawl priority and user interactions. This is a useful *conceptual pipeline*. Some internal project names from court exhibits and 2024 Content Warehouse schemas are real documented artifacts, but drawing them in one static sequence can imply unverified exact runtime paths, always-on components, fixed timing and scoring weights.

### Layer 1 — crawling and discovery
Production frontier schedulers need URL deduplication, host politeness, queue priority, DNS caching and recrawl schedules; a Mercator-style architecture or Bloom filter is an instructive **reference design**, not proof of Google's 2026 implementation at all stages.
For OUR site:
- public crawlable links and stable canonicals, real 200/301/404/410, internal hubs, no infinite faceted/page query traps;
- real lastmod, accurate redirects, sitemap validation, robots scope, WAF allowed verified crawlers;
- document actual 304/ETag behavior if serving unchanged documents. Conditional HTTP transfers are not ranking points.
- Google November 11 2026 CDN warning: origin overload during cold cache after moving CDN; simulate crawler long-tail miss and avoid blanket 403.
Official: https://developers.google.com/search/blog/2026/11/crawling-cdn ; https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget ; https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors .

### Layer 2 — rendering and JavaScript access
Google's Web Rendering Service can render JavaScript, but may do so in separate processing stages, and resource/robots/noindex issues matter. Other search/AI user fetches can differ; do not say *all* bots render or *none* render. Public tool content—title, H1, usage notes, supported formats, real anchor links—should be present in initial HTML. Browser-heavy JS/WASM activates only for the user task; its client-side output is not a substitute for indexable descriptive HTML.
Source: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics ; https://developers.google.com/search/blog/2026/03/crawler-blog-post .

### Layer 3 — hybrid indexes
Inverted lexical indexes, BM25/BM25F, Bloom/SimHash, approximate nearest-neighbor vector indexes and compressed forward metadata describe **classes of information retrieval techniques**. Their mathematics may help design experiments, but knowing them does not expose Google's index tier or your page's hidden `DocID`, `Q*`, `P*`, `siteRadius`, `originalMediaScore` or current boost.
A URL's actual indexability is measurable with Search Console ownership, logs and observed SERPs. A claim that every page is in a 'Base' tier is NOT verifiable externally.

### Layer 4 — scoring and machine learning
The Department of Justice released a January 31, 2025 call exhibit with Google's Pandu Nayak that explicitly mentions Q*, RankEmbed, NavBoost, Twiddlers and PageRank, with NavBoost using 13 months in that historical account. The same source explicitly cautions clicks are a poor proxy and subject to manipulation/position bias. **The source is not a public algorithm control panel.**
Exhibit PXR0357 (redacted): https://www.justice.gov/atr/media/1398866/dl?inline=
Important distinctions:
- **Historical verified:** a court exhibit describes these terms and selected behavior.
- **Not verified:** precise live 2026 factor weights, site-wide thresholds, a stable 13-month window for all queries, Chrome direct-traffic multiplier, page dwell reward or a specific URL-ranking formula.
- **Not actionable:** purchasing clicks, dwell farms, fake branded traffic, bot engagement or mass pages to game search. Such actions risk Search spam and ad invalid-traffic policies.
- Patents and leaked fields show *possible engineering strategies or represented data*, not proof a specific scoring component is active or weighted in production today.
Google ranking systems and spam: https://developers.google.com/search/docs/appearance/ranking-systems-guide ; https://developers.google.com/search/docs/essentials/spam-policies .

### Layer 5 — SERP composition and generative results
A Search result page mixes organic, ads, images/video, snippets, local, AI features and interfaces. Google AI Mode supporting links require index+snippet eligibility; no llms.txt or AI-specific schema necessary. Chrome's Agentic Browsing audit is a different developer product and not the same as Google Search rank.
https://developers.google.com/search/docs/appearance/ai-features ; https://developers.google.com/search/docs/fundamentals/ai-optimization-guide ; https://developer.chrome.com/docs/lighthouse/agentic-browsing/scoring .

## The causal test that actually matters
For a landing page and its task:
1. Record user intent, query/location/device, page content and competitor baseline.
2. Log crawl responses, index state and prior Search performance without guessing Google internal rankings.
3. Change ONE tested behavior: make tool output more correct, remove dead-URL redirects, reduce template duplication, improve mobile usability, publish original benchmark, add a genuinely useful tool variant.
4. Re-evaluate human task completion, Search Console impressions/clicks and AI citations with uncertainty. Use comparison pages and note core updates/seasonality.
5. If changes do not help people, reverse them even if a third-party SEO score rises.

**Explicit anti-hack rules:** No secret score calculator from 'Q*' or 'NavBoost' fields; no patent-to-ranking leap; no artificial pages for each fan-out synonym; no manufactured forum mentions; no implication RRF with k=60 is Google's algorithm. Our agent should learn *mechanisms and controllable user/product improvements*, not exploit nonexistent public controls.
