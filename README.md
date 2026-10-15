# Fatgezim “Zim” Bela — Portfolio

Live GitHub Pages site: [fatgezimb.github.io/fatgezim-portfolio](https://fatgezimb.github.io/fatgezim-portfolio/)

Featured scientific project: [NeuroStack Explorer](https://fatgezimb.github.io/neurostack-explorer/)

A technical portfolio and résumé focused on hands-on Founder and CTO leadership, software engineering, data, automation, and scientific systems. The experience uses a light-first “neural command center” visual system, accessible miniature product demos, and progressively enhanced Three.js scenes.

## Stack

- Next.js 16, React 19, and TypeScript
- Vinext and Vite for the Cloudflare-compatible build
- Direct Three.js with a shared, lazy-loaded scene runtime
- CSS Modules plus global semantic design tokens
- OpenAI Sites hosting through `.openai/hosting.json`

The portfolio is a static public experience. Product demonstrations use sanitized local samples; account and clinical data are handled only in their separate applications.

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Useful routes are:

- `/` — portfolio
- `/#projects` — featured project lab
- `/research` — research overview
- `/research/george-mason-neuronal-reconstruction` — accessible poster project page
- `/resume` — print-friendly résumé

## Verification

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

`npm test` performs a production build before running the rendered-HTML checks. The build may report a size notice for the isolated Three.js chunk; the engine is dynamically imported only when an eligible scene approaches the viewport.

## Editing content

Verified copy and public facts live under `app/content/`:

- `site.ts` — navigation, hero, about, contact, and site metadata
- `resume.ts` — identity, experience, education, credentials, and skills
- `projects.ts` — verified project records, roles, evidence, and boundaries
- `research.ts` — research experience and evidence limits
- `evidence.ts` — public research-source ledger and verification status

Preserve the evidence rules in `AGENTS.md`: do not add unsupported metrics, client details, PHI, private URLs, credential identifiers, or unverified research claims.

## Editing project demos

The six sanitized product previews live in `app/components/project-demos/`.

- `storyboards.ts` defines typed demo steps, themes, architecture nodes, evidence links, disclaimers, and synthetic-data labels.
- `stateMachine.ts` owns deterministic playback and navigation behavior.
- `MiniProductSurface.tsx` renders the truthful miniature interfaces.
- `ArchitectureLens.tsx` renders input → processing → output → boundary diagrams.

Every demo must remain understandable with autoplay paused and must keep its evidence, authorship, synthetic-data notice, and product limitations visible.

## Research, media, and contact

The research hub and George Mason project page pair the original poster with a readable HTML summary, documented workflow, and an accessible native-dialog viewer.

Optimized public derivatives live in `public/media/`. The headshot preserves the supplied face and natural appearance. The soccer clip is a six-second H.264 MP4 with the source file's mathematically silent audio track removed; its poster and video bytes are assigned only when the feature approaches the viewport. The surrounding text remains usable without JavaScript.

The contact form does not submit to a server. It uses an encoded `mailto:` handoff so the visitor can finish and send the message in their email application. The destination address is not displayed as visitor-facing contact copy.

## Themes, motion, and 3D

The default theme is light. The header toggle persists an optional dark theme in local storage. Semantic tokens for both appearances are defined in `app/globals.css`; component surfaces should consume those tokens instead of adding theme-specific color literals.

Motion and WebGL are progressive enhancements:

- `prefers-reduced-motion`, Save-Data, unsupported WebGL, and context loss receive static SVG/CSS fallbacks.
- The canvas is decorative and hidden from assistive technology.
- Normal page scrolling is never intercepted.
- Scene controllers pause off-screen and dispose render resources on teardown.

## Accessibility

The site includes a focusable skip link, semantic landmarks and headings, visible focus styles, keyboard-operable demos, focus-managed command and poster dialogs, touch controls, reduced-motion states, stable deep links, and readable no-WebGL fallbacks. Essential content remains ordinary server-rendered HTML.

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

The exporter includes all four route documents, hydration payloads, robots, sitemap, a truthful 404 page and `.nojekyll`. Preview the generated files under the actual `/fatgezim-portfolio` mount and verify interactions before release. The small Vinext font and static-history adapters are version-specific and covered by focused tests; review them when upgrading Vinext.

Audit rendered targets with `python scripts/audit-links.py --base http://localhost:4173`. Current before/after link evidence, document validation and browser results are in `reports/`.

## Project structure

```text
app/
  components/
    navigation/       active navigation, theme toggle, command palette
    project-demos/    typed miniature product interfaces
    research-ui/      evidence labels, workflow, page shell, poster viewer
    spatial/          Three.js runtime and static fallbacks
    supporting/       section-specific visual systems
  content/            verified public portfolio data
  research/           research hub and verified project route
  resume/             print-friendly résumé route
docs/portfolio/       evidence audits and phase reports
public/               favicon, social card, and optimized public media
tests/                rendered-HTML checks
```

The redesign audit trail and acceptance evidence are documented in `docs/portfolio/`.
