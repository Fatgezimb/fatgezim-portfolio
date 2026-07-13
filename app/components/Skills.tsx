import { skillGroups } from "@/app/content/resume";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section className="content-section section-shell" id="skills">
      <SectionHeading
        eyebrow="Capabilities / 04"
        title="Skills"
        description="Evidence-based domains are labeled by how they are used—not by unsupported percentages or self-scored meters."
      />
      <div className="skills-grid">
        {skillGroups.map((group) => (
          <article className="skill-card" key={group.id}>
            <header>
              <p className="status-label">{group.level}</p>
              <h3>{group.title}</h3>
            </header>
            <ul className="tag-list">
              {group.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
            <p className="evidence-note">{group.evidenceNote}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
