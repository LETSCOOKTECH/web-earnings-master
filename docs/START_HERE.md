# Practical runbook — from blank domain to measured business

This is the orchestration playbook. Skills are modular; execute the next highest-risk gate first and revisit earlier steps when evidence changes.

**Foundation prerequisite:** For underlying mechanics of browser/HTTP/DNS/TLS, ranking systems, multi-engine AI retrieval, crawler verification, GEO/AEO/SEO and mobile ASO, open [docs/foundations/README.md](foundations/README.md) and the specific dedicated skill. Before implementing fresh behavior inspect official documentation and record checked-at. The new foundation research is not a substitute for owned-site Search Console data or real index/citation outcomes.

**0. Specify the business:** audience/geos, exact user job, alternatives, consent regions, monetization priority, domain and cost envelope. Record baseline in `templates/site-brief.yaml`.

**1. Verify sources:** read official policies and changelogs at execution time, and create/update `templates/claim-ledger.csv`. If external access fails, label unverified and do not assert compliance. See `web-research-freshness`.

**2. Demand and SERP evidence:** list exact task/search queries, collect date-matched permitted keyword estimates and/or relative Trends interest (never invent absolute volumes), distinguish advertiser competition from SEO difficulty, inspect top 10 organic results (country/device), SERP features, source of traffic and queries with clicks; document whether Google answers the query without a click. Use GSC when existing site has impressions. Reject ideas with no practical acquisition angle.

**3. Competitor job tests:** attempt identical tasks on at least 3 relevant tools, including adverse cases and mobile if relevant. Record steps, time, actual outputs, pricing and trust problems. Only claim a gap if reproducible. Test original value of planned product.

**4. Build a working product:** create exact output specs, data handling/privacy requirements, edge cases and release criteria. Choose the workload architecture first: useful initial public HTML is essential for indexable explanations, but Astro is optional. Use browser-local/WASM where measured capability allows, and bounded server/queue processing when necessary. Test real file outputs, low-memory devices, error states and cancellation.

**5. Build discoverability into the product:** unique title/H1/intents, canonical, sitemap XML index, robots, noindex where necessary, semantic links, original evidence, accurate schema, original image examples, meaningful FAQ where genuinely helpful, Core Web Vitals and rendering tests. Never create near-duplicate pages solely for keyword variation.

**6. Configure AI/search access:** evaluate whether desired official search bots are permitted and genuinely verified at CDN/WAF; separate indexing, AI retrieval, model training and user-triggered agent access. Do not blindly allow unidentified user agents. Check Google generative AI Search Console inclusion controls, Bing AI reporting/preferences, and human/agent ability to use forms. Test real HTTP logs.

**7. Monetization/publisher safety:** verify 18+/ownership/account, legal content rights, original site value, privacy policy and regional CMP obligations; compare network terms, ad formats, ads.txt and contract restrictions. Preserve an ad-free working tool path, clearly distinguish ads from controls, eliminate popunders and deceptive interactions. Apply for AdSense when ready—no mythical mandatory traffic minimum.

**8. Launch gates:** `npm test`, build, static audit, live audit, mobile/keyboard/agent tests, real 404, CDN bot access, log review, AdSense prep evidence, credentials/secret scan; use `scripts/check-evidence.mjs` for self-attestation completeness, not a Google approval guarantee.

**9. Distribution:** publish legitimate demos and technically accurate guides, open-source a useful part when appropriate, contact relevant maintainers/educators or communities without link spam, encourage shareable results and returning users. Track first-party human task completion and qualified referrals.

**10. Weekly diagnostics:** compare GSC clicks and impressions, query clusters, ranking changes, Bing citations, AI referrals, tool conversion funnel, Core Web Vitals, ad revenue, RPM, geo and cost; form an experiment only when a concrete bottleneck is observed. Continue, improve, pivot or stop on evidence.

**11. Monthly portfolio review:** calculate gross margin and net operating costs per site, remove unproductive work, review policy deltas, update benchmarks, and expand only where actual usage or demand shows a need. No fixed number of sites or URLs.

**Hard stop**: if a provider changes policy, privacy is unresolved, a tool can silently corrupt data, or an ad creates deceptive UX, remediate before growth experiments.

## Deep search and browser research shortcut
See [deep foundation index](foundations/README.md). For how a browser works use chapters 11–12; for how retrieval/ranking works from first principles use chapter 13 and scripts/ir-reference-lab.mjs; for major worldwide search engines use chapter 14; for AI Search/agent grounding use chapter 15; for current 2026–27 policy updates use chapter 16; for integrated SEO/GEO/AEO runbook use chapter 17; for negative validation cases chapter 18. Run npm test and compare provider documents at the time of change. The source-watch cron is inactive until the draft PR is merged into default.


## v2.3 prerequisites for moving from research to deployment
Before claiming Search/revenue readiness read [Section 1 Acceptance](SECTION1_ACCEPTANCE.md), [dated source review](foundations/19-provider-source-verification.md), and [owned HTTP/browser lab](foundations/20-owned-web-lab-and-robots.md). `npm test` validates local contracts and HTTP cases; the separate browser Action validates Chromium, Firefox and WebKit with uploaded evidence when its actual run is green. Original 21 skills were individually audited and patched; active total 28. Current provider ledger: 48 dated selected claims, one Applebot source still unavailable, and 33 watched official pages/feeds. Product-specific Search Console, Bing and publisher account observations remain EXTERNAL evidence, not CI PASS.


## V4 dedicated AEO / GEO / ASO production decision routing (2026-11-23)
Invoke only the specialist needed, never all SEO manuals at once:
- **`web-aeo-answer-optimization`** → Google Featured Snippets, PAA, direct factual/procedural answers, answer quality, answer passage validation; index/rich-result eligibility via `web-technical-seo`.
- **`web-generative-engine-optimization`** → Google AI Mode/Overviews, ChatGPT Search, Perplexity, Claude Search, Bing Copilot citations, prompting panel and real AI referrals; crawler eligibility via `web-ai-discovery`, retrieval theory via `web-ai-retrieval-lab`.
- **`web-aso-google-play`** → real Android app Google Play keyword/title/description, keyword-targeted custom listings, device vitals, 2026 analytics and native experiments.
- **`web-aso-apple-app-store`** → iOS/iPadOS store Search; Apple 100 **UTF-8 byte** keywords, 30-char name/subtitle, 70 keyword-searchable custom product pages and native experiments.
- **`web-app-store-discovery`** routes mixed Play/Apple comparison and refuses store-ranking claims if only a website/PWA exists.
References: `docs/discovery/01-answer-engine-optimization.md` through `04-apple-app-store-aso.md`; research source evidence: `sources/discovery_provider_claims_2026-11-23.json`. Offline tools `scripts/audit-answer-page.mjs`, `audit-aso-listing.mjs`, `evaluate-ai-citations.mjs` are **bounded QA**, not actual provider rankings/approvals. Reopen primary docs before consequential changes. No fake ratings, click farms, keyword doorway pages or synthetic citations.

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

## V8 — Find actual people, not vanity traffic
Use `web-traffic-hunter` before deciding where to distribute a tested web utility. Hunt real public task signals, compare audience/channel fit and ethical rules, prepare 2–3 bounded evidence-scored pilot briefs, and attribute actual human task completions after authorized publication. See `docs/traffic-hunter/README.md`, `templates/traffic-hunter/` and `npm run audit:traffic`. No bot clicks, artificial impressions, link spam, unapproved automated posts, or imagined traffic numbers.

## V9 — Before coding, validate the market
Invoke `web-opportunity-intelligence` to check user-job authenticity, localized search demand and Trends, licensed Semrush/Ahrefs and Keyword Planner estimates, independent Reddit/forum issues where permitted, actual same-input competitor outputs and operating costs. Produce a decision with sources, contradictory evidence and cheapest pilot under explicit research credit budget. Reference `docs/opportunity/README.md`; no full-site build merely because a dashboard shows volume.


**V10–V19 required assurance route:** For a consequential multi-skill task, first use `node scripts/route-execution-skills.mjs DISCOVERY` (or another scoped stage), inspect `docs/execution-assurance/FIELD_MANUAL.md`, then create a task-specific receipt. Run `node scripts/check-execution-assurance.mjs --file <receipt.json> --verify-artifacts --artifact-root <approved-root>` for real local evidence. Its PASS/ELIGIBLE_FOR_REVIEW outcome is a structured screening result, **not** third-party source authenticity or authorization. All external deployment/publishing/paid actions need explicit human approval.
