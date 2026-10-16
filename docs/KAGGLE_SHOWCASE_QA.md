# Kaggle showcase verification — October 15, 2026

Status: two complete projects built and verified locally, integrated into the editorial portfolio's eleven-entry work collection. The local static preview is `http://127.0.0.1:4198/fatgezim-portfolio/work/`. Public deployment remains at the earlier release recorded in `phase-state.json`.

## Measured analysis

**Appointment Operations:** Kaggle Medical Appointment No Shows v5. Source archive checked against its SHA-256 lock. 110,527 source rows; six quarantined; 110,521 accepted; 22,314 missed; missed rate 20.1898%. Same-day bookings have a 4.65% missed rate; 31+ day bookings 33.00%. These are descriptive historical associations. All displayed rates recompute from additive counts. The capacity tool labels its assumptions and does not claim measured intervention effects.

**Engine Prognostics:** Kaggle NASA C-MAPSS v1, FD001 and FD003, processed independently. Per scenario: 60 fitting, 20 validation and 20 calibration engines; 100 official test engines. Candidate selection precedes refitting on 80 engines. Trailing features are causal, and targets/predictions are capped at 125 cycles while evaluation uses uncapped truth.

| Scenario | Model | Test MAE | Baseline MAE | Test RMSE | Nominal / measured interval coverage |
| --- | --- | ---: | ---: | ---: | --- |
| FD001 | Ridge | 17.1393 | 31.0500 | 22.0153 | 90% / 100% |
| FD003 | Gradient boosting | 15.1416 | 38.3700 | 20.3236 | 90% / 100% |

Scores are cycles on simulated data. Wide intervals and the calibration/test censoring difference are explicitly explained. High coverage is not presented as high precision or operational readiness.

## Reproduction and software checks

- Both pipelines successfully downloaded their public archives and verified source locks.
- Both executed notebooks contain six executed code cells and zero error outputs. Figures were visually inspected.
- Portable source directories ran their own `refresh_app.py`, reran the pipelines and passed all **14 analysis tests** (6 appointment, 8 engine).
- Both full app source packages passed clean `npm ci`, protected-runtime verification, and standard `npm run build`.
- Both independently rebuilt apps were served and smoke-tested in the browser; the packaged executed-analysis link opened successfully.
- Canonical app builds passed, with final snapshots marked complete.
- Portfolio ESLint and no-emit TypeScript checks passed.
- Root and Pages production builds passed.
- **22 rendered-route and export tests passed** (15 route, 7 export/adapter).
- Pack validation passed.
- Static exporter validated five portfolio routes, hydration payloads, metadata and local resources.
- All six new app/notebook/ZIP endpoints returned 200; both served ZIP hashes match the user deliverables.
- The expanded work collection renders eleven entries, correct app destinations, source downloads, and loaded preview images.

The configured analysis CI workflow has not been run remotely. Local results above were actually executed.

## Browser verification

- Layout checks across all six app tabs at 320, 390, 768, 1024 and 1440 CSS pixels: no document horizontal overflow.
- Actual desktop and mobile screenshots inspected for both apps and the integrated work collection.
- WCAG 2 A/AA and 2.1 AA automated axe checks returned zero violations across all six mobile app tabs, sampled desktop app views, and desktop/mobile work collection. Automated scans do not replace a complete manual accessibility audit.
- Appointment booking-delay filtering reconciles to 32,185 appointments and 7,772 missed for the 1–7 day group.
- May filtering reconciles to 80,836 appointments and 16,799 missed; clearing filters restores the full cohort.
- Capacity assumptions: 0% returns zero; 50% and 90 minutes return 11,157 appointments and 16,736 rounded hours; reset returns 10% and 30 minutes. Keyboard adjustment to 11% updates results correctly under reduced-motion emulation.
- Validation detail disclosure shows source checks, quarantine counts and retained age flags.
- Engine scenario selection updates the appropriate cohort and evaluation. Selecting a table engine resets its replay. Switching scenarios resets the selected engine and cursor to the longest observed trajectory.
- Replay keyboard Home/End controls move between first and final observations. FD001 engine 49 at cycle 303 estimates 23.1 remaining cycles against historical truth of 21.
- FD003 threshold 100 cycles flags 60/100 engines; table selection opens engine 82 at cycle 194 with predicted RUL 0 and actual RUL 6.
- Source inspection shows the active scenario and original Kaggle source.
- Portfolio project action opens the full app in a new browser tab.
- Checked browser console windows contain no captured errors or warnings.

## Link-audit qualification

138 rendered targets / 34 unique HTTP requests were checked. The only non-success destination was the pre-existing LinkedIn profile (HTTP 999 on two source pages). The browser reaches LinkedIn's sign-in wall; profile content could not be verified anonymously. New local app, analysis and download links passed. The résumé byte-verification tests still pass for the previously approved files.

## Evidence and deliverables

Machine evidence: `work/kaggle/final-*-build.log`, `final-root-tests.log`, `final-lint.log`, `final-typecheck.log`, `final-export.log`, `final-links.json`, `served-deliverables.json`, `browser-qa.json`, and `*-portable-refresh.log`.

User deliverables: chat outputs `Kaggle_Showcases/` contains two source ZIPs, both executed analyses, desktop/mobile screenshots, source review, interview guide and package hashes. The ZIPs include the full authored app source and a prebuilt app. Raw source records and locally fitted binary estimators can be regenerated by the documented pipeline.
