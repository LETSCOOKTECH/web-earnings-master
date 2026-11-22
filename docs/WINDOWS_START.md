# Windows setup, private GitHub access and Codex reuse

The canonical private repository is `https://github.com/LETSCOOKTECH/web-earnings-master`. Do not attempt to create another repository with the legacy publication scripts.

1. Install Git, GitHub CLI (`gh`), and Node.js 20+ if needed. Authenticate to the LETSCOOKTECH account with `gh auth login`.
2. Clone the existing private repository: `gh repo clone LETSCOOKTECH/web-earnings-master`, then `cd web-earnings-master`.
3. Verify visibility with `gh repo view LETSCOOKTECH/web-earnings-master --json visibility --jq .visibility`; expected value: `PRIVATE`.
4. Run `npm test`. `node scripts/verify-source-links.mjs --limit 12` is optional and needs network access; HTTP availability does not validate policy interpretation.
5. Open this repository as a workspace for Codex. Read `AGENTS.md`, then select only the relevant skills in `.agents/skills/`. Review `docs/START_HERE.md` and `docs/RESEARCH_PROTOCOL.md`.
6. In another website repository, copy the relevant skills **with** their required `references/`, `sources/`, `templates/`, `scripts/` and `docs/`, or explicitly make this private repository available as a companion workspace. A private repository is not automatically loaded into another Codex session.
7. Use feature branches and reviewed pull requests for updates. Record dates and authoritative URLs for provider-policy changes; never assume old research is current.
8. Never commit credentials, unpublished ad or search account records, analytics identifying users, or uploaded user files.

Example task: `Read Web Earnings Master AGENTS.md and the technical SEO, AI discovery, and AdSense skills. Audit my production Astro site, run the relevant checks and reverify official policies. Distinguish verified results from assumptions.`

The repository does not include access to an AdSense account, Search Console property, Semrush subscription, or permission to deploy websites. These are separate per-project connections and authorizations.
