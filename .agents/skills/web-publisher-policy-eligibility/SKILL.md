---
name: web-publisher-policy-eligibility
description: "Evaluate AdSense site approval, Google Publisher Policies and restrictions, individual tool-page value, ad placement, ads.txt, consent and invalid traffic as distinct evidence gates."
---

# WEB PUBLISHER POLICY ELIGIBILITY

**Trigger:** AdSense approval, low-value content, each URL ad eligibility, Google ads policies, ads.txt, GDPR CMP, rejected sites, tool page quality and accidental click risks.

**Routing:** Owns policy interpretation and claim boundaries; web-monetization-network-operator handles alternative vendors and contracts; web-ad-experience handles UI placements.

**Source and uncertainty policy:** Treat user-uploaded diagrams as user hypotheses, not private Google proof. Reopen original provider sources before deployment. Distinguish code/fixture evidence from live crawlers, publisher accounts, traffic and revenue.

## End-to-end execution contract
1. Identify stage and account: site readiness/preapproval, AdSense account setup, site ownership/site review, ad-serving/policy center, or ongoing traffic/revenue quality. Do not confuse 'ad code accepted' with approval.
2. Reopen dated AdSense program policies, Google Publisher Policies, Restrictions, low/no publisher-content, ad placement and invalid traffic; distinguish hard disallowed content from lower-demand restrictions.
3. Review representative public pages and route inventory: actual tool functions, accurate explanatory evidence, unique value, usable navigation, accessibility, supported language, clear ownership/contact/privacy/terms and no under-construction/empty pages. No official universal minimum article word count.
4. Test tool page primary purpose: correct input/output, bad files, privacy statements, responsive mobile, not only templated intro/FAQ. Label page VALUE_UNKNOWN if real task is not tested.
5. Identify ad placements interacting with upload/download buttons, menus, navigation, dialog or file picker; block deceptive lookalikes, layout shift, intrusive ads and explicit 'support by clicking ads' language.
6. Check valid authorized site ownership/verified ad code, AdSense crawler reachability (Mediapartners-Google), HTTPS, robots/WAF, root ads.txt and seller IDs only after account provider values are known; do not invent pub IDs.
7. Apply regional CMP and consent-by-purpose to supported jurisdictions, including Google-certified TCF CMP for EEA/UK/Switzerland where required, and avoid firing personalized ad tracking outside lawful consent.
8. Separate publisher policy from Search spam policy: Google Search crawl/index/rank and AdSense publisher approval are independent; being indexed or having useful tool content does not guarantee ad approval.
9. Monitor invalid traffic, ad bots/automated requests, high RPM anomalies and referrals; never purchase invalid or incentivized ad impressions/clicks. Avoid deceptive IP/UA cloaking; use network/vendor guidance for invalid traffic instead.
10. Verify integration via real browser network requests, ads.txt fetch, ad tag placement, publisher dashboard status and accountable source snapshots. Missing publisher access is UNKNOWN_EXTERNAL, never 'eligible'.
11. Report per-route ALLOWED_BY_LOCAL_CHECKS, BLOCKED_KNOWN_RISK or UNKNOWN_POLICY_OR_ACCOUNT; include true site-wide policy findings and explicit corrective work before submission.

## Non-negotiable FAIL / UNKNOWN gates
- AdSense has no guaranteed approval from any static checklist.
- No minimum '20 articles/1000 words' treated as a Google universal policy.
- A pure converter can be useful but ad serving on low-value/unbuilt/empty screens may be restricted.
- Ad bots and AI assistant citations are not legitimate ad clicks/impressions by assumption.

## Required deliverables
- Scope and real user job, alternatives, testable acceptance contract and owner.
- Dated source ledger with exact URL, first-party versus excerpt status, evidence for each nontrivial claim.
- Reproducible tests or explicit NOT_RUN and UNKNOWN_EXTERNAL entries, including malicious/failure cases.
- Release decision, known risks, task economics, rollback, actual deployment and publisher/search evidence when authorized.

## Canonical references
- `docs/v6/README.md` (module-specific technical research and evidence routing).
- `sources/v6_claims_2026-11-23.json` (first-party evidence claims and disputed user-report assertions).
- `scripts/check-v6-evidence.mjs` and related executable contracts.
- `AGENTS.md` and existing root skill-routing contracts for adjacent subsystems.

## Official primary-source starting points (re-open before action)
- https://support.google.com/adsense/answer/48182
- https://support.google.com/publisherpolicies/answer/11112688

## V11 — AdSense is NOT an SEO keyword policy
Mandatory `docs/seo-master/03-policy-separation.md`: Google Search governs keyword stuffing/scaled spam; Google Ads Keyword Planner produces advertiser-side estimated volume/competition/CPC; AdSense independently governs original publisher content, page/site eligibility, low/no content, misleading download ad placements, invalid traffic, copyright and consent. There is **no Google AdSense keyword density rule, fixed word-count/article threshold or guaranteed approval from high CPC**. Never enable fake publisher tags or ads on broken/under-construction/ad-only screens; require real owner-site approval and safe ad geometry. Google Help source access may be throttled; reopen original provider policy and account before release.

## V13 — Web-verified professional production protocol
V13 docs/seo-master/12-adsense-publisher-policy-v13.md required. Independently inspect every ad-enabled page's genuine content, live tool, rights, consent, ad geometry, invalid traffic and current Google originals. Google Help 429 means UNKNOWN, not policy certified. Verify site approval only from authorized owner account. AdSense does not prescribe an SEO keyword-density percentage or guarantee ranking.
