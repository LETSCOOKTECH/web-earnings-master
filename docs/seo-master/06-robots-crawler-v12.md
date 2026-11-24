# V12 robots.txt group and path precedence

Official originals opened 2026-11-24:
- https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec
- https://www.rfc-editor.org/rfc/rfc9309.html

## Correct execution semantics
1. A group consists of one or more consecutive User-agent declarations with following Allow/Disallow rules.
2. A crawler selects the most specific matching user-agent token. The wildcard group is fallback, **not** mixed with the specific Googlebot/Bingbot group. Multiple equally specific matching groups combine.
3. The most specific matching path rule wins. Equivalent allow and disallow ties favor allow; empty Disallow means unrestricted crawl. Wildcard * and end anchor $ are supported.
4. Sitemap is not a rule-group boundary; a sitemap is not a guaranteed indexing instruction. Canonical and robots/noindex are distinct controls.
5. Googlebot, Googlebot-Image, Bingbot, GPTBot, OAI-SearchBot and user-initiated agents have distinct purposes. Robots controls crawler behavior, not private access or model ranking weights.
6. The current JavaScript evaluator is an educational RFC9309 subset. International URI percent-encoding, unexpected vendor interpretations, robots 4xx/5xx/cache and WAF require actual deployed HTTP and authoritative verification.

## Previously undetected failures
Specific Googlebot Disallow: / with wildcard Allow: / was a false PASS under the older cross-group regex. A Bingbot-only disallow was misreported as wildcard-all. Both are now tested with actual per-bot and per-public-page evaluation.

## Tools and release gates
Use scripts/check-robots-policy.mjs with --file, optional repeated --path and --bot values. Its defaults evaluate homepage for Googlebot and Bingbot.
The built-site checker scripts/audit-static-site.mjs reads the real public route URLs and assesses Googlebot/Bingbot separately. It does not certify actual Googlebot requests or DNS/CDN permissions.
Negative tests cover wildcard and specific groups, path exceptions, repeated groups, image-specific rules, equal tie, comments and case, invalid sitemap and empty directives.
