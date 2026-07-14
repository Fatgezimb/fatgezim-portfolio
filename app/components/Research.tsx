import { researchItems, researchNote } from "@/app/content/research";
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
      <div className={styles.researchGrid}>
        {researchItems.map((item) => (
          <article className={styles.researchCard} data-reveal="scale" key={item.id}>
            <div className={styles.sliceStage} aria-hidden="true">
              <div className={`${styles.slice} ${styles.sliceRear}`} />
              <div className={`${styles.slice} ${styles.sliceMiddle}`} />
              <div className={`${styles.slice} ${styles.sliceFront}`}>
                <svg viewBox="0 0 320 220">
                  <path
                    className={styles.neuronBranch}
                    d="M158 112 C128 91 113 59 83 51 M158 112 C119 122 93 151 59 155 M158 112 C184 77 220 67 249 41 M158 112 C198 123 226 151 268 157 M158 112 C164 142 155 172 177 194"
                  />
                  <path
                    className={styles.neuronBranchFine}
                    d="M83 51 L58 31 M83 51 L48 67 M59 155 L29 135 M59 155 L39 184 M249 41 L273 20 M249 41 L285 61 M268 157 L295 131 M268 157 L295 181"
                  />
                  <circle cx="158" cy="112" r="13" />
                  <circle cx="83" cy="51" r="4" />
                  <circle cx="59" cy="155" r="4" />
                  <circle cx="249" cy="41" r="4" />
                  <circle cx="268" cy="157" r="4" />
                </svg>
              </div>
              <div className={styles.scanLine} />
            </div>

            <div className={styles.researchContent}>
              <div className={styles.researchSummary}>
                <p className={styles.statusLabel}>{item.status}</p>
                <h3>{item.title}</h3>
                <p className={styles.institution}>{item.institution}</p>
                <p>{item.summary}</p>
              </div>
              <div className={styles.methodPanel}>
                <h4>Supported methods</h4>
                <ul className={styles.methodList}>
                  {item.methods.map((method) => (
                    <li key={method}>{method}</li>
                  ))}
                </ul>
                <p className={styles.boundaryNote}>
                  <strong>Evidence boundary:</strong> {item.evidenceBoundary}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
