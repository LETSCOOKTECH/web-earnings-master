# Codex operating guide — Web Earnings Master

**Purpose:** Help LetsCookTech build and operate legitimate, high-value, monetizable websites across the portfolio. Treat this as a flexible operating guide, not a rigid prompt that overrides evidence, legal policy or the current user request.

## Current technical research routes (v2.2)
Use docs/foundations/README.md to select one or two modules; do not inject the entire field manual for minor tasks.
- Chromium/Gecko/WebKit process, renderer, JS, caches, storage, permissions: chapter 11 + web-browser-runtime.
- DNS/HTTP/TLS/QUIC/CDN correctness and failures: chapter 12 + web-browser-runtime/web-domain-operations.
- Generic inverted index, BM25, PageRank, semantic/hybrid search, evaluation: chapter 13 + web-search-internals. TOY implementations are not Google's or Bing's algorithm.
- Actual provider atlas incl Google, Bing, Brave, DuckDuckGo, Kagi, Mojeek, Yandex, Baidu, Naver, Seznam: chapter 14.
- Generative search RAG, grounding, retrieval, citations and browser agents: chapter 15 + web-ai-retrieval-lab.
- 2026-2027 change/effective-date ledger: chapter 16; in particular Microsoft future grounding controls and Google Preferred Sources.
- Complete technical SEO/AEO/GEO/vertical/product outcomes: chapter 17 + web-search-visibility-systems.
- Negative tests and evidence gates: chapter 18.

**Latest-source mandate:** For every material claim, consult the pinned official watch targets sources/foundation_refresh_targets.json and live first-party body. Run node scripts/watch-official-updates.mjs offline to validate, or --live to produce reachability/hash review queue. New .github/workflows/foundation-source-watch.yml polls selected provider URLs DAILY only after it is merged to default branch; it does not reinterpret provider rules or automatically edit policy. When reports indicate change, REVIEW source and update ledger/evals with actual scope. When a provider page is blocked/429, report UNKNOWN, not fabricated confirmation. The draft PR's schedule is not active.

## Before changing anything
1. Identify the job: market research, existing-site audit, feature build, optimization, publisher application, or analytics diagnosis.
2. Read the directly relevant skill(s) under `.agents/skills/`, followed by `docs/START_HERE.md` and the minimum necessary reference files. Do not inject all skills simultaneously.
3. Browse current authoritative source(s) listed in `sources/official_sources.json`; inspect the provider's live policy text; record checked date and whether it applies to this site's country, content, device, account and ad formats. Consult `learning/` only for supplementary training, not normative compliance.
4. If current evidence contradicts stored material, preserve the conflict, update the source ledger, and follow the authoritative current applicable rule.
5. For external metrics collect date, location, device, search engine, query definition, source, methodology and uncertainty. No invented traffic volume, KD, CPC, CTR, ad RPM or ranks.

## Priority principles
- Human-value and legal/publisher safety first. Never deploy scripts that imitate download buttons, create unwanted redirects, auto-click ads, fabricate reviews, scrape protected content, or mass-create doorway pages.
- Security/privacy first: files stay local when feasible; limit input size, sanitize output and do not collect filenames/contents without need. No secrets in repo or telemetry.
- Do not assume fixed article counts, word counts, minimum traffic, or domain age are universal AdSense rules.
- Technical SEO establishes eligibility, not rankings; Google AI Mode/Overviews follow Search fundamentals; third-party AI crawlers have separate published policies. Do not add bogus AI-only schema or promise llms.txt boosts.
- Preserve useable site architecture and tests. New skill rules should be evidence-responsive; do not blindly add every tactic to every website.
- Keep search-crawler policy distinct from model-training permission. Do not allow unverified bot user agents through the WAF.
- Publisher policies, local law and consent requirements outrank monetization experiments. Ads may not interfere with the primary tool workflow.

## Foundation skills (deep mechanisms, invoke only when needed)
For baseline mechanisms and controlled reverse engineering, consult docs/foundations/README.md and:
- Browser networking, HTTP/TLS, JS rendering, caches and workers -> web-browser-runtime.
- Domains, TLD rules, DNS, registrar rights and migrations -> web-domain-operations.
- Crawl scheduling/index selection/search retrieval/ranking/vertical SERP questions -> web-search-internals.
- robots.txt, crawler identities, IP verification, WAF, training vs search access -> web-crawler-governance.
- Google AI Mode/Gemini, ChatGPT, Claude, Perplexity, Copilot and browser-agent retrieval/citation experiments -> web-ai-retrieval-lab.
- Cross-channel SEO/AEO/GEO strategy -> web-search-visibility-systems and then focused existing skills.
- Google Play/Apple App Store ranking/listing research -> web-app-store-discovery ONLY for actual app distribution.

**Foundation source gate:** Open actual latest first-party source body before policy/ranking decisions, check docs/foundations/09-source-refresh.md, and classify observed vs hypothetical mechanisms. sources/foundation_sources.json is a dated link/access registry, not perpetual policy verification. Never invent any hidden scoring model, source-provider partner, bot token, or universally effective strategy. Always report observed source URL, inspection date and what the evidence does not establish. Local HTTP link checks cannot validate legal, ranking or publisher rules.

## Skill router
- Fresh policy or missing fact → `web-research-freshness`.
- Which niche and why → `web-niche-validation`, `web-keyword-intent`, `web-competitor-audit`.
- What exactly to make → `web-product-spec`.
- Astro or frontend/backend implementation → `web-astro-engineering`, `web-security-performance`, `web-accessibility-agent-ux`.
- Google/Bing SEO → `web-technical-seo`, `web-content-and-image-seo`.
- Google AI Mode, ChatGPT, Perplexity, Claude, Bing Copilot → `web-ai-discovery`.
- Backlinks/referrals/research/media → `web-authority-distribution`.
- AdSense application → `web-adsense-readiness`; other networks → `web-network-monetization`.
- GDPR/CMP/cookies/legal compliance → `web-privacy-consent`; ad layout → `web-ad-experience`.
- QA → `web-product-validation`; analytics → `web-search-analytics`; testing acquisition changes → `web-experiments`.
- Release and scale → `web-launch-review`, `web-portfolio-growth`.

## Standard evidence artifact
For decisions use `templates/claim-ledger.csv`, `templates/niche-decision.md`, `templates/keyword-research.csv`, `templates/release-evidence.md`, and an evidence manifest. Every report contains: **question → sources and date → observations → inference/uncertainty → action → verification → rollback**. No unverified DONE/READY/PASSED claim.
