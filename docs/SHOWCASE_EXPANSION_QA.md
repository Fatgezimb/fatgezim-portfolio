# Engineering showcase verification — October 15, 2026

## Delivery status

Relay, Grid Forecast Lab and Video Signal Lab are built and integrated into the local portfolio. The work collection now contains fourteen entries. Public deployment remains unchanged. Source archives include independently rebuilt apps and instructions; Python pipelines regenerate the source data and fitted models.

One manual check remains: the final native-keyboard pass. An older native confirmation in a temporary preview tab stalled pointer/keyboard automation. Initial app workflows were verified before that condition. Final Relay reset and view controls were exercised through ordinary DOM control activation via the browser's CDP interface. Responsive dimensions were measured after explicit emulation; screenshot captures use the same browser. This is not a claim that native-keyboard verification passed.

## Measured project results

- Grid Forecast: 8,732 eligible held-out hourly observations from 2017; 28 hours excluded for unavailable targets/features. MAE 1,853.8437 MW; yesterday baseline 2,165.5852 MW (14.4% reduction); RMSE 2,471.8226 MW. Empirical nominal 90% bounds cover 89.18% of test observations, with radius 3,891.90 MW. Candidate selection uses expanding 2014/2015 validation, final fit through 2015, separate 2016 interval calibration and 2017 evaluation.
- Video Signal: 12,000 synthetic rows, split 7,200/2,400/2,400. Pre-upload metadata test AUROC 0.90643, average precision 0.72716, Brier 0.09392. Retrospective engagement comparison AUROC 0.98735, average precision 0.95769, Brier 0.03521. Engagement fields are generated from views; the stronger score illustrates outcome leakage for a pre-upload task. These are generator results, not real creator-performance claims.
- Relay: six fictional modules and five acceptance gates. Readiness requires current passing evidence and the correct prerequisite event IDs. No manually editable ready flag. Revision changes and replacement prerequisite records invalidate dependent approvals. The same domain functions produce the UI status and JSON turnover export.

## Reproduction and code checks

- Grid Forecast: five meaningful analysis tests passed; seven notebook code cells executed without errors.
- Video Signal: five meaningful analysis tests passed; eight notebook code cells executed without errors.
- Relay: ten domain tests passed, covering failure/blocked transitions, complete acceptance chains, revision propagation, same-revision retests, immutability, export status, invalid review data, corrupted persistence and owner assignment.
- Both data archives retain pinned source URLs, dataset versions and SHA-256 checksums. Re-downloaded versioned archives matched their locks.
- Three portable app builds passed. The two Data app builds verified 234 protected runtime files unchanged; authored dashboard content remains separate from the runtime.
- Root lint, no-emit TypeScript, production build, 22 rendered-route/export tests, pack validation and whitespace checks passed. The actual Pages-base build and validated five-route static export passed.
- Reviewed PDF and DOCX download bytes remain covered by the existing approval-hash tests.
- CI configuration covers all four Python projects and Relay, but the remote workflow has not been run.

## Browser checks

- All nine new app views at 320, 390, 768 and 1440 CSS pixels: no document horizontal overflow (36 view/width samples).
- All nine app views at 390 and 1440: zero reported WCAG 2 A/AA and 2.1 AA axe violations (18 scans). Two Relay contrast failures were corrected and rechecked.
- Updated work collection: fourteen entries, no overflow and zero reported axe violations at 390/1440 (two further scans).
- Grid date changes, bounds toggle and rendered chart values were verified. The default day is August 25, 2017, near the median daily error; July 20 is a documented failure case.
- Video category/threshold/model controls update the confusion counts and records. The threshold deep link survives reload. The Science slice was checked with both feature sets.
- Relay: a failed Level 4 record blocked Level 5; corrective retesting unlocked it; sequential Level 5 and turnover reviews produced readiness. The downloaded JSON contained the actual ready status, five gates, zero blockers and six module events. A new revision made all five approvals outdated, and reloading retained that revision.
- Inline reset cancel and restore paths pass through DOM activation; restore returns the six-module fixture and eighteen initial events.
- Reduced-motion emulation reports the preference active and zero active animations in all three default app views. Console windows checked for all three apps contained no captured warnings or errors.
- Native keyboard recheck is pending as described above. Automated accessibility checks do not establish complete accessibility conformance.

## Links, packages and dependencies

The portfolio audit checked 151 rendered targets and 43 unique HTTP requests. The only non-success destination was the existing LinkedIn profile (HTTP 999 on two pages). The report now preserves the actual tested local URL separately from the intended public destination.

All three new app roots, all three source ZIPs, both executed HTML analyses, the YouTube datasheet and Relay guide return HTTP 200 from the static portfolio preview. Served ZIP hashes match the output archives; ZIP integrity checks pass. Package checksums are in `package-manifest.json`.

The prepared Data app dependency audit reports zero production-dependency vulnerabilities and six build-tool-chain advisories. The protected runtime was preserved; no automatic dependency replacement was applied. See the saved audit JSON for package-level details before running an untrusted build workload.

## Evidence

Repository machine evidence is under `work/showcase-expansion/`: build/test logs, source metadata, `browser-layout-accessibility.json`, `browser-final.json`, `delivery-checks.json`, `final-links.json`, and dependency audits. Deliverables beside this report include three source ZIPs, two executed notebooks and HTML analyses, desktop/mobile screenshots, a sample turnover export and `WALKTHROUGHS.md`.

## Follow-up keyboard verification

The stale temporary tab closed. Native Enter activation, cancel, Tab focus, checkbox Space operation and range ArrowRight/ArrowLeft operation now pass. The prior keyboard limitation is resolved; see `docs/LINK_REPAIR_QA.md` for the exact observations.
