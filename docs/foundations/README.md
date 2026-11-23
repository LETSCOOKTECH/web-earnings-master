# Web Earnings Master: foundation system (versioned 2026-11-23)

This is a technical operating system, not a list of secret ranking tricks. Start here when a task crosses browser/network, crawler, search, generative answers, or app-store discovery boundaries. The original 21 skills remain applicable; these new foundational skills explain the mechanisms underneath them.

## Invariant pipeline
Human job -> accessible web document -> discovery -> crawler eligibility -> fetch -> render -> canonical/index choice -> query-dependent retrieval/ranking -> result presentation or generative citation -> actual human referral -> verified task completion -> permitted monetization -> net income.

Every arrow has separate failure modes and evidence. Never call a site "rank-ready" based only on HTML checks, and never count a bot fetch as a user. No one outside search-provider systems can know every proprietary feature or exact ranking weight.

## Deep reference order
1. [Browser, HTTP and runtime](01-browser-http-runtime.md): DNS to rendering, caching, JS, security, logs and experiments.
2. [Domain, DNS, TLD and operations](02-domain-dns-tlds.md): ownership, registration, hierarchy, geo, migrations.
3. [Search-engine internals](03-search-engine-internals.md): frontier to SERP, Google/Bing/independent and partner indices, failure diagnosis.
4. [Crawlers and control planes](04-crawlers-robots-control.md): exact bot purposes, REP, noindex, WAF, proof of identity.
5. [AI search, retrieval and agents](05-ai-retrieval-agents.md): citations, grounding, search sources, source-worthiness and agent usability.
6. [SEO / AEO / GEO engineering](06-seo-aeo-geo.md): full requirements, competitive relevance, no unsupported universal "AI tricks".
7. [ASO and alternative discovery](07-aso-discovery.md): only when an actual app is shipped; local, vertical, social and multimedia search.
8. [Reverse-engineering & measurement](08-experimental-reverse-engineering.md): legal black-box experiments and causal limits.
9. [Live-source refresh & contradiction protocol](09-source-refresh.md): automatic *link checks* + mandatory human/agent *semantic* rereview, dated provenance.
10. [Knowledge validation and failure fixtures](10-operational-evaluations.md): acceptance gates and red-team examples.

## Skill routing
- Network rendering/request defect -> web-browser-runtime.
- Domain, registrar, TLD or DNS -> web-domain-operations.
- Why crawler/index/ranking differs -> web-search-internals.
- Robots.txt, bot identity, purpose token or WAF -> web-crawler-governance.
- AI grounding, citation experiments, agent access -> web-ai-retrieval-lab.
- Cross-engine SEO/AEO/GEO planning -> web-search-visibility-systems, then existing web-technical-seo/web-ai-discovery.
- App Store / Google Play discovery -> web-app-store-discovery.
- Every consequential change -> existing web-research-freshness, plus 09-source-refresh.md.

Use the few relevant skills, not all of them in every prompt. Register claims with source scope and checked-at date, prove actual tool results, and escalate unknown internal algorithms instead of guessing.

## Provenance and limits
This version is a first foundation expansion from the project continuity handoff dated 2026-11-23. It is not a line-by-line reconstruction of Google/Bing/AI vendor internals. Each substantive provider assertion cites first-party URLs in the associated document; the verification inventory is in sources/foundation_sources.json. Link existence, live policy semantics, account rollout and production results are different evidence categories. Changes enter a branch and require validation and review before main.

## Advanced technical modules 11–18 (v2.2, 2026-11-23)
11. [Browser engine internals and process architecture](11-browser-engine-deep-dive.md): Chromium/Blink/V8 vs Firefox/Gecko/Necko/SpiderMonkey vs Safari/WebKit/WebCore/JavaScriptCore; navigation, BFCache, rendering, security and agent use.
12. [Transport and network internals](12-network-protocols-internals.md): DNS delegation, TLS, HTTP1/2/3, QUIC, caches, CDN, origin, correct response and failures.
13. [IR and ranking engineering lab](13-information-retrieval-ranking-lab.md): inverted indexes, BM25, lexical vs vector, fusion, PageRank, multi-stage ranking and NDCG. Educational reference methods, NOT proprietary Search internals.
14. [Global engine/provider atlas](14-search-engine-provider-atlas.md): Google, Bing, DuckDuckGo, Brave, Kagi, Mojeek, Yandex, Baidu, Naver, Seznam, Apple, relevant partner and AI engines. Explicit UNKNOWN for unverified current partnerships.
15. [AI retrieval and agent internals](15-generative-retrieval-agent-internals.md): grounding, source selection, RAG, tools, citation errors, browser operation, WebMCP and attribution.
16. [Modern changes and future controls](16-modern-search-changes-2026-2027.md): dated provider changes, Microsoft 2027 training/grounding effective dates, Google AI/Preferred Sources and IETF draft status.
17. [Production SEO/AEO/GEO operations](17-operational-seo-and-distribution.md): intent, crawl/index, content/media/structured data, international, ranking, attribution, safe growth.
18. [Adversarial test and evidence matrix](18-complete-engineering-evaluation-matrix.md): >100 specified failure cases; **specified cases are NOT all executed**.

### Run the reproducible reference lab
- node scripts/ir-reference-lab.mjs : lexical scoring/term postings/RRF/PageRank toy demonstration, NEVER Google/Bing score.
- node scripts/watch-official-updates.mjs : validates source watch manifest OFFLINE.
- node scripts/watch-official-updates.mjs --live --limit 8 : accesses pinned official pages, reports changed hashes, HTTP errors/unknowns; do not infer semantic policy.
- npm test : local tests, not live Google index evidence.
- A separate daily GitHub Actions source-watcher workflow becomes operational only when it is present on the default branch. On this draft PR it is not scheduled; launch approval is a separate action.

### Evidence labels and uncertainty
Provider-doc-excerpt / original-body-inspected / scholarly reference / locally reproduced / first-party production observed / inferred / unknown. An IETF Internet-Draft is not an Internet Standard. A future effective date is not current compliance. A link health check is not a policy change. Open the actual updated provider text at task time.


## Release v2.3 — verification and owned executable behavior
19. [First-party source and change governance](19-provider-source-verification.md): claim evidence E0–E5, 48 dated first-party selected claims, one explicitly unverified, 33 monitored current documents, per-action mandatory live source reading, semantic review, correction and effective dates. The monitor creates a review queue only when the Actions workflow is running from default branch; a fingerprint is NOT a policy.
20. [Actual owned HTTP and browser lab](20-owned-web-lab-and-robots.md): real Node server cases for redirects, 404/soft404, canonical vs noindex, robots, ETag, private 401, JavaScript hydration, CSP, and testable cross-browser Chromium, Firefox and WebKit.
[Section 1 evaluation and outstanding external limits](../SECTION1_ACCEPTANCE.md) and [21 original skill audit](../audits/ORIGINAL_21_SKILLS_AUDIT_2026-11-23.md).

**Run:** `npm test` (local HTTP/robots and skill/source checks), `npm run audit:research` (contracts), `npm run lab:browsers` (needs pinned Playwright; CI separate), `node scripts/watch-official-updates.mjs --live --limit 8` (source fetch/changed hash only).
