# V13 — SEO keyword opportunity research, correct measurement, on-page deployment and falsification

**Agent owners:** web-opportunity-intelligence; web-niche-validation; web-keyword-intent; web-competitor-audit; web-technical-seo; web-traffic-hunter; web-search-analytics. **Sources:** source atlas KEYWORD_RESEARCH + SEARCH_POLICY + SEARCH_APPEARANCE. Google Search spam policy [primary](https://developers.google.com/search/docs/essentials/spam-policies); Google Ads [Keyword Planner](https://support.google.com/google-ads/answer/7337243); owner [GSC API](https://developers.google.com/webmaster-tools/v1/searchanalytics/query). Avoid ad/publisher confusion.

## Before "finding keywords": prove the problem
Collect actual human user job, urgency, input/output, target country/language/device, primary UI, privacy constraints, repeatability, conversion success oracle, current substitute (Google itself, native OS, Excel, AI chat, a competing tool), and differentiation. A phrase with volume but zero genuine unmet need is not an opportunity. Search-volume numbers and keyword difficulty are not cashflows.

## Source types / non-interchangeable units
- **Google Search Console** on an owned property: observed clicks/impressions/CTR/average position with delays/privacy sampling. Not the public market's absolute volume; query/page joins and aggregation can be incomplete or differ. Record page, search type, country, device, dates, anonymized-query limitations; do not add query clicks indiscriminately and claim total site traffic.
- **Google Trends:** relative sampled and normalized 0-100 for a specific term vs topic, region, search type, timeframe and comparison group. Compare *only* under consistent context and inspect seasonality and time-series spikes; 100 is not 100 searches, zero isn't always zero demand.
- **Google Ads Keyword Planner:** advertiser-side historical volume estimates, competitor ad participation, bid ranges and campaign forecasts. They are **not** organic keyword difficulty and **not** Google AdSense page RPM. The service and quota may depend on an account.
- **Semrush/Ahrefs**: separately licensed estimated search volume, proprietary KD and competitor traffic. Report model scope, date/geo, error/uncertainty and terms. Don't imply Google endorsed their difficulty formula or that their traffic is competitor Analytics.
- **Current SERP:** actual locale/device/time visible results, intent, SERP layout and credible products; ads, AI answer, maps, images, video, forum, featured snippet, shopping, People Also Ask, site links. A rank screenshot is point-in-time, geo/personalization dependent and cannot substitute for owned traffic.
- **Human evidence:** original user complaints, surveys/interviews with methodology, real user tasks, support threads and app review audits. Public forums are convenience samples; distinguish pain frequency from a high-engagement one-off anecdote.

## Twelve-step keyword intelligence loop
1. Create 15–30 **unmeasured** seed phrases by action × data type × output × constraint × error × audience, grounded in real task language. Do not buy keyword credits to brainstorm.
2. Group by task, not synonyms: e.g. "remove duplicate CSV rows", "deduplicate CSV file", "CSV duplicate remover" may map to one tested URL; "merge CSV files" is a different output job and requires its own engine and page.
3. For each cluster run bounded permitted SERP review of head/medium/tail queries in selected geo, device and language. Capture actual result URLs, screenshots if genuinely created, presence of ads/AI box, local/walled SERP features and direct-output tool competition.
4. In a permitted Trends export, inspect rising/falling interest, compare like-with-like and keep normalized numbers distinct from search count.
5. If licensed/authorized, inspect keyword volume and advertiser bid units from Planner, modeled difficulty and traffic from Ahrefs/Semrush, and owned GSC. Preserve source timestamps and API costs. If unavailable, mark UNKNOWN (not zero).
6. Verify actual competitor *working outputs* and shortcomings with equal inputs. Compare speed, privacy, unsupported formats, corruption risk, device functionality, ads and support—not homepage marketing claims.
7. Identify "clickability": would the human still visit a tool after a zero-click or AI answer, is the result needed as an actual downloadable artifact, and can the site solve it better than OS or ChatGPT?
8. Score qualitatively on unmet need, differentiated output correctness, repeat use, organic clickable exposure, build/privacy cost, publisher-suitable content and evidence confidence. These are **product priors**, not Google ranking probabilities.
9. Write keyword→user-job→canonical-page map. Every indexable route needs distinct useful output, owner, input fixture, title/intro/H1, limits, examples, error states, related contextual anchors and link source. Reject overlapping or keyword-swap pages.
10. Place language **naturally**: accurate descriptive title; clear primary visible heading (one H1 as a project convention, not a Google rule); first paragraph true task explanation; helpful subheadings, examples, image alt and semantic anchor links. URL path for clarity, not assumed ranking weight. Meta description influences possible snippet, not a guaranteed ranking switch. No meta keywords, fixed density, invisible copy, unrelated city lists or repeated links.
11. Publish the smallest valuable tool set, validate output, no-JS HTML and live HTTP, enable appropriate analytics/consent and read actual owner GSC after indexing. Treat discoverability, indexing, rank, click, task, return and net publisher earnings as separate funnel steps.
12. Iterate on real task abandonment, query/landing page intent mismatch, supported failures, original content needs and defensible referrals. Stop/rescope when tests refute the competitive wedge.

## Keyword-decision record (per cluster)
Fields: job_id, user evidence and sampling caveat, query, query_type=term/topic, geo, language, device, window, query stage, search intent, own/competitor SERP URLs, actual access method/approval, actual export hash if any, metric provenance (Trends normalized / Planner estimate / third-party estimate / own GSC / original problem / hypothesis), metric unit, data freshness, SERP features, competing task pass/fail, AI zero-click risk, distinct output proof, selected canonical page, unknowns and reason-to-reject. Unknown metrics never upgraded to observed through a JSON declaration.

## Competitor/keyword counterexamples
- High CPC does not imply high AdSense RPM; advertiser competition ≠ organic SEO difficulty.
- Long-tail does not mean low competition; useful zero-search-volume tools can win via referrals; high-volume "PDF converter" can be uncompetitive without proprietary improvement.
- 50 query synonyms ≠ 50 indexable pages. Generated template pages with identical operations may violate doorway/scaled content policy.
- Exact-match domain, root-level short URL, arbitrary keywords repeated 5% or meta-keywords tags do not force rank.
- Adding SoftwareApplication JSON-LD alone doesn't produce a rich result, rank or AI citation. Check Google's currently eligible software app guidance and truthful visible facts.
- An AI Mode citation is not a qualified human click; ChatGPT crawler visibility is not a Google ranking signal.

## AdSense adjacency
The *keywords* and *content* are governed by Search spam/content guidelines. AdSense separately evaluates site publisher-content, rights, navigation, ad placement, consent, invalid traffic and account readiness. No universal 20-article/1000-word minimum or magic AdSense keyword density. See 12-publisher-v13.md.

## Anti-fabrication gate
Run scripts/audit-keyword-map.mjs and the V13 provenance evaluator; claim "verified search demand" only after genuine licensed export or owned account/source observed. Agent must state exactly which market metrics remain unobserved and what cheaper experiment would establish demand. Do not collect Google SERPs in automated high-volume ways without permission; see Google [machine-generated traffic policy](https://developers.google.com/search/docs/essentials/spam-policies).
