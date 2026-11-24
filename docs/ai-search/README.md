# Sense V14 — AEO, GEO, AI Search and Agent UX

**Mission (2026-11-24):** Make agents build accurate answers, verifiable original source assets, crawlable accessible functional tools, and credible AI search experiments. No guarantee of AI source citations, rankings, traffic, ad approval or revenue.

## Specialized chapters
1. [Provider crawler and control taxonomy](01-provider-crawlers-controls.md).
2. [Answer quality and claim proof](02-answer-quality.md).
3. [GEO experiments and first-party analytics](03-geo-measurement.md).
4. [Agent-friendly browser functionality](04-agent-task-reliability.md).
5. [Codex action workflow and acceptance gates](05-agent-execution.md).

Primary curated source registry: sources/ai_search_v14_surface_atlas.json with 19 separate product/agent surfaces. A verified original source helps interpret that particular provider's documented policy, but does not prove runtime crawler access, inclusion or citations. Use V13 source review protocol for action-time updates.

## Key distinctions
AEO = accuracy and usability of direct answers; GEO = source quality and observational visibility across AI retrieval systems; bot governance = independent policy controls for search/training/user agents; agent UX = actual end-to-end human-verified task operation. Treat bot fetch, index, retrieval, citation, referral, successful task and earned net revenue as distinct. Never assign an official single AI-rank score.

## Major 2026 verified update
Google's dedicated Search Console Generative AI performance reports were announced June 3, 2026 for Search and Discover, initially rolled out to a subset of verified sites; Google's updated post states worldwide rollout to all websites as of August 31, 2026. Actual impressions and property reports still need authenticated access. Bing introduced its AI Performance preview Feb 10, more visibility insights June 16 and Topics Portfolio beta October 13, 2026. Keep owner report rollout and reported metric definition separate from source-selection weights.

Google's guide says established SEO foundations apply to AI Overviews/Mode; indexed plus snippet-eligible content and included property are required for eligibility. Search systems decide whether to show links. It explicitly says llms.txt, artificial tiny chunks, AI-only schema and inauthentic mentions do not improve Google AI Search merely by existing. Some other products may use their own documentation formats; prove those separately.

## Production acceptance
Local source, HTML and robots tests are useful but NOT a live provider proof. Test actual hosted status/WAF/crawler origin, owner GSC and Bing reports, actual model responses in allowed interfaces, true human referrals and independent user task results. Never substitute a local JSON PASS or self-made prompt score.

Run: npm run audit:ai-surfaces, npm run audit:ai-eligibility, npm run audit:ai-observations, npm test and actual relevant browser/owner property checks. Each offline audit must say what it cannot verify.

## V14 reproducible user-question research
[Research and evaluation work order](06-evaluation-research-playbook.md) and the SYNTHETIC example question panel/blank observation ledger in templates/ai-search-v14-*.csv preserve denominator, provider/locale/date and source provenance. These are not real AI citation measurements.

## V15 independent controls and adversarial validation

Read [November 24 provider-control/evidence playbook](07-2026-11-24-provider-controls-v15.md): Google owner control, Google-Extended and GoogleOther independence; preview directives; and complete preregistered provider/locale observation panels. Run npm run audit:ai-controls, V14 audits, then real browser/owner evidence. All local results remain non-certifying.
