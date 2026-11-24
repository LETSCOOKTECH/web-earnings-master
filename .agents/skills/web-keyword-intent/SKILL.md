---
name: web-keyword-intent
description: "Map query clusters to distinct high-value tool pages; use Google Trends, Search Console, Semrush/Ahrefs and SERP evidence without doorway or keyword-stuffing tactics."
---

# Keyword Intent

**Use when:** Map query clusters to distinct high-value tool pages; use Google Trends, Search Console, Semrush/Ahrefs and SERP evidence without doorway or keyword-stuffing tactics.

**Workflow contract:** Follow the next steps proportionally to the request. Prefer current primary sources to saved claims. Adapt the sequence when evidence suggests a better route; do not overbuild a minor task. Show exact verification, uncertainty, and safety boundaries. Read `AGENTS.md` and the matching `references/` files when carrying out substantial work.

## Keyword-to-page workflow
1. Start from validated user jobs, not a target number of keywords or pages. Build canonical intent clusters: verb/action, format, constraint, audience, error symptom. Example: bulk image resize is distinct from basic single-image resize; 20KB vs 30KB usually belongs in one capable compressor page.
2. Sources: Search Console queries/pages (ground truth on own properties), Google Trends (normalized interest not absolute search count), Google Ads Keyword Planner (ranges and advertiser competition), third-party volume/KD as estimates, top-ten search results as product and SERP evidence.
3. For every candidate query collect country, language, device, 12-month trend, monthly estimates, SERP intent and feature profile (ads, video, image, AI Overview, PAA), clicks where source offers it, competitor strengths and topical fit.
4. Group related terms when the *same tool interface and explanation* fully satisfy them; separate pages when user action, functionality or result differs materially. Avoid URL/parameter templates for tiny variations. Mark target keyword estimates that share intent as overlapping: don't sum them blindly.
5. Write one title/H1/URL intention per actual user job. Use synonyms naturally, clear explanations, real tasks/examples, edge cases and links to next relevant tool. Don't manufacture FAQ content, ratings, H2s, or artificial word counts.
6. Verify page uniqueness and cannibalization across existing URLs, including sitemap and canonical. If one page covers a family of queries, improve the page rather than create new duplicates. Assign primary and supporting intent, not a promise to rank for every term.
7. After launch: GSC impressions by query/URL → identify rising long-tail groups → improve example/feature → observe click/conversion changes. Create new pages only for a validated distinct job.

## Outputs
Intent map (`templates/keyword-research.csv`), page mapping (`templates/page-intent-map.csv`), rank/feature audit; explicit citations and source dates. Separate SEO difficulty estimate from a true controlled ranking experiment.

## V2.3 production evidence contract (audited 2026-11-23)
**Owner:** Real user search jobs mapped to distinct URLs. **Routing:** web-niche-validation decides task, keyword skill clusters queries.
**Official source entry points requiring action-time reopening:** https://support.google.com/webmasters/answer/7576553;https://trends.google.com/trends/. A saved link is not confirmation of the current provider rule.
**Evidence needed:** Current actual SERP/country/device and task grouping; no volume double-counting.
**Critical FAIL / UNKNOWN:** Trends scores not searches, advertiser competition not organic KD.
**Mandatory freshness procedure:** Read docs/foundations/19-provider-source-verification.md and docs/RESEARCH_PROTOCOL.md. Re-open official body, log exact applicable claim, evidence date, announced versus effective status, geography/account and contradiction. Use sources/verified_claims.json only as a dated baseline; source watch hashes are not semantic verification. Record tests/actual results, open blockers and rollback; do not infer live indexing, AI citations or AdSense revenue from local tests.

## V11 — Keyword research and evidence-enforced page mapping (2026-11-24)
**Mandatory manual:** `docs/seo-master/01-keyword-intelligence.md` and `docs/seo-master/03-policy-separation.md`. Start with a distinct human job and output oracle, current target-locale SERP and actual source-access scope. Triangulate licensed Google Ads Keyword Planner (estimated volume and **advertiser** competition), Google Trends normalized 0–100 (not searches), licensed Semrush/Ahrefs (modeled KD/competitor visits), allowed original user complaints, and verified owned GSC performance where accessible. Separate recorded versus estimated versus unobserved; source screenshot/export must have actually happened. **No invented keyword volume, CPC=AdSense RPM, Google rank formula, meta-keywords tactic or fixed keyword density.** Cluster synonyms sharing the same *working task* into one page; only distinct useful jobs earn new pages. Record geo/device/time, SERP features, AI no-click risk, competitor output, uncertainty and a map from target query to natural title/H1/main copy/anchor/proof and canonical. No doorway-scaled keyword factory.

## V12 anti-fabricated-demand cross-check
Before any programmatic SEO landing page, require actual user job and its working output fixture, correct geo/device intent and dated source scope. Google Trends is normalized relative sample, Keyword Planner volume/advertiser competition is estimated, Semrush/Ahrefs KD and competitor traffic are modeled and owner GSC is first-party for its property only. Agent may have NO_COMPLIANT_ACCESS to licensed providers: mark UNKNOWN rather than inventing volume or spending credits. No keyword density, meta keywords or guaranteed Google rank. Run scripts/audit-keyword-map.mjs and do not treat structural pass as measured demand. If the task is a site build, obey docs/seo-master/07-agent-execution-v12.md.

## V13 — Web-verified professional production protocol
Use V13 09-keyword-and-serp-mastery-v13.md + 08-live-source-verification-v13.md with exact current source receipts and real geo/device SERP. Run scripts/seo-keyword-provenance-v13.mjs and scripts/audit-keyword-map.mjs. Google Trends normalized 0–100, Planner advertiser estimates, modeled Semrush/Ahrefs volume/KD, owned GSC impressions and real SERP are distinct metric types. No invented source export, keyword density, advertiser CPC as AdSense RPM, doorway pages or fake Google ranking guarantees. Missing access = UNKNOWN. Reopen original Search spam and Keyword Planner docs at decision time.
