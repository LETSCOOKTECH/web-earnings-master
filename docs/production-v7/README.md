# Production skill acceptance — v7

This is the canonical **47-skill evidence gate** for the combined V3–V6 research branches. It covers the existing 28 plus 18 specialized additions. Every skill gets a unique artifact, independently verifiable local check, actual external verification requirement, and explicit hard stop. Do not inflate the repository by writing another copy of the same instructions into every skill.

## Bounded definitions
- **DOCUMENTED:** SKILL.md and linked manuals supply a repeatable workflow, inputs, negative checks, observable outputs and source boundaries.
- **PASS_LOCAL:** the specific code/fixture/contract check actually ran and its receipt records exact commands, timestamp and output. Static tests do not prove live site performance.
- **PASS_LIVE:** an authorized real property or service was actually exercised. Record URL, time, reviewer, logs, provider state and evidence artifact. A research-only task may require original-provider observation rather than a site.
- **BLOCKED:** a critical test failed, primary source was inaccessible, security/consent unclear, or provider status unsupported. Unknown never becomes PASS.
- **PRODUCTION_READY:** an individual *consuming project* has passed every applicable check, including page correctness, security, user value, law, and deployment. This is NOT a blanket status of all skills or a Google ranking promise.

## Per-task execution contract
1. Select only relevant skills from AGENTS.md. Read their SKILL.md, the row in `sources/production_skills_v7.json`, required references and owned-site acceptance conditions.
2. State the user problem, expected user-visible output, bounds, cost, allowed data, geography and failure modes.
3. Reopen current original vendor policy where the task is consequential. Save source URL, UTC checked time, applicable product/locale/effective date, exact excerpt and contradictions. Registry URLs or cached hashes alone are insufficient. Distinguish official MUST, provider guidance, observed behavior, estimate and hypothesis.
4. Execute task-specific positive and adversarial tests. Keep truthful artifact links and command outputs. Audit privacy, availability, disabled JavaScript, mobile, incomplete states, rate limits, bad inputs and account/region eligibility where applicable.
5. Mark each row PENDING, PASS_LOCAL, PASS_LIVE or BLOCKED. Validate evidence receipt using `node scripts/check-production-skills-v7.mjs --receipt path.json`. A success verifies receipt shape, not the authenticity or correctness of external proof.
6. No merge/deployment for a consumer product with critical stop conditions. Log rollback, owner and unverified gaps. Human approval remains mandatory for financial changes and irreversible remote actions.
7. Re-evaluate after provider changes, incident, migration, indexing shifts or new valid user data; tests and sources expire.

## Exact distinctions
- Crawl allowed != fetched != indexed != ranked != AI cited != human referred != product completed != paid ad view.
- '1 million users' is not a concurrency/load test.
- 152 Node tests and three browser-engine fixture tests on the current branch prove those fixtures, not site-level readiness.
- 5/17/35 standalone V3/V4/V5 Python tests prove those separate packs only. They do not automatically become part of this branch until their files are intentionally integrated and regression tested.
- Google Search, Bing Copilot, ChatGPT Search, Gemini, Claude and Perplexity have nonidentical controls; proprietary weights remain unknown.
- Source freshness reviews and publisher account approvals are per-action/per-property, never permanently certified by this document.

## Sources to reopen (selection, not exhaustive)
- Google Search Essentials https://developers.google.com/search/docs/essentials
- Google Search AI features https://developers.google.com/search/docs/appearance/ai-features
- Google generative guidance https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- OpenAI crawler purpose https://developers.openai.com/api/docs/bots
- Microsoft grounding controls https://blogs.bing.com/search/2026/10/your-content-your-choice-clearer-preferences-for-training-and-grounding/
- Google AdSense program policies https://support.google.com/adsense/answer/48182
- Google Publisher Policies https://support.google.com/adsense/answer/10502938
- OWASP ASVS 5 https://asvs.owasp.org/
- Official supporting registries in sources/ and current legal texts as applicable

## Release logic
Documentation/skill merge may proceed with clean CI and review; it must **not** claim live search eligibility, ranking, citations, ad approval, production million-user capacity or security certification. New site launch requires property-specific live evidence and owner acceptance, independently of this library merge.

## V8 registry extension
Traffic Hunter is the 47th skill. The same per-skill evidence contract applies; local channel evaluation cannot certify a live campaign or actual AdSense traffic quality. See `docs/traffic-hunter/ACCEPTANCE.md`.
