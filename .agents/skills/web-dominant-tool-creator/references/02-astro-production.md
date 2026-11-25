# Astro 7 starter and browser/API architecture — current-source workflow

**Authoritative originals:** [Astro installation](https://docs.astro.build/en/install-and-setup/), [rendering modes](https://docs.astro.build/en/basics/rendering-modes/), [islands](https://docs.astro.build/en/concepts/islands/), [config](https://docs.astro.build/en/reference/configuration-reference/), [security](https://docs.astro.build/en/guides/security/), [sitemap integration](https://docs.astro.build/en/guides/integrations-guide/sitemap/). Reopen before changes; current Astro 7 node engines are stricter than root repo's Node >=22.

The real starter is examples/astro-jsonl-studio. It contains matching Astro dependency lockfile, typecheck, true .astro pages, 404, layout, test-domain canonical/noindex, robots/sitemap, local Worker and JSONL parser with unit and 3-engine Playwright E2E. scripts/scaffold-astro-tool-v22.mjs copies the working starter without publishing anything. In local mode its canonical example.org is intentionally NOT an indexed public website. The older templates/astro are uncompiled examples, not replacements for this starter.

**Start on a supported Node version:**
- npm ci (reproducible dependency tree)
- npm run check (Astro diagnostics)
- npm run build (actual dist)
- npm test (pure core and failure limits)
- npx playwright install --with-deps chromium firefox webkit
- npm run test:browser (live static server browser interactions, exact download bytes and invalid input)
Read the browser result JSON and screenshots; verify no fake result or third-party egress. Check dist/robots.txt, dist/sitemap-index.xml, actual canonical in tool HTML, asset links and correct source-visible text.

**Architecture options:**
1. **Local static compute:** tools with bounded input, deterministic transformations and no shared state. Keep file bytes browser-side, strict UTF8 reading, no external data egress. Worker offloads UI and can cancel; it is not memory-safe isolation or server-grade compute. Run low-end hardware tests.
2. **Static + bounded API:** user auth, external feeds or secrets. Implement SSRF protections, rate limiting, retries, idempotency, privacy, vendor budgets and key rotation.
3. **Server/on-demand/queue:** large media, accounts or collaboration. Choose adapters, storage/DB and job queues from workload; Astro is not mandatory.
Record ADR on monthly cost projections with sensitivity and task-specific bottlenecks; a 1M-user model is only a scenario until load-tested.

**Release discipline:** SITE_URL must reflect an actual verified owner-controlled HTTPS root for PUBLIC release. SENSE_RELEASE=public rejects known reserved/test domains but cannot prove DNS or user authorization. Only an actual external deploy with actual HTTP version, worker delivery, live user task, 404, TLS, privacy and rollback passes EXTERNAL_HTTP_OBSERVED. Do not present a local built URL as publicly working.
