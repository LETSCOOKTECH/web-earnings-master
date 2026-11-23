# Production security assurance — ASVS 5.0, OWASP Top 10:2025, API Top 10:2023
**Reviewed 2026-11-23. Owner:** `web-security-assurance-asvs`. This is a control-selection and testing plan, not an OWASP certification.

## Trust model
A public utility website hosts both trusted site-owned JavaScript and untrusted user-controlled inputs (files, URLs, text, images, remote content), and may include third-party advertisement/analytics code with broad browser execution privilege. Threats include data disclosure, malicious SVG/PDF parsing, image pixel bombs, SSRF, file path traversal, ZIP/XML expansion, bot-triggered paid API/CPU consumption, cross-tenant auth failures, supply-chain compromise, ad click fraud, privacy violations and stale retained file content. Each path requires independent evidence.

First-party standards:
https://asvs.owasp.org/ (ASVS 5.0.0);
https://top10.owasp.org/2025/0x00_2025-Introduction/ ;
https://api-security.owasp.org/editions/2023/en/0x11-t10/ ;
https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html .

## Explicit security control taxonomy
| Domain | Required practical controls | Fail-injection evidence |
|---|---|---|
| Auth/session/tenant | Least privilege, MFA for admin, session rotation, secure HttpOnly/SameSite cookies, CSRF protection | User A accesses User B's job/download, duplicate tokens, unsafe CORS |
| Request/data validation | Schema and type checks at trusted server, bounds, output encoding, prepared SQL, no shell concatenation | malformed JSON, SQL/HTML/template injection, arbitrary redirects |
| Uploaded content | Limit size/page/pixels/frames/expansion, magic bytes, isolated parser, antivirus where needed, sandbox | disguised executable, XSS SVG, 100KB zip bomb, malicious PDF |
| Remote URL fetch | Allowlisted approved domain or robust SSRF network egress control, block metadata/private networks & redirects, timeouts | localhost, link-local, private v4/v6, DNS rebinding, auth endpoint fetch |
| Cloud jobs and cost | CPU/RAM/time caps, credits and global hard spend, queue max/TTL, retries, idempotency, cancel | 100× automated uploads, worker crash, duplicate refund/payment, pay-per-call denial-of-wallet |
| Browser scripts | CSP nonce/hash where viable, Trusted Types compatibility, no inline untrusted HTML, iframe/ad sandbox strategy | encoded XSS, malicious SVG, third-party ad CSP/CORS failures |
| Transport and storage | TLS, HSTS staged, secure file URLs, object private by default, encryption/secrets, expiry and deletion proof | leaked signed URL in logs, stale object and backup, wrong MIME/nosniff |
| Supply chain | Commit lockfiles, CI dependency audit and advisories, pin untrusted actions, license review/SBOM, secret scan | infected dependency, exposed environment secret, outdated vulnerable PDF lib |
| Observability and privacy | No raw file names/contents in ads, telemetry or traces, minimal PII/retention, alerting and access audit | network data exfiltration of uploaded content, missing deletion audit |

### Runtime boundaries
CSP should be strict where possible, but ad scripts may require vetted policy allowances; don't relax to wildcards by default. Cross-origin isolation (COOP/COEP) necessary for some multi-threaded WASM can interfere with ad integrations. Choose single-threaded WASM in worker or an ad-free isolated route/domain where appropriate, with actual browser and publisher tag tests.
Avoid claiming every iOS Safari tab can process 350MB RAM: device memory varies, so benchmark real cohorts.
OWASP file handling must cover MIME/content sniffing, path traversal, ZIP/XML bombs, SVG script, malformed pixels/pages and LLM prompt injection if content is fed to models. Handle files in minimal-privilege containers when not browser local.

## ASVS evidence levels
- **Scoped design:** selected ASVS controls and threat model; not a test.
- **Local tested:** unit/integration request-fuzz/authorization tests with captured logs and build hash.
- **Staging tested:** real storage/auth/queue, malicious input oracle and legal load with resource limits.
- **Independent reviewed:** manual penetration/external security assessment proportional to risk.
- **Production observed:** permitted telemetry and incidents, account-specific risk review.

Missing stages remain NOT_RUN/UNKNOWN. A structural manifest validator cannot certify that code lacks XSS or broken access control.

## Security release checklist
1. Public/anonymous endpoints have clear permissions and bounded request/compute cost.
2. Paid/file endpoints require authorization/quotas; no user-controlled storage key or open URL proxy.
3. Uploaded file content is validated by actual decoder before use; output and download headers safe.
4. No secrets in frontend bundle, repo, error logs or ad targeting data; backup encryption and rotation verified.
5. CSP/Trusted Types/COEP tested with the actual chosen ad/CMP vendor.
6. Dependency security scans are version-pinned and reviewed at release; do not hardcode one PDF version forever.
7. Database migrations have backups, dual-write/rollback handling when needed and integrity tests.
8. Security alerts and circuit breakers cover authorization anomalies, SSRF and expense spikes.
9. User has documented deletion/retention/consent and real request flow confirms promises.
10. Document ASVS controls tested, exemptions with reasons, residual risk, signoff and follow-up.
