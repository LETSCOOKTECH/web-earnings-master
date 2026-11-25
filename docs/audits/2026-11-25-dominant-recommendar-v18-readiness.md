# Dominant Recommendar — Independent V18 production-readiness audit
**Assessment date:** 2026-11-25 (Asia/Kolkata)  
**Target:** `web-dominant-recommendar` Codex skill, operator documents, source atlas and recommendation panel evaluator in `LETSCOOKTECH/web-earnings-master`  
**Baseline:** `main` 3fe22b591a88b3ccb4122ab7b305be0590cc65cf — 49 active skills, 18 recorded AI product surfaces, 17 source records, 8 surface-specific recommendation mechanisms explicitly unverified.  
**Independent audit:** PR #19, branch `audit/dominant-recommendar-v18-evidence-integrity-2026-11-25`.

## Decision

**CONDITIONAL GO for a human-supervised research/development skill; NO-GO for declaring live recommendation-ranking performance or autonomous global production certification.** It offers an actionable, provider-aware, evidence-conscious work program; it cannot promise placement in Google AI Overviews/Mode, ChatGPT Search, Perplexity, Bing, Claude or all chat assistants. The ranking systems and product surfaces are not controlled by this repository.

## Independent negative-test results
New holdouts were not copied from the V17 acceptance suite. Their first GitHub Actions clean-runner execution against the V17 code showed **607 passed / 9 failed / 616 total**. The nine failing checks revealed six operational defect classes:

1. **Capture reuse**: distinct AI-answer attempts could point to the exact same evidence locator, inflating the appearance of independent repeated measurements. Even V17's committed synthetic fixture reused one artifact string for six answers.
2. **Model-version drift**: captured product_version did not have to equal its preregistered provider+locale cohort. The committed fixture's declared model version also disagreed with its observed runs.
3. **Geography drift**: no actual attempted/captured region was required, so results for a specific country were structurally indistinguishable from another country.
4. **Malformed result crash**: a null recommendation array entry could throw instead of returning a controlled invalid-panel status.
5. **Stale source dates**: the provider original-source validator rejected future dates but accepted arbitrarily old dates as if they were currently checked.
6. **Sentiment inconsistency**: obvious negative language such as `Avoid <brand>` could be annotated as a positive recommendation without a local rejection.

The repairs require unique, attempt-identifying capture references; equal registered and captured model versions; ISO two-letter attempted geography for all runs, including UNAVAILABLE, plus captured geography for observations; fail-closed malformed recommendation handling; a default **30-day baseline source-review age gate**; and bounded negative-phrase contradiction checks. Synthetic IDs remain explicitly **NOT REAL CAPTURES**, and no regex can certify true answer sentiment or authentic screenshots.

Latest observed repaired-node test run: **616/616 passed** on PR #19 prior to final documentation and CI-trigger changes. Recheck final HEAD checks and browser job before merging; do not cite an earlier commit as independent proof of a later one.

## First-party policy research, directly reopened on assessment date

- Google AI features: https://developers.google.com/search/docs/appearance/ai-features — indexed/snippet-eligible is a necessary eligibility condition, not a citation guarantee.
- Google AI optimization: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide — useful, original and technically eligible content; no private published rank-weight formula.
- Google Preferred Sources: https://developers.google.com/search/docs/appearance/preferred-sources — a reader-chosen publisher feature, not universal priority for every utility tool.
- Google generative Search Console reports: https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports — property metrics require authenticated owner access.
- OpenAI consumer ChatGPT Search: https://help.openai.com/en/articles/9237897-searching-the-web-with-chatgpt — search crawl/IP, results and citations; not guaranteed positions.
- OpenAI separate API: https://developers.openai.com/api/docs/guides/tools-web-search — the API response and consumer ChatGPT Search are distinct observable products.
- Perplexity crawler taxonomy: https://docs.perplexity.ai/docs/resources/perplexity-crawlers — search-crawler vs user-fetch roles; does not publish a top-recommendation formula.
- Bing Webmaster AI Performance (Feb 2026) and Topics Portfolio (Oct 2026): https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/ and https://blogs.bing.com/webmaster/2026/10/introducing-topics-portfolio-beta-in-ai-performance/ — source citations/topics, not independently verified first-place recommendations.
- Anthropic crawler taxonomy and web search: https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler and https://support.claude.com/en/articles/10684626-enable-and-use-web-search — separate robots and mode availability, not a disclosed recommendation scoring algorithm.

Provider documentation is current only as of the inspected content; reopen before significant implementation or publication decisions. Stored source flags and timestamps are not cryptographic evidence of owner-account settings or AI model outputs.

## Readiness gates

| Gate | Evidence from this audit | Result |
| --- | --- | --- |
| Skill manifest, Codex routing and 49-skill registry | Existing repository checks | LOCAL PASS |
| Provider distinctions and first-party guidance | Relevant originals inspected, provider-specific bounds recorded | PASS for selected sources; other products UNKNOWN |
| Adversarial panel denominator/data integrity | 9 independent failed cases found and repairs tested | LOCAL PASS on tested cases |
| Capture authenticity / reviewer independence | Synthetic file; no independently authenticated live answer | EXTERNAL UNKNOWN |
| True sentiment / preference order in real provider UI | Operator text labels, heuristic negative screening only | EXTERNAL UNKNOWN |
| Global regional/language/model variation | Country metadata now required; no representative live global experiment | EXTERNAL UNKNOWN |
| Web-tool competitor advantages and genuine users | No independent new benchmark or recruitment | EXTERNAL UNKNOWN |
| Google/Bing indexed presence and owner report metrics | No owner-authorized property records supplied | EXTERNAL UNKNOWN |
| Conversion and AdSense economics | No genuine traffic or reconciled publisher revenue | EXTERNAL UNKNOWN |

## Minimum real-world certification path

1. Pick an **actual owned and deployed** useful website/tool and 2–3 genuinely tested competitors. Publish reproducible benchmark outcomes and disclose when alternatives are superior.
2. Independently check Google/Bing indexing, owner generative control, real WAF/crawler access and page quality. Distinguish crawl, index, user-visible citation, brand mention and positive endorsement.
3. Pre-register authentic human tasks **before** model queries by product, country, language, device, precise model/version and repeats; preserve all absent, unfavorable and negative outcomes. Capture actual authorized UI/API answers with independently reviewable original artifacts.
4. Evaluate the unbranded positive-recommendation share and separate visible citation share. The “first-place rate” applies **only** where the provider actually gives an explicitly ordered competitive answer. Report denominator and sampled uncertainty; a nonrandom query panel is not the full AI market.
5. Reproduce with an independent agent and independent review. Audit source statements, malformed/sensitive data, policy and real-world performance; measure user task completion, repeat usage and qualified revenue separately.
6. Do not certify universal rank #1 or global domination. Success is a time-bounded measurable recommendation improvement for named tasks, regions and providers, supported by authentic external evidence.

**Current skill release status:** `SUPERVISED_USE_READY / GLOBAL_OUTCOME_UNVERIFIED`. All synthetic result flags must remain structural and **not** owner-account or provider-output proof.
