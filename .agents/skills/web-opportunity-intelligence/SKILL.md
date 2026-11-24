---
name: web-opportunity-intelligence
description: "Browser-first, evidence-driven market opportunity discovery and feasibility decisions. Use permitted computer-control of Google Trends, Semrush/Ahrefs, Keyword Planner, owned GSC, public SERPs and licensed or manually inspected community sources to validate demand, user pain, competitor gaps, distribution and cost before spending development tokens."
---

# Opportunity Intelligence — validate before coding

**Trigger:** A user requests the best website/app ideas, actual demand verification, Google Trends or Semrush browser research, human pain evidence, competition analysis, tech feasibility, ROI or a go/no-go decision before development.

**Owns:** independent source acquisition, browser research orchestration, market-data provenance, demand/pain/competition triangulation, feasibility/credit constraints, and evidence-backed concept selection. **Handoffs:** `web-niche-validation` for existing market rubrics, `web-competitor-audit` for live same-input teardowns, `web-traffic-hunter` for distribution pilots, `web-product-spec` for PRDs, `web-product-validation` for actual output, `web-unit-economics-finops` for operating cost. No implementation approval from a pretty spreadsheet.

## The four non-negotiable rules
1. A Google Trends index is **relative sampled interest**, not searches/month; 0 does not establish no demand. Semrush/Ahrefs competitor traffic is modeled and Google Keyword Planner advertiser competition is not SEO KD. Real user stories are not validated customer population data.
2. Count independent *originating evidence*, not search result URLs. Multiple sites copying one Reddit comment do not create independent demand. Preserve contradicting and negative information, scope, time and uncertainty.
3. Use browser/computer-control only when the actual tool supports interaction and platform rules permit it. Never bypass CAPTCHA, paywalls, WAF, account controls or rate limits. A read-only browser cannot be claimed to have clicked, searched or exported.
4. Save tokens/credits with a staged investigation: cheap falsification first, exhaustive research only for survivors, no paid API access, trials, subscriptions, remote posts or external spending without specific authorization.

## Required brief
Idea or goal; exact person and job (input → operation → verifiable output); geography, language and device; frequency/urgency and substitute; business/monetization model; founder skills and budget; privacy/rights/security; existing project and any owner-held traffic. Default research budget for triage **zero paid APIs**, up to 12 unique sources, 30 browser actions and 8 minutes of browser work where feasible, subject to user limits. These are project defaults, not promises or provider rate limits.

## Nine-stage autonomous workflow
0. **Capability + permission gate:** Inspect actual browser tool mode: interactive desktop, permitted Playwright, read-only tabs, public search or licensed API. Read `docs/opportunity/01-computer-use.md` and current provider terms. If account is not connected, prefer public pages or ask for a manual export; do not claim live Semrush account access or handle secrets.
1. **One actual job:** Define customer, input, output, real constraint, current alternative, usage frequency, distribution path, measurable advantage and top three falsification hypotheses. Avoid generating hundreds of generic ideas.
2. **Low-cost triage:** Sample public institutional requirement, Trends/search demand where possible, visible complaint or original issue, and current competing results. Identify fatal impossibility/policy risk early. Don't rule out long-tail just because Trends returns zero.
3. **Demand research:** Google Trends UI, same comparison context term/topic, geo, time, category and search type, seasonality, related queries, CSV/screenshot; optional official alpha API only with approved access. Where permitted, Google Ads Keyword Planner, Semrush/Ahrefs licensed keyword estimates, own GSC/Bing/GA4. Record each metric's unit, sampling and access state. See `02-provider-playbooks.md`.
4. **Human evidence:** Review independent relevant Reddit/forum/GitHub issues/Stack Overflow/app reviews in permitted mode, plus real consented interviews. Reproduce specific pain instead of treating anonymous testimonials as verified identity. No unauthorized Reddit automated scraping; commercial Reddit API use may require agreement. See `03-human-evidence.md`.
5. **SERP + substitutes:** Observe actual country/device/date and AI/ads/videos/features; test 2–4 rival products using identical, lawful fixtures for correctness, speed/steps, privacy, limits, pricing and errors. Compete against free built-in OS functions and incumbents, not only SEO score.
6. **Reality engineering/economics:** Propose smallest output oracle, browser vs cloud architecture, abuse/cost ceilings, accessibility, legal/privacy/AdSense and distribution. Calculate scenarios with explicit assumptions; no inferred ad RPM from advertiser CPC.
7. **Triangulate:** Deduplicate copied sources; measure time, geo, granularity and exact definition; include source contradictions, survivorship and response bias. Separate independently observed pain, estimated searches, obtainable clicks, product feasibility and paid economics.
8. **Decision:** `REJECT`, `PIVOT`, `TEST_FIRST`, `INSUFFICIENT_EVIDENCE`, or `GO_FOR_MVP` candidate only with actual direct user/market evidence, competitor reproduction, working output, credible acquisition and cost pilot, and human signoff. A JSON test cannot verify authenticity or independently authorize a build. Always provide cheapest next decisive experiment.
9. **Handoff:** Give owner a concise source ledger, screenshots/CSV paths, user pain clusters with counterexamples, comparable SERP evidence, tests, financial sensitivities, decision, remaining unknowns and tiny next pilot. Defer full build until justified.

## Access adapters
- **Google Trends** `https://trends.google.com/trends/explore/`: browser GUI plus documented downloadable CSV, same-filter comparisons; official Trends API remains alpha application-gated as of baseline.
- **Semrush**: licensed GUI Overview/Keyword Magic/Gap and actual page observations; API unit cost and restrictions separate. Preserve modeled traffic/volume estimates distinct from first-party.
- **Ahrefs**: licensed keyword/competitor metrics with own provider caveats, never silently mix KD methodologies.
- **Google Ads**: authorized Keyword Planner volume estimated and advertiser competition; no organic ranking prediction.
- **GSC, Bing, GA4**: owned/authorized data only; GSC rows may omit queries, clicks ≠ sessions.
- **SERPs and communities:** permitted public searches, independent reviews, issue trackers, newsletters, YouTube, app markets, institutional specifications, original documentation. The Reddit user agreement restricts automated scraping and API commercial use; follow exact terms, not imaginary permission from browser control.

## Evidence contract
Every deciding claim includes `id, pillar, observed_at, original_url, source_platform, access, capture_mode, query, geo, language, metric unit/scale and comparison context, claim, direction SUPPORTS/CONTRADICTS, independence_group, screenshot/csv/log artifact, competing explanation and freshness`.
Use `templates/opportunity/idea.example.json` and `sources/opportunity_source_registry_2026-11-24.json`. Run `npm run audit:opportunity`. No local PASS certifies the market, source authenticity or browser visit.

## Fatal stops
Unlicensed dataset, scraping when disallowed, CAPTCHA bypass, proxy evasion, API credits without permission, leaked account cookies, private user data, falsified screenshots or fake human evidence, unsourced numeric keyword estimates, treating ad CPC as publisher RPM, manipulated rankings/reviews, unsafe tool output or unbounded compute. Mark BLOCKED and use the lowest-cost compliant alternative.

**Operating manual:** `docs/opportunity/README.md` and its specialist chapters. Log what was actually executed and what remained blocked. A source URL alone is not a live-browser capture.

## V10 mandatory computer-use authorization preflight
Before every third-party GUI/API action, inspect the real runtime tool schema and read current original provider terms. Follow `docs/opportunity/08-computer-use-permission.md`; validate an action-specific, truthful manifest with `node scripts/check-computer-use-permission.mjs --file receipt.json --require-eligible`. If tool is read-only, not exposed, provider permission unknown, account unauthorized or credits exhausted: HOLD and use permitted public/read-only evidence or request a manual CSV. No browser-control claim from a source link or an untrusted JSON file. Every actual browser action requires a separate observed result receipt. No login, purchase, posting, CAPTCHA bypass, or secret disclosure via research gate.
