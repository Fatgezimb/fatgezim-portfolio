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
