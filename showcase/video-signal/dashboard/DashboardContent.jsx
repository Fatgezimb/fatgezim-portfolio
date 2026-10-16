import React from "react";
import {
  DataComponent,
  DataTable,
  Dropdown,
  EvidenceChart,
  Filters,
  MetricCard,
  Section,
  Slider,
  SortableItem,
  SortableRegion,
  useDataApp,
  useDashboardTabs,
} from "../../data-app-public.jsx";
import "./project.css";
const tabs = [
  { id: "audit", label: "Model audit", filterIds: [] },
  { id: "threshold", label: "Threshold explorer", filterIds: ["category"] },
  { id: "method", label: "Method & source", filterIds: [] },
];
const pct = (n) => `${(100 * n).toFixed(1)}%`,
  dec = (n) => Number(n).toFixed(3);
export function DashboardContent() {
  const { queries, reviewedRows, filters, setFilter, assumptions, setAssumptions } = useDataApp(),
    { activeTabId } = useDashboardTabs(tabs),
    tab = activeTabId || "audit";
  const threshold = Math.max(.05,Math.min(.95,Number(assumptions.threshold ?? .5)));
  const model = Number(assumptions.engagement ?? 0) === 1 ? "retrospective" : "probability";
  const summary = queries.summary.rows[0],
    metrics = queries.metrics.rows,
    scope = reviewedRows("videos", ["video_id"]),
    categories = [
      ...new Set(queries.videos.rows.map((r) => r.category)),
    ].sort();
  const counts = { tp: 0, fp: 0, fn: 0, tn: 0 };
  scope.forEach(
    (r) =>
      counts[
        r[model] >= threshold ? (r.viral ? "tp" : "fp") : r.viral ? "fn" : "tn"
      ]++,
  );
  const positive = counts.tp + counts.fn,
    flagged = counts.tp + counts.fp,
    precision = flagged ? counts.tp / flagged : null,
    recall = positive ? counts.tp / positive : null;
  const histogram = Array.from({ length: 10 }, (_, i) => ({
    band: `${i * 10}–${(i + 1) * 10}%`,
    negative: scope.filter(
      (r) => !r.viral && Math.min(9, Math.floor(r[model] * 10)) === i,
    ).length,
    positive: scope.filter(
      (r) => r.viral && Math.min(9, Math.floor(r[model] * 10)) === i,
    ).length,
  }));
  return (
    <article className="video-app">
      <h1 className="accessible-title">Video Signal Lab</h1>
      <div className="project-context">
        <span>12,000 synthetic videos · Educational model audit</span>
        <a href="../../work/">Zim Bela / Work ↗</a>
      </div>
      {tab === "audit" && (
        <>
          <DataComponent
            id="feature-timing"
            queryId="summary"
            title="When is the information available?"
            kind="custom"
            variant="card"
            sourceRows={[summary]}
            displayRows={[summary]}
          >
            <div className="timing-story">
              <div>
                <span className="timing-label">BEFORE PUBLICATION</span>
                <h2>Metadata model</h2>
                <p>
                  Category, duration, title length, thumbnail flag, upload
                  timing, tags, description length, subscriber count.
                </p>
                <b>Valid inputs for the synthetic pre-upload question</b>
              </div>
              <div className="timing-divider" aria-hidden="true">
                →
              </div>
              <div>
                <span className="timing-label">AFTER THE OUTCOME</span>
                <h2>Engagement comparison</h2>
                <p>
                  The same metadata plus likes, comments and shares. The source
                  generates these counts from views.
                </p>
                <b>Retrospective comparison · outcome leakage</b>
              </div>
            </div>
          </DataComponent>
          <SortableRegion
            id="video:audit-metrics"
            variant="freeform"
            className="project-metrics"
          >
            {[
              ["pre-auc", "Pre-upload AUROC", dec(metrics[0].auc)],
              ["post-auc", "Retrospective AUROC", dec(metrics[1].auc)],
              ["test-videos", "Independent test rows", "2,400"],
            ].map(([id, title, value]) => (
              <SortableItem id={id} label={title} key={id} kind="metric">
                <MetricCard
                  id={id}
                  title={title}
                  queryId="metrics"
                  value={value}
                  sourceRows={metrics}
                  displayRows={metrics}
                />
              </SortableItem>
            ))}
          </SortableRegion>
          <p className="chart-note">
            AUROC measures how often a randomly chosen positive ranks above a
            negative; 0.5 is chance. Metadata model 95% bootstrap interval:{" "}
            {dec(summary.ci_low)}–{dec(summary.ci_high)}. Scores describe the
            source’s simulation, not actual YouTube outcomes.
          </p>
          <Section
            id="audit-comparison"
            title="Higher scores can answer the wrong question"
            columns={2}
          >
            <EvidenceChart
              id="performance-bars"
              queryId="metrics"
              title="Ranking performance on the same test set"
              rows={metrics}
              sourceRows={metrics}
              height={310}
              variant="card"
              spec={{
                type: "bar",
                x: "model",
                y: "auc",
                fields: ["auc", "ap"],
                showLegend: true,
                legend: { labels: { auc: "AUROC", ap: "Average precision" } },
                stackable: false,
                startAtZero: true,
                valueDecimals: 3,
                showXAxisLabel: false,
              }}
            />
            <EvidenceChart
              id="calibration-chart"
              queryId="calibration"
              title="Pre-upload probability versus observed frequency"
              rows={queries.calibration.rows.filter(
                (r) => r.model === "Pre-upload metadata",
              )}
              sourceRows={queries.calibration.rows.filter(
                (r) => r.model === "Pre-upload metadata",
              )}
              height={310}
              variant="card"
              spec={{
                type: "scatter",
                x: "predicted",
                y: "observed",
                xLabel: "Mean predicted probability",
                yLabel: "Observed positive fraction",
                valueDecimals: 3,
                startAtZero: true,
              }}
            />
          </Section>
          <div className="method-grid">
            <section>
              <h2>What the baseline tells us</h2>
              <p>
                20% of rows are positive by construction. A constant 20%
                probability gives average precision 0.200 and Brier score 0.160.
                The metadata model’s Brier score is {dec(metrics[0].brier)};
                lower means less squared probability error.
              </p>
            </section>
            <section>
              <h2>What “viral” means here</h2>
              <p>
                The source labels the top 20% of views. Its cutoff is{" "}
                {Math.round(summary.views_cutoff).toLocaleString()} views. This
                label is a rule inside a generated dataset, rather than a
                definition validated across channels or time.
              </p>
            </section>
          </div>
          <Section
            id="importance-title"
            title="What the metadata model relies on"
          >
            <EvidenceChart
              id="feature-importance"
              queryId="importance"
              title="Validation average-precision loss when a feature is shuffled"
              rows={[...queries.importance.rows].sort(
                (a, b) => b.ap_decrease - a.ap_decrease,
              )}
              sourceRows={queries.importance.rows}
              height={320}
              variant="card"
              spec={{
                type: "horizontalBar",
                x: "feature",
                y: "ap_decrease",
                fields: ["ap_decrease"],
                startAtZero: true,
                showLegend: false,
                valueDecimals: 3,
                showXAxisLabel: false,
              }}
            />
          </Section>
          <p className="chart-note">
            Permutation importance averages five shuffles on validation rows. It
            measures this fitted model’s reliance on a feature; it does not
            establish what causes real videos to succeed.
          </p>
        </>
      )}
      {tab === "threshold" && (
        <>
          <Filters
            filters={[]}
            queries={queries}
            values={filters}
            onChange={setFilter}
          >
            <Dropdown
              label="Category"
              showLabel
              value={filters.category || "all"}
              choices={["all", ...categories]}
              choiceLabels={{ all: "All categories" }}
              onChange={(v) => setFilter("category", v)}
            />
            <Dropdown
              label="Feature timing"
              showLabel
              value={model}
              choices={["probability", "retrospective"]}
              choiceLabels={{
                probability: "Pre-upload metadata",
                retrospective: "Post-outcome engagement",
              }}
              onChange={v=>setAssumptions({...assumptions,engagement:v==="retrospective"?1:0})}
            />
          </Filters>
          <div className="threshold-grid">
            <DataComponent
              id="threshold-control"
              queryId="videos"
              title="Explore a classification threshold"
              kind="custom"
              variant="card"
              sourceRows={scope}
              displayRows={[
                {
                  threshold,
                  videos: scope.length,
                  ...counts,
                  precision,
                  recall,
                },
              ]}
            >
              <div className="threshold-reading">
                <strong>{pct(threshold)}</strong>
                <span>
                  Flag a video when its model probability reaches this value.
                </span>
              </div>
              <Slider
                label="Probability threshold"
                min={0.05}
                max={0.95}
                step={0.05}
                value={threshold}
                onChange={(v) => setAssumptions({...assumptions,threshold:Number(v)})}
                formatValue={pct}
              />
              <div className="threshold-stats">
                <div>
                  <b>{precision === null ? "—" : pct(precision)}</b>
                  <span>Precision · positives among flagged</span>
                </div>
                <div>
                  <b>{recall === null ? "—" : pct(recall)}</b>
                  <span>Recall · positives found</span>
                </div>
              </div>
              <p className="chart-note">
                {scope.length.toLocaleString()} test videos · {positive}{" "}
                positives · {flagged} flagged. This control explores held-out
                predictions; choosing a policy here would require fresh
                validation.
              </p>
            </DataComponent>
            <DataComponent
              id="confusion-matrix"
              queryId="videos"
              title="Where does the threshold make mistakes?"
              kind="custom"
              variant="card"
              sourceRows={scope}
              displayRows={[{ threshold, ...counts }]}
            >
              <div className="confusion">
                <div>
                  <span>Correctly flagged</span>
                  <strong>{counts.tp}</strong>
                  <small>True positives</small>
                </div>
                <div className="error-cell">
                  <span>Flagged incorrectly</span>
                  <strong>{counts.fp}</strong>
                  <small>False positives</small>
                </div>
                <div className="error-cell">
                  <span>Missed positives</span>
                  <strong>{counts.fn}</strong>
                  <small>False negatives</small>
                </div>
                <div>
                  <span>Correctly unflagged</span>
                  <strong>{counts.tn}</strong>
                  <small>True negatives</small>
                </div>
              </div>
            </DataComponent>
          </div>
          <Section
            id="distribution-title"
            title="Separate score confidence from outcome"
          >
            <EvidenceChart
              id="score-distribution"
              queryId="videos"
              title="Probability distributions by known outcome"
              rows={histogram}
              sourceRows={scope}
              height={300}
              variant="card"
              spec={{
                type: "bar",
                x: "band",
                y: "negative",
                fields: ["negative", "positive"],
                showLegend: true,
                legend: {
                  labels: { negative: "Not viral", positive: "Viral" },
                },
                stackable: false,
                startAtZero: true,
                xLabel: "Predicted probability band",
                yLabel: "Test videos",
                valueDecimals: 0,
              }}
            />
          </Section>
          <Section
            id="video-records-title"
            title="Inspect the individual test rows"
          >
            <DataComponent
              id="video-records"
              queryId="videos"
              title="Synthetic held-out observations"
              kind="table"
              variant="card"
              sourceRows={scope}
              displayRows={scope.map((r) => ({
                ...r,
                score: r[model],
                flagged: r[model] >= threshold ? "Flagged" : "Not flagged",
              }))}
            >
              <DataTable
                label="Synthetic video scores and outcomes"
                rows={scope.map((r) => ({
                  ...r,
                  score: r[model],
                  flagged: r[model] >= threshold ? "Flagged" : "Not flagged",
                }))}
                columns={[
                  { field: "video_id", label: "Video" },
                  { field: "category", label: "Category" },
                  { field: "score", label: "Probability", renderCell: pct },
                  { field: "flagged", label: "Decision" },
                  {
                    field: "viral",
                    label: "Known outcome",
                    renderCell: (v) => (v ? "Viral" : "Not viral"),
                  },
                  {
                    field: "views",
                    label: "Generated views",
                    renderCell: (v) => v.toLocaleString(),
                  },
                ]}
              />
            </DataComponent>
          </Section>
        </>
      )}
      {tab === "method" && (
        <>
          <section className="method-intro">
            <h2>A model audit, from data contract to decision.</h2>
            <p>
              The interesting engineering question is whether a high score
              survives a clear definition of what is knowable at prediction
              time.
            </p>
          </section>
          <div className="split-story">
            <div>
              <strong>7,200</strong>
              <span>Training + 3-fold calibration</span>
            </div>
            <div>
              <strong>2,400</strong>
              <span>Validation / model selection</span>
            </div>
            <div>
              <strong>2,400</strong>
              <span>Untouched test rows</span>
            </div>
          </div>
          <div className="method-grid">
            <section>
              <h2>Synthetic source, explicit scope</h2>
              <p>
                Vedauv’s dataset contains 12,000 generated videos across 15
                categories. It includes no observed channels, timestamps, titles
                or thumbnails. A face flag and title length are metadata fields,
                not visual or language analysis.
              </p>
              <p>
                The source datasheet identifies this as a teaching benchmark.
                Results cannot support real creator strategy or causal claims.
              </p>
            </section>
            <section>
              <h2>Model selection and calibration</h2>
              <p>
                Logistic regression and gradient boosting are compared by
                validation average precision. Three stratified folds inside the
                training partition fit sigmoid probability calibrators. The
                selected model is {summary.winner.toLowerCase()}.
              </p>
              <p>
                The engagement model is a deliberate leakage comparison. Views
                and the target itself are excluded from both feature sets.
              </p>
            </section>
            <section>
              <h2>Holdout discipline</h2>
              <p>
                Seeds 42 and 43 define stratified 60/20/20 partitions.
                Transformations fit within training folds. The 0.50 evaluation
                threshold is fixed in advance. Interactive threshold changes are
                exploratory only.
              </p>
            </section>
            <section>
              <h2>What would make it real?</h2>
              <p>
                Collect appropriately licensed, timestamped channel/video data.
                Define a future observation horizon and exposure-adjusted
                outcome. Hold out channels and future periods, validate feature
                timing and monitor probability calibration after deployment.
              </p>
            </section>
          </div>
          <Section id="video-validation-title" title="Candidate evidence">
            <DataComponent
              id="video-validation"
              queryId="candidates"
              title="Validation performance before test evaluation"
              kind="table"
              variant="card"
              sourceRows={queries.candidates.rows}
              displayRows={queries.candidates.rows}
            >
              <DataTable
                searchable={false}
                label="Validation candidate scores"
                rows={queries.candidates.rows}
                columns={[
                  { field: "model", label: "Candidate" },
                  { field: "ap", label: "Average precision", renderCell: dec },
                  { field: "auc", label: "AUROC", renderCell: dec },
                  { field: "brier", label: "Brier score", renderCell: dec },
                ]}
              />
            </DataComponent>
          </Section>
          <div className="artifact-links">
            <a href="./analysis.html">Executed analysis ↗</a>
            <a href="./project.zip" download>
              Complete project ↓
            </a>
            <a href="./datasheet.md">Source datasheet ↗</a>
            <a
              href="https://www.kaggle.com/datasets/vedauv/what-makes-a-yt-video-go-viral-12000-vids"
              target="_blank"
              rel="noreferrer"
            >
              Kaggle source ↗
            </a>
          </div>
        </>
      )}
    </article>
  );
}
