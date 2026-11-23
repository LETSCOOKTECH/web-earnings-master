---
name: web-release-observability-operator
description: "Manage production CI/CD, SRE, crawl and publisher readiness, telemetry, cost alarms, SEO-safe migrations, backup/restore and evidence-based launch/rollback gates."
---

# WEB RELEASE OBSERVABILITY OPERATOR

**Trigger:** Launch, release checklist, DevOps, staging, database migrations, uptime, incident response, SEO crawl outage, Search Console, ad tag release or scale changes.

**Routing:** Own final release and observations; other skills own component implementations and policy signoff.

**Source and uncertainty policy:** Treat user-uploaded diagrams as user hypotheses, not private Google proof. Reopen original provider sources before deployment. Distinguish code/fixture evidence from live crawlers, publisher accounts, traffic and revenue.

## End-to-end execution contract
1. Establish build provenance, lockfile, staged environments, artifact hashes, secrets, approved changes, feature flags, backward-compatible DB migrations, rollback package and reviewer.
2. Verify domain, DNSSEC if viable, TLS/HSTS, content security headers, server 200/301/404/410, canonical redirects, robots/sitemap, real HTML indexability, correct WAF crawler access and no staging noindex leaks.
3. Run tool-level output oracle tests, frontend accessibility, low-end device, API contract, file-upload malicious fixtures, auth/authorization integration, SCA/SBOM, dependency/license and penetration tests proportionate to risk.
4. Measure RUM field CWV and synthetic performance separately. Instrument pageviews, human task attempts/completions, privacy-consented analytics, eligible ad impressions/earnings from owner accounts, bot fetches, billed compute and resource quotas.
5. Define monitors for uptime, error budget, p95/p99 response, batch queue age, malware scans, object TTL/deletion, ad click anomaly, consent errors, drift in source docs and provider billing.
6. Run SEO-safe release: diff route manifest/canonical/sitemaps/redirects; preserve backlinks and valid 301s; deploy changed content with correct cache headers and versioned immutable assets; check cold CDN cache and origin capacity.
7. Deploy canary and inspect logs/invoices/actual task outcomes; perform scheduled restore/recovery drills, remove orphan temp files and verify idempotency and cost stop on spike.
8. Maintain evidence manifest: version, real environment, source checked date, what tests were NOT_RUN, who approved, baseline metrics, before/after user task and search data, documented rollback and service owner.
9. On incident apply containment: pause high-cost jobs, revoke leaked secrets, mitigate WAF issues, preserve privacy and crawl access, page error communication, run postmortem and recertify affected policy.
10. Do not classify site 'Google ranked' based on deployed routes; separate search indexing, AI citations, publisher approvals, actual revenue and independent user satisfaction evidence.

## Non-negotiable FAIL / UNKNOWN gates
- No claim of prod safety because GitHub Actions is green.
- No ranking/AdSense approval inference from CI or Lighthouse.
- No CDN switch without testing cold-cache Googlebot and origin request peak.
- No live money-spending ads/traffic actions without owner authorization.

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
