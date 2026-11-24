---
name: web-adsense-readiness
description: "Check Google AdSense eligibility, account and site review, original publisher value, policy restrictions, invalid traffic, ads.txt and payment readiness without myths."
---

# Adsense Readiness

**Use when:** Check Google AdSense eligibility, account and site review, original publisher value, policy restrictions, invalid traffic, ads.txt and payment readiness without myths.

**Workflow contract:** Follow the next steps proportionally to the request. Prefer current primary sources to saved claims. Adapt the sequence when evidence suggests a better route; do not overbuild a minor task. Show exact verification, uncertainty, and safety boundaries. Read `AGENTS.md` and the matching `references/` files when carrying out substantial work.

## Publisher qualification walkthrough — official Google sources mandatory
1. Verify publisher/account eligibility (age 18+ for own account or authorized adult account alternative; one-account restrictions; owned/controlled domain; accurate identity and payment details; supported country/language; current account status).
2. Product/site value: site publicly usable, navigation complete, substantive original tool or content, legal rights, accurate contact/privacy disclosures and enough evaluable material. There is no general official minimum 30 articles, 1000 words, 10,000 visits or fixed global domain age.
3. Review current Google Publisher Policies, Restrictions, AdSense Program Policies, screens without meaningful publisher content, navigation behavior, misleading software/downloads and prohibited content. A working UI alone is insufficient if the site lacks meaningful value.
4. Add domain using current AdSense Sites flow, verify owner with one supported method, ensure Mediapartners-Google and other official relevant ad crawlers can access content; site must reach **Ready** for serving Google ads. Review conditional identity/payment/address/tax verification as required.
5. Confirm ads.txt root path, real publisher ID, seller relationships and crawler access once network ID exists. Do not publish example publisher IDs or assert ads.txt alone means ad approval.
6. For applicable EEA/UK/Swiss advertising, use a Google-certified CMP integrated with relevant IAB TCF per current official rules; check actual version and region at deployment. Observe US-state and other jurisdiction rules; counsel if material.
7. Traffic integrity: don't click own ads, buy low-quality bots, incentivize clicks, place ads misleadingly, create unwanted pop-unders, or block navigation. Audit actual page ad units and third-party scripts.
8. Submit only when site content + live function + policy + identity are ready; record screenshots, responses, results and policy center status. Approval not guaranteed; respond to exact issues from Google rather than guessing why.

## Go / no-go output
`templates/ads-review.md`, `templates/adsense-evidence.md`, link each finding to applicable official help page. Differentiate eligible/review-pending/Ready/account-limited from site ranking.

## V2.3 production evidence contract (audited 2026-11-23)
**Owner:** Real AdSense site/account eligibility. **Routing:** web-ad-experience handles placement; monetization compares networks.
**Official source entry points requiring action-time reopening:** https://support.google.com/adsense/answer/48182. A saved link is not confirmation of the current provider rule.
**Evidence needed:** Actual AdSense status, verified ownership, current policy, site usefulness, ads.txt.
**Critical FAIL / UNKNOWN:** No approval claims from a static test or minimum articles/visits myth.
**Mandatory freshness procedure:** Read docs/foundations/19-provider-source-verification.md and docs/RESEARCH_PROTOCOL.md. Re-open official body, log exact applicable claim, evidence date, announced versus effective status, geography/account and contradiction. Use sources/verified_claims.json only as a dated baseline; the source watch's hash changes are not semantic verification. Record tests/actual results, open blockers and rollback; do not infer live indexing, AI citations or AdSense revenue from local tests.

## November 2026 privacy update
https://support.google.com/adsense/answer/18818765?hl=en
Google announced GPC-triggered RDP for Louisiana and Vermont ad requests starting on or after November 17 2026, ahead of state provisions on or after January 1 2027. Test regional GPC handling, actual ad request behavior and consent separately; do not infer legal compliance or remove publisher obligations.

## Future AFS policy transition — January 17 2027
https://support.google.com/adsense/answer/9336650?hl=en
Unified AFS policies are announced, not yet effective. Reopen current separate policies https://support.google.com/adsense/answer/1354757 and https://support.google.com/adsense/answer/7003954 until transition. For future AFS review test genuine user search intent, nonempty meaningful results, one request per action, ad-to-organic ratio, and no mixing/backfill in AFS slots. Provider-approved feature exceptions and written repeat-ad approval must be checked. Other non-AFS slots may use other permitted demand subject to the concurrent Google Ads text-demand restriction. Do not generalize AFS rules to ordinary content ads.
