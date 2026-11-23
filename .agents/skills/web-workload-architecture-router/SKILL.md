---
name: web-workload-architecture-router
description: "Select a verified workload-specific web-tool execution architecture across browser, CDN, edge, containers, GPUs, storage and AI providers under capacity, reliability and cost constraints."
---

# Workload architecture selection — browser, edge, backend or asynchronous

**Trigger:** The user wants any web tool designed, built, compared or scaled, including converter, calculator, PDF, media, OCR, AI, scraper, collaboration, API or millions of users.

**Owner & routing:** Decide execution placement and tradeoffs before choosing frameworks or vendors. Delegate browser implementation to web-browser-compute, server job pipelines to web-conversion-job-platform, cost to web-unit-economics-finops, scale to web-scale-reliability, correctness to web-product-validation.

**Evidence contract:** Date-stamp all cost/provider claims; use official current docs before real deployments. A forecast, architecture diagram or test fixture does not prove 1M MAU capacity or production profitability. Unknown-priced inputs cannot be treated as zero.

## Complete operational workflow
1. Define a measured user job: input format and constraints, output oracle, average/p95 input bytes, actual CPU-seconds and memory peak per job, duration, browser/device support, privacy/regulatory category, latency expectations, failure/retry semantics, user geography and accessibility.
2. Define explicit scale denominator: 1M monthly users is NOT 1M concurrent sessions, 1M jobs or 1M visits. Model MAU -> visits -> pageviews -> jobs -> browser-local fraction -> remote executions; quantify average and 10x/100x peak demand separately.
3. Classify into at least seven workload families: pure deterministic transforms; image/file browser codec; large video/audio/PDF/OCR; data lookups with cache or database; AI/token/GPU inference; scheduled scraping/network fetch; account-based collaborative/stateful workflow. Mixed products route steps individually.
4. Generate candidate topologies: static public HTML+JS local; local Web Workers/WASM/WebCodecs/OPFS; static+light edge API; hybrid with explicit opt-in cloud fallback; direct-to-object-store+queue+bounded CPU container; serverless burst jobs; always-on workers for sustained duty; third-party BYOK/proxy/AI; database-backed state. Avoid choosing a vendor solely from an advertised free tier.
5. Separate the control plane (metadata/auth/admission, <128MB edge budget where relevant) from the data plane (large content/compute). Prefer browser direct upload/download with scoped short-lived presigned storage access rather than proxying gigabyte files through edge functions.
6. Demand economic guardrail by viable job: cloud cost per successful job, p95 total wall time, retention and bandwidth, provider billing units, failure retries and abuse multiplier. Reject if actual marginal cost exceeds funded revenue or budget cap with no degradation mode.
7. Demand security/privacy: a browser-local claim needs a network-transmission test, cloud jobs require signed URLs, malware/zip-bomb limits, CPU/memory/time caps, egress/SSRF restrictions, isolation, deletion evidence and deletion of logs containing sensitive content.
8. Demand real accessibility and hardware evidence: Web Worker fallback, compatibility matrix, low-memory Android and iOS Safari where available, corrupted files and quotas, poor connectivity, cancellation/retry/progress, fair scheduling and output truth.
9. Create architecture decision record (ADR): source of each requirement, at least two realistic alternatives, exact chosen execution path, failure and cost assumptions, vendor exit strategy, tests, observability, feature gates and rollback. A diagram alone is not a deployable design.
10. Run offline admission and unit economics tools. Validate actual representative real file fixtures and mocked failure injection before declaring production readiness. Re-open provider pricing and resource limits at task time and note rate-card dated scope.
11. Use learning-based migration triggers: percentage of jobs forced to cloud, cost/job, local fail rate by device, p95 task success, capacity saturation, queue age and automated abuse. Change topology only after real measurements and independent review.

## Release blockers — FAIL or UNKNOWN
- No universal 'best stack' for every tool category.
- A 1M MAU forecast is not 1M concurrently processing files.
- Edge request functions are not general-purpose high-RAM video transcoders; memory, runtime, body and CPU limits apply.
- Browser local is not always cheaper from users' perspective; CPU, battery, bandwidth and device compatibility are costs.
- Don't imply no server traffic merely because processing code runs in a Web Worker.
- Reject copy-only competitor workflow unless output oracle proves advantage.

## Primary-source URLs (reopen at action time)
- https://developers.cloudflare.com/workers/platform/limits/
- https://developers.cloudflare.com/workers/platform/pricing/
- https://developers.cloudflare.com/r2/objects/upload-objects/
- https://web.dev/case-studies/ai-video-upscaler-case-study
- https://api-security.owasp.org/editions/2023/en/0xa4-unrestricted-resource-consumption/
- https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system

## References and executable evidence
- `docs/architecture/01-workload-placement-decision.md`
- `docs/architecture/02-client-and-media-pipelines.md`
- `scripts/model-tool-economics.mjs`

**Required handoff:** ADR with tradeoffs, real file-output fixture evidence, provider limits, measured p50/p95 behavior where available, budget matrix, proof of cost guardrails and rollback. If untested, explicitly say NOT_RUN; if infrastructure/account unavailable, UNKNOWN_EXTERNAL. No fixed universal vendor winner.
