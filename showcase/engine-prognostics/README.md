# Engine Prognostics

A complete machine-learning showcase: reproducible sensor processing, whole-engine validation, two fault scenarios, baseline comparisons, uncertainty calibration, and an interactive observation replay.

## Question and measured results

How accurately can past and current sensor observations estimate remaining engine cycles?

| Scenario | Selected model | Test MAE | Age-only MAE | Test engines |
|---|---|---:|---:|---:|
| FD001: compressor degradation | Ridge | 17.14 cycles | 31.05 cycles | 100 |
| FD003: compressor + fan degradation | Gradient boosting | 15.14 cycles | 38.37 cycles | 100 |

The source is NASA C-MAPSS **simulated degradation**, distributed on Kaggle. Both scenarios have one operating condition. These results describe this benchmark, not performance on physical aircraft.

## Explore

1. **Engine explorer:** select either scenario and any of its 100 test engines. Scrub the observed cycle and inspect the model estimate against historical truth. The initial engine has the longest recorded history.
2. **Model evaluation:** compare errors with an age-only baseline, inspect predictions, and review the validation scores used for selection.
3. **How it works:** follow the feature and partitioning design, then open the executed notebook or source package.

The archive includes a compiled app, runnable without ML dependencies:

```sh
python3 -m http.server 4201 --bind 127.0.0.1 --directory app/dist
```

Open `http://127.0.0.1:4201/`. The portfolio-return link targets the integrated portfolio; the executed analysis is bundled alongside the app. The project-download action uses the integrated portfolio host; the archive you opened already contains that source.

## Reproduce

Verified with Python 3.12. From this directory:

```sh
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
OMP_NUM_THREADS=4 .venv/bin/python pipeline.py
.venv/bin/python -m pytest -q
OMP_NUM_THREADS=4 .venv/bin/jupyter nbconvert --execute --to notebook --inplace analysis.ipynb
.venv/bin/jupyter nbconvert --to html analysis.ipynb
```

The public Kaggle download is checksum-locked. Raw files remain in ignored `data/`; trained estimators are saved in `models/`. The pipeline exports test predictions, complete sampled replay traces, partition identities, candidate scores and evaluation metrics. Model candidates, seeds, features and parameters are in `pipeline.py`.

## Method

- Independently process FD001 and FD003.
- Partition their 100 training engines into 60 fitting, 20 validation, and 20 calibration engines using seed 42.
- Use one seeded random censored snapshot per validation engine to select Ridge or gradient boosting by RMSE.
- Refit the selected model on the 80 fitting + validation engines.
- Calibrate a nominal 90% interval on one snapshot per separate calibration engine using the finite-sample residual order statistic.
- Evaluate the last supplied observation of every official test engine against its provided RUL.
- Compute 95% bootstrap intervals for MAE from 2,000 resamples of whole test engines.

All 43 features are causal: cycle count, 14 sensor values, trailing 10-cycle means, and trailing deltas. Windows restart per engine. The test suite explicitly changes future values and checks that earlier features remain identical.

## Limits that matter

Training targets and predictions are capped at 125 cycles; test errors and prediction-interval coverage use uncapped truth. Consequently, early-life errors and calibration intervals can be large. Measured interval coverage is 100% for these test sets, but broad intervals offer limited precision. Calibration censoring differs from official test censoring. Twenty calibration engines per scenario provide limited evidence.

The UI replays saved predictions. It does not retrain models, stream live telemetry, or establish operational readiness. A further study should cover FD002/FD004, more group-level validation folds, and calibration under matched censoring.

## Application source

`dashboard/` contains the authored React view and theme. The downloadable archive includes the complete app under `app/`, with runtime, lockfile and evidence snapshot. Standard source build: `cd app`, `npm ci`, `npm run build`. The checked preview was compiled with the installed Data app runtime.

## Source and credit

[Kaggle: NASA Turbofan Jet Engine Data Set](https://www.kaggle.com/datasets/behrad3d/nasa-cmaps), version 1, B² / behrad3d, listed as CC0. [NASA source record](https://data.nasa.gov/dataset/cmapss-jet-engine-simulated-data). Original data: NASA Ames Prognostics Center of Excellence; A. Saxena, K. Goebel, D. Simon and N. Eklund, *Damage Propagation Modeling for Aircraft Engine Run-to-Failure Simulation* (2008).

Original authored analysis/application code: MIT. Bundled runtime and dependencies retain their upstream terms.

## Refresh the app after changing the analysis

Run `.venv/bin/python refresh_app.py` from this project directory. It reruns the pipeline and updates `app/src/data.json`. Then run `npm run build` inside `app`, and copy `analysis.html` to `app/dist/analysis.html`. Review the results before publishing. Edit the application in `app/src/content/dashboard/` and its theme in `app/src/theme.css`; the `dashboard/` folder preserves the authored source reference. Node 22.13 or newer is recommended.
