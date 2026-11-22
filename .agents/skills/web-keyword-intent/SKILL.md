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
