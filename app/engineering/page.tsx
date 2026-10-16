import type { Metadata } from "next";
import { publication } from "@/app/content/publication";
import { engineeringStories } from "@/app/content/engineering-stories";
import { EditorialNav } from "@/app/components/editorial/EditorialNav";
import { McVayCase } from "@/app/components/editorial/McVayCase";
import { CaseDemo } from "@/app/components/editorial/CaseDemo";
import { SafeLink } from "@/app/components/SafeLink";
import styles from "./Engineering.module.css";
export const metadata: Metadata = {
  title: "Engineering case studies",
  description:
    "Inspect the problem, decisions, implementation and validation behind Zim Bela’s engineering work.",
  alternates: { canonical: `${publication.url}engineering/` },
};
export default function EngineeringPage() {
  return (
    <div className={styles.page} id="top">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <EditorialNav engineering />
      <main id="main-content" tabIndex={-1}>
        <header className={styles.intro}>
          <p>Engineering / Behind the interface</p>
          <h1>The decisions behind the work.</h1>
          <div>
            <p>
              What was the problem? What did I build? What evidence supports it?
              Start with a professional algorithm project, then inspect four
              applications and their engineering tradeoffs.
            </p>
            <p>
              I use AI pair programming for current projects and remain
              responsible for requirements, technical decisions and
              verification. Public source packages and executed analyses make
              the work inspectable.
            </p>
          </div>
          <nav aria-label="Engineering case studies">
            <a href="#mcvay">McVay</a>
            {engineeringStories.map((story) => (
              <a key={story.id} href={`#${story.id}`}>
                {story.title}
              </a>
            ))}
          </nav>
        </header>
        <McVayCase full />
        {engineeringStories.map((story) => (
          <section
            key={story.id}
            id={story.id}
            className={styles.story}
            aria-labelledby={`${story.id}-title`}
          >
            <header className={styles.storyHeader}>
              <div>
                <p className={styles.eyebrow}>{story.field}</p>
                <h2 id={`${story.id}-title`}>{story.title}</h2>
                <p className={styles.status}>{story.status}</p>
              </div>
              <ul aria-label="Technologies">
                {story.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </header>
            <div className={styles.storyGrid}>
              <div>
                <h3>The problem</h3>
                <p className={styles.problem}>{story.problem}</p>
                <h3>My approach</h3>
                <p>{story.approach}</p>
                <h3>Contribution</h3>
                <p>{story.contribution}</p>
              </div>
              <div>
                <h3>Engineering decisions</h3>
                <dl className={styles.decisions}>
                  {story.decisions.map(([title, text]) => (
                    <div key={title}>
                      <dt>{title}</dt>
                      <dd>{text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className={styles.validation}>
              <h3>Validation and results</h3>
              <p>{story.validation}</p>
            </div>
            <div className={styles.try}>
              <h3>What to inspect</h3>
              <p>{story.inspect}</p>
              <CaseDemo id={story.projectId} title={story.title} />
            </div>
            <div className={styles.links}>
              {story.links.map((link) => (
                <SafeLink key={link.href} href={link.href} newTab>
                  {link.label} ↗
                </SafeLink>
              ))}
            </div>
            <details className={styles.boundary}>
              <summary>Implementation scope and next steps</summary>
              <p>{story.boundary}</p>
            </details>
          </section>
        ))}
        <footer className={styles.footer}>
          <SafeLink href="/work/">Explore the full work collection →</SafeLink>
          <SafeLink href="/#contact">Discuss the work →</SafeLink>
        </footer>
      </main>
    </div>
  );
}
