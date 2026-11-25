# Sense Astro Tool Starter — functional fixture, not a live website

This is a versioned, installable Astro 7 static project with a fully working browser-local JSONL Inspector. It is different from the older standalone CSV Studio: this one exercises Astro pages, layouts, configuration, generated HTML/robots/sitemap, TypeScript check, a real module Worker, exact file output, failure states, accessibility testing and three browser engines.

**Deployment status: BUILD_ONLY_NOT_DEPLOYED. There is NO public demo URL.** The default SITE_URL is a reserved example.org documentation hostname and FIXTURE_ONLY must remain noindex/robots disallow. Do not share that hostname as a running site.

## Run the real project on your computer

Use Node.js version compatible with the pinned Astro 7 dependencies (see package.json engines) and install from the lockfile:

    npm ci
    npm run check
    npm run build
    npm test
    npx playwright install chromium firefox webkit
    npm run test:e2e

Start a local server with npm run dev, then open its printed localhost URL. All installed tools run locally; no secret tokens or remote API keys are required. To inspect compiled static output: npm run verify:build.

## Actual user functionality
Paste JSONL or select a strict UTF-8 JSONL file up to 1 MiB, validate up to 5,000 JSON object records, optionally ignore empty lines, see the first eight normalized records and download all accepted records as UTF-8 JSONL. Inputs/option changes invalidate prior output; validation runs in a Worker and can be cancelled. Errors give the offending line number. Values are rendered as text, never inserted as HTML.

The tool does NOT handle JSON arrays/primitives as top-level records, nested schema validation, duplicate-key detection, JSON5, type coercion, arbitrary large files, server uploads or cloud persistence. JSON.stringify can normalize whitespace and property key order; review exports before overwriting the original.

## Astro and release proof
Astro app source under src/pages and src/layouts; public/scripts contains the actual JSONL core, Worker and UI controller. Built-output checker confirms compiled route files and safe fixture controls; Playwright runs the shipped output in Chromium, Firefox and WebKit, including actual download bytes, malformed input and mobile reflow. This is **LOCAL_PRODUCT_VERIFIED** only if the clean CI runs pass.

For a future authorized deployment, supply an actual owned HTTPS root origin using SITE_URL and RELEASE_STAGE=BUILD_ONLY_NOT_DEPLOYED at build time. That builds a candidate, not a deployment. Separately verify actual owner rights, DNS, TLS, public HTTP, status/404, worker CSP, exact served version, real devices and rollback; update privacy, security, support and Search Console/AdSense evidence. Never expose a private repository or trigger public Pages without approval.

## Source and provenance
The Astro 7 package-lock file was adapted from Croftweaver under MIT with notice in THIRD_PARTY_NOTICES.md. Remaining app code here is independently authored. Current provider and Astro documentation must be verified against current originals before a production change. Product and evaluation gates: docs/creator/02-astro-build.md and docs/creator/05-evaluation.md in repository root.
