# Design System and Motion Specification

## Concept

**Neuro-Arcade Command Center**

A professional portfolio that uses depth, connected paths, spatial panels, and game-interface cues to organize a multidisciplinary career. It should feel more like a refined scientific instrument than a game menu.

## Visual hierarchy

1. Content and professional identity
2. Featured work and evidence
3. Navigation and actions
4. Spatial atmosphere
5. Decorative motion

## Suggested concept palette

Use existing verified brand assets first. When no established palette exists, explore:

- Background 0: `#050711`
- Background 1: `#0A1020`
- Surface: `rgba(16, 24, 44, 0.78)`
- Text: `#F5F7FF`
- Muted text: `#A8B3CF`
- Violet accent: `#8B5CF6`
- Cyan accent: `#22D3EE`
- Amber accent: `#F59E0B`
- Green accent: `#22C55E`
- Border: `rgba(148, 163, 184, 0.20)`

Contrast must be tested. Do not use glow as a substitute for contrast.

## Typography

- Use a highly readable contemporary sans serif for headings and body.
- Use a mono/arcade accent only for eyebrow labels, small badges, and data readouts.
- Avoid all-caps paragraphs.
- Maintain comfortable line length and spacing.

## Surfaces and depth

- Small panels: subtle border and low blur.
- Primary cards: stronger separation, restrained glow.
- Project demo stage: layered screen, background plane, and foreground control strip.
- Major depth scene: one clear focal point, not a pile of floating objects.

## Motion durations

- Utility feedback: 120–220 ms
- Card lift/tilt settle: 220–420 ms
- Section entrance: 400–750 ms
- Major narrative transition: 700–1200 ms
- Project workflow loop: 4–8 seconds
- Avoid long blocking sequences.

## Motion easing

Prefer natural, non-bouncy easing for professional content. Use spring behavior only for small depth responses. Prevent overshoot that makes text difficult to track.

## Scroll-in/out

- Each section receives one entrance concept.
- Only selected large elements receive an exit/recede concept.
- Content should remain stable when the user stops scrolling.
- Avoid rapidly toggling between states near thresholds.
- Do not pin more than one short narrative section unless testing shows clear value.

## Pop into/out of screen

Recommended uses:

- selected featured project,
- one milestone in the timeline,
- research artifact,
- final contact card.

Technique:

- `transform: perspective(...) translateZ(...) scale(...)`
- subtle opacity and shadow change
- bounded rotation
- no clipping of focus rings
- reduced-motion static state

## Project card 3D

- Maximum visual tilt should remain modest.
- Reset smoothly on pointer leave and blur.
- Disable pointer-driven tilt on touch.
- Do not tilt the text more than the visual stage; text should remain readable.
- Keep buttons on a stable interaction plane.

## Major spatial scenes

Choose at most two:

1. Hero neural/data lattice or dimensional identity card.
2. Featured-project lab or career/research path.

A third scene is acceptable only if it remains lightweight and distinct.

## Reduced motion

When `prefers-reduced-motion: reduce`:

- no automatic project demo,
- no pointer parallax,
- no large translateZ,
- no scroll-linked transform,
- short opacity changes only,
- static hero art,
- explicit play controls,
- all content visible.

## Performance guardrails

- Lazy-load noncritical assets.
- Prefer CSS transforms and opacity.
- Cap WebGL device pixel ratio.
- Pause off-screen animation.
- Use compressed WebP/AVIF when supported.
- Use SVG for line/path art.
- Avoid large transparent PNGs.
- Avoid simultaneous animation of many box shadows/filters.
