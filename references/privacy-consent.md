# Privacy, consent and responsible telemetry

This is an implementation checklist, not legal advice. Apply laws of actual operator and visitor jurisdictions; consult a qualified privacy professional when relevant.

## Data map before any advertising
- Uploaded images/files (browser-only? any server fallback?), filenames, transformed outputs, optional user presets, cookies, IP/browser logs, web analytics, third-party ads and CMP calls.
- Declare whether processing is local. Never secretly upload images or include file names in event payloads. Separate user-requested processing from advertising/analytics.
- Publish accurate Privacy policy, Contact and Terms; provide clear description of data storage, transfers, retention, advertising vendors, cookie purposes and rights options.

## EEA, UK, Switzerland
Current Google requirement: use a Google-certified consent management platform integrated with IAB TCF for applicable ad serving. Properly present consent, honor signals and offer user choice/revocation. Do not roll your own non-certified banner for Google TCF contexts and call it compliance.

## Elsewhere
Review applicable jurisdictions (including India DPDP obligations when operative, California/other US state requirements as applicable); local legal requirements may be stricter than vendor policy. Avoid unsupported blanket statements like “GDPR compliant” before a legal/data-flow audit.

## Engineering
Defer nonessential advertising and analytics until appropriate signals; implement regional testing; honor opt-out; make ads optional via switch; avoid sensitive uploads to ad vendors; sanitize logs; minimize retention. Include subprocessor/vendor lists where applicable. Test with browser network inspector and record evidence.

