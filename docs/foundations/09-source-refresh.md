# 09 — Mandatory current-source verification and contradiction management

## Scope
Provider behavior is versioned. Search, AI, crawlers, WAF, robots, app-store rules, ad networks and legal consent change without notice. The source registry is a *navigation index*, never a license to claim all URL content was read. A hyperlink health check is only a diagnostic for reachability, not policy verification.

## Mandatory source recheck algorithm
1. Identify exact engineering/policy claim; affected product, engine, country, device, account, jurisdiction, model and feature.
2. Inspect sources/foundation_sources.json and existing sources/official_sources.json. Choose governing provider first-party page; open page body *now*, not just cached snippet. Check latest changelog/release notes and effective rollout dates.
3. Capture UTC checked time, URL (after redirects), exact limited relevant passage/section, published/last updated date if explicitly present (otherwise null/UNKNOWN), country/feature/account scope, whether it is policy, recommendation, preview or experiment.
4. Find relevant counterexamples/contradictory provider guidance; prefer current binding rules for applicable account. Mark revisions explicitly (old claim -> new evidence -> resulting change).
5. If current page is JS-only/blocked or provider does not publish mechanism, set VERIFIED=FALSE and UNKNOWN/LEAD, not an implied confirmation. If safety/compliance impact is material, pause that part of deployment and ask for actual dashboard/contract; continue unrelated safe tasks.
6. Separate source validity (reachable URL) from semantic validity (actually read current rule), and local tests from provider/account observation.
7. Write dated claim row and relevant changelog; update affected skill/reference *only with documented scope*. For behavior that affects code, add a regression fixture. Do not mass rewrite all docs just because one link redirects.
8. On next material decision, repeat. A 14/30-day review interval is an internal scheduling choice, not an official provider freshness guarantee.

## Recommended continuous refresh
Run local "node scripts/check-foundation-sources.mjs" to validate registry structure (offline).
Run "node scripts/check-foundation-sources.mjs --live --limit 20" to inspect HTTP reachability of official URLs and emit a dated JSON output. It does NOT confirm page-body meaning, policy, crawler rules, robots legality, ranking effects or account rollout. Failed network requests remain UNKNOWN until retried manually, not evidence of removed rules.
For active providers schedule review of changelogs; when a change materially affects operations, require human review/semantic summary before changing live WAF, crawl rules, ads or account settings. Save change date and tested scope.

## Claim metadata schema
id; proposition; provider; product/surface; source_url; inspected_at_utc; publisher_date; actual_text_scope; geography; account_scope; evidence_level(E0-E5); policy_or_recommendation; counterevidence; applicability; conclusion; test; rollback; recheck_due; reviewer. The initial manifest's checked_on applies only to the URL body explicitly read this session and does not grant perpetual freshness.

## Conflict priorities
Applicable provider policy/contract > current provider implementation docs > official change notes > first-party site analytics for our own site-specific outcome > reproducible independent studies > SEO vendor models > anecdotes/videos. An actual first-party site finding can contradict a generalization without disproving the provider rule; show both and explain scope. A cached snippet is a lead, never verification of a 2026 feature.

## Specific fast-moving watchlist
Google Search Central updates, AI optimization/AI Overviews/Mode controls, GSC GenAI metrics and API schema, verified crawler list and Google-Extended; OpenAI bots & published JSON IP; Anthropic bot and browser docs; Perplexity crawler IP; Bing Webmaster AI Performance and IndexNow; Applebot policies; Chrome WebMCP proposal/status; Google Play and Apple ASO store policies; ad/consent legal changes. Each has different update and rollout dates. Never assume all products have a distinct crawler or Search Console equivalent.

## Regression traps
- Official source 200 but its meaning changed: HTTP check PASS, semantic recheck REQUIRED.
- Blog snippet says globally rolled out; actual property has no dashboard: source documented, account availability UNKNOWN.
- Updated crawler regex but old IP list still whitelisted: security defect.
- New prompt-based metric has no user sessions: do not report ad revenue.
- Google says no special llms.txt: don't create an "AI rank file" requirement in another skill.

## Main policy references
https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports
https://developers.google.com/search/blog/2026/11/search-analytics-api-update
https://developers.openai.com/api/docs/bots
https://docs.perplexity.ai/docs/resources/perplexity-crawlers
https://www.rfc-editor.org/rfc/rfc9309.html
Also follow docs/RESEARCH_PROTOCOL.md for cross-portfolio rules.
