import { siteContent } from "@/app/content/site";
import { SectionHeading } from "./SectionHeading";

export function FounderContext() {
  const { founderContext } = siteContent;

  return (
    <section className="content-section section-shell" data-reveal="up" id="founder">
      <SectionHeading
        eyebrow="Founder context / 06"
        title={founderContext.heading}
        description={founderContext.introduction}
      />
      <div className="relationship-grid">
        {founderContext.relationships.map((item) => (
          <article className="relationship-card" key={item.name}>
            <h3>{item.name}</h3>
            <p>{item.relationship}</p>
            <dl>
              <dt>Zim’s role</dt>
              <dd>{item.role}</dd>
            </dl>
          </article>
        ))}
      </div>
      <p className="credit-note">
        Jointly created Bela Data Lab products credit both Meili Bela and Fatgezim
        “Zim” Bela. The portfolio does not imply sole ownership or sole authorship.
      </p>
    </section>
  );
}
