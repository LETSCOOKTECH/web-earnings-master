# Astro framework master execution requirements

At action time consult https://docs.astro.build/ and the current Astro release notes. The starter at examples/astro-tool-starter is a real Astro 7 install/build/test example, not a deploy. It has package.json, package-lock.json, astro.config.mjs, pages, layouts, CSS, a browser module Worker, deterministic JSONL core, safe upload handling, 404 page, stage-aware robots and full test coverage.

## Architecture router
Static, search-readable HTML plus a small module for bounded browser-local tools. Worker/WASM only when actually needed by input size or CPU behavior; test on target hardware. Astro on-demand rendering and server Actions only for auth, secrets or live state. Async queue+storage for genuine large or long jobs, with tenant controls, quota, expiry, deletion and reconciliation. Do not add DB for a no-account calculator or a framework component library for one local file tool.

## Engineering implementation gates
- Pin an explicit Astro major/minor and commit a resolved package lock. Build from clean npm ci with supported Node version, not a machine cache.
- Single source of truth for SITE_URL and release mode; fixture builds with synthetic origin must be NOINDEX/robots DISALLOW and NEVER treated as publicly hosted. Real domain requires external owner approval and DNS/TLS.
- Self-canonical on intended final route; title/description, OG identity, one H1, useful body and realistic capability/limitations, honest no-JS explanation.
- Only meaningful unique tool routes; no AI-generated keyword clones. Generate sitemap on real canonical pages and exclude status/noindex/private routes as appropriate.
- Browser tool core independently testable without UI. Selected UTF-8 file bytes decoded strictly; size/rows/depth limits, safe textContent rendering, exact downloadable bytes and revocation, failed Worker/cancel/no-stale-output.
- Keyboard labels/live errors/visible focus/contrast/mobile reflow and real assistive-technology followup; reduced motion where used.
- Build, Astro check, pure transformation test, actual Playwright browser across engines, axe automated scan where appropriate, built HTML/worker/robots checks, security and unknowns.

## Astro is not an SEO magic factor
Google's AI Overview/Mode eligibility still depends on Search technical requirements, useful content and indexing; Google says special llms.txt and magical AI schema are unnecessary. Avoid fake rank guarantees, structured data claims or stale provider assumptions. See docs/creator/03-search-monetization.md.

## Run actual starter
Go into examples/astro-tool-starter. Run npm ci, npm run check, npm run build, npm test, npm run test:e2e and npm run verify:build. The dedicated GitHub Astro workflow performs these on a clean Node runner with actual browser binaries. Such tests prove LOCAL_PRODUCT_VERIFIED plus BUILD_ONLY_NOT_DEPLOYED; they do not establish a public host, owner indexing or ad approval.

Official sources: https://docs.astro.build/en/guides/routing/ ; https://docs.astro.build/en/guides/on-demand-rendering/ ; https://docs.astro.build/en/guides/content-collections/ ; https://www.w3.org/TR/WCAG22/ ; https://asvs.owasp.org/ .
