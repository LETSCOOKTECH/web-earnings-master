---
name: web-accessibility-agent-ux
description: "Create professional accessible responsive utility interfaces usable by humans, keyboard/screen-reader users and browser-based AI agents, with clear file workflows."
---

# Accessibility Agent Ux

**Use when:** Create professional accessible responsive utility interfaces usable by humans, keyboard/screen-reader users and browser-based AI agents, with clear file workflows.

**Workflow contract:** Follow the next steps proportionally to the request. Prefer current primary sources to saved claims. Adapt the sequence when evidence suggests a better route; do not overbuild a minor task. Show exact verification, uncertainty, and safety boundaries. Read `AGENTS.md` and the matching `references/` files when carrying out substantial work.

## Design and interaction workflow
1. Start from the full task journey: intent → tool discovery → input → settings → progress → verified result → retry/download. Prioritize tool above decorative marketing; make clear text, typography and contrast with compact consistent spacing.
2. Use native accessible HTML controls: `<input type=file>`, `<label>`, buttons with names, real anchor links, select, progress/status; avoid anonymous clickable divs, canvas-only controls and gestural-only interactions.
3. Accessible states: errors bound to fields, `aria-live` for processing, stable focus when processing, visible progress and cancel, keyboard shortcuts only when documented, reduced motion and usable zoom.
4. Support mobile low-end phones, slow networks, file sizes, safe-area, orientation, touch input, screen reader and mobile/browser permission restrictions. Profile memory during batch jobs.
5. Browser agents: meaningful labels, deterministic state changes, stable selection semantics, result facts in DOM, explicit download controls; do not try to coerce agents or serve different bot-only content.
6. Keep ad visual system distinct from utility buttons; do not obstruct controls with overlays or autoplay. Prevent misleading download and signup experiences.
7. Test with Playwright and manual keyboard/screen reader tests. Actual agent end-to-end run only when tools available; don't claim coverage from static markup inspection.

## Outputs
Accessible task-state inventory and tests; see `references/astro-production.md` and `templates/ux-state-matrix.md`.

## V2.3 production evidence contract (audited 2026-11-23)
**Owner:** Native semantic user/agent task journey. **Routing:** Own accessibility; web-browser-runtime owns engine faults.
**Official source entry points requiring action-time reopening:** https://www.w3.org/TR/WCAG22/. A saved link is not confirmation of the current provider rule.
**Evidence needed:** Browser E2E role/name/control, keyboard and actual task output; manual assistive-tech evaluation separate.
**Critical FAIL / UNKNOWN:** Static HTML or Playwright role selectors alone do not prove WCAG compliance.
**Mandatory freshness procedure:** Read docs/foundations/19-provider-source-verification.md and docs/RESEARCH_PROTOCOL.md. Re-open official body, log exact applicable claim, evidence date, announced versus effective status, geography/account and contradiction. Use sources/verified_claims.json only as a dated baseline; the source watch's hash changes are not semantic verification. Record tests/actual results, open blockers and rollback; do not infer live indexing, AI citations or AdSense revenue from local tests.
