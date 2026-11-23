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

## Advanced source-refresh rule — v2.2
Selected official sources listed in sources/foundation_refresh_targets.json may be watched daily by .github/workflows/foundation-source-watch.yml once merged into default. That workflow produces only hashed content/reachability review signals. It does not interpret policy or certify browser, ranking, AI training, or ad compliance. Before any consequential decision, Codex must re-open original provider text, identify announcement vs effective date vs rollout vs actual property state, inspect contradictory official sources and update exact claim evidence. Microsoft AI Training/Grounding controls announced October 2026 are future effective starting February 2027; IETF AIPREF Internet-Drafts have no universal live compliance guarantee. Google Search does not need llms.txt, and Brave's crawler does not advertise a distinct UA. See docs/foundations/14-search-engine-provider-atlas.md and docs/foundations/16-modern-search-changes-2026-2027.md.


## v2.3 evidence authority and current freshness
Every original skill now links exact official source entry points and must reopen them at action time, never simply quote last-run JSON. sources/verified_claims.json records 46 dated selected first-party assertions plus two unavailable cases, not unconditional provider truth. sources/foundation_refresh_targets.json watches 32 sources via a GitHub Action that emits review changes and optionally files an issue AFTER default-branch merge; the workflow MUST NOT rewrite production policies based on a changed hash. Current documentation, effective dates, account/region rollout, source contradictions and exact test artifacts are mandatory for decisions that alter site crawling, privacy, ad experience, Search indexing or AI data-use. See docs/foundations/19-provider-source-verification.md.
