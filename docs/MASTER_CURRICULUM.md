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
