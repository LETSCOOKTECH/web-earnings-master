# Live source verification protocol for Codex

## Trigger: every consequential factual claim
For a technical/monetization/SEO claim specify: `claim`, `provider`, `website and network`, `geography/account scope`, `retrieval UTC timestamp`, `published/updated date if known`, `official source URL`, `quoted excerpt limited to need`, `interpretation`, `uncertainty`, `action/test`. Prior search snippets are discovery leads; open the actual official page if feasible.

## Source priority
1. Current controlling policy / official docs / dashboard / signed provider contract (scope appropriate).
2. Official updates, change logs, release notes and official test tools.
3. First-party product analytics / GSC / provider earnings and log outputs for the site.
4. Third-party estimation tools Semrush/Ahrefs/Similarweb with dated geography and explicit uncertainty.
5. Community review, Reddit and video tutorials for leads and real pain—not policy facts.

## Search procedure examples
- `site:support.google.com/adsense/answer eligibility publisher original content site ready 2026`
- `site:support.google.com/publisherpolicies/answer screens without publisher content download buttons`
- `site:developers.google.com/search/updates <date> sitemap crawling AI` and `site:developers.google.com/search/docs/fundamentals/ai-optimization-guide`
- `site:developers.openai.com/api/docs/bots OAI-SearchBot robots IP`
- `site:support.claude.com Claude-SearchBot Claude-User`
- `site:docs.perplexity.ai PerplexityBot Perplexity-User`
- `site:blogs.bing.com/webmaster 2026 AI Performance grounding`
- `site:help.monetag.com format publisher AdSense popunder`
- `site:help.raptive.com eligibility 2026`; `site:help.mediavine.com approval Journey`.
- `site:docs.astro.build <specific Astro version feature>`.
- `site:youtube.com "Google Search Central" Search Console training` for tutorials, then check official source page independently.

## Research guards
- A Google Trends index is a *normalized* series; not a monthly search-volume number.
- Google Keyword Planner Competition is *advertiser*, not organic SERP difficulty.
- Semrush/Ahrefs search volumes, KD, traffic estimates and backlinks are models; capture geography/date.
- Organic impressions and clicks are not ad pageviews or revenue. AI citations are not referral visits; bot requests are not humans.
- `last crawled` timestamp is not a policy update date. Distinguish docs modified date, rollout date and current account eligibility.
- Source text may have changed without changing URL. Review the rule at time of decision.
- Treat any exact RPM, ranking schedule, site approval time, word count minimum or network threshold without source as an unsupported assertion.
- Never attempt to bypass paywalls, protected APIs or robots, or fake live test results.

## Reconciliation
If two sources conflict, make an explicit table: `scope`, `date`, `source`, `claim`, `what applies to current site`. A current policy outranks an outdated support summary; a provider contract can add account-specific requirements. If unresolved, label `[UNKNOWN]` and defer the sensitive change—not an unrelated safe development task.

## Delta tracking
Update `sources/official_sources.json` after meaningful source changes; add changelog entry; write a short regression test when policy affects code. Before monthly site review check documentation changelogs and fresh provider notices. This is a *reverification habit*, not a universal 30-day expiry law.
