# 08 — Black-box reverse engineering of search, AI retrieval and human traffic

## Objective and legal boundary
Learn from published specs, official Search Console/Bing dashboards, observed SERPs, content behavior, permitted crawler logs, open-source search engines and intentionally owned test pages. Do not try to access nonpublic search-company internals, evade rate limits, fake clicks, violate robots/terms, poison models or manipulate third-party data. A black-box experiment can establish a local correlation, not reveal every internal ranking signal.

## Observation versus mechanism
Observations: a URL appeared, bot fetched at time, selected canonical differs, ChatGPT cited a result, outbound click occurred, task succeeded. Mechanism inferences: external links helped or text layout improved retrieval, site quality dropped, bot chose a specific ranking model. Inferences need tests with competing explanations. Google public docs are authoritative for declared policy but do not expose precise ranking weights.

## Minimum reproducible research record
Research question | pre-registered hypothesis | surface/provider/version | geography/device/language | fixed sample selection | current official source URLs with read date | primary observable data | screenshots/logs/redactions | comparator/control | confounders | uncertainty | decision | rollback. Keep timestamps timezone-aware; check if a vendor announcement means launch, beta or future rollout.

## Five core experiment families
1. Indexing/robots: own staging fixtures with robots groups, canonical conflicts, noindex, server 404 versus soft 404, hydration-only text, CDN 403. First validate local parser/HTTP, then use URL Inspection after deployment. "Bot allowed" is not "URL indexed".
2. Ranking/SERP: select user-job and keyword variants BEFORE examining outcomes; sample by device/locale/time; record top ten, feature types and actual page utility. Don't assert changes caused a rank shift when algorithm/competition changed too.
3. AI citations: predefine 25 prompts/country and multiple response samples/engine/date; store citation URL and whether it resolves to our page; compare rival source eligibility and reputation; mark unknown retrieval traces. Do not treat answer appearances as human visits.
4. Product superiority: run same licensed fixtures on own and two rivals; define correctness oracle (bytes/dimensions/MIME, machine-observable metrics), median latency, task steps, failure recovery, low-end device and accessibility. Avoid publishing misleading benchmarks from cherry-picked inputs.
5. Monetization: only after legitimate provider approval/consent; compare real eligible human sessions, ad viewability, completed tasks and actual revenue/cost by matched cohorts. No self-click, impression inflation or coercive ad placement.

## How to avoid common research mistakes
- Selection bias: comparing a competitor's top pages with our first prototype.
- Reverse causality: sites with backlinks rank high so "buy more links" is not a valid causal deduction.
- Simpson's paradox: aggregate CTR rises while mobile/US CTR falls; segment country/device/branded/intent.
- Confounding: update date aligns with competitor launch or Google's core update.
- Survivor bias: high-revenue success stories omit thousands of failures.
- Unobservable denominator: AI referrals not fully attributed; GSC hides some low-volume queries.
- Moving system: AI model output, citations and index snapshots vary with time and personalization.
- False precision: DR/KD/CPC estimates are not algorithm weights or own RPM.

## Evidence rubric
E0 assertion -> UNKNOWN.
E1 URL/search result lead -> LOCATED, NOT VERIFIED.
E2 original official policy/body checked and scoped -> PROVIDER DOCUMENTED.
E3 independent reproduction of relevant mechanics on controlled fixture -> REPRODUCED LOCALLY.
E4 own live site/search-console/bot logs + task metrics -> PRODUCTION OBSERVED.
E5 pre-registered repeated study with controls -> STRONG SITE-SPECIFIC EVIDENCE.
Avoid promoting E2 to E4 or E1 to E2.

## Lab suite with expected falsification
- robots wildcard allows / but specific OAI-SearchBot disallows /: OpenAI search eligibility likely blocked; confirm provider policy without asserting all crawls stopped.
- Fake Googlebot UA hits page: cannot be called verified Google.
- 200 HTML includes noindex: cannot infer index eligibility despite 200.
- Correct favicon + 90 Lighthouse: cannot infer search top-1.
- Google AI answer cites one site in 3 trials: cannot infer broad citation share or traffic.
- Site has Semrush million estimated visits: cannot infer its organic traffic share or attainable rank.
- Apple App Store listing metadata optimized: cannot infer corresponding website ranks.

## Reports
Write one reproducible artifact per study, with command inputs, raw snippets/screenshots redacted, method, decision, failure of the initial hypothesis (if any), and explicit next test. Use templates/foundation-research-case.md. Good research says "UNKNOWN" when that is the only defensible result.

## Official methodological boundaries and starting documents
Google Search fundamentals: https://developers.google.com/search/docs/fundamentals/how-search-works
Google ranking systems: https://developers.google.com/search/docs/appearance/ranking-systems-guide
OpenAI crawler identity and purpose: https://developers.openai.com/api/docs/bots
RFC robots exclusion: https://www.rfc-editor.org/rfc/rfc9309.html
