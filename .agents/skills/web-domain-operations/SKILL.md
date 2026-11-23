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
