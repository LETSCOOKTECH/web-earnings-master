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
