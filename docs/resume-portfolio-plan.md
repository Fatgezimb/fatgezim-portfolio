# Resume and portfolio reconciliation

Updated October 15, 2026.

## Scope and preserved work

Reconcile the supplied six-file resume package with the existing approved portfolio. Keep the current responsive layout, scientific research pages, original media, theme controls, accessible project demos, and lazy-loaded spatial scenes. Preserve the 31 pre-existing modified files; their starting diff is saved locally in ignored `work/reconciliation/preexisting-changes.patch`.

Phase 1 approval is recorded in `phase-state.json`; Phase 2 is complete. The owner has requested completion and confirmed Founder and CTO at both Create 13 Group and NeuroPath LLC, with 2018 accepted as the Create 13 start year. The owner resolved the B.S. source conflict in this chat by choosing 2017; expected 2028 medical education and co-builder credits remain intact.

## Checklist

- [x] Read all six ZIP files, current phase records, repository instructions, content and deployment configuration.
- [x] Preserve starting changes and reconcile the approved phase history.
- [x] Verify candidate implementations and current public destinations.
- [x] Reposition shared content and metadata around hands-on technical leadership.
- [x] Correct RBT links and inaccessible source-code CTAs.
- [x] Generate matching two-page PDF and editable DOCX from structured data.
- [x] Validate document text, pages, fonts, reading order and hyperlinks.
- [x] Audit every navigation, project, contact, download and metadata target.
- [x] Verify responsive layouts, keyboard controls, reduced motion, no-JS behavior and runtime errors.
- [x] Run lint, typecheck, tests and production build.
- [x] Prepare release with matching source, reports and factual questions.
- [x] Publish through the verified existing workflow when all applicable publication gates are satisfied, then verify live behavior.

## Source of truth

- `app/content/resume.ts`: identity, experience, education and skills.
- `app/content/projects.ts`: existing project evidence, status, scope and public links.
- `app/content/site.ts`: site copy and navigation, derived identity and metadata.
- `app/content/research.ts`, `app/content/evidence.ts`: poster-supported collaborative research.
- `app/content/resume-document.ts`: document selection and concise content derived from the shared records.
- `docs/portfolio/conflicts-and-questions.md`: prior owner decisions; new reconciliation takes place without undoing those decisions.
- `reports/link-audit.csv`, `reports/link-audit.md`, `reports/qa-report.md`: current verification evidence.

## Risks and release decisions

The Sites deployment is owner-private, while the existing GitHub Pages portfolio is public. Preserve each audience. The public portfolio must not use the private Sites address as its canonical destination. Current RBT hosting has moved; verify the app itself, including study navigation, rather than relying on the old address. Source buttons must not lead visitors to private repositories.

The owner approved the exact two-page PDF and editable DOCX for public downloads on October 15, 2026 after reviewing both files in this chat. The owner subsequently requested the 2017 B.S. correction. The reviewed content with this explicit correction is copied into `public/resume/`; the current download gate is enabled. Historical review PDFs remain separate from the current deliverables.

No exact Create 13 start month is available. Use only the owner-accepted year. Use the owner-resolved 2017 B.S. date and the remaining verified degree dates. Do not add unverified commercial outcomes, production status, proficiency or research results.

## Integrated verification

Root lint/typecheck, 13 rendered-route tests and 7 focused export/adapter tests pass. Both target-specific builds pass; the Pages artifact validates all local resources. The remote main history is merged, retaining its optional lockfile repair and equivalent font, history and resource checks. Owner review resolved public downloads and the B.S. year correction to 2017. The static artifact and final public deployment both passed browser checks. PR 2 is merged; workflow 38772934504 succeeded for d5523d23c8c429b48eaeea34b581be6822acb617. Live routes, 141 rendered link targets, 22 HTTP destinations and both approved artifact hashes are verified.
