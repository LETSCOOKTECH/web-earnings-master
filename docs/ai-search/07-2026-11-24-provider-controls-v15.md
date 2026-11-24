# 07 — V15 current AEO/GEO control and evidence gate (2026-11-24)

**Purpose:** A focused correction to the V14 provider-grounding skills. This is a technical and editorial skill guide, not an AI ranking recipe. It MUST be read with chapters 01–06 and the existing SEO and user-task validation skills. Local scanners cannot certify Search Console, external AI citations or earnings.

## First-party sources reopened November 24, 2026

1. Google, *Control how your content is used for generative AI at Google*, https://developers.google.com/search/docs/fundamentals/gen-ai-controls — original page body opened November 24, 2026; page states Last updated 2026-11-24 UTC.
2. Google, *Optimizing your website for generative AI features on Google Search*, https://developers.google.com/search/docs/fundamentals/ai-optimization-guide — original page body opened November 24, 2026.
3. Google, *Introducing Search Generative AI performance reports in Search Console*, https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports — original body reopened November 24; post dated June 3; note states worldwide rollout as of August 31, 2026.
4. Microsoft Bing, *Introducing Topics Portfolio (Beta) in AI Performance*, https://blogs.bing.com/webmaster/2026/10/introducing-topics-portfolio-beta-in-ai-performance/ — original body opened November 24; beta article dated October 13, 2026.
5. OpenAI, *Overview of OpenAI Crawlers*, https://developers.openai.com/api/docs/bots — original body opened November 24. Reopen per-action; never conflate OAI-SearchBot with training GPTBot or user-triggered ChatGPT-User.

**Evidence boundaries:** This is a dated human interpretation, not permanent vendor truth. Source body access does not verify property-level settings, crawler access at your CDN, exact bot identity, source selection, citation, click or profit. Browser sessions/search result pages may vary by product, language, geography and account.

## Google Search AI versus other model uses: decision matrix

| Independent surface | Current published mechanism | Agent must do | Must NOT infer |
| --- | --- | --- | --- |
| Google Search AI Overviews, AI Mode, Discover generative features | Google Search index + eligible snippet, Googlebot access and Search generative AI owner inclusion | Verify live Googlebot route, snippets and owner Search Console control without changing it | Google-Extended allowed is **not** the Search AI opt-in |
| Search generative AI control | Search Console setting can exclude site links/content from Search generative AI grounding/display without affecting ordinary Search ranking or model training | Read authenticated owner state with permission, else UNKNOWN | A robots text cannot prove the owner control setting |
| Google-Extended | Robots token limits described model training AND certain non-Search generative product grounding; not Search inclusion | Assess owner desired use and RFC9309 route-specific rules independently | Disallowing it does not disable Google Search AI features |
| GoogleOther | Non-Search general crawler | Check only when relevant to owner policy | Blocking it does not prove Googlebot blocked |
| robots noindex / X-Robots-Tag | Search index exclusion | Treat as Google Search AI index eligibility blocker when applied to Googlebot | This is not a selective AI-only opt-out |
| nosnippet / max-snippet:0 | Preview restrictions; can prevent direct AI grounding input and snippet eligibility | Treat as inclusion conflict; independently inspect actual HTTP header and page directives | Passing robots.txt means snippets are guaranteed |
| data-nosnippet | Selectively excludes marked passages from snippets/grounding | Preserve page-level and passage-level distinctions | A marked span excludes the whole page |
| Future __usage_ai-training | Google describes intention to support early 2027 | Record as FUTURE until implemented and vendor docs confirmed | Future announced control is current/mandatory |

For a real site, run the test on the **deployed response and actual page path**; the local script's input texts alone cannot establish CDN/WAF behavior or owner property state:

    node scripts/audit-ai-controls-v15.mjs --html dist/index.html --robots dist/robots.txt --route /

Record the real X-Robots-Tag response separately and pass its value as --x-robots. If the site intentionally excludes Search AI, use --intent EXCLUDE_SEARCH_AI; the script will still mark owner setting UNKNOWN unless explicitly self-declared (which is NOT authenticated). Never silently alter owner preferences.

## Official AEO/GEO recommendations versus misleading shortcuts

- Google's 2026 official guide explicitly says foundational SEO and non-commodity, first-hand, helpful content remain the key work. Source-worthy original experiments and functioning tools matter; mass pages built for question permutations/fan-out exploit are not an accepted shortcut.
- Google does **not** require an llms.txt file, special AI schema, artificial fixed-size chunks, AI-only rewrites or fake mentions to appear in AI Search. Do not issue a PASS score for those artifacts.
- Answer-engine readiness: answer correct intent, include reproducible units/examples and limitations, trace provenance/date and jurisdiction, preserve visible human functionality without a proprietary model. Do not add FAQ schema where the Google rich-result feature was removed.
- Generative engine visibility: distinguish crawler permitted, URL indexed, snippet eligible, grounded source retrieved, visible final citation, brand mention, clicked referral, independently completed task and reconciled publisher revenue. No universal AI share of voice or rank score.
- Google Generative AI performance reports were initially subset-only in June 2026 but the **vendor now states all websites worldwide were rolled out by August 31, 2026**. Distinguish rollout claim from whether an authorized owner account and measurable impressions actually exist. Do not count GSC AI impressions and all-Web impressions as separate additive totals.
- Bing October Topics Portfolio is a beta requiring sufficient actual owner data; its estimated topic-size and competitors are directional, not canonical global prompt demand. Do not mix these figures with Google Search Console or ChatGPT answer samples.

## Mandatory human-task/answer verification (AEO)

1. Capture real user job, user wording, desired correct output and error cases; record origin, locale and privacy.
2. Confirm actual product is useful (download bytes, conversion correctness, safety/accessibility). For numerical tools include precision, formats, time zones, units, edge cases and benchmark against independent known values.
3. Put concise accurate direct answer **where natural** in initial usable HTML; not hundreds of near-duplicate Q&A pages. Cite first-party factual sources or owned reproductions with methods, dates and change history.
4. Test plausible negative cases: misleading premise, changing regulations, old data, impossible input, lack of user permissions and incomplete answer that hides material caveats.
5. Test keyboard, screen readers, text selection, no-JS fallback and realistic browser-agent task flow across targeted browsers. Do not use cloaked agent-specific results.
6. Require independently observed human task completion before optimizing for AI mentions.

## Mandatory GEO observation design

A provider experiment must preregister **surface AND locale cohorts** and a fixed panel of real user-question IDs. Each expected cohort must have each registered prompt attempt, including UNAVAILABLE. For repeat experiments, declare repeat identifiers and preserve all attempts. The stricter V15 checker now rejects missing questions inside a cohort or entirely missing expected cohorts. Use the updated SYNTHETIC template for format only; no synthetic row represents a real citation.

Observe explicit final clickable owned source URLs; separately track tool-result retrieval and plain brand mentions. Resolve canonical and redirect independently if permitted. Count citations per attempted prompt-run with visible and observed-only denominators labeled. Record exact date, product mode, account tier where known, region, prompt, status and evidence capture; do not infer population-wide market share.

For actual owner analytics, collect first-party Search Console and Bing Webmaster measurements with separately defined source fields, live human referrals and successful tasks; **never infer one metric from another**.

## V15 acceptance gates and adversarial mutation protocol

| Gate | Required evidence | Failure mode to mutate |
| --- | --- | --- |
| Google control separation | Independent Googlebot, Google-Extended, GoogleOther and Search Console owner status | Block Extended only; Search AI result must NOT change to blocked |
| Google preview/index | Real HTML AND HTTP headers plus owner inspection | Inject noindex, nosnippet and max-snippet:0; local inclusion must fail |
| Route-specific robots | Per-crawler RFC9309 checks | Disallow parent, Allow specific tool path |
| Answer factuality | Original source, example and independent calculation/tool output | Make one answer wrong without damaging SEO tags |
| Multi-provider observation | Pre-registered source question and complete cohorts | Omit one provider's unfavorable prompt or expected provider entirely; validator must fail |
| Attribution boundary | Owner permission and actual session data | Inject fake citations/revenue into manifest; reject |
| Public result quality | Browser-complete task, non-commodity original value, no cloaking | Test download wrong bytes/JS broken despite strong metadata |
| Reporting freshness | Official original body, effective date, owner report availability | Change worldwide rollout back to outdated subset-only claim; review required |

Use existing V12 independent browser and evidence firewalls in addition to V14 eligibility and V15 control tests. An agent must return GO/HOLD/BLOCK, unresolved risks and minimum next live falsification; **local success is not a production certification**.

## Remaining explicit unknowns

No agent can infer hidden Google model weights, predicted source selection, ChatGPT search ranking formula, future controls, global AI citation rate or an account's actual dashboard from this repository. Live external evidence must be collected with authorized access and current provider rules. If site/owner information is unavailable, finish local scope and return HOLD rather than fabricate it.
