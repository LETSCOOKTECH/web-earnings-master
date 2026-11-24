---
name: web-technical-seo
description: "Audit and improve crawlability, indexability, rendered HTML, canonicalization, internal links, sitemaps, structured data and Core Web Vitals for actual search eligibility."
---

# Technical Seo

**Use when:** Audit and improve crawlability, indexability, rendered HTML, canonicalization, internal links, sitemaps, structured data and Core Web Vitals for actual search eligibility.

**Workflow contract:** Follow the next steps proportionally to the request. Prefer current primary sources to saved claims. Adapt the sequence when evidence suggests a better route; do not overbuild a minor task. Show exact verification, uncertainty, and safety boundaries. Read `AGENTS.md` and the matching `references/` files when carrying out substantial work.

## Full search technical audit
1. Prove public origin, DNS, TLS, response codes (200 real pages; 301/308 chosen host; 404/410 missing; no soft-404), valid redirects and crawlable HTML.
2. Check raw HTML with JavaScript disabled: useful content, unique title/H1, text summary, real `<a href>` navigation, alt where relevant, canonical and indexability. Then compare fully rendered DOM and user workflow.
3. Check robots directives for each important crawler using proper group semantics, `noindex` and `X-Robots-Tag` conflicts, canonical collision, parameters, sessions, trailing slash, hreflang/locale conflicts and sitemap inclusion.
4. Sitemaps list only desired canonical/indexable pages; correct absolute host, accurate lastmod, correct `.xml` or sitemap index configured in actual Astro build. Google Search Console/Bing ownership and URL Inspection verify indexed state.
5. Validate proper structured data **supported by real page content** and Google's eligible rich-result features; distinguish Schema.org properties from actual Google rich-result support. No invented rating values, unsupported FAQ markup or AI-only schema claims.
6. Real mobile usability; Core Web Vitals LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 at p75 from field observations; synthetic PageSpeed is diagnostic, not proof of field performance. Test responsive controls and worker interactions.
7. Optimize image/video URLs, file size, original evidence, alt, src, license where appropriate and indexing; inspect Google Images traffic separately.
8. Check manual actions, security issues, site migration/redirect changes, log bot responses, CDN challenges; avoid chasing “crawl budget” fixes on tiny sites without evidence.
9. Build dynamic action plan: symptom → test → root cause → repair → re-inspect. Indexing/ranking not guaranteed by a PASS.

## Commands and artifacts
`node scripts/audit-static-site.mjs --dist ./dist --origin https://yourdomain`, then live tests after deployment, Search Console URL Inspection and source registry. `references/search-technical.md` details each layer.

## Expanded technical operations (v2.2)
Read chapters 11–14 and 17–18 for browser protocol, search indexing and SERP tests. Diagnose by first failed observable gate (DNS/TLS/HTTP/robots/WAF -> HTML/render -> canonical/index -> retrieval/position -> SERP click opportunity -> task completion). Current Google documentation, not static checklist, governs eligible rich-result types and 2026 deprecations. Validate important browser DOM and no-JS/initial HTML separately, and treat search console property observations as external to local audit. For new crawler families and Microsoft 2027 preferences, do NOT blindly rewrite production robots.

## V2.3 production evidence contract (audited 2026-11-23)
**Owner:** Actual crawl/render/index technical audit. **Routing:** web-search-internals teaches generic algorithms; this audits deployed pages.
**Official source entry points requiring action-time reopening:** https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec;https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls;https://www.rfc-editor.org/info/rfc9309/. A saved link is not confirmation of the current provider rule.
**Evidence needed:** Owned HTTP lab + actual live URL Inspection, status, canonical/robots and indexed visibility if account connected.
**Critical FAIL / UNKNOWN:** Do not declare index/AI visibility from static HTML and robots alone.
**Mandatory freshness procedure:** Read docs/foundations/19-provider-source-verification.md and docs/RESEARCH_PROTOCOL.md. Re-open official body, log exact applicable claim, evidence date, announced versus effective status, geography/account and contradiction. Use sources/verified_claims.json only as a dated baseline; source watch hashes are not semantic verification. Record tests/actual results, open blockers and rollback; do not infer live indexing, AI citations or AdSense revenue from local tests.


## 2026-11-23 validated URL path versus navigation depth correction
**Trigger:** Agent asserts that `/mp4-to-mp3` outranks `/tools/audio/mp4-to-mp3` because it sits immediately below the domain, or recommends bulk flattening URLs for "PageRank".
**Current primary sources:** https://developers.google.com/search/docs/fundamentals/seo-starter-guide ; https://developers.google.com/search/docs/crawling-indexing/links-crawlable ; https://developers.google.com/search/docs/crawling-indexing/url-structure ; https://developers.google.com/search/docs/essentials/spam-policies . Reopen before consequential production architecture changes.
**DO NOT:** Claim URL segment count is an independently verified ranking boost. Google says domain and path keywords alone have hardly any ranking effect, and grouping many URLs into meaningful directories can help crawler management.
**DO:** Measure (A) URL path segments; (B) actual HTML link-graph distance from top-level navigation; (C) inlinks, contextual anchor clarity, orphaning; (D) canonical/indexability; (E) genuine distinct user job and validated output. These dimensions are independent. Run `node scripts/url-architecture-reference-lab.mjs` and `node --test tests/url-architecture-reference-lab.test.mjs` for a REFERENCE demonstration (not Googlebot/rank reproduction).
**Page factory rejection:** Block URL generation based only on source/target keyword permutations. Every candidate route must implement the specific converter functionality, surface supported formats and real results/errors, use a stable canonical, avoid parameter/locale duplicates, and help users reach related tasks without excessive auto-generated link lists.
**Evidence scope:** A 1-click route with a longer pathname can be easier to discover than a 3-click root path. Only owner Search Console and dated live search observation can establish actual indexing/position; these do NOT establish URL path causality without a controlled study. See docs/research/04-user-teardown-google-ai-url-causality-audit-2026-11-23.md.

## V6 production and research handoff (2026-11-23)
Use web-search-forensic-evidence before treating NavBoost/Q*/Trawler/leaked API or patents as controlled ranking weights. Crawl/render/index and Search Console are observable; Google AI Mode indexed+snippet gate and no llms.txt requirement are documented. docs/v6/01-search-rank-forensics.md.

## V11 — Evidence-first technical SEO master gate
Read `docs/seo-master/02-technical-fullstack.md` and `docs/seo-master/04-evidence-and-sandbox.md`. Gate *actual* public HTTP/TLS/redirect/404, initial versus rendered HTML, canonical selection, robots crawl versus noindex index-control, real internal link graph, sitemap current canonical URLs, supported visible structured data, mobile and WCAG, and **field** CWV (LCP <=2.5s, INP <=200ms, CLS <=0.1 at p75). Distinguish metadata/static fixtures from external Google URL Inspection/index state. Never infer traffic/rank from a local pass. Audit the real project's route manifest (not assumed example converter URLs); check ad experience separately. Deliberately mutate robots/canonical/noindex/sitemap/H1/links to verify regression detection. **Security/functional output and hosted Googlebot tests remain independent.**

### V11 project-specific live HTTP command
The live tester must now be passed the actual project page map rather than hardcoded sample converter routes: `node scripts/audit-live-site.mjs --origin https://your-domain/ --authorized-origin https://your-domain --routes-file project-live-routes.json --out live-evidence.json`. Do not pass the synthetic fixture example to a real release. HTTP PASS is not indexing or interactive tool success.
