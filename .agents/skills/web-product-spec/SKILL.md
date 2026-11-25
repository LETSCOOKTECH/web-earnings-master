---
name: web-product-spec
description: "Translate validated search demand and user pain into a small, secure, reliable web utility specification with testable output requirements and cost ceilings."
---

# Product Spec

**Use when:** Translate validated search demand and user pain into a small, secure, reliable web utility specification with testable output requirements and cost ceilings.

**Workflow contract:** Follow the next steps proportionally to the request. Prefer current primary sources to saved claims. Adapt the sequence when evidence suggests a better route; do not overbuild a minor task. Show exact verification, uncertainty, and safety boundaries. Read `AGENTS.md` and the matching `references/` files when carrying out substantial work.

## Product specification workflow
1. Capture one primary job-to-be-done and why existing options are inadequate. Define inputs, output format, accuracy limits, typical and worst-case sizes, mobile behavior, privacy and ownership of content.
2. Specify user journey from landing to successful download, with visible error recovery, empty/loading/progress states, cancel/retry and accessible form semantics. Avoid unneeded authentication, signup walls and download detours.
3. Draw smallest end-to-end feature set; distinguish MUST/SHOULD/DEFER *for this product*, not globally. Build few useful tools rather than producing hundreds of near-identical pages.
4. Choose browser-local processing when viable. If a backend is genuinely required, define per-operation cost, quota, abuse protection, storage retention, security controls and degradation behavior.
5. Define exact functional assertions: file decoded, dimensions bytes output verified, non-corrupt final artifact, transparency semantics, EXIF orientation handling, minimum quality warnings, unsupported formats, repeated and simultaneous operations.
6. Include reliability, accessibility, Core Web Vitals, privacy, security, and legal/publisher constraints as release acceptance tests, not post-launch patches.
7. Demonstrate competitive advantage with benchmark fixtures, not unsupported claims. Have a measurable rationale for saved presets, batch operations and guides.
8. Create appropriate public information pages explaining methodology and limitations; never invent technical test results.

## Outputs
One concise PRD (`templates/product-prd.md`), test matrix and expected metric funnel (view → start → success → download). Product scope should remain revisable when usage data changes.

## V2.3 production evidence contract (audited 2026-11-23)
**Owner:** Output oracle and bounded product scope. **Routing:** web-product-validation actually executes oracles.
**Official source entry points requiring action-time reopening:** https://html.spec.whatwg.org/multipage/;https://developer.mozilla.org/en-US/docs/Web/API/File_API. A saved link is not confirmation of the current provider rule.
**Evidence needed:** Acceptance examples with expected formats, error/boundaries, privacy and compute budget.
**Critical FAIL / UNKNOWN:** A feature checklist without actual testable outputs is no approval.
**Mandatory freshness procedure:** Read docs/foundations/19-provider-source-verification.md and docs/RESEARCH_PROTOCOL.md. Re-open official body, log exact applicable claim, evidence date, announced versus effective status, geography/account and contradiction. Use sources/verified_claims.json only as a dated baseline; source watch hashes are not semantic verification. Record tests/actual results, open blockers and rollback; do not infer live indexing, AI citations or AdSense revenue from local tests.

## Costed and executable PRD gate (V5)
Before freezing a feature spec, run `web-workload-architecture-router`; require average/p95 file bytes, CPU-seconds, browser RAM, output oracle, target device and cloud/consent route. Hand pricing to `web-unit-economics-finops` and capacity to `web-scale-reliability`. Reject "unlimited free conversion" with unbounded billable cloud CPU, or any format supported only as a marketing button. Each claimed feature must have a rights-cleared success/failure fixture and user recovery. `docs/architecture/02-client-and-media-pipelines.md`.

## V24 — site-intelligence observations are PRD inputs, not a requirements oracle

When reference websites materially affect product scope, read `docs/website-intelligence/README.md` and consume `web-competitor-audit`'s `sense-site-skill-handoffs-v24` `product` claim packet. Distinguish directly visible public tools/pages, hypothesized product capabilities and UNKNOWN functionality. An input/form hint is not a real working output, a sitemap entry is not validation, and an inferred framework is not a requirement to adopt it. Do not copy protected code or trade dress. Require actual user task, input/output oracle, independent same-fixture comparator, measurable unique value, and supported budget/privacy architecture before any site design decision.
