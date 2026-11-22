# Installation and activation

A skill is a directory containing `SKILL.md` with YAML frontmatter `name` and `description`. Codex determines when to use it from the description; it reads the skill file when activated. This repository keeps skills under `.agents/skills/` for project discovery; if a Codex environment doesn't automatically discover a nested folder, copy the relevant skill folders into its recognized skills directory. `AGENTS.md` provides repository-wide constraints.

## Recommended usage
1. Keep this repository private and versioned.
2. Vendor a pinned copy into each site repository (submodule, subtree, or reviewed copy). Don't blindly pull unreviewed changing rules during builds.
3. Put a short site-specific `AGENTS.md` at site root and link to this library's skill paths.
4. Use one skill per stage: research -> audit -> architecture -> QA -> launch. Never invoke all skills for a one-line coding edit.
5. Ask Codex for evidence-led output: commands, paths, test logs, source dates, limitations, unresolved blockers.

### Example prompts
- `Use sense-niche-research to validate exact-intent demand in US, GB, CA, AU and IN. No fabricated keyword metrics.`
- `Use sense-technical-seo and sense-ai-discovery to audit dist/ and my deployed origin; show observed response codes, canonical tags, sitemap, robots and crawl restrictions.`
- `Use sense-ads-monetization for an AdSense-ready review of the current site. Classify actual policies vs internal gates; do not install ad code until verified.`

Useful upstream: https://developers.openai.com/codex/skills and https://developers.openai.com/codex/guides/agents-md

