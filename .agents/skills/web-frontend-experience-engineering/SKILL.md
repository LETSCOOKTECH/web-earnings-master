---
name: web-frontend-experience-engineering
description: "Implement fast accessible responsive frontend and individual high-quality tool landing pages with semantically correct initial HTML, verified functionality and compliant monetization UX."
---

# WEB FRONTEND EXPERIENCE ENGINEERING

**Trigger:** UI/UX, frontend, pages, Astro/React/Svelte, responsive layouts, SEO-friendly tool route, page quality, AdSense ad positioning and browser task interaction.

**Routing:** Own HTML/CSS/browser/page semantics; web-fullstack-production-executor coordinates backend; web-ad-experience and web-publisher-policy-eligibility own ads policies.

**Source and uncertainty policy:** Treat user-uploaded diagrams as user hypotheses, not private Google proof. Reopen original provider sources before deployment. Distinguish code/fixture evidence from live crawlers, publisher accounts, traffic and revenue.

## End-to-end execution contract
1. Design page around user intent: primary working tool above fold; explanatory content that addresses specific input/output limits, expected errors, privacy and unique testable advantages.
2. Render canonical title, meta description, one logical H1, meaningful heading outline, HTML navigation and contextual internal anchors directly in initial public HTML; verify without client JS and with Googlebot-compatible HTTP response.
3. Implement UI states for before upload, drag-drop, progress, cancel, success with verified downloadable result, unsupported input, quota, offline, retry, slow device, auth and safe fallback. No fake download widgets.
4. Use accessible forms and control labels, aria-live progress/errors, visible focus, tap targets, contrast, reduced motion, language direction and WCAG 2.2 AA criteria as target; don't assert full compliance from Lighthouse alone.
5. Enforce mobile-first responsive grid and input-adaptive layouts; measure actual viewport, touch/keyboard affordances and browsers including real iPhone/low-RAM Android cohorts.
6. Apply performance budgets for critical CSS, image sizes, font requests, layout stability, code split heavy conversion bundles, Worker offload, LCP image priority and user-perceived responsiveness. Field p75 CrUX/RUM separate from lab.
7. Use safe ad-slot architecture: never imitate download/submit navigation, reserve geometry for dynamic ads, keep ads separated from upload controls and errors, avoid intrusive overlays and accidental-click traps.
8. Use truthful structured data matching visible page and actual software capabilities; never add schema solely to force AI Mode citations. Tool directory should be navigable, not a graph of every possible invented permutation.
9. Guard XSS on user input and previews, sanitize untrusted SVG, safe object URLs and revocation, secure download responses, CSP/Trusted Types compatibility with declared ad scripts; validate browser processing network privacy.
10. Inspect localized wording and actual per-language tool success, not machine translation at scale. Connect hreflang/canonical by correct locale URLs only when translations are reviewed.
11. Capture component screenshots, keyboard/assistive flow, HTML snapshot and tool-output oracle in CI; reject pages that technically rank but fail task completion or target device.

## Non-negotiable FAIL / UNKNOWN gates
- No fixed minimum word count falsely presented as a Google/AdSense rule.
- No fake FAQ/HowTo rich results or blanket llms.txt ranking claims.
- Tool routes must not pretend to support formats/codecs absent from verified functionality.
- A polished mockup is not a built usable site.

## Required deliverables
- Scope and real user job, alternatives, testable acceptance contract and owner.
- Dated source ledger with exact URL, first-party versus excerpt status, evidence for each nontrivial claim.
- Reproducible tests or explicit NOT_RUN and UNKNOWN_EXTERNAL entries, including malicious/failure cases.
- Release decision, known risks, task economics, rollback, actual deployment and publisher/search evidence when authorized.

## Canonical references
- `docs/v6/README.md` (module-specific technical research and evidence routing).
- `sources/v6_claims_2026-11-23.json` (first-party evidence claims and disputed user-report assertions).
- `scripts/check-v6-evidence.mjs` and related executable contracts.
- `AGENTS.md` and existing root skill-routing contracts for adjacent subsystems.

## Official primary-source starting points (re-open before action)
- https://developers.google.com/search/docs/appearance/ai-features
- https://www.w3.org/TR/WCAG22/


## V21 premium verified interface: one task, actual feedback
Inspect examples/seo-csv-lab/site/index.html and style.css and follow docs/quality/21-premium-csv-studio-acceptance.md. The premium screen has one actual task with restrained near-black cards, clear 2-panel INPUT/OUTPUT hierarchy, original explanatory text, real source/file selection, advanced comparison controls, empty/loading/error/success/cancel states, live summary, an eight-row safe preview and an output download. It does not substitute decorative charts for user progress. UI controller tool.mjs renders cells using textContent and only createElement; never interpolate uploaded CSV as HTML or render synthetic statistics.

For UI acceptance run the exact shipped browser E2E on Chromium/Firefox/WebKit, not a design mockup. Verify that pasted input clears a previously selected file, options and source changes invalidate a prior Blob download, reset and cancellation preserve no stale result, invalid UTF-8 reports an error, XSS-looking CSV remains literal text, and malformed quotation cannot produce a download. For accessibility: check keyboard focus, semantic labels, legend, status role and live-region announcements, zoom/reflow and reduced motion; actual iOS Safari, Android hardware and screen readers remain a separate HOLD until observed. The initial HTML must explain how the tool works with JS disabled, but without JS the cleanup action itself cannot function; disclose this. No off-site font or imagery fetches. Current WCAG original: https://www.w3.org/TR/WCAG22/ .

## V23 field/lab, utility UX and original-design gate

Use reviewed methods from Anthropic `frontend-design`, `webapp-testing`, Addy Osmani `web-quality-audit` and measured performance guidance; provenance lives in `sources/skill-network-v23.json`. Deliver primary working input/output in the first meaningful viewport, with real examples, error transparency, keyboard/reduced-motion/mobile support and visual differentiation justified by the user's job. Review screenshots rather than declaring an aesthetic self-rating. Test the actual output bytes and malicious/oversized inputs before judging the UI premium.

Record LCP, INP and CLS from lab or approved field sources and label provenance; never invent field CrUX or RUM. Separate static Lighthouse/a11y checks from real user task completion and actual assistive-device tests. For Astro implementations use `examples/astro-jsonl-studio` as the current installable baseline, with task-specific changes, and never treat the old `templates/astro` as turnkey.

## V24 — reference website research is output-led, not visual cloning

For reference websites or competitor UX, first consume public page patterns and claim IDs from the `web-competitor-audit` website-intelligence report. Its `inspectHTML` captures raw static links/forms/meta/asset signatures and a sampled graph, **not** rendered GUI quality, real mobile behavior or script-driven UI. Use authorized interactive browser testing to measure full task completion, accessibility and actual outputs when permitted; do not infer behavior from `<form>` tags. Extract general interaction concepts and distinct user jobs, not copyrighted code, logos, trade dress or a one-to-one clone. Maintain real blank/loading/error/offline states and an independent usability oracle in product work.
