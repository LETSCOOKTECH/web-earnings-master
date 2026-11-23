# 02 — Domain registration, DNS, TLDs, ownership and migrations

## Distinguish names from hosting
A domain registration is a contractual right to use a delegated label for a term. Registry administers TLD database; registrar sells registration; registrant holds rights subject to policies; registries publish eligibility/transfer/renewal rules. DNS is a distributed naming system; DNS hosting, domain registrar, CDN and origin hosting are often different vendors. Do not describe a domain purchase as perpetual ownership.

## TLD system
IANA root database has delegated categories; generic TLD examples .com, .net, .org, .dev, .app, .tools, .xyz; country-code examples .in, .de, .uk, .jp, .us. Some country codes such as .ai have gained broad generic adoption; Google's handling of generic country-code domains has an engine-specific list subject to update. Sponsored/restricted domains (.edu/.gov and others) require eligibility; brand TLDs are not public bargain domains. Internationalized domain names encode DNS form using IDNA/Punycode; consider homograph and trademark risk. Public Suffix List governs eTLD+1 assumptions and some browser cookie/site classification, not registrability for every provider.

## DNS zone data and control plane
At the registrar: nameservers, transfer lock, MFA, contact and renewal. At DNS host: SOA, NS, A/AAAA, CNAME, MX, TXT, CAA, SPF/DKIM/DMARC TXT for mail, DS/DNSKEY for DNSSEC where deployed, HTTPS/SVCB hints; wildcard and apex ALIAS/ANAME solutions differ by DNS host. NS delegation must match authoritative zone. Monitor TTL, negative caching and IPv4/IPv6; verify DNSSEC chain if enabled. Do not copy private zone exports containing keys into public repos.

## Search implications
No documented universal Google .com bonus. Geo signals depend on query, language, regional intent and some ccTLD handling. Google's exact-match domain systems avoid disproportionate credit to keyword domains. Domain age is not guaranteed ranking power; redirecting expired domains for manipulation can violate expired-domain abuse. Branding, shortness, word-of-mouth, spam history, accessibility and renewal predictability can matter materially to human conversion, independent of raw algorithm. Site migration requires URL mappings, valid permanent redirects, canonical link consistency, link updates, verified GSC properties and careful rollback.

## Investigate before buying
(1) Search user jobs and target countries before choosing brand. (2) Check country-specific registration, second-year renewal, restoration and transfer fees, restrictions, trademark databases, WHOIS/RDAP status, old backlinks and Wayback footprint. (3) Check registrar 2FA, DNSSEC, expiry/auto-renew, backup owner contact. (4) Test redirects on planned host, TLS chain, private staging, robots/sitemap and analytics ownership. (5) Prewrite emergency registrar recovery plan. Domain-specific availability and prices are UNKNOWN until checked against a registrar today.

## Experiments
- Nameserver wrong: A at old provider exists but authoritative lookup disagrees. Verify with dig +trace and authority.
- Mixed AAAA failure: IPv4 fine, IPv6 returns wrong origin. Test both.
- Canonical migration: old host 200 duplicates new host rather than redirect; track Google-selected canonical after observed crawl.
- Caching: DNS answers appear inconsistent due to recursive resolver TTL; distinguish from true delegation misconfiguration.
- Wrong ccTLD inference: look up Google international targeting documentation before claiming country restriction.

## Evidence artifact
Domain option table: TLD, legal eligibility, year-1/renewal/transfer/redemption quotes with checked dates and providers, legal brand check, historical reputation, crawl constraints, country targeting evidence, recommendation and rollback.

## First-party sources
IANA root: https://www.iana.org/domains/root/db (opened 2026-11-23)
ICANN registration: https://www.icann.org/resources/pages/domain-name-registration-process-2023-11-02-en.html (opened 2026-11-23)
Google multi-regional: https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites (opened 2026-11-23)
Google ranking systems: https://developers.google.com/search/docs/appearance/ranking-systems-guide (opened 2026-11-23)
Public Suffix List: https://publicsuffix.org/list/ (pointer: check live)
