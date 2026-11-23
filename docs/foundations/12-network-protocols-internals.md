# 12 — Web protocol internals: domain resolution, certificates, HTTP, transport, cache and CDN
Date: 2026-11-23. Protocol standards are normative when applicable; deployment products differ.

## Packet path from a URL to a response
User enters URL → browser computes URL/origin → HSTS/upgrade considerations → resolver cache / DNS (A/AAAA/HTTPS/SVCB, possibly DoH/DoT) → selects address/route/network → TCP and TLS for H1/H2, or QUIC for H3 → TLS server certificate name/trust verification and ALPN negotiation → HTTP request through CDN/edge/origin → status, headers and content → redirects/cache handling → browser resource loader. Each stage has unique error causes; do not label all failures SEO.

## DNS authoritative detail
DNS hierarchical naming: root delegates TLD via NS/DS; TLD delegates domain NS; authoritative zone serves records; recursive resolver caches RRsets with TTL, including negative caching. Stub resolver and local hosts/network policies may override. Delegation/glue records may be necessary; nameserver and zone authority mismatch creates intermittency. DNSSEC RRSIG signatures and DNSKEY/DS validate an authenticated denial chain, not confidentiality; DNS-over-HTTPS protects query transport to resolver, not authoritative server path or privacy from endpoints. DNS A is IPv4; AAAA IPv6; CNAME alias can create chains; SVCB/HTTPS hints offer endpoint/protocol data; MX and TXT are unrelated to ranking; CAA restricts authorized certificate authorities. Public Suffix List matters to registrable-domain calculations, not proof of legal ownership. Browser can prefer Happy Eyeballs / multiple IPs, use connection pooling and anycast CDNs.

## TLS and routing
Certificate issuance via CA, SAN name matching, trust anchors, expiry, revocation/OCSP mechanisms where relevant, chain validation. SNI identifies host, ALPN chooses HTTP application protocol. TLS 1.3 and QUIC have distinct handshake/resumption characteristics. HSTS enforces HTTPS for eligible hosts; reverse proxy and origin certificate chains can differ. Client-side network requests may fail due to MTU, UDP block, IPv6 blackhole, firewall, proxy or captive portal. Do not build a "VPN detection" product from vague timings.

## HTTP message semantics
GET, HEAD, POST, PUT, PATCH, DELETE; safe/idempotent distinctions; cookies/authorization/Accept negotiation; request body encoding, content length vs chunked transfer, compression, ETag/If-None-Match and conditional requests. Status categories: 2xx success, 3xx redirect/revalidate, 4xx client/auth/notfound/rate, 5xx server. 304 without body relies on cached entity; cache correctness demands method, authorization, cache key and Vary consistency. Headers relevant to SEO/security: Location, Content-Type, X-Robots-Tag, Link canonical where appropriate, Cache-Control, Vary, CSP, HSTS, COOP, COEP, CORP, Set-Cookie, Content-Disposition. The HTTP Link canonical header is not universally equivalent for every type/product. CSS/JS asset failures can prevent page rendering without changing document HTTP 200.

## Caching layers
OS DNS resolver, browser in-memory cache, HTTP disk cache, service worker Cache Storage, CDN/edge HTTP cache, origin cache, database. Shared caches must not leak private authenticated pages. Respect private/no-store/s-maxage/max-age, validators, immutable fingerprints, Vary and surrogate keys; avoid stale HTML canonical/robots after deployment. Stale-while-revalidate can serve outdated content by design; record deployment version and cache age. CDNs can independently impose bot management, anti-DDoS, access challenges, geographic filtering or SEO-damaging 429.

## Request time interpretation
Navigation Timing measures phases where exposed; 'DNS 0 ms' may mean cached or connection reuse, not DNS absent. TTFB includes network/server and edge; QUIC/H3 isn't necessarily faster for all networks. Waterfall quantifies blocking/queueing/redirect/connect/request/response. Real-user web vitals help quantify task friction but cannot establish relevance/ranking. Security-first edge design may impact crawl and user agents differently; log status and matched security rule with legitimate bot verification.

## Browser and search crawler comparison
An actual crawler may use alternate supported HTTP versions, lack cookies, respect different robots groups, execute JS differently, not hydrate every route, be challenged by WAF, or request from other IP geography. Spoofing -A "Googlebot" changes header only, not origin/IP. Search Console indexed/crawled reports and verified crawler traffic are required to validate real access. A 200 response from an HTML challenge is a false positive for crawlability.

## Production failure simulation cases
D01 stale DNS NS, D02 AAAA points wrong, D03 certificate name mismatch, D04 HTTP→HTTPS loop, D05 bad redirect query/locale, D06 CDN cache contains 'noindex' during rollout, D07 404 shown with status 200, D08 robots protected behind WAF, D09 cache stores signed user download publicly, D10 429 misidentifies verified crawler, D11 gzip corrupted from edge, D12 user agent accepts wrong representation, D13 network down mid-file batch, D14 API CSRF attempts, D15 stale SW caches previous version and fails tool.

For each: record request context, authoritative standards/expected status, direct response byte samples, tools/permissions, actual vs expected, repair and independent regression. No production claim without live authorized request.

## Security note
Use only authorized hosts for protocol scans; never perform port scans or bypass CDN controls on third-party systems. Store redacted HAR logs, no private cookies, session IDs, API tokens or uploaded media. Validate domain ownership and host allowlists before fetching arbitrary URLs; SSRF risk includes redirected endpoints and DNS rebinding.

## Standards and original docs
HTTP semantics RFC 9110 https://www.rfc-editor.org/rfc/rfc9110
HTTP caching RFC 9111 https://www.rfc-editor.org/rfc/rfc9111
HTTP/2 RFC 9113 https://www.rfc-editor.org/rfc/rfc9113
HTTP/3 RFC 9114 https://www.rfc-editor.org/rfc/rfc9114
QUIC RFC 9000 https://www.rfc-editor.org/rfc/rfc9000
TLS1.3 RFC 8446 https://www.rfc-editor.org/rfc/rfc8446
DNS RFC 1034 https://www.rfc-editor.org/rfc/rfc1034
Robots RFC 9309 https://www.rfc-editor.org/rfc/rfc9309.html
WHATWG URL https://url.spec.whatwg.org/
MDN CORS https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
Cloudflare cache docs should be re-opened for any Cloudflare-specific setting; none of these RFCs certify provider Search indexing.
