---
name: sense-policy-watch
description: Verify current official search, advertising, browser, privacy, and AI crawler rules before any site change or policy claim.
---


# Policy watch: authoritative sources only

## When
Before every new site, ad network decision, crawler/consent change, or claim of compliance. Recheck high-volatility rules monthly and after provider announcements.

## Procedure
1. Read `sources/official_sources.json`; select controlling authority and feature region/account type. Never substitute a third-party marketing blog for the provider's own policy.
2. Open the authoritative policy page and record retrieval date, exact affected section, applicability and relevant exceptions. Do not quote more than needed; summarize original text faithfully.
3. Classify each finding: `[PROVIDER-MUST]`, `[PROVIDER-OPTIONAL]`, `[INTERNAL-SHOULD]`, `[CONTRACT/PLAN-SPECIFIC]`, `[UNKNOWN]`, or `[OBSOLETE]`.
4. Identify contradictions between Google's AdSense policies, source-network advertising formats, browser/privacy law, the host's acceptable-use policy and SEO guidelines. The stricter relevant operating condition controls our release.
5. Update `references/` and `sources/official_sources.json` plus `CHANGELOG.md` with exact URLs and date. Never silently inherit an older summary.
6. Output **must/should/unknown**, impacted pages and actual verification actions; open a change ticket for anything unknown or not tested.

## Red flags
No universal Google AdSense minimum traffic, blog-post count, domain age, word count, or special CMS is published as a global eligibility condition. Do not confuse 6-month-old domain requirements of a third-party premium network with AdSense. Rules concerning ads.txt are conditional on actual inventory selling configuration. Google-Extended, GPTBot and ClaudeBot are not interchangeable with search crawlers.

## Evidence
A real policy decision must have exact official URL, date, screenshot/text excerpt (short), applicable property/region, rule and reviewer. Automated HTTP 200 of the policy URL is not evidence of having read the current rule.

