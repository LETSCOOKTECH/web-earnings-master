# AdSense — from eligibility to sustainable monetization (2026 snapshot)

**Controlling sources**: `sources/official_sources.json` entries for Google AdSense and Publisher Policies; re-open before application and when a policy alert appears. This is an engineering guide, not a Google approval certificate or legal opinion.

## A. Application-level eligibility (not myths)
- Publisher owns/controls the property and can verify it; accurately represents publisher identity and payee, eligible country/language, 18+ for own AdSense account or eligible adult guardian alternative. Confirm one-account restrictions and existing account history.
- Site is public, functional, navigable and provides original useful content or original tool functionality with enough demonstrable substance for review. Google does *not* publish a universal requirement for 30 blog posts, 1,000 words per page, 10,000 monthly visits, or domain age across all applicants.
- Publish accurate About/Contact/Privacy and site-specific usage/terms where required by your actual practices. These help trust and operational readiness; they are not a magic SEO or guarantee of approval.
- Content has proper intellectual-property rights and does not violate Google Publisher Policies, Program Policies or applicable restrictions. Check language/region limitations and both prohibited vs restricted content.

## B. Screens and content value
Audit home, category, tool pages, upload/results/loading/empty states, guides and legal pages. Google-served ads must not be placed on screens without meaningful publisher content (including low-value/under-construction screens) or where the ad becomes the main point of the page. A working one-button converter may require genuine instructional and method context; fake word count padding is not a solution.

## C. Ad UX and invalid traffic
Never click own ads, encourage ad clicks, buy bot or incentivized traffic, use disguised download/continue buttons, auto-redirects, fake ads or popunders while planning AdSense compatibility. Keep ads safely separated from interactive file inputs/controls, accessible and disclosed. Monitor policy center and invalid traffic adjustments. Disable formats when they violate UX or publisher policy.

## D. Site connection / verification
1. Create or use an eligible AdSense account; add the actual HTTPS domain through Sites.
2. Choose permitted verification method (meta tag, ad code, ads.txt as supported in current flow); verify ownership on production host.
3. Verify public pages available to Google's relevant ad crawlers, including Mediapartners-Google where relevant; no login, unexpected 403/JS challenge.
4. Submit site review. It must show **Ready** before AdSense ads serve; site review ≠ Search Console indexing.
5. Complete identity, address, tax, bank/payment and other validation on your account as requested by Google. Account-specific requirements can change and may precede ad serving.
6. Use actual publisher ID in root `/ads.txt` once known; audit authorized-seller entries, response code and crawler reachability. Avoid example IDs or wrong domain origin.

## E. Consent, country and user data
Accurately disclose cookies, ads personalization, analytics, IP, third-party vendors, file-processing behavior and retention. For relevant EEA/UK/Swiss Google ads, use a Google-certified CMP integrated with IAB TCF as currently required. Check current TCF version and ad formats; do not assume non-personalized ads eliminate consent obligations. Review US-state privacy laws and other relevant laws. Do not collect children's data or claim no tracking if third-party tags do.

## F. Monitoring after approval
Weekly: CTR anomalies, invalid traffic, fill/RPM, consent coverage, page speed and usability, site policy notices, ads.txt warnings and page-level performance. Compare AdSense RPM (publisher revenue per thousand pageviews) to third-party search-ad CPC carefully—these metrics are not interchangeable.

## G. Rejection triage
Do not guess. Read the exact notice/policy center finding, inspect representative URLs, check whether page value, site access, policy issue or unsupported language is cited; repair and collect proof. Do not mass-publish generic articles just to inflate the count.

## H. Before considering other networks
Check current compatibility of ad formats and contracts. Monetag itself warns about popunder incompatibility with Google-served ads. Remove unwanted OnClick/Popunder/DirectLink/push scripts before AdSense testing as appropriate, update ads.txt and CMP/vendor disclosures, and verify there are no residual service workers.

## Manual review gate
`templates/adsense-evidence.md` must record site ownership, original work examples, policy pages, audience region, current CMP decision, ad layout screenshots, HTTP tests, actual AdSense site status and financial readiness. Leave UNKNOWN until observed.
