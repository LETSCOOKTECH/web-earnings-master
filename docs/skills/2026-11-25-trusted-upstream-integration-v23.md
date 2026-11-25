# V23 — Trusted Skill Integration, Cross-Skill Graph and Independent Evaluation

Date: 2026-11-25. Repository: LETSCOOKTECH/web-earnings-master. Owner: Codex agents routed by `.agents/skills/web-dominant-tool-creator/SKILL.md`.

## Status: reviewed and method-adapted; NOT installed / NOT agent-benchmarked

This version does **not** bulk-install third-party skills. It preserves 20 fully read external SKILL.md files at their GitHub blob SHA, two README-reviewed evaluation/scanning systems, and four current provider documentation leads in `sources/skill-network-v23.json`. Those are research/reproducibility leads, not trusted executable dependencies or a list of source-code imports. Upstream license, third-party notices and transitive dependency checks are required before copying files or executing scripts. No third-party prompt or code has privilege merely because it appears in an upstream repo.

The graph assigns all 50 **existing** Sense skills to seven owned lifecycle stages and now links each entrypoint to its individual previously curated first-party original IDs, local oracle, external validation gate and blocking condition. The inherited registry includes 160 official source records, of which 70 distinct IDs are referenced by the 50 skills, preserving the actual specialist inventory. It DOES NOT prove that all possible skills on GitHub were enumerated, or that each Sense skill has passed an independent real-agent benchmark. Its source count is a curated subset, not the world.

## Evidence-first flow and handoff contracts

| Gate | Owner | Required input/output | Negative oracle / rejection |
| --- | --- | --- | --- |
| Orchestration | web-dominant-tool-creator | Real user job, evidence identifiers, explicit release state, owner permissions; orchestrate only task-relevant experts | Reject invented rankings, hosted URL, 100x claims, publisher approval or untested files |
| Research | web-opportunity-intelligence | Date + jurisdiction + query + source units; actual competitor outputs on identical legal fixtures; job-to-be-done; user complaints and alternative explanation | REJECT if user demand depends solely on normalized Trends or invented provider estimates |
| Engineering | web-fullstack-production-executor | Job oracle, input/output fixture, architecture decision record, source/commit, API or download bytes, privacy/runtime/cost boundaries | BLOCK broken core action, unbounded cost, invalid file transfer, secret exposure |
| Quality | web-product-validation | Independent task expected output and failure oracle, a11y, keyboard, browser, abusive input, latency and actual state | BLOCK source-only screenshots, local UI presented as public, untested unsafe upload |
| Discovery | web-technical-seo | Public origin state, raw rendered HTML, robots/canonical/sitemap, actual Search/AI event measurements with provider/locale/timestamp | BLOCK doorway pages, fake snippets/citations, unsupported `llms.txt` ranking claims |
| Publisher | web-publisher-policy-eligibility | Actual ad-provider rules, consent region, own account state; no deceptive download ads | HOLD AdSense approval and RPM until account observations; BLOCK invalid traffic |
| Growth | web-traffic-hunter | Distinct real impressions/referrals/task starts/completions/retention, honest RPM and operating costs | REJECT sponsored-spam/AI-prompt injection and fake traffic projections |

Every stage writes an inspectable evidence packet, never a plain PASS label. Stable record fields: `stage_id`, `question`, `source_url`, `source_kind`, `retrieved_at_utc`, `effective_at`, `scope`, `observed`, `assumptions`, `contradictions`, `artifact_paths`, `negative_cases`, `release_state`, `external_unknowns`, `next_gate`.

### Cross-skill routing: machine-checked, not implied

Read `sources/skill-network-v23.json`: each of the 50 registered entrypoints has one stage owner, a source-method reference and an explicit deliverable and rejection condition. Stage owners route to their specialists and pass the evidence packet forward; the master reaches every stage. For handoffs requiring multiple domains, refer to the owner specialist rather than pasting every manual into the context window. Example: demand -> Astro cost decision -> real worker output -> browser/security -> public crawl evidence -> AdSense account -> qualified user economics.

Run:
```bash
node scripts/check-skill-network-v23.mjs
node --test tests/skill-network-v23.test.mjs
```
These structural tests reject orphan/duplicated specialists, missing source refs, invented upstream installation, malicious URL origins, missing negative conditions and broken stage handoffs. **They do not test the skill instructions' effectiveness** or verify live third-party policy semantics.

## Exactly what was adapted from external creators

- OpenAI Skill Creator: concise trigger descriptions, controlled degrees of freedom, `SKILL.md` as routing rather than megadoc.
- Anthropic Skill Creator and Superpowers: baseline-first failure capture, test prompts, repeated outcomes, disciplined revision; retain test fixtures rather than editing by intuition.
- Croftweaver + Methedrone Astro: independent build and launch stages; Astro-native-first decisions; current version-aware routing. Sense's actual runnable example remains `examples/astro-jsonl-studio`; legacy `templates/astro` is reference snippets only.
- Addy Osmani + Anthropic web testing: measure LCP/INP/CLS with lab-vs-field separation, browser task success, keyboard/a11y and failure states; require human design critique.
- Semrush and SE Ranking: authenticated data workflows, keyword/competition metrics with source-specific units; missing access means UNKNOWN, not fake metrics. AI citations/mentions, answer recommendation, actual clicks and revenue remain different measures.
- Corey Haines: research job triggers and alternatives, free tool as acquisition versus direct ad-funded tool economics, distinct page intent, value-first legitimate communities; do not blindly copy programmatic SEO tactics.
- Cloudflare and Vercel: provider-specific runtime and framework optimization only where applicable; choose deployment on task, budgets and measured constraints.
- Cisco Skill Scanner and agent-skill-eval: static quarantine then repeated with/without skill evaluation in separated environments; **neither has been executed here**.

The registry documents one source limitation per upstream to prevent consensus-by-repetition or outdated framework advice. A full-file review means its current file body was fetched in this work, not that every nested reference or dependency was read and verified.

## Real-agent evaluation contract — V23 design, execution NOT DONE

Use a real Codex coding-agent harness in isolated workspaces (e.g. Harbor-backed agent-skill-eval when authorized). For each scenario, compare **A: baseline without Sense**, **B: Sense V22**, **C: Sense V23** with the same pinned model, reasoning effort, tool access, permissions, input fixtures, budgets and attempt count. Register `should_trigger=true` and `should_trigger=false` controls. Each verifier must run separately and MUST NOT expose solution or hidden grader to the coding agent.

Holdout categories (minimum one normal and one malicious case per category):
1. Browser-only file parser with exact downloaded-byte oracle, invalid UTF-8 and spreadsheet formula cases.
2. Server API with authentication, idempotency, SSRF and retry/cost controls.
3. Calculation tool with mathematically independent expected outputs and precision limits.
4. Large-media tool with resource/device ceilings and privacy boundary.
5. SEO/AEO triage of a real deployed property, including deliberate noindex and a fabricated citation trap.
6. Market research with real alternative product wins and no access to paid Semrush metrics.
7. AdSense policy review that must say UNKNOWN instead of inventing account approval.

Report task pass rate, uncertainty interval, pass^k across repeats, median/p90 cost and time, trigger precision and recall, leak/unsafe count, intervention count and verified UI usability. A single successful prompt, repository line count, fast scaffold or local Lighthouse score does not establish superior production output. No benchmark scores are supplied or fabricated in V23.

## Official 2026 source changes to check before action

- Google Search generative AI control: `https://developers.google.com/search/docs/fundamentals/gen-ai-controls`. Search control, Google-Extended training-related controls, `noindex`, snippet directives are different scopes; never automatically alter publisher preferences.
- November 16, 2026 Search Analytics API: `https://developers.google.com/search/blog/2026/11/search-analytics-api-update`. New branded/non-branded and web-multimodal capabilities require property access and valid API request/response, not inferred availability for everyone.
- Google AI Search eligibility: `https://developers.google.com/search/docs/appearance/ai-features`. Existing indexability/snippet/quality fundamentals apply; there is no secret Google AI-only schema or mandatory `llms.txt`.
- Google AdSense publisher rules: `https://support.google.com/adsense/answer/48182`. Real publisher approval is external and invalid traffic remains prohibited.
- Astro version-sensitive serving: `https://docs.astro.build/en/guides/on-demand-rendering/`; verify installed version and deployed adapter.
- Cloudflare runtime plan limits: `https://developers.cloudflare.com/workers/platform/limits/`; no hardcoded free-tier claims or million-user throughput guarantees.

Provider docs can change after this date: reopen originals when acting on policies, hosting prices, crawler controls or API options. Website readiness is not SEO ranking, and search referrals are not monetized transactions.

## Remaining blockers / next falsification experiments

- External agent benchmark not executed: Codex CLI, isolated runner and per-run budget needed.
- GitHub CI on PR head still needs an actual run and passing result.
- Public owned domain, live DNS/TLS, Search Console/Bing, AI answer samples and AdSense account state are unobserved.
- No authorization for third-party package install, bulk copy, cloud deployment or data-provider spending. Keep these blocked.
- The graph links owners and methods, but does not replace domain-specific independent fixture tests and first-party human verification.
