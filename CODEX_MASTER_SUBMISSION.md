# One-File Codex Submission

This file is provided for environments where attaching the full pack is inconvenient.
When the full pack is attached, use `SUBMIT_THIS_TO_CODEX.md` instead.

---

# Submit This to Codex

Use Plan mode. Work from the résumé/portfolio repository root.

Explicitly invoke the included skill when available:

```text
$portfolio-phase-gate
```

Then follow this instruction:

```text
Read these files before doing any implementation:

1. AGENTS.md
2. PLANS.md
3. prompts/00_MASTER_ORCHESTRATOR.md
4. prompts/01_PHASE_1_CONTENT_LAYOUT.md
5. project-briefs/FEATURED_PROJECTS.md
6. project-briefs/PROJECT_SELECTION_MATRIX.md
7. project-briefs/CONTENT_FACT_CHECKLIST.md
8. design/PLUGIN_ACTION_MARKERS.md
9. design/DESIGN_SYSTEM_AND_MOTION_SPEC.md
10. checklists/PHASE_1_REVIEW_CHECKLIST.md

Inspect the complete repository and all supplied résumé/project sources.

Begin Phase 0 and Phase 1 only.

Hard stop:
- Do not begin Phase 2 or Phase 3.
- Do not add final motion, parallax, 3D libraries, production image-generation assets, animated project models, or deployment changes.
- Do not install animation or WebGL dependencies.
- Do not rewrite verified facts or invent metrics.
- Do not work ahead “just in case.”

At the end of Phase 1:
- provide the content inventory,
- show the chosen project ranking and evidence,
- provide desktop and mobile static layouts,
- provide screenshots,
- list unresolved factual questions,
- list files changed,
- run Phase 1 checks,
- create a clean Git checkpoint when permitted,
- update the phase-state file,
- and stop with the exact status:

[[STOP: OWNER APPROVAL REQUIRED]]
Waiting for either:
REVISE PHASE 1: <feedback>
or
APPROVE PHASE 1

Do not continue until I explicitly send APPROVE PHASE 1.
```

If the skill is not installed or not discovered, continue by following `AGENTS.md` and the prompt files directly. Report the missing skill once; do not treat that as permission to skip the workflow.


---

# Master Codex Orchestrator — Résumé + Interactive Portfolio

You are acting as a senior product designer, frontend engineer, motion designer, accessibility specialist, information architect, technical copy editor, and verification lead.

Your task is to redesign and rebuild the personal résumé/portfolio website for:

**Fatgezim “Zim” Bela**

The finished experience should communicate the intersection of:

- neuroscience and computational research,
- medicine,
- behavioral science and applied behavior analysis,
- data science and data engineering,
- software and automation,
- entrepreneurship and technical leadership.

The site should feel like a premium **neuro-technology command center** with restrained video-game language. It must remain credible, readable, fast, accessible, and immediately useful to recruiters, researchers, collaborators, clients, and partners.

Do not produce a generic developer portfolio. Do not turn the résumé into a toy. The visual system may be cinematic and spatial, but facts, hierarchy, and usability always win.

---

## 1. Non-negotiable phased workflow

This project must not be implemented all at once.

### Phase 0 — Audit and evidence

Inspect the complete repository and all supplied source material. Create a factual inventory, a route/component audit, a project list, a conflict log, and a project ranking.

### Phase 1 — Content, information architecture, and static layout

Build only:

- structured résumé data,
- factual copy,
- project selection,
- section order,
- navigation structure,
- semantic components,
- responsive static desktop and mobile layouts,
- static placeholders for future visuals and micro-demos,
- screenshots and a review report.

Do not add final motion, 3D libraries, parallax, elaborate effects, or generated visual assets in Phase 1.

### Required owner gate

At the end of Phase 1, stop completely and output:

```text
[[STOP: OWNER APPROVAL REQUIRED]]
Waiting for either:
REVISE PHASE 1: <feedback>
or
APPROVE PHASE 1
```

Only the exact phrase `APPROVE PHASE 1` authorizes Phase 2.

### Phase 2 — Visual polish, imagery, interaction, motion, and 3D

After approval, create the final visual system, original image assets, scroll effects, 3D depth, hover/focus/tap micro-demos, and other interactive features.

### Phase 3 — QA, optimization, deployment, and documentation

Complete accessibility, performance, responsiveness, SEO, deployment, testing, and documentation.

Do not work ahead across phases. Do not hide future-phase implementation inside “temporary” code.

---

## 2. Source material and factual accuracy

Use the repository, current portfolio, résumé files, project documentation, screenshots, deployed applications, and owner-provided materials as evidence.

Known career anchors from earlier material include:

- Fatgezim “Zim” Bela
- founder/owner leadership connected to NeuroPathLabs and BelaDataLabs
- medical education at Ross University School of Medicine, expected graduation previously listed as 2028
- Board Certified Behavior Analyst credential previously listed from 2025
- data science and data engineering experience previously listed as beginning around 2013
- education and work spanning neuroscience, chemistry, special education, ABA, medicine, research, software, and data

These anchors are not permission to guess. Verify exact wording, dates, legal/public brand names, degree titles, current status, and links.

Never invent:

- credentials,
- publications,
- awards,
- employment dates,
- client names,
- user counts,
- revenue,
- adoption,
- conversion,
- outcomes,
- time saved,
- accuracy percentages,
- clinical efficacy,
- research findings,
- app capabilities,
- testimonials.

When sources conflict:

1. record the conflict,
2. use the most reliable current source only when confidence is high,
3. otherwise keep a neutral placeholder,
4. surface the question in the Phase 1 approval report.

Keep résumé/project content in typed, structured data separate from UI components.

---

## 3. Project selection and featured work

Start with the candidate set below, then inspect all available materials and score every candidate with `project-briefs/PROJECT_SELECTION_MATRIX.md`.

Priority candidates:

1. NeuroPathLabs / NeuroPath LLC
2. BelaDataLabs / Bela Data Lab Academy
3. RBT-Pro Prep / RBT Competency Prep
4. Rethink Automations
5. Bela Caregiver Library / Caregiver Academy
6. Verified neuroscience, neuroimaging, medical, research, data, or engineering projects found in the source material

Select approximately four to six featured projects. The homepage should show the strongest, most evidence-rich work—not every project ever created.

Each featured project must eventually include:

- exact verified name,
- one-sentence value proposition,
- problem,
- audience,
- Zim’s role,
- methods/technologies,
- verified outcome or current status,
- evidence links,
- a static poster,
- an accessible interactive micro-demo after Phase 1 approval.

Use the project-specific stories in `project-briefs/FEATURED_PROJECTS.md`.

---

## 4. Site structure

Create a coherent single-page experience with deep links or a small number of routes only when that improves usability.

### 4.1 Hero / start screen

Include:

- Fatgezim “Zim” Bela
- concise multidisciplinary positioning
- current verified roles
- a clear view-work action
- résumé/download/print action when a verified résumé file exists
- contact action
- a static Phase 1 placeholder for a future neural/data spatial visual
- a professional summary card with core domains and current focus

After Phase 1 approval, the hero may include a restrained animated neural/data structure, layered depth, pointer parallax, and an optional short entrance sequence. It must be fast, skippable, reduced-motion safe, and never delay access to content.

### 4.2 Character profile / about

Explain the connective story among neuroscience, medicine, behavioral science, data, software, and entrepreneurship.

Use concise factual language. Creative labels may appear as secondary labels, but standard headings such as “About” must remain visible.

### 4.3 Featured project lab

This is a major section, not a small card grid.

For each selected app/project, show:

- title and category,
- concise problem statement,
- role and contribution,
- verified technology/method badges,
- evidence or live link,
- static poster,
- micro-demo stage,
- accessible play/pause or open-demo control.

After Phase 1 approval, the cards should respond to hover, keyboard focus, and tap. A project may lift from the page, rotate slightly in 3D, and begin a truthful 4–8 second workflow loop. The loop should demonstrate an actual product flow, not a random UI animation.

### 4.4 Experience / career quest map

Present experience as a readable chronological timeline with optional command-center or mission-log styling.

Every role should include:

- organization,
- title,
- dates,
- location when verified,
- responsibilities,
- selected accomplishments,
- relevant disciplines/technologies.

A spatial or connected-node treatment may supplement the timeline after Phase 1 approval, but an ordinary chronological representation must remain accessible.

### 4.5 Skill tree

Organize skills into branches:

- data science and engineering,
- software and automation,
- neuroscience and computational research,
- behavioral science and ABA,
- clinical and medical knowledge,
- leadership and entrepreneurship,
- research methods and scientific communication.

Do not use unsupported percentages. Use evidence-based labels such as Core, Advanced, Applied, Working Knowledge, and Developing.

### 4.6 Research lab

Show verified research, neuroimaging, scientific work, publications, posters, presentations, datasets, and computational projects.

For each item show:

- problem,
- role,
- methods,
- contribution,
- output,
- supporting link when available.

### 4.7 Founder mode

Explain the verified relationship among NeuroPathLabs, NeuroPath LLC, BelaDataLabs, and Bela Data Lab Academy.

Show missions, products, services, and initiatives only when supported. Never manufacture traction.

### 4.8 Achievements, education, and credentials

Present verified degrees, training, certifications, awards, and milestones with ordinary text labels and dates.

Decorative badges may supplement—but never replace—the information.

### 4.9 Contact

Use verified email, GitHub, LinkedIn, company sites, and résumé links.

Do not add a backend only for a contact form. Prefer a mailto link or an existing verified service.

---

## 5. Interactive project micro-demos

Each featured app project should have a small working model after Phase 1 approval.

A “working model” means a self-contained, sanitized miniature interaction that truthfully demonstrates one or two core workflows. It may use local mock data. It is not merely a looping screenshot.

### Behavior

Desktop:
- Hover or keyboard focus raises the card into depth.
- The demo begins only after a short intentional delay.
- The user can pause, replay, or open the real project.
- Pointer movement may produce subtle, bounded 3D tilt.

Touch:
- First tap activates the preview.
- A separate explicit action opens details or the live project.
- Never rely on hover alone.

Reduced motion:
- Display a static poster.
- Keep explicit “Play demo” and “Open project” actions.
- Remove automatic transforms, parallax, and large-scale movement.

### Implementation options

Preferred order:

1. local React/HTML micro-demo using verified project data,
2. sanitized miniature replica of the real workflow,
3. short locally hosted screen recording with accessible controls,
4. static storyboard when interaction cannot be recreated truthfully.

Avoid cross-origin iframes that fail, leak private state, require auth, or violate framing policy.

### Candidate demo stories

- RBT-Pro Prep: competency map → flashcard review → practice question → progress update.
- Rethink Automations: select queued item → prepare/confirm run → staged automation → readable run log.
- NeuroPathLabs/Bela Data Lab Academy: browse training catalog → open a module → complete a check → view certificate/progress state.
- Bela Caregiver Library: select a family routine → use an interactive tool → generate a practical next-step plan.
- BelaDataLabs: use the strongest verified data/product workflow found in the repository; do not invent a generic dashboard if no such product exists.
- Research/data project: data input → method/analysis → interpretable result, using only shareable verified data.

---

## 6. Visual direction after Phase 1 approval

Desired qualities:

- premium,
- intelligent,
- technical,
- cinematic,
- spatial,
- distinctive,
- highly legible,
- confident,
- restrained.

Suggested foundation:

- deep near-black/navy base,
- high-contrast text,
- restrained violet/cyan/amber/green accents,
- subtle grids and neural/data paths,
- thin luminous borders,
- refined glass or translucent panels only where legibility remains strong,
- a limited number of hero/feature depth scenes,
- clean modern typography for all substantive copy,
- arcade/mono accent type only for small labels.

Avoid:

- generic template layouts,
- constant neon,
- glowing body text,
- excessive glassmorphism,
- decorative blobs,
- noisy gradients,
- fake loading delays,
- childish game art,
- arbitrary skill meters,
- motion on every element,
- perspective so strong that text becomes hard to read.

---

## 7. Scroll, pop-in/out, 3D, and spatial motion

After Phase 1 approval, implement a motion hierarchy rather than unrelated effects.

### Level 1 — utility motion

- focus and hover feedback,
- button state changes,
- accordion/expand transitions,
- navigation indicator,
- progress changes.

### Level 2 — section entrances and exits

- elements may fade, translate, scale, or rotate gently as they enter,
- selected elements may recede or soften as they leave,
- no essential content should disappear permanently,
- avoid full-page scroll hijacking.

### Level 3 — project-card depth

- card lift,
- bounded rotateX/rotateY,
- layered shadow,
- internal screen depth,
- micro-demo playback.

### Level 4 — major narrative moments

Use only a few:

- hero neural/data scene,
- featured-project “lab” transition,
- career/research depth corridor or connected map,
- final contact scene.

### Scroll-in/out requirements

- Use IntersectionObserver, Motion, or an equivalent lightweight system.
- Set clear thresholds and reversible states.
- Avoid replaying distracting sequences every time the user moves a few pixels.
- Ensure content remains reachable when JavaScript fails.
- Use `will-change` sparingly.
- Prefer transform and opacity.
- Test low-power mobile behavior.

### 3D requirements

- Prefer CSS 3D for cards and panels.
- Use Three.js/WebGL only for one or two high-value scenes.
- If WebGL is used, lazy-load it, cap device pixel ratio, pause off-screen, and supply a static fallback.
- Do not make the site depend on WebGL for navigation or content.

---

## 8. Action and plugin markers

Use the marker contract in `design/PLUGIN_ACTION_MARKERS.md`.

Important checkpoints include:

```text
[[USE PLAN MODE]]
[[USE SUBAGENT: REPO AUDIT]]
[[USE SUBAGENT: CONTENT VERIFICATION]]
[[USE SUBAGENT: VISUAL QA]]
[[USE PLUGIN: FILE/DRIVE SEARCH]]
[[USE PLUGIN: WEB SEARCH]]
[[USE PLUGIN: FIGMA]]
[[CREATE IMAGE]]
[[USE PLUGIN: BROWSER VERIFY]]
[[USE PLUGIN: GITHUB]]
[[GIT CHECKPOINT]]
[[CAPTURE SCREENSHOTS]]
[[RUN ACCESSIBILITY REVIEW]]
[[STOP: OWNER APPROVAL REQUIRED]]
```

If a named plugin is unavailable, use the closest supported capability and document the fallback. Do not claim a plugin ran when it did not.

Image generation belongs to Phase 2 unless a disposable, non-production sketch is explicitly needed for Phase 1 review.

---

## 9. Technical implementation

First inspect the existing stack. Preserve a sound architecture.

When a rebuild is justified, prefer a static-deployable, typed frontend such as:

- Vite,
- React,
- TypeScript,
- structured data modules,
- semantic HTML,
- scoped CSS or a well-controlled utility system,
- lightweight motion,
- optional lazy-loaded WebGL.

Do not introduce:

- a backend,
- authentication,
- database,
- analytics platform,
- CMS,
- paid dependency,
- or complex state library

unless the existing project genuinely requires it and the owner approves the scope.

Keep components focused. Avoid one oversized application file.

Suggested organization, adapted to the repository:

```text
src/
  components/
    layout/
    navigation/
    hero/
    profile/
    projects/
    timeline/
    skills/
    research/
    founder/
    achievements/
    education/
    contact/
    ui/
  content/
    resume.ts
    projects.ts
    research.ts
  motion/
  hooks/
  styles/
  assets/
```

Project demos should be isolated so they do not destabilize the résumé content.

---

## 10. Responsive design

Design mobile-first and verify:

- 360–390 px mobile,
- large mobile,
- tablet,
- laptop,
- wide desktop.

Requirements:

- no horizontal overflow,
- readable text,
- generous touch targets,
- no hover-only actions,
- project demos that adapt rather than shrink,
- 3D disabled or reduced when it harms touch usability,
- navigation that remains obvious,
- backgrounds that do not overwhelm copy,
- acceptable performance on ordinary mobile hardware.

---

## 11. Accessibility

Treat accessibility as a release requirement.

Include:

- semantic landmarks,
- logical headings,
- skip link,
- keyboard navigation,
- visible focus,
- sufficient contrast,
- meaningful links,
- real buttons for actions,
- alt text for meaningful images,
- decorative assets hidden from assistive technology,
- reduced-motion behavior,
- labels for icon-only controls,
- status text in addition to color,
- accessible play/pause controls,
- static alternatives for 3D and animated demos.

Test at 200% zoom and with keyboard-only navigation.

---

## 12. SEO and professional usability

Add or improve:

- page title,
- meta description,
- Open Graph metadata,
- social preview,
- canonical URL when appropriate,
- favicon,
- crawlable text,
- structured headings,
- print-friendly résumé view,
- downloadable résumé when verified.

A recruiter should understand Zim’s current direction, strongest work, core skills, and contact path within the first few moments.

---

## 13. Performance

Set budgets appropriate to the existing app. As a default target:

- avoid large autoplay videos,
- lazy-load project media,
- optimize SVG and raster assets,
- keep initial JavaScript modest,
- lazy-load motion/3D modules,
- prevent layout shifts,
- pause off-screen animation,
- cap texture sizes and device pixel ratio,
- keep interactions responsive,
- verify production build behavior.

Do not sacrifice readability or speed for visual spectacle.

---

## 14. Deployment and documentation

Prepare reliable deployment to the verified target, likely GitHub Pages unless the repository says otherwise.

Confirm:

- correct base path,
- correct asset URLs,
- correct routing,
- production build,
- deployment workflow,
- no secrets,
- working links,
- README instructions,
- content editing instructions,
- reduced-motion notes,
- project-demo maintenance notes.

Do not claim deployment succeeded unless directly verified.

---

## 15. Phase-specific deliverables

### Phase 0 deliverables

- repository audit,
- content source inventory,
- conflict log,
- project inventory,
- project ranking,
- proposed information architecture,
- risk list.

### Phase 1 deliverables

- structured content data,
- final proposed copy,
- desktop static layout,
- mobile static layout,
- accessible static project cards,
- placeholders for future micro-demos and major visuals,
- screenshots,
- files changed,
- checks run,
- factual questions,
- owner decision list.

Then stop.

### Phase 2 deliverables

- final design tokens,
- original visual assets,
- project micro-demos,
- hover/focus/tap behavior,
- scroll-in/out motion,
- 3D depth,
- reduced-motion variants,
- browser screenshots/video evidence,
- performance notes.

### Phase 3 deliverables

- accessibility report,
- responsive QA,
- performance report,
- SEO,
- final build,
- deployment status,
- README,
- final implementation report.

Never state that something works unless you tested or directly verified it.


---

# Phase 1 Prompt — Content and Static Layout Only

This phase exists to prevent expensive visual work from being built on unapproved content or structure.

## Start

```text
[[USE PLAN MODE]]
[[USE SUBAGENT: REPO AUDIT]]
[[USE SUBAGENT: CONTENT VERIFICATION]]
[[USE PLUGIN: FILE/DRIVE SEARCH]]
[[USE PLUGIN: WEB SEARCH]]
[[GIT CHECKPOINT]]
```

Use only capabilities that are available. Document fallbacks.

## 1. Audit before editing

Inspect:

- current framework and build tooling,
- routes and components,
- content/data files,
- public assets,
- current deployed site when accessible,
- résumé and biography sources,
- project repos/docs/screenshots,
- tests and deployment configuration.

Create:

- `docs/portfolio/repo-audit.md`
- `docs/portfolio/content-inventory.md`
- `docs/portfolio/conflicts-and-questions.md`
- `docs/portfolio/project-ranking.md`
- `docs/portfolio/phase-1-plan.md`

Do not change production UI until the audit and plan are written.

## 2. Select featured projects

Score all projects with `project-briefs/PROJECT_SELECTION_MATRIX.md`.

The candidate set must include:

- NeuroPathLabs / NeuroPath LLC
- BelaDataLabs / Bela Data Lab Academy
- RBT-Pro Prep / RBT Competency Prep
- Rethink Automations
- Bela Caregiver Library / Caregiver Academy
- evidence-rich neuroscience, neuroimaging, medical, research, data, or engineering work

Choose approximately four to six. Explain exclusions.

Do not include a project merely because it was named in the prompt. Include it because the evidence supports a strong, truthful case.

## 3. Create structured content

Move résumé/project information into typed data or a clear structured format.

Each project record should include:

- id,
- verified public name,
- aliases,
- status,
- summary,
- problem,
- audience,
- role,
- methods/technologies,
- verified outputs/outcomes,
- evidence links,
- privacy notes,
- demo story,
- uncertainty flags.

Use `schemas/PROJECT_SCHEMA.json`.

## 4. Write and edit copy

Write concise, factual copy for:

- hero,
- about,
- featured projects,
- experience,
- skills,
- research,
- founder section,
- education and credentials,
- contact.

Do not use unsupported hype or metrics. Avoid repeated buzzwords.

## 5. Build static layout

Implement semantic, responsive layouts with ordinary CSS/approved existing styling only.

Allowed:

- spacing,
- typography,
- static color tokens,
- basic responsive grids,
- static icons already licensed in the repo,
- static project poster placeholders,
- accessible tabs/accordions when necessary,
- focus states,
- static screenshots for review.

Not allowed:

- animation libraries,
- WebGL/Three.js,
- parallax,
- scroll-trigger animation,
- 3D tilt,
- autoplay,
- generated production assets,
- elaborate hover demos,
- final shader/background systems,
- major dependency additions.

Every future effect area should be represented by a clearly labeled static placeholder so the owner can approve hierarchy and dimensions.

## 6. Required layouts

Provide and test:

- desktop hero,
- mobile hero,
- featured project lab,
- one project detail state,
- experience/timeline,
- skill/research/founder sections,
- contact/footer,
- mobile navigation,
- print résumé view or documented plan.

## 7. Phase 1 verification

Run applicable:

- lint,
- type check,
- unit tests,
- static build,
- browser smoke test,
- mobile viewport test,
- keyboard navigation test,
- contrast review,
- link check,
- no-horizontal-overflow check.

```text
[[USE PLUGIN: BROWSER VERIFY]]
[[CAPTURE SCREENSHOTS]]
[[RUN ACCESSIBILITY REVIEW]]
```

## 8. Phase 1 report

Report:

1. repository findings,
2. chosen projects and scores,
3. projects excluded and why,
4. final proposed content,
5. section order,
6. desktop layout,
7. mobile layout,
8. files changed,
9. commands and checks run,
10. factual conflicts/questions,
11. decisions required from the owner,
12. screenshots.

Update `phase-state.json`:

- phase = 1
- phaseName = "Content and static layout awaiting approval"
- contentLayoutComplete = true
- phase1Approved = false

Create a Git checkpoint when permitted.

Then stop exactly as follows:

```text
[[STOP: OWNER APPROVAL REQUIRED]]
Waiting for either:
REVISE PHASE 1: <feedback>
or
APPROVE PHASE 1
```

Do not begin future work in the same turn.
