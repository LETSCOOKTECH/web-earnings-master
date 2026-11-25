---
name: web-astro-engineering
description: "Implement production-oriented Astro websites with search-readable static HTML, accessible islands, reusable SEO components, secure browser processing and tests."
---

# Astro Engineering

**Use when:** Implement production-oriented Astro websites with search-readable static HTML, accessible islands, reusable SEO components, secure browser processing and tests.

**Workflow contract:** Follow the next steps proportionally to the request. Prefer current primary sources to saved claims. Adapt the sequence when evidence suggests a better route; do not overbuild a minor task. Show exact verification, uncertainty, and safety boundaries. Read `AGENTS.md` and the matching `references/` files when carrying out substantial work.

## Architecture and code workflow
1. At run time consult current Astro docs for version/deprecation changes. Default to static builds for public tool landing pages if feasible; use server/hybrid only when justified. Required: production origin config not example.com, redirect policy and deterministic output.
2. Separate `src/pages` from `src/components`, `src/lib`, `src/layouts`, `src/content`, `public` and `tests`. Canonical identity and page metadata come from validated site config. Never use fake domains or staging canonicals in deployable output.
3. Pre-render title, H1, body explanation, meaningful text, breadcrumbs, real anchors and schema in HTML. Interactive application can be a hydrated island; users and crawlers shouldn't need JS to understand which task is provided.
4. Avoid loading the entire editor/workers/codecs above the fold. Use component-level hydration, progressive loading, lazy imports, cancellable processing, memory caps and object URL cleanup. Test both no-JS explanatory content and JS-enabled tool function.
5. Use `@astrojs/sitemap`, correct sitemap-index location, status codes, security headers appropriate to host, canonical and hreflang only when real translated content exists. Never include results/session/upload URLs in XML.
6. Build responsive compact tool-first UI; correct labels/status events; no popunder or ad-shaped download. Respect reduced motion and accessible keyboard controls.
7. Host statically where possible, use CDN and content-hashed assets, monitor bandwidth and free-tier limits. Use privacy-by-design; only add analytics after consent review.
8. Implement proper lint, type checks, unit/integration/E2E and built-output audit. Capture run logs and real test results; do not treat scaffold or CI yaml as proof.

## Starter examples
`templates/astro/astro.config.mjs`, `templates/astro/src/components/SEOHead.astro`, `templates/astro/src/layouts/BaseLayout.astro`, `templates/astro/src/lib/seo/schema.ts`, `templates/astro/src/pages/robots.txt.ts`; test with `node scripts/audit-static-site.mjs` and `scripts/audit-live-site.mjs`.

## V2.3 production evidence contract (audited 2026-11-23)
**Owner:** Versioned Astro engineering and static output. **Routing:** web-product-validation executes real output correctness.
**Official source entry points requiring action-time reopening:** https://docs.astro.build/en/getting-started/. A saved link is not confirmation of the current provider rule.
**Evidence needed:** Built HTML metadata and no-JS meaningful purpose; E2E actual tool and honest 404.
**Critical FAIL / UNKNOWN:** No automatic search rank boost from choosing Astro.
**Mandatory freshness procedure:** Read docs/foundations/19-provider-source-verification.md and docs/RESEARCH_PROTOCOL.md. Re-open official body, log exact applicable claim, evidence date, announced versus effective status, geography/account and contradiction. Use sources/verified_claims.json only as a dated baseline; the source watch's hash changes are not semantic verification. Record tests/actual results, open blockers and rollback; do not infer live indexing, AI citations or AdSense revenue from local tests.

## Workload-first architecture handoff (V5)
Astro is a rendering/build option, not the default answer to every cost or performance decision. On new tool requests route first to `web-workload-architecture-router` for actual task execution choice, `web-browser-compute` for local code paths, `web-hosting-vendor-evaluation` for lawful commercial hosting and `web-unit-economics-finops` for dollars/job. Demand browser/codec correctness, small JS payload, shared CDN cache, real fallback and avoid claiming Astro guarantees 1M-user capacity. `docs/architecture/01-workload-placement-decision.md`.

## V6 production and research handoff (2026-11-23)
Astro is a frontend option not a direct Google ranking guarantee; use web-fullstack-production-executor and web-frontend-experience-engineering for real tool outcome and initial accessible HTML. web-backend-api-engineering owns state and API where truly necessary. docs/v6/02-fullstack-production-blueprint.md.

## V23 active Astro starter and upstream review

Implementation source of truth: `examples/astro-jsonl-studio` and `scripts/scaffold-astro-tool-v22.mjs`, **not** legacy `templates/astro` snippets (those are examples only). Route full products through `web-dominant-tool-creator`, and stage/ownership through `sources/skill-network-v23.json`. Before code, use actual installed Astro version and current official docs; Methedrone's pinned `astro-orchestration` and `astro-verification` are methodology references, not installed dependencies. Write an independent job oracle; explicitly choose static Worker vs SSR/adapter/API/queue depending on secrets, input size, latency, data retention and cost. Do not force Astro for unsuitable workloads.

For any new tool: fresh `npm ci`, `npm run check`, `npm run build`, `npm test`, Chromium/Firefox/WebKit browser download/API output, hostile input, no-JS, responsive and a11y checks. Reject the assumption that JSONL/CSV test success generalizes to PDF, media or authenticated server jobs. Public hosting, rendered production HTML, indexing, AI citations and ad approval are separate observation gates.

## V25 — version-pinned Astro production acceptance, not framework mythology

**Current official rule (verified 2026-11-25):** Astro configuration `output` accepts `'static'` and `'server'`; old `output: 'hybrid'` articles are historical, not a current configuration to copy. Default is static; selectively render on demand with `export const prerender = false` **only after adding an adapter**, or use `output: 'server'` with individually prerendered routes. Use https://docs.astro.build/en/reference/configuration-reference/ and https://docs.astro.build/en/guides/on-demand-rendering/ at execution time, comparing the exact installed major/minor. Reject stale versioned docs and unsupported adapter/runtime combinations.

Mandatory `AstroDecision` packet per tool: task/customer + fixed oracle; static vs API/server/worker execution with secrets/privacy/retention, max upload size, cancellation/memory and cost; public origin and trailing slash/canonical policy; page routes and pre-render decision; `@astrojs/sitemap` scope; audited framework islands/client hydration and JS byte ceiling; worker/wasm lazy-load; mobile no-JS crawlable value; Cloudflare/Vercel/Netlify/Node adapter only if needed; a realistic reason to decline Astro.

Run `node scripts/audit-astro-v25.mjs --project PROJECT_DIR` as the Astro 7 static/server/adapter and built-HTML source gate, then run `--production --origin ACTUAL_OWNER_HTTPS_ROOT` after building. Both are only local release checks and never certify hosting.

Build gate: `cd examples/astro-jsonl-studio && npm ci && npm run check && npm run build && npm test && npm run test:browser` on a clean copy with installed 3 browsers and actual output bytes. For any new project, additionally run the repo's `node scripts/audit-static-site.mjs --dist DIST --origin REAL_HTTPS_ORIGIN --production`, public host DNS/TLS and real task output tests before production. Test redirects/statuses/404, HTML title/H1/text without JS, actual focus/input/worker/status and accessible feedback, large input & cancellation, failed imports, malicious values, MIME spoofing, time/memory, generated output, reduced-motion, mobile and performance budgets. Keep build-only vs local HTTP vs public HTTP vs indexing/AdSense states separate.

Never equate Lighthouse green, static HTML presence, choice of Astro, or schema validity with rankings, business conversion or universal tool correctness. Content collections use current typed loader APIs (`glob()`, `file()` and `schema`) for real editorial data, not programmatically cloned near-duplicate pages. Astro's official Testing guide documents Vitest via `getViteConfig()` and Playwright across browser engines: https://docs.astro.build/en/guides/testing/ . Use independent, testable user-task requirements and true provenance.

## V26 — Trusted upstream method integration

Read `docs/skills/2026-11-25-official-upstream-v26.md` and `sources/official-skill-integration-v26.json`; check source ownership, exact Git blob hash, license, current relevance and domain-specific limitations before use. Methods are adapted, not executable upstream packages.

- `vercel-react` (VERCEL_OFFICIAL_ORG): React islands only: inspect async waterfalls, lazy bundles and hydration; no generic Astro performance guarantee.
- `anthropic-webapp` (ANTHROPIC_OFFICIAL_ORG): Live local server Playwright and real output/screenshot/console evidence; preserve server lifecycle.

**Required verification and boundaries:** For Astro verify static/server/adapter using V25 gate; only apply Vercel React performance rules to installed React islands, not Astro templates. Test initial HTML/no-JS usefulness, lazy-load heavy codecs, network waterfall, worker cancellation and byte-correct downloads on Playwright Chromium/Firefox/WebKit. No app is production-ready until real owned-origin browser output is verified.

Run `node scripts/check-official-skill-integration-v26.mjs` and applicable existing tests. Log artifact/provenance, exact failure, source date and real browser/user metric where available; otherwise `NOT_RUN`. No skill/source label is proof of SEO rank, AI citations, ad eligibility, private architecture or profits.
