# Video Signal Lab

A complete model-audit project using the requested 12,000-video Kaggle dataset. It demonstrates source verification, information timing, calibrated classification, independent evaluation and threshold exploration.

## The central finding

The source is **synthetic**. Its viral label is the top 20% of views; likes, comments and shares are generated from views. A pre-upload model and a retrospective engagement model answer different questions.

| Test model | AUROC | Average precision | Brier score |
|---|---:|---:|---:|
| Pre-upload metadata | 0.906 | 0.727 | 0.094 |
| Post-outcome engagement comparison | 0.987 | 0.958 | 0.035 |
| Constant 20% baseline | 0.500 | 0.200 | 0.160 |

The metadata-model AUROC bootstrap 95% interval is 0.892–0.919. The higher retrospective score illustrates outcome leakage for a pre-publication task. All scores describe the supplied generator; they do not measure real YouTube performance.

## Explore

1. Compare when the two feature sets become available and their scores on the same held-out rows.
2. Open Threshold explorer, choose a category and move the probability threshold. The confusion matrix, precision, recall, distribution and records share the same population.
3. Inspect the probability calibration and validation feature-importance analysis.
4. Open Method & source or the executed notebook for the full pipeline and source datasheet.

## Reproduce

Verified with Python 3.12 and Node 22.13+:

```sh
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
OMP_NUM_THREADS=4 .venv/bin/python pipeline.py
.venv/bin/python -m pytest tests -q
OMP_NUM_THREADS=4 .venv/bin/jupyter nbconvert --execute --to notebook --inplace analysis.ipynb
.venv/bin/jupyter nbconvert --to html analysis.ipynb
```

`source.py` downloads and checksum-verifies the pinned version-1 archive. Source archive and trained model are regenerated into `data/` and `models/`; results and held-out predictions are in `artifacts/`. The portable archive includes a complete editable application:

```sh
python3 -m http.server 4203 --bind 127.0.0.1 --directory app/dist
# Open http://127.0.0.1:4203/
cd app
npm ci
npm run build
```

After rerunning the pipeline, run `python refresh_app.py` then rebuild `app/`. Copy `analysis.html` and `artifacts/datasheet.md` to `app/dist/`. The portfolio-return link belongs to the integrated site; the source ZIP is the package you have already downloaded.

## Evaluation contract

- Stratified 7,200 training / 2,400 validation / 2,400 test rows, seeds 42 and 43.
- Three-fold sigmoid calibration runs entirely within the training split, with training-fitted numeric scaling and categorical encoding.
- Logistic regression and gradient boosting compete on validation average precision. Logistic regression wins. The chosen fitted model is evaluated once on held-out rows.
- Numeric counts with long tails use `log1p`. The nine pre-upload features include subscriber count; post-outcome engagement adds three logged fields. Neither model receives views or the target itself.
- A fixed 0.50 threshold produces the reported confusion matrix. App threshold changes explore test predictions; they do not establish a deployable policy.
- Validation permutation importance uses five shuffles per feature. It measures model reliance, not causation. The AUROC interval resamples 1,000 sets of synthetic test rows.

## Source

[What Makes a YT Video Go Viral?: 12,000 Vids](https://www.kaggle.com/datasets/vedauv/what-makes-a-yt-video-go-viral-12000-vids), Vedauv Rajkumar Leelavathi, version 1, listed CC0. The author's datasheet is included in `artifacts/datasheet.md`. Original authored analysis/application code: MIT. Bundled runtime retains upstream terms.

## Next study

Real forecasting would require licensed dated observations, a fixed future horizon, exposure-adjusted outcomes and channel/time holdouts. This dataset supplies neither channel identities nor real timestamps. Small category slices have limited support; always retain their denominators. Treat the project as evidence of model evaluation and product engineering, rather than evidence about creator strategy.
