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
