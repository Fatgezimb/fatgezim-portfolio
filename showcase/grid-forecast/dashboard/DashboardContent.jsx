import React from "react";
import {
  DataComponent,
  DataTable,
  Dropdown,
  EvidenceChart,
  Filters,
  MetricCard,
  Section,
  SortableItem,
  SortableRegion,
  useDataApp,
  useDashboardTabs,
} from "../../data-app-public.jsx";
import "./project.css";
const tabs = [
  { id: "replay", label: "Day-ahead replay", filterIds: ["date"] },
  { id: "evaluation", label: "Model evaluation", filterIds: [] },
  { id: "method", label: "Method & source", filterIds: [] },
];
const n = (v) => Math.round(Number(v)).toLocaleString("en-US");
export function DashboardContent() {
  const { queries, filters, setFilter, reviewedRows, assumptions, setAssumptions } = useDataApp(),
    { activeTabId } = useDashboardTabs(tabs),
    tab = activeTabId || "replay";
  const interval = Number(assumptions.showBounds ?? 1) !== 0;
  const all = queries.daily.rows,
    dates = all.map((r) => r.date),
    date = dates.includes(filters.date) ? filters.date : "2017-08-25";
  const rows = reviewedRows("forecast", ["timestamp"]).filter(
      (r) => r.date === date,
    ),
    day = all.find((r) => r.date === date),
    summary = queries.summary.rows[0],
    scores = queries.metrics.rows;
  const peakError = day.peak_forecast - day.peak_actual;
  return (
    <article className="forecast-app">
      <h1 className="accessible-title">Grid Forecast Lab</h1>
      <div className="project-context">
        <span>PJME · Historical demand · 2017 held-out replay</span>
        <a href="../../work/">Zim Bela / Work ↗</a>
      </div>
      {tab === "replay" && (
        <>
          <Filters
            filters={[]}
            queries={queries}
            values={filters}
            onChange={setFilter}
          >
            <Dropdown
              label="Forecast day"
              showLabel
              value={date}
              choices={dates}
              onChange={(v) => setFilter("date", v)}
            />
            <label className="check-control">
              <input
                type="checkbox"
                checked={interval}
                onChange={(e) => setAssumptions({...assumptions,showBounds:e.target.checked?1:0})}
              />
              Show prediction bounds
            </label>
          </Filters>
          <DataComponent
            id="forecast-origin"
            queryId="forecast"
            title="Day-ahead forecast"
            kind="custom"
            variant="card"
            sourceRows={rows}
            displayRows={rows}
          >
            <div className="origin-story">
              <div>
                <span>INFORMATION CUTOFF</span>
                <strong>{rows[0]?.origin}</strong>
                <small>Calendar + demand observed by this time</small>
              </div>
              <span className="origin-arrow" aria-hidden="true">
                →
              </span>
              <div>
                <span>FORECAST WINDOW</span>
                <strong>{date} · 00–23h</strong>
                <small>
                  {rows.length} eligible hours · timestamps as supplied
                </small>
              </div>
              <div
                className="hour-ribbon"
                aria-label={`${rows.length} available hourly forecasts`}
              >
                {Array.from({ length: 24 }, (_, h) => (
                  <span
                    key={h}
                    className={
                      rows.some((r) => r.hour === h) ? "present" : "missing"
                    }
                    title={`${h}:00 ${rows.some((r) => r.hour === h) ? "available" : "excluded"}`}
                  />
                ))}
              </div>
            </div>
          </DataComponent>
          <div className="forecast-chart">
            <EvidenceChart
              id="day-demand"
              queryId="forecast"
              title="Demand, forecast and last-week baseline"
              rows={rows}
              sourceRows={rows}
              height={350}
              variant="card"
              spec={{
                type: "line",
                x: "hour",
                y: "forecast",
                fields: interval
                  ? ["actual", "forecast", "last_week", "lower", "upper"]
                  : ["actual", "forecast", "last_week"],
                legend: {
                  labels: {
                    actual: "Observed demand",
                    forecast: "Model forecast",
                    last_week: "Last week",
                    lower: "90% interval · lower",
                    upper: "90% interval · upper",
                  },
                },
                colors: {
                  actual: "#183f50",
                  forecast: "#bb6420",
                  last_week: "#4f8077",
                  lower: "#a38462",
                  upper: "#a38462",
                },
                showLegend: true,
                stackable: false,
                startAtZero: false,
                xLabel: "Hour of forecast day",
                yLabel: "Demand (MW)",
                valueDecimals: 0,
              }}
            />
          </div>
          <p className="chart-note">
            Bounds use a separate 2016 calibration year: ±{n(summary.radius)}{" "}
            MW. Nominal coverage is 90%; measured 2017 hourly coverage is{" "}
            {(100 * summary.coverage).toFixed(1)}%. Serial dependence and
            changing demand limit coverage guarantees.
          </p>
          <SortableRegion
            id="forecast:day-metrics"
            variant="freeform"
            className="project-metrics"
          >
            {[
              ["day-mae", "Mean absolute error", `${n(day.mae)} MW`],
              [
                "peak-error",
                "Forecast peak minus actual peak",
                `${peakError >= 0 ? "+" : ""}${n(peakError)} MW`,
              ],
              [
                "day-coverage",
                "Hours inside prediction bounds",
                `${(100 * day.coverage).toFixed(1)}%`,
              ],
            ].map(([id, title, value]) => (
              <SortableItem id={id} label={title} key={id} kind="metric">
                <MetricCard
                  id={id}
                  title={title}
                  queryId="daily"
                  value={value}
                  sourceRows={[day]}
                  displayRows={[day]}
                />
              </SortableItem>
            ))}
          </SortableRegion>
          <Section id="hourly-title" title="Inspect each forecast">
            <DataComponent
              id="hourly-records"
              queryId="forecast"
              title="Hourly prediction records"
              kind="table"
              sourceRows={rows}
              displayRows={rows}
              variant="card"
            >
              <DataTable
                label="Hourly forecast and observed demand"
                searchable={false}
                rows={rows}
                columns={[
                  { field: "hour", label: "Hour" },
                  { field: "actual", label: "Actual MW", renderCell: n },
                  { field: "forecast", label: "Forecast MW", renderCell: n },
                  { field: "yesterday", label: "Yesterday MW", renderCell: n },
                  { field: "last_week", label: "Last week MW", renderCell: n },
                  { field: "error", label: "Signed error MW", renderCell: n },
                ]}
              />
            </DataComponent>
          </Section>
        </>
      )}
      {tab === "evaluation" && (
        <>
          <SortableRegion
            id="forecast:evaluation"
            variant="freeform"
            className="project-metrics"
          >
            {[
              ["test-mae", "Model test MAE", `${n(scores[0].mae)} MW`],
              [
                "yesterday-mae",
                "Yesterday baseline MAE",
                `${n(scores[1].mae)} MW`,
              ],
              [
                "test-n",
                "Eligible held-out hours",
                n(summary.eligible_test_hours),
              ],
            ].map(([id, title, value]) => (
              <SortableItem id={id} label={title} key={id} kind="metric">
                <MetricCard
                  id={id}
                  title={title}
                  queryId={id === "test-n" ? "summary" : "metrics"}
                  value={value}
                  sourceRows={id === "test-n" ? [summary] : scores}
                  displayRows={id === "test-n" ? [summary] : scores}
                />
              </SortableItem>
            ))}
          </SortableRegion>
          <Section
            id="evaluation-plots"
            title="Compare on the same forecast hours"
            columns={2}
          >
            <EvidenceChart
              id="baseline-errors"
              queryId="metrics"
              title="Model and seasonal baselines"
              rows={scores}
              sourceRows={scores}
              height={300}
              variant="card"
              spec={{
                type: "bar",
                x: "model",
                y: "mae",
                fields: ["mae", "rmse"],
                showLegend: true,
                legend: { labels: { mae: "MAE", rmse: "RMSE" } },
                stackable: false,
                startAtZero: true,
                yLabel: "Error (MW)",
                showXAxisLabel: false,
                valueDecimals: 0,
              }}
            />
            <EvidenceChart
              id="monthly-error"
              queryId="monthly"
              title="Error through the held-out year"
              rows={queries.monthly.rows}
              sourceRows={queries.monthly.rows}
              height={300}
              variant="card"
              spec={{
                type: "line",
                x: "month",
                y: "mae",
                fields: ["mae", "baseline_mae"],
                legend: {
                  labels: { mae: "Model MAE", baseline_mae: "Last-week MAE" },
                },
                showLegend: true,
                startAtZero: true,
                yLabel: "Error (MW)",
                showXAxisLabel: false,
                valueDecimals: 0,
              }}
            />
          </Section>
          <div className="method-grid">
            <section>
              <h2>Uncertainty in the error estimate</h2>
              <p>
                Model MAE: {n(scores[0].mae)} MW. A 95% bootstrap interval is{" "}
                {n(summary.ci_low)}–{n(summary.ci_high)} MW, resampling whole
                days 1,000 times. The interval preserves within-day correlation
                but does not fully capture seasonal dependence.
              </p>
            </section>
            <section>
              <h2>Coverage has a cost</h2>
              <p>
                The prediction interval spans about {n(summary.radius * 2)} MW.
                It covers {(100 * summary.coverage).toFixed(1)}% of eligible
                test hours. An interval can cover observations while being too
                broad for a specific operating decision.
              </p>
            </section>
          </div>
          <Section
            id="selection-title"
            title="Selection happened before testing"
          >
            <DataComponent
              id="validation-models"
              queryId="candidates"
              title="Expanding chronological validation"
              kind="table"
              variant="card"
              sourceRows={queries.candidates.rows}
              displayRows={queries.candidates.rows}
            >
              <DataTable
                label="Validation candidates and years"
                searchable={false}
                rows={queries.candidates.rows}
                columns={[
                  { field: "model", label: "Candidate" },
                  { field: "year", label: "Validation year" },
                  { field: "hours", label: "Hours", renderCell: n },
                  { field: "mae", label: "MAE MW", renderCell: n },
                  { field: "rmse", label: "RMSE MW", renderCell: n },
                ]}
              />
            </DataComponent>
          </Section>
        </>
      )}
      {tab === "method" && (
        <>
          <section className="method-intro">
            <h2>What will demand look like tomorrow?</h2>
            <p>
              Rebuilding a public learning exercise into an inspectable
              forecasting system: causal features, chronological model
              selection, separate uncertainty calibration and a fixed holdout.
            </p>
          </section>
          <div className="split-story">
            <div>
              <strong>2002–13</strong>
              <span>Initial training history</span>
            </div>
            <div>
              <strong>2014–15</strong>
              <span>Expanding validation</span>
            </div>
            <div>
              <strong>2016</strong>
              <span>Interval calibration</span>
            </div>
            <div>
              <strong>2017</strong>
              <span>Final evaluation</span>
            </div>
          </div>
          <div className="method-grid">
            <section>
              <h2>Information available at 23:00</h2>
              <p>
                Hour, weekday, month, year, day of year, demand 24/48/168/336
                hours earlier, and a 24-hour average shifted back 24 hours. All
                values are available before the forecast day starts.
              </p>
              <p>
                The selected boosting model is fitted through 2015 and remains
                fixed. Daily replay uses newly observed historical lags, without
                fitting on the test year.
              </p>
            </section>
            <section>
              <h2>Time quality is part of the model</h2>
              <p>
                The archive contains {n(summary.source_rows)} PJME rows,{" "}
                {summary.duplicate_timestamps} duplicate timestamps and{" "}
                {summary.missing_hours} missing clock hours. Duplicates are
                averaged; gaps stay missing. Incomplete feature rows are
                excluded, including {summary.excluded_test_hours} hours in 2017.
              </p>
              <p>
                Timestamps arrive without a timezone offset. This benchmark
                preserves the supplied clock instead of inventing UTC or
                daylight-saving corrections. The partial 2018 period is unused.
              </p>
            </section>
            <section>
              <h2>Credit and the redesign</h2>
              <p>
                Zim’s public Kaggle notebook is a fork of Rob Mulla’s
                forecasting tutorial. That exercise motivated this new
                implementation. This project adds lag features, two expanding
                validation years, a separate calibration year and an inspectable
                day-ahead replay.
              </p>
            </section>
            <section>
              <h2>Next validation</h2>
              <p>
                A current system would need contemporary load data, explicit
                timezone handling, verified day-ahead weather forecasts and
                rolling recalibration. These historical results do not establish
                today’s forecasting performance.
              </p>
            </section>
          </div>
          <div className="artifact-links">
            <a href="./analysis.html">Executed analysis ↗</a>
            <a href="./project.zip" download>
              Complete project ↓
            </a>
            <a
              href="https://www.kaggle.com/code/fatgezimbela/time-series-forecasting-with-machine-learning-yt"
              target="_blank"
              rel="noreferrer"
            >
              Zim’s original notebook ↗
            </a>
            <a
              href="https://www.kaggle.com/code/robikscube/time-series-forecasting-with-machine-learning-yt"
              target="_blank"
              rel="noreferrer"
            >
              Rob Mulla’s tutorial ↗
            </a>
            <a
              href="https://www.kaggle.com/datasets/robikscube/hourly-energy-consumption"
              target="_blank"
              rel="noreferrer"
            >
              Kaggle data ↗
            </a>
          </div>
        </>
      )}
    </article>
  );
}
