import { mcvayStory } from "@/app/content/engineering-stories";
import { SafeLink } from "../SafeLink";
import styles from "./McVayCase.module.css";
export function McVayCase({ full = false }: { full?: boolean }) {
  return (
    <section className={styles.case} id="mcvay" aria-labelledby="mcvay-title">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>Professional engineering / McVay</p>
        <h2 id="mcvay-title">{mcvayStory.title}</h2>
        <p className={styles.role}>{mcvayStory.role}</p>
        <p>{mcvayStory.introduction}</p>
      </div>
      <div className={styles.evidence}>
        <ol className={styles.steps}>
          {mcvayStory.steps.map((step, index) => (
            <li key={step.title}>
              <span aria-hidden="true">{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className={styles.eyebrow}>
          Reported by the team after operational-data testing
        </p>
        <dl className={styles.results}>
          {mcvayStory.outcomes.map((outcome) => (
            <div key={outcome.value}>
              <dt>{outcome.label}</dt>
              <dd>{outcome.value}</dd>
            </div>
          ))}
        </dl>
        <p className={styles.attribution}>{mcvayStory.attribution}</p>
        {full ? (
          <details className={styles.detail}>
            <summary>Scope and evidence</summary>
            <p>
              This case study is based on Zim’s historical account. The previous
              process reportedly involved more than 40 analysts and weeks to
              months of review. That describes the reported prior workflow; it
              is not a measured staffing reduction. Colleagues also reported
              support for streaming data. Restricted operational data and
              project-specific schemas are not part of this public account.
            </p>
          </details>
        ) : (
          <SafeLink href="/engineering/#mcvay" className={styles.link}>
            Read the engineering account →
          </SafeLink>
        )}
      </div>
    </section>
  );
}
