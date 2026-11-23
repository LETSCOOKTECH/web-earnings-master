# Reliability engineering: serving a million monthly humans versus processing a million simultaneous jobs
**Date:** 2026-11-23. **Owner:** `web-scale-reliability`. No actual million-user load test was performed in this research; this is a reproducible test specification.

## Scale dimensions and capacity math
Create a scale manifest (MAU, visits per MAU, pages per visit, attempts per MAU, local %, input/output bytes, average/p95 CPU/wall time, regions, peak-to-average, device memory and engagement). MAU alone does not derive requests/sec or concurrency.
- Average job start rate = monthly total jobs / (days×86400).
- Peak job rate = average × realistically measured or scenario multiplier.
- Expected inflight jobs ≈ peak arrival rate × service wall duration (Little's Law under stable assumptions); this is NOT a fixed hard capacity at burst overload.
- Sustained CPU cores ≈ peak remote jobs/s × measured core-seconds/job / target utilization. GPUs/memory/codec thread requirements need separate measurement.
- Queues decouple burst but cannot make expensive processing disappear. At arrival >service capacity, queue age grows; admission/reject/defer before user experience or billing collapses.

## Engineering checkpoints (release gates)
| Layer | Observable acceptance / fail |
|---|---|
| Static edge and SEO | Indexed site is separate Search Console proof; synthetic CDN loads, 404/robots, no-JS content, global latency and stable asset hashes |
| Client CPU | Real browser output oracle, acceptable p95, peak RAM and battery on low-end Android and iOS Safari, no hidden uploads |
| Edge API | Dynamic RPS, p95 latency, verified WAF identity, scoped auth, consistent rate/quota, no 128MB isolate breach where Workers used |
| Object storage | Presigned upload grants and expiry, large multipart, checksum/size/type, owner checks, lifecycle/deletion, no public data leaks |
| Job queue | Saturation/lag, TTL, concurrency, duplicate delivery, poison job, retry/dead-letter, idempotent billing |
| CPU/GPU job | Per-codec time, memory, A/V output correctness, repeated inputs, cancellation, sandboxed network and cost per successful output |
| Database/state | Indexed queries, read/write amplification, tenant isolation, consistency/backups/restore; don't load a DB for stateless calculators |
| Security/finance | Abuse, SSRF, signed URL leakage, malware, app-ads invalid traffic, global credit/spend caps and alerts |
| UX | Keyboard/screen readers, upload/cancel/progress/download, meaningful errors, low-RAM fallback; CWV LCP/INP/CLS field p75 |
| Operations | Deploy canary, rollback, SLO dashboards and incident drill for provider outage and leaked data |

## SLO examples for product-specific design (not universal thresholds)
- Public simple calculator accessible during CDN outage with signed offline/PWA caching when feasible; successful calculation output 99.9% in tested browser/device cohort, human completion >= user-defined goal, no hidden server requests.
- Typical interactive image tool: target successful output 99.5% in its declared browser/format/device support set; cancellation works within meaningful timeout; p95 chosen after benchmark.
- Cloud media queue: verified success rate, p95 queue wait and completion stated per file class (e.g. 10MB image vs 2GB video), capped concurrency, clear progress and retry. No promise p95 5s without real codec benchmarks.
- Critical personal data: backups/restores, file isolation and deletion correctness are higher priority than attractive uptime percentages.
Define exact denominator and test environment for each target and allow device-appropriate degradation only if user is clearly informed.

## Three operational tiers
1. **0–10k monthly active users:** statically delivered public pages, browser-only low-cost jobs, correct basic metrics and safe budget. Do not buy Kubernetes for unused workloads.
2. **10k–100k MAU:** run actual p95/mobile device and load benchmarks, watch abusive users, preserve stage/production configs, add cloud fallback only for proven need, alerts for spend/unit economics.
3. **100k–1M+ MAU:** simulate peak mix on legal infrastructure, load shed, isolated compute pool, reliable lifecycle, canary rollbacks, per-tenant quotas, regional performance, provider exit and on-call incident response. Genuine 1M readiness requires an executed comparable peak test.

## Failure injection obligations
- A ZIP bomb/compressed 100KB file yields huge output → early reject by expansion ratio/bytes.
- A user uploads HTML disguised as a PDF → signature/decoder refuses and does not process as HTML.
- A 5GB clip direct-upload interrupted at part 9 → resumable/reclaimable upload and cleanup.
- Edge API sends 429/503 → honest actionable retry/error and no double charge.
- Same cloud job enqueued 3 times → one logical successful result and idempotent billing.
- User closes tab during browser job → graceful abort or reliable cleanup/reopen policy.
- Worker crashes post-output/pre-ack → reconcile output and job state, no duplicate output billing.
- Storage lifecycle fails for sensitive files → alert and manual repair, no misleading privacy claim.
- Bot traffic tries to spend $1000/hour in free API → global/per-tenant budget/abuse gate blocks before queue, public informational pages still crawlable.
- 100× peak causes infinite queue backlog → admission refuses safely, budget and latency guardrail respected.

## Benchmarks
- Baseline static delivery (separately from dynamic API).
- p50, p95, p99 task completion by actual file/codec/device/region.
- Soak for memory leaks on worker/browser; browser lifecycle (load, process, cancel, repeat).
- Load test isolated staging at modeled peak requests and remote job concurrency, using rights-cleared fixtures and no third-party abuse. Restore after test; capture CPU/egress/bill.
- Break system deliberately and verify recovery, idempotency, rollback and data retention.
- Human task testing and independent output correctness. A green GitHub CI structural suite is not a million-user performance certificate.

## Current first-party resource limits and security
- Workers memory 128MB per isolate and explicit CPU/resource limits: https://developers.cloudflare.com/workers/platform/limits/
- Cloudflare Pages Free 20K assets, 25MiB max asset: https://developers.cloudflare.com/pages/platform/limits/
- Cloudflare Queues ops/retries and queue limits: https://developers.cloudflare.com/queues/platform/pricing/ ; https://developers.cloudflare.com/queues/platform/limits/
- OWASP API4:2023 unrestricted resource consumption warns about direct bill amplification: https://api-security.owasp.org/editions/2023/en/0xa4-unrestricted-resource-consumption/
- Google field CWV: https://developers.google.com/search/docs/appearance/core-web-vitals
- Browser OPFS quota/eviction: https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria

## Production evidence manifest
Include build SHA, source price-version, tested deployment and hardware, CPU and network counters, fixture hashes, log/trace query, test cases, critical fail list, SLO sample sizes, cloud bill discrepancy, unknown limitations and reviewer. NEVER call a proposed architecture “fully ready for 1M users” before real load-test evidence.
