---
name: web-browser-compute
description: "Build reliable client-side converters, calculators, PDF/image/media tools and WebAssembly/WebCodecs pipelines with mobile memory, battery, privacy, compatibility and output correctness gates."
---

# Browser compute — local-first engines that really work

**Trigger:** Client-side compression/conversion, WASM, Web Workers, WebCodecs/WebGPU, PDF/image manipulation, OPFS, offline processing or low-cost client-side workflows.

**Owner & routing:** Own the actual browser execution pipeline and device fallback. web-workload-architecture-router selects placement; web-product-validation owns independent output oracles; web-security-performance owns threat controls.

**Evidence contract:** Date-stamp all cost/provider claims; use official current docs before real deployments. A forecast, architecture diagram or test fixture does not prove 1M MAU capacity or production profitability. Unknown-priced inputs cannot be treated as zero.

## Complete operational workflow
1. Inventory formats/encoders/decoders and licenses: native Canvas/WebCodecs support, alpha/metadata/ICC/EXIF, local JS, maintained WASM libraries, HEIC/AVIF/WebP support, PDF password/signature requirements, codec patents and regional browser restrictions.
2. Do not put large files in the main-thread JS heap or block UI. Stream Blob/File data in chunks when codecs permit, dedicate Web Workers, transfer ArrayBuffers where supported, size memory based on actual p95 peaks and enforce byte, pixel, frame, page and nesting ceilings.
3. Choose native browser APIs before shipping huge WASM for operations they handle reliably. Benchmark real output, CPU time, peak RAM, bundle bytes, worker initialization, battery impact, and quality on low-end Android and iOS Safari; no framework decision substitutes for performance data.
4. Detect feature capability and memory/quota limits at runtime; show truthful 'browser local unavailable' before opening user files. For optional cloud fallback ask informed user approval and disclose where files are stored and how long they remain.
5. Use worker-scoped OPFS only when beneficial (large temporary data/resume), track quota/eviction/storage persistence, cleanup after complete/cancel/crash, and never treat origin private as an encrypted user-controlled file vault.
6. Implement typed file signatures, MIME/content validation, decompression-bomb protections, robust parse errors, lifecycle events, progress stages and AbortController/cancel semantics. Max parallel jobs adapt to memory; test 1–N simultaneous tasks.
7. Build a benchmark fixture corpus with rights-cleared PNG transparency and color profiles, EXIF orientation, HEIC, AVIF, animated image, SVG sanitization, scanned/text PDFs, MP4 variable-frame-rate and audio codecs; enforce exact output decoder and semantics per format, not just filename extension.
8. Instrument privacy via network interception: file bytes and sensitive metadata never leave without explicit consent. Audit analytics, crash capture, ad scripts, error logging and remote fallback; honor consent and third-party software licensing.
9. Set device-specific budget gates and graceful downgrade: reduced resolution/frame count, capped batch size, slow CPU budget, emergency cancel, resume/warning, remote processing only with user consent; never silently generate degraded/corrupt content.
10. Test in Chromium/Firefox/WebKit plus real low-RAM devices. Mobile Safari limits, codecs and quota differ; a Playwright desktop WebKit run is not actual iPhone proof.
11. Use real-user task completion, conversion time distribution, output correctness, memory failures and retry/no-upload validation to decide what stays local or shifts to cloud.

## Release blockers — FAIL or UNKNOWN
- Browser-local processing is zero *server conversion CPU* only when the network test proves local work; other hosting and support costs remain.
- WebGPU and WebCodecs depend on browser, OS, hardware and implementation, not every browser supports every codec.
- Web Worker off-main-thread operation still consumes user CPU/RAM/battery.
- OPFS may be evicted or quota-limited; never promise permanent storage without evidence.
- Never claim complete format support based solely on one browser feature check.

## Primary-source URLs (reopen at action time)
- https://web.dev/articles/webassembly-performance-patterns-for-web-apps
- https://web.dev/case-studies/ai-video-upscaler-case-study
- https://developer.mozilla.org/en-US/docs/Web/API/File_System_API
- https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria
- https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas

## References and executable evidence
- `docs/architecture/02-client-and-media-pipelines.md`
- `docs/architecture/04-scale-and-product-quality.md`
- `templates/architecture/tool-design-input.example.json`

**Required handoff:** ADR with tradeoffs, real file-output fixture evidence, provider limits, measured p50/p95 behavior where available, budget matrix, proof of cost guardrails and rollback. If untested, explicitly say NOT_RUN; if infrastructure/account unavailable, UNKNOWN_EXTERNAL. No fixed universal vendor winner.


## V21 concrete browser-local compute reference: CSV Studio
Use docs/quality/21-premium-csv-studio-acceptance.md as a runnable acceptance standard rather than relying only on conceptual "WASM versus Worker" summaries. The concrete implementation at examples/seo-csv-lab/site/assets/csv-core.mjs limits 2,000,000 input bytes, 5,000 rows and 200 columns; csv-worker.mjs executes a deterministic parser and first-key dedupe. The module Worker keeps the main page responsive; it does NOT reduce total data memory to constant space or guarantee safety on every low-end device. Runtime script tool.mjs creates a fresh Worker for each request, validates selected file bytes using TextDecoder('utf-8',{fatal:true}), cancels with terminate(), revokes stale Blob URLs and returns actual downloadable output.

Test actual quoted comma/newline parsing, Unicode, malformed quotes, invalid UTF-8, matching by full row versus specified numeric column, forbidden column numbers, formula-like values, input-size ceilings and cancellation while active. An actual output oracle must assert the CSV bytes (including CRLF and selected spreadsheet guard), never only "Worker initialized" or button click. Check Browser Worker support in Chromium, Firefox, WebKit and real mobile before making compatibility claims. Reference the WHATWG Encoding Standard https://encoding.spec.whatwg.org/ , MDN Worker https://developer.mozilla.org/en-US/docs/Web/API/Worker and OWASP CSV Injection https://owasp.org/www-community/attacks/CSV_Injection . The app deliberately uses no server backend; choose one only if the human job exceeds the local size/device/privacy envelope, with consent and quotas.
