import { siteContent } from "@/app/content/site";
import { SectionHeading } from "./SectionHeading";
import styles from "./supporting/FounderContext.module.css";

export function FounderContext() {
  const { founderContext } = siteContent;

  return (
    <section
      className={`content-section section-shell ${styles.section}`}
      data-reveal="up"
      id="founder"
    >
      <SectionHeading
        eyebrow="Founder context / 06"
        title={founderContext.heading}
        description={founderContext.introduction}
      />

      <div className={styles.founderLayout}>
        <figure className={styles.ecosystemMap} aria-hidden="true">
          <figcaption>Company relationship map</figcaption>
          <svg className={styles.ecosystemConnections} viewBox="0 0 700 500">
            <path d="M350 245 C250 208 198 145 118 111" pathLength="1" />
            <path d="M350 245 C454 208 512 145 588 111" pathLength="1" />
            <path d="M350 245 C350 333 350 376 350 432" pathLength="1" />
            <circle cx="350" cy="245" r="5" />
          </svg>
          {founderContext.relationships.map((item, index) => (
            <div
              className={`${styles.ecosystemNode} ${
                index === 0 ? styles.primaryNode : styles.satelliteNode
              }`}
              key={item.name}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.name}</strong>
            </div>
          ))}
          <div className={styles.ecosystemBoundary}>Product ecosystem</div>
        </figure>

        <div className={styles.relationshipIndex}>
          <p className={styles.indexLabel}>Readable relationship index</p>
          <ol className={styles.relationshipList}>
            {founderContext.relationships.map((item, index) => (
              <li data-reveal="up" key={item.name}>
                <article className={styles.relationshipCard}>
                  <span className={styles.relationshipIndexNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.relationship}</p>
                    <dl>
                      <dt>Zim’s role</dt>
                      <dd>{item.role}</dd>
                    </dl>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <p className={styles.creditNote}>
        Jointly created Bela Data Lab products credit both Meili Bela and Fatgezim
        “Zim” Bela. The portfolio does not imply sole ownership or sole authorship.
      </p>
    </section>
  );
}
