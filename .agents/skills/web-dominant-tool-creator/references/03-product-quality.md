# Functional, accessible, secure and independently verified utility quality

## One real task must succeed
Define input fixture and expected exact output BEFORE implementation. Use independent oracles: exact CSV/JSONL saved bytes, mathematical identity/rounding tests, decoded image dimensions, provider-authorized API response with authenticated source. Reject fake download buttons and screenshots without task completion.

**Normal + adversarial + malformed:** a supported file; invalid UTF8 bytes and malformed quotes/JSON; maximum input and one byte above; HTML-looking injected cell displayed via textContent; formula-leading spreadsheet cells (OWASP mitigations client-specific); intentionally broken JS/Worker; stale download after input change; cancel a slow job before reply. Keep 2MB/5000-line limits in the actual JSONL starter and verify on actual target devices before broad speed claims. JSONL starter preserves numeric lexemes instead of JSON.parse→JSON.stringify numeric precision loss.

## Real browser, UX and WCAG
Semantic form labels, fieldset for related options, visible focus, live text errors, language, reflow, keyboard-only task, reduced-motion, small touch targets, useful no-JS explanation. Review 3-engine Playwright desktop/mobile viewport results and screenshots. Headless WebKit ≠ a real iPhone. WCAG 2.2 (https://www.w3.org/TR/WCAG22/) requires actual functional reviews for specific criteria; don't certify AA from a happy-path test. Keep styling disciplined and accessible, not random giant gradients/pills.

## Trust/security
OWASP ASVS https://asvs.owasp.org/ supplies controls but not penetration-test proof. Trace untrusted data from input to parser, Worker, DOM and downloaded file. Never feed untrusted strings to innerHTML/eval. For server APIs check resource authorization, SSRF, abuse quotas, CSRF, sessions, secrets, payment and legal consent. No analytics network by default on sensitive file utilities unless disclosed and authorized. Browser local parsing avoids custody but doesn't prove absolute privacy in compromised browsers/extensions.

## Proof matrix
LOCAL_HTTP_VERIFIED: compile and serve the actual program; user completes exact task and negative error cases.
BUILD_ONLY_NOT_DEPLOYED: generated assets/metadata for an intended owner domain. No DNS/TLS assumed.
EXTERNAL_HTTP_OBSERVED: authorized external DNS/TLS, real HTML/scripts/worker, headers/redirects/404, version SHA and independent browser action.
EXTERNAL_BUSINESS_OUTCOMES: real owner GSC/Bing, provider AI citation captures, publisher account and human paid/organic traffic (not synthetic).
Do not merge all into a generic "production ready" badge. Every unknown must be explicitly named.

## Blind skill evaluation
For confidence in generalized agent skills, run 5 unseen project tasks with baseline agent and skill-guided agent, independent exact outputs/security and blind UI review. Report cost, rework, verification failures and actual time. Until this is performed, "100× improvement" is a marketing claim without measurement.
