# 04 — Attribution, qualified funnel, economics and anomaly triage

## Explicit measurement hierarchy
1. **Exposure:** source-owned impressions/views or appearances in SERP/AI platform, measured by that platform's own definitions.
2. **Outbound click:** a platform sends a request toward the landing page. Not equal to a successful client-side session.
3. **Landing session:** first-party consent-appropriate analytics show a visit. Some browsers lose referrer/UTM, ad blockers and privacy rules reduce tracking; never guess missing sources.
4. **Qualified session:** legitimately human to the best available evidence, relevant audience, targeted task URL, and basic interaction. Avoid invasive fingerprinting.
5. **Task start:** actually begins the advertised operation; not a page impression.
6. **Validated completion:** real task output meets explicit oracle (e.g., image dimensions/size), even if no checkout.
7. **Value:** voluntary repeat/return, referrals, paid upgrade or policy-compliant ad pageview when publisher account permits.
8. **Economics:** actual net revenue and actual variable + attribution cost with timeframe and source.

No source changes magically advance to the next gate. Browser agents, monitoring, prefetch and search crawlers are not human sessions even when they request pages. Beware platform-internal clicks vs outbound clicks (Pinterest distinguishes these); YouTube view ≠ referral; click counts differ from browser sessions.

## Attribution implementation
- Capture external campaign parameters once at landing (e.g. `utm_source`, `utm_medium`, `utm_campaign`, optional `utm_content` and `utm_term`); normalize controlled labels and do not add UTM to internal links.
- Do not pass email addresses, user IDs, filenames, query text, location coordinates or private file content in UTM, URL, analytics events or third-party scripts.
- Preserve app consent preference; avoid cookie tracking before legally required consent. First-party aggregated event counts can be used where legally allowed; verify jurisdictions.
- Define GA4 session-scoped versus first-user versus event-scoped traffic dimensions. Direct/(none) means source unknown, not necessarily a manually typed URL.
- Record `referrer_observed` and `campaign_reported` separately; an explicit external UTM can be a stronger provenance signal for *that* campaign but is not proof of human identity.
- Never infer ChatGPT/Gemini/Perplexity exposure from a new Direct session; verify recorded referring domain or legitimate owned campaign indicator when present.
- Keep coarse region, device, task type and broad file-size buckets if necessary, not sensitive raw payloads.
- Cross-origin iframes, agent tools, apps and newsletter clients can strip sources; list unknown, untracked and attributed totals rather than reallocating them.
- GSC provides search-side clicks/impressions, not deterministic one-to-one site sessions. Bing/AI citation products may use different denominators.

## Minimum event taxonomy
`landing_view`, `tool_start`, `input_accepted`, `validated_success`, `task_failure`, `download_requested`, `returning_task`, `share_clicked`, `outbound_partner_click`, `consent_status`, `publisher_revenue_observed`. The output validity oracle resides in product validation, not analytics.
Don't log user file contents, exact names, emails, access tokens, sensitive URLs, IPs in dashboards, contact lists or full query terms.

## Useful equations (units matter)
- Session-to-success conversion = *validated jobs / attributable qualified landing sessions* **only when job count per session is defined**. Multiple successes per session may exceed 100%; choose boolean session-level success to compute a conventional rate.
- Task success rate = *validated completions / real task starts*, with failed and cancelled clearly distinguished.
- Cost per validated completion = *channel spend + attributable production cost / successes* for same cohort/time; when no successes, return null/infinite/unknown, never claim zero.
- Contribution (currency) = *verified attributed revenue - media spend - incremental execution, provider and support costs*. Full domain profit also needs recurring fixed overhead, taxes, refunds etc.
- Ad page RPM = *actual ad revenue / real eligible pageviews × 1000* per provider definition. This is **not** advertiser CPC, CPM, a fixed industry benchmark or an automatic per-visit yield.
- Retention = *distinct eligible users who return to complete another task in interval / eligible starting cohort*, where consent, anonymous identity and one-off jobs limit measurement.

## Paid pilot safety
Before spend: product functioning, clear ad/account eligibility, legitimate source, approval, max budget, meaningful task event, explicit stop if no conversions, no invalid traffic alarms, no hidden ad/arbitrage click logic. A paid channel might be an acceptable product acquisition channel but an unprofitable way to generate display-ad pageviews.

## Anomaly playbook
- Huge sessions with almost zero valid tasks: first rule out tracking break, bot/referral spam, wrong audience or broken file widget.
- Surprising traffic from one country unrelated to target: inspect source, paid targeting, ad-provider warnings and refuse to infer human visitors from server hits.
- Referral unavailable: inspect redirect chain, attribution privacy, app browser and UTM implementation. Record UNKNOWN not invented source.
- Referral from AI: real identifiable referrer only. Independent prompt sampling indicates citation *opportunity*, not observed human traffic.
- High platform views/engagement but low visits: investigate link friction, native platform consumption and CTA promise.
- High valid tasks but low pageviews: product may solve work efficiently; don't deliberately inflate pageviews or ad exposure.

## Causal standards
Compare source cohorts with similar dates/geo/devices, guard algorithm updates and seasonality, avoid assigning causality to an organic rank shift after unrelated launches, use randomized campaigns only when ethical and sufficient data, record uncertainty and small-sample caveats. See `web-experiments`.
