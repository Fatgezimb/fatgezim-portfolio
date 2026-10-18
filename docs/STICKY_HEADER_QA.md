# Sticky navigation — October 18, 2026

Shared editorial navigation now remains at the viewport top on the homepage, work collection and engineering route. Opaque background and a subtle shadow preserve legibility. Narrow navigation scrolls horizontally rather than growing into a three-row header. Anchor scroll padding leaves destination headings below the bar.

Verification: lint, typecheck, 16 rendered-route tests, 7 export tests, Pages build, six-route static export, pack validation and diff whitespace checks passed. Browser checks at 320×568, 390×844, 820×1180, 1440×900 and 844×390 confirmed sticky top=0, no document overflow and visible Experience destinations. Work and engineering navigation also remained at top=0 after scrolling; no browser console errors were recorded.

Release: 36f7339; GitHub Pages run 39168361168. Public verification recorded after deployment.

Public verification: refreshed deployed assets report position:sticky and viewport top=0 after Experience navigation. Live screenshot saved in chat outputs/Sticky_Header/live.png.

## Compact mobile follow-up

Owner requested a smaller mobile header. Portrait height reduced to 97 CSS pixels; landscape 540–900px wide and up to 500px tall uses a single 53px row. All five navigation links retain 44px height. At 320px viewport width, navigation clientWidth and scrollWidth both measure 273px, so every link fits without swiping. Browser checks passed at 320×568, 390×844, 568×320 and 844×390 with no document overflow and sticky top=0; Contact navigation works. Lint, typecheck, 16 rendered-route tests, 7 export tests, Pages build and six-route static export passed. Release 64ae54d / Pages 39173507313.

Live 320px check confirmed 97px header at top=0 and navigation clientWidth=scrollWidth=273px. Screenshot saved to chat outputs/Sticky_Header/compact-mobile.png.

## Single-row menu follow-up

Owner requested a single row with a menu button and persistent résumé access. The header now measures 53px on phone portrait/landscape. A native details/summary disclosure exposes the five links beneath the bar, with 48px-tall link targets. Menu and résumé controls are at least 44px tall. Selection closes the menu; Escape closes it and returns focus to its summary. Native disclosure and links remain usable without JavaScript. Desktop retains the existing inline links.

Verified 320×568, 390×844, 568×320, 844×390, 820×1180 and 1440×900 with no document overflow. Tested menu opening, same-page Experience navigation, Work and Engineering route changes, Escape focus restoration and the résumé destination. No console errors. Lint, typecheck, 16 route tests, 7 export tests, Pages build, six-route static export and whitespace checks pass. Release 992abfc / Pages 39173784631.

Public verification confirms 53px header, 44px résumé button, all five menu links, automatic dismissal and sticky top=0. Screenshots: chat outputs/Sticky_Header/single-row-mobile.png and mobile-menu-open.png.

## Outside dismissal and shared header

Outside pointer presses (including touch) now dismiss the open disclosure without preventing the tapped page action. The document listener is removed when the header unmounts. Research index/detail and résumé now share EditorialNav with home, work and engineering. The header is hidden for résumé printing by the shared print styles.

Browser verification: outside dismissal, persistent résumé control and 53px header passed on all six routes at 390px. Sticky top=0 and no overflow passed on every route at 320px, 820px and 1440px (18 layout checks). No console errors. Lint, typecheck, 16 rendered-route tests, 7 export tests, Pages build, six-route export and whitespace validation passed. Release 7fbd2a3 / Pages39175130165.

All six published routes independently passed outside-tap dismissal and 53px height checks. Live research-page screenshot saved in chat outputs/Sticky_Header/shared-research-header.png.

## Menu state and current location

Native open state now swaps Menu/☰ to Close/× without changing button width. Page links use aria-current and a burgundy underline; the mobile current link also gains a tinted background. Research index/detail share Research as their current page; home identifies the wordmark or selected hash section. The résumé download control uses a filled treatment on the résumé page. Research links outside the homepage now lead to the research route.

Verified all six routes plus the Experience hash at 320px: Close icon, 53px height, Escape reset and no overflow. Contact selection updates the location highlight, closes the menu and restores the Menu icon. Desktop/tablet Research aria-current, underline and color plus résumé filled state verified at 820px. No console errors. Lint, typecheck, 16 rendered tests, 7 export tests, Pages build, six-route export and whitespace checks pass. Release 68dabe2 / Pages39177365279.

Public verification passed Work current-page styling, Close× open state and Menu☰ restored state. Screenshot: chat outputs/Sticky_Header/active-menu.png.
