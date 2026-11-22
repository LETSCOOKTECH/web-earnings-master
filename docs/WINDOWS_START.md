# Windows setup, GitHub publication and Codex reuse

1. Extract `web-earnings-master` ZIP somewhere outside your website codebase. Review the content before publishing to your private repository. Never commit passwords, ad keys, Google OAuth credentials or private user datasets.
2. Install Git and GitHub CLI (`gh`) if not available. Open PowerShell in the extracted repository folder. Run `gh auth login` and choose your LETSCOOKTECH account.
3. Validate (Node.js 20+): `npm test`. Optional `node scripts/verify-source-links.mjs --limit 12` needs network and can fail on anti-bot sites.
4. Run `./scripts/publish-private.ps1` in PowerShell, or `bash scripts/publish-private.sh` from Git Bash. If execution policies block `.ps1`, do not bypass security globally; use Git Bash or run the equivalent `gh repo create` commands manually.
5. Verify `gh repo view LETSCOOKTECH/web-earnings-master --json visibility --jq .visibility` prints `PRIVATE`. Do not change visibility unless you intentionally choose to publish the methods and have redacted proprietary research.
6. For a Codex session in another repo, make the skills available there via a documented clone/copy or equivalent supported Codex skill installation. Copy `.agents/skills` as well as necessary referenced `references/`, `sources/`, `templates/`, `scripts/` and `docs/` to preserve relative paths, or instruct Codex explicitly to open this private companion repo and cite its files.
7. Example prompt: `Read the Web Earnings Master AGENTS.md and the web-technical-seo, web-ai-discovery and web-adsense-readiness skills from my private repository. Audit this actual production Astro website and run the applicable tests. Reverify current Google policies; do not claim approved/ranked unless proven.`
8. Keep this master repo version-controlled; use pull requests for rule/source updates. Record official policy change date, evidence and why it affects deployed sites; do not continuously change websites without a real reason.

The package does **not** include a live AdSense account, active Google Search Console property, connected Semrush subscription, actual publisher account data, or automatic GitHub repository creation. Those require user/provider authorization.
