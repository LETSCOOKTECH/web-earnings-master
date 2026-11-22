---
name: web-network-monetization
description: "Compare Monetag, Google AdSense, Journey/Mediavine, Raptive, Ezoic, contextual networks and other publishers using current documented eligibility, ad formats and economics."
---

# Network Monetization

**Use when:** Compare Monetag, Google AdSense, Journey/Mediavine, Raptive, Ezoic, contextual networks and other publishers using current documented eligibility, ad formats and economics.

**Workflow contract:** Follow the next steps proportionally to the request. Prefer current primary sources to saved claims. Adapt the sequence when evidence suggests a better route; do not overbuild a minor task. Show exact verification, uncertainty, and safety boundaries. Read `AGENTS.md` and the matching `references/` files when carrying out substantial work.

## Network decision workflow
1. Identify the real provider (e.g. Monetag, not Montage), site domain, geography, content, traffic mix and account eligibility. Check the provider's *official publisher help center/contract* live: minimums, accepted traffic sources, content rules, ownership verification, payout methods, thresholds, reporting, ad formats, exclusivity and termination clauses.
2. Treat third-party provider marketing claims and screenshots as supplier claims, not independent evidence of RPM. Where available, collect actual site RPM/pageviews, fill, viewability, bot filtering, net terms and deductions by geography/device.
3. Monetag: check current website verification and tag implementation, ad format choices, third-party ad overlap, `sw.js`/push permission if selected, and explicit provider compatibility docs. Do not blindly load MultiTag: it can enable formats inappropriate for a utility site. Avoid popunder/OnClick, fake download direct links, forced pushes and intrusive scripts if preserving AdSense-safe UX.
4. AdSense: no fixed general minimum traffic requirement but real original-value/site review and Google consent/policy compliance. AdSense-for-Search is a distinct product; don't confuse it with normal AdSense content ads.
5. Raptive, Journey/Mediavine and Ezoic: verify current pageview/session/MAU thresholds, GEO fractions, content standards, MCM and exclusivity. Thresholds can change (not permanent config constants). Ezoic growth/incubator exceptions may apply.
6. Compare eligible choices under the **same traffic scenario** and costs, including pageviews/visit, country mix, adblockers, consent and UX impact. Model scenario RPM explicitly as assumption when actual publisher data is unavailable.
7. Record contract/data handling: seller `ads.txt`, third-party cookies, consent, user data transfers, attribution access, script security, ad quality, payment and domain restrictions.
8. Use a planned migration checklist for switching networks: remove unused tags/service workers, reconcile ads.txt, update CMP/vendors and privacy, test live downloads and page speed, check Google site review. Do not assume immediate AdSense approval after other network use.

## Output
`templates/network-comparison.csv`, `templates/ads-review.md`, `references/monetag-and-networks.md` and expected net-revenue range with explicit evidence caveats.
