---
name: portfolio-phase-gate
description: Build or redesign Fatgezim “Zim” Bela's resume and interactive portfolio in strict approval-gated phases. Use for portfolio content, layout, featured projects, image generation, motion, 3D, hover demos, accessibility, QA, and deployment. Never proceed past Phase 1 without the exact approval phrase.
---

# Portfolio Phase Gate

1. Read the repository root `AGENTS.md`, `PLANS.md`, and `phase-state.json`.
2. Read `prompts/00_MASTER_ORCHESTRATOR.md`.
3. Determine the current phase from evidence, not assumptions.
4. If `phase1Approved` is false:
   - run Phase 0 and Phase 1 only,
   - follow `prompts/01_PHASE_1_CONTENT_LAYOUT.md`,
   - do not install motion/WebGL dependencies,
   - do not generate production visual assets,
   - stop for the exact owner approval phrase.
5. Treat only `APPROVE PHASE 1` as approval. Similar wording is not sufficient.
6. If the owner requests revisions, remain in Phase 1.
7. After approval:
   - follow `prompts/03_PHASE_2_VISUAL_MOTION.md`,
   - use `design/PLUGIN_ACTION_MARKERS.md`,
   - build truthful accessible project micro-demos,
   - preserve approved content and layout.
8. Run Phase 3 only after Phase 2 is complete or when the owner explicitly requests completion.
9. Update `phase-state.json` at every phase boundary.
10. Never invent résumé or project facts.
11. Never expose PHI, client information, secrets, or private data.
12. Report exact tools, checks, and fallbacks used.

Read these references when relevant:

- `references/approval-gates.md`
- `references/action-markers.md`
- `../../../project-briefs/FEATURED_PROJECTS.md`
- `../../../project-briefs/PROJECT_SELECTION_MATRIX.md`
- `../../../design/DESIGN_SYSTEM_AND_MOTION_SPEC.md`
- `../../../design/INTERACTION_STORYBOARDS.md`
