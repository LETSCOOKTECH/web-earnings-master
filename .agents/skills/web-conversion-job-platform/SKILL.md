---
name: web-conversion-job-platform
description: "Design safe asynchronous heavy tool backends for file conversion, video, OCR, AI and large batches using direct uploads, queues, containers, bounded retries, cleanup and output integrity."
---

# Heavy file and AI job platform — cloud fallback with strict economics

**Trigger:** Users need server-side video/audio/PDF/OCR conversion, AI jobs, upload-by-URL, large files, queues, direct object storage, containers or background processing.

**Owner & routing:** Own durable job orchestration, storage lifecycle, processing isolation and safety. web-unit-economics-finops budgets it; web-scale-reliability tests load; browser compute owns client-first alternatives.

**Evidence contract:** Date-stamp all cost/provider claims; use official current docs before real deployments. A forecast, architecture diagram or test fixture does not prove 1M MAU capacity or production profitability. Unknown-priced inputs cannot be treated as zero.

## Complete operational workflow
1. Preserve separate metadata/control plane and file data plane. Browser -> short-lived upload grant -> object store (no raw creds) -> authenticated finalize -> job descriptor queue -> isolated bounded worker -> validated output store -> short-lived download grant.
2. Grant presigned URLs only for exact key, operation, content type/size constraints where supported and short TTL; validate after upload by inspecting object metadata/content. Avoid dangerous public buckets and signed URL exposure in logs. Support multipart direct uploads and orphan cleanup.
3. Define idempotency key, tenant/job ownership, state machine RECEIVED -> VERIFIED -> QUEUED -> RUNNING -> COMPLETE or FAILED/EXPIRED/CANCELLED, atomic state transitions and server-side authorization for every status/download operation.
4. Bound per-user/day credits, estimated CPU seconds, megapixels, pages, output bytes, simultaneous jobs and provider credits before enqueue; enforce global paid budget and regional data constraints. Interactive requests should not wait on multi-minute work.
5. Sandbox untrusted codecs, executables, parsers and URLs in minimum-privilege containers: memory/cgroup CPU quotas, no privileged host access, restricted outbound networking, allowlisted domains for URL import, virus/decompression-bomb defenses, stdout/log scrubbing and deterministic deletion.
6. Use queues with at-least-once semantics and finite retries, dead letter handling, bounded exponential backoff, leased workers, timeout/cancel and poison-message quarantine. Do not retry deterministic invalid input and do not bill a user twice on retries.
7. Scale the worker pool using queue age, inflight jobs, CPU saturation and actual per-job p95 durations; choose serverless versus always-on based on measured utilization and cost breakeven, not a fixed vendor mandate.
8. Compute object operations, average held GB-month, direct download egress and CPU-hours; account for multipart chunks, queue operation sizes, retries and duplicate work. Store outputs transiently, follow lifecycle/deletion with verification.
9. Publish only trustworthy result: output file decodes, metadata/format is correct, dimensions/duration/quality or PDF structure verified; compare against expected benchmark fixtures and support clear error messages.
10. Enforce safe quotas for anonymous users, require proportional proof of work or optional challenge only on costly abusive actions; public SEO pages must remain reachable to verified legitimate crawlers; no misleading ad-to-download placement.
11. Add SLOs (e.g. job success %, p95 queue delay, p95 completion, no partial downloads), billing alarms, region/compute health, idempotency tests, migration/recovery playbook and tested rollback.
12. Prove a failure-injection suite: duplicate enqueue, provider outage, malicious file, upload partial, worker crash, expired signed URL, stale/cancelled result, simultaneous 1000 jobs and degraded storage. Mark UNKNOWN where no real environment exists.

## Release blockers — FAIL or UNKNOWN
- Do not run a full video transcode inside a constrained edge request handler by default.
- A queue is not exactly-once processing; job idempotency must exist.
- Direct uploads do not eliminate malware, storage, bandwidth or abuse costs.
- Never return unverified download as success.
- Cloud processing without budget guardrails is an unbounded bill risk.

## Primary-source URLs (reopen at action time)
- https://developers.cloudflare.com/r2/objects/upload-objects/
- https://developers.cloudflare.com/r2/api/s3/presigned-urls/
- https://developers.cloudflare.com/queues/platform/pricing/
- https://developers.cloudflare.com/queues/platform/limits/
- https://api-security.owasp.org/editions/2023/en/0xa4-unrestricted-resource-consumption/

## References and executable evidence
- `docs/architecture/02-client-and-media-pipelines.md`
- `docs/architecture/04-scale-and-product-quality.md`
- `scripts/model-tool-economics.mjs`

**Required handoff:** ADR with tradeoffs, real file-output fixture evidence, provider limits, measured p50/p95 behavior where available, budget matrix, proof of cost guardrails and rollback. If untested, explicitly say NOT_RUN; if infrastructure/account unavailable, UNKNOWN_EXTERNAL. No fixed universal vendor winner.
