# V29 pre-change dependency map — historical baseline

Baseline source branch: fix/v28-publisher-release-guards, commit e6df67b5454eef6b0324c95917c4ffcdb1d7b09e. GitHub Actions reported full npm test 783/783 PASS; public-agent PASS; browser PASS. These results are historical baseline, not current V29 proof.

| Component | Existing source of truth | V29 permitted action |
| --- | --- | --- |
| Active skills and registry | sources/skill-network-v23.json; .agents/skills/*/SKILL.md | Append a scoped section only; optional V29 companion stored outside active registry |
| Public agent readability | AGENTS.md, SKILLS.md, docs/AGENT_ACCESS.md, scripts/check-public-agent-access-v27.mjs | Keep V13 at beginning of AGENTS.md, preserve 50 public numbered entries |
| Original demand gate | scripts/evaluate-tool-opportunity-v22.mjs, scripts/hunt-web-tools-v25.mjs | Add optional separate manually sourced evidence validator; never turn synthetic into proven demand |
| V21 CSV Studio | examples/seo-csv-lab/site/assets/tool.mjs and csv-core.mjs, tests/premium-csv-contract-v21.test.mjs | Preserve its existing 2 MB / 5,000-row regression boundary |
| V22 Astro JSONL Studio | examples/astro-jsonl-studio, scripts/scaffold-astro-tool-v22.mjs | Copy a pinned Astro 7 build/test toolchain only; no modification of original sample |
| SEO/robots/crawlers | scripts/audit-static-site.mjs, scripts/audit-live-site.mjs, scripts/publisher-indexability-v28.mjs | Keep V28 guards; add new build-only V29 asset and output-mutation gate |
| Cloudflare/static cost modeling | .agents/skills/web-astro-engineering/SKILL.md, scripts/model-tool-economics.mjs | New dist size gate 24 MiB internal margin, not a claim of forever-free hosting |
| SEO, AI and adsense | .agents/skills/web-technical-seo, web-ai-discovery, web-adsense-readiness | Append factual scoped guidance; preserve owner-account and live domain verification |

New V29 code must not delete or weaken legacy V1–V28 tests, SKILL.md bodies, sources/verified_claims.json or release source gates. Automatic tests are necessary but cannot establish marketplace demand, indexing, revenue, native device performance or external provider behavior.
