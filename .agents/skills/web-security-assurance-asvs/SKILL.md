---
name: web-security-assurance-asvs
description: "Apply OWASP ASVS 5.0 and Top 10:2025 to frontend, backend, API, uploaded documents, third-party scripts, credentials, supply chain and deployment with evidence-linked release blockers."
---

# WEB SECURITY ASSURANCE ASVS

**Trigger:** Security audit, threat model, penetration test planning, production hardening, CSP, app security standards, ads third-party scripts, file upload and live release.

**Routing:** Own explicit control-to-test traceability; cannot replace professional penetration testing; web-security-performance retains performance security integration.

**Source and uncertainty policy:** Treat user-uploaded diagrams as user hypotheses, not private Google proof. Reopen original provider sources before deployment. Distinguish code/fixture evidence from live crawlers, publisher accounts, traffic and revenue.

## End-to-end execution contract
1. Inventory assets, users, attackers, trust boundaries, public content, upload formats, admin panel, authentication/session, payment keys, paid APIs and ad scripts; enumerate abuse and 'denial of wallet' attack paths.
2. Select OWASP ASVS v5 requirements applicable to deployment, cite versioned controls, map to OWASP Top 10:2025 and API Security Top 10:2023; assign owners and objective test evidence.
3. Implement deny-by-default server authorization, per-object and per-property checks, session hardening, CSRF, CORS allowlists, cookie attributes, rate/resource limits and safe redirect controls.
4. Defend injection: parameterized SQL, output encoding by context, vetted sanitization for HTML/SVG, no eval/unsafe shell, isolate document parsing, strong CSP where feasible and Trusted Types where browser compatible.
5. Secure storage and transport: TLS, HSTS appropriateness, encrypted secrets/backups, least privileged cloud IAM, expiring signed URLs, storage private by default, data minimization and delete verification.
6. Scan file uploads for magic bytes, parser exploit paths, zip/XML bombs, malicious SVG/macro content, file path traversal and resource exhaustion; test known fixture families.
7. Set supply chain gates: lockfiles, reproducible builds, pinned action SHAs where feasible, SCA/CVE, malware/package provenance, SBOM, license checks, dependency update review, secret scanning and release signature.
8. Audit third-party ads/analytics as high-trust browser scripts. Review CSP/script-src and COOP/COEP interoperability; don't blindly enable cross-origin isolation that breaks ad iframes or disable CSP entirely for ads.
9. Test backend SSRF with blocked internal network/metadata endpoints, DNS rebinding, redirect chains, allowed egress, timeouts and URL allowlists; no arbitrary open proxy for expensive remote fetch.
10. Add security telemetry without collecting sensitive task content: auth failures, brute force, privilege failures, cost anomalies, suspicious ad click/input patterns, audit log integrity and incident alerts.
11. Require runnable security tests plus manual attack walkthrough for critical risks; file-manifest checks are static triage only. Record NOT_TESTED/UNKNOWN for missing dynamic validation.
12. Use a risk/decision register for vulnerability severity, exploitability, business impact, mitigations, residual risk, patch deadline, safe rollback and postincident playbook.

## Non-negotiable FAIL / UNKNOWN gates
- No security grade solely from headers/Lighthouse.
- No policy bypass through fake crawler UA or intentional CAPTCHA blocking legitimate search crawlers.
- No security release while critical unauthenticated private upload or SSRF path remains exploitable.
- Do not claim ASVS certification from a checklist or self-attestation.

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

## Official primary-source starting points (re-open before action)
- https://asvs.owasp.org/
- https://top10.owasp.org/2025/0x00_2025-Introduction/

## V13 — Web-verified professional production protocol
V13 docs/seo-master/11-end-to-end-web-development-v13.md and 08-live-source-verification-v13.md. Reopen applicable OWASP ASVS, API/file upload and browser standards, map control to actual deployed code and adversarial fixtures. Protect secrets/privacy, URL imports SSRF, hosted auth and untrusted files; do not substitute manifest PASS for penetration test or correct account authorization.


## V21 actual adversarial evidence: untrusted CSV in browser
For the CSV Studio, the trust boundary is a local user-selected CSV file or pasted string. The browser does not upload it to a server, but it can be unsafe if rendered as HTML or opened in a spreadsheet. The exact safety controls in examples/seo-csv-lab/site/assets/ are: TextDecoder fatal on invalid UTF-8 bytes; bounded 2MB/5K-row/200-column parsing; strict CSV column-count and malformed-quote rejection; DOM textContent preview rendering; same-origin static resources/CSP with worker-src self; Blob URL revocation; explicit file source precedence; and opt-in raw output toggle with spreadsheet-formula guard ON by default.

OWASP warns formula-injection mitigation depends on spreadsheet clients and save/reopen behavior: https://wstg.owasp.org/latest/11-Injection/20-CSV_Injection/ . Never label an apostrophe prefix a universal security guarantee or silently corrupt raw CSV while claiming fidelity. The operator must test formula-leading =,+,-,@ with signed/scientific number exceptions and actual target spreadsheet where meaningful; test HTML-looking cells for DOM injection; test oversized/corrupt inputs, broken Worker, revoked download, network egress, strict CSP, and injected script failure. Run tests/seo-csv-core.test.mjs and tests/seo-csv-browser-e2e.mjs, preserve failing cases and downloaded byte hashes. Production penetration testing, browser extension/OS malware, real-device clipboard access, and legal user consent remain UNKNOWN until independently assessed. OWASP ASVS scope: https://asvs.owasp.org/ .

## V26 — Trusted upstream method integration

Inspect `sources/official-skill-integration-v26.json` and `docs/skills/2026-11-25-official-upstream-v26.md` before use. The source files were inspected and pinned, but upstream code is not installed or auto-executed.

- `anthropic-mcp`: MCP tool contracts, auth boundaries, schema/negative tests; only when MCP needed.

**Verification:** For MCP and tool-execution paths test prompt injection via tool results, scope escalation, cross-tenant requests, replay/idempotency, secrets in logs and long-running job abuse. Anthropic's upstream MCP guidance is a method reference only; do not install/run remote tooling without technical and license review. Retain failed defensive fixtures.

Run `node scripts/check-official-skill-integration-v26.mjs`, domain-specific test suites and applicable real browser/server checks. Make distinctions between first-party metrics, modeled numbers, observed site public behavior and `NOT_RUN`.
