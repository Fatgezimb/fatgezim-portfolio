import {
  gmuNeuronalReconstruction,
  researchAssets,
  researchNote,
} from "@/app/content/research";
import { EvidenceStatus } from "./research-ui";
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
          <figcaption>Original George Mason research poster</figcaption>
        </figure>

        <div className={styles.researchContent}>
          <div className={styles.researchSummary}>
            <EvidenceStatus>{gmuNeuronalReconstruction.verificationStatus}</EvidenceStatus>
            <p className={styles.statusLabel}>{gmuNeuronalReconstruction.role}</p>
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
            <h4>Documented methods</h4>
            <ul className={styles.methodList}>
              {gmuNeuronalReconstruction.methods.map((method) => (
                <li key={method}>{method}</li>
              ))}
            </ul>
            <p className={styles.boundaryNote}>
              {gmuNeuronalReconstruction.evidenceBoundary}
            </p>
            <p className={styles.boundaryNote}>
              {gmuNeuronalReconstruction.archivalNote}
            </p>
            <div className={styles.researchActions}>
              <SafeLink href="/research" newTab>
                View research record
              </SafeLink>
              <SafeLink
                href={`/research/${gmuNeuronalReconstruction.slug}`}
                newTab
              >
                Explore the project
              </SafeLink>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
