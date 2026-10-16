# Two reproducible data projects

Built October 15, 2026 from two separate public Kaggle datasets. Each project includes an ingestion pipeline, source checksum lock, documented analytical method, executed notebook, tested outputs, and a working React application.

| Project | Dataset | Evidence |
| --- | --- | --- |
| Engine Prognostics | NASA C-MAPSS, FD001 and FD003 | Whole-engine validation, two candidate models, official held-out test results, baseline comparison, causal features, uncertainty and replay |
| Appointment Operations | Medical Appointment No Shows | Schema validation, six quarantined records, SQL aggregation, reconciled attendance metrics, cohort filters and explicit capacity scenarios |

## Run

The complete portable source bundles are served at `public/showcase/<project>/project.zip`. Extract one and follow its README. Each contains an independently built application under `app/dist/`, the full app source, pinned Python requirements, analysis artifacts, and an executed notebook. Python 3.12 and Node 22.13+ were used for the verified builds.

For analysis directly in this repository:

```sh
python3.12 -m venv work/kaggle/venv
work/kaggle/venv/bin/pip install -r showcase/requirements.txt
work/kaggle/venv/bin/python showcase/appointment-operations/pipeline.py
OMP_NUM_THREADS=4 work/kaggle/venv/bin/python showcase/engine-prognostics/pipeline.py
work/kaggle/venv/bin/python -m pytest showcase/appointment-operations -q
work/kaggle/venv/bin/python -m pytest showcase/engine-prognostics -q
```

The two test commands run separately because each project is a portable module with its own `pipeline.py`. Raw data and fitted model binaries are kept in ignored local folders. The public appointment app consumes aggregate rows only.

## Structure and delivery

- `appointment-operations/` and `engine-prognostics/`: analysis source, tests, executed notebooks, artifacts and authored views.
- `requirements.txt`: pinned analysis dependencies.
- `project.css`: shared authored dashboard layout.
- `build_snapshots.py`: materialize reviewed analysis artifacts into prepared Data app snapshots.
- `make_notebooks.py`: author notebook source; rerunning it clears executed outputs, so execute notebooks again afterward.
- Each portable archive has `refresh_app.py`: rerun the analysis and update its app snapshot before rebuilding.
- `INTERVIEW_GUIDE.md`: short demos, design choices, limitations and hands-on exercises.
- `EXISTING_WORK_REVIEW.md`: evidence review of earlier work and the cervical CT project concept.
- `.github/workflows/showcase-analysis.yml`: repeatable analysis/test/notebook CI configuration; remote execution has not yet been run.

The apps are linked from the portfolio's `/work/` collection. Public deployment status is tracked separately in `phase-state.json`; a working local preview is not evidence of a live release.

See `../docs/KAGGLE_SHOWCASE_QA.md` for verification and result details. Dataset licenses and upstream credits are recorded in each project README and source lock.

## Three additional projects

`grid-forecast/` extends the credited PJME notebook with independent chronological evaluation. `video-signal/` audits a synthetic 12,000-video dataset and outcome leakage. `commissioning-readiness/` contains Relay, a complete browser-local modular-power evidence workflow with fictional modules. All have individual READMEs, tests and downloadable source archives. `refresh_expansion.py` materializes the new reviewed data snapshots. See `../docs/SHOWCASE_EXPANSION_QA.md` for current checks and `../docs/SHOWCASE_EXPANSION_PLAN.md` for the public-source rationale.
