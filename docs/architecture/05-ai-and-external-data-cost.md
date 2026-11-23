# AI/third-party tool costs are not generic website hosting
**Date:** 2026-11-23 · Applies to LLM, embeddings, OCR, translation, speech, scraping, stock/market/weather/dynamic data and API tools.

## 1. The true marginal cost
An AI endpoint may look like a single HTTP request, but underlying costs can be input/output tokens, context cache, audio/video seconds, generated images, embedding vectors, GPU seconds, provider request tier, network transfer, retrieval/search calls, tool orchestration and retries. Backend/edge request prices DO NOT encompass provider inference. Many models change price/tier; never hardcode a model name as the cheapest forever.

An input may call many tools; account for each external request including retries and safety checks. A “free unlimited AI résumé” tool with a $0.01 inference cost per session would incur ~$30,000 across 3M sessions before other costs; the example is **illustrative multiplication, not an actual provider price**.

## 2. Decisions by actual task
- Deterministic operation? Build native rule/calculator instead of sending to LLM.
- Small on-device compatible model? Compare download size, device memory/battery, browser support, quality and privacy against paid API.
- High-value inference? Offer appropriate provider route, BYOK when practical and explicit privacy consent. Consider small-model baseline plus selective large-model fallback when output oracle supports it.
- Common public/cached identical answer? Cache only if data-rights and freshness permit; NEVER share user-private content between users through a cache.
- Need up-to-date facts? Verify permissible official data source and attributable update frequency; don't route stale generated text as a financial/medical fact.
- API key? Keep server-side, rate-limit every tenant, rotate credentials and segregate provider usage. Do not send server keys into static JavaScript.

## 3. Quotas, usage controls and cost bounds
For every operation, define max input/output tokens, max tool hops, max retries, absolute per-task spend, daily and monthly credits, tenant concurrency, provider failover and cancellation. Use server-enforced budgets before expensive downstream calls. Consider asynchronous jobs for long execution; never bill via browser proof alone.

Track actual provider usage (not speculative token heuristics) and actual task completion; include privacy, consent, input sanitization and prompt injection controls for external documents and web pages. Search/AI engines ranking are a separate discovery layer.

## 4. Revenue viability
Cost per successful human task compared to attributable paid or ad revenue. A pageview may have zero ad fill, low CPM, visitor opt-outs or ads not loaded. Do not count bot visits or model source citations as ad impressions. For high-cost tools, hard quotas or paid plan may be necessary. You cannot guarantee business margin from generic traffic-volume estimates.
