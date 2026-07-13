import type { Metadata } from "next";
import { PrintButton } from "@/app/components/PrintButton";
import { featuredProjects } from "@/app/content/projects";
import {
  credentials,
  education,
  experience,
  identity,
  publicLinks,
  publicationPolicy,
  skillGroups,
} from "@/app/content/resume";
import { researchItems } from "@/app/content/research";

export const metadata: Metadata = {
  title: "Print Résumé",
  description:
    "Print-friendly résumé with owner-confirmed education, credentials, experience, skills, and contact information.",
};

export default function ResumePage() {
  return (
    <main className="resume-page">
      <div className="resume-toolbar" aria-label="Résumé actions">
        {/* Vinext currently hydrates next/link with a duplicate React instance in dev. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a className="text-link" href="/">
          ← Back to portfolio
        </a>
        <PrintButton />
      </div>

      <article className="resume-document">
        <header className="resume-document__header">
          <div>
            <p className="eyebrow">Verified public résumé · Phase 1 review</p>
            <h1>{identity.name}</h1>
            <p className="resume-headline">{identity.headline}</p>
          </div>
          <address>
            {publicLinks.map((link) => (
              <a href={link.href} key={link.href}>
                {link.kind === "email" ? "fatgezimbela1@gmail.com" : link.label}
              </a>
            ))}
          </address>
        </header>

        <p className="resume-summary">{identity.summary}</p>

        <section aria-labelledby="resume-experience-heading">
          <h2 id="resume-experience-heading">Selected experience</h2>
          <div className="resume-stack">
            {experience.map((item) => (
              <article className="resume-entry" key={item.id}>
                <header>
                  <div>
                    <h3>{item.title}</h3>
                    {item.organization ? <p>{item.organization}</p> : null}
                  </div>
                  {item.dates ? <p>{item.dates}</p> : null}
                </header>
                <p>{item.summary}</p>
                <ul>
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="resume-projects-heading">
          <h2 id="resume-projects-heading">Selected product work</h2>
          <div className="resume-project-grid">
            {featuredProjects.slice(0, 4).map((project) => (
              <article key={project.id}>
                <h3>{project.verifiedPublicName}</h3>
                <p className="resume-project-role">{project.role}</p>
                <p>{project.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="resume-columns">
          <section aria-labelledby="resume-education-heading">
            <h2 id="resume-education-heading">Education</h2>
            <div className="resume-stack">
              {education.map((item) => (
                <article className="resume-entry" key={item.id}>
                  <header>
                    <div>
                      <h3>{item.credential}</h3>
                      <p>{item.institution}</p>
                    </div>
                    <p>{item.date}</p>
                  </header>
                  {item.status ? <p>{item.status}</p> : null}
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="resume-credentials-heading">
            <h2 id="resume-credentials-heading">Credentials</h2>
            <ul className="resume-plain-list">
              {credentials.map((credential) => (
                <li key={credential}>{credential}</li>
              ))}
            </ul>
          </section>
        </div>

        <section aria-labelledby="resume-skills-heading">
          <h2 id="resume-skills-heading">Selected skills</h2>
          <div className="resume-skill-grid">
            {skillGroups.map((group) => (
              <article key={group.id}>
                <h3>{group.title}</h3>
                <p>{group.skills.join(" · ")}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="resume-research-heading">
          <h2 id="resume-research-heading">Research experience</h2>
          {researchItems.map((item) => (
            <article className="resume-entry" key={item.id}>
              <header>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.institution}</p>
                </div>
              </header>
              <p>{item.summary}</p>
              <p>Supported methods: {item.methods.join(", ")}.</p>
              <p className="resume-boundary">{item.evidenceBoundary}</p>
            </article>
          ))}
        </section>

        <footer className="resume-document__footer">
          <strong>{publicationPolicy.resumeDownloadLabel}</strong>
          <p>
            This print view contains no street address, phone number, private credential
            identifier, client information, or unsupported research result. A fixed PDF
            will be activated only after manual owner review.
          </p>
        </footer>
      </article>
    </main>
  );
}
