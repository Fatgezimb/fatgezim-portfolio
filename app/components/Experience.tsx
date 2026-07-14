import { experience } from "@/app/content/resume";
import { SectionHeading } from "./SectionHeading";
import styles from "./supporting/Experience.module.css";

export function Experience() {
  return (
    <section
      className={`content-section section-shell ${styles.section}`}
      data-reveal="up"
      id="experience"
    >
      <SectionHeading
        eyebrow="Experience / 03"
        title="Selected experience"
        description="A deliberately bounded record of clinical, founder, data, software, and earlier ABA work. Unresolved employer names and dates remain omitted."
      />
      <div className={styles.timelineFrame}>
        <svg
          aria-hidden="true"
          className={styles.signalRail}
          preserveAspectRatio="none"
          viewBox="0 0 40 100"
        >
          <defs>
            <linearGradient id="experience-signal" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="var(--cyan)" stopOpacity="0" />
              <stop offset="0.16" stopColor="var(--cyan)" />
              <stop offset="0.52" stopColor="var(--accent)" />
              <stop offset="0.86" stopColor="var(--violet)" />
              <stop offset="1" stopColor="var(--violet)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            className={styles.signalPath}
            d="M20 0 C5 12 35 22 20 34 S5 55 20 67 S35 88 20 100"
            pathLength="1"
          />
        </svg>

        <ol className={styles.timeline}>
          {experience.map((item, index) => (
            <li className={styles.timelineItem} data-reveal="up" key={item.id}>
              <div className={styles.timelineMarker} aria-hidden="true">
                <span className={styles.markerPulse} />
                <span className={styles.markerIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <article className={styles.experienceCard}>
                <span className={styles.cardTrace} aria-hidden="true" />
                <header className={styles.cardHeader}>
                  <div>
                    <p className={styles.statusLabel}>{item.statusLabel}</p>
                    <h3>{item.title}</h3>
                    {item.organization ? (
                      <p className={styles.organization}>{item.organization}</p>
                    ) : null}
                  </div>
                  {item.dates ? <p className={styles.timelineDate}>{item.dates}</p> : null}
                </header>
                <p className={styles.summary}>{item.summary}</p>
                <ul className={styles.highlights}>
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
