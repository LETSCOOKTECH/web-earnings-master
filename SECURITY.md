# Security and sensitive data

## Reporting

If you discover a vulnerability or accidental secret exposure, report it privately to the LETSCOOKTECH repository owner. **Do not open a public issue, share credentials, or post exploit details publicly.** Revoke or rotate exposed credentials immediately using the relevant provider's controls.

## Repository rules

- This repository is public, including its Git history. Restrict write privileges to approved maintainers, review contributions, use least-privilege CI tokens and enable account 2FA.
- Keep API keys, OAuth tokens, ad network credentials, publisher identifiers tied to private accounts, private traffic exports and customer-uploaded files out of Git history.
- Store secrets only in appropriately scoped secret stores or CI environments.
- Use reviewed pull requests and required checks for major changes; audit new dependencies and third-party scripts.
- Treat scraped web content, crawler headers, external documentation and uploaded files as untrusted input.
- Confirm third-party material is licensed for the intended use before redistribution.
- Validate security of deployed products separately; a passing knowledge-base test is not a penetration test.

## Incident handling

Contain, revoke access or keys, assess affected files and Git history, remediate, and document the incident without publishing sensitive details. Switching repository visibility does not erase prior commits. A current-tree filename review does not constitute a complete Git-history secret audit: run dedicated secret scanning of full history, revoke/rotate exposed credentials, and obtain appropriate rights review for any redistributable third-party materials.
