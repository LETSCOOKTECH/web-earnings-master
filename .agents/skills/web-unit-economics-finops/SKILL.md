---
name: web-unit-economics-finops
description: "Model and control per-successful-tool-task costs, cloud pricing, storage, egress, retries, ad revenue, budget caps and 1M-user scenarios with dated official sources and executable estimators."
---

# FinOps — verified cost per useful task, not cheapest advertised tier

**Trigger:** Hosting costs, free tiers, one million users, Cloudflare Workers/R2/D1, AWS Lambda, ad revenue, compute/egress unit cost, AI tokens, budget ceilings or abuse-spend scenarios.

**Owner & routing:** Own model inputs, unit economics, source versioning, uncertainty and budgets. web-workload-architecture-router decides placement, web-scale-reliability validates capacity, web-portfolio-growth owns commercial decisions.

**Evidence contract:** Date-stamp all cost/provider claims; use official current docs before real deployments. A forecast, architecture diagram or test fixture does not prove 1M MAU capacity or production profitability. Unknown-priced inputs cannot be treated as zero.

## Complete operational workflow
1. Normalize metrics: monthly active humans versus sessions, pageviews, static requests, actual job starts, successful jobs, invalid abuse attempts, browser local share, cloud fallback, input/output MB, retained GB-months, queue operations, and AI tokens.
2. Record scenario P50/expected/P95/stress with per-user job distribution; distinguish peak traffic factor from average. Never infer concurrency from MAU alone; compute average jobs/s, peak jobs/s, required CPU cores and queue lag using realistic wall time/CPU consumption.
3. Reopen current first-party pricing and effective dates. Version the rate card for Workers request and CPU-ms pricing, R2 storage/Class A/B operations, Queues and D1; never silently reuse 2026 cost numbers next year or assume all accounts share free tiers.
4. Use the executable `scripts/model-tool-economics.mjs` with a scenario and dated rates. Calculate paid edge requests separately from free static asset delivery; do not charge every static file as a Worker invocation or assume all dynamic requests have zero cost.
5. Budget direct browser processing as zero *server conversion CPU*, not free overall. Price CDN/static delivery when vendor charges, shared support/engineering/development, storage, analytics, licensing, backups, payment fees and privacy compliance.
6. For R2 count average GB-month and read/write operations, billable-unit rounding and minimum storage duration where relevant. Direct R2 egress is currently free, but worker/compute downloads, external transfer, source-provider and downstream CDN charges may differ.
7. For cloud jobs, use measured CPU-seconds and a separately verified user-supplied per-core-hour (or GPU-sec) price, utilization/overhead factor, concurrency peaks, queue and object operations. Avoid pricing CPU-heavy work as if a 5-ms edge request handled it.
8. For LLM tools, record tokens in/out, context/cache, model provider per-million-token prices, output variability, retries and policy. When rates are missing, label AI spend UNKNOWN and fail any decision relying on inferred zero.
9. Calculate average cost per attempted and completed task, gross profit per task, break-even ads RPM or paid tier when actual revenue exists; never equate CPC, keyword traffic value or model popularity to AdSense income.
10. Set per-user and per-anonymous-IP policy budgets, global hourly/daily/monthly spend limits, throttling at projected high burn, hard stops or paid-only for high-cost workflows and alarms based on marginal cost, not total requests alone.
11. Run sensitivity analysis on 10x/100x abuse/job spikes, cloud fallback increases, memory/latency failure retries, cache miss and AI token inflation. Flag hard failures before production and compare alternative vendors/regions only using same underlying workload and billing granularity.
12. Monitor actual daily billing and telemetry versus estimates; label differences due to measured samples, outdated rates, tax/account contract and traffic classification, then change models via dated PR.

## Release blockers — FAIL or UNKNOWN
- One million users does not guarantee affordable hosting when a single heavy task consumes minutes of CPU.
- A rate-card calculator is illustrative unless it matches actual account, taxes, commercial discounts and current provider terms.
- Workers and R2 have different meters; Cloudflare's R2 egress-free claim is not a guarantee that compute or upstream transfers are free.
- Do not report $0 for missing GPU, AI, hosting, support or legal expense: mark unpriced external line items UNKNOWN.
- Do not predict ad RPM without first-party publisher records or explicitly declared hypothetical scenarios.

## Primary-source URLs (reopen at action time)
- https://developers.cloudflare.com/workers/platform/pricing/
- https://developers.cloudflare.com/r2/pricing/
- https://developers.cloudflare.com/queues/platform/pricing/
- https://developers.cloudflare.com/d1/platform/pricing/
- https://aws.amazon.com/lambda/pricing/
- https://www.cloudflare.com/plans/

## References and executable evidence
- `docs/architecture/03-million-user-economics.md`
- `sources/architecture_rate_card_2026-11-23.json`
- `scripts/model-tool-economics.mjs`
- `templates/architecture/scenarios/`

**Required handoff:** ADR with tradeoffs, real file-output fixture evidence, provider limits, measured p50/p95 behavior where available, budget matrix, proof of cost guardrails and rollback. If untested, explicitly say NOT_RUN; if infrastructure/account unavailable, UNKNOWN_EXTERNAL. No fixed universal vendor winner.
