/* Static figures retain their original dimensions in the Pages export. */
/* eslint-disable @next/next/no-img-element */
import { NeuralChart } from "./NeuralChart";
import { sitePath } from "@/app/content/paths";
import {
  appointments,
  sampleQueue,
  sampleRates,
} from "@/app/content/operational-preview";
import styles from "./WorkGallery.module.css";

export function ProductPoster({ id }: { id: string }) {
  if (id === "clinical-assessment-portal")
    return (
      <div
        className={`${styles.posterUI} ${styles.dataPoster}`}
        aria-hidden="true"
      >
        <div className={styles.productBar}>
          <b className={styles.productMark}>C</b>
          <strong>
            Assessment Portal<small>Synthetic workflow miniature</small>
          </strong>
          <span>Review</span>
        </div>
        <div className={styles.productBody}>
          <small>RECORD DEMO-001 · VERSION 2</small>
          <b>Permission is part of the workflow.</b>
          <div className={styles.miniRows}>
            <div>
              <span>Record ownership</span>
              <span>Owner managed</span>
            </div>
            <div>
              <span>Edit access</span>
              <span>Explicit grant</span>
            </div>
            <div>
              <span>Clinical changes</span>
              <span>Fresh review required</span>
            </div>
          </div>
          <p className={styles.posterNote}>
            Read → request access → review → sign
          </p>
        </div>
      </div>
    );
  if (
    [
      "appointment-operations",
      "engine-prognostics",
      "grid-forecast",
      "video-signal",
      "commissioning-readiness",
    ].includes(id)
  )
    return (
      <img
        className={styles.realAppPoster}
        src={sitePath(`/media/editorial/${id}.png`)}
        width="1440"
        height="1000"
        loading="lazy"
        alt=""
      />
    );
  if (id === "rethink-automations")
    return (
      <div
        className={`${styles.posterUI} ${styles.automationPoster}`}
        aria-hidden="true"
      >
        <div className={styles.productBar}>
          <b className={styles.productMark}>R</b>
          <strong>
            Rethink Automations<small>Local workflow beta</small>
          </strong>
          <span>Simulation</span>
        </div>
        <div className={styles.productBody}>
          <small>REVIEW BEFORE RUNNING</small>
          <b>One queue. A clear next step.</b>
          <div className={styles.miniRows}>
            {sampleQueue.map((item, i) => (
              <div key={item}>
                <span>{item}</span>
                <span>{i === 0 ? "Ready to prepare" : "Queued"}</span>
              </div>
            ))}
          </div>
          <div className={styles.reviewFlow}>
            <span>Prepare</span>
            <i>→</i>
            <span>Confirm</span>
            <i>→</i>
            <span>Review log</span>
          </div>
          <small>Fictional workflow items</small>
        </div>
      </div>
    );
  if (id === "neuropath-insight")
    return (
      <div
        className={`${styles.posterUI} ${styles.insightPoster}`}
        aria-hidden="true"
      >
        <div className={styles.productBar}>
          <b className={styles.productMark}>N</b>
          <strong>
            NeuroPath Insight<small>Analysis prototype</small>
          </strong>
          <span>Simulated data</span>
        </div>
        <div className={styles.productBody}>
          <small>BENCHMARK REVIEW</small>
          <b>Compare the underlying records.</b>
          <div className={styles.miniRows}>
            {sampleRates.slice(0, 3).map((row) => (
              <div key={row.id}>
                <span>{row.payer}</span>
                <span>{row.code}</span>
                <span>${row.rate}</span>
              </div>
            ))}
          </div>
          <p className={styles.posterNote}>
            Filter by state. Inspect a record.
            <br />
            Follow the calculation.
          </p>
          <small>Simulated rates · Exploratory analysis</small>
        </div>
      </div>
    );
  if (id === "neuronal-reconstruction")
    return (
      <div
        className={`${styles.posterUI} ${styles.researchPoster}`}
        aria-hidden="true"
      >
        <img
          src={sitePath("/media/research-fluorescence-original.jpg")}
          width="1418"
          height="1424"
          loading="lazy"
          alt=""
        />
        <span>George Mason University</span>
        <small>Original Class 4 neuron imagery</small>
      </div>
    );
  if (id === "neurostack-explorer")
    return (
      <div
        className={`${styles.posterUI} ${styles.neuralPoster}`}
        aria-hidden="true"
      >
        <div className={styles.productBar}>
          <b className={styles.productMark}>NS</b>
          <strong>
            NeuroStack Explorer<small>Open neuroscience workflow</small>
          </strong>
          <span>Lab</span>
        </div>
        <div className={styles.neuralLayout}>
          <aside>
            <b>Controls</b>
            <small>Target unit</small>
            <span>t1c1⌄</span>
            <small>Selected interval</small>
            <strong>0 — 20 s</strong>
            <i />
            <small>Public NWB derivative</small>
          </aside>
          <div>
            <b>Spike raster</b>
            <NeuralChart compact />
            <small>8 recorded units · CC BY 4.0</small>
          </div>
        </div>
      </div>
    );
  if (id === "bela-behavior-data-lab")
    return (
      <div
        className={`${styles.posterUI} ${styles.dataPoster}`}
        aria-hidden="true"
      >
        <div className={styles.productBar}>
          <b className={styles.productMark}>B</b>
          <strong>
            Bela Behavior Data Lab<small>Operations workspace</small>
          </strong>
          <span>Sample</span>
        </div>
        <div className={styles.productBody}>
          <small>OPERATIONAL INTELLIGENCE</small>
          <b>See what needs attention.</b>
          <div className={styles.miniMetrics}>
            <span>
              Sample hours
              <strong>
                {appointments
                  .reduce((sum, row) => sum + row.hours, 0)
                  .toFixed(1)}
                <small> h</small>
              </strong>
            </span>
            <span>
              Ready records
              <strong>
                {appointments.filter((row) => row.state === "Ready").length}
              </strong>
            </span>
            <span>
              Follow-up items
              <strong>
                {
                  appointments.filter(
                    (row) =>
                      row.state === "Missing note" ||
                      row.state === "Needs verification",
                  ).length
                }
              </strong>
            </span>
          </div>
          <div className={styles.miniRows}>
            {appointments.slice(0, 3).map((row) => (
              <div key={row.id}>
                <span>{row.id}</span>
                <span>{row.hours} h</span>
                <span>{row.state}</span>
              </div>
            ))}
          </div>
          <small>Synthetic appointments · Browser-local processing</small>
        </div>
      </div>
    );
  if (id === "rbt-practice-hub")
    return (
      <div
        className={`${styles.posterUI} ${styles.rbtPoster}`}
        aria-hidden="true"
      >
        <div className={styles.productBar}>
          <b className={styles.productMark}>R</b>
          <strong>
            RBT Practice Hub<small>Study workspace</small>
          </strong>
          <span>Flashcards</span>
        </div>
        <div className={styles.productBody}>
          <small>TASK 1 · CONTINUOUS MEASUREMENT</small>
          <div className={styles.miniFlashcard}>
            <small>QUICK CHECK</small>
            <b>What makes a measurement procedure continuous?</b>
            <span>Reveal answer ↗</span>
          </div>
          <div className={styles.miniFoot}>
            <span>Original study material</span>
            <span>1 / 3 →</span>
          </div>
        </div>
      </div>
    );
  if (id === "caregiver-academy")
    return (
      <div
        className={`${styles.posterUI} ${styles.caregiverPoster}`}
        aria-hidden="true"
      >
        <div className={styles.productBar}>
          <b className={styles.productMark}>B</b>
          <strong>
            Caregiver Academy<small>Bela Data Lab</small>
          </strong>
          <span>Learning library</span>
        </div>
        <div className={styles.productBody}>
          <small>SMALL STEPS, EVERYDAY ROUTINES</small>
          <b>Make the next step clear.</b>
          <div className={styles.lessonSteps}>
            <span>
              01<span>Learn the idea</span>✓
            </span>
            <span>
              02<span>Try a scenario</span>→
            </span>
            <span>
              03<span>Check your understanding</span>○
            </span>
          </div>
          <small>Guided lessons · Educational support</small>
        </div>
      </div>
    );
  if (id === "stepspark")
    return (
      <div
        className={`${styles.posterUI} ${styles.stepPoster}`}
        aria-hidden="true"
      >
        <div className={styles.productBar}>
          <b className={styles.productMark}>ϟ</b>
          <strong>
            StepSpark<small>USMLE Step 1 · Prototype</small>
          </strong>
          <span>Review</span>
        </div>
        <div className={styles.productBody}>
          <small>INSTANT RECALL</small>
          <b>
            A prompt. An explanation.
            <br />A source to return to.
          </b>
          <div className={styles.reviewFlow}>
            <span>Recall</span>
            <i>→</i>
            <span>Reveal</span>
            <i>→</i>
            <span>Review</span>
          </div>
          <div className={styles.miniFoot}>
            <span>Source-aware cards</span>
            <span>Draft learning content</span>
          </div>
        </div>
      </div>
    );
  return (
    <div
      className={`${styles.posterUI} ${styles.blogPoster}`}
      aria-hidden="true"
    >
      <div className={styles.blogWordmark}>
        NeuroPath<span>by Zim & Meili Bela</span>
      </div>
      <div className={styles.blogHeadline}>
        Better tools for
        <br />
        behavioral health.
      </div>
      <div className={styles.blogTopics}>
        <span>Practical guides</span>
        <span>Product notes</span>
        <span>What we’re building ↗</span>
      </div>
    </div>
  );
}
