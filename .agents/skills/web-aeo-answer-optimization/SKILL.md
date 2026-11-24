---
name: web-aeo-answer-optimization
description: "Optimize real, evidence-backed answer surfaces in traditional search, snippets, PAA, voice and assistant answers without fabricated ranking guarantees."
---

# AEO — answer-engine optimization for verifiable answers

**Trigger:** Question-answer SERPs, featured snippets, People Also Ask, voice-accessible answers, answer passages, comparison questions, how-to and definitions.

**Scope & handoff:** Owns **answer formulation, passage utility, question/task coverage and answer-evaluation**. `web-technical-seo` owns HTTP/index/canonical eligibility, `web-search-visibility-systems` owns whole acquisition strategy, `web-generative-engine-optimization` owns multi-LLM citations.

**Operation:** Reopen applicable primary-source documents at execution time. Source date and market/account matter. An observed surface or passing offline validation does not prove ranking, AI citations, store listing approval, installs, publisher eligibility or revenue.

## End-to-end workflow
1. Classify intent: quick factual answer, procedural how-to, worked calculation, product decision, troubleshooting, local/regulatory or action that requires an actual working tool. Do not assume all searches need a text answer; a converter needs a usable converter.
2. Build a dated query set by locale/device and classify classic organic, featured snippet, PAA, AI Overview, AI Mode, video, shopping, local result and zero-click. Record genuine SERP observations, not imaginary answer positions.
3. Gather original source-of-truth evidence and human-reviewed domain expertise for each substantive answer, with a checked date and jurisdiction. Prefer reproducible data, input/output fixtures and primary citations over generic AI-written FAQs.
4. Design the useful answer location in visible, indexable HTML: a descriptive title and H1, contextually appropriate question headings, a short accurate direct answer, limitations/date, a tested example or genuine task action. Add comparisons, step-by-step sections or tables only when actually helpful.
5. Preserve full context: short answers must not omit exceptions, uncertainty, contraindications or financial/legal qualifiers. Use a supportable claim ledger and include source disclosure/methodology when it matters.
6. Keep semantic text/link structure accessible: HTML headings, actual anchor links, readable tables/lists, mobile reading order, accessible controls and properly announced errors. Screen-reader quality is useful; it is not a guaranteed voice-assistant citation.
7. Audit snippet/index control: live HTTP indexability, robots, canonical, snippet eligibility, nosnippet/max-snippet/data-nosnippet, featured-snippet selection being Google's choice. Never claim FAQPage markup guarantees FAQ results; Google's FAQ rich results were removed in 2026.
8. Test one answer against 3+ adversarial question variants, outdated sources, ambiguous unit/jurisdiction, common mistakes and misleading short-answer temptations; preserve actual expected answer and whether users can finish the task.
9. Measure by provider and query: actual search impression/CTR, featured snippet/PAA appearance, organic human clicks, source citation, task completion and subsequent engagement. Treat AI citation experiments separately from traditional SERP.
10. Prioritize improvements only when a verified issue has a plausible mechanism. Run controlled page revisions, track dates, confounders, query mix, gains and losses; rollback misleading or unhelpful changes.

## Hard FAIL / UNKNOWN gates
- Do not treat 'AEO score' as an official Google ranking number.
- A short quote/answer is not a substitute for functionality or original research.
- No manufactured FAQs/HowTo schema if rich-result support is absent or deprecated.
- Featured snippets are Google-selected; there is no markup that commands selection.
- No pages created exclusively for slight question permutations or fan-out variants.

## Output contract
- Dated query-question-answer matrix with page URL and observed SERP features
- Answer claim/evidence table, unsupported-claim blockers and task examples
- Index/snippet/structured-data controls checked for actual page
- Independent answer-quality and human task completion report
- Observed search clicks and causal uncertainty ledger

## Current first-party source entry points (review again before action)
- https://developers.google.com/search/docs/appearance/featured-snippets
- https://developers.google.com/search/docs/appearance/snippet
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/essentials/spam-policies
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

## References, scripts & review
- `docs/discovery/01-answer-engine-optimization.md`
- `scripts/audit-answer-page.mjs`
- `docs/research/03-manual-module-upgrade-protocol.md`

**Evidence state:** Source cited → exact provider scope/time verified → mechanism/implementation tested → independently reviewed → (only with owner credentials) live account result. Scorecards without this sequence are planning signals, not completed discovery results.

## V14 — Answer accuracy + citation readiness, not prompt tricks
Mandatory source and QA: docs/ai-search/02-answer-quality.md and docs/ai-search/05-agent-execution.md. Build direct answers for real human tasks, with original dated claims, counterexamples, correct output fixtures and useful limitations. Audit initial visible main content and actual snippet/indexing directives. No FAQ rich-result resurrection, fabricated citations, microchunk minimums or answer-page keyword swaps. Run npm run audit:ai-eligibility and real tool-output tests. A static result only proves local eligibility; Google/voice/AI source selection requires independent observed platform evidence.

## V15 — Google AI policy separation and evidence completeness
Read docs/ai-search/07-2026-11-24-provider-controls-v15.md and verify original vendor source before an action. Distinguish Google Search Console generative AI owner setting, Googlebot index/snippet eligibility, Google-Extended model-training/non-Search grounding, GoogleOther non-Search crawling and future 2027 preferences. Google says GenAI report rollout reached all websites worldwide August 31 2026; owner account metrics still need authenticated access. For comparisons preregister provider+locale and all real-user prompt IDs, including UNAVAILABLE. Run npm run audit:ai-controls, V14 diagnostics and real-browser/user tests. No rankings, AI citations, human traffic or revenue certified by local scripts.

## V16 independent global-production acceptance
Read docs/audits/2026-11-24-independent-global-readiness-v16.md and docs/ai-search/01-provider-crawlers-controls.md. Google `none` must block indexing; apply only Googlebot-scoped X-Robots-Tag values. The Perplexity primary original was opened, with Perplexity-User distinct from search crawling; Anthropic began rolling out `__usage_ai-training` recognition October 30 2026 while Google adoption is future. For GEO, preregister provider+locale+human-question+repeat cells, preserving UNAVAILABLE. Run npm run audit:independent-readiness, npm test and real-browser QA. Do not label the knowledge library globally production certified without blind-agent, deployment, live provider and user/revenue proofs.
