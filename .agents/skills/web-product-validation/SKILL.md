---
name: web-product-validation
description: "Validate real tool output correctness, browsers/devices, mobile edge cases, privacy and performance before claiming production readiness."
---

# Product Validation

**Use when:** Validate real tool output correctness, browsers/devices, mobile edge cases, privacy and performance before claiming production readiness.

**Workflow contract:** Follow the next steps proportionally to the request. Prefer current primary sources to saved claims. Adapt the sequence when evidence suggests a better route; do not overbuild a minor task. Show exact verification, uncertainty, and safety boundaries. Read `AGENTS.md` and the matching `references/` files when carrying out substantial work.

## End-to-end product verification
1. Unit-test pure transformations (size math, aspect ratios, compression loop, MIME sniffing), error paths, cancellation, invalid inputs and boundary constraints.
2. Integration tests with real legally reusable fixtures: JPEG, PNG transparency, WebP, orientation, large image, tiny image, corrupted data, unsupported type, multi-file batch, output ZIP. Verify downloadable files reopen and match declared dimensions/size/type.
3. Multi-browser test (Chromium/Firefox/WebKit as relevant), low-memory Android, mobile Safari where available; test network conditions, browser permission prompts and memory exhaustion. Report unsupported cases clearly.
4. UI tests: no JS explanatory content, functional components, keyboard navigation, screen reader labels, errors, progress, status, focus and successful downloads.
5. SEO tests: built HTML title/H1/canonical/sitemap/schema/links, real 404, robots, WAF, Google/Bing inspection. Ad tests should not click live ads or inflate impressions.
6. Production controls: build logs, dependency audit, license obligations, CSP, response headers, smoke tests and actual deployed artifacts. Screenshots are evidence of presentation not correctness.
7. Acceptance: compare expected outputs with actual results, publish a known-issues ledger, require all critical cases pass; any untested browser or device remains unverified.

## Outputs
`templates/test-matrix.csv`, `templates/release-evidence.md`, `scripts/audit-static-site.mjs`, real artifact hashes/results and fail/repair tickets.

## V2.3 production evidence contract (audited 2026-11-23)
**Owner:** Real output, compatibility and resilience testing. **Routing:** web-launch-review controls final production release.
**Official source entry points requiring action-time reopening:** https://playwright.dev/docs/browsers;https://developer.mozilla.org/en-US/docs/Web/Performance. A saved link is not confirmation of the current provider rule.
**Evidence needed:** Real cross-engine browser E2E and file verification, mobile RAM where available, artifact hashes.
**Critical FAIL / UNKNOWN:** Desktop WebKit headless is not proof of iPhone/mobile Safari or native Android.
**Mandatory freshness procedure:** Read docs/foundations/19-provider-source-verification.md and docs/RESEARCH_PROTOCOL.md. Re-open official body, log exact applicable claim, evidence date, announced versus effective status, geography/account and contradiction. Use sources/verified_claims.json only as a dated baseline; source watch hashes are not semantic verification. Record tests/actual results, open blockers and rollback; do not infer live indexing, AI citations or AdSense revenue from local tests.
