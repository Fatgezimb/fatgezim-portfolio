# Product studio redesign — verification

Date: October 15, 2026. The owner requested a full aesthetic revision, truthful interactive project previews and a section-by-section audit. The recorded Phase 1 approval and current request authorize this follow-up. The implementation is ready for release; live verification is recorded below after deployment.

## Section audit and result

| Section | Audit finding | Final treatment |
| --- | --- | --- |
| Opening/navigation | Long, decorative introduction delayed access to actual work. | Concise technical-founder identity, large editorial type, original interactive fibre sculpture, direct work/résumé actions and four primary links. Full mobile/search navigation remains. |
| Projects | Stacked generic miniature slides did not expose the real workflows; repeated framing made the page very long. | Seven selectable projects, one generous product window, working controls, scoped sample labels, role/method evidence and full-site/source actions. Three verified public sites can load inside the window on request. |
| Research | Original poster was too small and surrounded by repeated visual framing. | Whole original poster, direct PDF action, concise documented method chain and exact author/institution credit. Existing detail page and accessible viewer remain. |
| About | Biography appeared before the strongest product evidence. | Below the work/research; real portrait and two concise verified paragraphs. |
| Experience | Repeated card presentation obscured the career sequence. | Compact dated rows, clear roles and expandable contributions from structured résumé content. |
| Capabilities | Skills were detached from proof. | Readable groups with links to relevant working projects/research. |
| Ventures | Company/product relationship needed to remain clear. | Explicit relationship and role for each venture, using verified records. |
| Education/personal | Credentials and personal media competed with early product evidence. | Complete degrees/credentials and soccer media later in the page. B.S. remains 2017. |
| Contact/downloads | Form language needed to reflect actual behavior. | Clearly labeled email draft handoff, native required-field validation and approved résumé downloads. |

## Functional and accessibility evidence

- ESLint and TypeScript pass. All 14 rendered-route tests and seven export/adapter tests pass.
- Root production build and GitHub Pages base-path build pass. Exporter validates all four documents, RSC payloads, metadata, CSS and referenced local resources.
- Actual static artifact: eight route/width checks at 390 and 1440px, each reloaded; HTTP 200, no runtime/console errors, no wrong-base attributes and no horizontal overflow. Command navigation opens the résumé correctly in a new tab; theme persistence works.
- Section screenshots at 390, 768, 1440 and 1920px. All seven samples also checked at 320 and 640px with no horizontal overflow. 640 CSS pixels cover a 1280px viewport reflow equivalent at 200% zoom.
- All seven local workflows exercised at 390 and 1440px, including filters, answer feedback, progress, review saving, exact neural-data inspection and confirmation-gated simulation. Deep links select the correct panel. Exactly one active panel is visible.
- Keyboard skip link, native menu, command dialog focus/return, project Home/End/arrow/wrap behavior and explicit controls pass. All four routes remain readable without JavaScript; all project summaries are available in that fallback.
- axe-core WCAG 2 A/AA and 2.1 AA checks: zero detected violations across all seven active samples in light and dark themes (14 scans). This is an automated check supplemented by manual keyboard and visual review, not a claim of formal certification.
- Hero checks confirm changing frames while running, stable frames when paused, resumed motion, stable frames offscreen and under reduced motion, and explicit form changes under reduced motion. Final production runs record no ResizeObserver errors.
- Bela, Caregiver and RBT live frames each render, accept navigation and return to the sample on both mobile and desktop (six checks). Caregiver's compact frame hides its desktop navigation; the visible “See the preview path” control was exercised. Bela's internal Money control was exercised by keyboard; its own sticky header can overlap some pointer targets at compact dimensions. The full-site link remains available.
- Link audit covers 143 rendered targets and 44 unique HTTP destinations, with zero HTTP failures.
- Browser downloads match the approved PDF and DOCX SHA-256 records byte for byte. The web résumé also prints to two pages.

## Performance

The static artifact initially requests 365,517 bytes of decoded JavaScript across 14 files, approximately 115,729 bytes when each is gzip-compressed locally. No live iframe or Three.js engine is loaded initially. The sculpture caps pixel ratio and stops work offscreen; public embeds load on explicit action. Existing below-fold media remains deferred.

Unthrottled local Chrome captures at 390 and 1440px measured zero layout shift and no long tasks during the sampled initial load, with LCP at 132/128ms. These are local laboratory measurements, not representative internet/mobile-network scores or a public performance guarantee.

## Scope and remaining boundaries

The separate NeuroStack deployment has a verified hydration/asset-path failure. Its portfolio preview uses exact public scientific data and links to reproducible source. Caregiver's account library, authentication/checkout and private product workspaces were not exercised. Live embeds remain controlled by the external applications. Contact opens an email draft; it does not claim server delivery. All sample records, provenance and project status labels are visible at the point of use.

No résumé fact needed another owner decision. The owner-reviewed PDF/DOCX bytes and approval manifest are unchanged.

## Tools and audit trail

Used the project phase-gate and frontend-design skills, source/public application inspection, original procedural Canvas/SVG artwork, browser automation with Chrome/Playwright, axe-core, Node tests, TypeScript, ESLint, the existing link auditor and GitHub Pages exporter. Project evidence and design decisions are in the adjacent redesign documents. Generated screenshots/JSON are under `work/redesign/` and remain local. Reviewer findings about project hash state and unreliable iframe load status were corrected and retested. Final independent integration review found no additional actionable issues and verified the sample arithmetic and approved artifact hashes.

## Release

Pending deployment and public verification.
