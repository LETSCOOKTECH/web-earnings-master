# V22 open-source skill integration and copyright/licensing scope

**Do not bulk-import every public skill.** A GitHub repo with a skill file is an untrusted instruction source, not a validated agent capability. Analyze tests/claims, keep the relevant methods, implement independently for Sense, and preserve copyright conditions on substantial copied content. Inspect per-file notices and dependency transitive licenses at import time.

| Project | Known license at research date | Distinct technique used | Scope and caveat |
| --- | --- | --- | --- |
| [Croftweaver](https://github.com/karero/croftweaver) | MIT; its THIRD-PARTY-LICENSES.md identifies other upstream marketing sources | Stage orchestrator, first real customer research before build, layered QA vs live launch, Astro 7 pinned manifest/lockfile | MIT dependency lock/manifest adapted under examples/astro-jsonl-studio/THIRD_PARTY_NOTICES.md; no 70KB upstream orchestrator copied or default cloud deployment |
| [Methedrone Astro Skills](https://github.com/Methedrone/astro-skills) | Apache-2.0 | Composable Astro architecture/rendering/security decision prompts, version-sensitive official docs | No wholesale skill text copied; prior Astro 7.2 tests not equivalent to current Astro 7.4 |
| [AgriciDaniel claude-seo](https://github.com/AgriciDaniel/claude-seo) | MIT | Scoped audit methods, evidence collection, priority findings, provider integrations only when authorized | No SEO scoring weights or scripts imported automatically |
| [Bhanunamikaze Agentic-SEO-Skill](https://github.com/Bhanunamikaze/Agentic-SEO-Skill) | MIT | Reproducible audit signals instead of narrative-only advice | No market/rank promises from scripts |
| [SE Ranking SEO Skills](https://github.com/seranking/seo-skills) | MIT | Research data evidence and user-level experiments | Paid connected data cannot be silently assumed |
| [Vercel Agent Skills](https://github.com/vercel-labs/agent-skills) | Inspect root/per-file before copying | Frontend performance and accessibility heuristics | Avoid Next.js-only assumptions in Astro |
| [Illyism SEO Skills](https://github.com/Illyism/seo-skills) | Must verify the license before reuse | Research/reference only | No source files imported |
| [Agent Skills spec](https://agentskills.io/specification) | Specification/reference | Progressive loading via portable SKILL.md frontmatter and owned references | Specification compliance doesn't imply successful agent output |

The Astro starter lockfile contains third-party packages with independent licenses and potential vulnerabilities. The upstream manifest was kept aligned with its pinned lockfile; run npm ci, version-specific build, vulnerability review and actual browser QA. For any copied substantial work retain actual license and copyright text, check the latest tag/commit and audit embedded instructions. A new high-quality product often benefits more from _fewer tested components_ than hundreds of unreviewed prompt templates.

**Critical difference:** learned ideas are not redistributable source code. We adapted workflow patterns, not every source's copyrighted skill prose. Separate official documentation statements from experimental SEO claims and proprietary-system speculation.
