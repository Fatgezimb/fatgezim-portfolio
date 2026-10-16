# Editorial portfolio verification — October 15, 2026

Status: implementation and local verification complete. The actual GitHub Pages static export is available at `http://127.0.0.1:4198/fatgezim-portfolio/`. Public deployment remains at the previously verified commit recorded in `phase-state.json`.

## Automated verification

| Check | Result |
| --- | --- |
| ESLint | Pass, no warnings |
| TypeScript, no emit | Pass |
| Root production build | Pass |
| Rendered-route tests | 14 passed |
| Pages export/adapter tests | 7 passed |
| `/fatgezim-portfolio` production build | Pass |
| Validated static export | Four routes, hydration payloads, metadata and local resources pass |
| Pack validation | Pass |
| Rendered target audit | 103 targets; 27 unique HTTP requests; zero failures |
| Served asset verification | Approved résumé files, portrait, favicon and social image match source bytes |

Machine evidence is in `work/editorial/`: `root-build.log`, `pages-build.log`, `tests.log`, `export.log`, `pack.log`, `links.log`, `links.json`, `browser-audit.json` and `served-assets.json`.

## Browser and accessibility verification

- Responsive widths: 320, 390, 768, 1024, 1440 and 1920 pixels. At all sizes document scroll width equals available client width; horizontal overflow is contained within the intentional project rail.
- Desktop and mobile visual review of the selected portrait, project cards, original research, experience, skills, education, NeuroPath and contact.
- Gallery previous/next movement and keyboard navigation; all five lazy-loaded preview dialogs; full-app destinations.
- NeuroStack: unit and chart selection, start/end bounds, linked raster/rate/count data, numeric tables and reset. A one-second interval renders a visible rate point and exact y-axis labels.
- Data Lab: time/filter changes update the operations summary and follow-up queue. RBT: answer feedback and progress. Caregiver: scenario feedback. StepSpark: reveal and review controls.
- Native dialog focus containment, Escape, focus restoration and restored background scroll.
- Reduced-motion emulation: immediate scrolling and suppressed transitions.
- JavaScript-disabled rendering: six project cards and full-app/research/download destinations remain in readable HTML; preview buttons are hidden.
- Research detail navigation works from the production export with its base path.
- Automated axe WCAG 2 A/AA and 2.1 AA scans: zero reported violations on the homepage, expanded contact form and each of the five project dialogs. This is an automated scan result, not exhaustive accessibility certification.
- Final browser console has no captured errors or warnings.

Independent visual QA found two issues, both corrected and verified: a single-bin rate interval lacked a visible plotted point, and the expanded contact form repeated its heading.

## Scientific app integration

The existing public NeuroStack app was exercised with target-unit, population-view, time-interval and Stan model controls; the view and URL state updated correctly. The portfolio adds a source-backed miniature of the workflow and links to the full app. In the standalone NeuroStack repository, the RBT footer destination was corrected and a portfolio return link added.

Standalone checks passed: ESLint, TypeScript, 16 unit tests, production build and 26 rendered-route tests. Its footer edit is local; scientific artifacts and analysis models are unchanged.

## Approved documents

Bytes served by the static preview match the approved files:

- PDF: `aff5bc3dd53b49f44e449d48f7670ff58f9764eb8aae975a7169a35525c382f1`
- DOCX: `b255dfe4faea50a1184d5f29bb9e8f15fde877a006babf5002d0207a05549a94`

## Review artifacts

Saved to the chat's `outputs/Editorial_Portfolio/` directory:

- `desktop-preview.png` — hero and first selected-work cards
- `desktop-full-page.png` — complete desktop page
- `mobile-full-page.png` — complete 390-pixel mobile page
- `neurostack-preview.png` — working chart and controls
- `README.md` — preview link, scope and verification summary

## Later work-collection and Kaggle revision

The active collection now contains eleven entries, including two completed Kaggle data apps. Current verification supersedes the earlier counts above: 22 route/export tests, five-route static export, and 138 rendered link targets. Detailed analysis, browser, package and link evidence is in `KAGGLE_SHOWCASE_QA.md`. The pre-existing LinkedIn destination is protected by a sign-in wall. All newly added app/analysis/download endpoints pass.
