# Codex execution patterns and future-proofing

The master library should not become a set of hard-coded rigid commands. Codex selects the relevant skill and evidence steps based on the actual task, current sources, available data and risks.

## Good requests
- "Use web-niche-validation and web-competitor-audit; analyze 5 markets by US/IN search intent with 12-month trend, search competitors, and a measured route for a small new site. No invented KPIs."
- "Use web-astro-engineering + web-technical-seo; audit our Astro dist for canonical/robots/sitemap/HTML and fix proven issues without adding mass pages. Run tests and report remaining live checks."
- "Use web-adsense-readiness + web-privacy-consent + web-ad-experience; assess site readiness against current official policies, mark manual and legal unknowns, and prepare an approval checklist."
- "Use web-ai-discovery; check real crawler/agent requests, current official search controls and our server logs, then report actionable blockers and what citations/traffic actually occurred."
- "Use web-search-analytics and web-experiments; diagnose click drop by site/geo/device and propose one measured low-risk test."

## Required handoff
Question/objective, actual evidence (URLs/date plus test or dashboard), file/URL changes, tests and logs, uncertainty, unresolved manual steps, measurable next experiment, explicit GO/NO-GO. No self-congratulation or fabricated successes.

## Updating skills
When a provider changes rules, write an evidence ledger entry, amend the smallest affected skill/ref/template, update `CHANGELOG.md` and test. Avoid automatically adding a new skill for every new buzzword; prefer a focused workflow. Backwards compatibility in skill names matters if other repos consume them; record migration if renamed.

## External tool handling
Connected search/analytics providers may be unavailable or rate-limited; gracefully request exports or continue with explicitly labeled lower-confidence sources. Never mislabel unverified third-party estimates as Search Console data. Require explicit credentials/ownership for ad networks and Search Console. Read only relevant data and do not leak PII.

## Legal/compliance humility
No skill can certify jurisdictional privacy compliance, publisher account eligibility or ad approval. Some requires actual provider account dashboard, address verification or legal review. Programmatically validate possible compliance risks, then require human sign-off.
