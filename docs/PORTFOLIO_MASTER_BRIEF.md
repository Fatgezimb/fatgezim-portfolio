# CODEX MASTER PROMPT — ZIM'S INTERACTIVE PORTFOLIO TAKEOVER

## Your mission
Act as creative director, senior full-stack engineer, 3D experience designer, technical writer, QA engineer, and release owner. Take over my existing portfolio and transform it into an extraordinary personal storytelling experience. This is a substantial rebuild, not a visual reskin. Execute changes, test them, critique them, and iterate until the result is memorable, coherent, technically excellent, and enjoyable to explore. Keep this brief in the repository as `docs/PORTFOLIO_MASTER_BRIEF.md` and maintain `docs/IMPLEMENTATION_STATUS.md` throughout. Continue autonomously except for genuine access, permission, or factual blockers.

**Core outcome:** The site should feel like meeting Fatgezim “Zim” Bela: an unusually curious, creative, hardworking technologist who can lead technology, architect products, write code, work with data, and connect neuroscience, medicine, and design. A visitor should want to explore and a hiring manager should want to meet me. The PDF is the formal resume; the site is the story and the proof. Be playful without being gimmicky, polished without feeling corporate, and ambitious without becoming overbuilt.

## Facts and references
Name: Fatgezim “Zim” Bela. Email: fatgezimbela1@gmail.com. GitHub: https://github.com/Fatgezimb . LinkedIn: https://www.linkedin.com/in/fatgezimzimbela/ . Portfolio: https://fatgezimb.github.io/fatgezim-portfolio/ . CTO at Create 13 Group (approximately 2018–present; verify precise date before treating as confirmed). CTO/founder of NeuroPath LLC; co-builder of Bela Data Lab. Experience spans full-stack software, data science, AI/automation, systems architecture, scientific computing, behavioral science, medical education, creative direction, and growing experience with Blender and 3D modeling. B.S. Neuroscience (George Mason, 2017); M.Ed. Special Education (George Mason, 2020); ABA graduate certificate (2020); medical education at Ross University School of Medicine, not yet a completed MD. BCBA is relevant interdisciplinary context, but this is a TECHNOLOGY portfolio.

Read all packaged reference documents and inspect actual repos and live apps before publishing specific claims. The friend's M.C. Dean resume is a reference for technical specificity, not a layout to copy. Never fabricate performance metrics, revenue, team sizes, employment dates, achievements, production status, or skills. For confidential premium e-commerce work, never identify the client, brand, site, repo, images, or proprietary details anywhere public, including alt text, metadata, filenames, and screenshots. Refer to it only as a **confidential premium e-commerce platform**, with non-identifying technical scope that is cleared to share.

## Signature concept — THE INTERACTIVE 3D WORKSPACE
**This is the central experience. Build it, don't just suggest it.** Create a distinctive, beautifully art-directed interactive 3D maker's workspace: part scientist's workbench, part engineer's studio, part creative desk. It should feel personal, crafted, and alive. Five discoverable objects or clusters represent interconnected domains:

1. **Neuroscience:** sculptural neuron, microscope slide, or neural network model. Reveals scientific curiosity, computational neuroscience, and NeuroStack Explorer.
2. **Software:** miniature workstation, modular computer, or elegant circuit sculpture. Reveals full-stack engineering, architecture, applications, and selected builds.
3. **Data:** kinetic data sculpture, graph, or point cloud. Reveals Python, SQL, data engineering, analytics, and interactive dashboards.
4. **Medicine:** medical notebook or anatomical-inspired object. Reveals medical education, applied science, and clinical/learning tools.
5. **Design:** Blender-inspired sculptural object, sketchbook, or material studies. Reveals 3D modeling, interface design, motion, and creative experimentation.

### How the visitor explores
The opening view immediately communicates who I am and invites exploration: e.g., “Explore the workspace” plus a clear “Take the tour” alternative. Each object is discoverable, labeled, clickable/tappable, and keyboard accessible. Selecting an object triggers controlled camera/scene movement and a beautifully designed narrative panel with a brief personal story, relevant skills, and 1–3 verified projects. The visitor can move between objects, close panels, and continue scrolling naturally. The five areas should form one story: curiosity → science → code/data → real-world impact → design → projects → connect. Do not create five disconnected popups. Include an obvious Resume download and Projects shortcut at all times.

### Art direction
Choose a distinctive palette with tasteful color and a few surprising accents; confident editorial typography; atmospheric lighting; crafted materials; expressive but controlled motion; polished microinteractions; and small personal touches. Avoid generic neon cyberpunk, endless floating cards, heavy particles, or novelty for novelty's sake. Design one unforgettable signature interaction rather than dozens of average animations. The experience should feel fun, engaging, human, and premium.

### Technology and performance
Use existing stack when sensible. Three.js / React Three Fiber / Drei, GSAP or Framer Motion, and Blender GLB assets are candidates, not mandatory dependencies. Optimize geometry, textures, loading, bundle size, and draw calls. Higgsfield may be used if connected and useful; don't block execution waiting for it. Use properly licensed or original assets and document provenance. Do not claim Zim personally modeled assets unless confirmed.

### Accessibility and mobile are required
Every 3D object must have an equivalent accessible topic button/list, usable by keyboard, screen reader, and touch. Support reduced motion, WebGL failure, slow network, low-end devices, and a purposeful 2D fallback. No scroll-jacking, autoplay audio, mandatory dragging, focus traps, or interactions that conceal core information. Recompose mobile instead of simply shrinking the desktop scene; test at 320px width. Show useful content before the 3D scene finishes loading and provide recoverable error states.

## Research and creative development
Research at least 8–10 excellent creative portfolios, storytelling websites, and interactive experiences, including examples from Awwwards, Codrops, and Godly when accessible. Inspect actual interaction patterns, not just screenshots. Record links and brief observations in `docs/DESIGN_RESEARCH.md`. Synthesize ideas into an original creative direction; don't copy another site's composition or assets. Define a cohesive design system for typography, color, motion, lighting, responsive layout, project presentation, and interactions. Research should lead quickly to implementation, not a prolonged planning exercise.

## Narrative and copy
Rebuild the site's information architecture around a human story: meet Zim; curiosity and neuroscience; software and data; medicine and impact; design and Blender; selected work; how I build; what I'm exploring; connect. Improve the sequence if you find a stronger one. Make the site skimmable in 45 seconds and rewarding to explore for five minutes. Write naturally, with warmth, confidence, specificity, and occasional humor. No generic AI cadence, inflated self-praise, corporate filler, repetitive contrast statements, or unsupported accomplishments. Let real work demonstrate ability. Keep copy polished, organic, and easy to read.

## Project gallery: actual evidence, not decorative cards
Inspect repos, deployments, docs, screenshots, and existing portfolio. Consider NeuroStack Explorer, Clinical Assessment Portal, USMLE Sprint, RBT Practice Hub, Bela Data Lab, caregiver learning tools, computational neuroscience work, and confidential premium e-commerce engineering. For each featured project, show verified problem, role, architecture/stack, technical challenges, results, and working demo/source links when public. Use real captures and distinctive presentations. Maintain `docs/PROJECT_INVENTORY.md` with canonical URL, repo, deployment status, visibility, evidence, and portfolio readiness. Don't present unfinished work as deployed.

## MANDATORY REPAIRS — NeuroStack and RBT Hub
**NeuroStack Explorer:** Locate actual repository and live deployment; reproduce the loading issue; inspect console, network, routes, base paths, data fetching, asset paths, build and hosting settings; fix root cause; run tests; verify the actual live app loads and core interactions work in desktop and mobile browsers. Only after successful live verification add its canonical live link and compelling project preview to the portfolio. If blocked, report the precise reason and do not claim success.

**RBT Practice Hub:** Its existing link/app is broken. Verify canonical destination, GitHub Pages base path and hash routing, deployment configuration, build output, assets, and runtime behavior. Fix the real issue, not merely the link text. Test the live app and essential user interactions, then update every reference.

**Complete link audit:** Verify internal navigation, deep links, project demos, GitHub/LinkedIn, email, PDF/DOCX downloads, mobile menus, images, canonical URLs, social metadata, buttons, and anchors. A 200 response is insufficient: inspect the actual rendered page and core behavior. Record tested destination, result, and evidence in `docs/LINK_AUDIT.md`. Respect protected preview environments and do not remove access controls.

## Resume and professional positioning
Completely redesign the `/resume` page as a beautiful concise professional overview. The downloadable PDF remains the formal resume. Refresh PDF and editable DOCX with a little personality and color, clean hierarchy, working links, and excellent readability. Keep content accurate and ATS-friendly where possible. Target senior software engineering, data science, AI engineering, solutions architecture, technical product leadership, and technology director/CTO-adjacent opportunities at M.C. Dean and similar employers. Emphasize hands-on engineering, systems thinking, architecture, technical outcomes, and leadership. Use a shared structured content source so the site, PDF, and DOCX do not drift. Do not overemphasize clinical practice.

## Engineering, privacy, and release quality
Inspect git status and existing uncommitted work before editing; preserve changes and avoid destructive operations. Protect private repos, secrets, proprietary code, and confidential client identity. Use semantic markup, meaningful alt text, good contrast, keyboard navigation, error/loading states, responsive layouts, sensible SEO, and reduced-motion behavior. Run production builds, tests, browser smoke tests, link checks, mobile screenshots, and performance checks. Test 3D fallback and resume downloads. Keep existing protected preview/deployment policies. Deploy only with appropriate authorization, then verify live URLs rather than assuming a successful command means a successful release.

## Execution phases (work autonomously)
1. **Discovery:** inspect current code, references, git state, deployments, and existing visuals.
2. **Reproduce & inventory:** document broken links and NeuroStack/RBT failures, baseline screenshots, and project evidence.
3. **Research & concept:** study references, choose one art direction, plan the 3D scene and story flow.
4. **Repair:** fix NeuroStack and RBT Hub; test locally and on live deployments when permitted.
5. **Build signature experience:** implement the five-object 3D workspace, narrative panels, navigation, accessibility, fallback, and mobile treatment.
6. **Rebuild portfolio:** rewrite copy, redesign project case studies, navigation, creative sections, and contact experience.
7. **Rebuild resume:** new website route, updated PDF/DOCX, verified hyperlinks, content parity.
8. **QA:** desktop/mobile, keyboard, screen readers where possible, reduced motion, WebGL off, slow network, performance, console, links, and downloads.
9. **Creative critique:** review actual rendered screenshots and flows; if it still feels like a conventional template, iterate until it has a real signature moment.
10. **Release verification:** logical commits, authorized deployment, live browser checks, and evidence-backed final report.

Maintain `docs/IMPLEMENTATION_STATUS.md` with checkboxes, tests, decisions, and blockers. After context compaction, reread this brief and status before continuing. Do not stop after planning, a hero mockup, or a passing build. Only ask for input when genuinely required. If another repo is inaccessible, continue other independent work and clearly record the blocker.

## Definition of done
- Site is unmistakably and substantially redesigned, with a real interactive 3D workspace and five meaningful story objects.
- Experience is fun, personal, visually impressive, and professionally credible without being cluttered.
- Each domain connects naturally to verified work; visitors can explore via mouse, touch, keyboard, or 2D fallback.
- NeuroStack loads live and appears with a working portfolio preview, or a specific external blocker is documented.
- RBT Hub works live and all references point to the verified destination, or a specific external blocker is documented.
- All links, downloads, navigation, and critical app flows are audited with evidence.
- Resume site, PDF, and editable document are refreshed and consistent; PDF has tasteful color and flair.
- Confidential commerce identity is protected in text, metadata, visuals, and filenames.
- Mobile, reduced-motion, accessibility, and performance tests pass with no critical regressions.
- Final report includes verified live URLs, actual tests, screenshots, changes, and remaining blockers—no invented successes.

**Begin immediately: inspect the workspace and references, reproduce the known failures, research creative directions, and execute the complete takeover. Return with a demonstrably finished experience, not another small facelift.**
