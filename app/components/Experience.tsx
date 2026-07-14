import { experience } from "@/app/content/resume";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  return (
    <section className="content-section section-shell" data-reveal="up" id="experience">
      <SectionHeading
        eyebrow="Experience / 03"
        title="Selected experience"
        description="A deliberately bounded record of clinical, founder, data, software, and earlier ABA work. Unresolved employer names and dates remain omitted."
      />
      <ol className="timeline">
        {experience.map((item, index) => (
          <li className="timeline-item" key={item.id}>
            <div className="timeline-marker" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </div>
            <article>
              <header>
                <div>
                  <p className="status-label">{item.statusLabel}</p>
                  <h3>{item.title}</h3>
                  {item.organization ? <p className="organization">{item.organization}</p> : null}
                </div>
                {item.dates ? <p className="timeline-date">{item.dates}</p> : null}
              </header>
              <p>{item.summary}</p>
              <ul className="compact-list">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
