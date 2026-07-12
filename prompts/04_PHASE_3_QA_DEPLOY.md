# Phase 3 Prompt — QA, Optimization, Deployment, and Documentation

Run only after approved content/layout and completed visual/motion work.

## Accessibility

```text
[[RUN ACCESSIBILITY REVIEW]]
```

Verify:

- semantics and landmarks,
- heading order,
- skip link,
- keyboard access,
- focus visibility,
- contrast,
- alt text,
- icon labels,
- project-demo controls,
- reduced motion,
- zoom/reflow,
- status announcements,
- no information conveyed by motion or color alone.

## Performance

Measure and improve:

- initial JavaScript,
- image weight,
- lazy loading,
- layout shifts,
- WebGL/3D cost,
- long tasks,
- mobile interaction responsiveness,
- off-screen animation behavior.

Remove decorative work that does not justify its cost.

## Functional QA

```text
[[USE PLUGIN: BROWSER VERIFY]]
[[USE SUBAGENT: FINAL CODE REVIEW]]
[[CAPTURE SCREENSHOTS]]
```

Run applicable:

- lint,
- type check,
- unit/integration tests,
- production build,
- link check,
- browser smoke tests,
- responsive screenshots,
- print view,
- no-JS/static fallback,
- console error check.

## SEO and sharing

Verify:

- title,
- description,
- canonical,
- Open Graph,
- social image,
- favicon,
- crawlable content,
- robots/sitemap when appropriate.

## Deployment

```text
[[GIT CHECKPOINT]]
[[USE PLUGIN: GITHUB]]
```

Confirm verified target configuration, likely GitHub Pages:

- base path,
- routing,
- asset paths,
- workflow,
- build artifact,
- deployment result,
- no secrets.

Do not claim success without checking the actual workflow or deployed page.

## Documentation

Update README with:

- concept,
- tech stack,
- local setup,
- commands,
- content editing,
- project-demo editing,
- motion/reduced-motion notes,
- accessibility,
- deployment,
- project structure.

## Final report

Include:

1. content and structure,
2. design direction,
3. project selection,
4. demos,
5. motion and 3D,
6. accessibility,
7. responsive behavior,
8. performance,
9. tests,
10. build,
11. deployment,
12. files changed,
13. factual questions,
14. remaining limitations.

Update `phase-state.json`:

- phase = 3
- phaseName = "Complete"
- qaComplete = true
