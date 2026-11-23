# Publisher program eligibility, network contracts and nonintrusive monetization
**Reviewed 2026-11-23. Owner:** `web-monetization-network-operator`. Source registry: `sources/v6_publisher_network_registry_2026-11-23.json` (15 categories/providers; deliberately not exhaustive global provider census).

## Ad monetization is several independent businesses
| Commercial route | How paid | What to verify |
|---|---|---|
| AdSense contextual display | Real eligible page ad impressions/clicks | Site and page review, publisher policies, invalid traffic, ad UX, consent, ads.txt |
| Google Ad Manager / AdX ecosystem | Programmatic auction/GAM tools under contract | Authorized demand access and publisher legal rights; GPT tags alone don't bypass approval |
| Managed display/header bidding | Revshare of premium auction inventory | Minimum quality/traffic, country mix, exclusivity, contract, latency and fill |
| Native recommendation / push/popunder | Click/impression or downstream CPA | Malvertising, accidental clicks, navigation harm, other provider restrictions, advertiser brand |
| Direct brand/sponsor | Negotiated display/sponsored content | Honest disclosure, independent seller relationships, invoice, content rights |
| Affiliate | Verified referral/conversion | Honest disclosures, merchant policies, deceptive reviews prohibited |
| Paid API/freemium/ads-free | Price/user/job, SaaS usage or one-off payment | Unit economics, cancellation, billing, tax/privacy, entitlement and quotas |
| Agent-crawl licensing | Contracted consumption if provider allows | Consent/attribution and actual payment; generic AI citations do not generate fees |

**Provider thresholds are NOT universal.** AdSense has its own site/account review and no published universal minimum traffic rule. Raptive at the current official support page requires >=25k PV/month and for 25–99k PV a 50% share from US/UK/CA/AU/NZ, domain >=6 months, majority long-form human-involved content and properly set Google Analytics. A converter-dominated utility site can be a poor fit despite traffic.
Mediavine Official's current published gate is >=$5,000 annual ad revenue and premium content/UX. Mediavine expects programmatic inventory exclusivity; a second network that adds ads.txt sellers can violate its contract. Journey by Mediavine changed requirements **November 18, 2026**, so do not rely on an old 10K-session/30-day Grow requirement without reopening the latest article. Freestar typically targets large publishers (~1M pageviews) and 50% organic traffic; "typically" is not a guaranteed hard approval cutoff. Ezoic, Media.net, Monetag and Adsterra have distinct integrations/traffic/ad formats, not universal guaranteed acceptance.

First-party sources:
- https://support.google.com/adsense/answer/12176698
- https://help.raptive.com/hc/en-us/articles/360032840891-Who-is-eligible-for-Raptive
- https://www.mediavine.com/application-requirements/
- https://help.mediavine.com/why-mediavine-requires-exclusivity
- https://www.journeymv.com/getting-started-with-journey-by-mediavine/
- https://docs.ezoic.com/docs/ezoicads/
- https://www.media.net/legal/inventorypolicies/
- https://freestar.com/publisher-quality-requirements/
- https://help.monetag.com/en/articles/6726292-website-content-main-rules-for-publishers
- https://adsterra.com/blog/set-up-publishers-dashboard/

## Supply-chain transparency and multiple ad partners
Ads.txt identifies authorized digital sellers at the root domain; seller record includes advertising system, actual account ID, DIRECT/RESELLER and optional cert authority identifier, with IAB 1.1 OWNERDOMAIN / MANAGERDOMAIN where applicable. Validate signed partner invoice/manager relation and **sellers.json** supply-chain matching. Do not invent `pub-000...` real IDs or add every network blindly. Check provider contract: a managed exclusive network may disallow additional programmatic tags regardless of technical feasibility.
Official standards: https://iabtechlab.com/ads-txt/ ; https://iabtechlab.com/security-fraud/ ; https://support.google.com/adsense/answer/12171612 .

## Ad-tech performance and consent
- Separate AdSense tag from Google Ad Manager GPT; both have provider and account settings. GPT documentation alone is not AdSense eligibility.
- Use async loading; avoid loading unnecessary networks on every route. Maintain ad-slot layout geometry to prevent CLS and task misclicks.
- Respect geographic CMP requirements: Google-certified IAB TCF CMP for applicable EEA/UK/Switzerland traffic. Validate current Consent Mode and Google service behavior. Do not silently send private file names or content into ad targeting.
- Measure actual viewability, fill, IVT deductions, CPM/RPM by geographic market and device, revenue share, domain costs, support, referrals and user retention. RPM estimate from a competitor estimator is not first-party earnings.
- Experiment ethically with layout and ad formats against user task completion, performance and consent; prefer no ads to a UI that creates accidental clicks or violates platform rules.
Official: https://developers.google.com/publisher-tag/guides/minimize-layout-shift ; https://developers.google.com/publisher-tag/guides/general-best-practices ; https://support.google.com/adsense/answer/13554116 .

## Eligibility evaluator design
Input `monthly_pageviews`, `annual_ad_revenue_usd`, `domain_age_months`, `country_mix`, `majority_long_form_human_written`, `actual_tool_pages_tested`, `organic_traffic_share`, `source_quality`, `existing_programmatic_exclusive_contract`, `region_consent_verified`, `owner_account_status`.
Output per provider: `DISQUALIFIED_KNOWN`, `POTENTIAL_CANDIDATE_UNVERIFIED`, `UNKNOWN_POLICY_CHANGE`, or `VERIFIED_ACCOUNT_APPROVAL` (only when explicitly recorded from owner account). A threshold pass is **never** publisher approval.

## Provider-selection operating rule
For each candidate: compare actual site content type (converter vs long-form publisher), ad network format and intrusive UX, permitted coexistence, expected human PV by country, revenue per eligible ad view, fill, cost of page load, invalid traffic/automation, refunds/chargebacks, current minimum age and payouts, contract and exit. Some publishers may maximize product trust/profit with a paid API or no ads rather than the highest nominal eCPM.
