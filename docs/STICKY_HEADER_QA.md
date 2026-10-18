# Sticky navigation — October 18, 2026

Shared editorial navigation now remains at the viewport top on the homepage, work collection and engineering route. Opaque background and a subtle shadow preserve legibility. Narrow navigation scrolls horizontally rather than growing into a three-row header. Anchor scroll padding leaves destination headings below the bar.

Verification: lint, typecheck, 16 rendered-route tests, 7 export tests, Pages build, six-route static export, pack validation and diff whitespace checks passed. Browser checks at 320×568, 390×844, 820×1180, 1440×900 and 844×390 confirmed sticky top=0, no document overflow and visible Experience destinations. Work and engineering navigation also remained at top=0 after scrolling; no browser console errors were recorded.

Release: 36f7339; GitHub Pages run 39168361168. Public verification recorded after deployment.

Public verification: refreshed deployed assets report position:sticky and viewport top=0 after Experience navigation. Live screenshot saved in chat outputs/Sticky_Header/live.png.

## Compact mobile follow-up

Owner requested a smaller mobile header. Portrait height reduced to 97 CSS pixels; landscape 540–900px wide and up to 500px tall uses a single 53px row. All five navigation links retain 44px height. At 320px viewport width, navigation clientWidth and scrollWidth both measure 273px, so every link fits without swiping. Browser checks passed at 320×568, 390×844, 568×320 and 844×390 with no document overflow and sticky top=0; Contact navigation works. Lint, typecheck, 16 rendered-route tests, 7 export tests, Pages build and six-route static export passed. Release 64ae54d / Pages 39173507313.

Live 320px check confirmed 97px header at top=0 and navigation clientWidth=scrollWidth=273px. Screenshot saved to chat outputs/Sticky_Header/compact-mobile.png.
