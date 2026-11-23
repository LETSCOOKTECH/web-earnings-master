---
name: web-monetization-network-operator
description: "Compare Google AdSense, Journey/Mediavine, Raptive, Ezoic, Media.net, Freestar, Monetag, Adsterra and others by source-scoped publisher eligibility, inventory formats, exclusivity, traffic quality and economics."
---

# WEB MONETIZATION NETWORK OPERATOR

**Trigger:** Any publisher ad network, best AdSense alternatives, provider approval requirements, programmatic monetization, ads.txt/sellers.json, rev share, ad layout, header bidding and ad revenue optimization.

**Routing:** Own provider eligibility and commercial reconciliation; web-publisher-policy-eligibility owns Google compliance; web-unit-economics-finops owns per-task economics.

**Source and uncertainty policy:** Treat user-uploaded diagrams as user hypotheses, not private Google proof. Reopen original provider sources before deployment. Distinguish code/fixture evidence from live crawlers, publisher accounts, traffic and revenue.

## End-to-end execution contract
1. Classify providers by auction and placement: AdSense contextual display, Ad Manager/GAM/AdX via approved relationship, managed header-bidding publishers, native advertising, affiliate, push, interstitial/popunder, sponsored posts, direct API/agent paid use. User trust and policy vary.
2. Use provider official dated policies only for numeric requirements, supported geographies, minimum site age, content/editorial composition, traffic-source quality, exclusive contracts, payout and revenue share; mark unverified/changed entries UNKNOWN.
3. Check current official examples: Raptive >=25,000 monthly pageviews with country concentration, original human-reviewed long-form and >=6 month site; Mediavine Official >=$5k annual ad revenue; Journey rules revised November 18, 2026; different networks need separate review.
4. Distinguish publisher network fit for utility pages. Raptive's long-form-majority requirement may be incompatible with a predominantly converter-only site despite meeting traffic. Do not fake long-form pages to qualify.
5. Review contract compatibility: Mediavine programmatic exclusivity and ads.txt seller additions may conflict with concurrently running programmatic networks; enforce non-overlapping placements and signed agreements.
6. Evaluate advertiser safety, malware/deceptive creative, popunders, forced redirects, user consent, viewability, CSS layout shifts, CWV/SEO, browser compatibility and brand impact before adopting high-eCPM intrusive formats.
7. Enforce IAB ads.txt root and authorized sellers/sellers.json relationships; only add real partner publisher IDs, DIRECT/RESELLER verified and explicit `OWNERDOMAIN`/`MANAGERDOMAIN` when applicable.
8. Compare owned actual RPM, fill, viewability, geo-specific revenue, net revenue share, payment fees/thresholds, invalid-traffic deductions, clawbacks, revenue at risk, exclusivity and site latency; third-party estimator revenue is not earned income.
9. Test integration isolated with real publisher credentials/consent; verify no personalized tag before consent when required, no accidental ad interactions, no click incentives, no ad serving on prohibited pages, and rollback.
10. Prioritize hybrid revenue (sponsorship, subscriptions, paid high-cost jobs, API charges, affiliate disclosure) where ads alone cannot fund compute; don't count automated agent fetches as monetizable humans.
11. Produce comparison with verified/inferred/unknown statuses, citations, blockers, legal terms, owner approvals and safe failover; never promise instant monetization from unauthorized provider.

## Non-negotiable FAIL / UNKNOWN gates
- No universal ad network has guaranteed approval regardless of traffic/quality.
- A network's sales blog cannot override its binding publisher terms.
- Popunders/forced redirects may be prohibited by other partners or create poor product experiences.
- No multiple competing programmatic tags in violation of exclusivity agreements.

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
