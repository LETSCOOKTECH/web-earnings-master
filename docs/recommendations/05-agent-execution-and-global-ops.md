# 05 — Codex recommendation campaign: execution, testing, growth and global ops

## Contract
Build a repeatable skill-driven program that earns legitimate AI tool recommendations because a specific user job is measurably well served. Do not build an answer-engine spoofing system or promise #1. Every recommendation finding must tie to a provider product, locale, dated prompt and raw provenance. This is a specialized skill, not a replacement for web-technical-seo, web-aeo-answer-optimization or product validation.

### Phase 0: baseline questions and business case (GATE: real demand)
Inputs: owned domain, exact tool/category, audience and geography, languages, privacy/consent jurisdiction, competitor names, target device, budget and paid/free tool restrictions.
Outputs: 5–30 human-originated task prompts per cohort, intent labels, non-branded primary set, expected product/provider surfaces, a competitor benchmark plan and measurable user job success oracle.
STOP if zero real problem, no defendable unique product value, inability to lawfully access study source or missing owner authorization. Unbranded user questions avoid inflating scores by asking the system to recommend your brand explicitly.

### Phase 1: inspect living first-party provider sources (GATE: current source)
Run docs/RESEARCH_PROTOCOL.md and docs/seo-master/08-live-source-verification-v13.md. Read current relevant originals from sources/dominant_recommendar_v17_sources.json and provider current changelog. For each material rule, capture:
- source URL and exact relevant section, original-body access vs lead/search result;
- observation time in UTC, effective vs announced or beta date;
- platform product, geography, account setting and deployment dependencies;
- alternate/contradictory official sources and scope resolution;
- proof that this site's deployed header/owner settings match the intended instruction, or UNKNOWN.
Do not treat an authenticated tool reply and an unverified public snippet as equal. A source registry is research provenance, not an authority guarantee.

### Phase 2: actual product value (GATE: independent task oracle)
Execute competitor tasks using same permitted input and output oracle, capture working file outputs, privacy/network tests, accessibility, pricing, documented inaccuracies and time. Build the minimum winning feature; no self-invented weaknesses, vanity counts or fake "best" claims. Test real user usefulness and expose original methodology.
Handoff: web-product-spec, web-product-validation, web-workload-architecture-router and web-security-assurance-asvs. A working tool is a necessary business condition, not a ranking factor confirmed by providers.

### Phase 3: source architecture and provider access (GATE: independent first-party checks)
Website assets should include understandable initial HTML and visible methodology, appropriate distinct intent pages, product/price/limitations, actual comparison tables where benchmarked, original visual/demo assets if relevant, privacy/legal and real support. Audit canonical, site navigation, sitemap, intended index/snippet, structured data accuracy, robots and real WAF/IP logs for the relevant crawler. Ask the owner before changing robots/training settings or third-party CMP behavior.
Special cases: Google AI Search generative control in authorized Search Console; Gemini non-search and Google-Extended separately; Bing AI owner reports; Google Preferred Sources only after qualifying publication/domain appears in tool; Perplexity-User may ignore robots for user requests; real merchant/business profiles only when appropriate. Do not create misleading listings.

### Phase 4: independent distribution and reputation (GATE: permission + authenticity)
Publish a reproducible public benchmark dataset if legal; request real optional feedback from users; launch in relevant communities within their rules; seek independent critiques and act on them; create real tutorials and integrations that solve the problem; engage genuine experts and correct misinformation; tag sponsorships. Never mass scrape forums, pay for fabricated reviews, produce deceptive affiliate comparison pages, exploit user-generated prompts or create fake sites solely as external references.

### Phase 5: preregister provider experiments (GATE: complete sample and honest label)
Use template OPERATOR_WORK_ORDER.md. Prior to collecting answer observations freeze target, competitors, real human prompts, locale/geo, provider/mode/version, repeat IDs, planned baseline and follow-up. Keep each planned cohort and run, including UNAVAILABLE and answer "we do not recommend this product." Capture permitted source response with precise quote and visible citation URL; use second reviewer for a subset.
Run npm run audit:recommendar-sources and npm run audit:recommendar-panel; unit tests for false positives, prompts, owner citations, explicit order and consumer/provider differences. Local evaluator validates only consistency and must say external output UNKNOWN.
Use original question panel for before-after and a held-out unseen question set for generalization. Changing pages and questions simultaneously prevents causal attribution.

### Phase 6: diagnose first failure, not vanity score (GATE: independent change test)
- Page not served / crawler challenged: repair HTTP/crawler/WAF. No ranking experiment yet.
- Crawled but not indexed: diagnose quality, canonical and property exclusion; do not assume indexing from site: query.
- Indexed but not surfaced in AI answers: check real task relevance, provenance and source selection, competing independent sources; not a guaranteed keyword knob.
- Cited but not positively recommended: compare task performance, user constraints, trust/limits, editor quality and competitor strength.
- Recommended but not explicitly first: the "not first" statement exists only in an ordered list, not an unranked paragraph. Fix measurable weaknesses, not manipulation.
- Real referrals but poor conversion: repair tool UX, speed, errors, onboarding and economics.
- Good conversions but no profit: evaluate qualified demand, RPM, retention, compliance, hosting cost and publisher restrictions.

For each fix produce a minimal measurable hypothesis, change, separate output oracle, rollback rule, actual observed results with intervals and current threats. Label all uncertainty.

## Scale and global-market boundaries
Multiple countries create additional legal/privacy/translation/provider availability and competitive ecosystems. Do not call a single en-US sample global. Partition by language, locale, device, query intent, provider mode and vertical; real translated tasks need their own QA and accurate hreflang. Geographic restrictions must not be bypassed to fake a metric. Low-RAM/low-bandwidth real user devices need dedicated checks. Respect consent and children's protections where applicable. A million-user serving model is a capacity hypothesis until load and business economics are independently validated.

## Evidence packet directory
Campaign files should contain:
- campaign-brief.md (job/segments/competition/budget and actual unique advantage)
- source-checks.json or dated provenance log
- competitor-matrix.md with original measurement artifacts
- page-map.md and SEO/AI technical audit receipts
- recommendation-panel.json with one complete fixed panel per product/locale
- originals/ with permissioned raw screenshots/API response IDs, access-controlled outside public repository
- evaluator-report.json with structural-only status
- external-owner-report.md (actual signed-in Google/Bing records if authorized, otherwise UNKNOWN)
- human-funnel.md (real task outcome, return and revenue distinct)
- decisions.md (failures, intervention, previous/holdout comparisons, rollback)
Do not commit account IDs, customer data, credentials, private captures or sensitive filenames.

## Release quality gates
**PASS_LOCAL:** exact skill route, current first-party guidance, actual product benchmark, checked local HTML/crawler intents, structured experiment and all regression tests.
**HOLD_EXTERNAL:** indexing, live crawler access, Google/Bing owner controls/reports, real AI answer and ranking, real user conversion, revenue or global legal compliance not observed. This is normal for a documentation library.
**BLOCK:** fabricated claims or people, crawler spoofing, prohibited provider automation, unsafe training-permission changes, fake #1, purchased review/link fraud, scaled doorway pages, compromised privacy, unreproducible benchmark or incomplete experiment panel.
Escalate hold items to real test environments with authorized access, not to invented JSON statuses.

## Agent final answer format
1. Exact user category, buyer task, target regions and the specific AI products included.
2. What the provider first-party originals demonstrably say vs what is unknown/proprietary.
3. Proven testable user value vs competitors, with observed counterexamples.
4. Implemented changes and paths/commit, independent actual tests and outcomes.
5. Provider and cohort observations: attempted / unavailable / positive / visible citation / explicit first; no false denominator or universal success language.
6. Measured human conversions and real economics if available, otherwise explicitly UNKNOWN.
7. Priority corrective step, owner, falsification test, stop/rollback criteria.
The goal is real-world work and trust, not filling the answer with speculative ranking tricks.
