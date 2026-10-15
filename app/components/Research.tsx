import {
  gmuNeuronalReconstruction,
  researchAssets,
  researchNote,
} from "@/app/content/research";
import { SafeLink } from "./SafeLink";
import { SectionHeading } from "./SectionHeading";
import styles from "./supporting/Research.module.css";

export function Research() {
  return (
    <section
      className={`content-section section-shell ${styles.section}`}
      data-reveal="scale"
      id="research"
    >
      <SectionHeading
        eyebrow="Research / 05"
        title="Research & scientific work"
        description={researchNote}
      />

      <article className={styles.researchCard} data-reveal="scale">
        <figure className={styles.posterStage}>
          {/* Vinext serves committed public assets directly; next/image optimization is unavailable in this deployment path. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Preview of the Computational Neuroscience: Tracing Neurons from the Fruit Fly Larva research poster."
            className={styles.posterImage}
            height="1200"
            loading="lazy"
            src={researchAssets.posterPreview}
            width="1600"
          />
          <figcaption>Research poster · George Mason University</figcaption>
        </figure>

        <div className={styles.researchContent}>
          <div className={styles.researchSummary}>
            <p className={styles.statusLabel}>Featured research</p>
            <h3>{gmuNeuronalReconstruction.title}</h3>
            <p className={styles.institution}>
              {gmuNeuronalReconstruction.institutionalUnit}
              <br />
              {gmuNeuronalReconstruction.institution}
            </p>
            <p>{gmuNeuronalReconstruction.summary}</p>
            <p className={styles.authors}>
              <strong>Co-authors:</strong>{" "}
              {gmuNeuronalReconstruction.authors.join(", ")}
            </p>
          </div>

          <div className={styles.methodPanel}>
            <h4>Methods and software</h4>
            <ul className={styles.methodList}>
              {gmuNeuronalReconstruction.methods.map((method) => (
                <li key={method}>{method}</li>
              ))}
            </ul>
            <div className={styles.researchActions}>
              <SafeLink href="/research" newTab>
                Research overview
              </SafeLink>
              <SafeLink
                href={`/research/${gmuNeuronalReconstruction.slug}`}
                newTab
              >
                Project details
              </SafeLink>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
