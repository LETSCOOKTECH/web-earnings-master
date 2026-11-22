---
name: sense-search-analytics
description: Measure actual search acquisition and diagnose SEO/AI traffic using Google Search Console, Google Trends, Semrush, Bing and privacy-safe tool funnels.
---


# SEO analytics and growth diagnosis

## Data integrity
- GSC: first-party Search clicks, impressions, CTR, position (with caveats), pages/queries/countries/devices, indexing, Google AI visibility report where supported.
- Bing Webmaster Tools: search impressions/clicks, indexing, AI Performance citations/topics/grounding queries where exposed.
- Analytics/server: real human sessions, source/medium/referrer, upload→process→success→download; filter legitimate crawlers and abuse. Respect privacy and consent.
- Semrush/Ahrefs: modeled volume, KD and estimated competitor traffic, not first-party visitors. Keep exact month/country/source; never mix TOTAL visits with organic or brand volume.
- Google Trends: relative normalized time-series, *not* absolute monthly search totals.
- Keyword Planner: estimated advertiser competition, *not* organic KD.

## Procedure
1. Confirm domain verification, query dates, regions and report availability. Do not claim data absent from interface.
2. Segment by geography, device, query intent, brand/non-brand, page, SERP/AI feature and attribution channel.
3. Triage: not indexed -> technical/content issue; indexed/no impressions -> demand/relevance/competition; impressions/no clicks -> SERP/title/zero-click/intent; clicks/no starts -> page UX; starts/no successes -> tool bug; successful/no repeat -> one-time task; visits/no profit -> geography/ads/cost.
4. Track weekly cohorts, never fabricate targets and don't confuse goals with outcomes. Attribute experiment dates, updates and control pages where possible.
5. Produce a decision: KEEP, FIX, TEST or STOP, with actual evidence and next experiment.

## Metrics
Non-branded clicks and clicks by task, task success %, median and p95 processing time, estimated cost per successful task, return share, referrer sessions from AI, ad page RPM, net revenue. Google AI report appearances and Bing citations are not equivalent to visits.

