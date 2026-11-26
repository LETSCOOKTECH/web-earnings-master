# 04 — Executable V32 evidence contract, provenance and red-team playbook

## Status: structural consistency, not authenticated market performance

The V32 command validates schema, units, sources, stage-specific evidence and known deceptive AdSense patterns. It cannot log into Google's private dashboards, attest to signed provider terms, verify external URL receipt authenticity or prove rankings. A fully valid JSON packet returns EVIDENCE_PACKET_VALID_NOT_BUSINESS_CERTIFIED, never AUTOMATIC_GO. Each stage status is OPERATOR_PACKET_STRUCTURAL_PASS at most, followed by a required human verification of the original artifacts. This makes the system useful without pretending static JSON can prove external facts.

### Seven stage transition meanings

MARKET_DEMAND: Real human pain/search interest with >=2 distinct source origin IDs, accurate data unit and a concrete independent task oracle. Prevent Google Trends from claiming monthly volume.

COMPETITOR_GAP: Observed public SERP and competitor task analysis, >=3 distinct actual domains, valid shared fixture references, signed/owner recorded human confirmation. A self-authored fixture can pass structure but needs independent verification.

PRODUCT_ORACLE: Normal, malformed, boundary fixture classes with actual inputs, independent expected outputs, separate test records and security/accessibility evidence. Declared pass in sample packet is **not** a test runner receipt.

SEARCH_DEPLOYMENT: Real public HTTPS, owner production assertion, Googlebot/canonical/noindex checks and owned GSC receipt. An unseen site cannot claim indexation.

REAL_DISTRIBUTION: Genuine tracked human acquisition and completed tasks, explicit no fake proxies, no click exchange and invalid traffic source check.

ADSENSE_SITE_ACCOUNT: Actual owner account status Ready, original Google policy recheck, consent assessment, ad placement browser audit and real account evidence receipt. Prohibits auto-promoting site verification, ads.txt or screenshot to approval.

RECONCILED_ECONOMICS: Owner AdSense earnings, real pageviews, adjusted settled cash and cost invoices; checks that payouts do not exceed estimated earnings within simple one-period assumption, which may require manual reconciliation if cross-period adjustments/FX make that assertion inaccurate. Invalid cases are held for review, not called fraud.

## Evidence kinds and exact units

- TRENDS_RELATIVE -> INDEX_0_100_NOT_MONTHLY_VOLUME
- PLANNER_SEARCH_ESTIMATE -> MODELED_SEARCHES_PER_MONTH_BY_GEO
- PLANNER_AD_COMPETITION -> ADVERTISER_AUCTION_NOT_SEO_DIFFICULTY
- THIRD_PARTY_ORGANIC -> MODELED_ORGANIC_VISITS_NOT_GSC
- PUBLIC_SERP -> OBSERVED_SERP_NOT_RANK_GUARANTEE
- USER_PAIN -> QUALITATIVE_NONREPRESENTATIVE
- COMPETITOR_TASK -> REPRODUCIBLE_OUTPUT_OR_ERROR
- FIRST_PARTY_POLICY -> OFFICIAL_POLICY_OR_DOC_NARROW_CLAIM
- OWN_SEARCH_CONSOLE -> PROPERTY_CLICKS_IMPRESSIONS
- OWN_PRODUCT -> FULFILLED_HUMAN_TASKS
- OWN_ADSENSE -> ACCOUNT_EARNINGS_AND_PAGEVIEWS
- COST_RECEIPT -> BILLED_CASH_SPEND

Each evidence record requires a unique ID, originating source ID, date, HTTPS live original URL (examples and reserved hostnames disallowed in **real** receipts), nontrivial observation, raw artifact path/reference and matching unit. It is still possible to forge such a packet; independent owners/reviewers must reopen actual sources. Stale official policy snapshots (45 days) and market data (180 days) produce recheck warnings. Action-time current originals remain mandatory even before that period.

## CLI usage (zero paid API required)

- Audit packet: node scripts/audit-adsense-business-v32.mjs --packet templates/adsense-v32/operator-evidence.example.json
- Stress model: node scripts/audit-adsense-business-v32.mjs --scenario '{"monthly_pageviews":100000,"page_rpm_usd":0.5,"monthly_cash_costs_usd":80}'
- Tests: node --test tests/adsense-business-v32.test.mjs
- Root quality: npm test and node scripts/check-skill-network-v23.mjs

The provided sample deliberately fails several stage gates; it is not a screenshot of a live business. A passing validator does not give permission to create accounts, run advertisements, publish claims or spend on campaigns.

## Adversarial challenge set

1. Invented monthly searches from Trends -> hold.
2. Google Keyword Planner advertiser competition cast as SEO difficulty -> hold.
3. Ahrefs/Similarweb estimated competitor visits cast as actual GSC traffic -> hold.
4. Proxy/browser farms and artificial paid-to-click visitors -> hard hold.
5. Site marked AdSense Ready without an actual owner attestation -> hold.
6. AdSense pages claimed profitable on hypothetical RPM without payout/cost receipt -> hold.
7. Fake future timestamps, duplicate evidence IDs, invalid URL or placeholder domains -> hold.
8. 3 competitor entries all pointing at the same domain -> gate cannot pass.
9. Competing pages not actually tested on same independent fixture IDs -> gate cannot pass.
10. AI search citations/rankings claimed guaranteed -> hold.
11. Real legitimate revenue but site deployment not observed -> do not claim full public success.
12. Regression: original 50 V23 registered skills, public agent index and existing 825+ root tests remain intact.

## Failure-to-research loop

A stage HOLD should generate **the next information request**, not a fabricated positive. Ask for one attainable fact: permission to inspect user site, authorized GSC export, official AdSense status, a real competitor input/output receipt, task interview, or actual cost invoice. Record that result and rerun. Do not conduct automated paid/unauthorized access or "proving" publisher RPM by purchasing fake traffic.

## Real outcome truth matrix

| Claimed result | Minimal independent evidence |
| --- | --- |
| 50 candidate list complete | 50 real user jobs with origins and geo, no invented traffic |
| Actual monthly search volume | Scoped provider export with units/date, or clearly modeled estimate |
| Rank in Google | Owned GSC URL + query/country reports, actual SERP observations |
| AI cite/mention | Dated exact AI system/query result plus whether linked/clicked, not LLM claim |
| AdSense approval | Owner-authorized Google Sites Ready status |
| Ad monetization | Real authorized on-site ad serving and legitimate source traffic |
| Site revenue | Owner payment period records, pageviews, cost and deductions |
| Profitable | Net reconciled cash contribution, repeatability and maintenance cost |
| Autonomous skill success | Same input tests with/without skill, independent output scoring and agent tool boundaries |

A passing source-link checker is not source interpretation or ranking proof; a passing test on fabricated fixtures is not the same as a live site task test. Maintain this distinction in every answer.
