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
