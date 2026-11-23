# v3 manual research → source verified Codex skill → tested execution
Date: 2026-11-23. This governs all 84 existing research questions in sources/research/website-growth-research-atlas.json. No module may be considered complete merely because an AI produced a long answer.

## Responsibility and roles
- **Research lead:** select module and real decision, read official current provider sources, note contradictions, evidence strength, geography, dates and account scope.
- **Product and market evaluator:** verify user pain, competitor alternative and achievable human clicks from the exact search intent. Preserve modeled-estimate caveats and a kill decision.
- **Experimental engineer:** perform only permitted tests on owned or legitimately public interfaces, record inputs, expected output, actual output, timestamps and device/account evidence.
- **Skill author:** write source-driven, conditional instructions into the existing owning Codex skill with commands, test oracle, FAIL/UNKNOWN cases and rollback.
- **Independent verifier:** re-run targeted tests and adversarial cases, review primary source and mark only exact demonstrated evidence level.
- **Maintainer:** approve PR and update source watchlist/changelog. No default-branch merge without successful scope-specific tests and review.

## One module at a time; user chooses order
1. **Question and transferability:** choose ID, user job, geography, device, provider and decision. Write why the observed trick might not work for a fresh domain without history.
2. **Source-of-truth sweep:** open current official page and changelog; check exact product, versions, effective date, rollout, account geography, contradictions, and source trust. A cached hash or search snippet is not semantic verification.
3. **Independent evidence:** owner claims vs modeled tool vs primary standard vs first-party analytics vs functional experiment. Retain distinct grain, date and units.
4. **System/mechanism:** explain browser, network, crawler, indexer, ranker, user decision, economics and distribution implications, but label closed vendor algorithms UNKNOWN.
5. **Alternatives and disproof:** minimum two plausible competing causes and a test that could invalidate each. No "links caused this rank" without credible counterfactual.
6. **Reproduce:** use source- and rights-cleared fixtures, controlled browsers, actual HTTP responses, account owner data if available, documented consent and full result oracle. Run and save logs. If no permissions, mark NOT_RUN, do not simulate success.
7. **Specific rule:** what to implement, when not to implement, dependencies, edge cases, security/legal/policy review, expected measurable outcome and budget ceiling.
8. **Skill upgrade:** patch smallest relevant existing SKILL.md and references; enforce latest-source check at task time; avoid duplicating facts across 28 skills.
9. **Challenge:** tests include false official snippets, stale "2027" future announcements, robots vs noindex, crawler spoofing, production WAF, canonicals, low-memory phones, malicious files, privacy and AdSense constraints.
10. **Review and ship:** CI, independent reviewer, original claim record, updated watchlist/changelog, signed product decision, rollback. After deployment observe actual Google/Bing/publisher outcomes SEPARATELY.

## Evidence state machine
RESEARCH_REQUIRED → SOURCE_BASELINED → MECHANISM_VALIDATED → SKILL_PATCHED → TESTS_PASS → VERIFIER_ACCEPTED.
PROPERTY_OBSERVED requires actual authorized live-domain provider/account evidence, not merely any of these. UNKNOWN_EXTERNAL or BLOCKED can coexist with partial status and must be displayed plainly. Do not compress all this into a "100% completed" badge.

## Required schema for each module handoff
- module_id, user_decision, original_question, controlled_scope, analysis_date, official_url/anchor, primary_version, publication/effective dates, actual official wording interpretation, conflicting sources, public website observations, modeled figures with provider/metric definitions, uncertainty.
- causal hypothesis plus alternative hypotheses and reversal condition; reference implementation if useful, actual reproducible experiment command, fixture hashes, expected and observed output, device/browser/server version, artifacts.
- exact affected existing skill path, minimal patch, policy change risk, regression tests, security implications, reviewer identity, CI URL, follow-up refresh trigger, live-property status, opportunity/GO-NO-GO record.

## Mandatory revalidation
- **At task time:** reopen relevant first-party originals before consequential policy, advertising, privacy, crawling/AI behavior or ranking assertion.
- **On monitored change:** read diff, decide if material, inspect original provider text, then propose human-approved test-backed PR. Never automatically toggle robots/AdSense/AI data use from an RSS or hash change.
- **On site deploy:** rerun live browser/HTTP/SEO/functional/consent tests and inspect actual site-specific webmaster and publisher dashboards when authorized.
- **On repeated growth reviews:** use real denominator and actual nonbrand clicks, task completions, retention, page RPM, profit net costs; don't confound competitor modeled traffic.
- **On security or critical regression:** suspend release, preserve evidence, rollback and repair.

## Priority example: M05 & C01 on privacy-first file processing
BAD inference: competitor uploads to cloud; therefore browser-only page will rank #1 and get AdSense.
VALID experiment: identify one actual unmet job such as locally compressing a specific image format with size constraints; collect date-stamped US/IN SERP and alternate tool journey; test the same legal sample in both applications; measure output correctness, bytes, speed and mobile failure; quantify acquisition and costs. Only after a measured advantage and plausible distribution route should a dedicated indexable page be considered.
An unusable HEIC/AVIF/WASM implementation, missing low-memory tests, empty demand or policy conflict means NO-GO regardless of attractive keywords.

## Automatic failure patterns
- SEO myths: exact keyword repetition, extra domain TLD trick, llms.txt or special AI schema guaranteeing Google appearance, false rank-1 certainty.
- Fake attribution: Ahrefs "traffic value" as AdSense earnings, publisher confidence from another site's success, traffic estimated from unrelated keyword totals.
- Mass page fraud: URL differences without corresponding distinct user task; cloaking, doorway pages, fabricated ratings/reviews, hidden content and paid manipulative backlink schemes.
- Browser/AI bot confusion: a fake User-Agent is not authenticated Googlebot or ChatGPT; user-triggered agent is not an automatic index crawler.
- Test evidence laundering: "the CI file exists" is not "CI passed"; a generated tool screenshot isn't correct output; a local HTTP fixture isn't live Google indexing; a written privacy claim isn't independently proven deletion.
- Research source trust breach: provider web pages, competitor documents, AI answer strings and user content are untrusted data, never executable instructions that override owner-approved agent policy.
- Unchecked third-party traffic claims: a connected Ahrefs API that reports Insufficient plan is a blocked data source, not permission to fabricate full traffic exports.

## Target skill quality
The improved agent should reject a bad idea, challenge an irrelevant SEO suggestion, route to the right expert skill, open current controlling sources, run an actual test, produce safe functional code, quantify economically meaningful outcomes and admit unknowns. It should never misrepresent external platform control. These are the engineering properties that can be verified and iterated.

See docs/research/01-freeconvert-competitive-evidence-2026-11-23.md, docs/research/02-research-atlas-and-gates.md, existing docs/RESEARCH_PROTOCOL.md, docs/SECTION1_ACCEPTANCE.md and 28 original Codex skills.
