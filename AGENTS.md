# Repository Instructions for Codex

## Mandatory phase gate

This redesign is intentionally staged. Read `PLANS.md` and the relevant prompt before editing.

- Phase 0: audit and evidence.
- Phase 1: content, copy, information architecture, and static responsive layout.
- Phase 2: visual system, imagery, interaction, motion, 3D, and project micro-demos.
- Phase 3: QA, accessibility, performance, SEO, deployment, and documentation.

**Do not start Phase 2 until the owner sends the exact phrase `APPROVE PHASE 1`.**

Before approval, do not add animation libraries, WebGL/Three.js, parallax, final generated imagery, production project-preview animation, or deployment changes.

## Source of truth

- Inspect the repository, résumé sources, project files, and current deployed site.
- Preserve verified names, roles, dates, degrees, credentials, links, and project facts.
- Never invent metrics, users, revenue, client names, research findings, publications, awards, or performance claims.
- When sources disagree, keep the current verified repository value, record the conflict, and ask for resolution in the Phase 1 report.
- Do not expose PHI, client names, therapy records, secrets, private URLs, or personal addresses.

## Featured work

The initial candidate set is:

- NeuroPathLabs / NeuroPath LLC
- BelaDataLabs / Bela Data Lab Academy
- RBT-Pro Prep / RBT Competency Prep
- Rethink Automations
- Bela Caregiver Library / Caregiver Academy
- Verified neuroscience, neuroimaging, data, medical, research, or engineering projects found in the source material

Use `project-briefs/PROJECT_SELECTION_MATRIX.md` to score candidates. Prefer evidence-rich, visually demonstrable work. Do not force every candidate onto the final homepage.

## Interaction requirement after Phase 1 approval

Each featured app project needs an accessible micro-demo, not merely a decorative screenshot.

- Desktop: hover and keyboard focus may play a short, truthful workflow loop.
- Touch: tap opens or plays the same preview.
- Reduced motion: show a static poster and explicit controls.
- Do not embed third-party pages that prohibit framing.
- Do not fake product capabilities. Build sanitized miniature replicas from verified screens/workflows when a live embed is unsuitable.

## Quality rules

- Mobile-first and keyboard accessible.
- Respect `prefers-reduced-motion`.
- No scroll hijacking.
- No essential information conveyed by animation or color alone.
- Use semantic HTML, visible focus states, sufficient contrast, and meaningful labels.
- Keep the résumé understandable without JavaScript, WebGL, or animation.
- Keep the console free of errors.
- Test at representative mobile, tablet, laptop, and wide-desktop sizes.
- Preserve GitHub Pages compatibility unless repository evidence supports a different deployment target.

## Action markers

Resolve every `[[...]]` marker using an available built-in capability, skill, plugin, MCP tool, or documented fallback. See `design/PLUGIN_ACTION_MARKERS.md`.

## Verification

Discover the repository's actual commands before running them. At minimum, run applicable lint, type-check, tests, build, browser smoke tests, keyboard checks, reduced-motion checks, and link checks. Never claim success without evidence.
