"use client";
import { useState } from "react";
import styles from "./Approach.module.css";
const stages = [
  {
    label: "Read the input",
    title: "Keep the source in sight.",
    text: "An export starts as individual records. Before drawing a conclusion, I want to know what each row says and what is missing.",
    detail: "Four fictional records. The original rows stay visible.",
  },
  {
    label: "Check the rules",
    title: "Make the boundary explicit.",
    text: "A missing duration needs attention. A canceled appointment should not become completed hours. The rules should be visible before the summary.",
    detail: "Only completed records with a duration qualify.",
  },
  {
    label: "Show the result",
    title: "Let the answer explain itself.",
    text: "Two qualifying records add up to 3.5 hours. A useful summary keeps a route back to the rows and the decisions behind it.",
    detail: "2.0 + 1.5 = 3.5 completed hours",
  },
];
const records = [
  { id: "A", status: "Completed", duration: "2.0 h", ok: true },
  { id: "B", status: "Canceled", duration: "1.0 h", ok: false },
  { id: "C", status: "Completed", duration: "1.5 h", ok: true },
  { id: "D", status: "Completed", duration: "Missing", ok: false },
];
export function BuildApproach() {
  const [stage, setStage] = useState(0);
  const [resolved, setResolved] = useState(false);
  const rows = records.map((row) =>
    row.id === "D" && resolved ? { ...row, duration: "1.0 h", ok: true } : row,
  );
  const eligible = rows.filter((row) => row.ok);
  const total = eligible
    .reduce((sum, row) => sum + parseFloat(row.duration), 0)
    .toFixed(1);
  const calculation =
    eligible.map((row) => parseFloat(row.duration).toFixed(1)).join(" + ") +
    ` = ${total} completed hours`;

  return (
    <section
      id="process"
      className={styles.section}
      aria-labelledby="process-title"
    >
      <header className={styles.heading} data-reveal="up">
        <p className={styles.kicker}>A closer look at how I build</p>
        <h2 id="process-title">Follow one result.</h2>
        <p>
          A small example of the thinking behind my data tools.
          <br />
          Follow the records from input to decision.
        </p>
      </header>
      <div className={styles.bench}>
        <div className={styles.explanation}>
          <div
            className={styles.steps}
            role="group"
            aria-label="Inspect the data workflow"
          >
            {stages.map((s, i) => (
              <button
                type="button"
                key={s.label}
                aria-pressed={stage === i}
                onClick={() => setStage(i)}
              >
                <span>0{i + 1}</span>
                {s.label}
                <b aria-hidden="true">{stage === i ? "↘" : "→"}</b>
              </button>
            ))}
          </div>
          <div
            className={styles.stepCopy}
            aria-live="polite"
            aria-atomic="true"
          >
            <h3>{stages[stage].title}</h3>
            <p>
              {stage === 2
                ? `${eligible.length} qualifying records add up to ${total} hours. A useful summary keeps a route back to the rows and the decisions behind it.`
                : stages[stage].text}
            </p>
          </div>
          <a href="#project-bela-behavior-data-lab">
            Try Behavior Data Lab <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className={styles.machine} data-stage={stage}>
          <div className={styles.paper}>
            <header>
              <span>SOURCE / SAMPLE.CSV</span>
              <span>4 records</span>
            </header>
            <table>
              <caption className="sr-only">
                Fictional appointment records used in this walkthrough
              </caption>
              <thead>
                <tr>
                  <th scope="col">Record</th>
                  <th scope="col">Status</th>
                  <th scope="col">Duration</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.id}
                    data-qualifies={r.ok}
                    data-reviewed={stage > 0}
                  >
                    <th scope="row">{r.id}</th>
                    <td>{r.status}</td>
                    <td>
                      {r.duration}
                      {stage > 0 && (
                        <span className={styles.recordMark}>
                          {r.ok ? " ✓" : r.id === "B" ? " —" : " ?"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>Fictional example · no client data</p>
            {stage > 0 && (
              <label className={styles.sampleEdit}>
                <input
                  type="checkbox"
                  checked={resolved}
                  onChange={(e) => setResolved(e.target.checked)}
                />{" "}
                Give record D a one-hour duration
              </label>
            )}
          </div>
          <div className={styles.connector} aria-hidden="true">
            <span />
            <b>{stage === 0 ? "↓" : stage === 1 ? "✓" : "↓"}</b>
            <span />
          </div>
          <div className={styles.result} aria-live="polite" aria-atomic="true">
            <div>
              <p>
                {stage === 2
                  ? "COMPLETED HOURS"
                  : stage === 1
                    ? "REVIEW THE INPUT"
                    : "READY TO INSPECT"}
              </p>
              <strong>
                {stage === 2
                  ? total
                  : stage === 1
                    ? `${eligible.length} / 4`
                    : "—"}
                <small>
                  {stage === 2 ? "h" : stage === 1 ? "qualify" : ""}
                </small>
              </strong>
            </div>
            <p>{stage === 2 ? calculation : stages[stage].detail}</p>
            {stage === 2 && (
              <button type="button" onClick={() => setStage(1)}>
                Inspect the qualifying rows <span aria-hidden="true">↑</span>
              </button>
            )}
          </div>
        </div>
      </div>
      <noscript>
        <div className={styles.noScript}>
          <h3>The decision</h3>
          <p>
            Completed records with a duration qualify. A and C total 3.5 hours.
            B is canceled; D needs a duration before it can be counted.
          </p>
        </div>
      </noscript>
    </section>
  );
}
