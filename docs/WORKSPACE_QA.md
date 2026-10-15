# Interactive workspace verification

October 15, 2026. Baseline: `731b147`. Implementation branch: `codex/interactive-workspace`.

The new site is released and publicly verified. Source, builds, exported artifacts and actual public interactions pass. The owner-approved refreshed PDF/DOCX are published, and browser downloads match their exact reviewed hashes.

## What changed

Five original objects on a Three.js workbench connect neuroscience, software, data, medicine and design to verified projects and experience. The same topics work through ordinary HTML controls, a guided tour, an original flat illustration and five no-JavaScript stories. The homepage, visual system, professional résumé page and social image share the new lilac, paper and graphite palette.

Seven functional product samples remain available in one project explorer. Live sites load only on request, with a full-site link and a return to the sample. Career facts, joint project credit, research attribution and the 2017 degree correction remain intact.

## Checks and evidence

| Area | Observed result |
| --- | --- |
| Source and build | ESLint, no-emit TypeScript, 14 rendered tests and 7 exporter/adapter tests pass. Root and `/fatgezim-portfolio` builds and static export pass. |
| Exported routes | Homepage, résumé, research index and research detail render and reload at 390/1440px with correct fonts, resource bases, canonicals and no runtime errors or overflow. |
| Responsive layout | 50 section/viewport samples across 320, 390, 768, 1440 and 1920px pass reflow checks. Actual desktop/mobile screenshots were inspected and refined. |
| Automated accessibility | 28 project/theme/viewport scans, 10 workspace topic scans and 3 résumé scans report zero axe violations. These are automated samples, supplemented by keyboard and touch checks. |
| Navigation | Skip link, mobile menu, search/Escape focus return, project Home/End/arrow keys, direct fragments, theme persistence and representative new-tab actions pass. |
| Workspace | All five actual canvas objects select their stories. Topic/tour controls, same-topic selection, mobile heading visibility and Escape focus return pass. |
| Renderer lifecycle | Six alternating flat-mode/context-loss recovery cycles leave one active renderer; previous contexts are released. Selection survives retry. Local production recovery run reports no console errors or warnings; public observations are recorded below. |
| Motion and capability | Reduced motion, Save-Data, 2g/slow-2g and constrained CPU/memory start with the flat explorer and no scene import. Explicit 3D works where supported; reduced-motion 3D remains static. Unsupported WebGL and failed imports retain useful content. |
| Product samples | All seven source-grounded workflows pass at mobile and desktop sizes; 18 combined workflow/contact assertions pass. |
| Live frames | Data Lab, Caregiver Academy, RBT and NeuroStack accept real in-frame navigation at 390/1440px; returning to the sample removes each frame. These checks cover public demo/preview surfaces. |
| No JavaScript | All four routes remain readable; homepage exposes five domain stories and all seven project samples. |
| Résumé | Browser print remains two pages. The refreshed PDF/DOCX were reviewed and explicitly approved. Actual published download bytes match the new approval hashes; both are two pages with ten matching links. |
| Links | Static rendered-target audit checks 177 targets with no failed destinations: 78 HTTP targets across 26 unique requests, 98 existing same-page targets and one email-draft destination. Browser workflow checks above establish behavior beyond HTTP status. |
| Independent review | A second agent reviewed all changes since the baseline and found no remaining actionable correctness, security or accessibility regressions. |

Local evidence lives under `work/master/`: `site-quality.json`, `resume-browser.json`, `integrated/final-production.json`, `integrated/workflows.json`, `integrated/visual.json`, `integrated/final-live-embedded.json`, `final-link-audit.json` and `workspace-qa/REPORT.md`. Scratch evidence is not shipped as public website content.

## Performance observations

The scene is imported progressively, caps device pixel ratio at 1.5 and rendering at 30fps, and stops drawing while paused, offscreen or hidden. Merging neuron branches reduced the sampled draw calls from 189 to 91 per frame. An independent local sample observed 23 rendered ticks in one second; idle checks observed zero draw calls.

The reduced-motion static artifact in local, unthrottled Chrome recorded 136ms LCP, zero layout shift, no long tasks and about 373KB decoded JavaScript. These measurements describe that local test, not real-world performance on every network or device. Live frames are absent before explicit activation.

## Final release gates

- [x] Record NeuroStack's successful scientific gate, canonical deployment and actual public interactions.
- [x] Add and verify its canonical portfolio action and optional live frame.
- [x] Regenerate and visually inspect final résumé candidates with the verified destination; obtain exact-file publication review before replacing approved downloads.
- [x] Run final checks for changed content and publish the portfolio.
- [x] Verify public routes, workspace, samples, frames, touch navigation, metadata, media and reviewed download hashes.
- [x] Record the release commit and successful Pages workflow below.

## Capability choices

The repository's action markers were resolved with local source/ZIP inspection, real browser research, original editable Three.js/SVG/CSS artwork, bounded evidence/repair/QA agents, Chrome/Playwright verification, axe, Git and GitHub CLI. The procedural scene and its browser-rendered social asset are the final artwork; no external model or image asset dependency was needed. Research and rationale are in `DESIGN_RESEARCH.md` and `WORKSPACE_DESIGN.md`.

## App repairs

NeuroStack's root-built JavaScript, fonts and scientific artifacts requested the wrong hosting paths. The repaired base-aware build/export now serves all 24 routes correctly. Scientific and web CI passed, then Pages run `38792732141` deployed `69a08f4`. Fresh live checks cover 48 route/viewport combinations, lab state/reload, chart controls, figures/annotations/tables, computed images, themes/navigation and explicit synthetic fallback. All 24 published scientific artifacts match their original checksums. The scientific release bytes are unchanged. [Repair PR](https://github.com/Fatgezimb/neurostack-explorer/pull/1) and [deployment-probe correction](https://github.com/Fatgezimb/neurostack-explorer/pull/2).

RBT's relative entry assets produced blank pages at trailing-slash routes despite HTTP 200. Its root asset base is corrected; production repair `dpl_H2viM6A4icY33wTjHs5GnXTpCikH` preserves the prior JavaScript, styles and study documents. Forty-eight live assertions verify study controls, feedback, progress persistence and direct/legacy routing. The portfolio uses its canonical [RBT Practice Hub](https://rbt-pro.vercel.app/) destination.

## Public release

Workspace [PR 4](https://github.com/Fatgezimb/fatgezim-portfolio/pull/4), commit `503c4ea`, passed [Pages run 38793780004](https://github.com/Fatgezimb/fatgezim-portfolio/actions/runs/38793780004). Fresh public checks passed all four routes, actual object hits/tours, repeated mobile focus, reduced-motion/low-power behavior, six renderer recovery cycles, keyboard/no-JavaScript paths, seven sample workflows, eight live-frame flows and 177 rendered targets. No runtime or console errors were recorded. Chrome's native email-form scheme warning appeared during the context-loss test; the contact flow prepares a visitor-controlled email draft.

Owner-approved document [PR 5](https://github.com/Fatgezimb/fatgezim-portfolio/pull/5), commit `cf0a652`, passed [Pages run 38794622212](https://github.com/Fatgezimb/fatgezim-portfolio/actions/runs/38794622212). Public route and resource checks were repeated; all PDF/DOCX download events at 390/1440px and persistent PDF actions at 320/390/1440px match `resume/approval.json`. MIME types are correct. Application code is identical between these two releases.

Public evidence: `work/master/integrated/public-{production,embedded,workflows,touch,reading,captures}.json`, `work/master/workspace-qa/public-{mouse,preferences,cycles}.json`, `work/master/public-link-audit.json`, and final `approved-public-{production,boundaries}.json`. User-facing desktop/mobile captures and the release report are saved with the approved document deliverables.
