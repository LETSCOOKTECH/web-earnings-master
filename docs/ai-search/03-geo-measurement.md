# 03 — GEO: source quality, controlled citations and first-party measurement

## Goal
Create high-value public information and functional artifacts that humans and eligible search/answer systems can legitimately use. Evaluate provider-specific appearances in controlled studies; do not claim a secret ranking formula or manipulate citations through hidden prompts.

## Content originality strategy
A generic summary of known instructions is commodity content. Stronger source candidates are original verifiable data or calculations, independently tested same-input competitor benchmark, licensed dataset with complete methodology, actual UI/tool output, transparent corrections/version history and reliable documentation about real limits. State when tested, inputs, versions and failures; make fact verification feasible. Source worthiness does not guarantee AI inclusion.

## Retrieval mechanics: what is known vs unknown
For Google Search, publicly documented RAG/grounding and query fan-out rely on existing Search ranking/retrieval. Google's description does not reveal fan-out query lists, weights, ranking position, relative citation probabilities or internal model selection. Other LLM web search models may use separate indexes, third-party feeds, API/connector results or user browser fetch. Do not assume a single cross-provider formula. Crawler allowed != indexed != retrieved != source cited != human referral.

## Register a study BEFORE inspecting output
User-question sampling plan: actual human needs, locale, date, domain, query intent, competing sources and expected useful action. Stratify head/middle/specific-task questions, comparisons, ambiguous edge cases and negative controls. Fix sample panel and repeated trials before seeing results; don't selectively drop unfavorable responses. Record provider/product/search mode/model version when exposed, region/language/account and output timestamp. Use only permitted actual provider interfaces, no fake bot impressions or automated searches in violation of terms.

## Distinct result classes
SOURCE_CITED: visible clickable source URL in final answer. BACKGROUND_RETRIEVED: observed tool-provided source not shown; do not count as citation. BRAND_MENTION: text mention without a clickable citation; do not count as link/referral. HUMAN_REFERRAL: real website session attributed via first-party analytics; can be absent for zero-click answers. TASK_COMPLETED: real user obtains correct output. AD_EARNINGS: verified valid publisher revenue after policy/account review.

## Sampling and statistics
Citation fraction = sampled prompts with at least one verified owned-domain visible citation / sampled prompts run for the SAME provider/surface/locale/time panel. This is an observational sample rate, not general market share. Record query selection bias, date/provider changes, localization and missing data, and repeat with fixed prompt panel when evaluating a revision. Competitor citation shares require the same denominator and user query sample; compare actual URLs and visible citations, not internal retrieval. Do not add citations and referral sessions together; no claim of a statistically meaningful lift without enough unbiased observations or experimental design.

## 2026 owner reports
- Google announced dedicated Generative AI performance reports for Search and Discover June 3, 2026, initially subset rollout, followed by Google's worldwide rollout to all websites as of August 31, 2026. Its guide now directs to that report, not just classic Web performance. Report can include impressions/URLs/countries/devices/dates subject to actual availability. Existing Web totals overlap; never add impressions from both as extra clicks. Announced multimodal reporting September 2026 needs owner access and scope.
- Bing AI Performance Feb 2026 public preview includes AI citation data. June preview includes intent/topic/citation-share/compare; October Topics Portfolio beta. Exact visibility depends on account and rollout. Citation counts represent Microsoft-defined events, not ChatGPT or Google citation market share.
- ChatGPT, Claude, Perplexity may not offer equivalent independent first-party search citation dashboards. Instrument actual human referral sources and obtain allowed response observations. If source not measurable, UNKNOWN not 0.

## Funnel and monetization
Eligible public URLs -> actual crawl/index by provider -> observed citations/impressions -> human click/referral -> task starts -> verified completion -> return -> eligible valid ad opportunity -> reconciled net publisher revenue. Privacy-safe event measurements; do not send private file contents/names to analytics. AdSense earnings are not Google Ads CPC estimates.

## Stop conditions
No real user job, identical competitor solution, unsupported facts, licensed data missing, model outputs artificially prompted to cite, suspect user-agent/click bots, misleading referrals, provider trial restricted, harmful publisher placement or no actual independently verified task. Report HOLD with cheapest falsifiable test.

Official references: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide ; https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports ; https://blogs.bing.com/search/2026/6/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare/ ; https://blogs.bing.com/webmaster/2026/10/introducing-topics-portfolio-beta-in-ai-performance/

## V15 cohort completeness

Preregister study.expected_groups with surface and locale before taking any AI answers. Every observed cohort must contain all prompt_ids with UNAVAILABLE attempts included; expected cohorts missing entirely are a failure. One provider's positive replies cannot conceal another provider's missing trials. This remains an observational consistency check, not actual provider or owner authentication.

## V16 independent holdout correction: balanced repeated panels

Every sample must preregister exact `study.expected_groups` and `study.repeat_ids`, in addition to `study.prompt_ids`. Collect each {surface, locale, prompt_id, repeat_id} attempted cell (including `UNAVAILABLE`) before computing a visible-citation proportion. A missing cohort or selective extra rerun fails the experiment. Observational prompt outputs are NOT authenticated by this file validator; retain permitted original captures and independently verified real-world referrals.
