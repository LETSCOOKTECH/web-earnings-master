# 02 — Source-specific adapters, data semantics and fallbacks

The correct optimization is **maximum independent decision value per resource unit**, not maximum page fetches.

| Surface | Mode | What it can establish | Critical limitation |
|---|---|---|---|
| Google Trends Explore | Public UI + permitted CSV | Relative sampled interest, regions, seasonality, related queries | 0–100 ≠ searches; 0 ≠ no demand |
| Google Trends API alpha | Approved alpha account | Consistently scaled rolling data within published API scope | Access not general/public by default |
| Google Trends BigQuery | Published dataset | Scoped top and rising terms in supported regions/times | Not arbitrary keyword monthly volume |
| Google Ads Keyword Planner | Authorized Google Ads UI/API | Estimated search volume and advertiser interest by target | Competition is for advertisers, not SEO KD |
| Semrush Overview/Magic/Gap | Licensed GUI/export | Modeled keyword volumes/KD, intent, competitive pages | Competitor sessions and RPM are not known |
| Semrush API | Explicit plan/API entitlements and spend | Approved structured paid keyword/traffic endpoints | Units, throttling, caching license |
| Ahrefs Keywords Explorer | Licensed UI/API | Provider-modeled volume/KD/clicks, pages/backlinks | Definitions differ from Semrush |
| Own Search Console | Authorized site | Real Google impressions/clicks by query/page/geo/device | Anonymized queries, data caps, no user task completion |
| Own Bing Webmaster | Authorized site | Bing queries/indexing/AI metrics as available | Different products/definitions |
| Google/Bing SERP | Permitted UI and dated capture | Real result types, competitors, ads/AI features, intent | Personalized/location/time fluctuations |
| Reddit | Permitted manual reading or licensed access | Individual public account's reported experience | Not verified humans; automated scraping restricted |
| GitHub Issues | Permitted GUI/API | Reproducible developer pain and issue frequency clues | Nonrepresentative of broad population |
| Stack Overflow | Permitted public view/API | Specific technical errors/solutions | Posts ≠ market size; attribution/license |
| App Store/Play reviews | Permitted public listing or authorized APIs | Reported product limitations with version/date | Negative-review bias, authenticity unknown |
| G2/Capterra/Trustpilot | Allowed public review research or licensed data | Market pain language, competitor feature complaints | Self-selected ratings, rights and fake reviews |
| YouTube | Visible search/tutorial data | Problem wording, platform discovery, content gaps | Views ≠ demand volume or site referrals |
| Product Hunt/HN/Indie communities | Permitted public view | Early adopter interest and reactions | Launch spikes are not retention |
| Official government/university docs | First-party page | Actual form/technical constraints | Does not prove number of users |
| Competitor changelogs/pricing | Original product pages | Current claims, announced changes | Test actual behavior before gap claim |
| Interviews/user pilots | Consented research | Specific users' painful jobs and real actions | Sampling bias; require multiple contexts |

### Data quality hierarchy
- **First-party owner observation:** GSC, valid task completions, actual invoices and consented pilot data, with exact denominator.
- **Official rule/specification:** proves provider/venue requirements, not customer demand.
- **Public original report:** an account says it suffered a problem; identity and prevalence uncertain.
- **Third-party estimate:** keyword volume, traffic, KD, CPC, market-sizing; model-based; cannot count as first-party.
- **Reproduced output:** competitor or prototype defect tested under identical input/version/locale.
- **Inference/hypothesis:** clearly labeled, bounded and falsifiable. It never upgrades to an observed fact by repetition.

### Research pitfalls
- Comparing Trends in isolated windows produces misleading relative scales; compare with shared anchors/context or limit to within-group.
- Treating Google Ads low advertiser competition as easy organic SEO.
- Treating Semrush domain-level modeled visits as achievable clicks for a brand-new tool.
- Counting Reddit copy-and-pastes or identical forum threads as independent user sources.
- Assuming every AI search result has a human click opportunity.
- Treating multi-platform results dependent on one underlying Google index as separate independent market demand.
- Using a platform's ToS-violating browser scraping because an API is unavailable.
- Misreading old app reviews after a fixed version; run current competitor tests.
- Choosing a low-compute "free" app without checking support, egress, consent, abuse and monetization economics.
- Claiming lack of data means zero demand; research unavailable data instead of guessing.

### Source verification
Action-time source body and product/account-specific permission is required before high-risk access. Log original URL, opened vs search snippet, date, updated/effective status, restrictions, terms review and contingency. Source registry is a **lead list**, not pre-granted permission. Same-day provider policy review is appropriate before consequential automated browsing or paid API.
