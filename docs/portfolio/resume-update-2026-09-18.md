# BCBA resume update — September 18, 2026

## Content

The owner's supplied `Fatgezim_Bela_Resume_2026.pdf` is the latest source for clinical and data-science roles, education dates, and state licensure. Create 13 Group CTO is confirmed in the current request. Previously verified NeuroPath founder and Bela Data Lab co-founder/co-builder attribution remains intact, including Meili Bela's credit.

- Added Achievements (April 2025–present), 1331 Recordz (January 2022–present), and exact Connex / ABC Behavior dates and responsibilities.
- Corrected neuroscience degree completion to May 2017 and MD candidacy to expected May 2028.
- Added Create 13 Group CTO and placed clinical experience/credentials before project demonstrations.
- Retained the supplied headshot, existing product demos, research work, theme switching, and print resume.

## Deployment

GitHub Pages is the canonical public target. Build-time base-path handling now covers hydrated links, media, fonts, metadata, and static routes. The workflow deploys `main` after checks. The exporter validates local HTML/CSS resources and includes robots, sitemap, a 404 page, and `.nojekyll`.

## Validation

Production build and 11 rendered-HTML tests pass with the Pages base path. Static export link validation passes. Browser checks cover widths 320, 390, 768, 1024, and 1440 pixels, theme switching, navigation search, mobile menu, print route, poster viewer, reduced motion, and JavaScript-disabled reading. No horizontal overflow or broken images were observed. A native hash-navigation request issue discovered in this check is corrected before release.
