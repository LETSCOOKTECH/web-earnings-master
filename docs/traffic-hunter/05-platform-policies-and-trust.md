# 05 — Platform, publisher and legal safeguards

**Date of review:** 2026-11-23. The list below uses directly opened first-party web pages where noted. Reopen on every consequential action, because rules change by product, locale, service or account. Neither this manual nor validator provides legal advice or provider approval.

## First-party platform rules and purpose
| Provider | Grounded operational constraint | Source |
|---|---|---|
| Google Search | People-first helpful content; spam policies address links and scaled content abuse. No controlled ranking outcome guarantee. | https://developers.google.com/search/docs/fundamentals/creating-helpful-content and https://developers.google.com/search/docs/essentials/spam-policies |
| Google Discover | Interest feed, not a guaranteed acquisition feature. Avoid clickbait; relevant representative images and context matter. | https://developers.google.com/search/docs/appearance/google-discover |
| Google AI Search | Standard crawl/index/snippet eligibility underpins supporting links; AI citation not automatically referral. | https://developers.google.com/search/docs/appearance/ai-features |
| Google AdSense | Publisher is responsible for valid traffic; suspicious purchased/unknown sources may cause limits or account closure. Legitimate advertising is not inherently banned but requires scrutiny and policy compliance. | https://support.google.com/adsense/answer/1348722 and https://support.google.com/adsense/answer/16737 |
| Reddit | Community moderators define unwanted/spam content, and heavy self-linking is a risk. No universally safe '10% rule'. | https://support.reddithelp.com/hc/en-us/articles/360043504051-Spam |
| Hacker News | Do not use primarily to promote, do not solicit votes, and do **not** automate or publish AI-generated posts/comments. | https://news.ycombinator.com/newsguidelines.html |
| Product Hunt | Product creators can post working products; requesting or incentivizing upvotes is prohibited. | https://help.producthunt.com/en/articles/17734384-5-how-to-promote-your-launch-and-what-to-avoid |
| Stack Overflow | Answers must solve the question; disclose affiliation if mentioning own product and avoid link-only promotion. | https://stackoverflow.com/help/promotion |
| LinkedIn | User Agreement prohibits unauthorized bots for messaging/engagement and inauthentic activity. | https://www.linkedin.com/legal/user-agreement |
| Pinterest | Spam policy prohibits coordinated/repetitive manipulation; Pin clicks and outbound clicks are different metrics. | https://policy.pinterest.com/en-gb/community-guidelines and https://help.pinterest.com/en/business/article/pin-stats |
| YouTube | Recommendation aims at viewer satisfaction; titles/thumbs and opening must accurately deliver value; platform video views differ from site sessions. | https://support.google.com/youtube/answer/16559650 and https://support.google.com/youtube/answer/12220281 |
| FTC/US | Material endorsements should be disclosed; US commercial email may trigger CAN-SPAM. Other regions have separate obligations. | https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking and https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business |
| GA4 | Source, medium, campaign and attribution scopes have distinct meanings; Direct/(none) is not proof of a typed URL. | https://support.google.com/analytics/answer/15567068 and https://support.google.com/analytics/answer/15258820 |

## Structured risk control matrix
- `traffic_inflation`: paid-to-click, traffic exchange, bot clicks, incentives to view ads, ad refresh tricks, impression farms. **HARD_STOP**.
- `engagement_manipulation`: paid/fake votes, follower farms, review brigades, engagement pods, bot replies. **HARD_STOP**.
- `unauthorized_automation`: disallowed platform scraping, automated DMs/comments/HN posts, use of stolen accounts. **HARD_STOP**.
- `deceptive_promotion`: hidden sponsorship, false benchmark, fake reviews, impersonating editors/institutions, misleading tool output. **HARD_STOP**.
- `privacy_leakage`: sharing user files or sensitive link parameters with platforms, undisclosed trackers, unauthorised contact harvesting. **HARD_STOP**.
- `search_manipulation`: purchased followed links for rank, fake doorway pages or keyword-spam farms. **HARD_STOP**.
- `policy_unknown`: missing or expired primary source, incompatible terms, unclear legal consent. **HOLD_FOR_REVIEW** until resolved. An open official URL is not a legal approval.
- `unbounded_spend`: no authorized cap for paid media, API or compute. **HARD_STOP**.
- `misaligned_user_job`: promotion promises task output not demonstrated by product. **HOLD** or **HARD_STOP** if misleading.

## Outreach and email specifics
Market-specific anti-spam/consumer laws must be checked for geography and message content. For UK/EU consider ePrivacy/GDPR as applicable; US CAN-SPAM has independent duties; India and other countries have their own rules. Do not assume "B2B" or "public address" grants unrestricted mass email permission. Human-approved relevant outreach only when allowed, with truthful affiliation and compliant contact methods. No purchased scraped personal email lists.

## Sponsorship and affiliate transparency
Compensation, gifted access or affiliate benefits can create disclosure duties. Do not hide the relationship inside hashtags, footers or an invisible link. Do not fabricate independent recommendations; don't require collaborators to provide positive reviews or followed backlinks. Respect sponsorship and disclosure policy of the platform and local law.

## Community venue handoff
Traffic Hunter researches and drafts internal briefs. Before Reddit/HN/Product Hunt public action, a human reviews local venue rules, the actual product and intended contribution. The skill and its Node code **never** post remotely. Other tools must not bypass this manual.

## Handling suspicious traffic
Pause questionable source. Check actual server/analytics/ad account state, timestamps, geo/device and publisher warnings. Do not self-click ads, test ad clicks, buy cheap sessions, or run campaigns to manipulate 'bounce rate'. Report suspected invalid traffic without pretending to know Google's proprietary detection outcomes.

## Documentation state
A current official page was opened during research for the linked set in `sources/traffic_hunter_sources_2026_11_23.json`. This is a **dated inspection record, not automatic future truth**. Missing country-specific legal/account data remains UNKNOWN. No paid placements, outreach, or account connections were authorized in the skill build.
