---
name: sense-ads-monetization
description: Prepare ad-supported utility sites for Google AdSense review and optional Monetag or other ad partners while preserving privacy and usability.
---


# Monetization and policy gate

## Mandatory Google AdSense checks
- Publisher owns/controls site and meets account age/payee/identity requirements. Property publicly reviewable; site added and status **Ready** before serving AdSense ads.
- Original, useful publisher content, working navigation and functional tools. No reproduced, scraped, thin, blank or ad-dominated screens.
- Respect program/publisher policies, copyrighted content, malicious software and invalid traffic; never induce clicks, fake traffic or tamper with ad code.
- Clear separation between ads and Upload/Convert/Download/navigation buttons. No misleading ad/redirect, popunder format, automated reloads or accidental-click traps.
- Accurate privacy/cookie advertising disclosure; EEA/UK/Switzerland certified CMP with IAB TCF when applicable. Additional regional legal requirements assessed. Configure consent before deploying nonessential ad/analytics scripts.
- Add correct `ads.txt` seller identifiers supplied by actual provider after verifying; avoid fake IDs and unauthorized entries. `ads.txt` is recommended and materially important for authorized selling, not an invented 30-post approval prerequisite.

## Monetag and other networks
- Monetag's current setup: publisher account, add and verify site, choose format, integrate supplied tags; terms and minimums depend on provider. Formats are *not* automatically AdSense-compatible. **Do not use OnClick/popunder or forced redirects on our properties.** Review provider's own compatibility guidance and Google's rules prior to any co-serving.
- Other ad networks (Raptive, Journey by Mediavine, Media.net, Ezoic, Adsterra, PropellerAds) are optional. Confirm live ownership, minimums, country/payment rules, approval, contract exclusivity, inventory policy, privacy and acceptable traffic directly. **Do not copy expired threshold values.**
- Keep a network switch/config so ads can be removed without changing core tools; avoid running experimental formats during AdSense review.
- Browser CSP, third-party scripts, layout shift, accessibility and data-sharing implications must be tested.

## Gate and economics
Use `references/adsense-policy.md`, `references/monetag-and-networks.md`, `references/privacy-consent.md`. Produce site-specific audit and screenshots; mark requirements actual provider-MUST vs internal-SHOULD. Page RPM (not keyword CPC) x real pageviews, less all costs, determines profits. Prioritize legitimate human traffic.

