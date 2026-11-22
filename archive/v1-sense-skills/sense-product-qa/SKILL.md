---
name: sense-product-qa
description: Verify real image and data utilities for deterministic outputs, accessibility, browser/mobile performance, privacy/security and sustainable cost.
---


# Utility-product quality and security

## Quality dimensions
- Correctness: input sniffing, actual decoded output, dimensions, file signature, alpha/background treatment, EXIF orientation, file size, expected quality/rate; clean handling of impossible targets.
- Robustness: corrupt/truncated inputs, huge images/pixel budgets, large batches, Unicode names, ZIP extraction/validation, worker cancellation, out-of-memory conditions, unsupported browser codecs.
- Security: local-only promises match reality; no unsafe SVG script execution; no MIME trust of user extensions, upload limits, denial-of-service controls, zip traversal risks, reflected content injection, dependency vulnerabilities, CSP/CORS protections.
- Usability: keyboard, visible focus, semantic labels, ARIA live status as appropriate, understandable error text, mobile touch targets, high contrast, reduced-motion options, no dark-pattern downloads.
- Performance: real-device INP/LCP/CLS under processing load, CPU/memory pressure, graceful fail/recovery; keep codecs lazy-loaded and processing off main thread where possible.
- Economics: no unbounded server conversions or expensive third-party inference hidden behind “free” UI; record hosting bandwidth ceilings.

## Test protocol
Create fixture matrix with sizes/formats/corruption; verify transformed output by independent parser/decoder; use browser/E2E and real devices. At minimum cover happy path + all known failure modes on supported formats, low-end Android and modern desktop Chromium/Firefox/Safari where possible.

## Deliverables
Test log with OS/browser/device and build SHA, actual output properties, errors, accessibility findings, cost estimate, open defects. Do not mark PASS on a feature not executed.

