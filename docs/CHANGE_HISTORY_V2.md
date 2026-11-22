# v1 → v2 upgrade map (2026-11-22)

Previously: 12 Sense ecosystem skills under `.agents/skills/sense-*`, focused on search + monetization. Those manifests are preserved in `archive/v1-sense-skills/` for auditability; they are **not active skills** in v2.

Now: 21 specialized `web-*` skills under `.agents/skills/`. New scope covers complete step-by-step workflows for source verification, keyword/page-intent mapping, measured niche selection, competitor experiments, product specification, Astro production, technical SEO, original content and images, AI/agent retrieval, privacy, AdSense review, third-party ad network selection, ad UI, QA, growth, portfolio economics.

New: 92 official reference URL entries with a dated research registry; 11 curated learning/video resources; Astro tool-page and metadata starter examples; 5 additional automated checks for evidence manifests, ads.txt, robots, page-intent uniqueness, and optional source link health; negative tests to prevent false passes.

**Not yet automated:** validating source *meaning* or country-specific law, real Search Console/AdSense account status, real ranking, organic keyword volume, AI recommendations, live ad fraud or production browser interaction. Codex must verify these from first-party dashboards, the real deployment and current official sources.

Migration mapping:
- `sense-policy-watch` → `web-research-freshness`.
- `sense-niche-research` → `web-niche-validation` + `web-keyword-intent`.
- `sense-competitor-audit` → `web-competitor-audit`.
- `sense-astro-architecture` → `web-astro-engineering` + `web-product-spec`.
- `sense-technical-seo` → `web-technical-seo` + `web-content-and-image-seo`.
- `sense-ai-discovery` → `web-ai-discovery` + `web-accessibility-agent-ux`.
- `sense-content-authority` → `web-authority-distribution`.
- `sense-ads-monetization` → `web-adsense-readiness` + `web-network-monetization` + `web-ad-experience` + `web-privacy-consent`.
- `sense-product-qa` → `web-product-validation` + `web-security-performance`.
- `sense-search-analytics` → `web-search-analytics` + `web-experiments`.
- `sense-launch-gates` → `web-launch-review`.
- `sense-portfolio-review` → `web-portfolio-growth`.

Codex should switch old skill references to new names in consuming projects, not assume an automatic rename.
