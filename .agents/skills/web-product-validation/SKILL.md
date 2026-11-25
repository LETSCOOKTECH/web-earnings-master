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

## Million-user quality is independent from a unit-test PASS (V5)
For each tool run actual input/output oracle, corrupted/oversized/batch and low-RAM mobile tests, output reopening, optional cloud consent, no-hidden-upload network trace, cancellations, privacy retention, p95 and queue consistency. `web-browser-compute` owns browser implementation; `web-scale-reliability` owns traffic and failure load; `web-unit-economics-finops` checks costs. A theoretical MAU model or Playwright desktop WebKit fixture DOES NOT verify 1M real humans or actual iPhone Safari. `docs/architecture/04-scale-and-product-quality.md`.

## V6 production and research handoff (2026-11-23)
Before declaring 'full tool' or page ready, use actual output oracle, malformed samples, target phone/browser, privacy network trace, download reopening and server fallback. Forward checked value evidence to web-publisher-policy-eligibility; no UI screenshots as substitution.

## V11 — Real user task beats metadata PASS
A sandbox site passed static SEO with intentionally broken JS in prior independent review. Verify the actual **shipped executable source** and independently inspect output file bytes, corruption/size/permissions, browser form/download, mobile/a11y and privacy before release. Mutation tests must break the shipped tool and fail its actual oracle; HTML-only passing tests never make it a functioning product. See `docs/seo-master/04-evidence-and-sandbox.md`. A real browser blocked by administrator policy is NOT_RUN/UNKNOWN, not a PASS.

## V12 real shipped tool browser acceptance
Use examples/seo-csv-lab and tests/seo-csv-browser-e2e.mjs as an independently reproduced example. The real shipped CSV module must pass precise actual file download bytes, malformed input, optional formula guard and unchanged signed scientific numeric text, plus browser-local privacy request checks. Run actual Chromium, Firefox and WebKit in CI; include intentionally broken shipped JS test to prove a plausible SEO page cannot pass functional validation. A 390px emulated viewport is not real iPhone/Android or slow device validation. GSC and AdSense account statuses remain UNKNOWN. Use scripts/release-truth-gate.mjs to reject fabricated business verification.

## V13 — Web-verified professional production protocol
V13 docs/seo-master/11-end-to-end-web-development-v13.md. Test shipped tool not mock, real file output decoded/reopened, malformed/oversized input, safety/privacy, browser Chromium/Firefox/WebKit and real device where required, negative broken-script test, accessibility. Current external docs should be reopened before policy claims. Static SEO PASS is not executable UI correctness.


## V20 product-value oracle and adversarial human-site check
Test actual primary user jobs rather than counting tool pages or attractive hero sections. For a CSV deduplicator preserve representative original CSV, exact expected cleaned bytes, malformed input, formula-safety exception, size/row limit, browser download and JS crash cases. Confirm genuine actions on the shipped version in Chromium/Firefox/WebKit where available and physical device when required; a static HTML audit is not function proof.
**Availability failure:** localhost browser passes but a README links csv-lab.example.org as though it were live. The product is still NOT PUBLIC. Audit the actual link's DNS/HTTPS and working action before concluding user-ready; IANA example.org is explicitly reserved for examples. Record both task output PASS_LOCAL and public deploy UNKNOWN/NO. No invented 10/10 or AdSense outcome. See docs/quality/real-world-release-contract-v20.md and tests/public-demo-v20.test.mjs.


## V21 real functional proof — no more fake "fully working" mock tools
Study docs/quality/21-premium-csv-studio-acceptance.md and the actual shipped CSV Studio. The product's user story is: input six CSV lines including header, remove two duplicates, preview kept records, and download the exact original first-match records. Independent expected bytes are specified before running the tool. Validate columns and comma/newline quotes, both paste and selected files, case and trim matching, one-column lossy outcomes, optional formula guard, source switching and stale Blob URL deletion. The code includes three-engine Playwright regression tests that interact with the SAME distributed HTML and modules; screenshots and test logs are evidence of local function, not a public hosted service.

Negative acceptance is as important as normal: intentionally break the UI module and Worker, feed invalid UTF-8 bytes, mismatched widths, unsafe formula-looking values and HTML injection strings; require visible errors, no stale download and no off-origin network. A result card or "cleaned 3 rows" hardcoded label is worthless unless the downloadable bytes equal a separately computed oracle. Real device memory, data correctness on dialects outside explicit RFC4180-style CSV, user interviews, global throughput, GSC and earnings remain uncovered. No source count can close those gates. RFC: https://www.rfc-editor.org/rfc/rfc4180 .
