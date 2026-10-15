import { sitePath } from "@/app/content/paths";
import type { Metadata } from "next";
import { PrintButton } from "@/app/components/PrintButton";
import { SafeLink } from "@/app/components/SafeLink";
import { ResumeDownloads } from "@/app/components/ResumeDownloads";
import { resumeDocument } from "@/app/content/resume-document";
import { publication } from "@/app/content/publication";
import styles from "./Resume.module.css";

export const metadata: Metadata = {
  title: "Résumé",
  description: "Technology resume of Fatgezim “Zim” Bela: founder and CTO, software engineering, data systems, workflow automation, and scientific software.",
  alternates: { canonical: `${publication.url}resume` },
  openGraph: {
    title: "Technology Résumé | Fatgezim “Zim” Bela",
    description: "Technical leadership, software and data systems, selected engineering work, education, and research.",
    url: `${publication.url}resume`,
    images: [`${publication.url}og.png`],
  },
};

export default function ResumePage() {
  const { identity, experience, projects, education, credentials, skills, research } = resumeDocument;
  return (
    <main className={`resume-page ${styles.page}`}>
      <div className="resume-toolbar" aria-label="Résumé actions">
        <a className="text-link" href={sitePath("/")} >← Back to portfolio</a>
        <div className={styles.actions}><ResumeDownloads /><PrintButton /></div>
      </div>
      <article className="resume-document">
        <header className="resume-document__header">
          <div>
            <p className="eyebrow">Professional profile <span aria-hidden="true">/</span> 2026</p>
            <h1>{identity.name}</h1>
            <p className="resume-headline">{identity.headline}</p>
          </div>
          <address>
            {resumeDocument.contact.filter((link) => !link.href.startsWith("mailto:")).map((link) => (
              <SafeLink href={link.href} key={link.href} newTab>
                {link.href.includes("linkedin.com") ? "LinkedIn" : link.href.includes("github.com") ? "GitHub" : "Portfolio"}
              </SafeLink>
            ))}
          </address>
        </header>
        <p className="resume-summary">{identity.summary}</p>
        <nav className={styles.sectionNav} aria-label="Résumé sections">
          <a href="#resume-experience-heading">Experience</a>
          <a href="#resume-projects-heading">Engineering work</a>
          <a href="#resume-education-heading">Education</a>
          <a href="#resume-research-heading">Research</a>
        </nav>
        <section aria-labelledby="resume-skills-heading">
          <h2 id="resume-skills-heading">Technical capabilities</h2>
          <div className="resume-skill-grid">
            {skills.slice(0, 4).map((group) => <article key={group.id}><h3>{group.title}</h3><p>{group.skills.join(" · ")}</p></article>)}
          </div>
        </section>
        <section aria-labelledby="resume-experience-heading">
          <h2 id="resume-experience-heading">Selected experience</h2>
          <div className="resume-stack">
            {experience.map((item) => (
              <article className="resume-entry" key={item.id}>
                <header><div><h3>{item.title}</h3>{item.organization ? <p>{item.organization}</p> : null}</div>{item.dates ? <p>{item.dates}</p> : null}</header>
                <p>{item.summary}</p>
                {item.highlights.length ? <ul className={styles.printDetails}>{item.highlights.slice(0, 2).map((highlight) => <li key={highlight}>{highlight}</li>)}</ul> : null}
              </article>
            ))}
          </div>
        </section>
        <section aria-labelledby="resume-projects-heading" className="resume-projects-section">
          <h2 id="resume-projects-heading">Selected engineering work</h2>
          <div className="resume-project-grid">
            {projects.map((project) => (
              <article key={project.id}>
                <h3>{project.name}</h3>
                <p className="resume-project-role">{project.role}</p>
                <p>{project.summary}</p>
                <p className={styles.stack}><strong>Stack:</strong> {project.stack}</p>
                <p className="resume-project-status">{project.status}</p>
                {project.links.length ? <p className="resume-project-links">{project.links.map((link) => <SafeLink key={link.href} href={link.href} newTab>{link.label}</SafeLink>)}</p> : null}
              </article>
            ))}
          </div>
        </section>
        <div className="resume-columns">
          <section aria-labelledby="resume-education-heading">
            <h2 id="resume-education-heading">Education</h2>
            <div className="resume-stack">
              {education.map((item) => <article className="resume-entry" key={item.id}><header><div><h3>{item.credential}</h3><p>{item.institution}</p></div><p>{item.date}</p></header></article>)}
            </div>
          </section>
          <section aria-labelledby="resume-credentials-heading">
            <h2 id="resume-credentials-heading">Credentials</h2>
            <ul className="resume-plain-list">{credentials.map((credential) => <li key={credential}>{credential}</li>)}</ul>
          </section>
        </div>
        <section aria-labelledby="resume-research-heading">
          <h2 id="resume-research-heading">Research experience</h2>
          {research.map((item) => <article className="resume-entry" key={item.title}><h3>{item.title}</h3><p>{item.institution}</p><p>{item.summary}</p><p>Methods: {item.methods.join(", ")}.</p></article>)}
        </section>
      </article>
    </main>
  );
}
