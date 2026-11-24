# 06 — Reproducible AI Search observational studies and business decisions

## Research question
The real objective is not “be cited by every LLM.” Define one consumer product, exact mode, human audience, country/language/device and job. Example: “When people need to remove duplicate rows from CSV files, do links to a tested local tool appear as supporting sources in ChatGPT Search, and do any people complete the task?” Answer must distinguish sampled citations, actual referrals, correct outcomes and net revenue.

## Sampling frame and prompts
Before interacting with provider, register the study date, source-of-question dataset and fixed prompt IDs from actual permitted human questions/user support, including tasks where you would expect **not** to be cited. Avoid constructing only prompts that mention your brand, prompt injection designed to force citations or local model “prediction” output as a fake observation. Keep prompt wording, country, language, account mode, user intent and dates for repeatability. Each provider/surface gets its own denominator; an API search completion is not identical to a ChatGPT consumer experience.

Use templates/ai-search-v14-question-panel.SYNTHETIC.csv as a **schema example only**, and templates/ai-search-v14-observation-ledger.csv for actual authorized captures. Never publish private prompts, account cookies, personally identifying data or complete third-party articles.

## Outcome taxonomy
- UNAVAILABLE: interface/api failure, access limit, no permission or response unavailable. Preserve in denominator and report why.
- OBSERVED_NO_SOURCE: the response was actually observed but none of your URLs were cited.
- SOURCE_CITED: the final visible answer links to a source URL under an explicitly configured exact domain. Record precise original URL, resolved canonical and source rank/presentation if observable.
- BACKGROUND_RETRIEVED: retrieval/tool result appeared in logs but NOT as final visible citation. Never count as cited.
- BRAND_MENTION: product or organization mentioned in text without clickable owned citation. Separate from citation.
- HUMAN_REFERRAL: independently measured actual user session attributed through owned analytics, not a model-generated link count.
- VERIFIED_TASK: independently correct user output delivered, no false success UI.
- NET_AD_REVENUE: real publisher-account income after policy, traffic quality and operating cost; no advertiser CPC formulas.

## Metric denominators and uncertainty
Attempted prompts N, observed responses M, unavailable N-M, own visible cited response count C. Primary sampled proportion C/N, with C/M separately labeled as conditional on successfully observed responses; never hide unavailable prompts. A citation might include several source URLs but is counted only once per prompt-run for a boolean study. Sampled result is observational, sensitive to locale, account and model updates, with selection bias; don't promote it into market-wide AI share of voice. Competitor citation comparison uses the SAME fixed panel, time window and provider mode. Stop strong causal claims from tiny panels, algorithm updates or unbalanced query mixes.

## Direct source and falsification
Before any claims about crawler inclusion, fetch current first-party provider original docs and check exact section/effective date; a search snippet is a lead, not verified rule. For source quality, compare original benchmarks with same-input competitor outputs, counterexamples and negative controls. Test rendering/no-JS/robots, actual URL Inspection and owner generative inclusion where available. A successful robots audit is local only, not a real provider fetch.

## 2026 owner reporting
Google Search Console Generative AI performance reports: announced June 3, 2026; initial rollout to a subset of sites, followed by vendor-confirmed worldwide rollout by August 31, 2026. Include impressions/URL/country/device/date as documented, not automatically add Web performance totals (overlap). No separate universal AI report API guaranteed from that blog post; inspect actual owner interface and exact documented export support. Bing AI Performance early 2026 preview and June/October expansions similarly owner/beta-dependent. Export provider-defined reporting metrics separately from human analytics and your prompt observation panel.

## Controlled improvement loop
One hypothesis and unit change: material factual error, missing indexability, blocked search bot, missing source methodology, broken download, unsourced claim, or inaccessible agent UI. Record pre/post exact deploy commit, page/geo, concurrent changes and preserved prompt panel. Check technical negative tests first, actual owner account next and real human task outcomes later. Report alternate explanations. Do not promise citation improvement based on adding FAQ schema, llms.txt or keyword density. If useful original job has no monetizable clicks because AI answers completely resolve it, modify acquisition model or choose a job requiring real human file output, rather than force extra ad-only pages.

## Decision rule and handoff
GO when real unique human task, working tool, honest source and legal crawler preference, plus approved measurement plan exist. HOLD when source original/owner property/provider access is unavailable or claim correctness is unverified. BLOCK for fabricated citations, fake reviews, AI-prompt injection, paid link/traffic manipulation, disabled privacy controls or unsafe user data exposure. Deliver logs/reproducible artifact, denominator, independent observed outcome, uncertainty, experiment cost and next cheapest proof.

Sources: https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports ; https://developers.google.com/search/docs/fundamentals/ai-optimization-guide ; https://developers.openai.com/api/docs/bots ; https://web.dev/articles/ai-agent-site-ux

## V15 complete provider cohorts

Before observation register study.expected_groups as explicit surface/locale pairs, alongside the fixed human prompt panel. Every intended provider needs all question attempts, including UNAVAILABLE. The updated evaluator rejects omitted cohorts and partial provider trials; provider UI and actual answers remain unverified by any manifest alone.
