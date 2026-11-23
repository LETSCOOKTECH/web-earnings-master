# Every-page quality specification for SEO, AI search and publisher monetization
**Reviewed 2026-11-23. Owner:** `web-frontend-experience-engineering`, `web-publisher-policy-eligibility`, `web-technical-seo`.

## Four independent gates
1. **Working outcome:** does the page let a real person complete an identifiable job? Is file output correct, or is it a fake converter with decorative UI?
2. **Web search eligibility:** meaningful crawlable initial HTML, correct HTTP status, index/snippet permission, proper canonical, real links, no spam/scaled content and accurate original information. Eligibility does not prove ranking.
3. **Publisher site/account approval:** owner/site access, policies, navigation/content quality, completed site, ads crawler and consent; authorization only established by platform account.
4. **Page-specific ad serving:** even on approved websites Google restricts ads on screens without publisher content, low-value or under-construction inventory, prohibited content, deceptive placement, or invalid traffic. Some pages should deliberately remain ad-free.

Primary: https://support.google.com/adsense/answer/12176698 ; https://support.google.com/adsense/answer/7299563 ; https://support.google.com/publisherpolicies/answer/11112688 ; https://support.google.com/adsense/answer/48182 ; https://support.google.com/adsense/answer/1346295 ; https://developers.google.com/search/docs/essentials/spam-policies .

## An acceptable utility page (not a guarantee of approval)
The page communicates its specific supported outcome immediately. Working input, progress and download don't hide behind ads. Unique initial text must be directly relevant: real supported formats/types, limits and examples; comparison chart and error handling where true; privacy, deletion/retention and performance claims with reproducible proof; accessible explanation. Original benchmarks/datasets or behavior afford durable value, not boilerplate.
**There is no official universal Adsense 'minimum 1000 words' or 'exactly 20 blog articles' rule.** A tiny calculator can fulfill a real task, yet a page can still be considered thin publisher content for ad purposes; both facts can coexist. Evaluate the actual page's functionality, advertiser content rules and user experience; don't attach fabricated word-count "passes".

## Route taxonomy
| Page type | Search status | Ads posture |
|---|---|---|
| Home/index, real taxonomy hubs | Potentially indexable if unique useful navigation | Ads only if real publisher content and acceptable layout |
| Dedicated working converter/calculator | Indexable if real distinct user job and supporting content | Independent ad/UX review; don't obstruct critical task |
| Useful original methodology/benchmark/tutorial | Indexable with source and technical correctness | Ad-friendly if publisher rules and consent pass |
| Near-duplicate variants and parameterized results | Canonical/noindex where appropriate; don't fabricate unique pages | Often avoid ads until reviewed and real value exists |
| User private file/editor/result screen | Often auth/noindex, private | Ads may be inappropriate; privacy/security priority |
| Error, loading-only, zero-result, under construction | 404/503/noindex context; not eligible for general display ads | Default NO ads |
| Terms, privacy, account/delete, contact | Accessible and accurate, generally indexable as appropriate | Default sparse/no ads; not a content factory |

## SEO and AI readiness
- Raw HTTP response status 200 for legitimate page, no hidden redirect/soft 404, true robots/noindex and snippet policies.
- Canonical is a hint and must match actual intent, duplicate family, language; hreflang only for reviewed authentic translations and reciprocal alternates.
- Real internal HTML anchor links, crawlable format hubs not universal link farms, accurate XML sitemap lastmod and no infinite facets.
- Query in title/H1/anchor naturally; semantic coverage includes actual user limits and tested outcomes rather than keyword density.
- Product-specific structured data only if visible truth, schema.org type isn't a mandatory AI Mode trick.
- Rich-result eligibility must be checked against current Google supported gallery; retired Google FAQ rich result isn't an AEO win.
- AI Mode supporting link requires Google indexed and snippet eligible but remains selection-dependent. Google explicitly doesn't use llms.txt to appear in Search.
Sources: https://developers.google.com/search/docs/appearance/ai-features ; https://developers.google.com/search/docs/fundamentals/ai-optimization-guide .

## AdSense review and placement threats
- Google ads cannot be blended with menu items or download buttons. Avoid ads adjacent to click-heavy controls with visual confusion or deliberate layout shifts.
- Protect action flow from full-screen popunder/autoredirect when it affects policy/brand/SEO or exclusivity.
- No "click ads to support" copy, no paid-to-click or automated impressions, no unverified bot suppression cloaking.
- Correct root ads.txt, ownership and seller IDs, authorized consent solution for applicable region. Don't paste invented publisher identifiers.
- Date/policy changes and ads consent checks must be reverified with account access; AdSense status can't be inferred from page code.

## Verification record per URL
At minimum: URL, task, source/version, crawl snapshot, correct response/initial HTML, canonical, internal incoming links, tool result fixture hash and tests, accessibility issues, output privacy, copy evidence, duplicate cluster, ad geometry/consent/screenshot and human reviewer signoff. Separate statuses `FAIL_KNOWN`, `UNKNOWN_EXTERNAL`, `OFFLINE_CHECKS_ONLY`, and `APPROVED_IN_OWNER_ACCOUNT` if verified. No numeric "Google approval percent" invented.
