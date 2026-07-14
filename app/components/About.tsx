import { profileDomains } from "@/app/content/resume";
import { siteContent } from "@/app/content/site";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section className="content-section section-shell" data-reveal="up" id="about">
      <SectionHeading
        eyebrow="Profile / 01"
        title={siteContent.about.heading}
        description={siteContent.about.paragraphs[0]}
      />
      <div className="about-layout">
        <p className="about-statement">{siteContent.about.paragraphs[1]}</p>
        <div className="domain-grid">
          {profileDomains.map((domain) => (
            <article className="domain-card" key={domain.title}>
              <h3>{domain.title}</h3>
              <p>{domain.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
