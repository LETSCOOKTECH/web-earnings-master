# Sense JSONL Studio — actual Astro 7 tool starter (local, not deployed)

This is a real, independent Astro example with an actual browser-only JSON Lines validator. It is **not** a live hosted website, a verified SEO ranking, or an AdSense publisher property.

## Clean installation and verification

Requires Node.js satisfying the pinned Astro 7 requirements: Node 22.23.5+, 24.22.3+ or 26.13.1+.

```bash
cd examples/astro-jsonl-studio
npm ci
npm run check
npm run build
npm test
npx playwright install --with-deps chromium firefox webkit
npm run test:browser
npm run preview
```

Then open the localhost URL printed by Astro preview. Dependencies and lockfile originated from Croftweaver's MIT-licensed starter; see [third-party notices](THIRD_PARTY_NOTICES.md). The tool code and layout were authored specifically for Sense.

## Exact functionality

Paste or choose a UTF-8 file with one JSON value on each nonblank line, up to 2MB and 5,000 lines. The tool validates with a module Worker, reports exact failing line numbers, presents a safe text-only preview, refuses to export a partially invalid file, preserves original numeric lexemes to avoid precision loss, and downloads valid normalized line-separated output. Source switching invalidates a previous export and resets the UI. Limits are deliberate; it is not an XLSX converter, schema validator, cloud file store, or guaranteed mobile compatibility.

## SEO and release truth

The default SITE_URL is `https://jsonl-studio.example.org` solely to test canonical and sitemap generation; it is IANA documentation space and **does not exist as a publicly deployed tool**. Test builds contain `noindex,follow` and robots `Disallow: /` to prevent accidental misrepresentation. Production intent requires:

```bash
SITE_URL=https://YOUR_ACTUAL_OWNED_DOMAIN SENSE_RELEASE=public npm run build
```

The build validates origin syntax but **cannot** verify domain ownership, public DNS/TLS, deployment, GSC indexing, AI citations or revenue. An authorized owner must deploy externally and independently check actual HTTP, canonical, sitemap, robots, browser task, security/consent and rollback. No fake production claim is permitted.

## Sources, design and known issues

[Astro install](https://docs.astro.build/en/install-and-setup/); [Astro rendering](https://docs.astro.build/en/basics/rendering-modes/); [JSON Lines](https://jsonlines.org/); [MDN TextDecoder](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder/TextDecoder); [Google Search helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content); [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

The source parser checks JSON syntax, not the semantic validity of your records. Its exported values are not reserialized. Empty lines are discarded; it does not repair invalid data. No backend, tracking, user accounts or ads. Browser-level and user-study outcomes are distinct from local CI.
