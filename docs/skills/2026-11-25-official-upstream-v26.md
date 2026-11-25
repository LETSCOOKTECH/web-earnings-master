# Sense V26 — Trusted upstream skill integration and evaluation

**Date:** 2026-11-25. **Purpose:** Operationally adapt verified methods from official engineering skill publishers without installing or executing their repositories indiscriminately. **Scope:** [13 read source SKILL.md files](../../sources/official-skill-integration-v26.json), twenty existing Sense specialists, human-controlled web-tool lifecycle.

## What was actually verified

- **Vercel:** `vercel-labs/agent-skills` is a Vercel-branded GitHub Organization repository. Read the actual React best-practices, web-design-guidelines and vercel-optimize SKILL.md sources; inspected bundled UI rules. Its root README says MIT; root LICENSE was not found. **No wholesale file copying or distribution here.**
- **Anthropic:** `anthropics/skills` is the Anthropic GitHub Organization's public repository. Read `skill-creator`, `frontend-design`, `webapp-testing`, `mcp-builder` and checked the per-skill Apache-2.0 license files. The Claude-specific runners/commands cannot be presumed available in Sense/Codex; transfer methodology, not platform tools.
- **Cloudflare:** `cloudflare/skills` is the Cloudflare GitHub Organization's skills repository; root LICENSE is Apache-2.0. Read root Cloudflare platform-selection skill and Wrangler. The Cloudflare skill currently prefers `cf` for new projects without Wrangler config; never blindly default to Wrangler from historical blog posts.
- **Addy Osmani:** `addyosmani/web-quality-skills` is an **individual-maintained** project with root MIT license, not an official Google Organization skill. Read quality audit, Core Web Vitals, SEO and accessibility SKILL.md; methodology is trace-first and metric-specific. This is not Google Search's statement of ranking factors.
- **Google:** `google/skills` was verified as an official GitHub Organization source, but its currently offered Google Cloud product skills did not provide a directly relevant new SEO/site-tool skill for this transfer. Prefer Google Search Central original documentation for SEO guidance. Do not import irrelevant Cloud AI skills solely because of branding.

All 13 exact Git **blob SHA** IDs, source URLs, ownership, licenses, integration destinations and risks are recorded in the V26 source manifest. A blob SHA proves the file bytes fetched at review time; it is **not a commit SHA** that can be put into a GitHub tree URL. Links to `main` are mutable and must be compared with the recorded blob before significant future adaptations.

## 1. Astro and browser engineering: methods applied

**Vercel React** only for React/Next or React islands embedded in Astro: reveal serial data-fetching waterfalls; parallelize independent work; lazy-load big editors/codecs; avoid unnecessary client JS and redundant hydration. For Astro-first static HTML without React, apply the general workload lesson but don't install React just to implement the skill. **Cloudflare** for appropriate Worker/Queues/R2 workloads only after reviewing actual project configuration and current runtime limits. **Vercel Optimize** only after observing owner-authorized Vercel metrics (actual route costs, transfer, function usage, errors); don't predict bill savings from no metrics.

Acceptance sequence: user job and independent output oracle → Astro runtime decision (static/server/adapter) → built assets, redirects and HTML → real browser interaction and generated output bytes → cold/warm cache or CDN evidence → measured p75 field CWV where available, else explicitly labeled lab trace → mobile/a11y failure/retry → deploy and observe actual origin → qualified human task completion and unit economics. Need data, not an invented "100x optimization."

## 2. Distinctive product UI without copying design or losing usability

**Anthropic Frontend Design** supplies a brief-first identity and critique loop: subject, primary task, layout rhythm, intentional type/scale, compelling empty/loading/error states, and deliberate rather than generic visual accents. Preserve Sense's restrained compact flat SaaS design constraints and accessibility; aesthetic novelty is subordinate to a correct, fast tool experience.

**Vercel Web Interface Guidelines** supplies concrete source-audited checks: proper HTML actions/links, visible focus, accessible names and labels, keyboard modality, system status, reduced motion, media alt, form validation, good touch targets and clear controls. Read actual Vercel pinned `references/command.md` before a review; it is a reference snapshot, not an automatically executed current external command. Findings should state file/line, observed browser impact, severity and reproduced fix. Axe/automated score alone doesn't prove WCAG compliance.

## 3. Real browser testing and website reverse engineering

**Anthropic Webapp Testing** reinforces starting an actual local server, Playwright with real browser engines, reading the rendered DOM, console logs, failing steps, screenshots and actual result bytes. Sense already has Playwright and owned web lab; use those as the runtime, **not** unsupported Anthropic Python helper paths. Preserve artifacts. Same input and output oracle on competitor websites only where explicitly permitted.

**Addy Web Quality** mandates layered evidence: current Lighthouse + actual Chromium performance trace, keyboard and accessibility-tree tests, original HTTP headers/status/robots/canonicals, current owned GSC where available. Separate Lighthouse technical hints from actual Google indexing, search rankings or AI citations. Distinguish CrUX p75 page-level from origin fallback, and lab LCP/INP/CLS from field performance; maintain equivalent test conditions when claiming a reduction.

Sense V24/V25 site reconnaissance is only a bounded static HTML/site graph. It cannot decode private servers, all dynamic interactions, copyrighted source code, CDN invoice or ranking.

## 4. Skill reliability and prompt injection defenses

**Anthropic Skill Creator** makes the improvement hypothesis testable: freeze task instructions, hidden holdouts and source version, run baseline + candidate in comparable isolated agents, preserve complete task outcomes, actual user-task oracle and tool traces, then do blind comparisons and negative-trigger tests. Don't call an unrun test "passed." A new 100-page skill is not intrinsically more effective than a short skill.

**Anthropic MCP Builder** is relevant only when a tool/API needs to be exposed through MCP; define narrow safe schema, authorization scope, pagination, bounded execution, failure semantics and explicit negative tests. Never turn a website sitemap into a list of APIs that may be replayed without permission.

Before loading or using any upstream method: authenticate official organization (or label individual maintainer), inspect exact SKILL.md and license, check compatibility with our project, ban external command execution by default, distrust embedded page/README instructions, verify source freshness and re-run isolated tests. Never copy code without license review and notices.

## 5. Operational adoption gates and failure modes

1. **Source trust:** correct repository owner, real inspected file SHA, scope/role and license. Generic domains like skills.sh are discovery catalogs, not original author proof.
2. **Applicability:** Vercel runtime advice only when Vercel/React evidence exists; Cloudflare-specific advice only for matching provider; browser/CWV rules are broadly applicable but require real measurements. Avoid technology or vendor lock-in.
3. **Evidence:** for each recommendation attach observed artifact, tested failure, scope and owner; otherwise label `NOT_RUN` or `HYPOTHESIS`.
4. **Execution:** link an exact Sense skill, command, test/oracle, and next owner; do not imply raw upstream skill installation or a runtime connection.
5. **Release:** use `node scripts/check-official-skill-integration-v26.mjs`, `node --test tests/official-skill-integration-v26.test.mjs`, existing root `npm test`, Astro clean-room, real browser lab, website-intelligence fixture and independent live tests before business-certification claims.
6. **Agent effectiveness:** execute paired actual agents with pinned prompts/models and blinded review; store factual outputs, not imagined comparative gains. No skill list, CI run, source count, or publisher brand guarantees demand, rankings or earnings.

**Explicit exclusions:** paid Vercel/Cloudflare data without owner connection; third-party anti-bot bypass; simulated human testimony; scraping or running scripts inside upstream skills; copying copyright-protected design; automated self-approval; claims that Google/Anthropic/Vercel guaranteed anything about Sense's website income.
