# Plugin and Action Marker Contract

Markers tell Codex when a capability should be considered. They are not executable source code.

## Core markers

### `[[USE PLAN MODE]]`

Create and show a plan before implementation. Keep the phase boundary explicit.

### `[[USE SUBAGENT: <ROLE>]]`

Delegate a bounded investigation when subagents are available. Suggested roles:

- REPO AUDIT
- CONTENT VERIFICATION
- PROJECT RANKING
- VISUAL QA
- ACCESSIBILITY REVIEW
- FINAL CODE REVIEW

The primary agent must consolidate results and remains responsible for accuracy.

### `[[USE PLUGIN: FILE/DRIVE SEARCH]]`

Search attached files or connected storage for résumé/project evidence. Do not copy private files into the public site.

### `[[USE PLUGIN: WEB SEARCH]]`

Use live search for current public links, current documentation, current deployment behavior, or standards. Prefer primary sources.

### `[[USE PLUGIN: FIGMA]]`

Use a Figma capability when installed for editable layout or design-system work. If unavailable, create editable SVG/HTML/CSS artifacts and report the fallback.

### `[[CREATE IMAGE]]`

Use Codex image generation for an original asset when available.

Rules:

- Use only after Phase 1 approval for production assets.
- Do not create a likeness of the owner without a supplied reference image and approval.
- Avoid copyrighted logos and brand imitation.
- Save prompt/source notes.
- Provide accessible alt text and a lightweight fallback.
- If unavailable, create an original SVG/CSS asset and report the fallback.

### `[[USE PLUGIN: BROWSER VERIFY]]`

Open and inspect the local/deployed site. Test interactions, responsiveness, console errors, keyboard access, and screenshots.

### `[[USE PLUGIN: GITHUB]]`

Use for repository context, branches, commits, PRs, checks, or deployment evidence when connected.

### `[[GIT CHECKPOINT]]`

Create or request a reversible checkpoint before/after a phase. Do not overwrite unrelated work.

### `[[CAPTURE SCREENSHOTS]]`

Capture representative desktop, mobile, hover/focus, reduced-motion, and error/empty states.

### `[[RUN ACCESSIBILITY REVIEW]]`

Run automated checks when available and perform manual keyboard, focus, zoom/reflow, labels, reduced-motion, and contrast review.

### `[[STOP: OWNER APPROVAL REQUIRED]]`

Hard stop. Do not continue in the same turn or perform later-phase work.

## Fallback rule

When a named plugin/skill is unavailable:

1. state that it is unavailable,
2. use the closest built-in/local capability,
3. preserve the intended outcome,
4. document the fallback,
5. never claim the original plugin was used.

## Suggested explicit skill invocation

When installed:

```text
$portfolio-phase-gate
```
