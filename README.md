# Fatgezim “Zim” Bela — Portfolio

An editorial résumé portfolio for software engineering, data, scientific computing and technical leadership. The current implementation uses the owner-selected portrait, ivory/burgundy typography, a horizontal project gallery, interactive product previews and original research evidence.

Public destination: [fatgezimb.github.io/fatgezim-portfolio](https://fatgezimb.github.io/fatgezim-portfolio/). The October 15 editorial revision is built and verified locally. Current release status: `phase-state.json` and `docs/EDITORIAL_QA.md`.

## Stack and development

- Next.js 16, React 19, TypeScript, Vinext and Vite
- CSS Modules, semantic HTML, native dialogs and horizontal scrolling
- Self-hosted Bodoni Moda and Geist fonts
- Static GitHub Pages export with base-path-aware assets and hydration

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000). Routes and sections:

- `/` — portfolio
- `/#projects` — horizontal shortlist
- `/work/` — nine-project collection with products, automation, research and experiments
- `/#research` — original George Mason research
- `/#experience` — roles and technical responsibilities
- `/#contact` — professional links, downloads and contact form
- `/research` — research overview
- `/research/george-mason-neuronal-reconstruction` — accessible poster project page
- `/resume` — professional overview and print layout

## Content and implementation

`app/components/PortfolioPage.tsx` renders `editorial/EditorialHome.tsx`. The editorial directory owns the page, shared navigation, work gallery, project posters, modal previews and linked NeuroStack charts. `app/content/editorial.ts` defines the selected work, order, roles and public destinations.

Other verified sources:

- `resume.ts` and `resume-document.ts` — identity, roles, education, skills and document selection
- `projects.ts` — project evidence and responsibilities
- `technical-preview.ts` — public-derived scientific data and learning examples
- `operational-preview.ts` — synthetic operations data and lesson examples
- `research.ts` and `evidence.ts` — research facts and public source ledger
- `site.ts` — shared metadata and contact destinations

Preserve the evidence rules in `AGENTS.md`: do not add unsupported metrics, client details, PHI, private URLs, credential identifiers or unverified research claims. Keep product scope and shared authorship explicit. Selection rationale: `docs/EDITORIAL_BUILD.md` and `project-briefs/PROJECT_SELECTION_MATRIX.md`.

## Project previews

Seven app entries in the full collection open usable, dynamically loaded previews. Every card retains a full-product link that opens in a new tab. NeuroPath Blog is linked as a site and appears in the founder section.

The NeuroStack preview uses the first 20 seconds of the existing public-derived neural artifact. Unit selection, raster/rate view, start/end interval, reset, summary and accessible numeric tables update together. Its full application and source remain accessible. Provenance and CC BY 4.0 attribution accompany the sample.

Data Lab, RBT, Caregiver and StepSpark reuse verified components in `app/components/project-experiences/`. Keep operational examples explicitly synthetic and scientific values derived from documented artifacts.

## Accessibility, media and contact

The gallery supports native touch scrolling, previous/next controls and arrow keys. Modal dialogs support keyboard navigation, Escape, focus restoration and background scroll locking. Reduced-motion users receive immediate gallery movement. Essential copy, project destinations, research and downloads render without JavaScript.

The selected portrait is `public/media/editorial/founder-portrait.webp` (96 KB). Research images are original poster figures with full co-author attribution. Media has intrinsic dimensions and meaningful alternatives. The homepage social image is an actual rendered page capture.

The contact form uses an encoded `mailto:` handoff so visitors review and send messages in their email application. The destination address is not displayed as contact copy.

## Resume artifacts

The owner-reviewed, two-page PDF and editable DOCX are in `resume/` and copied byte-for-byte into `public/resume/`. `resume/approval.json` records the approved hashes; the rendered-route tests verify that the public download buttons point to those exact files.

`app/content/resume-document.ts` selects document content from the same identity, role, education, skill and project records used by the site. Generate review candidates with the bundled Python runtime returned by the workspace dependency loader:

```bash
python scripts/generate-resume.py
```

The generator resolves bundled Node 24 to export TypeScript content, then creates both documents. Review the rendered pages and approve changed content before replacing public files and updating the approval record. Generation alone does not publish a download.

## Deployment

GitHub Pages is the public recruiting destination: [portfolio](https://fatgezimb.github.io/fatgezim-portfolio/) and [resume](https://fatgezimb.github.io/fatgezim-portfolio/resume/). The separate Sites configuration retains its existing audience.

The Pages workflow deploys the validated source from `main`. Root builds remain available for local development and the existing Worker configuration. The Pages build compiles the actual base path into framework assets, native navigation, dynamic chunks, fonts and media; the exporter preserves the framework's hydration output and validates local resources.

```bash
npm run lint
npm run typecheck
npm test
node --test tests/export-pages.test.mjs
PAGES_BASE_PATH=/fatgezim-portfolio npm run build
PAGES_BASE_PATH=/fatgezim-portfolio npm run start -- --port 4173
# In a second terminal:
PAGES_BASE_PATH=/fatgezim-portfolio node scripts/export-pages.mjs
```

The exporter includes all five route documents, hydration payloads, robots, sitemap, a truthful 404 page and `.nojekyll`. Preview the generated files under the actual `/fatgezim-portfolio` mount and verify interactions before release. The small Vinext font and static-history adapters are version-specific and covered by focused tests; review them when upgrading Vinext.

Audit rendered targets with `python scripts/audit-links.py --base http://localhost:4173`. Current before/after link evidence, document validation and browser results are in `reports/`.

## Current verification

The current results are in `docs/EDITORIAL_QA.md`, with implementation decisions in `docs/EDITORIAL_BUILD.md`. Machine evidence is in `work/editorial/`. Historical audits and release reports remain under `docs/` and `docs/portfolio/`.

## Kaggle showcase projects

Two complete data projects are documented in `showcase/README.md`: Engine Prognostics and Appointment Operations. The `/work/` collection opens their interactive apps and downloadable source packages. Verification and measured results are in `docs/KAGGLE_SHOWCASE_QA.md`; source reviews and a practical explanation guide are included under `showcase/`.

## Additional engineering showcases

The full work collection now also includes Relay — Commissioning Readiness, Grid Forecast Lab and Video Signal Lab. Each has an independently rebuildable source archive. The two data projects include reproducible pipelines and executed notebooks; Relay includes a deterministic domain engine and invariant tests. Public evidence and design: `docs/SHOWCASE_EXPANSION_PLAN.md`. Current checks, results and remaining native keyboard check: `docs/SHOWCASE_EXPANSION_QA.md`.

## Current public release

The editorial portfolio and five engineering/data showcase apps are published and publicly verified. Internal Portfolio actions resolve through the current site base. Release and link evidence: `docs/LINK_REPAIR_QA.md` (PR 7 / Pages `38845799954`).
