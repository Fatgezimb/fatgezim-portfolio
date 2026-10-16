# Appointment Operations

A complete portfolio project that turns a public appointment extract into a tested SQL aggregation pipeline, an interactive attendance analysis app, and an executed analytical notebook.

## Question and result

Where do missed appointments concentrate, and what would a specified reduction mean for capacity?

- Source: 110,527 appointments from the Kaggle Medical Appointment No Shows dataset.
- Accepted: 110,521 after quarantining one negative-age record and five booking-after-visit records.
- Missed: 22,314, or 20.1898% of accepted appointments.
- Same-day bookings: 4.65% missed. Bookings 31+ days ahead: 33.00% missed.

These are descriptive associations in one historical Brazilian extract (April 29–June 8, 2016). SMS assignment was not randomized. The planning tool exposes assumptions; it does not claim measured intervention savings.

## Explore

1. **Attendance:** filter month and booking delay; inspect denominators, weekday volume, daily counts, and SMS groups.
2. **Capacity planning:** vary an assumed relative reduction and appointment length; every scenario uses the selected observed cohort.
3. **Data & methods:** inspect the quarantine ledger, source, executed notebook, and downloadable project.

The full project archive includes `app/dist`, which can be served without Node or Python analysis dependencies:

```sh
python3 -m http.server 4200 --bind 127.0.0.1 --directory app/dist
```

Open `http://127.0.0.1:4200/`. The portfolio-return link is intended for the integrated portfolio host. The executed analysis is bundled alongside the app. The project-download action uses the integrated portfolio host; the archive you opened already contains that source.

## Reproduce the analysis

Python 3.12 was used for the verified run. From this project directory:

```sh
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/python pipeline.py
.venv/bin/python -m pytest -q
.venv/bin/jupyter nbconvert --execute --to notebook --inplace analysis.ipynb
.venv/bin/jupyter nbconvert --to html analysis.ipynb
```

The first run downloads the public Kaggle archive. The SHA-256 lock makes later source changes fail explicitly. No Kaggle credentials are required for the verified source. `data/` is local and ignored. `artifacts/analysis.json` and `appointment-cohorts.csv` contain only aggregate counts.

`analysis.sql` defines the aggregation grain. `test_pipeline.py` verifies count reconciliation, uniqueness, filter partitioning, outcome bounds, export fields, and same-day booking handling. The notebook runs the pipeline before plotting and saves its executed outputs.

## Application source

`dashboard/` contains the authored React view and theme. The source archive includes the full dashboard application under `app/`, including its runtime, lockfile, build scripts, and evidence snapshot. To build it with standard Node tooling: `cd app`, `npm ci`, `npm run build`. The checked preview was compiled with the installed Data app runtime. The pipeline and app communicate through a bounded JSON snapshot; browser controls do not query a server.

## Design decisions

- Normalize both dates before subtracting: the appointment timestamp is a date placeholder, so same-day afternoon bookings are valid.
- Recompute rates from additive numerator/denominator counts. Never average group percentages.
- Retain records with age above 110 as a quality flag; age is unused in this analysis.
- Preserve missing combinations as absent, including the same-day recorded-SMS group.
- Keep intervention assumptions distinct from observed data.
- Use aggregate evidence rather than record-level identifiers in the public app.

## Source and license

[Kaggle: Medical Appointment No Shows](https://www.kaggle.com/datasets/joniarroba/noshowappointments), version 5, Joni Hoppen and Aquarela Analytics. Dataset and derived aggregates: **CC BY-NC-SA 4.0**. This is a noncommercial educational portfolio analysis. Original authored analysis/application code: MIT; bundled third-party runtime and dependencies retain their upstream terms.

## Refresh the app after changing the analysis

Run `.venv/bin/python refresh_app.py` from this project directory. It reruns the pipeline and updates `app/src/data.json`. Then run `npm run build` inside `app`, and copy `analysis.html` to `app/dist/analysis.html`. Review the results before publishing. Edit the application in `app/src/content/dashboard/` and its theme in `app/src/theme.css`; the `dashboard/` folder preserves the authored source reference. Node 22.13 or newer is recommended.
