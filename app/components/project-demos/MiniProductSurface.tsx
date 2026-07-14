import type {
  BehaviorDataLabDemoState,
  CaregiverAcademyDemoState,
  NeuroPathInsightDemoState,
  ProjectDemoFrameData,
  RbtPracticeDemoState,
  RethinkAutomationDemoState,
  StepSparkDemoState,
} from "./storyboards";
import styles from "./ProjectMicroDemo.module.css";

type MiniWindowProps = {
  label: string;
  status: string;
  children: React.ReactNode;
};

function MiniWindow({ children, label, status }: MiniWindowProps) {
  return (
    <article className={styles.miniWindow} aria-label={label}>
      <header className={styles.miniWindowBar}>
        <span className={styles.windowDots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <strong>{label}</strong>
        <span className={styles.miniStatus}>{status}</span>
      </header>
      <div className={styles.miniWindowBody}>{children}</div>
    </article>
  );
}

function FileGlyph() {
  return (
    <svg aria-hidden="true" className={styles.fileGlyph} viewBox="0 0 44 52">
      <path d="M7 2h20l10 10v38H7z" />
      <path d="M27 2v11h10M14 23h16M14 30h16M14 37h11" />
    </svg>
  );
}

function BehaviorDataLabSurface({ data }: { data: BehaviorDataLabDemoState }) {
  return (
    <MiniWindow label="Bela Behavior Data Lab" status="Local session">
      <nav className={styles.appNav} aria-label="Synthetic workspace views">
        {(["Import", "Review", "Operations", "Report"] as const).map(
          (label, index) => (
            <span
              className={
                index ===
                ["workbook", "validation", "dashboard", "report"].indexOf(
                  data.view,
                )
                  ? styles.appNavActive
                  : undefined
              }
              key={label}
            >
              {label}
            </span>
          ),
        )}
      </nav>

      {data.view === "workbook" ? (
        <div className={styles.importLayout}>
          <div className={styles.fileDrop}>
            <FileGlyph />
            <strong>{data.fileLabel}</strong>
            <span>Bundled synthetic sample</span>
          </div>
          <div className={styles.sheetPreview} aria-label="Synthetic row preview">
            <div className={styles.sheetHeader}>
              <span>Row</span>
              <span>Shape</span>
              <span>State</span>
            </div>
            {data.items.map((item) => (
              <div className={styles.sheetRow} key={item}>
                <span>{item}</span>
                <span>Appointment-shaped</span>
                <span>Sample</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {data.view === "validation" ? (
        <div className={styles.reviewPanel}>
          <p className={styles.miniEyebrow}>Local import review</p>
          <ul className={styles.checkList}>
            {data.items.map((item, index) => (
              <li key={item}>
                <span aria-hidden="true">{index === 2 ? "!" : "✓"}</span>
                <div>
                  <strong>{item}</strong>
                  <small>{index === 2 ? "Ready for operator review" : "Shape recognized"}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {data.view === "dashboard" ? (
        <div className={styles.dashboardPreview}>
          <aside aria-label="Workspace navigation">
            {data.items.map((item, index) => (
              <span className={index === 0 ? styles.sideActive : undefined} key={item}>
                {item}
              </span>
            ))}
          </aside>
          <div className={styles.dashboardCanvas}>
            <p className={styles.miniEyebrow}>Synthetic operations view</p>
            <div className={styles.metricCards}>
              {(["Operations", "People", "Actions"] as const).map((label) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>Review view</strong>
                </div>
              ))}
            </div>
            <svg
              aria-label="Abstract trend line with no operational values"
              className={styles.lineChart}
              role="img"
              viewBox="0 0 380 76"
            >
              <path d="M5 61H375M5 37H375M5 13H375" />
              <polyline points="8,57 70,46 125,52 190,26 247,34 310,17 372,24" />
            </svg>
          </div>
        </div>
      ) : null}

      {data.view === "report" ? (
        <div className={styles.reportLayout}>
          <div className={styles.reportPage}>
            <header>
              <span>Sanitized output</span>
              <strong>{data.fileLabel}</strong>
            </header>
            {data.items.map((item) => (
              <section key={item}>
                <span>{item}</span>
                <i aria-hidden="true" />
                <i aria-hidden="true" />
              </section>
            ))}
          </div>
          <p className={styles.boundaryCallout}>
            <strong>No source upload</strong>
            <span>No real exports, names, dates, or PHI.</span>
          </p>
        </div>
      ) : null}
    </MiniWindow>
  );
}

function CaregiverAcademySurface({ data }: { data: CaregiverAcademyDemoState }) {
  return (
    <MiniWindow label="Caregiver Academy" status="Educational">
      <div className={styles.caregiverHeader}>
        <span className={styles.caregiverMark} aria-hidden="true">CA</span>
        <div>
          <p className={styles.miniEyebrow}>Learning path</p>
          <strong>{data.topic}</strong>
        </div>
        <span className={styles.scopePill}>No child profile</span>
      </div>

      {data.view === "routine" ? (
        <div className={styles.routineGrid}>
          {data.items.map((item, index) => (
            <article className={index === 0 ? styles.routineSelected : undefined} key={item}>
              <span aria-hidden="true">{["☀", "↗", "◌"][index]}</span>
              <strong>{item}</strong>
              <small>{index === 0 ? "Preview selected" : "General topic"}</small>
            </article>
          ))}
        </div>
      ) : null}

      {data.view === "lesson" ? (
        <div className={styles.lessonLayout}>
          <ol className={styles.lessonRail} aria-label="Guided lesson sections">
            {data.items.map((item, index) => (
              <li aria-current={index === 1 ? "step" : undefined} key={item}>
                <span>{index + 1}</span>
                {item}
              </li>
            ))}
          </ol>
          <article className={styles.lessonCard}>
            <span className={styles.cardIcon} aria-hidden="true">◇</span>
            <p className={styles.miniEyebrow}>Generic scenario</p>
            <strong>Connect the lesson to an observable routine.</strong>
            <p>Plain-language education stays separate from individualized clinical guidance.</p>
          </article>
        </div>
      ) : null}

      {data.view === "check" ? (
        <div className={styles.knowledgeCheck}>
          <p className={styles.miniEyebrow}>Knowledge check</p>
          <strong>Review the generic scenario before opening the explanation.</strong>
          <div className={styles.answerChoices}>
            {data.items.map((item, index) => (
              <span className={index === 1 ? styles.answerSelected : undefined} key={item}>
                <i aria-hidden="true">{index === 1 ? "●" : "○"}</i>
                {item}
              </span>
            ))}
          </div>
          <p className={styles.educationNote}>Educational explanation · not a clinical recommendation</p>
        </div>
      ) : null}

      {data.view === "tool" ? (
        <div className={styles.toolLayout}>
          <div className={styles.printableTool}>
            <header>
              <span>Printable tool</span>
              <strong>Everyday routine map</strong>
            </header>
            <ol>
              {data.items.map((item, index) => (
                <li key={item}>
                  <span>{index + 1}</span>
                  <strong>{item}</strong>
                  <i aria-hidden="true" />
                </li>
              ))}
            </ol>
          </div>
          <p className={styles.boundaryCallout}>
            <strong>Educational boundary</strong>
            <span>Not individualized care, a behavior plan, or crisis guidance.</span>
          </p>
        </div>
      ) : null}
    </MiniWindow>
  );
}

const rbtTasks = Array.from({ length: 19 }, (_, index) => index + 1);

function RbtPracticeSurface({ data }: { data: RbtPracticeDemoState }) {
  return (
    <MiniWindow label="RBT Practice Hub" status="Independent resource">
      <div className={styles.rbtHeader}>
        <div>
          <p className={styles.miniEyebrow}>Competency practice</p>
          <strong>Task {String(data.activeTask).padStart(2, "0")}</strong>
        </div>
        <span className={styles.assessmentPill}>{data.assessmentType}</span>
      </div>

      {data.view === "map" ? (
        <ol className={styles.taskMap} aria-label="Nineteen-task practice map">
          {rbtTasks.map((task) => (
            <li aria-current={task === data.activeTask ? "step" : undefined} key={task}>
              <span>{String(task).padStart(2, "0")}</span>
              <small>{task === data.activeTask ? "Selected" : "Practice"}</small>
            </li>
          ))}
        </ol>
      ) : null}

      {data.view === "flashcard" ? (
        <div className={styles.flashcardScene}>
          <div className={styles.flashcardBack} aria-hidden="true" />
          <article className={styles.flashcard}>
            <span>Original practice card</span>
            <p>Task {String(data.activeTask).padStart(2, "0")}</p>
            <strong>Review the task, then reveal the original study explanation.</strong>
            <small>Self-check · not an official assessment</small>
          </article>
        </div>
      ) : null}

      {data.view === "question" ? (
        <div className={styles.practiceQuestion}>
          <p className={styles.miniEyebrow}>Original practice scenario</p>
          <strong>Which response best matches your independent review?</strong>
          <div className={styles.questionOptions}>
            <span><i>A</i> Revisit the task description</span>
            <span className={styles.questionSelected}><i>B</i> Record a local practice answer</span>
            <span><i>C</i> Open the explanation</span>
          </div>
          <small>Sample state only · no competence decision</small>
        </div>
      ) : null}

      {data.view === "progress" ? (
        <div className={styles.progressReview}>
          <div className={styles.progressOrbit} aria-hidden="true">
            {rbtTasks.map((task) => <i data-active={task === data.activeTask} key={task} />)}
          </div>
          <div>
            <p className={styles.miniEyebrow}>Local practice history</p>
            <strong>Task {String(data.activeTask).padStart(2, "0")} marked for review</strong>
            <p>This browser-only state is a study aid, not an official readiness score.</p>
            <span className={styles.scopePill}>No BACB affiliation or endorsement</span>
          </div>
        </div>
      ) : null}
    </MiniWindow>
  );
}

function RecallVisual() {
  return (
    <svg aria-hidden="true" className={styles.recallVisual} viewBox="0 0 320 180">
      <path d="M48 88c24-48 77-69 116-35 33-27 81-8 93 35 12 44-31 75-94 56-58 21-133-4-115-56Z" />
      <g>
        <circle cx="84" cy="93" r="13" />
        <circle cx="132" cy="65" r="10" />
        <circle cx="171" cy="103" r="15" />
        <circle cx="222" cy="76" r="11" />
        <circle cx="240" cy="119" r="8" />
        <path d="m96 86 27-16m18 3 20 21m25 2 27-14m-28 28 46 7M93 101l65 4" />
      </g>
      <text x="160" y="166" textAnchor="middle">ORIGINAL PLACEHOLDER VISUAL</text>
    </svg>
  );
}

function StepSparkSurface({ data }: { data: StepSparkDemoState }) {
  return (
    <MiniWindow label="StepSpark" status="Prototype">
      <div className={styles.stepSparkLayout}>
        <div className={styles.visualPanel}>
          <RecallVisual />
          <span>{data.cardLabel}</span>
        </div>
        <article className={styles.recallCard}>
          {data.view === "prompt" ? (
            <>
              <p className={styles.miniEyebrow}>Prompt</p>
              <strong>Inspect the visual before revealing the draft explanation.</strong>
              <span className={styles.fakeAction}>Make a prediction</span>
            </>
          ) : null}
          {data.view === "reveal" ? (
            <>
              <p className={styles.miniEyebrow}>Answer revealed</p>
              <strong>Compare the prediction with the draft rationale.</strong>
              <div className={styles.revealStack}>
                <span>Prompt</span><span>Prediction</span><span>Draft explanation</span>
              </div>
            </>
          ) : null}
          {data.view === "review" ? (
            <>
              <p className={styles.miniEyebrow}>Learner review</p>
              <strong>Choose a device-local review state.</strong>
              <div className={styles.reviewChoices}>
                <span className={styles.reviewSelected}>Review state selected</span>
                <span>Stored on this device</span>
              </div>
              <small>Current sample: {data.reviewState}</small>
            </>
          ) : null}
          {data.view === "provenance" ? (
            <>
              <p className={styles.miniEyebrow}>Provenance record</p>
              <dl className={styles.provenanceList}>
                <div><dt>Source</dt><dd>Original placeholder diagram</dd></div>
                <div><dt>Use</dt><dd>Portfolio workflow demo</dd></div>
                <div><dt>Review</dt><dd>Medical review required</dd></div>
              </dl>
            </>
          ) : null}
        </article>
      </div>
      <p className={styles.educationNote}>Draft educational content · no NBME affiliation or exam prediction</p>
    </MiniWindow>
  );
}

function RethinkAutomationSurface({ data }: { data: RethinkAutomationDemoState }) {
  return (
    <MiniWindow label="Rethink Automations" status="Sanitized local beta">
      <div className={styles.automationLayout}>
        <aside className={styles.queuePanel}>
          <p className={styles.miniEyebrow}>Synthetic queue</p>
          {(["Practice workflow A", "Practice workflow B", "Practice workflow C"] as const).map(
            (item) => (
              <span className={item === data.queueItem ? styles.queueSelected : undefined} key={item}>
                <i aria-hidden="true" />
                {item}
              </span>
            ),
          )}
          <small>Invented · non-clinical</small>
        </aside>
        <div className={styles.automationCanvas}>
          {data.view === "queue" ? (
            <div className={styles.queueEmptyState}>
              <span aria-hidden="true">⌁</span>
              <strong>Select a local mock item</strong>
              <p>No client records or authenticated screens are used.</p>
            </div>
          ) : null}
          {data.view === "confirmation" ? (
            <div className={styles.confirmationPanel}>
              <p className={styles.miniEyebrow}>Prepare run</p>
              <strong>Confirm the correct page and supported scope</strong>
              <dl>
                <div><dt>Target</dt><dd>{data.queueItem}</dd></div>
                <div><dt>Scope</dt><dd>Supported Step 1 only</dd></div>
                <div><dt>Final control</dt><dd>Human operator</dd></div>
              </dl>
              <span className={styles.fakeAction}>Awaiting confirmation</span>
            </div>
          ) : null}
          {data.view === "step-one" ? (
            <div className={styles.stepRailPanel}>
              <p className={styles.miniEyebrow}>Six-step state model</p>
              <ol className={styles.stepRail}>
                {Array.from({ length: 6 }, (_, index) => index + 1).map((step) => (
                  <li data-state={step === 1 ? "supported" : "manual"} key={step}>
                    <span>{step}</span>
                    <div><strong>Step {step}</strong><small>{step === 1 ? "Supported staged action" : "Manual checklist state"}</small></div>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
          {data.view === "log" ? (
            <div className={styles.runLog}>
              <header><span aria-hidden="true">●</span><strong>Readable local run log</strong></header>
              <ol>
                {data.log.map((entry, index) => (
                  <li key={entry}><span>{String(index + 1).padStart(2, "0")}</span>{entry}</li>
                ))}
              </ol>
            </div>
          ) : null}
        </div>
      </div>
      <p className={styles.educationNote}>Steps 2–6 and final review remain manual · no hidden submission</p>
    </MiniWindow>
  );
}

function NeuroPathInsightSurface({ data }: { data: NeuroPathInsightDemoState }) {
  return (
    <MiniWindow label="NeuroPath Insight" status="Private prototype">
      <div className={styles.insightHeader}>
        <div><p className={styles.miniEyebrow}>Synthetic analytical session</p><strong>{data.datasetLabel}</strong></div>
        <span className={styles.scopePill}>Simulated values</span>
      </div>

      {data.view === "dataset" ? (
        <div className={styles.datasetPreview}>
          <div className={styles.datasetColumns}>
            {data.items.map((item) => <span key={item}>{item}</span>)}
          </div>
          {(["Synthetic row A", "Synthetic row B", "Synthetic row C"] as const).map(
            (row) => (
              <div className={styles.datasetRow} key={row}>
                <strong>{row}</strong><span>Sample</span><span>Sample</span><span>Simulated</span>
              </div>
            ),
          )}
        </div>
      ) : null}

      {data.view === "normalize" ? (
        <div className={styles.pipelinePreview}>
          {data.items.map((item, index) => (
            <div key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
              <small>{["Python + pandas", "DuckDB", "Local CSV + review JSON"][index]}</small>
            </div>
          ))}
        </div>
      ) : null}

      {data.view === "benchmark" ? (
        <div className={styles.benchmarkPreview}>
          <header><p className={styles.miniEyebrow}>Abstract benchmark layout</p><span>No real values</span></header>
          <div className={styles.syntheticBars} aria-label="Decorative chart with no rate values">
            {data.items.map((item, index) => (
              <div key={item}>
                <span>{item}</span>
                <i aria-hidden="true" style={{ inlineSize: `${[72, 48, 61][index]}%` }} />
                <small>Simulated</small>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {data.view === "limitations" ? (
        <div className={styles.limitationsGrid}>
          {data.items.map((item) => (
            <article key={item}>
              <span aria-hidden="true">△</span>
              <strong>{item}</strong>
              <small>Exploratory prototype signal</small>
            </article>
          ))}
          <p className={styles.boundaryCallout}>
            <strong>Not validated advice</strong>
            <span>No customer results, clinical guidance, or financial recommendation.</span>
          </p>
        </div>
      ) : null}
    </MiniWindow>
  );
}

export function MiniProductSurface({ data }: { data: ProjectDemoFrameData }) {
  switch (data.kind) {
    case "behavior-data-lab":
      return <BehaviorDataLabSurface data={data} />;
    case "caregiver-academy":
      return <CaregiverAcademySurface data={data} />;
    case "rbt-practice":
      return <RbtPracticeSurface data={data} />;
    case "stepspark":
      return <StepSparkSurface data={data} />;
    case "rethink-automation":
      return <RethinkAutomationSurface data={data} />;
    case "neuropath-insight":
      return <NeuroPathInsightSurface data={data} />;
  }
}
