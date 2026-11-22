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
**Published:** `https://github.com/LETSCOOKTECH/web-earnings-master` is a private repository. The legacy `scripts/publish-private.sh` and `.ps1` scripts are for creating a *new*, not-yet-existing repository; they intentionally refuse to overwrite this existing repository. To work on the live private repository, use `gh repo clone LETSCOOKTECH/web-earnings-master` and ordinary reviewed Git commits/pull requests. Never force-push the main branch to compensate for mismatched local history. Reverify visibility after permissions or repository settings change.
