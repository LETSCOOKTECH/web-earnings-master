---
name: web-domain-operations
description: "Research and audit domain registration, TLD eligibility, DNS delegation, geographic targeting, registrar security and site migrations without inventing ranking boosts."
---

# web-domain-operations

**Trigger:** Domain choice, .com/.net/.org/.in comparison, domain purchase, renewal, TLD, DNS records, registrar changes, redirects or migration.

**Read:** docs/foundations/02-domain-dns-tlds.md, 01-browser-http-runtime.md and 09-source-refresh.md.

**Required inputs:** Candidate domain names, target countries, intended brand/site, registrar quotes and control rights if available. Never assume purchase availability or trademark clearance.

**Workflow:**
1. Separate registrable domain, public suffix, subdomain, origin, DNS host, registrar and web host.
2. Verify TLD class and eligibility against IANA/registry; compare current year-1/renewal/transfer/redemption, DNSSEC/2FA/locks and legal brand risk.
3. Check actual DNS delegation, authoritative answers, TTL, A/AAAA, CNAME, CAA, DS/DNSKEY, HTTPS and email safety. Use traceroute only with authorized networks.
4. If search geography is relevant, reopen Google regional guidance, distinguish domain language/brand from algorithmic geo signals; no .com ranking multiplier.
5. For migrations produce URL map, 301/308 strategy, canonical/sitemap/hreflang updates, Search Console verification, monitoring and rollback; test with real responses.
6. Report UNKNOWN when prices/WHOIS/SERP data weren't obtained. Do not purchase domains or change nameservers without explicit authorization.

**Deliver:** dated domain decision sheet with vendor prices and evidence, DNS architecture diagram, risk register, launch/migration test list. Prove current quotes instead of copying historical estimates.

**Do not:** claim expired domains automatically transfer authority; use deceptive brand lookalikes, use domain age as guaranteed rank, reveal registrar secrets.

## Deep operations extension (v2.2)
Chapter 12 covers DNS delegation and cache, A/AAAA, DNSSEC, QUIC/TLS and edge/host mismatch. Chapter 11 covers origin/site and cookie isolation. Always reproduce authoritative delegation and certificate behavior for current candidate before claiming site health. For site moves explicitly test resolver TTL, both IP families, real 301/308 URL map, canonical, GSC and rollback. Public TLD examples and prices never substitute registrar availability, legal checks or actual invoice quote.


## V20 exact DNS failure diagnostic
In the screenshot case of csv-lab.example.org, check the hostname's registry status FIRST. IANA reserves example.com, example.net and example.org (and subdomains) for documentation, with no supported production web service: https://www.iana.org/help/example-domains . DNS_PROBE_FINISHED_NXDOMAIN here must yield NOT_DEPLOYED, not "clear your browser cache" or "repair your ISP".
For an actually owner-authorized domain distinguish NXDOMAIN (host absent), NOERROR/NODATA (RR type absent), SERVFAIL (DNS infrastructure), stale cached TTL, CNAME chains, IPv4/IPv6 mismatch, certificate/SNI and CDN/origin mismatch. On Windows use Resolve-DnsName hostname -Type A / -Type AAAA, on Unix dig hostname A +noall +answer, dig hostname AAAA +noall +answer. Then inspect real HTTPS status/redirect/body and TLS; a successful DNS answer is not proof that the tool works.
**Release gate:** domain owner rights + authoritative DNS/HTTPS + actual served file version + real 404 + independent browser task + rollback. A test-only canonical and sitemap prove none of those. For GitHub Pages, confirm plan, URL base path and public exposure even when repo is private: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site . See docs/quality/real-world-release-contract-v20.md.
