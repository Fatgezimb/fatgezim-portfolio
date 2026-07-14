import { credentials, education } from "@/app/content/resume";
import { SectionHeading } from "./SectionHeading";

export function EducationCredentials() {
  return (
    <section className="content-section section-shell" data-reveal="up" id="education">
      <SectionHeading
        eyebrow="Education / 07"
        title="Education & credentials"
        description="Confirmed degree, candidate-status, certificate, and professional credential wording. Private identifiers and expiration details are intentionally excluded."
      />
      <div className="education-layout">
        <div className="education-list">
          {education.map((item) => (
            <article className="education-item" key={item.id}>
              <p className="education-date">{item.date}</p>
              <h3>{item.credential}</h3>
              <p className="organization">{item.institution}</p>
              {item.status ? <p>{item.status}</p> : null}
            </article>
          ))}
        </div>
        <aside className="credential-panel" aria-labelledby="credential-heading">
          <p className="status-label">Published without identifiers</p>
          <h3 id="credential-heading">Credentials</h3>
          <ul className="credential-list">
            {credentials.map((credential) => (
              <li key={credential}>
                <span aria-hidden="true">✓</span>
                {credential}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
