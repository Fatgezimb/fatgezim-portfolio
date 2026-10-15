# Resume and portfolio quality audit

October 15, 2026. Completed public release. Local, exported-artifact and post-deployment results are recorded below.

## Reconciliation

The six-file supplied package was read alongside the existing approved portfolio and its newer remote history. Existing visual design, original portrait and video, seven product micro-demos, research routes, keyboard controls, light/dark themes and lazy spatial scenes are retained. The 31 starting modified files were preserved in a separate Git checkpoint before the reconciliation changes.

The owner confirmed Founder and CTO for Create 13 Group and NeuroPath LLC, accepted 2018 for Create 13, approved the generated resume for public downloads, and then explicitly corrected the B.S. year to 2017. Joint Bela Data Lab credit remains intact. The clinical assessment implementation is described as private and locally tested; USMLE Sprint is distinguished from StepSpark and its account gate is recorded.

The newer remote lockfile repair and Pages runtime fixes are carried forward through a history-preserving merge. The public site uses GitHub Pages canonicals. The separate Sites audience is unchanged.

## Automated source checks

- ESLint: pass without warnings.
- TypeScript no-emit check: pass.
- Rendered route suite: 13 tests, pass. Includes semantic routes, navigation targets, research claims, media behavior, safe external links, technology resume content, and approved download hashes.
- Static export and adapter suite: 7 tests, pass. Includes missing assets, srcset/deferred media/CSS URLs, path containment, exact hydration retention, font transformation, installed Vinext compatibility and native history behavior.
- Root production build: pass.
- Pages-base production build: pass. Separate target-specific browser/export verification follows below.
- Existing RBT application build: TypeScript + Vite pass; no RBT source change required.

Vinext reports unknown static route classification and the optional isolated Three.js chunk exceeds the bundler’s 500 kB notice threshold. These are build notices, not failures. Scenes remain lazy, pause off screen, and use reduced-motion/no-WebGL fallbacks.

## Browser verification

Bundled Playwright API with installed Google Chrome. The matching Playwright headless-shell binary was unavailable, so the installed browser was used without changing project dependencies.

All four routes returned 200 with one h1, zero runtime/console errors and no horizontal overflow at 375, 768, 1440 and 1920 CSS pixels. All routes remain readable without JavaScript at 320 pixels. Keyboard verification covers skip-to-main, visible focus, mobile menu, navigation search, Escape/focus restoration and native navigation. All seven demos support touch playback, pause, next-frame controls and Architecture Lens; reduced motion initializes them paused. Theme state persists and restores correctly. Both spatial scenes pause off screen.

Final public-site screenshots are under `reports/screenshots/2026-10-15-*` at 375, 768, 1440 and 1920 pixels, captured full-page at DPR 1 with reduced motion so all sections are visible. They include the corrected 2017 date and approved downloads. Representative layouts were visually inspected, including the mobile hero and resume action toolbar.

### Print and documents

Browser printing the resume now produces two clean Letter pages, approximately 160 kB. The decorative body texture is disabled for print and the research heading stays with its content. The reviewed PDF and DOCX independently render as two pages with 10 pt body text. All four artifact page views were visually inspected. Eight hyperlink targets match in both formats. PDF text is selectable and body/heading fonts are embedded. Actual browser downloads match `resume/approval.json`.

The 2017 correction was verified as the sole text change to the earlier reviewed files. Current hashes and detailed document validation are in `reports/resume-validation.json`.

### Performance sampling

Uncompressed local production responses: approximately 405 kB core JavaScript transferred with reduced motion, and approximately 725 kB additional Three.js transferred when the visible hero scene activates. Measured CLS was zero in both sampled modes. One startup long task was approximately 94–98 ms. Portrait body size is approximately 80 kB; the research poster remains deferred. These are local browser measurements, not field data, throttled mobile scores or a Lighthouse certification.

## RBT verification

The former Pages destination returns 404. The authoritative repository metadata and deployment configuration identify `https://rbt-pro.vercel.app/`. A real browser verified its dashboard, flashcard navigation, direct flashcard refresh, JavaScript/CSS assets, and a mobile practice question with correct-answer feedback and an incrementing progress counter. The mobile practice view fits 375 pixels with no console errors. The stale portfolio destination and inaccessible source button are repaired in both project cards and previews. No separate application redeployment was needed.

## Link and release verification

See `reports/link-audit.csv` and `reports/link-audit.md` for per-target source, before/after destination, response, redirects, anchor behavior, accessibility and verification limits.

The actual static Pages artifact passed direct route loads and reloads at 375/1440 pixels, hydrated path/resource inspection, font loads, native hash/back-forward, all navigation anchors, command-page actions, theme persistence, seven demos, deferred video, poster modal, crawler files, 404 and exact 2017-corrected download hashes. Public release and live checks passed as recorded below.

## Limits and optional follow-up

LinkedIn redirects an unauthenticated browser to its authwall; profile content cannot be independently checked through that gate. It is recorded as access-restricted rather than dead. Keyboard/semantic/browser checks do not constitute a manual screen-reader user study or formal accessibility conformance certification. Optional evidence questions are in `QUESTIONS_FOR_OWNER.md`.

## Independent code review

A separate read-only integrated review found no remaining actionable blockers in runtime paths, metadata, accessible controls or export safety. Generated output remains inside a dedicated project directory, and asset validation completes before replacement.

### Contrast sample

Ten current hero, navigation, text-link and button samples were measured against their actual screenshot backdrops in light and dark themes. The minimum sampled ratio was 4.97:1; remaining samples ranged from 7.23:1 to 17.58:1. This is a scoped sample, not a whole-page contrast certification.

## Public release and final verification

PR [2](https://github.com/Fatgezimb/fatgezim-portfolio/pull/2) merged into main. [GitHub Pages workflow 38772934504](https://github.com/Fatgezimb/fatgezim-portfolio/actions/runs/38772934504) completed successfully for source `d5523d23c8c429b48eaeea34b581be6822acb617`, including clean npm ci, lint, typecheck, all 20 automated tests, both target builds, resource validation and publication.

Verified live:

- [Portfolio](https://fatgezimb.github.io/fatgezim-portfolio/)
- [Web resume](https://fatgezimb.github.io/fatgezim-portfolio/resume/)
- [Research](https://fatgezimb.github.io/fatgezim-portfolio/research/)
- [Neuronal reconstruction](https://fatgezimb.github.io/fatgezim-portfolio/research/george-mason-neuronal-reconstruction/)
- [PDF](https://fatgezimb.github.io/fatgezim-portfolio/resume/Fatgezim_Zim_Bela_Technology_Resume.pdf)
- [DOCX](https://fatgezimb.github.io/fatgezim-portfolio/resume/Fatgezim_Zim_Bela_Technology_Resume.docx)

Post-deployment HTTP audit: 141 rendered targets, 22 unique requests, no failures. Actual live browser checks cover all four routes with refresh at 375/1440 pixels, technology positioning, 2017 degree date, both downloads, project-base core/dynamic assets/fonts, mobile navigation, demo playback and both RBT actions. No browser errors or overflow were observed. Download response content types are correct, and native browser downloads plus independent HTTP downloads match the final approved PDF/DOCX hashes. Machine-readable release and hash evidence is in `reports/release-verification.json`.

The separate restricted Sites audience was preserved. Optional factual additions in `QUESTIONS_FOR_OWNER.md` do not block the verified public content. GitHub reported infrastructure deprecation notices for bundled action runtimes and a future runner-image migration; the release succeeded. Review those notices during routine workflow maintenance.
