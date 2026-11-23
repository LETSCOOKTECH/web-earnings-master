# Master field-by-field knowledge map

Purpose: nothing essential gets silently ignored. This map is a **research coverage index**, not proof that every policy from every provider has been read exhaustively.

## Search intelligence
1. User jobs, search intent, tasks and output expectations; query variants vs new user journeys.
2. Seed keyword discovery: Google Trends (normalized), Keyword Planner (advertiser competition), Semrush/Ahrefs (modeled search volumes, KD, click estimates), Reddit/forums (pain evidence), Search Console (first party).
3. Demand by country, language, device, seasonality, algorithm update, branded vs non-branded, search features, zero-click effects.
4. Top 10 SERP reverse engineering: ranking pages, site vs page referring domains, content type, product utility, links, rich results, snippets, AI overviews, intent match, independent references.
5. Niche profitability: opportunity size, realistic obtainable clicks, ad viewability/consent mix, pageviews/visit, RPM by actual GEO, variable processing cost, support cost.

## Website architecture and product
6. Astro output modes, SSG vs SSR, islands, static HTML, integration with React/Svelte only where justified, metadata components and content collections.
7. Routing, canonical URLs, safe redirects, real 404/410, sitemap generation, XML validation, robots and noindex, security headers, caching/CDN/WAF and preview protection.
8. Browser processing, Web Workers, WASM, File API, streaming when feasible, cancellation, memory limits, batch processing, result validation and privacy.
9. UI/UX: visual hierarchy, compact usability, progressive enhancement, keyboard and screen reader access, contrast, touch targets, empty/loading/error states, reduced motion, mobile and agent-driven browser use.
10. SEO and performance tests: HTML snapshots, unit/integration/E2E, Lighthouse, field CWV, structured data validation, URL Inspection, log verification, rollback.

## Google Search, AI discovery and authority
11. Crawl, index, serve as distinct processes; rank systems, site-level quality, useful originality, link best practices, spam and scaled content limits.
12. On-page: titles, snippets, intent mapping, headings, answerable explanations, citations/evidence, semantic links, topical hierarchy, accurate data and revisions.
13. Images/videos: originals, licensing, alt, real src, efficient delivery, image sitemaps when needed, video watch pages when supported.
14. International: locale-specific real translation, hreflang, regional user needs; avoid auto-generated translations without quality review.
15. AI Mode and Overviews: Search eligibility, snippets, Search Console generative AI inclusion, source-worthiness, measurement; don't invent GEO tricks.
16. Separate bot and user fetchers: Googlebot, OAI-SearchBot/ChatGPT-User/GPTBot, Claude-SearchBot/Claude-User/ClaudeBot, PerplexityBot/Perplexity-User, Bingbot, Applebot, Brave/DuckDuckGo, CCBot, Google-Extended. Respect provider docs. WAF validation and crawler identity verification.
17. Source citation and agent usability: human-usable evidence, reproducible datasets, labels, stable controls, downloads, interaction states, no cloaking.
18. Authority/distribution: legitimate editor-reviewed mentions, OSS integration, useful newsletters/videos, community answers, responsible outreach, repeat-use loops, nonspam link building.

## Monetization, compliance, operations
19. AdSense: age, ownership, site controls, original value, content policies and restrictions, unsupported content/language, site review, account integrity, identity/payment, ads.txt, AdSense crawler.
20. Placement/invalid traffic: user-triggered ads, ad density, mislabeled links, download button proximity, accidental clicks, self-clicks, artificial/purchased traffic, interruptions and misleading popups.
21. Consent/privacy: GDPR/UK/Swiss TCF-certified CMP where required; US state laws, local jurisdiction, storage disclosures, third-party tags, children, user uploaded files and retention, cross-border transfer, tracking control.
22. Third parties: Monetag formats and compatibility; Raptive/Journey/Ezoic eligibility (current values checked at application); revenue shares, net terms, exclusivity, contracts, MCM, vendor ads.txt and revocation.
23. Measurement: GSC/Bing, event taxonomy, conversion funnels, retention, ad revenue/RPM/viewability, page speed, crawl errors, AI citation vs real referral, attribution and bot filtering.
24. Finance and risk: domain/hosting/DNS/CDN budgets, free-tier limits, adblock/consent impacts, taxation, chargebacks/invalid traffic adjustments, cash-flow and scaling decisions.
25. Governance: dated claim registry, policy-change alerts and changelogs, owner accountability, privacy/security incidents, automated tests plus manual approval evidence.

## Where the actual instructions live
Consult individual `.agents/skills/*/SKILL.md` for the workflow, `references/` for deeper checks, `templates/` for evidence collection, `scripts/` for reproducible checks, `learning/` for video/course resources, and `sources/` for authoritative links. Always reverify time-sensitive rules.

## New technical foundations (2026-11-23)
Use [foundation index](foundations/README.md) for full mechanics and tested uncertainty around networking, registries, HTTP/TLS/browser rendering, Google/Bing and partner search indexes, crawler permission, AI RAG/citations/agents, SEO/AEO/GEO and mobile app-store ASO. The accompanying seven new skills sit alongside—not in place of—the original 21 workflow skills. Review sources/foundation_sources.json at task time, run optional link health checks, and verify actual source text and owned-site results separately. This is NOT proof of hidden ranking weights or production adoption.

## Advanced browser/search research details
Each major system is now paired with a deep source-specific chapter: three browser engine lineages (11), network protocols (12), first-principles search IR algorithms (13), cross-engine index and partnership differences (14), AI retrieval/citations/agents (15), official updates and future-effective controls (16), full production technical/search operations (17), adversarial evaluation coverage (18). Distinguish source-based published mechanism, open-source algorithm, local toy demonstration, external search observation and live site owner evidence; they are NOT equivalent. 26 watched official URLs and two Google changelog feeds provide automated reachability/hash signals after workflow merge, never automatic policy approval.


## v2.3 skill/evidence closure records
The original 21 skill bodies have been read and reviewed individually (see docs/audits/ORIGINAL_21_SKILLS_AUDIT_2026-11-23.md) and each contains a V2.3 production-evidence contract. Two additional foundation chapters cover first-party source semantics (19) and real owned HTTP/cross-browser laboratory (20). sources/verified_claims.json contains 48 dated provider assertions, plus 1 explicitly unverified Applebot source; 33 official URLs are watched for potential changes. No internal lab proves proprietary ranking algorithm weights, real Google/Bing indexation, AI source selection in external accounts or AdSense approval.


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
