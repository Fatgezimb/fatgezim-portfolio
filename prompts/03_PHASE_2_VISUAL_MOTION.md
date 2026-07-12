# Phase 2 Prompt — Visual System, Motion, 3D, and Project Micro-Demos

Do not use this prompt unless `phase-state.json` says `phase1Approved: true` or the owner has explicitly sent `APPROVE PHASE 1`.

## 1. Lock approved structure

Read the Phase 1 report and approval feedback. Preserve:

- approved copy,
- section order,
- selected projects,
- data model,
- desktop hierarchy,
- mobile hierarchy.

Any necessary structural change must be explained before implementation.

## 2. Create final visual system

```text
[[USE PLUGIN: FIGMA]]
[[CREATE IMAGE]]
[[USE SKILL: ACCESSIBILITY]]
```

Use available capabilities; document fallbacks.

Create or refine:

- color tokens,
- typography scale,
- spacing,
- borders,
- elevation,
- glow limits,
- grid/path motifs,
- icon style,
- project poster system,
- static fallbacks,
- social preview art.

Generated images must be original and must not imitate protected brand assets. Do not generate or fabricate photographs of the owner without a supplied reference image and explicit approval.

## 3. Implement project micro-demos

Follow `design/INTERACTION_STORYBOARDS.md`.

Each selected app project must have:

- static poster,
- local sanitized micro-demo,
- hover behavior,
- keyboard-focus behavior,
- tap behavior,
- play/pause/replay controls when animation is nontrivial,
- reduced-motion poster,
- open-project/details action,
- truthful data and labels.

Do not use unverified statistics or fake “live” data.

## 4. Implement motion hierarchy

Use `design/DESIGN_SYSTEM_AND_MOTION_SPEC.md`.

Required categories:

- subtle utility motion,
- section scroll-in and scroll-out states,
- bounded pop-in/out depth,
- project-card 3D lift and tilt,
- internal app-demo motion,
- one or two major spatial scenes,
- reduced-motion alternatives.

Avoid scroll hijacking and continuous background noise.

## 5. 3D strategy

Prefer CSS 3D for cards/panels.

Use WebGL/Three.js only if:

- the effect is high-value,
- it is lazy-loaded,
- it has a static fallback,
- it pauses off-screen,
- it performs acceptably on mobile,
- it does not block content.

## 6. Browser verification

```text
[[USE PLUGIN: BROWSER VERIFY]]
[[USE SUBAGENT: VISUAL QA]]
[[CAPTURE SCREENSHOTS]]
[[RUN ACCESSIBILITY REVIEW]]
```

Verify:

- hover,
- keyboard focus,
- touch/tap,
- reduced motion,
- 200% zoom,
- no horizontal overflow,
- no console errors,
- stable layout,
- project demo controls,
- off-screen animation pause,
- representative mobile and desktop performance.

## 7. Report

Report:

- design system,
- assets created,
- micro-demos implemented,
- motion and 3D behavior,
- fallbacks,
- files changed,
- commands/tests,
- screenshots,
- known limitations,
- performance observations.

Update `phase-state.json`:

- phase = 2
- phaseName = "Visual, motion, and interaction complete"
- phase1Approved = true
- visualMotionComplete = true

Then proceed to Phase 3 only if the owner requested a complete finish in the approval message; otherwise stop for a Phase 2 review.
