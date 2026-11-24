# Computer-use permission preflight — mandatory

Opportunity Intelligence agents must perform an **actual runtime capability inspection** and a **provider-specific terms check** before using any interactive computer-control tool on Google Trends, Semrush, Ahrefs, Reddit, Search Console or another site. The local validator is an internal-consistency check, not proof of the truth of the supplied manifest.

## Exact protocol
1. Inspect currently advertised tools: list actual schemas, not assumed products. Record source ACTUAL_TOOL_SCHEMA, tool name, supported read/navigate/click/type/export/download/API operations and inspection time. A read-only connected browser cannot interact with the page.
2. Classify actual mode: NONE / PUBLIC_SEARCH / READ_ONLY_TABS / INTERACTIVE_GUI / OWNED_BROWSER / LICENSED_API. Do not infer capabilities from tool names or user requests.
3. Reopen **original provider policy** at action time and check the requested operation and automation mode. Only set PERMITTED when the exact terms authorize the use. Login, subscriptions and public access are not blanket automated scraping permissions. UNKNOWN and MANUAL_ONLY must HOLD.
4. Confirm user authorization for the research action and account access, exact HTTPS target origin, finite browser/API/cash credits, and absence of private data exposure. Do not use browser automation as a substitute for a prohibited API.
5. Fill `templates/opportunity/computer-use-preflight.example.json` truthfully and run `node scripts/check-computer-use-permission.mjs --file receipt.json --require-eligible`. Default example stays HOLD.
6. If eligible, execute the one scoped action with the **real available tool**, then save a **separate** action result (actual timestamp, screenshot/CSV, search filters and source), or report failure. Preflight NEVER means the action ran.
7. If blocked, use a permitted read-only/public search source, user-exported CSV, licensed API with approved units, or record NO_COMPLIANT_ACCESS. Never solve CAPTCHAs, rotate proxies, bypass paywalls or fabricate metrics.

## Decision matrix
- NONE: no browser control; HOLD GUI action
- READ_ONLY_TABS / PUBLIC_SEARCH: limited read; never click/type/export
- INTERACTIVE_GUI: single visible action only when actual tool, current provider terms, owner approval and budget all permit
- OWNED_BROWSER: automated owned-site testing only; third-party rights need independent permission
- LICENSED_API: explicit API rights, current terms, owner account and paid-unit approval
- Uncertain automation terms: HOLD; hand off manual export
- CAPTCHA/MFA/rate-limit: BLOCK; no bypass
- Posting/payment/login/private uploads/challenge bypass: BLOCK by research preflight

## Evidence must remain honest
The JSON tool receipt is NOT cryptographically signed and cannot verify real browser entitlements or platform policy. Agents must examine their actual runtime tool catalog and original provider text independently. Structural unit tests do not establish a real Google Trends or Semrush session.

Run `npm run audit:computer-use` for the deliberately fail-closed sample and `node --test tests/computer-use-permission.test.mjs` for 28 positive/negative unit tests.
