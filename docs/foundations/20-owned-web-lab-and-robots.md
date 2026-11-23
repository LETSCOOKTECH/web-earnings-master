# 20 — Owned HTTP/robots and real browser engine regression laboratory
Date 2026-11-23. Lab code: scripts/owned-web-lab.mjs, scripts/robots-evaluator.mjs, tests/owned-web-lab.test.mjs, tests/browser-e2e.mjs. All network fixtures bind to 127.0.0.1 with OS-selected port: no third-party scraping, no live Search manipulation.

## Why this matters
A guide that merely says "check 404, robots, SPA and accessibility" can appear authoritative while misdiagnosing a broken real deployment. This lab sends actual HTTP requests to a controlled server and, when browser dependencies are installed, runs Chromium/Blink, Firefox/Gecko and WebKit browser builds. It proves behavior ONLY of this fixture and browser build. Do not call them Googlebot, mobile Safari or Bingbot.

## Node-only fixture endpoints
| Route | Observable real behavior | Catch |
|---|---|---|
| /document | 200 usable HTML, native text input/button/result, real anchor and canonical | HTML usable before JS, output after click |
| /redirect | HTTP 308 Location /document | Redirect is not a canonical tag |
| /missing | HTTP 404 | Correct missing status |
| /soft404 | HTTP 200 with "Not found" content | Soft-404 trap |
| /header-noindex | HTTP X-Robots-Tag: noindex | Header separate from meta |
| /meta-noindex | 200 with meta robots noindex | Only visible when allowed crawl can fetch it |
| /canonical-conflict | 200 whose canonical points elsewhere | Canonical hint does not redirect |
| /robots.txt | Star groups, GPTBot deny, OAI-SearchBot allow, sitemap | Provider-purpose independence and group precedence |
| /private/account | 401 for every request | robots disallow is not private-data security |
| /sitemap.xml | Public /document only | Avoids private/soft404 |
| /etag | ETag plus conditional HTTP 304 | Cache validator vs content |
| /hydration-only | Initial no H1; JavaScript inserts H1 | Raw HTML vs rendered DOM |
| /csp-block | CSP script-src none blocks inline mutation | Script blocked despite 200 |
| /js-crash | Intentionally uncaught JavaScript error | Log exception vs generic blank page |
| /challenge | HTTP 200 anti-bot/challenge copy | Status 200 doesn't prove crawlable content |
| /unavailable | HTTP 503 Retry-After | Temporary server problem |

## Robot evaluator — limited reference behavior
Local implementation parses User-agent groups, specific matching token vs wildcard, empty Disallow, Allow/Disallow path precedence, multiple matching groups, * wildcards and $ end anchors. URL path matching is case-sensitive. A sitemap or non-standard directive does not terminate group. **Not a complete normative RFC 9309 parser:** percent-encoding/UTF-8 octet normalization, redirects, protocol/host/port robots authority, HTTP errors and all vendor quirks require standards/provider verifier. It is a diagnostic test tool and teaching model; do not automatically deploy WAF from evaluator output.

## Browser E2E evidence
Playwright (pin exact tested version 1.65.1) launches its real bundled Chromium, Firefox and WebKit builds under Ubuntu CI. In each engine test:
1. 200 document response, accessible H1, label, textbox, button and status.
2. Fill sample, perform tool action, assert correct calculated output and inspect canonical, link.
3. Compare hard 404 and soft 404 with actual page responses.
4. JavaScript hydration creates heading in rendered DOM, while JS-off context has no heading.
5. CSP header prevents inline script mutation; uncaught JS error captured via pageerror.
6. Private URL still returns 401 regardless of robots.
7. Record browser version and results in .tmp/browser-e2e-results.json, uploaded as an artifact if workflow executes.
This is **real executable browser code**, not static mock or just a spec. Workflow runs on PR when relevant paths change, and can be manually dispatched. A red GitHub workflow means no browser validation; it is not acceptable to claim multi-browser PASS until the actual CI logs say so.

## Local run commands (Node22+)
npm test
node scripts/owned-web-lab.mjs (library exports only; use Node test)
node --test tests/owned-web-lab.test.mjs
npm install --no-save --ignore-scripts playwright@1.65.1
npx playwright install --with-deps chromium firefox webkit
node --test tests/browser-e2e.mjs

## How to build a genuine browser/search field experiment later
For an actual site property, confirm user ownership. Snapshot DNS/TLS/CDN headers and actual robots, render in all 3 engines, check Search Console and Bing Webmaster properties, submit representative URLs, and monitor status and bot server logs. Distinguish indexed/crawled/discovered from rank and actual task conversion. The lab can flag site issues; no local or hosted test forces inclusion in a commercial search index.
For Google-specific bots, authenticated IP / reverse DNS and current documented identity categories matter; spoofing a User-Agent in local fixture is NEVER bot verification.
For LLM bots (OpenAI, Anthropic, Perplexity), independently verify actual purpose-specific tokens and provider IP ranges from live official source. Perplexity-User and Google user-directed fetchers may not honor robots; private data must be server protected.
A production WAF testing tool should include signed requests/Web Bot Auth verification when provider rollout makes it applicable; this lab deliberately does NOT forge Google-Agent signatures.

## CI evidence grading
No-execution spec: documented scenario only.
Node HTTP fixture: LOCAL/HTTP_TEST_PASS.
Playwright browser: LOCAL/REAL_BROWSER_TEST_PASS with browser version, platform.
Owned remote server: OWNER_PRODUCTION_HTTP_OBSERVED.
Search account: OWNER_SEARCH_PROVIDER_CONFIRMED.
AI answer source: DATED_OBSERVED_CITATION with region/model/version; actual human referrals measured separately.
Only deploy actual policy changes when relevant source and live tests show correctness. Never use a generic "full compliance" label.

## Sources
RFC 9309 https://www.rfc-editor.org/info/rfc9309/
Google robots spec https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec
Googlebot fetch controls https://developers.google.com/search/blog/2026/03/crawler-blog-post
Google user fetchers https://developers.google.com/crawling/docs/crawlers-fetchers/google-user-triggered-fetchers
Google-Agent verification https://developers.google.com/crawling/docs/crawlers-fetchers/allow-google-agent
OpenAI bots https://developers.openai.com/api/docs/bots
Perplexity bots https://docs.perplexity.ai/docs/resources/perplexity-crawlers
Playwright browsers https://playwright.dev/docs/browsers
WHATWG HTML https://html.spec.whatwg.org/multipage/
