# Independent global production-readiness assessment — 2026-11-24

**Scope:** `LETSCOOKTECH/web-earnings-master` Codex skill library, not a deployed website. Baseline `main` 20d0a768 (V15), 48 active skills. Audit branch `audit/independent-global-readiness-2026-11-24`, PR #17.

## Decision

**HOLD — NOT GLOBALLY PRODUCTION-CERTIFIED.** It is a substantial, reusable **developer guidance and verification library**, with controlled tests. It has not demonstrated that a clean agent can build and launch arbitrary profitable global websites, gain Google/ChatGPT/Bing/Claude/Perplexity citations, acquire authentic traffic, pass publisher approval or yield net operating profit.

The words "complete", "perfect", "10/10" and "dominates ranking" are not verifiable properties for a continuously changing provider ecosystem. Proprietary ranking/citation weights and provider/account data are unavailable. This report scores **specific evidence gates**, not imagined worldwide performance.

## Isolated sandbox evidence

GitHub Actions PR CI uses clean runner checkouts. Local development on the author's machine or unexecuted README claims are not treated as proof. Existing V15 baseline passed 522/522 Node tests and six CSV-tool browser tests in Chromium, Firefox and WebKit (actual download byte assertions). The independent V16 holdout introduced nine new probes; its first PR CI showed **524/531 passed, seven failed**:

1. Google meta robots `none` failed to block eligibility, despite Google's official equivalence with `noindex,nofollow`.
2. `X-Robots-Tag: none` likewise missed.
3. The V14 provider-atlas checker **rejected a newly inspected original Perplexity crawler source**, a stale hardcoded verification gate.
4. Omitted expected provider/locale cohorts still yielded a non-failing observed GEO report.
5. Partial repeat panels could inflate the observed citation denominator.
6. The Anthropic 2026 training-preference rollout vs future Google training support was not clearly documented.
7. The README still introduced 28 skills although the active inventory had 48.

These are real validation failures. Follow-up repairs and an expanded holdout suite cover Google-specific and otherbot-only header controls, document/source integrity and agent routing. The repaired branch was observed passing **533/533 Node tests** before subsequent routing-test additions; the exact final merge HEAD must pass CI again. An independent browser workflow was re-triggered for this PR by modifying `package.json`; the recorded run completed **6/6 browser tests** in Chromium, Firefox and WebKit with actual CSV output-byte assertions. Recheck exact-head status after any subsequent changes.

### Remediation performed on the audit branch

- Parse `none` as `noindex` in both Google AI audits.
- Apply only Googlebot-applicable `X-Robots-Tag` values; reject false positives from headers addressed solely to `otherbot`. Keep bounded parser limitations explicit.
- Replace the impossible Perplexity ORIGINAL_BODY_OPENED ban with a provider-specific dated source record; preserve `source_bodies_and_owner_settings_currently_verified:false` and `ai_citation_outcome_verified:false`.
- Add required preregistered `study.expected_groups` and `study.repeat_ids`; require every `{provider/locale, prompt, repeat}` attempt with `UNAVAILABLE` retained. Observational rows remain unauthenticated until captured from permitted provider interfaces.
- Reopen and document PerplexityBot vs Perplexity-User and Anthropic ClaudeBot/Claude-SearchBot/Claude-User. Anthropic says it started recognizing the shared AI-training preference on October 30, 2026; Google announced intention for early 2027. Neither is a universal "AI opt-out" across providers.
- Fix README's current active skill count and preserve the original 28-skill stage as history.

## Production-readiness evidence matrix

| Capability | Evidence available | Decision |
| --- | --- | --- |
| Codex skills routing & structure | 48 active SKILL.md files, AGENTS.md, registries, CI | **LOCAL PASS** |
| Current-source research discipline | Focused atlas: 20 provider/control surfaces, 14 marked opened-original and 6 search-result-only. Broader atlas: 21 surfaces, 8 explicitly unknown provider sources. | **PARTIAL** (original-status is metadata, not runtime validation) |
| Google technical SEO and crawler controls | V12/V15/V16 adversarial tests; bounded RFC9309 parser and header checks | **LOCAL PASS**, live indexing UNKNOWN |
| AEO factuality and answer utility | Checklists, tests for selected answer fixtures; no representative sample of real domain expert review | **PARTIAL** |
| GEO AI citation evidence | Fixed-panel schema and denominator guards; synthetic sample only | **DATA CONTRACT PASS**, external citations UNKNOWN |
| Global engines and languages | Google, OpenAI, Microsoft, Anthropic, Perplexity emphasized; other regional engines have leads/unknowns | **NOT UNIVERSALLY VERIFIED** |
| Functional tool delivery | CSV fixture in real Chromium/Firefox/WebKit, negative broken-JS and output-byte checks | **FIXTURE PASS**, general agent-generated sites UNKNOWN |
| Multilingual / geo rollout | No audited representative multilingual `hreflang`, language fallback, localized UI or legal-market deployment matrix | **UNVERIFIED** (not required for every website) |
| Security and privacy | Source-led OWASP/privacy skills and bounded checks | **PARTIAL**; no independent deployed ASVS/DAST, privacy/legal approval |
| Scaling / FinOps | 1M-MAU scenarios and bounded cost models | **MODELED ONLY**; no 1M-user live workload or invoices |
| Google/Bing owned reports | Guidance for Search Console and Bing Webmaster; no authorized owner property evidence in this project | **UNKNOWN** |
| Human task success & distribution | Research/hypothesis/traffic-hunter playbooks; no acquired and independently verified user cohort | **UNVERIFIED** |
| AdSense/other publisher compliance & economics | Policy/checklist and evidence-firewall; no real approval, actual ad impressions or reconciled net earnings | **UNVERIFIED** |

**Important:** A passing local test demonstrates the asserted test conditions on the tested input. It cannot establish that the validator models every provider edge case. An isolated runner is stronger than a text-only claim, but still not a real crawler, publisher account, unbiased population observation or production penetration test.

## Verified first-party sources used for this audit

- Google robots meta / X-Robots-Tag, including `none`, `nosnippet`, agent-scoped headers: https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag
- Google generative AI Search control vs Google-Extended, GoogleOther and future training: https://developers.google.com/search/docs/fundamentals/gen-ai-controls
- Google generative AI search best practices; no mandatory `llms.txt` / AI-only schema / artificial chunking: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- OpenAI OAI-SearchBot / GPTBot / ChatGPT-User: https://developers.openai.com/api/docs/bots
- PerplexityBot and Perplexity-User, official IP and WAF guidance: https://docs.perplexity.ai/docs/resources/perplexity-crawlers
- Anthropic Claude bot identities and Oct 30 2026 training preference: https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- Bing AI Performance / Topics beta: https://blogs.bing.com/webmaster/2026/10/introducing-topics-portfolio-beta-in-ai-performance/
- Google GenAI Search Console worldwide rollout Aug 31 2026: https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports
- Google localized content and hreflang: https://developers.google.com/search/docs/specialty/international/localized-versions
- OWASP ASVS: https://asvs.owasp.org/

## Minimum further evidence to certify an actual deployment

1. **Blind new-site agent challenge:** Give a clean agent the skills and a previously unseen user problem, with no hand-written solution or hidden fixtures. Track context cost, task decomposition, sources checked, actual shipped files and independent mutations. At least three materially different site/product types before any claim of generality.
2. **Production website independent QA:** Deploy under an owned HTTPS domain with actual response header, redirects, canonical, robots, sitemap, static/dynamic rendering, files, error handling, CSP, caching, mobile/accessibility, security, rate limiting, rollback and real monitoring. Test with Chromium, Firefox, WebKit and representative real devices; do not treat all browsers as all devices.
3. **Google/Bing owner evidence:** Authorized GSC URL Inspection, crawling/indexing and AI performance reports, Bing Webmaster metrics by property and exact report version. A crawled page is not automatically indexed; indexed is not always cited.
4. **AI source observation:** Preregister real human-question panels, provider/product/locale/repeats and negative controls; capture actual clickable sources in permitted interfaces. Measure citation fraction with honest denominator separately from brand mentions, human referral sessions and completed tasks. No manufactured citations.
5. **Originality and economics:** Benchmark distinct usefulness and cost vs competitors, recruit real users, measure job success, conversion, return, operating costs, valid publisher income and legal/ad-consent compliance. Treat hypothetical RPM, CPC, third-party KD and search volume as modeled inputs, not revenue.
6. **Global eligibility:** For each actual intended region/language, validate translated task correctness, locale identifiers, reciprocal hreflang where relevant, privacy and consumer law, provider access and site performance. No universal one-size-fits-all control.

## Governance and release rule

Do not approve production merely because `npm test` is green, the source registry is nonempty, a bot is allowed, a synthetic citation panel reports a rate, or an AI agent asserts success. Report **LOCAL_PASS / PARTIAL / EXTERNAL_UNKNOWN / BLOCK** by category, attach exact commit and artifact hashes, and require independent confirmation where provider accounts, deployment or humans are involved.

**Current recommendation:** The improved skills are suitable as a **human-supervised, evidence-first Codex development reference**. Global production readiness, autonomous generalization and commercial outcomes remain **HOLD** pending the above independent live gates.
