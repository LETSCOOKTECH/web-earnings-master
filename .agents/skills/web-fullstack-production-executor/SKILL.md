---
name: web-fullstack-production-executor
description: "Engineer production web utilities end to end with traceable user jobs, frontend/backend contracts, architecture selection, CI, staging, safe migration and verified release evidence."
---

# WEB FULLSTACK PRODUCTION EXECUTOR

**Trigger:** Build complete website, tool hub, deployment-ready frontend/backend, shared codebase, monorepo, refactor, scale or production verification.

**Routing:** Own end-to-end delivery orchestrator; route workload to web-workload-architecture-router, frontend to web-frontend-experience-engineering, backend to web-backend-api-engineering, security to web-security-assurance-asvs.

**Source and uncertainty policy:** Treat user-uploaded diagrams as user hypotheses, not private Google proof. Reopen original provider sources before deployment. Distinguish code/fixture evidence from live crawlers, publisher accounts, traffic and revenue.

## End-to-end execution contract
1. Translate product problem into real user jobs, unique differentiation and acceptance tests; verify search demand and competitors before writing routes or page-count targets.
2. Select minimal architecture by workload: static public HTML and browser JS, Worker/WASM for local tasks, consent-based remote conversion and bounded API/queue for cloud jobs, durable DB only for real user state.
3. Document repository boundaries: apps/web, packages/tool-core, packages/contracts, packages/ui, optional services/api, services/worker, tests/fixtures, ops and docs; do not impose a monorepo on a trivial tool.
4. Produce route manifest and API schemas before coding; public indexable tool pages get SSR/SSG meaningful initial HTML, accessible action controls, stable canonical URL, descriptive metadata and honest capability/support tables.
5. Build pure transformation core with deterministic fixture oracle, cancellation and invalid inputs. Separate UI components from tool engine, storage adapter, auth, analytics and ad delivery.
6. Apply server ownership validation, auth/session/access controls, safe input and SSRF handling, idempotency, quotas and signed uploads as applicable; document state machine, DB indexing, backup/restore and migration rollback.
7. Treat every site page as a distinct user experience: home, tool, category, about/contact, privacy/terms, errors, loading/offline, no-results and download states. Avoid artificial thin pages generated only for keyword variants.
8. Implement device/performance/accessibility budgets using LCP/INP/CLS field data, WCAG 2.2 AA targets, keyboard and screen readers, static HTML/link graph, caching, bfcache behavior and real mobile browser fallbacks.
9. Integrate a safe ad adapter only on authorized eligible page states; protect primary actions from accidental ad clicks, preserve layout and handle consent by geography/provider.
10. Run unit, integration, E2E three-engine and real-device fixtures; security static analysis, SCA/SBOM, secret scan, deployment smoke, accessibility and adversarial malformed-input tests.
11. Release through staging → safe canary → monitored production only with stable DNS/TLS, robots/sitemaps, versioned assets, backup, budget alarms, incident/rollback and owner sign-off.
12. Evaluate Search Console crawl/index and page query metrics, ad network approval and first-party revenue separately; record unknown external outcomes, never convert code passing tests into a ranking/monetization guarantee.

## Non-negotiable FAIL / UNKNOWN gates
- No generated decorative tool UI without verified actual output for declared formats.
- No untested migration, stale auth or public unscoped storage of private user uploads.
- No production-ready claim without real staging, load tests and owner credentials for live account metrics.
- No baked-in Astro/Cloudflare lock-in when workload proves another stack is better.

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
- https://www.w3.org/TR/WCAG22/
- https://asvs.owasp.org/
