---
name: web-experiments
description: "Design measurable SEO, product, referral and ad monetization experiments with hypotheses, guardrails, analysis and rollback criteria."
---

# Experiments

**Use when:** Design measurable SEO, product, referral and ad monetization experiments with hypotheses, guardrails, analysis and rollback criteria.

**Workflow contract:** Follow the next steps proportionally to the request. Prefer current primary sources to saved claims. Adapt the sequence when evidence suggests a better route; do not overbuild a minor task. Show exact verification, uncertainty, and safety boundaries. Read `AGENTS.md` and the matching `references/` files when carrying out substantial work.

## Experiment system
1. Identify one specific bottleneck supported by evidence: low CTR, poor task completion, low mobile success, crawler rejection, poor referral conversion, suboptimal ad UX.
2. Hypothesis with measurable mechanism; choose single meaningful change at a time when possible. Define primary metric, denominator, guardrail (policy, UX, CWV, retention), segment and observation window before intervention.
3. For product UI use controlled A/B where technically/ethically feasible; for SEO prefer quasi-experiments with matched pages/periods and known limitations (Google rankings change independently). Avoid systematic search engine manipulation.
4. Do not change dozens of titles, URLs, canonicals and ad layout simultaneously and claim one caused result. Record deploy hashes, exact changed pages and rollbacks.
5. Data checks: bots/seasonality/geo mix, delayed Search Console impressions, zero-click SERP changes, unusual referrer spikes and ad provider fraud filters.
6. Results: effect with uncertainty, cost, what to keep/roll back, open follow-ups; no invented significance or causality.

## Deliverable
`templates/growth-experiment.md`, baseline/after exports and decision record. Every experiment should advance real human value, not just crawler impression count.

## V2.3 production evidence contract (audited 2026-11-23)
**Owner:** Controlled product/SEO intervention analysis. **Routing:** web-search-analytics diagnoses; this owns intervention.
**Official source entry points requiring action-time reopening:** https://developers.google.com/search/docs/monitor-debug/search-console-start. A saved link is not confirmation of the current provider rule.
**Evidence needed:** Preregistered hypothesis, baseline, denominators, guardrails, actual results and rollback.
**Critical FAIL / UNKNOWN:** No posthoc claim a ranking change was caused by confounded edits.
**Mandatory freshness procedure:** Read docs/foundations/19-provider-source-verification.md and docs/RESEARCH_PROTOCOL.md. Re-open official body, log exact applicable claim, evidence date, announced versus effective status, geography/account and contradiction. Use sources/verified_claims.json only as a dated baseline; source watch hashes are not semantic verification. Record tests/actual results, open blockers and rollback; do not infer live indexing, AI citations or AdSense revenue from local tests.
