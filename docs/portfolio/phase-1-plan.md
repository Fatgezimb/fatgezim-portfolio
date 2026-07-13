# Actionable Phase 1 Plan

Status: Ready to begin after Phase 0

Phase 1 scope: Content, information architecture, copy, and static responsive layout only.

## Phase 1 outcome

Replace the starter skeleton with an evidence-backed, semantic, responsive resume/portfolio layout that the owner can review and approve before visual effects or project micro-demos are built.

Phase 1 ends with the exact owner gate. It does not include animation libraries, WebGL, parallax, generated production imagery, scroll effects, 3D tilt, animated demos, or deployment changes.

## Working assumptions

- Keep the current Next.js/React/TypeScript/Vinext stack for Phase 1.
- Build static-deployable UI with no required auth, database, worker state, or backend.
- Use structured TypeScript data separate from components.
- Use the recommended six-project set, with Role Atlas available as the public-safe substitute for NeuroPath Insight.
- Use neutral/omitted wording for unresolved resume facts.
- Keep all current concept visuals outside the production asset path.

## Ordered implementation steps

### 1. Establish typed content

Create:

```text
app/content/resume.ts
app/content/projects.ts
app/content/research.ts
app/content/site.ts
```

Requirements:

- encode source/evidence notes and uncertainty flags,
- use no raw contact/address data in component files,
- represent unresolved dates as explicit review fields, not guessed strings,
- conform project records to `schemas/PROJECT_SCHEMA.json`.

### 2. Resolve starter-only architecture

- Replace `SkeletonPreview` on `/`.
- Keep the starter component only until the new static page passes smoke tests, then remove it in the same Phase 1 checkpoint.
- Do not activate `chatgpt-auth.ts`, D1, Drizzle, or example APIs.
- Keep the resume usable without JavaScript-driven interactions.

### 3. Build semantic section components

Suggested structure:

```text
app/components/
  SiteHeader.tsx
  Hero.tsx
  About.tsx
  FeaturedProjects.tsx
  ProjectCard.tsx
  Experience.tsx
  Skills.tsx
  Research.tsx
  FounderContext.tsx
  EducationCredentials.tsx
  Contact.tsx
  SiteFooter.tsx
```

Required semantics:

- skip link,
- one `h1`, logical heading order,
- landmark regions,
- real links/buttons,
- visible focus states,
- meaningful static poster labels,
- no essential information in color alone.

### 4. Implement the approved narrative order

1. Hero.
2. About.
3. Featured work.
4. Experience.
5. Skills.
6. Research & scientific work.
7. Founder/company context.
8. Education and credentials.
9. Contact/footer.

Keep standard section names visible even if secondary command-center labels are used.

### 5. Build static project cards

Each selected project card must show:

- verified public name,
- concise problem/value statement,
- Zim's verified or explicitly provisional role,
- verified stack/method tags,
- current status,
- public/evidence link when safe,
- privacy/scope boundary where relevant,
- a clearly labeled static placeholder for the future demo.

No card may autoplay, tilt, parallax, animate workflow frames, or embed a private/authenticated page.

### 6. Add responsive static layout

Test at minimum:

- 360 px,
- 390 px,
- 768 px,
- 1024/1280 px,
- 1440/1600 px.

Requirements:

- mobile-first flow,
- no horizontal overflow,
- readable line lengths,
- stable navigation,
- project placeholders that reflow rather than shrink,
- touch targets at least 44 CSS px where practical.

### 7. Add print/resume behavior

- Create print CSS for the verified subset of experience, education, credentials, skills, and contact.
- Do not expose the stale D19 PDF.
- Keep `Download resume` disabled or labeled pending until a sanitized verified PDF is supplied/generated from approved content.

### 8. Fix baseline verification gaps relevant to Phase 1

- Resolve or intentionally exclude the unused Cloudflare/D1 typing surface so `tsc --noEmit` passes.
- Replace starter-only rendered HTML assertions with resume semantics.
- Keep the package validation check.
- Do not make deployment changes.

### 9. Run Phase 1 verification

Required evidence:

```text
npm run lint
npx tsc --noEmit --incremental false
npm test
npm run build
python3 scripts/validate-pack.py
```

Browser/manual checks:

- desktop and mobile smoke tests,
- keyboard-only traversal,
- visible focus,
- 200% zoom/reflow,
- reduced-motion static behavior,
- no horizontal overflow,
- link check,
- console errors,
- print preview.

Capture representative desktop and mobile screenshots for owner review.

### 10. Produce the Phase 1 owner report

Include:

1. final proposed copy,
2. selected/excluded projects,
3. section order,
4. desktop and mobile screenshots,
5. files changed,
6. checks run and exact results,
7. unresolved factual questions,
8. decisions required from the owner,
9. known limitations.

Update `phase-state.json` to Phase 1 awaiting approval and create a separate Git checkpoint.

Then stop with:

```text
[[STOP: OWNER APPROVAL REQUIRED]]
Waiting for either:
REVISE PHASE 1: <feedback>
or
APPROVE PHASE 1
```

## Owner confirmations to request during Phase 1

The build does not need to block on all answers. Use safe placeholders, then request confirmation for:

- Ross degree/status/date,
- B.S. year,
- current BCBA employer/title,
- credentials/licenses,
- 1331 Recordz versus IronGlassByte,
- Connex and ABC/Hi-Five dates,
- TMCI,
- BU program status,
- headline,
- public email/phone choice,
- founder/company title,
- NeuroPath Insight versus Role Atlas as project six.

## Explicitly deferred

- final palette and visual system,
- production image generation,
- logos/mascots beyond verified existing assets,
- motion and scroll reveals,
- 3D and WebGL,
- interactive project micro-demos,
- authentication/payments/data integrations,
- deployment target and workflow,
- SEO/social image finalization.

Those belong to later approved phases.
