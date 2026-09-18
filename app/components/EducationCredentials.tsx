import { credentials, education } from "@/app/content/resume";
import { SectionHeading } from "./SectionHeading";
import styles from "./supporting/EducationCredentials.module.css";

export function EducationCredentials() {
  return (
    <section
      className={`content-section section-shell ${styles.section}`}
      data-reveal="up"
      id="education"
    >
      <SectionHeading
        eyebrow="Education & licensure"
        title="Education & credentials"
        description="A foundation in neuroscience and special education, strengthened by ongoing medical training."
      />
      <div className={styles.educationLayout}>
        <ol className={styles.educationList}>
          {education.map((item, index) => (
            <li data-reveal="up" key={item.id}>
              <article className={styles.educationItem}>
                <span className={styles.cornerTop} aria-hidden="true" />
                <span className={styles.cornerBottom} aria-hidden="true" />
                <header className={styles.readoutHeader}>
                  <span>EDU-{String(index + 1).padStart(2, "0")}</span>
                  <i aria-hidden="true" />
                </header>
                <p className={styles.educationDate}>{item.date}</p>
                <h3>{item.credential}</h3>
                <p className={styles.institution}>{item.institution}</p>
                {item.status ? <p className={styles.educationStatus}>{item.status}</p> : null}
              </article>
            </li>
          ))}
        </ol>
        <aside className={styles.credentialPanel} aria-labelledby="credential-heading">
          <div className={styles.panelReadout} aria-hidden="true">
            <span>Credential index</span>
            <span>{String(credentials.length).padStart(2, "0")}</span>
          </div>
          <p className={styles.statusLabel}>Professional qualifications</p>
          <h3 id="credential-heading">Credentials</h3>
          <ul className={styles.credentialList}>
            {credentials.map((credential, index) => (
              <li key={credential}>
                <span className={styles.credentialIndex} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{credential}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
