# Responsive verification — October 18, 2026

## Scope

Employer-facing portfolio, engineering case studies, work collection, web résumé, research hub/detail, four project previews and five standalone showcase apps. Layouts were exercised in the browser at CSS viewport sizes representative of phones, Android/iPhone widths, iPad portrait/landscape and desktop monitors. This is browser viewport verification, not a claim of testing physical devices or every browser engine.

## Repairs

- At 761–1100px, the hero now separates copy from the portrait with an opaque reading surface. The tablet name scale fits the available column.
- Preview headers remain sticky and their 44px close controls stay visible while long content scrolls, including short landscape windows.
- Phone previews use less nested padding, and their iframe heights adapt to available viewport height. `vh` fallbacks precede dynamic viewport units.
- Project arrows and the mobile résumé action have at least 44px targets. Mobile contact and preview select inputs use 16px text.
- Relay's navigation row scrolls within its own region at narrow embedded widths instead of expanding its document. The compiled app and portable source archive were rebuilt together.

## Checks

- 96 main-route layout samples: six routes at 16 portrait/landscape sizes, from 320×568 to 2560×1440. No document horizontal overflow or clipped headings outside the intentionally horizontal project gallery.
- Sizes: 320×568, 360×800, 375×667, 390×844, 412×915, 430×932, 568×320, 844×390, 768×1024, 820×1180, 1024×768, 1180×820, 1280×800, 1440×900, 1920×1080, 2560×1440.
- 30 standalone-app layout samples: five apps at six phone, tablet, landscape and desktop sizes. No document overflow.
- 16 final preview samples: four projects at 320×568, 390×844, 844×390 and 820×1180. Modal and iframe documents fit their widths; close controls remain visible after scrolling to the end.
- Phone gallery navigation and contact expansion work; every contact field measures 16px text with no overflow. No browser console errors observed.
- Lint, no-emit TypeScript, 16 rendered-route tests, seven export tests, root/Pages builds, six-route static export/resource validation and pack validation pass. Relay's ten domain tests pass and its app builds.
- Résumé files and their approval record are unchanged.

Evidence: `work/responsive-2026-10-18/` contains baseline/final layout matrices, app and preview matrices, and build/test logs. Public release verification follows deployment.
