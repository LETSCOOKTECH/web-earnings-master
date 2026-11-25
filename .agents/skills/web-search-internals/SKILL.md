---
name: web-search-internals
description: "Explain and investigate search discovery, crawl scheduling, rendering, canonical selection, indexing, retrieval, ranking and SERP presentation across engines."
---

# web-search-internals

**Trigger:** User asks how Google/Bing/other web search ranks, why a URL is or is not indexed, a search engine architecture audit, search result reverse-engineering, rank #1 questions.

**Read:** docs/foundations/03-search-engine-internals.md, 04-crawlers-robots-control.md, 08-experimental-reverse-engineering.md, 09-source-refresh.md.

**Evidence first:**
1. Define engine, surface, query, country, language, device, period, property access and observable goal. Rank is query-specific; search index details are proprietary.
2. Draw stages URL discovery -> robots -> fetch -> parse/render -> canonical -> index -> retrieval -> ranking -> SERP -> user click. Map each observed symptom to stage.
3. Recheck provider documents and changelogs live (Google Search Central, Bing Webmaster, other index/partner docs); record date and scope.
4. Inspect actual site HTML, headers, robots, internal links and canonical consistency using authorized tools; if GSC/Bing access provided use first-party URL Inspection and index reports. Do not infer indexed state from site: query alone.
5. Sample real SERPs, distinguish ads/AI/vertical/featured widgets and actual user click opportunity. Competitor weakness must be observed on same job.
6. For result #1 questions, explain relevance, task fit, quality, authority, market and uncertainty without invented algorithm weights; report evidence and counterfactual hypothesis separately.
7. Recommend stage-specific repairs and reproduce negative controls; verify post-change outcomes rather than assuming rank gains.

**Output:** stage diagnosis, evidence ledger, SERP snapshot, affected URLs/queries, prioritized experiment and stop conditions.

**Hard failures:** promising #1 with HTML checks; pretending DA/DR are Google rank signals; equating sitemap with indexing; citing unknown private ranker internals as fact; claim every web engine has a separate index.

## Deep operations extension (v2.2)
Read chapters 13 (inverted indexes/BM25/PageRank/hybrid/re-ranking as REFERENCE algorithms), 14 (global provider atlas), 17 (full SEO) and 18 (adversarial suite). For each claim distinguish a published provider mechanism, open-source educational implementation, local experiment, dated external SERP observation and proprietary UNKNOWN. Run node scripts/ir-reference-lab.mjs only to teach retrieval, NEVER to predict Google rank or infer a secret scoring formula. Compare Google, Bing, Brave, DuckDuckGo, Kagi, Yandex, Naver, Baidu, Seznam, Mojeek and provider-dependent AI surfaces only with current original source. The actual outcome funnel remains index -> impression -> click -> verified task -> legitimate revenue.


## V20 public existence before SEO ranking
Search ranking cannot be confirmed on a synthetic canonical with no deployed hostname. For the csv-lab.example.org fixture, the correct state is NOT_DEPLOYED. An indexable HTML local fixture is only eligible in a future REAL hosting context. Do not recommend a sitemap submission or "ranking fixes" until the publisher controls an accessible public HTTPS domain and original useful tool.
For actual search evidence: inspect deployed URL, robots, canonical, HTTP status, WAF and real HTML; use signed-in Search Console URL Inspection to distinguish Google-selected canonical, indexed state and live test eligibility: https://support.google.com/webmasters/answer/9012289 . Sample actual query, country, device and Search surface; distinguish organic links from ads/AI; own keyword data and Google Ads CPC are not ranking weights. Model PageRank/BM25 only as educational references, never proprietary Google algorithm proofs.
**Negative oracle:** a local test can pass with csv-lab.example.org canonical while a public-origin release gate must refuse it. Report EXTERNAL_UNKNOWN unless DNS and host-owner account evidence exists. See docs/quality/real-world-release-contract-v20.md.
