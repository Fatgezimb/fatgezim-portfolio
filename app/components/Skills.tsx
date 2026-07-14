import { skillGroups } from "@/app/content/resume";
import { SectionHeading } from "./SectionHeading";
import styles from "./supporting/Skills.module.css";

const demonstratedBy: Record<
  string,
  { projects: readonly string[]; roles: readonly string[] }
> = {
  "behavioral-science": {
    roles: ["Board Certified Behavior Analyst", "ABA Technician"],
    projects: ["Bela Data Lab Caregiver Academy", "RBT Practice Hub"],
  },
  "data-engineering": {
    roles: ["Data Scientist and Software Product Builder", "Data Engineer"],
    projects: ["Bela Behavior Data Lab", "NeuroPath Insight"],
  },
  "software-product": {
    roles: ["Founder, NeuroPath LLC", "Data Scientist and Software Product Builder"],
    projects: ["StepSpark", "Rethink Automations", "Bela Behavior Data Lab"],
  },
  "research-methods": {
    roles: ["Research experience, George Mason University"],
    projects: ["Computational neuroscience and neuroimaging research"],
  },
  leadership: {
    roles: ["Founder, NeuroPath LLC", "Co-founder and Co-builder, Bela Data Lab products"],
    projects: ["Bela Behavior Data Lab", "Bela Data Lab Caregiver Academy"],
  },
};

export function Skills() {
  return (
    <section
      className={`content-section section-shell ${styles.section}`}
      data-reveal="up"
      id="skills"
    >
      <SectionHeading
        eyebrow="Capabilities / 04"
        title="Skills"
        description="Evidence-based domains are labeled by how they are used—not by unsupported percentages or self-scored meters."
      />
      <figure className={styles.evidenceMap} aria-labelledby="skills-evidence-map-caption">
        <figcaption className={styles.mapCaption} id="skills-evidence-map-caption">
          <span className={styles.mapCaptionTitle}>Evidence map</span>
          <span>{String(skillGroups.length).padStart(2, "0")} capability groups</span>
        </figcaption>

        <svg aria-hidden="true" className={styles.mapConnections} viewBox="0 0 1000 700">
          <path d="M500 350 C390 260 260 160 90 110" />
          <path d="M500 350 C500 245 500 175 500 110" />
          <path d="M500 350 C610 260 740 160 910 110" />
          <path d="M500 350 C390 455 260 565 90 620" />
          <path d="M500 350 C610 455 740 565 910 620" />
          <circle cx="500" cy="350" r="7" />
        </svg>

        <div className={styles.mapHub} aria-hidden="true">
          <span>Source</span>
          <strong>Evidence notes</strong>
        </div>

        <div className={styles.skillsGrid}>
          {skillGroups.map((group, index) => (
            <article className={styles.skillCard} data-reveal="up" key={group.id}>
              <header className={styles.skillHeader}>
                <span className={styles.nodeIndex} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className={styles.level}>{group.level}</p>
                  <h3>{group.title}</h3>
                </div>
              </header>
              <ul className={styles.skillList}>
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
              <dl className={styles.demonstratedBy}>
                <div>
                  <dt>Roles</dt>
                  <dd>{demonstratedBy[group.id].roles.join(" · ")}</dd>
                </div>
                <div>
                  <dt>Projects / research</dt>
                  <dd>{demonstratedBy[group.id].projects.join(" · ")}</dd>
                </div>
              </dl>
              <footer className={styles.evidenceNote}>
                <span aria-hidden="true">Evidence trace</span>
                <p>{group.evidenceNote}</p>
              </footer>
            </article>
          ))}
        </div>
      </figure>
    </section>
  );
}
