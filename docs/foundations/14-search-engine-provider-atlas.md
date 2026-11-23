# 14 — Worldwide search engine/provider atlas (current evidence, dated 2026-11-23)

## Classification rule
A company's brand is NOT an index architecture. For each separate surface, determine whether it (a) crawls/indexes independently, (b) blends a partner index, (c) operates specialist vertical/local listings, (d) grounds an AI answer in an index/connector, or (e) runs a user-directed browser. Multiple categories can coexist. Do not infer all regions use one partner. Search rank weights are unpublished.

## Official provider evidence matrix

### Google Search / Images / Video / Discover / AI Mode
Google documents crawl/index/serving, ranking systems and Googlebot. Media and vertical eligibility can differ. AI Overviews/Mode use core Search systems and can fan out queries. Search Console's generative AI report differs from ordinary impressions and from verified human referral. Google-Extended affects defined AI uses rather than ordinary Search crawl; newer Google-Agent and user-triggered fetcher documents are separate from classic Googlebot.
Sources: https://developers.google.com/search/docs/fundamentals/how-search-works ; https://developers.google.com/search/docs/appearance/ranking-systems-guide ; https://developers.google.com/search/docs/appearance/ai-features ; https://developers.google.com/crawling/docs/crawlers-fetchers/overview-google-crawlers .
Measurement: owned Search Console data, URL Inspection, official generative reports, server logs and task outcomes. No guaranteed index or #1.

### Microsoft Bing / Bing Images / Copilot
Bingbot and Bing Webmaster Tools have own crawl/index/ranking and AI grounding. IndexNow notifies participating engines, but indexing is discretionary. Feb 2026 AI Performance report and Oct 2026 Topics Portfolio enable citation observations. On Oct 30, 2026, Microsoft announced separate AI training and grounding preferences with future effective dates beginning Feb 1, 2027. Do not deploy future rules as if currently active or equate citation share with clicks.
Sources: https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a ; https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/ ; https://blogs.bing.com/webmaster/2026/10/introducing-topics-portfolio-beta-in-ai-performance/ ; https://blogs.bing.com/search/2026/10/your-content-your-choice-clearer-preferences-for-training-and-grounding/ .
Measurement: Bing Webmaster and actual Bing-referral/task outcome. Direct full guidelines body was inaccessible in this session, so treat search snippets as limited evidence.

### DuckDuckGo / Duck.ai
DuckDuckGo publishes a multi-source architecture: Instant Answers and DuckDuckBot/own indexes, while many traditional web links/images are largely sourced from Bing. Its AI product sourcing may differ; no promise that being in Bing guarantees every DDG appearance.
Source: https://duckduckgo.com/duckduckgo-help-pages/results/sources .
Measure separate DDG referrals; do not invent a dedicated rank score.

### Brave Search / Brave AI
Brave maintains independent search index. Official Brave crawler documentation says it intentionally DOES NOT advertise a differentiated UA and does not crawl pages blocked from Googlebot. Opt-in privacy-preserving Web Discovery Project contributes discovery signals; it is not a secret ranking lever. Brave AI citations or answer behavior must be separately observed.
Sources: https://safe.search.brave.com/help/brave-search-crawler ; https://search.brave.com/help/brave-search-index-right-to-be-forgotten .

### Kagi
Kagi documents its own Teclis web index and TinyGem news index *plus* other sources used per query. Thus neither "Kagi just Bing" nor "Kagi is entirely independent" explains every surface. Kagi Research Agents have their own search/tool workflow; do not equate them with traditional Kagi organic SERP.
Source: https://help.kagi.com/kagi/search-details/search-sources.html .
Measure using predefined country/language/queries and track actual site visits where referral available.

### Mojeek
Mojeek publishes independent crawling/indexing with MojeekBot and official bot rules. Do not assume nonstandard crawl-delay works; check official documentation.
Source: https://www.mojeek.com/bot.html .
Result: an independent index has distinct crawl evidence from Google/Bing.

### Yandex
Yandex Webmaster documents URL discovery, indexing and ranking. Separate regional/language interpretation and site security/violation reports. Submit site and track Webmaster where audience justifies; no generic English-language Google plan guarantees Yandex performance.
Sources: https://yandex.com/support/webmaster/en/yandex-indexing/site-indexing ; https://yandex.com/support/webmaster/en/yandex-indexing/rank .

### Baidu
Baidu Search Resource Platform provides official Chinese-language search indexing, site quality, URL submission and crawling tools. Its published rapid submission explicitly does NOT guarantee inclusion or impressions. Chinese-market language/hosting/regulatory rules require independently verified planning.
Sources: https://ziyuan.baidu.com/doc ; https://ziyuan.baidu.com/dailysubmit/index .
Translation review remains required before declaring detailed policy.

### Naver
Naver Search Advisor documents official Korean-language technical SEO, robots.txt, canonical URLs and reports. Treat its Korean docs as source; do not infer every Google schema/ranking rule applies to Naver.
Sources: https://searchadvisor.naver.com/guide/seo-help ; https://searchadvisor.naver.com/guide/seo-basic-robots .
Detailed translation and account verification required.

### Seznam
Seznam engineering blog documents fulltext indexer-worker, inversion and quality-sensitive index feeding; historical architecture docs are explanatory, NOT proof every 2026 production subsystem is unchanged. SeznamBot is a crawler in Czech ecosystem; test real locale and site.
Sources: https://blog.seznam.cz/en/fulltext-technology/ ; https://blog.seznam.cz/2023/09/vylepsili-jsme-stahovani-stranek-je-stejne-rychle-a-pritom-setrnejsi-k-webum/ .

### Apple Spotlight / Siri / intelligence
Apple documents Applebot and Applebot-Extended for some AI model uses, separately from search. Official page was discoverable in search results but returned HTTP 429 to direct inspection; preserve as limited verification, not a full live policy read. Individual Siri and Spotlight grounding paths are product-specific/UNKNOWN.
Source: https://support.apple.com/en-in/119829 .

### Yahoo, Ecosia and partner search
Partnerships may vary by country/experience and time; current authoritative 2026 operator documentation was not fully verified in this pass. Status: UNKNOWN on exact current index suppliers, so do not claim a definitive provider matrix. Establish the exact product/locale and reopen current vendor help before adding a bot rule.

### Emerging AI search and assistants
ChatGPT Search, Claude web search, Perplexity, Gemini app, Grok, Meta AI, You.com, Phind, Mistral Le Chat, Genspark, Kagi assistant and region-specific products may combine model knowledge, own/partner search, direct browsing and private connectors. Search crawler permission is not equivalent to model training permission or citation guarantee; where dedicated bot or retrieval partner is undocumented, status UNKNOWN.
OpenAI https://developers.openai.com/api/docs/bots
Anthropic https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
Perplexity https://docs.perplexity.ai/docs/resources/perplexity-crawlers
Google https://developers.google.com/search/docs/appearance/ai-features

### App-store and vertical search
Google Play and Apple App Store have app-specific discovery and conversion. An ordinary web utility has no automatic ASO. Google Maps/Business Profile, Google Merchant Center, YouTube, Amazon product search, GitHub code search and specialty engines each use distinct datasets, policies and metadata. Do not attribute their ranks to general web SEO.
Source: https://developer.apple.com/app-store/search/ ; https://support.google.com/googleplay/android-developer/answer/4448378 .

## Practical research contract for ANY provider
Choose exact surface, actual country/language/device, search index sourcing and period; obtain official docs; record crawler/user agent only if genuinely published, robots/index controls, webmaster submission, URL inspection, paid/organic/AI distinction, observed results and referrals. If no provider evidence, say UNKNOWN and test on owned property. Cite current provider documents, not partner speculation.

## False assumptions to flag
All engines independently own a web index; DuckDuckGo's links are exclusively Bing; Brave uses distinctive Bravebot token; Yahoo has a globally fixed index supplier; model training bot governs Search inclusion; AI citation is an ad-eligible human visit; generic .com gives a universal rank boost; an IndexNow submission guarantees indexing; ASO improves an unpublished web-only tool.
