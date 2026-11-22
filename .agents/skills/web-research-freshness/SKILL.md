---
name: web-research-freshness
description: "Reverify official search, AI crawler, privacy, advertising, ad network, Astro, and publisher policies at task time; maintain an evidence ledger and detect changing rules."
---

# Research Freshness

**Use when:** Reverify official search, AI crawler, privacy, advertising, ad network, Astro, and publisher policies at task time; maintain an evidence ledger and detect changing rules.

**Workflow contract:** Follow the next steps proportionally to the request. Prefer current primary sources to saved claims. Adapt the sequence when evidence suggests a better route; do not overbuild a minor task. Show exact verification, uncertainty, and safety boundaries. Read `AGENTS.md` and the matching `references/` files when carrying out substantial work.

## Source-of-truth and web research routine
1. Restate the exact material claim and scope: country, domain, network, ad type, account state, date and site feature. Look up the primary provider's official docs/help/changelog **live**, starting from `sources/official_sources.json`, not memory or SEO blogs. Follow updated links. For law, use jurisdictional official sources and counsel where needed.
2. Search for current documentation changes, rollout notes, site-specific account instructions and contradictory guidance. Search terms: `site:developers.google.com/search/updates <topic>`, `site:support.google.com/adsense <topic>`, `site:help.monetag.com <format>`, `site:docs.astro.build <feature>`. Query recency if changed recently; do not treat `last crawled` as publication date.
3. Distinguish: `[MUST] authoritative policy`, `[PROVIDER RECOMMENDATION]`, `[INTERNAL]`, `[ESTIMATE]`, `[EXPERIMENT]`, `[UNKNOWN]`. Preserve provider wording for regulatory decisions. Note when sources differ or have jurisdictional exceptions. Treat provider dashboards/agreements as controlling for account-specific policy.
4. Record source URL, accessible publication/update date if available, checked-at date, exact short relevant point, applicability, competing source, confidence and owner in `templates/claim-ledger.csv`. Do not invent dates or claim that a source was fully reviewed based only on a link.
5. If live access is unavailable: use only last documented source with an *unverified* status and explicitly stop any compliance claim that requires current verification. Never infer policy from someone's monetization success story.
6. During execution use web search or connected search tooling; do not make a site policy decision from an outdated saved guide. For each novel platform, search the provider's official documentation first. Consider security and legal implications.
7. After consequential update, change relevant `references/`, update `sources/official_sources.json` and `CHANGELOG.md`, add regression test/decision rule if relevant. Avoid rigid hard-coded dates or thresholds that can change.

## Expected output
Policy change record: old assertion → current rule → supporting official source → application to this website → change required → owner and review date. Separate unverified claims. See `docs/RESEARCH_PROTOCOL.md`.
