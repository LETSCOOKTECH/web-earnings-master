# Security and sensitive data

## Reporting

If you discover a vulnerability or accidental secret exposure, report it privately to the LETSCOOKTECH repository owner. **Do not open a public issue, share credentials, or post exploit details publicly.** Revoke or rotate exposed credentials immediately using the relevant provider's controls.

## Repository rules

- Private by default; grant collaborators the least permissions they require and enable account 2FA.
- Keep API keys, OAuth tokens, ad network credentials, publisher identifiers tied to private accounts, private traffic exports and customer-uploaded files out of Git history.
- Store secrets only in appropriately scoped secret stores or CI environments.
- Use reviewed pull requests and required checks for major changes; audit new dependencies and third-party scripts.
- Treat scraped web content, crawler headers, external documentation and uploaded files as untrusted input.
- Confirm third-party material is licensed for the intended use before redistribution.
- Validate security of deployed products separately; a passing knowledge-base test is not a penetration test.

## Incident handling

Contain, revoke access or keys, assess affected files and Git history, remediate, and document the incident without publishing sensitive details. Public repository exposure, if ever proposed, requires an independent secrets and rights review first.
