# Third-party ad networks — eligibility and economics

Do not select an ad provider merely because it offers instant onboarding. A website without real visitors will still earn little; aggressive advertising can reduce organic retention and jeopardize long-term monetization.

| Provider | What to verify live | Notes from 2026 official documentation |
|---|---|---|
| Google AdSense | Owned site, original value, policies, site review status, consent, ads.txt, payment | No universal visitor/blog-post threshold; eligible site must be Ready to serve |
| Monetag | Site verification, mainstream content rules, formats, payout, consent, AdSense interaction | OnClick popunder, push and MultiTag exist; avoid formats that compromise UX or compatibility |
| Journey/Mediavine | Current sessions/traffic, content standards, geography, quality, contracts | Official Mediavine material describes Journey onboarding above 1,000 sessions; verify current account scope |
| Raptive | Current pageviews, geo fraction, content and traffic policy | Official Raptive 2026 eligibility lists 25,000 monthly pageviews; higher/lower bands vary by quality/geo |
| Ezoic | MAUs, location, policy and existing-site exemptions/incubator | Official 2026 page mentions 250,000 MAU requirement with Incubator route; **never assume old 'no minimum' summaries apply** |
| Media.net | Publisher eligibility, contextual fit, approved geos and contract | Verify official current inventory rules, payout and domain review; do not invent thresholds |
| Other networks (Adsterra, PropellerAds etc.) | Official rules for traffic quality, scripts, popups, consent, fraud, approval, payout | Do not infer safety or AdSense compatibility from 'no minimum traffic' marketing |

## Network comparison workflow
1. Collect `site URL`, verified monthly **human** traffic, country mix, pages/visit, content category, ad placement design and consent strategy.
2. Open each provider's official current application page and TOS; record exact publisher minimum, policy, identity, banned traffic, ad unit script, exclusivity/lock-in, reporting access and payout terms with dates.
3. Score fit for the user task and user trust. Deceptive download ads, forced redirects, popunders, multiple push prompts and intrusive overlays are poor for file-conversion sites even if a network offers them.
4. Calculate a scenario: `monthly pageviews × assumed page RPM / 1000`, subtract variable hosting/serving costs; label assumed RPM as unverified. Recalculate using actual publisher reporting after trial.
5. Test scripts in staging and production responsibly: ad viewability, CLS, LCP, event tracking, browser permissions and click safety (do not click live ads).
6. Plan switch/rollback: tags, service workers, vendor lists, consent strings, CSP and root ads.txt. Avoid conflicting site ownership verification tags.

See `sources/official_sources.json` for provider URLs. Plan-specific obligations may differ and must be reverified in the provider account.
