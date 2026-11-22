---
name: web-ad-experience
description: "Implement restrained, policy-aware ad layouts and measurable user experience without deceptive download buttons, invalid traffic or intrusive monetization formats."
---

# Ad Experience

**Use when:** Implement restrained, policy-aware ad layouts and measurable user experience without deceptive download buttons, invalid traffic or intrusive monetization formats.

**Workflow contract:** Follow the next steps proportionally to the request. Prefer current primary sources to saved claims. Adapt the sequence when evidence suggests a better route; do not overbuild a minor task. Show exact verification, uncertainty, and safety boundaries. Read `AGENTS.md` and the matching `references/` files when carrying out substantial work.

## Ad UX engineering procedure
1. Locate highest-value user controls: upload, processing options, start, progress, result, download, cancel/retry. Keep these distinct from ads in position, visual styling, semantics and interaction.
2. Evaluate applicable Google AdSense placement policies, better ads standards and each network's current format rules. Audit risks of popunders, forced redirects, new windows, notification prompts, sticky overlays and ambiguous direct-link ads.
3. Use labelled ad slots only after the site has meaningful publisher content and network approval; avoid ad placement on empty state, thin pages, process-only dead-end screens and hidden/accidental-click zones.
4. Reserve responsive slot space to limit CLS; avoid third-party script loading that blocks LCP, INP or actual tool controls. Test mobile viewport, small screens, zoom and keyboard tab order.
5. No artificial impressions, ad-click nudges, testing live ads by clicking, fake download buttons, countdown redirects, hidden ads or arbitrage designed solely to display ads.
6. Measure the revenue-vs-utility tradeoff: ad viewability and page RPM *with* task completion, bounce, performance, repeat use and policy center results. Roll back ad configurations that degrade the actual task.
7. AdSense and other networks may coexist under restrictions; review combined scripts/ad formats in context rather than treating network claims as blanket approval.

## Deliverables
`templates/ad-placement-review.md` with desktop/mobile annotated layouts, consent state, network terms, approved regions, test evidence and rollback procedure.
