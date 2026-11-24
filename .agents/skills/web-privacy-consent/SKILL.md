---
name: web-privacy-consent
description: "Design appropriate privacy, cookie, file-processing and ad-consent flows for utility sites across relevant jurisdictions and networks; flag legal review needs."
---

# Privacy Consent

**Use when:** Design appropriate privacy, cookie, file-processing and ad-consent flows for utility sites across relevant jurisdictions and networks; flag legal review needs.

**Workflow contract:** Follow the next steps proportionally to the request. Prefer current primary sources to saved claims. Adapt the sequence when evidence suggests a better route; do not overbuild a minor task. Show exact verification, uncertainty, and safety boundaries. Read `AGENTS.md` and the matching `references/` files when carrying out substantial work.

## Privacy-by-design workflow
1. Draw a data map: site requests, files, temporary blobs, browsers, workers, local storage, analytics, ad scripts, cookies, fingerprints, logs and optional cloud processing. Record recipient, purpose, retention, security controls and whether consent or another lawful basis is needed.
2. Keep user input and output local when viable. If file upload/server processing is required, enforce limits, malware safeguards, deletion controls, encryption where applicable, secure storage, breach response and retention; do not claim private if third-party scripts may observe input or metadata.
3. State accurate privacy, cookie, terms, contact and optional deletion/DSR details. Do not paste a generic policy claiming practices the site doesn't implement. Review current local laws (GDPR, UK GDPR, Swiss, US state laws, India DPDP applicability etc.) with professional advice where needed.
4. For Google ads in EEA/UK/Switzerland, check current Google-certified CMP with IAB TCF obligation and integration (current version may evolve). Consent signals should precede applicable ad/analytics storage, refusal must be respected and preferences changeable.
5. Review each ad provider's privacy and cookie requirements separately, including service workers, push notifications and vendor lists; disabling personalized ads does not necessarily remove all consent requirements.
6. Implement user rights/support process, children's content rules when applicable, cross-border data transfer assessments and security/retention testing.
7. Test real location-specific journeys including accept/reject/revoke, ad tags, analytics requests, no-consent behavior, accessibility and errors.

## Output
`templates/privacy-data-map.csv`, `templates/consent-test-matrix.md`, a site-specific privacy-policy requirements doc and open legal questions. This skill is not legal advice; don't declare compliance without jurisdiction- and deployment-specific review.

## V2.3 production evidence contract (audited 2026-11-23)
**Owner:** Jurisdiction-specific data processing, consent and privacy. **Routing:** web-security-performance implements enforcement; this owns obligations.
**Official source entry points requiring action-time reopening:** https://commission.europa.eu/law/law-topic/data-protection_en;https://support.google.com/adsense/answer/13554116. A saved link is not confirmation of the current provider rule.
**Evidence needed:** Real data map, legal review, accept/reject/revoke and no-consent request tests.
**Critical FAIL / UNKNOWN:** Cannot self-certify legality or claim local-only without testing third-party scripts.
**Mandatory freshness procedure:** Read docs/foundations/19-provider-source-verification.md and docs/RESEARCH_PROTOCOL.md. Re-open official body, log exact applicable claim, evidence date, announced versus effective status, geography/account and contradiction. Use sources/verified_claims.json only as a dated baseline; source watch hashes are not semantic verification. Record tests/actual results, open blockers and rollback; do not infer live indexing, AI citations or AdSense revenue from local tests.

## November 2026 privacy update
https://support.google.com/adsense/answer/18818765?hl=en
Google announced GPC-triggered RDP for Louisiana and Vermont ad requests starting on or after November 17 2026, ahead of state provisions on or after January 1 2027. Test regional GPC handling, actual ad request behavior and consent separately; do not infer legal compliance or remove publisher obligations.
