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
