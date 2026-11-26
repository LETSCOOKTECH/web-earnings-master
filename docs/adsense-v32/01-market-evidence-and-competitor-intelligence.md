# 01 — Market demand, keyword reality and competitor gap investigation

**Date:** 2026-11-26. **Owner:** web-opportunity-intelligence + web-competitor-audit. **Policy originals:** market/competitor entries in sources/adsense_growth_primary_atlas_v32.json.

## Real market denominators
- Registered domain count is neither indexed site count nor profitable AdSense publisher count.
- Domain creation, earliest Internet Archive snapshot, first indexed page, first seen by third-party crawler and launch date are different dates. Never infer 2-year/7-month age percentages globally from a tiny Google SERP study. Check sample frame, country, definition, date, survivorship, and uncertainty.
- Google Trends = normalized relative search-interest index, possibly sampled and noisy, not monthly searches. Zero can mean low sample size. Official: https://support.google.com/trends/answer/4365533 .
- Google Ads Keyword Planner monthly search and CPC ranges = advertising research, not organic keyword difficulty nor publisher RPM. Some functions require full authorized account/billing setup. Official: https://support.google.com/google-ads/answer/7337243 .
- Ahrefs/Semrush/Similarweb = modeled third-party rankings/visits, not owner-verified actual search clicks. DR is proprietary, not a Google ranking cutoff.
- Google Search Console = actual owned property Search clicks/impressions; reports are limited/anonymized and differ from analytics sessions and AdSense pageviews. Official: https://developers.google.com/search/docs/monitor-debug/search-console-start .

## Research funnel before building
Batch 30–50 hypotheses, but never launch 30–50 sites by default. Collect candidates from distinct originating evidence: direct user reports, forum support requests, relevant product negative reviews, software gaps, recurring professional tasks, format version transitions, authorized Trends exports, authorized Planner, owned GSC, real public SERPs, competitor documentation and same-input tests. Keep originating community complaints separate from recycled reposts.

For each hypothesis capture: real user, exact job and input/output, urgency/frequency, geos/languages/units, problem source and date, task duration and repeat use, existing alternatives (Search, native OS, spreadsheets, AI search, established websites, paid software), search demand by exact **unit**, current top sites, likely ad suitability, server cost and privacy risks. Record the cheapest falsification experiment.

### Keyword intent
Classify DO (needs a working tool), KNOW (answer may be solved on SERP), EVALUATE (buy/compare), NAVIGATE (existing brand), REPEAT (habit/task frequency). A high keyword volume with no reason to click a website can be worse than modest demand for a task that must generate an export. Group equivalent queries under **one canonical task** where appropriate. Publishing near-identical numbered pages to capture synonyms and query fan-out creates doorway/scale risks.

### Live SERP audit schema
For each shortlisted task: date, target country/language, device and viewport, clean-query context, all relevant result features (ads, AI Overviews, AI Mode, Google calculator, videos), current competing URLs, visible results, task match, navigational intent, whether direct result completes the user's job, distinctive search snippet and counterexamples. **No invented SERP position from an LLM response.** Keep image/screenshot if legally accessible. Never imply a public SERP scrape authorizes a browser farm or synthetic Google interactions.

## Competitor same-input laboratory
Test at least three distinct alternatives, including non-web substitute when relevant, using the *same* fixture IDs. Required classes: NORMAL, MALFORMED and BOUNDARY. Additional cases: Unicode/RTL, locale separators, rounding, 64-bit integers, large files, missing values, sensitive data, empty input, mobile, keyboard, failures, output download and offline. Document exact expected result from independent oracle, every competitor's actual observed result, browser/device, screenshot or file receipt, measured latency, disclosure, perceived friction, existing feature that contradicts the claimed weakness and source date.

A competitor brochure or traffic estimate is not an observation of functionality. If incumbents already satisfy the real task, **reject the weakness claim**; do not build an indistinguishable clone because its domain rating is low.

## AI substitution test
Execute the real job on at least: current Google search/AI surface if available, capable LLM, browser/OS/spreadsheet alternative, and best three existing web tools. Compare result accuracy, downloadable artifacts, batch size, privacy, constraints, repeat workflows, errors and user's time. Do not assume AI cannot make tools; Google has developed in-search interactive experiences. Conversely, a correct AI answer does not guarantee stable output for complex, high-stakes, large-file operations. Evidence determines vulnerability.

## Decision rubric — no arbitrary 100/100 SEO score
- Demand: at least two independent source origins including a real human-need signal and applicable search evidence.
- Reachable traffic: search intent genuinely requires visiting/using software.
- Competitor gap: three same-input tests, important repeatable shortcoming, and explicit strongest counterexample.
- Differentiation: measurable original value, not a visually different form or thin blog filler.
- Engineering: precise independent output oracle, feasible implementation, secure handling, bounded costs.
- AdSense: valuable original publishing, nondeceptive ad areas, real legal eligibility, no spam.
- Unit economics: scenario assumptions clearly not real RPM, uncertainty acknowledged.

### Falsification example
Claim: "Timetable generation for X academic board is underserved." Try to disprove by locating viable platforms, testing actual class/teacher/room collisions, export/print and local language with the same fixtures. If users already have an adequate free service and no organic click reason, stop. If a specific verified painful gap exists, recruit pilot users to validate it **before implementation**.

## Primary and research integrity
Google 2026 AI guidance explicitly warns against separate pages for every possible fan-out query to manipulate search. Google spam policies ban doorway and scaled abuse. Official originals:
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://developers.google.com/search/docs/essentials/spam-policies
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide

The supplied YouTube transcripts are hypothesis inputs, not verifiable income, exact worldwide competition, search ranking guarantees or current publisher policy. Any unsupported tool traffic number remains THIRD_PARTY_ESTIMATE, not ACTUAL.
