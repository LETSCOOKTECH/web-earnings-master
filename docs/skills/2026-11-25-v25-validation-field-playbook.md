# Sense V25 — Astro engineering, evidence-based opportunity hunting and deep site inspection

**Audit date:** 2026-11-25. **Scope:** 50 existing active Sense skills; targeted hardening of Astro, research, competitor intelligence and release evidence. **Status:** branch-validated code and methodology, not globally proven agent behavior or actual monetization. Run live original-source checks for every production-relevant policy, price and technology version.

## 1 — What "best tool" actually means

An agent cannot choose the highest-potential web utility by applying a keyword difficulty or CPC threshold. Its candidate must describe a single human job, customer, actual input, independently verifiable result, failures, usage recurrence and acquisition strategy. Rank *research work* by strength of independent evidence and cheapest falsification, never by invented market value. Identify substitutes including OS, Chrome extension, PDF editor, office suite, AI chat, built-in browser options and dominant paid/free websites. Preserve contradictory user observations and top incumbent advantages.

**Demand evidence sources and metric grains:** Google Trends 0–100 is normalized interest within the selected comparison and geography, not volume; licensed Semrush/Ahrefs/Keyword Planner volumes are estimates with provider-specific definitions; Ad CPC is not publisher RPM; Search Console/GA4 is only for an owned authorized property; reviews/forums are independent pain hypotheses until reproduced; a large sitemap is not users or revenue. Duplicated originating threads do not create independent populations. Record original URL, observation date, query/time/locale/provider, method, artifact and access status. Never submit fake provider exports.

### Runnable research batch

Use the full v1 evidence template from `templates/opportunity/idea.example.json` for each idea. Wrap one to thirty plans:
```json
{
  "schema": "sense-tool-hunter-v25",
  "candidates": [
    {"id": "image_limits", "evidence_source": "SYNTHETIC_TEST", "plan": {"schema":"sense-opportunity-v1"}}
  ]
}
```
The abbreviated `plan` above is *only a shape illustration* and fails the full v1 audit. To run full local examples, include all fields in the existing template and use `huntWebTools()` from `scripts/hunt-web-tools-v25.mjs`. The tool imports `assessOpportunity` and `checkSource`; it validates scope and counts **structurally valid** support groups by pillar. It returns `SYNTHETIC_ONLY`, `RESEARCH_REQUIRED`, `INVALID`, `POLICY_STOP` or `HUMAN_REVIEW` but cannot authenticate a source receipt or grant automatic build authorization. Research priority is not a verified user demand/earning ranking.

**Six independent pillars:** demand, human_pain, competition, distribution, feasibility and economics. Missing authentic opportunity evidence means `TEST_FIRST`, not a new generalized tool page. Independent normal/malformed/adversarial comparison is mandatory before declaring an incumbent broken.

## 2 — Website inspection: permitted, scoped and honest

Use `docs/website-intelligence/README.md` and `scripts/site-intelligence.mjs` as the **only** authorized read-only public-site crawler code in Sense. First import permitted search leads with source provenance; compare geography and search intent; inspect operator-selected HTTPS origin after terms/robots review. Use its nested sitemaps, observed static HTML graph, URLs, canonical/noindex, form/asset clues, declared HTTP headers, capped DNS/TLS and size/time budgets, optional sanitized HAR and offline rendered DOM. Do not invent a backend, exfiltrate source, bypass paywall/login/CAPTCHA, scrape disallowed SERPs or claim full coverage.

Then run `analyzeSiteDepth(report)` from `scripts/analyze-site-depth-v25.mjs` on a saved V24 JSON report. Its findings distinguish *direct observed* non-200 sitemap targets, noindex, duplicate titles, missing metadata, malformed/cross-origin canonical and sampled broken link responses from *hypotheses* such as possible unlinked sitemap pages. A partial crawl must never turn into a site's total page count. An empty H1 is not evidence of a broken JavaScript UI; compare authorized rendered DOM and actual user tasks separately. A sitemap entry never proves indexing or SEO performance.

**Output chain:** source leads → legal allowed scan → machine evidence report → optional offline HAR/rendered DOM → `analyzeSiteDepth` → same-input browser/output comparison → ten V24 specialist evidence handoffs → PRD only when opportunity evidence supports build.

## 3 — Astro engineering acceptance: official Astro 7, independent oracles

Current official config `output` is **static or server**; the old hybrid mode is not the current setting. For a mostly static site, use the default static route generation and opt out on a route with `export const prerender = false` only if an appropriate SSR adapter is installed. For a mostly dynamic site, `output:'server'` with an adapter and individually `prerender=true` where useful. **No Astro version is a guaranteed SEO boost.**

Run `auditAstroProject()` from `scripts/audit-astro-v25.mjs` after checking the actual resolved Astro version. This local gate finds obsolete output, missing server adapters, invalid built-page shell, missing public origin and other source/built-HTML issues. Computed `output` or route-level `prerender` expressions are explicitly `HOLD_DYNAMIC_CONFIG_UNRESOLVED`; there is no misleading default-to-static declaration. Actual `output:'server'` without `dist/*.html` requires an independent SSR runtime smoke, not a false static build failure. It is a *subset* diagnostic: full dynamic builds may emit routes into a server bundle rather than `dist/*.html`, so an adapter-specific deployment and SSR smoke must be independently verified. Run the existing Astro clean-room workflow, `npm ci`, `npm run check`, `npm run build`, `npm test`, three browser engines and exact output byte tests. For owned public HTML, run `scripts/audit-static-site.mjs` as well; release requires real owner domain and external HTTP, permissions, security, accessibility, traffic and publisher evidence.

Architecture decision packet per idea: public HTML routes, user job and oracle, client island and JS cost budget, trusted input/batch size, CPU/memory/lifetime and cancellation, upload privacy, storage TTL, SSR/edge/queue cost, caching and fallback, CSP/cookies/ad consent, locale/metadata and failure UI. Consider a non-Astro full app when user workflow genuinely needs it. Use `docs/architecture/01-workload-placement-decision.md` and `docs/quality/real-world-release-contract-v20.md`.

## 4 — Authority and what is **not** validated by repository CI

- Astro SSR/config: https://docs.astro.build/en/guides/on-demand-rendering/ ; https://docs.astro.build/en/reference/configuration-reference/
- Astro testing: https://docs.astro.build/en/guides/testing/
- Astro content collections: https://docs.astro.build/en/guides/content-collections/
- Google Trends normalization: https://support.google.com/trends/answer/4365533
- Google Search sitemap eligibility: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- Google Search 2026 updates: https://developers.google.com/search/updates
- OWASP SSRF prevention: https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html

**Unverified:** complete semantic correctness of all 50 skill manuals, identical results on unknown real websites, sustained external search traffic, AI citation/recommendation gains, AdSense/network account approval, publisher RPM, profit and 1M-user load tests. A successful Node unit/fixture build proves its bounded cases only. For every expensive or risky action, log owner permission and fresh official document, and require actual external/field observations before calling a result production ready.
