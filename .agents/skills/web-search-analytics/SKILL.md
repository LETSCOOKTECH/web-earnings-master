---
name: web-search-analytics
description: "Diagnose first-party Google Search Console, Google Trends, Semrush/Ahrefs, Bing AI, bot logs, analytics, tool funnels and ad revenue without metric confusion."
---

# Search Analytics

**Use when:** Diagnose first-party Google Search Console, Google Trends, Semrush/Ahrefs, Bing AI, bot logs, analytics, tool funnels and ad revenue without metric confusion.

**Workflow contract:** Follow the next steps proportionally to the request. Prefer current primary sources to saved claims. Adapt the sequence when evidence suggests a better route; do not overbuild a minor task. Show exact verification, uncertainty, and safety boundaries. Read `AGENTS.md` and the matching `references/` files when carrying out substantial work.

## Measurement definitions
1. Define unit of observation: query × country × device × page × day for Search Console, session/pageview for analytics, completion event for tool, verified unique human for acquisition, provider-specific citation for AI and earnings per thousand pageviews for ad RPM.
2. GSC: indexation, impressions/clicks/CTR/average position; branded vs nonbranded by query; canonical page and query grouping. Account for privacy thresholds, anonymized queries, delayed reports and SERP feature changes.
3. Google Trends: normalized relative series; cannot infer exact searches or sum its scores. Semrush/Ahrefs traffic and KD are modeled estimates and may not match first-party Google data. Never treat Keyword Planner advertiser competition as KD.
4. Bing: indexing, queries, clicks, AI citation/grounding/topic reports when available. AI source appearance is not click/referral/authority. ChatGPT/Claude/Perplexity referral values are separate and may undercount.
5. Product events: tool_view, tool_start, input_accepted, processing_success, processing_failure, download_ready, download_triggered, returning_user when privacy-preserving; avoid logging filenames or file contents.
6. Revenue: pageviews, effective page RPM, fill, viewability, geo/device/consent mix, invalid traffic adjustments, adblock, script costs, hosting bandwidth. Do not infer AdSense yield from search-ad CPC or competitor visits.
7. Investigation rubric: not indexed → crawl/index; indexed no impressions → demand/relevance; impressions no clicks → SERP/intent/CTR; clicks no starts → UX; starts no finish → tool reliability; finishes no revenue → ad mix/economics.
8. For every claimed improvement use pre/post date, baseline, possible confounders (seasonality, algorithm updates, brand campaigns), and test design where feasible.

## Outputs
`templates/weekly-search-traffic-review.md`, `templates/analytics-event-taxonomy.csv`, `templates/portfolio-weekly.csv`. Prefer first-party results with caveats.

## V2.3 production evidence contract (audited 2026-11-23)
**Owner:** Grounded GSC/referrer/product/revenue metrics. **Routing:** web-experiments owns controlled interventions, not initial diagnosis.
**Official source entry points requiring action-time reopening:** https://developers.google.com/search/docs/monitor-debug/identify-google-search-traffic;https://developers.google.com/search/docs/monitor-debug/search-console-start. A saved link is not confirmation of the current provider rule.
**Evidence needed:** Owned property permissions, exact source units, privacy, referrer and verified human funnel.
**Critical FAIL / UNKNOWN:** Google Referer does not contain keyword; AI citation isn't pageview; CPC isn't ad RPM.
**Mandatory freshness procedure:** Read docs/foundations/19-provider-source-verification.md and docs/RESEARCH_PROTOCOL.md. Re-open official body, log exact applicable claim, evidence date, announced versus effective status, geography/account and contradiction. Use sources/verified_claims.json only as a dated baseline; source watch hashes are not semantic verification. Record tests/actual results, open blockers and rollback; do not infer live indexing, AI citations or AdSense revenue from local tests.

## Baidu AI traffic analysis source confirmation (2026-11-23)
Baidu's primary public platform at https://ziyuan.baidu.com/doc and AI traffic entry at https://ziyuan.baidu.com/aiflow/index were successfully opened: the interface displays `AI流量分析` and requires a site addition/verification to access full data. Do not claim these AI analytics are Google GenAI GSC counts, Bing citations, ChatGPT referrals or human visits; dashboard definitions remain UNKNOWN without owner account and current help. See claim BAIDU-AI-FLOW-PORTAL in sources/verified_claims.json and reopen the current Chinese-language original at use time.


## Execution assurance and adversarial verification (V10–V19)
**V10 measurement addendum:** Report each funnel surface separately: discovered, crawled, indexed, ranked, AI-cited, clicked, session, correct task completion and paid ad event. Verify first-party scope, timestamp, granularity and query anonymity; compare at least one disconfirming segment. Do not silently attribute missing referrers to ChatGPT, infer revenue from CPC or present provider modeled estimates as account exports.
**Evidence enforcement:** Review `docs/execution-assurance/README.md`; run `node scripts/check-execution-assurance.mjs --file <task-receipt.json>` for consequential work. Local schema validity is not source authenticity, external approval or production readiness.
