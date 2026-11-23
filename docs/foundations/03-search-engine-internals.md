# 03 — Search-engine discovery, crawling, indexing, retrieval, ranking and SERP economics

## Model boundary
This is an externally supported systems model. Google, Bing and AI companies have unpublished production architectures, feature vectors and ranking weights. Do NOT present an imagined neural network diagram or 200-factor checklist as reverse engineered source code.

## The observable search pipeline
1. Users express task/intent (navigation, research, commerce, local, action, troubleshooting, multimedia). Query distribution changes with season, location and new AI interfaces.
2. URL discovery happens through links, sitemap submissions, feeds, previously observed URLs and provider-specific sources. Sitemaps are hints; a discovered URL need not be crawled.
3. URL frontier and crawl scheduler prioritize what/when/how often to fetch, constrained by host politeness, perceived importance, rate limits and server health. Google explicitly discusses crawl demand/capacity. Crawl budget optimization is not a primary lever for tiny sites without evidence of crawl waste.
4. Robots/transport: request robots.txt for host, interpret crawler-specific matching, follow HTTP and redirects, observe 403/429/5xx/TLS/CDN failures.
5. Parsing and optional rendering: read HTML links, scripts, metadata, structured data and media; use web rendering service where supported, extract rendered content; client-side text is less robust across engines.
6. Canonicalization/duplicate clustering: choose preferred representation using signals such as redirects, rel=canonical, consistent internal links and sitemap hints. Site-provided canonical is a signal, not absolute command.
7. Index evaluation: index candidate might be filtered for duplicate, low value, policy, blocked access, canonical preference, non-HTML handling or fetched error. Being crawled is not a guarantee of indexing.
8. Index representations: inverted terms/postings, documents, entities, passages, media features and approximate semantic representations are general information retrieval concepts. Exact vendor layouts, learned vectors, embeddings and retrieval infrastructure are not publicly known in full.
9. Query interpretation: tokenize/normalize, spelling, query rewriting, intent classification, multilingual and locale context, freshness and vertical needs. Retrieval may involve lexical matches, semantic recall and other models; candidate generation/reranking architecture varies by provider.
10. Ranking and quality systems: relevance to *this query*, original helpfulness, language and location, links/reputation/spam handling, page usability, freshness where appropriate. Rankings are query-context dependent, not a permanent universal domain leaderboard. The ordering algorithm is not public.
11. SERP design: ten-blue-links, AI Overview/Mode, ads, featured snippets, Maps/local, Shopping, video/image, discussion forums, PAA, sitelinks and rich results. Position 1 on an organic list may be visually behind several modules.
12. Engagement: impression != click != visit != correct output != return != ad yield. A zero-click query can be highly visible and economically poor for a display-ad business.
13. Recrawl/reprocessing/reranking: documents and quality systems change, manual actions and spam policies evolve; short-term volatility need not be a penalty.

## Core Google documents
- How Search works separates crawling/indexing/serving (https://developers.google.com/search/docs/fundamentals/how-search-works).
- Ranking systems guide describes many systems and relevance/quality behavior (https://developers.google.com/search/docs/appearance/ranking-systems-guide).
- Canonicalization docs distinguish declarations from Google's selection (https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).
- JS SEO guide clarifies rendering support and limitations (https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).
- Spam policies explain scaled content, expired domain, site reputation and doorway abuse (https://developers.google.com/search/docs/essentials/spam-policies).
All five were opened in official docs on 2026-11-23; implementations must re-open at use time.

## Other engines must not be treated as Google clones
- Bing has Bingbot, independent ranking/indexing, Microsoft Copilot grounding and Webmaster Tools reporting. IndexNow notifies participating engines of URL changes, not guaranteed index/rank; Google support for IndexNow must not be assumed.
- DuckDuckGo sources traditional web results from multiple partners including Bing, plus its own resources; optimizations cannot be assigned to a mythical single independent index.
- Brave maintains its own search index; verify crawler identification from Brave's official docs instead of fabricating Google-like bot behavior.
- Applebot can support Apple search-related products; it is separate from Google. Product-specific Siri/Apple Intelligence sourcing may not be transparent.
- Yahoo/Ecosia and other partner-driven search experiences may delegate indexing to Bing/Google or other suppliers depending on contract/product/region. Do not promise submission to one partner will guarantee visibility everywhere.
- Baidu, Yandex, Naver, Seznam, Mojeek and local/vertical providers have own policies/geographies. Add detailed playbooks only if target users create real relevance; the index supplier and current official docs must be verified.

## Why result #1 wins and loses
A result wins relative to eligible competing results for a particular request/context, not because it used one meta tag. Query relevance, quality, authority, original utility, search intent and topical fit can all matter. Exact weight contributions are UNKNOWN. Brand navigational searches strongly favor their target; broad head terms can be dominated by incumbents; local or exact-action variants may be attainable. A winning #1 can still yield few clicks if an AI response/feature satisfies the request. Review actual accessible click opportunity, not just rank.

## Diagnostic decision tree
NO DISCOVERY -> internal anchors/sitemap/reference/URL coverage.
FETCH ERRORS -> DNS/TLS/robots/host policy/WAF/429/5xx.
CRAWLED NOT INDEXED -> canonical, duplicates, soft 404, content utility, Google-selected URL, manual action.
INDEXED NO IMPRESSIONS -> language/locale, query demand and relevance.
IMPRESSIONS LOW POSITION -> competitor intent comparison, missing outcome/authority, source-quality review.
GOOD POSITION LOW CTR -> SERP layout, branded navigation, snippets and AI answers.
CLICKS LOW START -> product landing promise and UX.
START LOW COMPLETION -> actual tool defect.
COMPLETION NO REPEAT -> low frequency task/retention mismatch.
HUMAN TASKS LOW REVENUE -> policy, country, consent, viewability, page/session, ad demand and operational cost.

## Experimental artifacts
For each query collect exact phrase, engine/surface, country/language, date/time, device, sign-in state, screenshot, top result URLs/types, direct-answer features, task match, whether the cited site actually solves job. Record observed domain data vs modeled third-party estimates. For live site join GSC/Bing query reports with anonymized page task starts/completions and documented denominator. Repeat across dates; never infer causal ranking weights from a single snapshot.

## Negative controls
- 200 canonical self but no demand -> cannot promise impressions.
- Good LCP and all-green Lighthouse but weak intent -> no ranking guarantee.
- Sitemap lists blocked/noindex pages -> not indexing evidence.
- JSON-LD SoftwareApplication present but fake ratings -> violates truthful markup.
- Top article ranks #1 but SERP answer steals clicks -> bad monetization target.
- Competitor DR high -> third-party metric, not Google's secret domain score.

## Other primary sources
Bing Webmaster AI Performance: https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/ (opened 2026-11-23)
IndexNow specification: https://www.indexnow.org/documentation (opened 2026-11-23)
DuckDuckGo result sources: https://duckduckgo.com/duckduckgo-help-pages/results/sources (opened 2026-11-23)
Bing guidelines: https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a (official link verified but JS-only in this environment; content NOT reviewed)
