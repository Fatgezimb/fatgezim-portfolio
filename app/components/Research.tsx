import { researchItems, researchNote } from "@/app/content/research";
import { SectionHeading } from "./SectionHeading";

export function Research() {
  return (
    <section className="content-section section-shell" data-reveal="scale" id="research">
      <SectionHeading
        eyebrow="Research / 05"
        title="Research & scientific work"
        description={researchNote}
      />
      <div className="research-grid">
        {researchItems.map((item) => (
          <article className="research-card" key={item.id}>
            <div>
              <p className="status-label">{item.status}</p>
              <h3>{item.title}</h3>
              <p className="organization">{item.institution}</p>
              <p>{item.summary}</p>
            </div>
            <div>
              <h4>Supported methods</h4>
              <ul className="tag-list">
                {item.methods.map((method) => (
                  <li key={method}>{method}</li>
                ))}
              </ul>
              <p className="boundary-note">
                <strong>Evidence boundary:</strong> {item.evidenceBoundary}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
