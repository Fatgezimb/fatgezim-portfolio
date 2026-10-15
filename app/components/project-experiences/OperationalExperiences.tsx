"use client";

import { useId, useState } from "react";
import {
  appointments,
  lessons,
  sampleQueue,
  sampleRates,
} from "@/app/content/operational-preview";
import styles from "./OperationalExperiences.module.css";

function DataLabExperience() {
  const [view, setView] = useState("Overview");
  const [range, setRange] = useState("all");
  const [selected, setSelected] = useState<string | null>(null);
  const rows = appointments.filter((row) => range === "all" || row.recent);
  const hours = rows.reduce((sum, row) => sum + row.hours, 0);
  const followUps = rows.filter(
    (row) => row.state === "Missing note" || row.state === "Needs verification",
  );
  const detail = rows.find((row) => row.id === selected);
  const visible = view === "Action lists" ? followUps : rows;
  return (
    <div className={`${styles.workspace} ${styles.dataLab}`}>
      <header className={styles.productHeader}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>B</span>
          <div>
            <strong>Operations workspace</strong>
            <small>Powered by NeuroPath LLC</small>
          </div>
        </div>
        <label className={styles.compactSelect}>
          Sample timeline
          <select
            value={range}
            onChange={(event) => {
              setRange(event.target.value);
              setSelected(null);
            }}
          >
            <option value="all">All sample records</option>
            <option value="recent">Recent sample records</option>
          </select>
        </label>
      </header>
      <div className={styles.contentGrid}>
        <nav
          className={styles.sideRail}
          aria-label="Operations workspace views"
        >
          {(["Overview", "Action lists", "Reports"] as const).map(
            (item, index) => (
              <button
                type="button"
                aria-pressed={view === item}
                key={item}
                onClick={() => {
                  setView(item);
                  setSelected(null);
                }}
              >
                <span aria-hidden="true">{["▦", "☷", "▤"][index]}</span>
                {item}
              </button>
            ),
          )}
          <p>
            Browser-local analytics
            <br />
            Synthetic records
          </p>
        </nav>
        <div className={styles.mainPanel}>
          <div className={styles.panelHeading}>
            <div>
              <p className={styles.eyebrow}>
                {view === "Reports"
                  ? "Range summary"
                  : "Operational intelligence"}
              </p>
              <h4>
                {view === "Overview"
                  ? "See what needs attention."
                  : view === "Action lists"
                    ? "A clear follow-up queue."
                    : "One range. A readable report."}
              </h4>
            </div>
            <span className={styles.status}>Sample data</span>
          </div>
          <div className={styles.metrics}>
            <button
              type="button"
              onClick={() => {
                setView("Reports");
                setSelected(null);
              }}
            >
              <span>Sample hours</span>
              <strong>
                {hours.toFixed(1)}
                <small> h</small>
              </strong>
            </button>
            <button
              type="button"
              onClick={() => {
                setView("Reports");
                setSelected(null);
              }}
            >
              <span>Ready records</span>
              <strong>
                {rows.filter((row) => row.state === "Ready").length}
              </strong>
            </button>
            <button
              type="button"
              onClick={() => {
                setView("Action lists");
                setSelected(null);
              }}
            >
              <span>Follow-up items</span>
              <strong>
                {followUps.length}
                <small> ↗</small>
              </strong>
            </button>
          </div>
          {view === "Overview" ? (
            <div className={styles.chartCard}>
              <div className={styles.chartHeading}>
                <strong>Hours by team</strong>
                <span>Synthetic sample</span>
              </div>
              <div className={styles.horizontalBars}>
                {["Team A", "Team B", "Team C"].map((team) => {
                  const value = rows
                    .filter((row) => row.team === team)
                    .reduce((sum, row) => sum + row.hours, 0);
                  return (
                    <button
                      type="button"
                      key={team}
                      onClick={() => {
                        setView("Reports");
                        setSelected(
                          rows.find((row) => row.team === team)?.id ?? null,
                        );
                      }}
                    >
                      <span>{team}</span>
                      <i aria-hidden="true">
                        <b
                          style={{
                            width: `${(value / Math.max(hours, 1)) * 100}%`,
                          }}
                        />
                      </i>
                      <strong>{value}h</strong>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className={styles.recordList}>
              <div className={styles.listHeading}>
                <strong>
                  {view === "Reports"
                    ? "Supporting records"
                    : "Review before the next step"}
                </strong>
                <span>{visible.length} records</span>
              </div>
              {visible.map((row) => (
                <button
                  type="button"
                  className={styles.record}
                  aria-pressed={selected === row.id}
                  key={row.id}
                  onClick={() =>
                    setSelected(selected === row.id ? null : row.id)
                  }
                >
                  <span>
                    <strong>{row.id}</strong>
                    <small>
                      {row.team} · {row.hours}h
                    </small>
                  </span>
                  <span
                    className={
                      row.state === "Ready" ? styles.ready : styles.pending
                    }
                  >
                    {row.state}
                  </span>
                  <span aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
          )}
          <div className={styles.detailStrip} role="status">
            {detail ? (
              <>
                <strong>
                  {detail.id} · {detail.state}
                </strong>
                <span>
                  {detail.team} · {detail.hours} sample hours. This invented
                  record demonstrates the source-row drill-down.
                </span>
              </>
            ) : (
              <>
                <strong>
                  {view === "Overview"
                    ? "Every summary has a source."
                    : "Inspect the rows behind the summary."}
                </strong>
                <span>
                  {view === "Overview"
                    ? "Choose a metric or team to open its supporting records."
                    : "Select a record to review its sample details."}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Educational examples adapted from the source-owned Big Feelings course.

function CaregiverExperience() {
  const [lesson, setLesson] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [completed, setCompleted] = useState<number[]>([]);
  const current = lessons[lesson];
  const correct = answer === current.correct;
  return (
    <div className={`${styles.workspace} ${styles.academy}`}>
      <header className={styles.academyHeader}>
        <div>
          <p className={styles.eyebrow}>Caregiver Academy</p>
          <strong>Little lessons. Practical support.</strong>
        </div>
        <span className={styles.learningProgress}>
          {completed.length} / {lessons.length} explored
        </span>
      </header>
      <div className={styles.academyLayout}>
        <aside className={styles.lessonSidebar}>
          <span className={styles.courseBadge}>Flagship course sample</span>
          <h4>
            Big feelings,
            <br />
            steadier moments.
          </h4>
          <p>From Big Feelings, Meltdowns, and Staying Calm</p>
          <nav aria-label="Caregiver sample lessons">
            {lessons.map((item, index) => (
              <button
                type="button"
                aria-pressed={lesson === index}
                key={item.title}
                onClick={() => {
                  setLesson(index);
                  setAnswer(null);
                }}
              >
                <span className={styles.lessonDot}>
                  {completed.includes(index) ? "✓" : index + 1}
                </span>
                <span>
                  <small>{item.stage}</small>
                  <strong>{item.title}</strong>
                </span>
              </button>
            ))}
          </nav>
        </aside>
        <div className={styles.lessonBody}>
          <div className={styles.lessonIntro}>
            <div>
              <p className={styles.eyebrow}>{current.stage} the moment</p>
              <h4>{current.title}</h4>
            </div>
            {/* Public product art; this static deployment has no image-optimization endpoint. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://beladatalab.com/brand/mascots/meili-monster-thinking.png"
              alt=""
              width="88"
              height="88"
              loading="lazy"
            />
          </div>
          <p className={styles.lessonCopy}>{current.intro}</p>
          <fieldset className={styles.knowledgeCheck}>
            <legend>{current.prompt}</legend>
            {current.choices.map((choice, index) => (
              <button
                type="button"
                aria-pressed={answer === index}
                key={choice}
                className={answer === index ? styles.selectedAnswer : undefined}
                onClick={() => setAnswer(index)}
              >
                <span aria-hidden="true">
                  {String.fromCharCode(65 + index)}
                </span>
                {choice}
              </button>
            ))}
          </fieldset>
          <div className={styles.lessonFeedback} aria-live="polite">
            {answer === null ? (
              <span>Choose a response to explore the explanation.</span>
            ) : correct ? (
              <>
                <strong>That matches the lesson.</strong>
                <span>{current.feedback}</span>
              </>
            ) : (
              <>
                <strong>Try another response.</strong>
                <span>
                  Revisit the idea above, then choose the response that respects
                  the course&apos;s educational scope.
                </span>
              </>
            )}
          </div>
          <button
            type="button"
            className={styles.primaryButton}
            disabled={!correct}
            onClick={() => {
              setCompleted((value) =>
                value.includes(lesson) ? value : [...value, lesson],
              );
              if (lesson < lessons.length - 1) {
                setLesson(lesson + 1);
                setAnswer(null);
              }
            }}
          >
            {completed.includes(lesson) && lesson === lessons.length - 1
              ? "Sample completed ✓"
              : lesson < lessons.length - 1
                ? "Continue to next lesson →"
                : "Mark sample complete"}
          </button>
          <p className={styles.scopeNote}>
            General education · local sample progress · no individualized care
          </p>
        </div>
      </div>
    </div>
  );
}

function AutomationExperience() {
  const [selected, setSelected] = useState<string>(sampleQueue[0]);
  const [prepared, setPrepared] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [finished, setFinished] = useState(false);
  const confirmId = useId();
  const reset = () => {
    setPrepared(false);
    setConfirmed(false);
    setFinished(false);
  };
  return (
    <div className={`${styles.workspace} ${styles.automation}`}>
      <header className={styles.productHeader}>
        <div className={styles.brand}>
          <span className={styles.automationMark} aria-hidden="true">
            ⇄
          </span>
          <div>
            <strong>Rethink Automation Center</strong>
            <small>Local beta · synthetic workflow</small>
          </div>
        </div>
        <button type="button" className={styles.quietButton} onClick={reset}>
          Reset sample
        </button>
      </header>
      <div className={styles.automationGrid}>
        <aside className={styles.queueSidebar}>
          <p className={styles.eyebrow}>Review queue</p>
          {sampleQueue.map((item) => (
            <button
              type="button"
              key={item}
              aria-pressed={selected === item}
              onClick={() => {
                setSelected(item);
                reset();
              }}
            >
              <span className={styles.queueBullet} aria-hidden="true" />
              <span>
                <strong>{item}</strong>
                <small>
                  {selected === item && finished
                    ? "Step 1 simulated"
                    : "Ready for review"}
                </small>
              </span>
              <span aria-hidden="true">›</span>
            </button>
          ))}
          <p className={styles.scopeNote}>
            Invented, non-clinical items.
            <br />
            No external connection.
          </p>
        </aside>
        <div className={styles.mainPanel}>
          <div className={styles.panelHeading}>
            <div>
              <p className={styles.eyebrow}>Add behaviors</p>
              <h4>{selected}</h4>
            </div>
            <span className={finished ? styles.status : styles.pending}>
              {finished ? "Review next steps" : "Pending"}
            </span>
          </div>
          <div
            className={styles.stepTrack}
            aria-label="Behavior workflow progress"
          >
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className={i === 0 ? styles.activeStep : undefined}>
                <span>{i === 0 && finished ? "✓" : i + 1}</span>
                <small>{i === 0 ? "Step 1" : "Manual"}</small>
              </div>
            ))}
          </div>
          {!prepared ? (
            <div className={styles.prepareCard}>
              <h5>Review before running.</h5>
              <p>
                The local beta prepares the first step. Confirm the target page
                before execution; later steps and final submission stay manual.
              </p>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={() => setPrepared(true)}
              >
                Prepare sample run →
              </button>
            </div>
          ) : (
            <div className={styles.confirmCard}>
              <strong>
                {finished
                  ? "Step 1 simulation complete"
                  : "Confirm the sample target"}
              </strong>
              <p>
                {finished
                  ? "The preview changed local state only. Continue the remaining steps manually in the real workflow."
                  : "This preview never opens or controls a clinical platform. It models the same confirmation boundary using fictional data."}
              </p>
              {!finished ? (
                <>
                  <label htmlFor={confirmId} className={styles.checkbox}>
                    <input
                      id={confirmId}
                      type="checkbox"
                      checked={confirmed}
                      onChange={(event) => setConfirmed(event.target.checked)}
                    />
                    I reviewed the fictional item and sample target.
                  </label>
                  <button
                    type="button"
                    className={styles.primaryButton}
                    disabled={!confirmed}
                    onClick={() => setFinished(true)}
                  >
                    Simulate Step 1
                  </button>
                </>
              ) : null}
            </div>
          )}
          <div
            className={styles.console}
            role="log"
            aria-label="Sample run log"
            aria-live="polite"
          >
            <div>
              <strong>Run console</strong>
              <span>{finished ? "Local simulation" : "Waiting"}</span>
            </div>
            <p>
              <span>›</span> {selected} selected
            </p>
            {prepared ? (
              <p>
                <span>›</span> Sample target prepared
              </p>
            ) : null}
            {confirmed ? (
              <p>
                <span>›</span> Review confirmed by visitor
              </p>
            ) : null}
            {finished ? (
              <>
                <p className={styles.consoleSuccess}>
                  <span>✓</span> Step 1 simulated in this preview
                </p>
                <p>
                  <span>›</span> Steps 2–6 and final submission: manual
                </p>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function InsightExperience() {
  const [state, setState] = useState("All states");
  const [code, setCode] = useState("All procedures");
  const [ascending, setAscending] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const rows = sampleRates
    .filter(
      (row) =>
        (state === "All states" || row.state === state) &&
        (code === "All procedures" || row.code === code),
    )
    .sort((a, b) => (ascending ? a.rate - b.rate : b.rate - a.rate));
  const detail = rows.find((row) => row.id === selected);
  const mean = rows.length
    ? rows.reduce((sum, row) => sum + row.rate, 0) / rows.length
    : 0;
  return (
    <div className={`${styles.workspace} ${styles.insight}`}>
      <header className={styles.productHeader}>
        <div className={styles.brand}>
          <span className={styles.insightMark} aria-hidden="true">
            ◈
          </span>
          <div>
            <strong>NeuroPath Insight</strong>
            <small>Reimbursement analysis prototype</small>
          </div>
        </div>
        <span className={styles.status}>Simulated dataset</span>
      </header>
      <div className={styles.insightBody}>
        <div className={styles.filterBar}>
          <label>
            State
            <select
              value={state}
              onChange={(event) => {
                setState(event.target.value);
                setSelected(null);
              }}
            >
              <option>All states</option>
              <option>Virginia</option>
              <option>North Carolina</option>
            </select>
          </label>
          <label>
            Procedure
            <select
              value={code}
              onChange={(event) => {
                setCode(event.target.value);
                setSelected(null);
              }}
            >
              <option>All procedures</option>
              <option>97153</option>
              <option>97155</option>
            </select>
          </label>
          <button
            type="button"
            className={styles.quietButton}
            onClick={() => setAscending(!ascending)}
          >
            {ascending ? "Rate ↑" : "Rate ↓"}
          </button>
        </div>
        <div className={styles.insightSummary}>
          <div>
            <p className={styles.eyebrow}>Filtered sample</p>
            <h4>Compare the underlying rows.</h4>
          </div>
          <div>
            <strong>${mean.toFixed(2)}</strong>
            <span>Simulated mean · {rows.length} rows</span>
          </div>
        </div>
        <div className={styles.benchmarkColumns}>
          <div className={styles.benchmarkChart}>
            <div className={styles.chartHeading}>
              <strong>Sample rate comparison</strong>
              <span>USD · simulated</span>
            </div>
            {rows.map((row) => (
              <button
                type="button"
                key={row.id}
                aria-pressed={selected === row.id}
                onClick={() => setSelected(selected === row.id ? null : row.id)}
              >
                <span>
                  {row.payer}
                  <small>
                    {row.state} · {row.code}
                  </small>
                </span>
                <i aria-hidden="true">
                  <b style={{ width: `${(row.rate / 80) * 100}%` }} />
                </i>
                <strong>${row.rate}</strong>
              </button>
            ))}
            {!rows.length ? (
              <p className={styles.empty}>
                No simulated rows match. Choose another filter.
              </p>
            ) : null}
          </div>
          <aside className={styles.provenance}>
            <p className={styles.eyebrow}>Row inspector</p>
            {detail ? (
              <>
                <h5>{detail.id}</h5>
                <dl>
                  <div>
                    <dt>Payer</dt>
                    <dd>{detail.payer}</dd>
                  </div>
                  <div>
                    <dt>Procedure</dt>
                    <dd>{detail.code}</dd>
                  </div>
                  <div>
                    <dt>Sample rate</dt>
                    <dd>${detail.rate} USD</dd>
                  </div>
                  <div>
                    <dt>Origin</dt>
                    <dd>Invented portfolio dataset</dd>
                  </div>
                </dl>
              </>
            ) : (
              <>
                <h5>From summary to source.</h5>
                <p>Select a bar to inspect the record behind it.</p>
              </>
            )}
            <span className={styles.simulatedNote}>
              Every value is simulated.
            </span>
          </aside>
        </div>
        <p className={styles.scopeNote}>
          Private prototype · sample analysis only · no financial recommendation
        </p>
      </div>
    </div>
  );
}

export function OperationalExperience({ projectId }: { projectId: string }) {
  switch (projectId) {
    case "bela-behavior-data-lab":
      return <DataLabExperience />;
    case "caregiver-academy":
      return <CaregiverExperience />;
    case "rethink-automations":
      return <AutomationExperience />;
    case "neuropath-insight":
      return <InsightExperience />;
    default:
      return null;
  }
}
