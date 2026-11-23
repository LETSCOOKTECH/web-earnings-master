# 05 — Will the product actually work, can we distribute it, and can it earn?

## The minimum working task (not a feature list)
For each idea specify one user input, exact desired output and how to verify it. For file tools use accepted formats and bytes, output parser, expected dimensions/data correctness, malformed/harmful inputs, low-RAM mobile browsers, cancellation, latency, privacy and ownership of uploaded data. For other utilities use precise test oracle (e.g., correct financial calculation, verified download, standardized conversion). A beautiful landing page without working output is disqualified.

## Architecture and cost
1. Choose browser-local processing if practical, with real device tests and a safe fallback. Local avoids some transformation server bills but not all hosting/support/privacy costs.
2. For server/API processing, define peak simultaneous jobs separately from monthly users, size/CPU/duration/token usage, queue, retries, file retention, egress, user abuse, per-tenant rate limits, cancellation, idempotency and global cost ceiling.
3. Record official commercial-use terms, tier limits and actual dated provider quote. Never infer unlimited free operation from a marketing pricing tile.
4. Model three scenarios: conservative low user demand, plausible pilot baseline and stress/abuse. Mark every input observed, first-party quoted, modeled or unknown.
5. Check rights/permissions for images/documents/training datasets and sensible privacy defaults.
6. Simulate security and downtime. Operational support, recovery, refunds and moderation cost money. Engage relevant security and product skills.

## Demand versus user acquisition
A search volume estimate gives potential search interest, not guaranteed visits. Examine country/device SERP, paid ads, AI answers, incumbent brand and relevance. If the user can complete the task inside an AI answer, an ad-funded website may lose click opportunity. Validate a non-search route before assuming long-term SEO.

## Ads and monetization
For display ads: eligible pageviews, quality traffic, geography/consent, ad network approval, restrictions, ad placement, valid traffic and actual provider page RPM. No guaranteed AdSense approval or minimum traffic that ensures acceptance. Search CPC is advertiser-side, not publisher RPM. Do not design extra clicks around misleading download buttons.
For subscriptions or paid credits: actual commitment, payment processor and margin. For one-time utilities with minimal return visits, do not invent retention, recurring revenue or profitable paid traffic.

## Unit-economics worksheet
- Verified or assumed qualified human sessions by source and country.
- Percentage starting task and per-start validated completion, with sample size.
- Incremental compute and delivery cost per valid job.
- User acquisition time and paid spending per legitimate conversion.
- Monetizable pageviews and **actual owner** page RPM if available, otherwise scenario only.
- Gross contribution by cohort = attributable observed revenue - incremental service cost - acquisition spend.
- Fully loaded net profit also deducts fixed hosting, support, tools, taxes and compliance.
- Sensitivity to 10x lower organic clicks and 10x higher compute cost (examples, not universal risk estimates).

## Build decision
Commit only a small prototype after failure risk reviewed, then prove that it works on current inputs. After user pilot and source validation recommend MVP; full portfolio scaling requires sustained demand, safe acquisition, quality signals, policy and cost. If an idea needs private data rights or an expensive non-authorized API to provide basic output, REJECT or seek a cheaper licensed approach.

## Outsourced APIs
API keys must remain in secrets manager, never browser bundles or prompts. Paid provider access requires account owner budget authorization and request-level metering; no hidden trial signup/auto-spend. Use docs for official limits rather than guessing quota. If the API lacks needed right/plan, mark product feasibility UNKNOWN, not free.
