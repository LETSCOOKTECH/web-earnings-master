---
name: web-backend-api-engineering
description: "Build secure minimal backend APIs, authentication, databases, job queues and file processing services with strict schemas, authorization, idempotency, isolation and operational cost ceilings."
---

# WEB BACKEND API ENGINEERING

**Trigger:** Backend architecture, API, database, cloud functions, queues, uploads, login, payments, job platform, AI endpoints or stateful utility tools.

**Routing:** Own server contract and data plane; web-conversion-job-platform owns heavy media pipelines, web-security-assurance-asvs owns adversarial assurance.

**Source and uncertainty policy:** Treat user-uploaded diagrams as user hypotheses, not private Google proof. Reopen original provider sources before deployment. Distinguish code/fixture evidence from live crawlers, publisher accounts, traffic and revenue.

## End-to-end execution contract
1. Start from domain data and data-lifecycle map: classify public metadata, PII, sensitive files, secrets, stored results, derived artifacts, retention and data residency.
2. Choose API transport per real task: static no-backend when feasible, typed JSON small operations, direct signed object uploads for large payloads, long async jobs via queue+status, SSE/WebSocket only when necessary.
3. Define versioned OpenAPI/JSON Schema request and response contracts, true HTTP status errors, request size/deadlines, pagination bounds, stable Ids and server validation irrespective of browser checks.
4. Enforce authentication and object-level authorization (BOLA) on every user-owned resource; schema-level property permissions, RBAC/ABAC as needed and safe CORS/session CSRF/SSRF policy.
5. Design database minimal schema, constraints/unique keys, indexes for actual queries, migrations, backups, restores and transactional integrity; use prepared queries and no SQL string concatenation.
6. Use idempotency keys and atomic state transitions for file jobs/payment-like actions; queue delivery may be at least once. Bound retries, timeouts, poison queue, cancellation and duplicate billing.
7. Validate binary file signature, dimensions/size/pages/expansion ratio; run untrusted parsers/codecs in restricted processes or containers, block URL import SSRF and isolate tenant storage credentials.
8. Keep authorization, API secrets and billable upstream keys server-side. Implement weighted resource/CPU/token quotas and global hard spend stops before expensive work.
9. Prevent caching of private responses and cross-tenant leaks; where caching public results, honor version/source TTL and invalidate precisely. Support ETags/304 for public unchanged responses when correct.
10. Instrument sanitized tracing and metrics without file contents or credentials, logs with retention controls, error classes, abuse flags, cost/job, p50/p95 and real deletion proofs.
11. Run integration tests with actual DB/queue/storage substitutes and E2E staging, schema-contract tests and failure injection: duplicate jobs, worker crash, 429, partial upload, signed URL expiry, malformed input and backup restore.
12. Create rollback and migration runbooks, on-call owner, deployment health contract, dependency updates, SAST/SCA and version pinning. Keep runtime/vendor abstraction only where tested and economically justified.

## Non-negotiable FAIL / UNKNOWN gates
- No auth via guessed URL IDs or client-side-only access checks.
- No unbounded remote CPU, AI token or URL-fetch endpoint.
- No external raw file upload to an edge function that cannot contain the payload safely.
- No claim of reliable distributed processing without failure-injection tests.

## Required deliverables
- Scope and real user job, alternatives, testable acceptance contract and owner.
- Dated source ledger with exact URL, first-party versus excerpt status, evidence for each nontrivial claim.
- Reproducible tests or explicit NOT_RUN and UNKNOWN_EXTERNAL entries, including malicious/failure cases.
- Release decision, known risks, task economics, rollback, actual deployment and publisher/search evidence when authorized.

## Canonical references
- `docs/v6/README.md` (module-specific technical research and evidence routing).
- `sources/v6_claims_2026-11-23.json` (first-party evidence claims and disputed user-report assertions).
- `scripts/check-v6-evidence.mjs` and related executable contracts.
- `AGENTS.md` and existing root skill-routing contracts for adjacent subsystems.
