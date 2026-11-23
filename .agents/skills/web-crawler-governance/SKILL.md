---
name: web-crawler-governance
description: "Audit crawler purpose, robots.txt RFC 9309, noindex and canonical interactions, verified bot IP, firewall rules and safe search-versus-training permissions."
---

# web-crawler-governance

**Trigger:** Robots configuration, AI crawler allow/block decisions, WAF challenge, bot verification, crawler audit, training opt-out or user-fetch access.

**Read:** docs/foundations/04-crawlers-robots-control.md, 09-source-refresh.md; RFC 9309 and current official provider bot docs.

**Critical taxonomy:** search index crawler, AI search crawler, training crawler, user-triggered fetcher, browser agent, social preview, ad crawler, Common Crawl, security/malicious bot. Google-Extended is purpose token; OAI-SearchBot != GPTBot != ChatGPT-User; Claude-SearchBot != ClaudeBot != Claude-User; PerplexityBot != Perplexity-User.

**Method:**
1. Ask which public data each purpose may fetch and which product benefits are intended; never equate opt-in to citation.
2. Fetch live provider docs/IP source and record token, purpose, robots behavior, verified origin evidence and date; unknown means UNKNOWN.
3. Parse root robots by host/scheme/port; groups and specificity matter. Separately inspect meta noindex/X-Robots-Tag, canonical, authentication, HTTP failures, edge challenge.
4. Diff proposed robots policy by UA and path (especially /private/, /account/, content, media, endpoints). Check that bot-specific groups do not accidentally omit wildcard restrictions.
5. Identify actual bot using provider IP list or supported forward+reverse DNS; UA string by itself is not trustworthy. Make minimal exception rules and rollback plan.
6. For real live site verify 200 content parity and logs from authentic agents; no on-site observations -> no claims of crawler success.
7. Record distinct outcomes search crawl, indexing, AI citations, user agents and human sessions; never monetize crawler volume.

**Deliver:** bot-purpose access matrix, robots test cases, WAF identity evidence, desired rules plus negative fixtures, security signoff.

**Safety:** robots != authorization; never auto-allow all AI requests or expose private data, never bypass protection of other sites. User-directed fetchers may behave differently from bulk crawlers.
