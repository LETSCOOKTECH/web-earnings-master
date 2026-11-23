---
name: web-niche-validation
description: "Research and rank website and free-tool niches using exact human search demand, real competitor acquisition, achievable distribution, cost and ad revenue economics."
---

# Niche Validation

**Use when:** Research and rank website and free-tool niches using exact human search demand, real competitor acquisition, achievable distribution, cost and ad revenue economics.

**Workflow contract:** Follow the next steps proportionally to the request. Prefer current primary sources to saved claims. Adapt the sequence when evidence suggests a better route; do not overbuild a minor task. Show exact verification, uncertainty, and safety boundaries. Read `AGENTS.md` and the matching `references/` files when carrying out substantial work.

## Demand-first decision procedure
1. Write the **specific job** a user wants done: input → operation → output → context. Categorize audience, geographies, recurring vs once-off, monetization model and available processing resources.
2. Create seed keywords from plain task language and pain queries; expand via Search Console (existing sites), Keyword Planner, Semrush/Ahrefs (if licensed), Google Trends (relative), autocomplete and community discussions. Retain raw retrieval date. Never confuse Google Ads advertiser Competition with organic difficulty (KD).
3. Country and device cuts: US/UK/CA/AU/IN where relevant, search volume estimate, seasonality, suggested CPC (advertiser interest, **not page RPM**), top SERP domains and features, paid ads, AI results, click opportunity, intent.
4. Investigate **traffic available to new entrants**: relative strength of ranking **pages**, their linking domains, site history, branded vs nonbranded demand, traffic-source mix and actual willingness to use a new utility. A low authority score does not guarantee an easy SERP.
5. Compare complexity and cost: browser-local vs server compute, bandwidth, user data, image/video licensing, country mix, support, abuse. Reconcile unit economics with actual or scenario RPM assumptions clearly labeled.
6. Kill conditions: no measurable user job, no credible acquisition channel, product cannot outperform even on one material task, unacceptable policy/security risk, heavy unbounded operating cost. Consider product advantage and distribution separately.
7. Rank with a weighted rubric chosen for the goal, **not** a universal magic score. Record unknowns and what would reverse the decision. If only modeled public competitor metrics exist, do not call them first-party traffic.
8. Output provisional top three and one validated next experiment; distinguish “large demand” from “obtainable nonbranded organic clicks.”

## Artifacts
`templates/niche-decision.md`, `templates/keyword-research.csv`, `templates/serp-audit.csv`, `references/market-research.md`, `docs/MASTER_CURRICULUM.md`. No implementation approval based on search volume alone.

## V2.3 production evidence contract (audited 2026-11-23)
**Owner:** Obtainable traffic and legitimate user job. **Routing:** web-keyword-intent handles query grouping after niche decision.
**Official source entry points requiring action-time reopening:** https://developers.google.com/search/docs/fundamentals/creating-helpful-content;https://trends.google.com/trends/. A saved link is not confirmation of the current provider rule.
**Evidence needed:** Current market/locale SERP, competitor task oracle, expected human clicks and costs.
**Critical FAIL / UNKNOWN:** No automatic niche GO from keyword volume or third-party authority score.
**Mandatory freshness procedure:** Read docs/foundations/19-provider-source-verification.md and docs/RESEARCH_PROTOCOL.md. Re-open official body, log exact applicable claim, evidence date, announced versus effective status, geography/account and contradiction. Use sources/verified_claims.json only as a dated baseline; source watch hashes are not semantic verification. Record tests/actual results, open blockers and rollback; do not infer live indexing, AI citations or AdSense revenue from local tests.
