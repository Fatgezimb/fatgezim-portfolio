# Connected visual chapters — verification

October 15, 2026. This revision responds to the owner's critique of the lower-page imagery, storytelling and visual consistency. Design direction: `CHAPTERS_DESIGN.md`. The previous public checkpoint is `cf0a652`; publication of this revision is pending the final release step.

## Implemented and reviewed

The homepage moves from the five-object desk to a portrait-led introduction, research lightbox, application workbench, editable data walkthrough, physical form study, professional history, applied skills, education notebook, personal film and contact invitation. Roles and education use verified shared records; approved résumé artifacts retain their exact bytes.

The studio replaces the earlier illustration with forty modeled ribbons, three materials, and native fold, light and viewpoint controls. Its geometry also appears on the opening desk. It loads near the studio, draws only after a change, caps DPR at 1.5, and disposes its resources on context loss/unmount. Real renders provide desktop/mobile posters. Reduced-motion, low-power and slow-connection visitors can explicitly activate it.

## Production artifact checks

Verified the exported site at `/fatgezim-portfolio/` in installed Chrome:

| Check | Result |
| --- | --- |
| Lint, TypeScript, root build | Pass |
| Rendered-route / export tests | 14 + 7 pass |
| Pages build and resource-validating export | Four routes pass |
| Responsive layout | 55 section/width samples at 320, 390, 768, 1440 and 1920 px; zero overflow/runtime errors |
| Accessibility automation | 28 axe WCAG A/AA scans across two themes, two widths and seven project states; zero violations |
| Product interactions | 18 mobile/desktop workflow checks pass, including seven samples and contact validation |
| Live embedded sites | Eight actual navigations across Data Lab, Caregiver, RBT and NeuroStack; returning to a sample removes its iframe |
| Routes and reloads | Four routes at 390/1440 px; correct titles, canonical URLs, fonts and base-path resources |
| Workspace selection | Five actual canvas objects select the intended story |
| Studio rendering | All four controls change rendered pixels; zero idle draw calls; three context-loss/retry cycles recover |
| Studio fallbacks | Reduced-motion/constrained-device poster and explicit activation pass; initial WebGL failure/retry, Save-Data and slow-2G guards independently verified |
| No JavaScript | Three research figures, five skill panels, seven samples, studio poster and static data explanation remain readable |
| Research | Original figures and labeled detail; source attribution and poster links retained |
| Data walkthrough | Four fictional rows; correct 3.5-hour default; editing D gives three eligible rows and 4.5 hours; undo restores 3.5 |
| Downloads | PDF/DOCX hashes match owner approval; header PDF works at 320, 390 and 1440 px |
| Link audit | 190 rendered targets, 30 unique HTTP requests, zero failures |

Visual review covered every chapter at 1440, 390 and 320 px. Refinements reduced repeated large headings, added a compact mobile project selector, brought research captions beside the images, improved short-phone studio framing and clarified contact/education compositions. Independent content and code reviews have no remaining actionable findings.

Native sliders were exercised by keyboard. Desktop project tabs retain arrow/Home/End navigation. The mobile picker is a labeled native select; all seven option-to-panel/hash transitions pass. Headless macOS Chrome could not automate its OS-native popup with arrow keys, so that specific popup behavior is not claimed as manually verified.

## Evidence and performance scope

Local evidence: `work/chapters/site-quality.json`, `evidence/static-production.json`, `static-workflows.json`, `static-live-embedded.json`, `static-chapters.json`, `static-boundaries.json`, `static-links.json`; independent `code-review.md`, `content-review.md`, `review-new/visual-review.md`. Canvas hit testing: `work/master/workspace-qa/chapters-static-mouse.json`.

Local reduced-motion measurements reported zero layout shift, no long tasks and approximately 397 kB decoded initial JavaScript. These are local diagnostics, not public-network performance claims. The shared deferred Three.js chunk is approximately 553 kB minified / 137 kB gzip and triggers the bundler's size advisory. The studio-specific chunk loads near its scene; external product frames load on request.

Approved PDF SHA-256: `aff5bc3dd53b49f44e449d48f7670ff58f9764eb8aae975a7169a35525c382f1`.

Approved DOCX SHA-256: `b255dfe4faea50a1184d5f29bb9e8f15fde877a006babf5002d0207a05549a94`.
