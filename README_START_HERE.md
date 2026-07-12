# Codex Resume + Portfolio Rebuild Pack

Prepared for **Fatgezim “Zim” Bela**  
Pack date: **July 10, 2026**

This folder is a complete handoff for Codex to redesign and rebuild the résumé/portfolio site without attempting the whole project in one pass.

## The required workflow

Codex must work in gated stages:

1. **Phase 0 — Audit and evidence**
2. **Phase 1 — Content, information architecture, copy, and static layout**
3. **Owner review**
4. **Phase 2 — Visual system, generated assets, motion, 3D, interactive project demos**
5. **Phase 3 — Accessibility, performance, QA, deployment, and documentation**

The most important rule is:

> **Codex must stop after Phase 1 and wait for the exact approval phrase `APPROVE PHASE 1`.**

Before that approval, Codex may not add final animation systems, 3D libraries, parallax, image-generation assets, elaborate hover effects, or production deployment changes.

## Fastest way to use this pack

1. Unzip this folder into the root of the résumé/portfolio repository, or attach the entire folder to a Codex project.
2. Open Codex in **Plan mode**.
3. Attach the visual references under `visuals/` when the interface supports image attachments.
4. Paste the contents of `SUBMIT_THIS_TO_CODEX.md`.
5. Review the Phase 1 output using `checklists/PHASE_1_REVIEW_CHECKLIST.md`.
6. Reply with either:
   - `REVISE PHASE 1: ...`
   - `APPROVE PHASE 1`
7. After approval, Codex may proceed to Phase 2 and then Phase 3.

## What is included

- A master, phase-gated Codex prompt
- A concise repo-level `AGENTS.md`
- A reusable Codex skill in `.agents/skills/portfolio-phase-gate/`
- Separate phase prompts and approval templates
- Verified project briefs and a project-selection rubric
- Design, motion, 3D, hover-demo, accessibility, and performance specifications
- Editable SVG wireframes and annotated interaction storyboards
- High-resolution generated concept boards
- A self-contained browser prototype with hover, focus, tap, scroll-reveal, pop-in/out, 3D tilt, and reduced-motion behavior
- Rendered PNG screenshots of the prototype
- JSON templates and QA checklists

## About the action markers

Prompts use markers such as:

- `[[CREATE IMAGE]]`
- `[[USE PLUGIN: BROWSER VERIFY]]`
- `[[USE PLUGIN: FIGMA]]`
- `[[USE SKILL: ACCESSIBILITY]]`
- `[[GIT CHECKPOINT]]`
- `[[STOP: OWNER APPROVAL REQUIRED]]`

These are explicit capability requests, not JavaScript syntax. Codex should map each marker to an installed skill, plugin, MCP tool, built-in capability, or a documented fallback. It must not silently skip a marker.

## Project naming note

Existing materials use more than one form of certain names, including **NeuroPathLabs**, **NeuroPath LLC**, **BelaDataLabs**, and **Bela Data Lab Academy**. Codex must audit the repository and source documents, then use the exact verified public-facing names. It must not “normalize” conflicting names by guessing.

## Visual reference note

The concept boards are directional, not final production screenshots. They intentionally explore a premium neuro-technology command-center aesthetic. Codex should preserve clarity, professional credibility, accessibility, and résumé usability rather than copying every visual detail.
