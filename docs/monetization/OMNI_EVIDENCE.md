# V31 Omni Monetization — official evidence and unsupported claims

Snapshot: **2026-11-26 UTC**. This is a time-bounded research packet, not a contractual audit, provider approval, or proof of real revenue. See `sources/monetization_providers_registry.json` for the machine-readable selection flags and unknowns; reopen each source and check current status before applying.

## Rechecked first-party provider claims

| Provider / issue | Current original source | Narrow defensible claim | Do not infer |
| --- | --- | --- | --- |
| Google AdSense | https://support.google.com/adsense/answer/48182 | AdSense Program Policies apply; invalid user incentives and implementation risks can disqualify an account | A universal day-one 95% fill rate, assured approval or fixed RPM |
| AdSense placements | https://support.google.com/adsense/answer/1346295 | Automatic refresh of AdSense placements is restricted; false navigation/download proximity risks policy breaches | A universal numeric 32px rule or unconditional approval |
| Google Publisher Tag / GAM | https://developers.google.com/publisher-tag/samples/refresh | GPT can refresh ad slots with proper inventory refresh declarations | That any AdX partner may always refresh every 30 seconds |
| Journey by Mediavine | https://www.journeymv.com/ | Current front page says at least 5,000 sessions **from the named qualifying countries** monthly and 4-month-old domain | 5,000 global sessions always qualifies, or exclusively Indian audience is sufficient |
| Raptive | https://help.raptive.com/hc/en-us/articles/360032840891-Who-is-eligible-for-Raptive | Page updated Nov 24, 2026 says at least 25,000 monthly pageviews; 25–99,999 tier requires >=50% named countries, majority long-form, 6-month domain | An original converter-only site with short tool pages meets the editorial standard |
| Carbon Ads | https://www.carbonads.net/faq | Invitation/manual review; Carbon network exclusive with no other ad networks or backfill | Carbon + AdSense + EthicalAds waterfall is permitted |
| EthicalAds | https://www.ethicalads.io/publishers/ | One ad per page; their page asks it be the only third-party ad on the page; monthly $50 payout threshold listed | Other networks can be silently layered on the same page |
| Lemon Squeezy | https://docs.lemonsqueezy.com/help/getting-started/supported-countries | For Indian sellers a bank payout requires a Stripe-approved account; provider points otherwise to PayPal | Any Indian founder can use Stripe bank payout and MoR eliminates domestic tax |
| Paddle | https://developer.paddle.com/get-started/how-paddle-works/ | Merchant of record assumes designated sale/payment/tax responsibilities on covered transactions | India seller can definitely be onboarded, receive any payout method or ignore tax filings |
| PartnerStack | https://support.partnerstack.com/hc/en-us/articles/360009377934-Configuring-payout-providers | Original payout docs include India for selected payout methods; terms vary per partner | Every Indian publisher account is approved or every advertiser pays commission |
| Cloudflare Pay Per Crawl | https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/what-is-pay-per-crawl/ | Official beta feature supports configured paid crawler access with HTTP 200/402 | Any AI crawler will pay, Indian owner is payout-eligible or search ranking is unaffected |
| ads.txt | https://support.google.com/adsense/answer/12171612 | Root authorized seller declarations aid programmatic verification after actual network onboarding | ads.txt reveals active ad serving/fill, a hidden network's private revenue or guaranteed eligibility |
| Google CMP for EEA/UK/CH | https://support.google.com/adsense/answer/13554116 | Google requires certified CMP with applicable IAB TCF for covered publisher traffic/product | Consent Mode v2 alone replaces the required CMP |
| Search-sponsored links | https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links | Monetized outbound links should use rel=sponsored or nofollow | Affiliate links create SEO ranking or artificial backlink authority |
| RBI cross-border services | https://www.rbi.org.in/scripts/FS_FAQs.aspx?Id=181 | 2026 framework distinguishes resident individuals' deemed EDF compliance and certain non-individual exports above ₹10 lakh/remittance; different software/non-software timing | A blanket 30-day EDF filing rule for every AdSense recipient |
| RBI underlying law | https://rbi.org.in/scripts/BS_FemaNotifications.aspx?Id=13277 | Actual amended 2026 export/import rules govern authorized dealers and reporting | An FAQ or an AI summary overrides the amended regulations |

**Source-quality boundary:** "OFFICIAL_REVIEWED" in the machine registry means a narrow claim was checked against the original page on 2026-11-26, not that the entire terms and payout contract have been signed off. Other candidates without specific reviewed official sections intentionally retain `CANDIDATE_SOURCE_ONLY` and `india_payout_supported:null`. Each claim has to be reconfirmed at the time of an actual partner application or launch.

## Deliberate corrections to the supplied monetization prompt

1. No platform-agnostic "100% unblocked fallback" exists. Don't detect or defeat ad blockers. A static genuine sponsor is a separate, disclosed ad product controlled by publisher agreements and browser preference.
2. No automatic 2.5-second ad-to-sponsor swap is implemented. It could cause ad/creative and consent conflicts, and could hide or replace an ad without knowing whether it was served.
3. Neither "CLS = 0.000" nor ">=32px" is a Google universal acceptance rule. They are internal design targets; measure actual CLS in Chromium/Firefox/WebKit, including dynamic errors, ad load, device widths and consent states.
4. The slot component does not register AdSense credentials, replace ads.txt, initiate GPT or enable programmatic auctions. An AdSense-to-AdX graduation is not automatic.
5. Most SaaS MoR providers are selective about seller country, product use and payout rails. There is no safe "MoR = taxes fully solved" inference.
6. Onboarding traffic and age criteria differ. Raptive requires an editorial content mix; Journey's current qualifying-country sessions cannot be satisfied by global traffic totals alone.
7. Checking `ads.txt` and a static HTML snapshot identifies **signals**, not actual ad auctions, private buy-side bidding, revenue, owner contracts, CTR or adblock rates. JavaScript may be dynamically injected; historical ads.txt may not be in use.
8. Source snapshots expire after 45 days as an **internal freshness budget**. Original provider rules still require action-time verification regardless of freshness.
9. HTTP 402 and real AI payment are different. Ask for verified monetary settlement and a signed program; do not monetize search engine crawling that would destroy discoverability without testing tradeoffs.
10. A user-facing "all earning methods" report should give broad category discovery and a short **actually testable** prioritized shortlist, not 25 tags on a single site.

## Deterministic acceptance and current unknowns

- `node --test tests/omni-monetization.test.mjs` runs independent fixture-based classification and policy-gate tests.
- `node scripts/discover-monetization-stack.mjs --recommend --niche "developer csv tools" ...` creates a **no-paid-API heuristic plan** with `projected_revenue:null`.
- `--fingerprint ... --html-file ... --ads-file ...` analyzes strictly supplied local fixtures. All synthetic sample files are labeled illustrative.
- Live `--fingerprint ... --live --allow-domain ...` checks bounded public robots and HTTPS; it may fail closed on redirects, robots, unsupported content or DNS restrictions.
- `--ingest-candidate` never modifies the canonical registry, even with a properly formatted claim.
- `--watch --provider ... --live` fetches the current official page with a SHA-256 body fingerprint, not semantic policy approval or a real background automation.
- **Unknown:** site-specific real traffic, search visibility, adblock rate, eligibility/acceptance, India bank account details, customer willingness to pay, partner contract restrictions, real net revenue, ad inventory, publisher analytics, income and retention.

## Output record contract

For each viable earning mechanism include `channel`, `publisher or provider`, `customer job`, `measured or assumed metrics`, `official primary source`, `source date`, `payout-country state`, `contract compatibility`, `data/privacy impact`, `marginal costs`, `experiment`, `failure mode`, `owner approval` and `GO/HOLD/UNKNOWN`. Signed account eligibility, actual user value, proper disclosures and payouts override simulated scoring.
