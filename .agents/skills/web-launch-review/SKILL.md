---
name: web-launch-review
description: "Run evidence-based prelaunch and postlaunch release gates for Astro tools, SEO/AI access, privacy, ads, production reliability and business measurement."
---

# Launch Review

**Use when:** Run evidence-based prelaunch and postlaunch release gates for Astro tools, SEO/AI access, privacy, ads, production reliability and business measurement.

**Workflow contract:** Follow the next steps proportionally to the request. Prefer current primary sources to saved claims. Adapt the sequence when evidence suggests a better route; do not overbuild a minor task. Show exact verification, uncertainty, and safety boundaries. Read `AGENTS.md` and the matching `references/` files when carrying out substantial work.

## Evidence gates
1. Market: genuine job, proven demand and distribution hypothesis recorded. Engineering: source checked into versioned repo, site config and domain verified.
2. Security/product: tests on actual output, errors, file sizes, browsers, mobile device and accessibility; no secrets or destructive unverified changes.
3. Build/SEO: Astro build output correct, sitemap and robots verified, canonical/title/H1/links/schema validated, intentional 404/410 and redirects, no example.com in deployed output.
4. Search/AI: live server response from normal browser and documented crawlers, no WAF challenge, Search Console and Bing properties verified where credentials available, generative AI inclusion checked if desired; no claim of ranking.
5. Monetization: publisher identity, actual ownership, policies, consent, ads.txt, ad placement and network approval, ad script compatibility, fraud risk and privacy policy reviewed.
6. Observability: analytics events tested in real browser, monitor tool errors, bot/user separation, revenue and costs; rollback plan documented.
7. After release: smoke test live tools and static pages, 24–48h error review, indexing checks and acquisition baseline. Do not declare DONE because CI script exists; label external approval separately.
8. Use `scripts/check-evidence.mjs` to check manifest completeness, then manual sign-off; automated scripts are **not certification**.

## Output
`templates/release-evidence.md` with PASS/FAIL/UNKNOWN, evidence links, owner, test date, risk and release decision. GO only after critical gates demonstrated.

## V2.3 production evidence contract (audited 2026-11-23)
**Owner:** Production and account release signoff. **Routing:** web-product-validation supplies test artifacts; launch owns GO/NO-GO.
**Official source entry points requiring action-time reopening:** https://developers.google.com/search/docs/fundamentals/how-search-works;https://support.google.com/adsense/answer/48182. A saved link is not confirmation of the current provider rule.
**Evidence needed:** Deployed hash, live HTTP/browser, verified task, owner Search Console and publisher states; rollback.
**Critical FAIL / UNKNOWN:** Local CI cannot certify real indexing, AdSense approval or revenue.
**Mandatory freshness procedure:** Read docs/foundations/19-provider-source-verification.md and docs/RESEARCH_PROTOCOL.md. Re-open official body, log exact applicable claim, evidence date, announced versus effective status, geography/account and contradiction. Use sources/verified_claims.json only as a dated baseline; source watch hashes are not semantic verification. Record tests/actual results, open blockers and rollback; do not infer live indexing, AI citations or AdSense revenue from local tests.

## V6 production and research handoff (2026-11-23)
Call web-release-observability-operator to verify staging, auth/security, root robots/canonical and WAF, real output, consent/ads and production rollback. Search index/approval cannot be established from GitHub CI. docs/v6/07-release-observability-and-ad-privacy.md.

## V12 no accidental full release from local PASS
Local gate (npm test, npm run audit:seo-example, Playwright owned-server E2E on actual shipped CSV and injected crash cases), staged HTTPS gate, Google/Bing indexed-state gate, publisher account gate and legitimate human/revenue gate are independent. scripts/release-truth-gate.mjs explicitly never certifies external results from self-declared manifest booleans. A PASS_LOCAL or LOCAL_REAL_BROWSER_PASS allows human staging review only, not production ranking/AdSense status. See docs/seo-master/05-independent-observatory-v12.md.

## V13 — Web-verified professional production protocol
V13 docs/seo-master/14-agent-orchestration-v13.md and 11-end-to-end-web-development-v13.md. Mandatory local shipped functionality and negative tests, independent browser output bytes, real security/privacy/consent, crawling/index eligibility, actual HTTPS origin/404/CDN/WAF and rollback. GSC indexed, AdSense approved and revenue need real owner-account evidence; no self-attested JSON or source body SHA can grant production-ready status. Coverage matrix missing critical domain = HOLD.


## V20 launch sign-off must survive human clicking the link
The release reviewer must open the EXACT claimed public URL and verify owner authorization, external DNS/TLS, actual version and working user action. A placeholder under example.org/.com/.net, .test or localhost is a hard blocker to calling the site public. The user-observed csv-lab.example.org NXDOMAIN was a false live-demo presentation, NOT a failure of the user's network. IANA source: https://www.iana.org/help/example-domains .
**Run:** npm run audit:demo:origin, npm test and browser E2E; for a real authorized live site inspect HTTP, canonical/robots/sitemap, status including 404, real browser action and output, CSP, accessible controls and privacy. Local candidate builder output status BUILD_ONLY_NOT_DEPLOYED must NOT pass external release gate. Separate GSC/Bing indexing, real AI answer evidence, AdSense approval and earned revenue from local site quality. Save actual URL, tested time, release SHA, independent reviewer and rollback. No owner-approved public deployment -> HOLD_EXTERNAL, not READY.
See docs/quality/real-world-release-contract-v20.md.


## V21 visible owner-reviewable deliverables for a functional site
A screenshot without working output is not product acceptance; a working localhost app without external host is not public release. For CSV Studio, review the initial and processed desktop screenshots from Playwright CI artifacts, read the exact downloaded CSV bytes and negative error cases, inspect network egress, accessibility labels, broken worker/JS failure, strict UTF-8 behavior and max-size test. The V21 acceptance packet at docs/quality/21-premium-csv-studio-acceptance.md identifies every external gate.

The build-only converter includes csv-worker.mjs and replaces test-only canonical/robots/sitemap for an actual owned root domain; it intentionally outputs BUILD_ONLY_NOT_DEPLOYED. Real release requires a separately authorized host, DNS/TLS, public 200/404, CSP/worker retrieval, real mobile accessibility/low-memory performance where relevant, monitoring and rollback. Only owner tools can certify indexing/AdSense. Fail CLOSED on "premium" design claims when actual task status, stale downloads, file fidelity or externally clickable product URL were never independently tested.
