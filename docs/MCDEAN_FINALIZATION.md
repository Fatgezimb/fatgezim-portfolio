# Engineering résumé and portfolio finalization

## Audit and decisions

The October 16 brief targets technical hiring at M.C. Dean. The selected portrait, ivory/burgundy editorial system, horizontal gallery, original research figures and existing apps are retained. The professional narrative now leads with Python, algorithms, integration and technical ownership, with programming since 2013 distinguished from employment tenure.

The audit found that the homepage led with learning products, the web résumé still selected older projects, and Create 13's copy lacked the concrete engineering shown in the commerce repository. McVay had accurate new text but no case-study context. The revised site addresses each of these issues.

- Homepage: four priority engineering projects; McVay account with development steps and attributed results; revised About, skills and Create 13 experience; complete education including the graduate certificate.
- `/engineering/`: McVay account plus Relay, Grid Forecast, Clinical Assessment Portal and NeuroStack case studies. Each application has a problem, approach, decisions, contribution, validation, scope, walkthrough and appropriate evidence links.
- Project exploration: Relay and Grid load their actual same-origin applications on request. The clinical miniature demonstrates access grants and stale-signature behavior with a synthetic record. NeuroStack retains its bounded recording preview. Initial pages load no iframes.
- `/work/`: fifteen entries preserve the broader products, data studies, research and experiments. Meili Bela's collaborator credit remains explicit.
- Web résumé and DOCX builder consume `app/content/engineering-resume.json`. This replaces the older web selection and makes the reviewed copy reproducible. The existing public filenames remain stable.

## Evidence reconciliation

McVay: owner-confirmed Dijkstra adaptation, synthetic development/test datasets without operational access, and team-reported seconds-level processing and approximately twelve manual-review records. Timing and statistical protocol remain unrecovered; results are attributed, not presented as a reproduced benchmark.

Create 13: inspected the consumer-commerce README, checkout, fulfillment and test source. Server-priced Stripe sessions, persistent carts, order handling and retry-safe fulfillment are implemented. The documented verification uses a local Stripe stand-in; real test-mode payment acceptance is still pending. No operational payment or revenue outcome is claimed.

Relay: source domain engine and ten tests inspected and executed. Revision/evidence lineage, downstream invalidation, local persistence and exports support the case study.

Grid: all five pipeline tests pass. Independently recomputed held-out CSV MAE across 8,732 hours: 1,853.843743 MW versus 2,165.585204 MW prior-day baseline, 14.3953% lower. Chronological splits, separate 2016 calibration and Rob Mulla/PJM attribution are retained.

Clinical: inspected the private implementation and documentation. Twenty-seven targeted collaboration, API and report tests pass. Public material uses only a synthetic miniature; no private source or clinical record is published.

NeuroStack: inspected public repository documentation and the existing preview's source contract. Browser controls select a recorded unit and firing-rate view. This exploratory recording project remains distinct from original George Mason research.

## Verification

- Lint and no-emit TypeScript pass.
- Sixteen rendered-route tests and seven Pages export tests pass.
- Root and Pages production builds; six-route static export and resource validation; pack validation pass.
- Twelve responsive checks: homepage, engineering, work and résumé at 390, 768 and 1440 pixels; no document overflow, one H1 per route.
- Four axe WCAG A/AA scans have zero violations. Keyboard activation, 3px focus indication and modal Escape focus restoration verified. Reduced motion sets scrolling to auto. With JavaScript disabled, all four project cards, McVay account and case-study links remain readable.
- Browser exercise: clinical request/grant/sign/edit, Relay corrective retest, Grid bounds and evaluation, NeuroStack unit/chart changes, and case-study open/close. Console error log is empty.
- Link audit: 187 rendered targets / 43 unique requests. All portfolio targets pass. LinkedIn returns its existing anonymous HTTP 999 gate.
- Final résumé: two pages at 11pt body size, both pages visually inspected; eight matching DOCX/PDF hyperlinks; document accessibility audit has zero findings.

Evidence files are in `work/mcdean-finalization/`. Final PDF/DOCX candidates and review images are in the chat's `outputs/MCDean_Engineering_Final/` directory.

## Publication

The revised résumé files require exact-file owner approval under the saved publication rule. A review request is pending; the currently approved public downloads remain unchanged. Website release and public verification follow the final local checks.

Additional 320px review caught a pre-existing clipped hero name and awkward five-link wrapping. The narrow name scale and navigation grid were corrected before release.

## Selection matrix refresh

Uses the ten criteria and weights in `project-briefs/PROJECT_SELECTION_MATRIX.md`; contribution scores distinguish independent direction from AI pair-programming implementation. Owner priority determines the four engineering homepage slots; original research has its own section. Scores are editorial assessments, not employment or product-performance claims.

| Candidate | Scores in matrix order | Weighted score | Evidence |
|---|---|---:|---|
| Relay | 5/5/4/5/5/5/4/4/5/5 | 142 | Ten passing domain tests; actual application and downloadable source. |
| Grid Forecast | 5/5/4/5/5/5/4/4/5/5 | 142 | Held-out CSV and executed notebook; five passing pipeline tests. |
| Clinical Assessment Portal | 4/5/5/4/5/4/4/4/4/5 | 133 | Inspected private code and 27 targeted tests; synthetic public miniature. |
| NeuroStack | 5/4/3/5/5/4/4/5/5/5 | 133 | Pinned public recording, artifacts and existing interactive viewer. |
| Bela Behavior Data Lab | 5/4/4/5/4/4/4/4/5/5 | 132 | Live product and browser-local preview; collaborator credit. |
| RBT Practice Hub | 5/3/4/5/3/4/3/4/5/5 | 123 | Live learning workflow; lower direct systems-integration relevance. |
| Caregiver Academy | 5/3/4/5/3/4/3/4/5/5 | 123 | Live domain education product; full collection retained. |
| StepSpark | 4/3/3/5/3/3/3/4/5/4 | 109 | Prototype with bounded learning preview. |
| Research | 5/4/4/4/4/5/5/5/5/3 | 132 | Original poster with named collaborators and preserved figures. |
