# Fatgezim “Zim” Bela — Portfolio

Live GitHub Pages site: [fatgezimb.github.io/fatgezim-portfolio](https://fatgezimb.github.io/fatgezim-portfolio/)

Featured scientific project: [NeuroStack Explorer source and reproducibility record](https://github.com/Fatgezimb/neurostack-explorer)

A technical portfolio and résumé focused on hands-on Founder and CTO leadership, software engineering, data, automation, and scientific systems. The experience opens with an original five-domain 3D maker’s workbench, a lilac/graphite editorial system, and seven navigable product samples inside a shared project explorer. The five objects connect neuroscience, software, data, medicine and design to verified work.

## Stack

- Next.js 16, React 19, and TypeScript
- Vinext and Vite for the Cloudflare-compatible build
- Progressively loaded Three.js workspace with original procedural geometry and static SVG fallback
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
- `/#workspace` — five topics, optional tour and flat/3D explorer
- `/resume` — professional overview with formal downloads and two-page print layout

## Verification

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

`npm test` performs a production build before running the rendered-HTML checks. Also run `node --test tests/export-pages.test.mjs` before publishing. The workspace renderer is a separate dynamic chunk. Check 2D, reduced-motion, save-data and WebGL context-loss recovery alongside ordinary topic navigation.

## Editing content

Verified copy and public facts live under `app/content/`:

- `site.ts` — navigation, hero, about, contact, and site metadata
- `workspace.ts` — five domain stories, skills and evidence destinations
- `resume.ts` — identity, experience, education, credentials, and skills
- `projects.ts` — verified project records, roles, evidence, and boundaries
- `project-showcase.ts` — project order, presentation copy and audited public destinations
- `technical-preview.ts` — exact scientific sample and source-backed learning examples
- `operational-preview.ts` — fictional operations data and source-backed lesson examples
- `research.ts` — research experience and evidence limits
- `evidence.ts` — public research-source ledger and verification status

Preserve the evidence rules in `AGENTS.md`: do not add unsupported metrics, client details, PHI, private URLs, credential identifiers, or unverified research claims.

## Editing project demos

Seven previews live in `app/components/project-experiences/`. `TechnicalExperiences.tsx` implements NeuroStack, RBT and StepSpark; `OperationalExperiences.tsx` implements Data Lab, Caregiver, Rethink and Insight. Each CSS module preserves its product’s visual identity.

`FeaturedProjects.tsx` owns keyboard-operable project tabs, stable project deep links, the shared window, and optional live frames. `app/content/project-showcase.ts` defines the full-site and live-preview URLs. Only offer a live frame after an ordinary browser verifies framing and navigation; always keep a new-tab escape. Source links identify themselves as source.

Keep the displayed scope, data provenance, co-builder attribution and meaningful controls intact. New scientific values must derive from verified artifacts. Operational sample values must remain explicitly fictional. See `docs/portfolio/redesign-project-evidence.md`.

## Research, media, and contact

The research hub and George Mason project page pair the original poster with a readable HTML summary, documented workflow, and an accessible native-dialog viewer.

Optimized public derivatives live in `public/media/`. The headshot preserves the supplied face and natural appearance. The soccer clip is a six-second H.264 MP4 with the source file's mathematically silent audio track removed; its poster and video bytes are assigned only when the feature approaches the viewport. The surrounding text remains usable without JavaScript.

The contact form does not submit to a server. It uses an encoded `mailto:` handoff so the visitor can finish and send the message in their email application. The destination address is not displayed as visitor-facing contact copy.

## Themes and motion

The default theme is light; the header persists an optional dark theme. Shared tokens live in `app/globals.css`. Product windows retain their own readable product palettes.

`workspace/WorkspaceExplorer.tsx` owns the five accessible topic controls, optional tour, focus/scroll alignment and recovery states. `workspace/workspaceScene.ts` creates the original workbench geometry, materials, lighting, object raycasts and bounded camera framing. The concept is portfolio artwork, not a scientific reconstruction or a claim about personal modeling authorship. Asset provenance is in `docs/WORKSPACE_DESIGN.md`.

The renderer caps resolution at 1.5 DPR and quiet motion at 30 updates/second, batches neuron geometry, pauses offscreen/in hidden tabs, and disposes geometry, textures and the GL context. Initial reduced-motion, Save-Data, 2G and constrained-device settings use the flat explorer; visitors may explicitly try 3D. A fresh canvas supports recovery after context loss. All five stories and links are present without JavaScript. Scrolling remains native.

`PortfolioPage.tsx` sequences the workspace, personal introduction, project explorer, build approach, creative study, research and professional background. Supporting sections live in `showcase/PortfolioSections.tsx`; the web résumé uses its own responsive screen design and preserves a formal print layout.

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
    project-experiences/ navigable technical and operational samples
    showcase/         editorial sections and product explorer
    workspace/        original 3D scene, topic stories, tour, fallback and approach
    project-demos/    retained earlier preview components
    research-ui/      evidence labels, workflow, page shell, poster viewer
    spatial/          retained earlier Three.js runtime and fallbacks
    supporting/       section-specific visual systems
  content/            verified public portfolio data
  research/           research hub and verified project route
  resume/             print-friendly résumé route
docs/portfolio/       evidence audits and phase reports
public/               favicon, social card, and optimized public media
tests/                rendered-HTML checks
```

The current master brief, design research, inventory, link audit and implementation status live in `docs/`. Historical release evidence remains in `docs/portfolio/`.
