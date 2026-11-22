# Private repository security and publication

This library is intended to be PRIVATE under LETSCOOKTECH. Never publish site analytics exports, monetization account credentials, policy review screenshots containing publisher IDs, unredacted HTTP logs, user-uploaded files or user-specific search analytics.

## Controls
- Require 2FA on GitHub account and least-privilege collaborators.
- Add branch protection and required workflow checks once published.
- Use GitHub secrets for optional API keys; never commit `.env` or ad verification tokens.
- Re-check repository visibility after publication and when adjusting permissions.
- For future changes, review external third-party templates before executing.
- Never turn `robots.txt` into an access control for private content.

## Publication
`bash scripts/publish-private.sh` creates a **new private GitHub repo** using authenticated GitHub CLI and confirms visibility. Script refuses to overwrite an existing repository. GitHub-side creation has not been executed within the generation environment.
