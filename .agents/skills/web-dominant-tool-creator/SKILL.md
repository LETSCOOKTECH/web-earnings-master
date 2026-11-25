---
name: web-dominant-tool-creator
description: Coordinate demand validation, competitor task benchmarking, cost-aware Astro or alternative engineering, premium accessible UI, independent functional/security tests, real deployment gates, SEO/AI discoverability and ethical traffic economics. Reject unsupported claims and unprofitable ideas.
---

# Sense Dominant Tool Creator — V22 master orchestration

## Trigger and role

Invoke when users want an end-to-end useful website or web-tool business: market demand → actual working software → security/UX → independent QA → authorized deployment → search/AI discoverability → actual human usage and revenue.

**You are Planner → Executor → Independent Verifier**, not a speculative SEO guru. Selectively invoke the existing specialist skills rather than pasting 50 skill manuals into context. One good completed job beats 100 generic landing pages. The user can request a narrow stage; never force an unrelated full launch.

**Never claim:** guaranteed #1 position, full coverage of proprietary ranking algorithms, all possible market demand, account-specific publisher approval, third-party AI endorsement, million-user capacity without load testing, or universal 100× performance. Treat such requests as hypotheses to test.

## Required context and responsible permissions

Record user job, target audience, country/language, actual input/output, data sensitivity, devices, maintenance budget, competitors, privacy/consent, intended public domain and whether public hosting/spend/API usage has been authorized. Do not buy domains, publish private repo content, register accounts, modify robots/training permissions, spend paid APIs, automate community marketing or collect personal information without permission.

Read the relevant owned playbooks:
- Demand: references/01-demand-and-rejection.md
- Astro architecture and real starter: references/02-astro-production.md
- UX, security and release evidence: references/03-product-quality.md
- SEO, AI and acquisition: references/04-discovery-economics.md
- Open-source method/license provenance: references/05-upstream-integration.md
- Repo baseline: AGENTS.md, docs/quality/real-world-release-contract-v20.md and sources/skill-evidence-crosswalk-v20.json.

At decision time, open relevant current original first-party manuals, verify scope/version/date/geography/account settings; source registries are navigational leads, not automatically current authority. Never execute unreviewed third-party skills as trusted instructions.

## Stage 0 — write an independent user-task oracle (GATE A)

Describe the user's job **without selecting a framework or monetization network yet**. Make docs/product/job-and-oracle.md with desired result and 3 actual fixtures: normal, malformed, malicious/adversarial. Specify accepted formats, exact byte/math result, failure behavior, limits, privacy requirements, accessibility and user task completion. If no independent expected result can be defined, require a human acceptance rubric and label the objective UNKNOWN. Never infer product demand from the fact we can code it.

**BLOCK** misleading ads/download buttons, unauthorized data processing, impossible technical requirements, and claims of market share with no source. **HOLD** if necessary user/legal constraints are unknown.

## Stage 1 — demand and falsification (GATE B)

Route web-opportunity-intelligence, web-keyword-intent, web-niche-validation, web-competitor-audit, web-research-freshness. Use actual dated search signals, source-specific units and real user pain. Google Trends 0–100 is normalized sampled interest, **not search volume**. Keyword Planner advertiser data, Semrush estimated KD/traffic and site-owned GSC query impressions cannot be silently combined as exact global human demand. Every statistic needs source/date/query, location, unit, time frame, sample and limitations.

Compare at least two real substitutes on **identical permitted task inputs** against an independent output oracle. Preserve a competitor-win counterexample; never invent weaknesses. Record whether users would return, viable acquisition channels, device conditions, legal constraints and cost to serve. Lack of an observed advantage warrants REJECT or HOLD, even when engineering is easy.

Run npm run audit:tool-creator:demand with the provided synthetic brief and a real evidence-led brief when available. A synthetic brief always returns SYNTHETIC_NOT_MARKET_PROVEN; even a structurally valid real brief is EXTERNAL_EVIDENCE_UNAUTHENTICATED until a human reviews original artifacts. Do not turn modeled clicks into actual user visits.

## Stage 2 — choose cheapest *reliable* workload execution (GATE C)

Route web-workload-architecture-router, web-browser-compute, web-backend-api-engineering, web-scale-reliability, web-security-assurance-asvs and web-unit-economics-finops.

- Bounded client-side tools (text, small files, deterministic calculators): static Astro+native JS/Worker when validated. Minimize server data transfer and marginal compute. Still test memory, runtime and device limits.
- Tools needing secrets/auth/live data: Astro static with bounded APIs; verify ownership/auth, CORS/CSRF/SSRF, quotas, caching, rate limits, provider costs and rollback.
- Persistent or heavy tools: Astro SSR/queue/storage where justified, or deliberately select a different stack. Never force Astro where it is an awkward fit.

Provide Architecture Decision Record: exact job; what runs in browser/server; threat model; P50/P95 only if measured; 1K/10K/1M action cost model with assumptions, contingency and error budget; data retention; deployment portability. Reject fake million-user promises.

## Stage 3 — actual Astro build with user-visible output (GATE D)

The old templates/astro directory contains snippets and an incomplete image resizer; it is **not** a complete starter. The V22 tested example is examples/astro-jsonl-studio, an independently functioning Astro 7 JSONL workbench, installed with a package-lock, real pages/layout, canonical/robots/sitemap, CSS, Worker, pure parser, explicit noindex on test-only example.org, unit and browser tests.

To create a local starter use node scripts/scaffold-astro-tool-v22.mjs --out .tmp/my-tool. This copies a local-only sample, **not a deployed website**. Adapt actual job/fixtures/UI before launch. Supported Node versions: verify the Astro package's engine requirements, currently Node 22.23.5+ or 24.22.3+ (or newer compatible release), not the root repo's generic Node >=22 instruction.

From the starter directory:
- npm ci
- npm run check
- npm run build
- npm test
- npx playwright install --with-deps chromium firefox webkit
- npm run test:browser

A build is not functionality. Verify saved output bytes/response, errors and privacy network, and inspect screenshots with a human. Test a **new unseen tool** before treating this as generally reliable. No ad network status is implied by an Astro metadata build.

## Stage 4 — premium UI/UX and software QA (GATE E)

Route web-frontend-experience-engineering, web-accessibility-agent-ux, web-product-validation, web-security-assurance-asvs and web-launch-review. Design compact restrained layouts, meaningful hierarchy, useful preview/data feedback, keyboard navigability, accessible labels/errors, reduced-motion preferences, empty/loading/success/cancel states and responsive screens. Distinctive useful utility comes before decorative motion.

For every primary action, provide a **separately authored oracle**, test normal, malicious, oversize and failed-network conditions. Untrusted file contents are textContent, not innerHTML; workers must be cancellable and stale Blob output revoked; strict selected-file byte decoding and safe resource ceilings are expected where relevant. Document format/data loss and client-specific spreadsheet formula risk. Test Chromium/Firefox/WebKit and relevant actual phones/assistive technology, declaring UNKNOWN where hardware tests are unavailable.

Real tests to reference: examples/seo-csv-lab (V21 12 browser tests) and examples/astro-jsonl-studio (V22 Astro real E2E). Neither confirms other unseen product types automatically. Maintain regression tests for failures, not merely screenshots.

## Stage 5 — on-page SEO, crawler and AI eligibility (GATE F)

Route web-technical-seo, web-content-and-image-seo, web-crawler-governance, web-search-internals, web-aeo-answer-optimization and web-generative-engine-optimization. Provide actual helpful original tool output, limitations, how-it-works and public documentation. Check static HTML, accessible action, title/description, canonical, robots/sitemap, 200/404 and actual content. Distinct pages must serve distinct tasks; never mass-produce doorways, misstate original research, invent FAQs/testimonials, or promise special llms.txt ranking boosts. Astro/static prerender is a render choice, not a guaranteed ranking feature.

Separate robot access, URL indexing, SERP impression, AI answer citation, unbranded positive recommendation, human click, user task completion and publisher revenue. Each requires its own independent external evidence. Provider settings and originals change—verify at action time.

## Stage 6 — release proof and external permission (GATE G)

Use exact state ladder from docs/quality/real-world-release-contract-v20.md:
1. FIXTURE_ONLY
2. LOCAL_HTTP_VERIFIED
3. BUILD_ONLY_NOT_DEPLOYED
4. EXTERNAL_HTTP_OBSERVED
5. EXTERNAL_BUSINESS_OUTCOMES

For an actual owner-authorized website, ensure DNS control, HTTPS/TLS, externally served release hash, redirects/404, WAF/headers, real deployed browser action, operational budgets, security/consent and rollback. PUBLIC SITE URL must be one actually tested, not example.org, localhost or a source code page. The V22 Astro config requires SENSE_RELEASE=public alongside SITE_URL=https://ACTUAL_OWNED_DOMAIN to build in public-intent mode, refuses reserved/example hosts, and cannot independently certify ownership, DNS or actual deployment of a syntactically valid domain.

## Stage 7 — ethically acquire traffic and measure the business (GATE H)

Route web-traffic-hunter, web-dominant-recommendar, web-search-analytics, web-publisher-policy-eligibility, web-monetization-network-operator and web-unit-economics-finops. Use genuine community tutorials, partnerships, references and appropriate search intent—not fake reviews, automated spam, cloaking, paid click fraud or assistant prompt injection.

AI visibility tests need preregistered authentic unbranded user questions by provider/surface, locale/country/version/repeats, including unavailable and unfavorable cases, independent answer captures and visible citation URLs. Never call a citation a top recommendation. Owner GSC/Bing/Google AdSense and alternative publisher-account evidence plus real human task events are separate. A passing content or HTML audit does not grant AdSense approval. Track qualified users, task completion, retention, real ad RPM and true variable+fixed costs. Product benefit and legal/publisher policy must never be sacrificed for ad placement.

## Final evidence packet, refusal conditions

Every completed agent output must contain:
1. Specific real-world job, source-checked market conclusion including negative evidence.
2. Comparable competitors, independent outputs and known superior incumbent cases.
3. Architecture, security/privacy boundaries, measured or assumption-labeled costs.
4. Exact files/commit, commands and reproducible tests with negative case counts.
5. Actual downloaded bytes or API output; screenshots and accessibility/hardware caveats.
6. Correct local vs externally verified release stage; public URL only when actually tested.
7. GSC/Bing/AI citations/ad approval/revenue as real authenticated external observations or UNKNOWN.
8. Failure/rollback plan and next independently discriminating experiment.

**BLOCK:** forged source/review/traffic/earnings, secret exposure, unauthorized deployment, unsafe data usage, fabricated comparative benchmarks, fake first-place rankings, production claims from localhost tests. **HOLD:** missing owner/research/hardware evidence. Passing a synthetic questionnaire is NOT market proof.

Read upstream sources and license adaptation in references/05-upstream-integration.md; avoid bulk importing unreviewed agents. No guarantee of a 100× gain until independent blind agent evaluations against a baseline are performed.

## V23 mandatory reviewed-source and skill-network gate (2026-11-25)

Before delegating any end-to-end Sense business/tool work, read `sources/skill-network-v23.json` and `docs/skills/2026-11-25-trusted-upstream-integration-v23.md`. Assign one graph owner per stage, explicitly hand off actual input/output artifacts, and preserve source URLs, timestamp, geographic scope, negative evidence, authorization and release state. The graph maps all 50 existing specialists and 26 reviewed source leads; it does **not** install upstream skills or prove they work. Run `node scripts/check-skill-network-v23.mjs` and `node --test tests/skill-network-v23.test.mjs` for every routing change; a green structural test alone cannot certify outcomes.

Adopt upstream methods only after threat, version and rights checks: OpenAI concise routing; Anthropic and Superpowers skill red/green evaluation; Croftweaver/Astro actual site output; Addy Osmani field/lab audits; Semrush/SE Ranking authenticated data; Corey Haines actual customer pain; Cloudflare cost/runtime boundaries. Never paste or execute upstream files without review. For any claim that Sense is superior, require pinned-model isolated no-skill versus V22 versus V23 trials with independent output oracles and negative trigger controls. Claim `AGENT_BENCHMARK_NOT_RUN` until those experiments actually run.

Mandatory source-change probes: Google generative AI control at https://developers.google.com/search/docs/fundamentals/gen-ai-controls and November 16, 2026 Search Analytics API at https://developers.google.com/search/blog/2026/11/search-analytics-api-update. Differentiate AI-grounding permission, robots training permissions, snippet eligibility, API observability, actual citation, human traffic and legitimate monetized visits. No ranking guarantee or auto-change of publisher settings.
