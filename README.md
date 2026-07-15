# Fatgezim “Zim” Bela — Portfolio

GitHub Pages workflow: ready in `.github/workflows/pages.yml`; the repository
is currently private, so GitHub will not publish Pages on the current plan.
Once the repository is made public or Pages access is upgraded, the site will
be available at `https://fatgezimb.github.io/fatgezim-portfolio/`.

Featured scientific project: [NeuroStack Explorer](https://fatgezimb.github.io/neurostack-explorer/)

A technical portfolio and résumé connecting behavioral health, medicine, data science, software, and founder-built products. The experience uses a light-first “neural command center” visual system, accessible miniature product demos, and progressively enhanced Three.js scenes.

## Stack

- Next.js 16, React 19, and TypeScript
- Vinext and Vite for the Cloudflare-compatible build
- Direct Three.js with a shared, lazy-loaded scene runtime
- CSS Modules plus global semantic design tokens
- OpenAI Sites hosting through `.openai/hosting.json`

No backend, database, authentication, analytics, private project data, or PHI is used by the portfolio.

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

## Deployment

This repository is deployed with OpenAI Sites, not GitHub Pages. The Vinext build produces a worker entry point at `dist/server/index.js` and browser assets under `dist/client/`.

Release flow:

1. Run the complete verification suite and browser QA.
2. Commit and push the exact validated source state.
3. Build and package that same commit for Sites.
4. Save a Sites version with the matching commit SHA.
5. Deploy the saved version and smoke-test the production URL.

Do not commit hosting credentials or change the site access policy as part of a routine release.

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
