---
name: web-scale-reliability
description: "Verify websites and asynchronous utilities under million-user demand using queueing, peak concurrency, capacity, failover, load testing, privacy, security and real task SLO evidence."
---

# Scale and resilience — from 100 to 1M monthly users without false guarantees

**Trigger:** Scaling web tools to high volume, 1M MAU, high concurrency, SLO, queues, autoscaling, p95 performance, multi-region, DoS, cost spikes and incident recovery.

**Owner & routing:** Own capacity evidence, load patterns, failure modes and production release gates. web-unit-economics-finops owns spend; web-conversion-job-platform owns backend mechanics; web-product-validation owns output correctness.

**Evidence contract:** Date-stamp all cost/provider claims; use official current docs before real deployments. A forecast, architecture diagram or test fixture does not prove 1M MAU capacity or production profitability. Unknown-priced inputs cannot be treated as zero.

## Complete operational workflow
1. Define scale precisely: MAU, sessions, requests, real tasks, task sizes, geographic time zones, peak multiplier, automated/bot traffic and work distribution. A million MAU alone yields no service-capacity certificate.
2. Create architecture traffic ledger: edge/static asset requests, dynamic control-plane RPS, queue ingress, object operations, worker CPU-seconds, DB reads/writes, actual transfer bytes and per-tenant constraints.
3. Estimate peak: average jobs per second = monthly attempts/(days×86400); peak target multiplies by observed or scenario factor. Peak active jobs approximated by arrival rate×p95 wall time; sustained required cores = arrival rate×CPU-seconds/utilization. Use p95 not just average in capacity plan.
4. Set SLOs appropriate to workload: task success, output integrity, time-to-first-usable action, p95 processing/queue age, API availability, errors, content privacy deletion, charge limits and reasonable slow-device degradation.
5. Run end-to-end realistic load tests separately for static CDN, control API, direct object uploads, queue dispatch, isolated CPU jobs, downloads and retention. No synthetic edge-request benchmark certifies entire file-conversion pipeline.
6. Inject failures: worker crash mid-file, provider outage, cold start, database latency, queue backlog, object-storage 429, low memory, stalled browser, connectivity drop, expired URLs, duplicate jobs, regional WAF mistaken bot block and attack patterns.
7. Enforce load shedding and admission: per-user budgets, concurrency permits, token bucket with weighted CPU budgets, active processing leases, queued job deadline, autoscale max, priority for human requests, and a documented intentional 429/503 UX rather than bankruptcy.
8. Monitor queue latency, worker CPU seconds, real peak memory, job cancellation/retry rates, CDN hit rate, LCP/INP/CLS field observations, cost per task, actual provider bills, and endpoint/codec output error rates.
9. Deploy canary with feature flags and verified rollback; test migrations, idempotency, backup/restore, data lifecycle and security controls. Static origin failures and queue poison messages have different operational runbooks.
10. Test million-user *workload equivalent* in legal isolated staging or shadow mode, with transparent generator assumptions and no denial-of-service against third parties. Run browser artifact correctness and low-end device compatibility independently.
11. Accept production only with reproducible measured results, owner sign-off for budget risk and explicit remaining unknowns. A passing unit-test suite cannot certify live 1M-user capacity.

## Release blockers — FAIL or UNKNOWN
- MAU is not RPS or concurrency; declare traffic intensity first.
- Don't run unauthorized high-volume load tests against third-party sites.
- You cannot validate 1M capacity from theoretical formulas or mocked fixtures alone.
- Spending alerts without hard caps/quotas may fail to prevent a sudden bill.
- A static page uptime score does not certify cloud conversion task success.

## Primary-source URLs (reopen at action time)
- https://developers.cloudflare.com/workers/platform/limits/
- https://developers.cloudflare.com/queues/platform/limits/
- https://developers.cloudflare.com/pages/platform/limits/
- https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria
- https://api-security.owasp.org/editions/2023/en/0xa4-unrestricted-resource-consumption/
- https://developers.google.com/search/docs/appearance/core-web-vitals

## References and executable evidence
- `docs/architecture/04-scale-and-product-quality.md`
- `docs/architecture/03-million-user-economics.md`
- `scripts/model-tool-economics.mjs`

**Required handoff:** ADR with tradeoffs, real file-output fixture evidence, provider limits, measured p50/p95 behavior where available, budget matrix, proof of cost guardrails and rollback. If untested, explicitly say NOT_RUN; if infrastructure/account unavailable, UNKNOWN_EXTERNAL. No fixed universal vendor winner.

## V26 — Trusted upstream method integration

Read `docs/skills/2026-11-25-official-upstream-v26.md` and `sources/official-skill-integration-v26.json` before applying an upstream method. Verify exact upstream file provenance/rights and the relevance to the current stack. Do not run copied third-party scripts.

- `cloudflare-router`: Choose platform based on constraints, version-specific docs, do not force Cloudflare.

**Role-specific test oracle:** Check Cloudflare's currently published limits for the specific contract/plan before designing retries, CPU and queue concurrency. Run adversarial load with p95/p99, rate limits, idempotency, dead-letter recovery, budget alerts and real account quotas. Local browser lab cannot certify one million real users.

Check `node scripts/check-official-skill-integration-v26.mjs`, existing domain tests and real external evidence. Missing field data remains `NOT_RUN`; generated local source, SEO score and a source bibliography are not business certification.
