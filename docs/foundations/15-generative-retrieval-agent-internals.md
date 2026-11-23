# 15 — Generative search engines, RAG, browser agents and attribution: detailed execution model
Date 2026-11-23. Core distinction: an AI model is not automatically a web crawler, independent search index, ranking engine or executable browser.

## Six retrieval modes
A. Closed-book model answer from learned parameters, no fresh URL necessarily retrieved.
B. RAG: retrieve passages/documents from search index, vectors, enterprise knowledge or provided files; synthesize with source context.
C. Search-tool augmented answer: choose/rewriter queries, search multiple sources, rerank/retrieve evidence and synthesize.
D. Query fan-out/decomposition: multiple dependent queries or vertical sources to answer a compound intent. Google documents this for AI Overviews/AI Mode.
E. User-triggered fetch and browser agent: open sites, inspect DOM/accessibility tree/screenshot, click/submit/download with permissions.
F. Paid/commerce grounding: product feeds, business profiles or advertising may be a separate retrieval/placement path. Don't conflate paid placements and organic citations.

## Open-source reference implementation — NOT claimed provider internals
1. Query received: language, intent, freshness, task decomposition, whether web information necessary.
2. Routing: no tool, web search, approved connector, media search, local results, direct URL fetch.
3. Retrieval candidate generation: lexical/semantic/hybrid, partner search API or internal stored corpus.
4. Filtering: unsafe/duplicate/stale pages, geo, authority estimates, user access and privacy, terms and tool constraints.
5. Source inspection: fetched page/snippet, document parsing, visible text, timestamps, canonical, chunks or multi-page join.
6. Evidence ranking: relevance, coverage, freshness and independent source cross-check; actual vendor selection function may be unpublished.
7. Response synthesis: grounded summary, facts vs uncertainty, citation URL placement, source diversity, follow-up question or requested agent action.
8. User action: reader may click citation, navigate directly, or complete entire task inside AI interface with zero ad pageviews.
9. Feedback: observed citation or error, human referral/task success, provider console metrics, research panel. Never imply self-run prompts are representative population traffic.

## Citation errors and risk
A model can cite an irrelevant URL, incorrectly attach a citation to a claim, hallucinate details while citing real page, miss paywalled or JS-hidden data, present dated content as fresh or omit publisher despite crawler access. Test factual grounding and citation correctness *separately*. A retrieval trace is product-specific, can be inaccessible and is not derivable from public citation HTML alone.

## Google generative Search
Google says standard Search technical and quality principles underpin AI Overviews/Mode. Index and snippet eligibility plus Search generative inclusion settings are prerequisites as documented. Query fan-out may select supporting sources outside one classic top-10 list. Google Search Console 2026 dedicated Search/Discover GenAI reports expose impressions/pages/country/device/date depending on product and report; not a universal per-prompt referral log. Expanded multimodal search data started September 24, 2026. Preferred sources let *users* select publishers; eligible sites may appear highlighted in Top Stories/AI experiences. This is audience preference, not a trick for site owners to force AI citations. Google explicitly rejects mandatory llms.txt/AI-only schema/chunking as Search requirements.
Official: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
https://developers.google.com/search/docs/appearance/ai-features
https://developers.google.com/search/docs/appearance/preferred-sources
https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports
https://developers.google.com/search/blog/2026/09/web-multimodal-in-sc

## ChatGPT/OpenAI
OAI-SearchBot search discovery, GPTBot model training, ChatGPT-User user requests and OAI-AdsBot ad-related fetching have distinct purposes per OpenAI bot guide. OpenAI's API web search tool has separate model/response APIs and should not be equated to every consumer ChatGPT Search path. A verified page fetch or OAI-SearchBot permission is not proof the source was selected or referred humans. Use provider IP lists and current definitions for WAF.
Official: https://developers.openai.com/api/docs/bots ; https://developers.openai.com/api/docs/guides/tools-web-search

## Claude/Anthropic
ClaudeBot model-related, Claude-SearchBot search, Claude-User user fetch; Anthropic hosted browser agents can have separate identification. Claude help documents web search and web fetch separately. Do not claim all user-directed fetches obey the same robots policy as search indexing. Privacy/authorization always server enforced.
Official: https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler ; https://support.claude.com/en/articles/10684626-enable-and-use-web-search

## Perplexity
PerplexityBot search discovery and Perplexity-User user-directed fetch distinct; the latter may generally ignore robots according to provider docs. Published IP ranges allow verification. A cited source may originate from retrieval mechanisms not directly exposed to publisher. Exact citation ranking weights UNKNOWN.
Official: https://docs.perplexity.ai/docs/resources/perplexity-crawlers

## Bing Copilot/Microsoft
Bing Webmaster AI Performance and Citation Share/Topics Portfolio reports show grounding/citations for supported experiences, not a universal score or reliable human referrals. New AI Training and AI Grounding preferences announced Oct 30, 2026 are future-effective Feb 1, 2027; individual page/robots controls vary. Treat IETF AI Preference drafts as DRAFT, not implemented universal standard.
Official: https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/
https://blogs.bing.com/search/2026/6/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare/
https://blogs.bing.com/search/2026/10/your-content-your-choice-clearer-preferences-for-training-and-grounding/

## Other answer systems
Kagi Assistant, Brave AI, Duck.ai, Gemini app, Grok, Meta AI, You.com, Genspark, Le Chat, Phind and regional LLM search products can blend sources and models. To make a vendor-specific claim require current official retrieval docs, user-agent and partner declaration. If absent, say UNKNOWN. Model families and search partners are time-sensitive and may vary by region, subscription and version.

## Browser agents and WebMCP
A browser agent can use screenshot/vision, DOM queries, accessibility tree, direct API or structured tools. Native HTML semantics are baseline: labels, a real button, links, valid form fields, progress/error messages, downloadable output. Chrome WebMCP is an early-preview proposed API with gated guidance; do not require it for SEO or broadly deploy without compatibility/security review. Agent tool calls must enforce origin, authorization, rate limits, input validation and human confirmation for financial/posting/deleting actions. Prompt injection in webpage text must never override system/user instructions. Automation completion may bypass ad pageviews; it can generate other legitimate value but not automatic publisher ad revenue.
Official: https://developer.chrome.com/docs/modern-web-guidance/guides/webmcp/webmcp ; https://developer.chrome.com/docs/ai/webmcp/secure-tools

## Measurement contract
Fields: provider, product/version, time UTC, locale/device/account, prompt, mode, result screenshot, direct citations, indexed page if known, verified bot visits, AI query/impression counts only when official definitions allow, referral landing sessions, task start, verified output, return, consent, ad revenue and cost. Sample pre-registration minimum is a PROJECT experiment design, not vendor requirement. If attribution missing due to apps/privacy, label incomplete; do not treat direct traffic as all organic.

## Citation experimental cases
A1 Exact niche task with own original dataset and public method; compare cited sources and task applicability.
A2 User asks complex multi-subtask question; compare Search vs AI Mode fan-out and zero-click impact.
A3 Site permits OAI-SearchBot but blocks GPTBot; do not infer search exclusion.
A4 Site no llms.txt; do not claim Google AI ineligibility.
A5 Agent sees unlabeled custom upload; compare semantic accessible form.
A6 User requested direct URL to authenticated content; correct agent fails authorization without bypass.
A7 AI citation lands but task output broken; citation not business success.
A8 Citation in one answer then absent on repeat; report variance, no fake stable percentage.
A9 Paid placement and organic link together; separate disclosure and metrics.
A10 Tool-generated robot fetch appears in server log; distinguish verified agent identity from ordinary bot.
