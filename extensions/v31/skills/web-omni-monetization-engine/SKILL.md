---
name: web-omni-monetization-engine
description: Discover, source-check, compare, and safely implement legitimate website revenue models across advertising, direct sales, subscriptions, affiliates, B2B licensing, APIs, and emerging AI permissions; provide proof and economic decision gates.
---

# Sense Omni Monetization Engine — V31 opt-in master agent skill

**Activation:** A user asks how any site, web application, converter, developer tool, content business, SaaS, agent endpoint, newsletter, widget or similar product can make money, find new models, or move beyond AdSense. This is a candidate companion, not a secretly active 51st V23 skill. The frozen 50-item registry is authoritative. Read `AGENTS.md`, `SKILLS.md`, the task-relevant existing ad, legal, product and security skills, and the documented current first-party sources.

**Mission:** Build a reproducible earning-opportunity intelligence and execution process. Find the *applicable opportunity set*, assess evidence, eliminate unlawful/hostile business models, select a small controlled experiment portfolio and measure real unit economics. Never claim this enumerates literally every opportunity on Earth or can guarantee income, AdSense approval, ranking, ad viewability, adblock coverage, worldwide payouts or tax compliance. "Self-updating" means *on-demand research and PR-reviewed source updates*, not background surveillance or unsupervised provider deployment.

## 0. Execution ownership and immutable safety boundaries

Read these code and evidence assets first:

- `sources/monetization_providers_registry.json`: 25 monetization channels, provider source/risk/unknown records, official claim snapshots.
- `scripts/omni-monetization-core.mjs`: deterministic recommendation, ads.txt analysis, pure HTML fingerprinting, provider freshness and ad-refresh safety.
- `scripts/discover-monetization-stack.mjs`: user-authorized command-line discovery; offline by default, optional robots-checked bounded public HTTPS reads.
- `templates/astro-monetization-slot/MonetizationSlot.astro`: label-first, noninteractive static sponsor example or integration placeholder. No real ads, no timed adblock traps.
- `docs/monetization/OMNI_EVIDENCE.md`: first-party research snapshot, exact counterexamples and India payout caveats.
- `tests/omni-monetization.test.mjs`: adversarial acceptance proof for the local implementation, not market or publisher account outcomes.

Preserve `sources/skill-network-v23.json` and the existing 50 skill folders. Route AdSense qualification to `web-adsense-readiness`; placement/CWV to `web-ad-experience`; provider contract conflicts to `web-monetization-network-operator`; privacy/consent to `web-privacy-consent`; demand to `web-opportunity-intelligence`; costs to `web-unit-economics-finops`; exposure to `web-security-performance`; live release to `web-launch-review`. Never run all 50 without a task-specific justification.

**Policy gate:** No invalid traffic, coerced clicks, artificial ad impressions, prohibited refresh, popunders, push/notification traps, fake download buttons, hidden sponsor disclosures, malicious scripts, unconsented tracking, deceptive SEO link exchanges, PII resale without lawful basis, illicit software, or user data leakage. Never recommend evading an ad blocker or disguising ads as system UI. Respect browser and platform user preferences.

## 1. Exhaustive-seeking channel taxonomy and discovery coverage

Search *models*, not merely provider brand names. Audit each applicable monetization family:

1. **Programmatic display:** AdSense, GAM/AdX through authorized publishers, transparent managed bidding; RPM, fill, consent, ad restrictions, invalid traffic and publisher eligibility.
2. **Contextual technical and native ads:** Carbon Ads, EthicalAds and direct B2B placements; network/page exclusivity and contract conflicts.
3. **Direct media inventory:** sponsor placements, direct sales, newsletter slots, launch underwriting, sold developer tutorials and event sponsorship. Always mark paid placements visibly.
4. **Affiliate and referral sales:** SaaS, cloud, hosting, financial services, developer tooling and qualified merchants. Genuine usefulness + disclosure and `rel="sponsored"`. Verify publisher payout country and approved vertical.
5. **Software paid tiers:** team features, advanced exports, saved presets, privacy/enterprise access, specialized batch processing and offline workflow improvements without falsely promising unlimited free features.
6. **Usage, credits and compute:** server-minute, API call, token, storage, row processing, high-cost rendering, data egress and user-controlled compute quotas.
7. **Software and IP licensing:** single-site, enterprise, source, SDK, plugins, per-seat, offline desktop and managed-source license models.
8. **Embedding and white-label B2B:** branded/unbranded embed, OEM, licensed converter libraries, private branded dashboards and compliance-sensitive deployments.
9. **Services:** paid setup, audit, migration, implementation, managed support, integration assistance, consulting retainers and enterprise SLAs.
10. **Training and digital products:** original courses, templates, guides, workbooks, job preparation, bundles and certifications where allowed.
11. **Community, membership and patronage:** optional memberships, GitHub Sponsors, donations and opt-in community offerings.
12. **Marketplace and qualified lead generation:** job listings, buyer introductions, seller commissions, recruiter leads and verified customer referrals with privacy safeguards.
13. **Information products:** ethically acquired datasets, original research, analytics reports and licensed data; verify consent, usage rights, redistribution and accuracy.
14. **Commerce and adjacent services:** appropriate physical goods, merch, paid events, workshops and partner products, always respecting payments and consumer protections.
15. **AI/agent payments:** paid REST/MCP tool executions, per-task automation, content or model access licensing, Cloudflare Pay Per Crawl and actual partner programs when contractually available.

The checked registry has at least 25 named channels; the above is a conceptual grouping. For a new niche, search new synonyms and emerging subtypes, add a *candidate* record with provenance, and measure whether the site actually has a user need. A broad taxonomy is not a signal to indiscriminately add every monetization mechanism.

## 2. Research operating procedure — "fetch every plausible way" without hallucinations

**Stage A — classify website and owner.** Capture domain (or confirm not deployed), actual buyer/user job, content type, languages, countries, source of audience, consent/ad blocker estimates, device split, real sessions and pageviews, repeat use, p50/p95 time-on-task, return sessions, customer acquisition cost and actual marginal service cost. Set every missing metric `UNKNOWN`, not guessed values. A user asking about *all ways* does not authorize direct provider registrations or financial actions.

**Stage B — mine opportunities from six complementary evidence classes:** (a) current official publisher/partner docs and eligibility, (b) actual same-task competitor public monetization signals, (c) original users' stated willingness to pay/friction, (d) product telemetry or business owner data with permission, (e) disclosed vendor/community feedback, and (f) changes from trusted provider changelogs or legal sources. Look for related services, extension ecosystems, plugin stores, ad networks, affiliate programs, licensing opportunities and licensed AI-access initiatives. Search developer communities and first-party provider portals, not invented CPC reports. Include international/India verification.

**Stage C — source every material claim.** For eligibility thresholds, revenue share, country payouts, exclusivity, permitted refresh, tax, cookie consent or API permissions: use an applicable **original primary source** (provider help center/contract or legal authority), URL, exact quoted section or narrow paraphrase, user type/country, observed UTC date, effective date if stated and a confidence level. Distinguish `OFFICIAL_REVIEWED`, `CANDIDATE_SOURCE_ONLY`, `STALE_REVERIFY` and `HOLD_UNVERIFIED_PROVIDER`. Re-fetch at action time. A link or hash alone is *not* semantic verification. If blocked by robots, 403, 429, login, JavaScript-only gating or unsupported navigation, mark `UNKNOWN`, do not route around the restriction. Check contradictory official pages and newer terms.

**Stage D — assess new technologies without treating launches as payouts.** Track Cloudflare Pay Per Crawl `HTTP 402` and other verified crawler payment protocols, licensing markets, AI-search publisher partnerships and agent-paid tool calls. Test publisher owner enablement, crawler demand, identity verification, relevant search-crawler visibility tradeoffs, contractual rights, local payouts and actually received funds. Merely supporting WebMCP does not mean AI agents pay. Do not assert OpenAI, Microsoft, Perplexity or another vendor pays all cited sources.

**Stage E — every candidate requires:** a legal rights check, first-party terms, actual payout country, gross margin model with source of numbers, traffic and demand evidence, counterfactual "why not", setup friction, page experience impact, exclusivity, expected support/maintenance, reversibility and lowest-cost falsification. Rank by *eligible fit and test cost* rather than fabricated RPM.

## 3. Agent tool modes and reproducible commands

Commands do not require any paid keyword or affiliate API key:

```bash
node scripts/discover-monetization-stack.mjs --recommend --niche "developer csv tools" --expected-adblock-rate 0.42 --desktop-pct 90 --primary-geo mixed --server-cost 0

# Offline evidence inspection; never downloads third-party pages:
node scripts/discover-monetization-stack.mjs --fingerprint https://example.org/ --html-file tests/fixtures/omni/sample.html --ads-file tests/fixtures/omni/sample-ads.txt

# Optional live read-only GET, only after user/operator authorizes the public target:
node scripts/discover-monetization-stack.mjs --fingerprint https://owned-or-public-authorized.example/ --live --allow-domain owned-or-public-authorized.example

# New provider cannot write registry from unchecked assertions:
node scripts/discover-monetization-stack.mjs --ingest-candidate templates/monetization/provider-candidate.example.json

# Fetch official policy source for manual semantic review: never auto-updates terms:
node scripts/discover-monetization-stack.mjs --watch --provider carbon-ads --live --allow-domain www.carbonads.net
```

All network features require an explicit exact-domain allowlist and HTTPS, pin public IPv4 DNS to reduce SSRF risk, disable redirects, cap bytes/time and check `robots.txt` first. Absence of a denial from our limited robots parser is not a universal permission slip; observe publisher-specific robots and request limits, and never fetch authenticated pages or scrape behind access controls. A page's `ads.txt` declares seller relationships, not an active bidder, revenue, fill, publisher ownership or legality. The HTML parser only reports visible script and link strings; a hidden/stale script is not proof of live ads or partnerships.

A new provider's candidate receipt **never auto-promotes** into the canonical registry. Valid structure produces `PENDING_INDEPENDENT_PRIMARY_SOURCE_REVIEW`; ambiguous or missing official policies / India payouts produce `HOLD_UNVERIFIED_PROVIDER`. Require an owner-reviewed PR and tests to update registry data.

## 4. Fit selector and non-conflicting revenue stacks

Classify each site with observed or labeled estimated values: niche, adblock rate, desktop share, geo mix, infrastructure cost, commercial user intent, retention, amount of original content and consent readiness. Do not assign a universal 95% fill rate, adblock percentage or B2B CPC without real account telemetry. Script `--recommend` is a **heuristic shortlist**, not an optimization proof. Run actual trials after policy checks.

- **Mass consumer/office/education:** consider eligible contextual advertising plus truthful disclosed affiliate offerings and one relevant direct sponsor; with no approved account, show no third-party ads and no fake `ads.txt`.
- **Developer, API, data and technical audience:** compare direct B2B sponsorship, paid advanced workflows and **one permitted native network at a time**. Carbon explicitly prohibits mixing with other ad networks or being used as another network's backfill; EthicalAds says only one of their ad placements and no competing ad network on a page. Recheck contracts at application time. Never suggest Carbon + AdSense as a universal stack.
- **Compute-intensive services:** preserve the free core if sustainable, meter expensive remote processing, test paid team/API/batch options, then evaluate B2B licensing. Deduct payment fees, hosting, support, fraud loss, and tax costs.
- **Sparse visits/zero audience:** first validate the useful product, demand and paid buyer. "Set up AdSense to print cash" is not a business case.

**Architecture:** Treat independent revenue channels and ad networks differently. Two mutually exclusive networks are alternatives, not simultaneous waterfall layers. Never guarantee that a direct sponsor is "unblockable"; user browser settings and signed contracts control rendering and allowed promotions. No adblock detector, secret ads, identity fingerprinting or timer-based click nudges.

## 5. Honest ad slot engineering and backfill

`templates/astro-monetization-slot/MonetizationSlot.astro` is a static example for three explicit states: `none`, owner-approved `ad` placeholder, or openly labeled `sponsor`. The sponsor link receives `rel="sponsored nofollow noopener noreferrer"`. No ads are automatically installed or served and there is **no script checking whether a blocker disabled ads**. To show a sponsor, choose it as the agreed product placement in an allowed slot rather than inserting it when Google ads fail. Keep sponsorship disclosure and available user task more prominent than advertising.

Preallocate an appropriate responsive rectangle before fetching ads, allow genuine ad provider geometry, and check spacing between ad/label and file download, convert, upload, navigation, login and checkout buttons. A 32 CSS px boundary and CLS <=0.01 are **internal targets**, not global Google ad policies. "CLS=0.000 guaranteed" is false until actual live field/browser performance observation. Check ad inventory mix, EEA/UK/Swiss consent, screen-reader order, reduced motion, CWV, INP and consent withdrawal. No timed refresh for raw AdSense: see Google AdSense placement policies. Even authorized GPT/GAM refresh requires declared inventory and contractual owner approval; `guardRefresh` returns `OWNER_APPROVED_CONTRACT_ELIGIBILITY_ONLY`, never schedules a refresh.

**Conflict matrix:** AdSense + other publishers = review contract and placement; Carbon + any other network = block; EthicalAds + another ad on the same page = block pending official exception; native sponsor + exclusive network = review exact agreement; MoR + direct checkout = potentially competing merchant-of-record and tax flows; AI crawl paywalls + organic/agent discovery = measure lost distribution. Never double-serve exclusive inventory.

## 6. Payment rails, India, tax, privacy and seller identity

**Payout eligibility is jurisdiction-specific.** Confirm that an actual person/entity in India can sign up, complete KYC, choose the offered payout method, receive invoices and withdraw under current program terms. `india_payout_supported:null` is intentional UNKNOWN. Distinguish bank transfer, Stripe-approved bank payouts, PayPal and local restrictions. Example: Lemon Squeezy's official supported-countries page states India bank payout requires a Stripe-approved Indian account; otherwise use its supported PayPal pathway. Merchant of Record on sales does *not* relieve a resident Indian seller of domestic tax, records, foreign remittance, income classification or financial reporting obligations. Do not assert `zero US LLC needed` or GST automatically solved as a universal legal rule.

For service exports read RBI's **2026 Export and Import of Goods and Services Regulations and current FAQs**, not a blanket "all founders file EDF in 30 days": resident individuals can have deemed EDF submission on supplying required information to their Authorized Dealer. Non-individuals above ₹10 lakh per inward remittance have different EDF timing for software and non-software exports. Verify actual seller legal form, invoice date, nature of service, AD bank requirements and applicable changes. Keep records for receipts, fees, foreign exchange conversion and compliance; consult an accountant/lawyer for GST, export tax, LUT, TDS, withholding and marketplace/MoR income recognition. Do not hardcode bank spread, minimum GST turnover, PAN, e-FIRC or filing sequence as universal assumptions.

For Google publisher ads in the EEA/UK/Switzerland confirm a **Google-certified IAB TCF CMP** under current product-specific requirements; Consent Mode v2 alone is not a substitute. Verify privacy policy and permission for analytics, ad personalization, cross-border processing and applicable US-state/other country rules. Inspect the real signed ad/affiliate agreements. No fabricated publisher IDs or sender credentials.

## 7. Unit economics, experiment and winner selection

For each candidate, output one row with: `channel`, `provider`, `fit`, `source evidence and verified-on`, `legal/payout gates`, `requires account`, `ad UX risk`, `incremental cost`, `setup effort`, `measurement plan`, `reversible rollback`, `decision`. The winner is an experiment with a stopping rule, not an asserted "best" network.

Compute from **owner-provided** real data when available: `net revenue = verified collected revenue - refunds - invalid-traffic clawbacks - platform fee - payout/FX fee - marginal compute - support - operations`; `margin per fulfilled task = net attributable revenue / real fulfilled human tasks`. For display, use actual publisher payout RPM and sessions (and normalize by geo/device when comparing); advertiser CPC is not publisher RPM. For paid product: activation, checkout rate, refund rate, net MRR, churn, retention, customer support, chargeback, actual contribution margin. For direct sponsorship: contract cash collected, periods, campaign delivery and makegoods. For AI crawler fees: genuine paid requests and contract settlement, not HTTP 402 counts.

Prioritize 1–3 simultaneous safe channel experiments; every experiment records hypothesis, falsification rule, cohort, user task, conversion event, holdouts where ethical, metric source, gross/net reconciliation, guardrails and rollback. Never build forced click loops or artificially inflate ad requests. V29's opt-in IndexedDB chain is a task continuation feature, not evidence of 3–4x legitimate pageviews.

## 8. Freshness, quality and release gates

For every user request that materially depends on current provider terms, run `--watch` or independently search/open official docs with permission. Record original excerpt, exact claim/date, status and conflicting pages. Source `last_verified` is a historical observation, not perpetual truth. `validateRegistry` warns once a source passes its 45-day review budget; a manual update only after reviewing current semantics. Candidate must provide original policy and India payout evidence; acceptance still requires human/signed account confirmation. Automated evidence collections cannot impersonate authenticated financial accounts.

**Required local gates:** `node --test tests/omni-monetization.test.mjs`; `npm test`; `npm run lint:skills`; `npm run audit:public-agent:v27`; existing V23 registered skill checks. When relevant, build/test Astro template in a real project and use Playwright with real owner-approved ad consent scenarios; no claims about a live publisher without actual page/account access. Run a read-only competitor fingerprint only when authorized by public site rules, output source/provenance and uncertainty, and never imply a page's ad script proves private earnings.

**STOP and report `HOLD`** for inaccessible original policy, unverifiable India payout, exclusivity collision, no consent, ad refresh ambiguity, unlicensed code/data, publisher account unknown, fake ads.txt IDs, absence of actual margins or a non-deployed project. **Output** should clearly distinguish `VERIFIED_CURRENT`, `STALE`, `OBSERVED_PUBLIC`, `INFERRED_MODEL`, `UNKNOWN`, `EXPERIMENTAL`, `BLOCKED`. Existing quality gates always remain in force.

### No-go / adversarial challenge set

Before endorsement, ask the agent to prove these fail: AdSense auto-refresh, Carbon combined with AdSense, "HTTP 402 means you are paid", automated promotion of a newly invented network, static ads.txt interpreted as live bidder, missing Indian payout receipt, MoR-as-universal-GST waiver, unapproved publisher ad slots, forced adblock override, fake downloads near ads and cited invented CPC. Prefer an explicit honest `UNKNOWN` over a profitable-looking unverified number.
