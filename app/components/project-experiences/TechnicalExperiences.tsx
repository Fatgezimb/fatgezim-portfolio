"use client";

/* eslint-disable @next/next/no-img-element -- Preserve the source product's attributed public images. */
import { useId, useState } from "react";
import { neuralUnits, rbtTasks, recallCards } from "@/app/content/technical-preview";
import styles from "./TechnicalExperiences.module.css";

// Exact first 20 seconds of the checked-in NeuroStack public NWB derivative.
// 100 ms firing-rate bins are averaged into one-second display bins.

function ViewNavigation<T extends string>({
  items,
  active,
  onChange,
  label,
}: {
  items: readonly { id: T; label: string }[];
  active: T;
  onChange: (value: T) => void;
  label: string;
}) {
  return (
    <nav className={styles.navigation} aria-label={label}>
      {items.map((item) => (
        <button
          type="button"
          key={item.id}
          aria-pressed={active === item.id}
          onClick={() => onChange(item.id)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}

function NeuroStackExperience() {
  const [view, setView] = useState<"rate" | "raster" | "source">("rate");
  const [unitId, setUnitId] = useState("t1c1");
  const [rateMode, setRateMode] = useState("unit");
  const unit = neuralUnits.find((item) => item.id === unitId)!;
  const population = unit.rates.map(
    (_, index) =>
      neuralUnits.reduce((sum, item) => sum + item.rates[index], 0) /
      neuralUnits.length,
  );
  const rates = rateMode === "population" ? population : unit.rates;
  const maximum = Math.max(1, ...rates);
  const mean = rates.reduce((sum, value) => sum + value, 0) / rates.length;
  const points = rates
    .map(
      (value, index) =>
        `${45 + (index + 0.5) * 23},${179 - (value / maximum) * 140}`,
    )
    .join(" ");
  return (
    <section
      className={`${styles.experience} ${styles.neuro}`}
      aria-label="NeuroStack analysis sample"
    >
      <div className={styles.appHeader}>
        <span className={styles.appIdentity}>
          <span className={styles.neuroMark} aria-hidden="true">
            NS
          </span>
          Analysis workspace
        </span>
        <span className={styles.statePill}>Public-derived</span>
      </div>
      <ViewNavigation
        label="Analysis views"
        active={view}
        onChange={setView}
        items={[
          { id: "rate", label: "Firing rate" },
          { id: "raster", label: "Spike raster" },
          { id: "source", label: "Provenance" },
        ]}
      />
      {view === "source" ? (
        <div className={styles.sourcePanel}>
          <p className={styles.kicker}>Source → derivative → display</p>
          <h3>One pinned public recording.</h3>
          <p>Medial entorhinal cortex, layer II · Long Evans rat</p>
          <dl className={styles.provenance}>
            <div>
              <dt>Dataset</dt>
              <dd>DANDI 000582 · v0.251111.2151</dd>
            </div>
            <div>
              <dt>Session</dt>
              <dd>sub-10073 · ses-17010302</dd>
            </div>
            <div>
              <dt>Source / visible window</dt>
              <dd>600 seconds / first 20 seconds</dd>
            </div>
            <div>
              <dt>License</dt>
              <dd>CC BY 4.0 · Sargolini et al.</dd>
            </div>
            <div>
              <dt>Source SHA-256</dt>
              <dd className={styles.checksum}>
                43b3b435b953d22e276acc494af2926b63deaf15d2834531b2a87d08a8458a09
              </dd>
            </div>
          </dl>
          <p className={styles.finePrint}>
            Precomputed public data. This window shows observed spike times and
            one-second averages of the source derivative’s 100 ms rate bins.
          </p>
        </div>
      ) : (
        <div className={styles.analysisLayout}>
          <aside className={styles.analysisControls}>
            <label>
              Target unit
              <select
                value={unitId}
                onChange={(event) => setUnitId(event.target.value)}
              >
                {neuralUnits.map((item) => (
                  <option key={item.id}>{item.id}</option>
                ))}
              </select>
            </label>
            {view === "rate" ? (
              <label>
                Rate view
                <select
                  value={rateMode}
                  onChange={(event) => setRateMode(event.target.value)}
                >
                  <option value="unit">Selected unit</option>
                  <option value="population">Population mean</option>
                </select>
              </label>
            ) : null}
            <div className={styles.windowReadout}>
              <span>Selected interval</span>
              <strong>0 — 20 s</strong>
              <small>8 recorded units</small>
            </div>
            <p className={styles.finePrint}>
              DANDI 000582
              <br />
              NWB derivative
              <br />
              CC BY 4.0
            </p>
          </aside>
          <div className={styles.analysisCanvas}>
            <div className={styles.chartHeading}>
              <div>
                <p className={styles.kicker}>
                  {view === "rate"
                    ? "Observed firing rate"
                    : "Observed spike times"}
                </p>
                <h3>
                  {view === "rate" && rateMode === "population"
                    ? "Population mean"
                    : `Unit ${unitId}`}
                </h3>
              </div>
              <span className={styles.measurement}>
                {view === "rate"
                  ? `${mean.toFixed(2)} Hz mean`
                  : `${unit.spikes.length} spikes`}
              </span>
            </div>
            <svg
              className={styles.chart}
              viewBox="0 0 540 220"
              role="img"
              aria-label={
                view === "rate"
                  ? `${rateMode === "population" ? "Population mean" : unitId} firing rate over 20 seconds, mean ${mean.toFixed(2)} hertz. Exact values are in the data table.`
                  : `Spike raster for eight units over 20 seconds. Selected unit ${unitId} has ${unit.spikes.length} spikes.`
              }
            >
              {[39, 109, 179].map((y) => (
                <line
                  key={y}
                  x1="45"
                  x2="510"
                  y1={y}
                  y2={y}
                  className={styles.gridLine}
                />
              ))}
              {view === "rate" ? (
                <>
                  <text x="8" y="43">
                    {maximum.toFixed(1)}
                  </text>
                  <text x="8" y="113">
                    {(maximum / 2).toFixed(1)}
                  </text>
                  <text x="18" y="183">
                    0
                  </text>
                  <text x="8" y="20">
                    Hz
                  </text>
                  <polygon
                    points={`56.5,179 ${points} 493.5,179`}
                    className={styles.rateFill}
                  />
                  <polyline points={points} className={styles.rateLine} />
                </>
              ) : (
                neuralUnits.map((item, index) => (
                  <g
                    key={item.id}
                    className={
                      item.id === unitId ? styles.selectedSpikes : styles.spikes
                    }
                  >
                    <text x="4" y={43 + index * 19}>
                      {item.id}
                    </text>
                    {item.spikes.map((time, spikeIndex) => (
                      <line
                        key={spikeIndex}
                        x1={45 + (time / 20) * 460}
                        x2={45 + (time / 20) * 460}
                        y1={33 + index * 19}
                        y2={43 + index * 19}
                      />
                    ))}
                  </g>
                ))
              )}
              <text x="43" y="207">
                0
              </text>
              <text x="265" y="207">
                10
              </text>
              <text x="475" y="207">
                20 s
              </text>
            </svg>
            <details className={styles.dataDetails}>
              <summary>Inspect the values</summary>
              <div
                className={styles.tableScroll}
                role="region"
                tabIndex={0}
                aria-label="Scrollable exact neural data values"
              >
                <table>
                  <caption>
                    {view === "rate"
                      ? "One-second mean firing rates (Hz)"
                      : `${unitId}: observed spike times (seconds)`}
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">
                        {view === "rate" ? "Interval (s)" : "Spike"}
                      </th>
                      <th scope="col">
                        {view === "rate" ? "Rate (Hz)" : "Time (s)"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {view === "rate"
                      ? rates.map((rate, index) => (
                          <tr key={index}>
                            <td>
                              {index}–{index + 1}
                            </td>
                            <td>{rate.toFixed(3)}</td>
                          </tr>
                        ))
                      : unit.spikes.map((time, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{time.toFixed(4)}</td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </details>
            <p className={styles.finePrint}>
              Choose a unit to update the view. Public-derived data; this sample
              does not refit models.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

function RbtExperience() {
  const cardDescriptionId = useId();
  const [view, setView] = useState<"cards" | "practice" | "progress">("cards");
  const [taskIndex, setTaskIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<number[]>([]);
  const [correct, setCorrect] = useState<number[]>([]);
  const [choice, setChoice] = useState("");
  const [checked, setChecked] = useState(false);
  const task = rbtTasks[taskIndex];
  function selectTask(index: number) {
    setTaskIndex(index);
    setFlipped(false);
    setChoice("");
    setChecked(false);
  }
  function checkAnswer() {
    setChecked(true);
    if (choice === task.answer)
      setCorrect((current) =>
        current.includes(taskIndex) ? current : [...current, taskIndex],
      );
  }
  return (
    <section
      className={`${styles.experience} ${styles.rbt}`}
      aria-label="RBT study sample"
    >
      <div className={styles.appHeader}>
        <span className={styles.appIdentity}>
          <span className={styles.rbtMark} aria-hidden="true">
            ▤
          </span>
          Study workspace
        </span>
        <span className={styles.statePill}>
          {known.length} {known.length === 1 ? "card" : "cards"} known
        </span>
      </div>
      <ViewNavigation
        label="Study sections"
        active={view}
        onChange={setView}
        items={[
          { id: "cards", label: "Flashcards" },
          { id: "practice", label: "Practice questions" },
          { id: "progress", label: "My progress" },
        ]}
      />
      <div className={styles.studyLayout}>
        <aside className={styles.taskList}>
          <p className={styles.kicker}>Measurement</p>
          {rbtTasks.map((item, index) => (
            <button
              type="button"
              key={item.number}
              aria-pressed={taskIndex === index}
              onClick={() => selectTask(index)}
            >
              <span>{item.number}</span>
              <span>
                {item.name}
                {known.includes(index) ? <small>Card known ✓</small> : null}
              </span>
            </button>
          ))}
        </aside>
        <div className={styles.studyContent}>
          {view === "cards" ? (
            <>
              <div className={styles.chartHeading}>
                <p className={styles.kicker}>
                  Task {task.number} · original flashcard
                </p>
                <span className={styles.cardCounter}>{taskIndex + 1} / 3</span>
              </div>
              <button
                type="button"
                className={`${styles.flashcard} ${flipped ? styles.flashcardRevealed : ""}`}
                onClick={() => setFlipped((value) => !value)}
                aria-pressed={flipped}
                aria-label={
                  flipped
                    ? "Show flashcard question"
                    : "Reveal flashcard answer"
                }
                aria-describedby={cardDescriptionId}
              >
                <span className={styles.kicker}>
                  {flipped ? "Answer" : "Recall the concept"}
                </span>
                <strong id={cardDescriptionId}>
                  {flipped ? task.back : task.front}
                </strong>
                <span className={styles.flipHint}>
                  {flipped ? "↶ Back to question" : "↻ Tap to reveal"}
                </span>
              </button>
              <div className={styles.studyActions}>
                <button
                  type="button"
                  className={styles.secondary}
                  onClick={() => selectTask((taskIndex + 1) % rbtTasks.length)}
                >
                  Next card →
                </button>
                <button
                  type="button"
                  className={styles.primary}
                  onClick={() =>
                    setKnown((current) =>
                      current.includes(taskIndex)
                        ? current
                        : [...current, taskIndex],
                    )
                  }
                >
                  {known.includes(taskIndex) ? "Marked known ✓" : "Mark known"}
                </button>
              </div>
            </>
          ) : view === "practice" ? (
            <>
              <p className={styles.kicker}>
                Task {task.number} · practice question
              </p>
              <h3 className={styles.question}>{task.question}</h3>
              <fieldset className={styles.choices}>
                <legend className={styles.srOnly}>Choose an answer</legend>
                {task.choices.map((answer, index) => (
                  <label
                    key={answer}
                    className={choice === answer ? styles.choiceSelected : ""}
                  >
                    <input
                      type="radio"
                      name={`rbt-question-${task.number}`}
                      checked={choice === answer}
                      onChange={() => {
                        setChoice(answer);
                        setChecked(false);
                      }}
                    />
                    <span className={styles.choiceLetter}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{answer}</span>
                  </label>
                ))}
              </fieldset>
              <div className={styles.studyActions}>
                <button
                  type="button"
                  className={styles.primary}
                  disabled={!choice}
                  onClick={checkAnswer}
                >
                  Check answer
                </button>
              </div>
              {checked ? (
                <div
                  className={`${styles.feedback} ${choice === task.answer ? styles.correctFeedback : styles.reviewFeedback}`}
                  role="status"
                >
                  <strong>
                    {choice === task.answer ? "Correct" : "Keep practicing"}
                  </strong>
                  <p>{task.explanation}</p>
                </div>
              ) : null}
            </>
          ) : (
            <>
              <p className={styles.kicker}>This visit</p>
              <h3>Your study activity</h3>
              <p className={styles.progressSummary}>
                {known.length} {known.length === 1 ? "card" : "cards"} known ·{" "}
                {correct.length}{" "}
                {correct.length === 1 ? "question" : "questions"} answered
                correctly
              </p>
              <progress
                className={styles.progressBar}
                value={known.length + correct.length}
                max="6"
                aria-label="Activity across the three sample tasks"
              />
              <div className={styles.progressRows}>
                {rbtTasks.map((item, index) => (
                  <div key={item.number}>
                    <strong>{item.name}</strong>
                    <span>
                      {known.includes(index)
                        ? "Card known ✓"
                        : "Card to review"}
                    </span>
                    <span>
                      {correct.includes(index)
                        ? "Question correct ✓"
                        : "Question to try"}
                    </span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className={styles.secondary}
                onClick={() => {
                  setKnown([]);
                  setCorrect([]);
                  selectTask(0);
                }}
              >
                Reset sample progress
              </button>
            </>
          )}
          <p className={styles.finePrint}>
            Three sample tasks from the study hub. Independent learning
            resource; not an official BACB assessment.
          </p>
          <span className={styles.srOnly} role="status">
            {known.length} sample cards marked known.
          </span>
        </div>
      </div>
    </section>
  );
}

function StepSparkExperience() {
  const [view, setView] = useState<"review" | "library" | "source">("review");
  const [cardIndex, setCardIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [confidence, setConfidence] = useState(3);
  const [fluency, setFluency] = useState("Yellow");
  const [saved, setSaved] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const card = recallCards[cardIndex];
  function openCard(index: number) {
    setCardIndex(index);
    setRevealed(false);
    setMessage("");
    setView("review");
  }
  return (
    <section
      className={`${styles.experience} ${styles.spark}`}
      aria-label="StepSpark visual recall sample"
    >
      <div className={styles.appHeader}>
        <span className={styles.appIdentity}>
          <span className={styles.sparkMark} aria-hidden="true">
            ϟ
          </span>
          Instant Recall
        </span>
        <span className={styles.statePill}>{saved.length} reviewed</span>
      </div>
      <ViewNavigation
        label="Recall sections"
        active={view}
        onChange={setView}
        items={[
          { id: "review", label: "Review" },
          { id: "library", label: "Library" },
          { id: "source", label: "Card info" },
        ]}
      />
      <div className={styles.sparkContent}>
        {view === "library" ? (
          <>
            <p className={styles.kicker}>Two cards from the draft seed deck</p>
            <h3>Choose a visual prompt.</h3>
            <div className={styles.library}>
              {recallCards.map((item, index) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => openCard(index)}
                >
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    width="160"
                    height="120"
                  />
                  <span>
                    <small>{item.system} · Draft</small>
                    <strong>{item.title}</strong>
                    <span>
                      {saved.includes(item.id)
                        ? "Reviewed this visit ✓"
                        : "Open card →"}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : view === "source" ? (
          <>
            <p className={styles.kicker}>Source-aware study</p>
            <h3>{card.title}</h3>
            <dl className={styles.provenance}>
              <div>
                <dt>Card</dt>
                <dd>{card.id} · StepSpark draft seed deck</dd>
              </div>
              <div>
                <dt>Image source</dt>
                <dd>{card.source}</dd>
              </div>
              <div>
                <dt>Image license</dt>
                <dd>{card.license}</dd>
              </div>
              <div>
                <dt>Medical review</dt>
                <dd>Pending</dd>
              </div>
            </dl>
            <a
              className={styles.sourceLink}
              href={card.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View image source ↗
              <span className={styles.srOnly}> (opens in a new tab)</span>
            </a>
            <p className={styles.finePrint}>
              Draft educational content requires medical education review before
              production use.
            </p>
          </>
        ) : (
          <>
            <div className={styles.chartHeading}>
              <div>
                <p className={styles.kicker}>
                  {card.system} · visual recognition
                </p>
                <h3>{card.title}</h3>
              </div>
              <span className={styles.cardCounter}>{cardIndex + 1} / 2</span>
            </div>
            <div className={styles.recallLayout}>
              <figure className={styles.medicalImage}>
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  loading="lazy"
                  width="320"
                  height="240"
                />
                <figcaption>
                  {card.system} · {card.license}
                </figcaption>
              </figure>
              <div className={styles.recallCopy}>
                <p className={styles.kicker}>Your task</p>
                <h4>{card.prompt}</h4>
                <p>{card.clue}</p>
                <button
                  type="button"
                  className={styles.primary}
                  aria-expanded={revealed}
                  onClick={() => setRevealed((value) => !value)}
                >
                  {revealed ? "Hide answer" : "Reveal answer"}
                </button>
              </div>
            </div>
            {revealed ? (
              <div className={styles.recallAnswer} role="status">
                <strong>{card.answer}</strong>
                <p>{card.explanation}</p>
              </div>
            ) : null}
            <div className={styles.reviewControls}>
              <div>
                <span>Confidence</span>
                <div className={styles.ratingButtons}>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      type="button"
                      key={rating}
                      aria-label={`Confidence ${rating} of 5`}
                      aria-pressed={confidence === rating}
                      onClick={() => setConfidence(rating)}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span>Fluency</span>
                <div className={styles.ratingButtons}>
                  {["Red", "Yellow", "Green"].map((rating) => (
                    <button
                      type="button"
                      key={rating}
                      aria-pressed={fluency === rating}
                      onClick={() => setFluency(rating)}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.studyActions}>
              <button
                type="button"
                className={styles.secondary}
                onClick={() => openCard((cardIndex + 1) % recallCards.length)}
              >
                Next card →
              </button>
              <button
                type="button"
                className={styles.primary}
                onClick={() => {
                  setSaved((current) =>
                    current.includes(card.id) ? current : [...current, card.id],
                  );
                  setMessage(
                    `Saved for this visit: confidence ${confidence}/5 · ${fluency.toLowerCase()} fluency.`,
                  );
                }}
              >
                Save review
              </button>
            </div>
            <p className={styles.saveMessage} role="status">
              {message || "Draft educational cards · medical review pending"}
            </p>
          </>
        )}
      </div>
    </section>
  );
}

export function TechnicalExperience({ projectId }: { projectId: string }) {
  if (projectId === "neurostack-explorer") return <NeuroStackExperience />;
  if (projectId === "rbt-practice-hub") return <RbtExperience />;
  if (projectId === "stepspark") return <StepSparkExperience />;
  return null;
}
