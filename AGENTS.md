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


## Mandatory v2.3 evidence and runtime test gate
**Before ALL consequential browser, SEO, search crawler, AI retrieval, source-policy, AdSense, security or launch decisions:** Read [verified first-party claim ledger](sources/verified_claims.json), [33 watched official sources](sources/foundation_refresh_targets.json), [source-verification contract](docs/foundations/19-provider-source-verification.md) and affected original skill's V2.3 production evidence contract; **open current primary source in this work session**. A link hash, static registry or previous session does not verify a current rule. Check exact scope, effective date, rollout, conflict and account. Treat closed proprietary ranking internals as UNKNOWN. For change detection, use GitHub Actions official-source watch; scheduled checks create human-review issues, NEVER auto-edit policy files. Scheduled workflow only runs after merge to default branch.
**Run actual independent tests:** `npm test` including owned HTTP/robots fixtures and claim/21-skill audit; browser CI with pinned Playwright Chromium+Firefox+WebKit; real site and provider accounts separately. CI success only certifies its specific tests, not Search indexing, ranking, citations or publisher approval. Do not merge while failures remain. See docs/foundations/20-owned-web-lab-and-robots.md and docs/SECTION1_ACCEPTANCE.md.

## Mandatory task-time source freshness gate (v2.3.1)
For ANY consequential change to robots, crawling, AI data-use/grounding, publisher ads, privacy or Google/Bing eligibility, the responsible Codex agent MUST open the exact current official original body and produce a dated `records` artifact using `templates/action-time-source-evidence.example.json` as a shape only. Validate with `node scripts/require-action-time-sources.mjs --file <task-evidence.json> --claim-id <ID>` (repeat --claim-id for every material decision claim). Default max age: 24 hours. Every record must have original source, UTC check time, original passage (<=25 words), applicable surface, effectivity class and test/account evidence. Snippets, unknown Applebot body, stale files and announced-future Bing rules asserted as already active FAIL. The machine gate validates structure/recency and cannot prove a claim is semantically correct; actual source reading, external evidence, conflict resolution and approval remain mandatory. Never use the example JSON as live evidence.

## V4 dedicated AEO / GEO / ASO production decision routing (2026-11-23)
Invoke only the specialist needed, never all SEO manuals at once:
- **`web-aeo-answer-optimization`** → Google Featured Snippets, PAA, direct factual/procedural answers, answer quality, answer passage validation; index/rich-result eligibility via `web-technical-seo`.
- **`web-generative-engine-optimization`** → Google AI Mode/Overviews, ChatGPT Search, Perplexity, Claude Search, Bing Copilot citations, prompting panel and real AI referrals; crawler eligibility via `web-ai-discovery`, retrieval theory via `web-ai-retrieval-lab`.
- **`web-aso-google-play`** → real Android app Google Play keyword/title/description, keyword-targeted custom listings, device vitals, 2026 analytics and native experiments.
- **`web-aso-apple-app-store`** → iOS/iPadOS store Search; Apple 100 **UTF-8 byte** keywords, 30-char name/subtitle, 70 keyword-searchable custom product pages and native experiments.
- **`web-app-store-discovery`** routes mixed Play/Apple comparison and refuses store-ranking claims if only a website/PWA exists.
References: `docs/discovery/01-answer-engine-optimization.md` through `04-apple-app-store-aso.md`; research source evidence: `sources/discovery_provider_claims_2026-11-23.json`. Offline tools `scripts/audit-answer-page.mjs`, `audit-aso-listing.mjs`, `evaluate-ai-citations.mjs` are **bounded QA**, not actual provider rankings/approvals. Reopen primary docs before consequential changes. No fake ratings, click farms, keyword doorway pages or synthetic citations.

GEO provider coverage update: consult `docs/discovery/05-geo-provider-surface-atlas.md` / `sources/geo_provider_surface_atlas_2026-11-23.json` before asserting any assistant's crawler or ranking model. Some models have no verified public retrieval rule; mark UNKNOWN.

## V5 actual web utility architecture, functionality, costs and 1M-user scale
**Mandatory for any new product build:** Invoke `web-workload-architecture-router` before selecting Astro/React/hosting, then `web-browser-compute` for locally runnable jobs OR `web-conversion-job-platform` for consented remote CPU/GPU/AI. Use `web-hosting-vendor-evaluation` for plan/region/commercial-use and provider portability; `web-unit-economics-finops` for true per-successful-job economics; `web-scale-reliability` for latency, concurrency, queue saturation, load and cost-of-abuse; `web-product-validation` independently checks actual tool outputs. Do not use all six for a trivial explanation—route narrowly.
**Zero-cost myth:** Local browser compute can avoid *server transformation* cost, but website assets, analytics, storage, user battery, quality, development and support still cost something. 1M MAU is not 1M concurrent cloud transcodes. No claim of readiness without real peak load/low-end device/output and budget evidence.
**Commercial hosting:** Vercel Hobby officially restricts noncommercial use; GitHub Pages is not a free host for online business/commercial SaaS. Current plan conditions/AdSense business context must be verified before choosing "free" hosting. Supabase Auth MAU charges and Backblaze B2 egress/storage ratio can dominate apparent free savings.
**Executable gates:** `node scripts/assess-tool-architecture.mjs --file templates/architecture/tool-design-input.example.json`, `node scripts/model-tool-economics.mjs --scenario templates/architecture/scenarios/million-hybrid-file-tools.json`, `node scripts/evaluate-hosting-options.mjs --file templates/architecture/hosting-choice.example.json` and `node scripts/check-architecture-evidence.mjs`. No provider has been deployed/tested for 1M actual humans here. Read `docs/architecture/README.md` and dated official pricing before decisions.

## V6: complete production/research governance — 2026-11-23
Eight new specialist skills (46 total):
- `web-search-forensic-evidence`: trace Google ranking exhibits, Q*/NavBoost/RankEmbed/Trawler, source versus patents/leaks and current Search documentation; no guessed ranking weights.
- `web-fullstack-production-executor`: working tool and complete frontend/backend build, design, CI and deploy evidence.
- `web-frontend-experience-engineering`: correct user task UI, accessible initial HTML, browser results, quality of every page and ad UX.
- `web-backend-api-engineering`: secure typed endpoints, databases, queues, auth, storage, cost ceilings and remote processing.
- `web-security-assurance-asvs`: OWASP ASVS 5.0, Top 10:2025, file upload, SSRF/BOLA, dependency and ads third-party threat model; tests not checklists.
- `web-publisher-policy-eligibility`: AdSense site review distinct from ad inventory/page review, ads.txt, CMP, invalid traffic and human utility.
- `web-monetization-network-operator`: dated Raptive, Mediavine/Journey, Ezoic, Media.net, Freestar, Monetag, Adsterra, AdSense contract requirements; exclusivity/quality checks.
- `web-release-observability-operator`: canary rollback, monitoring, origin/crawl, privacy and ads readiness with first-party evidence.
Read `docs/v6/README.md`, `sources/v6_claims_2026-11-23.json` (45 priority uploaded claims) and `sources/v6_publisher_network_registry_2026-11-23.json` (15 business models).
Offline audits: `scripts/audit-publisher-page.mjs`, `scripts/evaluate-publisher-eligibility.mjs`, `scripts/audit-web-security-manifest.mjs`, `scripts/check-v6-evidence.mjs`. Neither research nor local CI establishes search ranking, publisher approval, security certification or real profit. Do not create low-value mass keyword pages or deceptive ad placements.

## V7 per-skill production acceptance (mandatory for all 46 active skills)
Read `docs/production-v7/README.md` and the relevant row in `sources/production_skills_v7.json` before declaring any skill output production ready. Run `npm run audit:production`; record task-specific local proof versus owned-site external proof separately. Unknown provider/account results remain PENDING or BLOCKED, never PASS. A green repository CI approves these instruction contracts only, never a publisher account or live Google rank. Do not deploy irreversible changes without authorization and human signoff.

## V8 Traffic Hunter — 47th skill (2026-11-23)
Use `web-traffic-hunter` for actual qualified visitor acquisition strategy across search, AI, creator video, Pinterest, communities, OSS, integrations, launch sites, legitimate institutions, newsletters, direct/referral and paid pilots. It owns **channel discovery, fit and execution routing**, not mass posting. Read `docs/traffic-hunter/README.md` and `sources/traffic_hunter_sources_2026_11_23.json`; reopen current platform primary policy before every publication/spend, and require explicit authorization. Run `npm run audit:traffic`; this is source/manifest QA, not achieved traffic. Never generate HN posts for publication, auto-post unsolicited Reddit/LinkedIn comments, buy clicks, encourage ad interactions, solicit Product Hunt upvotes, invent citations or treat followers as site traffic. `web-authority-distribution` handles links/editorial, `web-search-analytics` actual attribution, `web-experiments` causal tests, `web-unit-economics-finops` real economics, `web-privacy-consent` legal reviews. Repository routing count is now **47 active skills**, though on-site production evidence remains property-specific.

## V9 Opportunity Intelligence — 48th skill (2026-11-24)
Use `web-opportunity-intelligence` **before allocating development tokens to a new utility**. It first verifies the user's specific job and constraints, then routes permitted interactive browser/computer-use to Google Trends (relative/normalized, CSV), licensed Semrush/Ahrefs, Google Ads Keyword Planner, owned GSC, live SERPs, original public human problem sources (Reddit with access/license limitations), and current same-input competitor tests. Follow `docs/opportunity/README.md`, especially `01-computer-use.md` and `06-agent-governance.md`; reopen provider original policy at task time. No paid API or account action without authorization. Never pretend read-only browser tools performed clicks/exports; no scraping Reddit without prior consent or attempting CAPTCHA bypass. Output independent evidence + conflicting sources + capped resource use + cheapest falsification + TEST/PIVOT/REJECT/INSUFFICIENT or human-reviewed GO candidate. Run `npm run audit:opportunity` and `npm run audit:trends:sample`. These scripts certify local file consistency only, **not** actual user demand, live dashboard access or entitlement. All active skills: 48, each with per-skill production gates.


## V10–V19 execution assurance and hard verification routing (2026-11-24)
For substantial multi-skill work, **start at** `web-master-orchestrator` and `docs/execution-assurance/README.md`. Do not invoke every skill: choose 1–8 relevant specialists. The ten added focused skills are `web-master-orchestrator`, `web-market-intelligence-engine`, `web-competitive-gap-lab`, `web-production-factory`, `web-search-performance-lab`, `web-retention-intelligence`, `web-revenue-optimization`, `web-continuous-learning`, `web-independent-verification`, and `web-agent-adversarial-benchmark`. They complement rather than override 48 existing skills (58 total). For all consequential outcomes require a scoped receipt and run `npm run audit:assurance -- --file <actual-receipt.json>`. A passing structural receipt is **not** evidence authenticity, independent human approval, a live site or provider result. Independent verification must inspect source originals, developer reproduction and original human observations when relevant, actively look for contradictions and record access failures. Source snippets and duplicated reports cannot become verified policy or independent people. A task without authorized external access must remain BLOCKED/UNKNOWN; do not claim live execution. No autonomous merge, paid spending, mass outreach or production deployment. The validation suite is the gate for library contract changes; real outcomes demand separate external proofs.
