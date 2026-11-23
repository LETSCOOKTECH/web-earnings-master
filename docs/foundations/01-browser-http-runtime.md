# 01 — Browser, HTTP, TLS, DNS, rendering and observability

## Why this matters
A crawlable page is a successful outcome of many network and document stages. If a WAF returns a challenge, the crawler never sees the same bytes as a normal user. If useful text exists only after a failing JS request, the document may be fetched but not reliably interpreted. Fast HTML does not prove a tool actually produces a correct result.

## 1. Decompose a URL
Example: https://tools.example.org:443/resize/?w=400#preview
Scheme HTTPS; authority tools.example.org:443; host tools.example.org; explicit port 443; path /resize/; query w=400; fragment preview. The fragment is used in the browser but not sent as part of the HTTP request target. Origin is scheme + host + port; site is a different browser concept using registrable domain/public suffix rules. Do not equate origin with registrable domain. URL percent-encoding and Unicode/IDN require deliberate canonical handling. Use the WHATWG URL standard in browser logic; do not invent string-based parsers.

## 2. Address resolution and routing
Browser may check in-memory/cache; the OS or configured resolver performs name lookups; a recursive DNS resolver can query root, TLD and authoritative servers. Record families: A/AAAA host addresses; CNAME alias; NS delegation; SOA authority; TXT metadata/verification; MX mail; CAA certificate restrictions; DS/DNSKEY/RRSIG DNSSEC trust; HTTPS/SVCB service hints; PTR reverse mapping. Recursive caching TTL means changes can be seen at different times. Split-horizon DNS, CDNs, IPv4 versus IPv6, VPN, NAT, anycast and regional routing can yield different destinations. A resolver's success does not prove origin availability or search eligibility. BGP selects network routing paths independently of the DNS record data.

## 3. Connection and encrypted transport
HTTP/1.1 and HTTP/2 commonly run over TLS on TCP; HTTP/3 runs over QUIC on UDP. DNS/TCP/TLS handshakes may be reduced by caches, connection reuse, resumption or 0-RTT where applicable. TLS validates certificate names and trust chains; SNI and ALPN participate in endpoint/protocol negotiation. Browser certificate errors, expiry, mismatches and invalid intermediates prevent reliable access. HSTS directs HTTPS upgrades after policy discovery or preload. Do not label DNS-over-HTTPS a ranking technique.

## 4. Request and response semantics
Method: GET retrieves, HEAD requests metadata, POST/PUT/PATCH mutate according to API contracts, OPTIONS assists capability negotiation; semantics and idempotency matter. Request headers include Host or :authority, Accept, Accept-Encoding, User-Agent, cookies, conditional If-None-Match/If-Modified-Since. Response Content-Type determines parser; Cache-Control/ETag/Vary govern shared caches; Location redirects; X-Robots-Tag governs supported crawler indexing for non-HTML too.
- 200: success; not proof useful page.
- 301/308: permanent redirect semantics, preserve method distinction; 302/307: temporary.
- 304: cache revalidation without response body.
- 401/403: auth or denied, not crawlable for anonymous bots.
- 404/410: absent/gone; returning 200 on an error template risks soft-404 classification.
- 429: throttled; Retry-After advisory when supplied, not an SEO improvement.
- 500/502/503/504: server/path failure; prolonged failure impairs crawler access.
HTTP status belongs to actual response; a SPA route showing "not found" with 200 is not an HTTP 404.

## 5. Resource and rendering pipeline
HTML bytes -> streaming tokenizer/tree builder -> DOM; HTML preload scanner discovers CSS/scripts/images; CSS -> CSSOM; JS may mutate DOM and fetch resources; style/layout/paint/compositing produce pixels. The browser's rendering architecture uses processes/threads, site isolation and a main thread; details vary by engine (Chromium/Blink/V8, Firefox/Gecko/SpiderMonkey, WebKit/JavaScriptCore). Long JS tasks delay responsiveness; hydration introduces JS execution and possible layout shifts. SSG supplies markup at build time, SSR at request time, CSR after JS. An Astro island is engineering convenience, not a Google ranking flag. Use HTML visible before hydration for public topic pages; confirm actual JS-disabled and rendered snapshots. Renderers used by search engines may differ from consumer Chrome.

## 6. Browser web platform boundaries
Same-origin policy restricts scripts reading across origins; CORS grants selected cross-origin scripted reads, not general network invisibility. CSP, trusted escaping, Trusted Types, sandbox, secure context, permissions, CSRF defenses and XSS testing are complementary. Cookies have Secure, HttpOnly, SameSite, domain/path rules; service workers may intercept requests and cache offline. LocalStorage/IndexedDB persist user data subject to origin/storage limits; File API allows user-authorized file access, not arbitrary disk. Web Worker and WASM can reduce main-thread contention, but do not grant unlimited memory/CPU or device permissions. Browser fingerprinting risks privacy; cannot infer detailed physical hardware or ISP speed from guessed client APIs.

## 7. Performance measurement
Critical path: DNS/connect/TLS, TTFB, resource discovery, render-blocking work, LCP, JS long tasks/INP, layout stability/CLS. Lab Lighthouse/DevTools traces help debug; field measurements at p75 of real users are not interchangeable with single synthetic scores. p75 recommended good thresholds (subject to latest web.dev): LCP <=2.5s, INP <=200ms, CLS <=0.1. Test mobile CPU, slow network, cache cold/warm, large images, invalid input, low memory. Caching layers: browser HTTP, CDN, origin, service worker; respect privacy (never cache personalized content with public shared keys). Correct invalidation prevents stale robots/HTML from causing visibility incidents.

## 8. Forensic workflow and falsifiable hypotheses
Scenario A: Google URL Inspection sees blocked resource but Chrome works: compare Googlebot access through verified logs, robots rules and edge challenge; don't assume a framework defect.
Scenario B: 200 response with empty root div and late JS: save curl body, JS-disabled screenshot, browser DOM post-hydration, script errors. Prove whether meaningful text and links exist.
Scenario C: mobile clicks fail but Lighthouse 100: inspect user interaction E2E, file codecs/permissions, INP and memory.
Scenario D: CDN rollout causes sporadic 503: sample multi-region requests, distinguish origin vs edge, compare cache headers, review CDN WAF/rate limits and newly published Google CDN guidance.
Scenario E: wrong MIME and Content-Disposition for generated files: test output bytes, not extension, validate user downloaded artifact.

## Repro commands (authorized targets only)
- curl -v -L -D headers.txt -o page.html https://OWNED_HOST/
- curl -I https://OWNED_HOST/robots.txt
- curl -I https://OWNED_HOST/this-must-not-exist
- dig OWNED_HOST A; dig OWNED_HOST AAAA; dig OWNED_HOST NS
- openssl s_client -connect OWNED_HOST:443 -servername OWNED_HOST (review certificate chain/hostname via appropriate verifier).
- Browser DevTools -> Network export HAR with cookies/tokens removed; Performance trace; JS disabled; Playwright screenshot and accessibility checks.
Never submit unredacted HAR or auth cookies to repo; curl with spoofed User-Agent does NOT prove real Googlebot access.

## Acceptance outputs
URL/network incident report with request timings, status, host, response headers, actual body/DOM, browser version, device, edge rules, hypothesis, local reproduction, repair and regression test. Name what remains UNKNOWN: provider's real crawler index and account-specific ranking.

## Primary references (opened 2026-11-23 for relevant claims)
MDN browser pipeline: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work
RFC 9110 HTTP: https://www.rfc-editor.org/rfc/rfc9110
RFC 9111 caching: https://www.rfc-editor.org/rfc/rfc9111
DNS architecture RFC 1034: https://www.rfc-editor.org/rfc/rfc1034
Web standards: https://html.spec.whatwg.org/multipage/
Web performance: https://web.dev/articles/vitals
Note: web standards links not opened this session must be live rechecked before asserting specific new normative behavior.
