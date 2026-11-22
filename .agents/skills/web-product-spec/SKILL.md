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
