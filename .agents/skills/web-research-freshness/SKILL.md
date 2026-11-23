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

## Freshness watcher and source-semantics gate (v2.2)
Before material provider/policy claims read docs/foundations/16-modern-search-changes-2026-2027.md and docs/foundations/09-source-refresh.md. A new read-only watchlist (sources/foundation_refresh_targets.json) and script (scripts/watch-official-updates.mjs) can fetch official current pages/RSS, emit review-needed content-hash signals and date-stamped artifacts; it DOES NOT verify semantic changes. Run offline validation without network; optional --live with explicit target limits. The GitHub Actions scheduled watcher only starts automatically AFTER workflow exists on default branch (the draft PR alone does not activate its schedule); manual operator review required. For live provider docs use actual body and effective date, not an HTTP 200 or search excerpt. Microsoft future controls, WebMCP preview, new crawler names and IETF drafts require special temporal labels. Maintain unknowns; never silently alter live robots, advertiser policies or analytics schemas.

## V2.3 production evidence contract (audited 2026-11-23)
**Owner:** Official docs monitoring and human-reviewed updates. **Routing:** Cross-skill evidence governance and research update owner.
**Official source entry points requiring action-time reopening:** https://developers.google.com/search/updates;https://developers.google.com/crawling/docs/changelog;https://datatracker.ietf.org/group/aipref/documents/. A saved link is not confirmation of the current provider rule.
**Evidence needed:** Open original current docs, maintain claim ledger and change review issues, implement regression before approved edit.
**Critical FAIL / UNKNOWN:** A changed HTML hash never auto-proves policy; Internet-Drafts and future dates are not mandates.
**Mandatory freshness procedure:** Read docs/foundations/19-provider-source-verification.md and docs/RESEARCH_PROTOCOL.md. Re-open official body, log exact applicable claim, evidence date, announced versus effective status, geography/account and contradiction. Use sources/verified_claims.json only as a dated baseline; source watch hashes are not semantic verification. Record tests/actual results, open blockers and rollback; do not infer live indexing, AI citations or AdSense revenue from local tests.

## Mandatory task-time source freshness gate (v2.3.1)
For ANY consequential change to robots, crawling, AI data-use/grounding, publisher ads, privacy or Google/Bing eligibility, the responsible Codex agent MUST open the exact current official original body and produce a dated `records` artifact using `templates/action-time-source-evidence.example.json` as a shape only. Validate with `node scripts/require-action-time-sources.mjs --file <task-evidence.json> --claim-id <ID>` (repeat --claim-id for every material decision claim). Default max age: 24 hours. Every record must have original source, UTC check time, original passage (<=25 words), applicable surface, effectivity class and test/account evidence. Snippets, unknown Applebot body, stale files and announced-future Bing rules asserted as already active FAIL. The machine gate validates structure/recency and cannot prove a claim is semantically correct; actual source reading, external evidence, conflict resolution and approval remain mandatory. Never use the example JSON as live evidence.
