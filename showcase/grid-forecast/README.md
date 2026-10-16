# Grid Forecast Lab

A complete day-ahead demand forecasting project: checksum-locked PJME data, causal lag features, expanding validation, calibrated prediction bounds, held-out evaluation and an interactive replay.

## Measured result

2017 holdout, 8,732 eligible hourly observations:

| Method | MAE (MW) | RMSE (MW) |
|---|---:|---:|
| Gradient boosting | 1,853.84 | 2,471.82 |
| Yesterday at the same hour | 2,165.59 | 2,969.85 |
| Last week at the same hour | 3,449.01 | 4,705.92 |

The model reduces MAE by 14.4% against the stronger simple baseline. The 95% whole-day bootstrap interval for model MAE is 1,729.51–1,975.87 MW. The nominal 90% prediction interval uses a ±3,891.90 MW radius; observed test coverage is 89.18%. Width and coverage should be assessed together.

These are historical benchmark results. The app replays saved forecasts; it does not connect to current grid operations.

## Explore in three minutes

1. Select a forecast day. The cutoff is 23:00 on the previous date; the target window is the next calendar day.
2. Compare model, observed demand and seasonal baseline. Toggle prediction bounds and inspect individual hourly records.
3. Open Model evaluation to compare both baselines across identical eligible hours and inspect monthly behavior.
4. Open Method & source and the executed notebook to inspect provenance, split decisions and timestamp handling.

## Reproduce

Python 3.12, Node 22.13+ were used. From this directory:

```sh
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
OMP_NUM_THREADS=4 .venv/bin/python pipeline.py
.venv/bin/python -m pytest tests -q
OMP_NUM_THREADS=4 .venv/bin/jupyter nbconvert --execute --to notebook --inplace analysis.ipynb
.venv/bin/jupyter nbconvert --to html analysis.ipynb
```

`source.py` downloads the public version-3 archive and verifies `source-lock.json`. A changed hash stops execution. `data/` and `models/` are generated locally; `artifacts/` contains inspectable results and held-out CSV predictions. Never load pickle files from untrusted sources.

The portable archive includes the complete app:

```sh
python3 -m http.server 4202 --bind 127.0.0.1 --directory app/dist
# Open http://127.0.0.1:4202/
cd app
npm ci
npm run build
```

To refresh reviewed app evidence after rerunning the pipeline: `python refresh_app.py`, then `cd app && npm run build`. Copy `analysis.html` to `app/dist/analysis.html` after building. The portfolio-return link belongs to the integrated portfolio; the project ZIP is the package you have already downloaded.

## Design decisions

- At every target hour, 24/48/168/336-hour demand lags and the shifted trailing average end before the next-day forecast begins. A test perturbs all future observations and asserts earlier features remain identical.
- Candidate models fit before 2014 and 2015 respectively, then validate on those years. Selection uses hour-weighted validation MAE. The final model fits all eligible data through 2015; 2016 calibrates bounds; 2017 is the fixed holdout. Partial 2018 is unused.
- Duplicate timestamps (4) are averaged. The full source clock has 30 missing hours. Missing targets/features are excluded, leaving 28 excluded hours in the test year. Timestamps have no supplied offset, so no UTC or DST conversion is invented.
- The model stays fixed in replay; newly available past observations update its inputs. The uncertainty method is empirical and time dependence limits its guarantees. No observed future weather is used.
- The UI uses a source-backed Data app with inspectable chart data, responsive controls and a self-contained static build.

## Credit

[Zim's public notebook](https://www.kaggle.com/code/fatgezimbela/time-series-forecasting-with-machine-learning-yt) is a fork of [Rob Mulla's tutorial](https://www.kaggle.com/code/robikscube/time-series-forecasting-with-machine-learning-yt). This project is a new implementation extending that learning exercise. Data: PJM Interconnection, distributed by [Rob Mulla on Kaggle](https://www.kaggle.com/datasets/robikscube/hourly-energy-consumption), version 3, listed CC0. Original authored code: MIT; bundled runtime retains upstream terms.

## Next engineering step

A real forecast service needs current feeds, explicit timezone semantics, known-at-origin weather forecasts, drift monitoring and rolling revalidation. Its acceptance target should be defined with the operating team before choosing a model.
