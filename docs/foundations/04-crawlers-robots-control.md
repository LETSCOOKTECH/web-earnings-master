# 04 — Crawler taxonomy, robots policy, user fetchers, indexing and WAF

## Different machines, different purposes
Traditional search indexing; generative search discovery; model training; user-directed assistants; browser agents; social unfurl; shopping; advertising/publisher fetch; archives and research datasets; uptime/security scanning; malicious impersonation. The word "bot" is insufficient to set access policy. Each provider may have several robots with independent controls and identities.

## robots.txt is a crawl rule, not an authorization boundary
REP RFC 9309: UTF-8 text at the origin root /robots.txt for the scheme/host/port being accessed. User-agent groups match product tokens. Matching allows/disallows paths, with most specific matching rule, tie favors allow, with normalization details in RFC and engine interpretations. Group selection, wildcard and percent-encoding semantics matter. Sitemap is a non-standard line commonly recognized by major search engines. The rules cannot securely hide confidential URLs. For canonical search control, robots blocking may prevent a crawler from seeing a noindex tag; an indexed URL may still appear without a snippet based on external links.

## Separate protocols
- robots.txt Disallow restricts compliant automated fetching.
- HTML meta robots and X-Robots-Tag noindex restrict search indexing when fetched; never use as authentication.
- rel=canonical signals preferred duplicate; engines can choose another.
- data-nosnippet and max-snippet controls restrict specific kinds of Search presentation; exact AI inclusion settings may be separate account control.
- HTTP status (401/403/404/410/429/503), WAF, rate limits and authentication are real access layers; a UA exception is not proof of request authenticity.
- Model-training consent/opt-out is provider-specific and not identical to ordinary indexing or user agent access.
- Some product-purpose tokens, e.g. Google-Extended, are robots-specific controls and do not imply a standalone HTTP crawler UA.

## 2026 bot-purpose matrix — policies must be checked again at deployment
| Provider/token | Principal published function | What not to infer |
|---|---|---|
| Googlebot | Google Search crawl | Does not guarantee index/position |
| Googlebot-Image / Googlebot-Video | Google media discovery | Does not rank all media |
| Google-Extended | robots product/purpose token for certain Gemini uses | NOT a separate HTTP UA or ordinary Google Search blocking rule |
| GoogleOther | broader Google infrastructure crawl | Not necessarily indexing |
| AdsBot-Google | Google Ads landing checks | Not organic search |
| Mediapartners-Google | AdSense context/ad fetch | Not guaranteed site approval |
| Bingbot | Bing crawling | IndexNow notification does not guarantee rank |
| OAI-SearchBot | ChatGPT search discovery | Not equivalent to training |
| GPTBot | OpenAI training-related crawl | Not required to opt into ChatGPT Search |
| ChatGPT-User | user-triggered OpenAI page fetch | Not an automatic bulk search crawler; robots may not apply |
| OAI-AdsBot | submitted ChatGPT ad landing checks | Not organic ChatGPT search |
| Claude-SearchBot | Claude search enhancement/indexing | Not ClaudeBot training |
| ClaudeBot | Anthropic model development content | Not search setting |
| Claude-User | user-directed Anthropic fetch | Not bulk indexer |
| Claude-Agent/browser | interactive hosted browser on user's behalf | Not automatically identified like Claude-SearchBot |
| PerplexityBot | Perplexity search | Not training or a citation promise |
| Perplexity-User | Perplexity user-directed fetch | Perplexity says generally ignores robots |
| Applebot | Apple search/crawl products | Not Googlebot |
| Applebot-Extended | Apple generative model-related control | Not an Apple search rank switch |
| DuckDuckBot | DuckDuckGo bot | Results also come from partners |
| CCBot | Common Crawl corpus | Not automatic AI answer citation |
| Twitterbot / facebookexternalhit / LinkedInBot etc | social preview metadata | Not organic index crawler |
| YandexBot, Baiduspider, other regional | local search crawlers | Policy depends on product/market |

For Brave, Kagi, You.com, Meta, Grok, Mistral, Genspark, Phind and other providers: never invent dedicated crawler tokens or a direct submission protocol from their marketing. Inspect their current official infrastructure/partner documentation and verify in logs. Not every model uses a self-owned index.

## Verified official distinctions 2026-11-23
OpenAI states OAI-SearchBot and GPTBot settings are independent and ChatGPT-User is user-triggered. OpenAI additionally lists OAI-AdsBot for submitted ad validation. https://developers.openai.com/api/docs/bots
Anthropic distinguishes ClaudeBot/Claude-SearchBot/Claude-User, plus hosted browsers. https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
Perplexity-User may generally ignore robots.txt. Perplexity publishes IP lists. https://docs.perplexity.ai/docs/resources/perplexity-crawlers
Google lists common/special/user-triggered crawler families and verification mechanisms. https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers
Google-Extended interpretation must be checked in exact Google crawler doc and user product scopes.
Apple doc https://support.apple.com/en-ie/119829 was a historical reference; direct current content could not be opened in this session, therefore Apple details are PROVIDER-DOCUMENTED-HISTORICAL pending fresh verification.

## Safe policy example (EXAMPLE ONLY — not a site-ready robots file)
User-agent: *
Disallow: /private/
Allow: /

User-agent: GPTBot
Disallow: /

User-agent: OAI-SearchBot
Allow: /

Sitemap: https://OWNED_REAL_HOST/sitemap.xml

WARNING: explicit group behavior can differ from wildcard assumptions; a bot-specific group without the /private/ disallow can inadvertently permit content that was wildcard-blocked. Private routes MUST be gated by actual authorization regardless. To allow search and block training, write intentional complete per-bot rules, test every intended path and verify current provider documentation. Do not copy this sample directly to production.

## REP advanced cases to exercise
- Separate robots.txt per subdomain/scheme and port, absent/redirected file.
- 2xx, 3xx, 4xx, 5xx robots responses; RFC and Google behavior may differ at edges; handle caching and size rules.
- Multiple User-agent groups for same product; matching product token versus wildcard; overlapping Allow/Disallow specificity; case-sensitive path; percent encoding and trailing slash.
- Disallow /not-indexed/ AND noindex there: blocked bot cannot read noindex! If confidentiality is goal, authentication wins.
- X-Robots-Tag on PDF, images, downloads; per crawler rules need correct syntax and actual response.
- WAF 200 HTML challenge from CDN while origin says 200 tool page; proves "success status" alone insufficient.
- robots disallow versus user-directed agents that may ignore it; access control remains server-side.
- Sending only "User-Agent: Googlebot" proves nothing about Google ownership.

## Verified crawler identity
For Google follow official reverse-DNS then forward-DNS verification or the published IP ranges; for OpenAI and Perplexity, validate published IP data and UA pairing. IP ranges change and have distinct purpose files. A superficial UA match is spoofable. Implement security bypasses only for a documented, verified family and minimum required endpoints. Track bot request path/status/cache action, challenge reason and rate limits with privacy-safe logs; log retention must comply with policy. Never let crawlers fetch user-uploaded private content merely to improve SEO.

## Diagnostic runbook
1. Record the desired provider/surface and whether we want search, training, user fetching or ads.
2. Reopen official crawler docs and record checked-at UTC; check rollout and correct token.
3. Test robots group parsing with negative fixtures; inspect header robots, canonical and authentication separately.
4. Inspect origin and edge response bytes/status for independent samples; IP validate actual crawler requests where logs available.
5. Change WAF rules on staging only, with rollback; never silently whitelist all bots.
6. After real deployment observe actual verified requests, GSC/Bing indexing and referrals; any missing stages remain UNKNOWN.

## Sources
RFC 9309: https://www.rfc-editor.org/rfc/rfc9309.html (opened)
Google crawler list: https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers (opened)
Google verification: https://developers.google.com/crawling/docs/crawlers-fetchers/verify-google-requests (opened)
Google robots: https://developers.google.com/search/docs/crawling-indexing/robots/intro (to recheck)
OpenAI: https://developers.openai.com/api/docs/bots (opened)
Anthropic: https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler (opened)
Perplexity: https://docs.perplexity.ai/docs/resources/perplexity-crawlers (opened)
