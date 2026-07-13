import type { ProjectRecord } from "@/app/content/projects";
import {
  featuredProjects,
  projectSelectionNotes,
} from "@/app/content/projects";
import { siteContent } from "@/app/content/site";
import { SectionHeading } from "./SectionHeading";

type ProjectCardProps = {
  project: ProjectRecord;
  index: number;
};

function ProjectCard({ project, index }: ProjectCardProps) {
  const projectName = project.verifiedPublicName ?? "Project under review";

  return (
    <article className={`project-card${index === 0 ? " project-card--lead" : ""}`}>
      <header className="project-card__header">
        <div>
          <p className="project-index">Project / {String(index + 1).padStart(2, "0")}</p>
          <h3>{projectName}</h3>
        </div>
        <span className="status-chip">{project.status}</span>
      </header>

      <div className="project-card__body">
        <div className="project-card__copy">
          <p className="project-summary">{project.summary}</p>
          <dl className="project-facts">
            <div>
              <dt>Role</dt>
              <dd>{project.role ?? "Role omitted pending verification"}</dd>
            </div>
            <div>
              <dt>Audience</dt>
              <dd>{project.audience.join(" · ")}</dd>
            </div>
          </dl>

          <ul className="tag-list" aria-label={`${projectName} methods and technologies`}>
            {project.methods.slice(0, 7).map((method) => (
              <li key={method}>{method}</li>
            ))}
          </ul>

          {project.evidenceLinks.length ? (
            <div className="project-links" aria-label={`${projectName} links`}>
              {project.evidenceLinks.map((href, linkIndex) => (
                <a href={href} key={href} rel="noreferrer" target="_blank">
                  {linkIndex === 0 ? "Open project evidence" : `Evidence link ${linkIndex + 1}`}
                  <span aria-hidden="true"> ↗</span>
                </a>
              ))}
            </div>
          ) : (
            <p className="evidence-status">Private or local project · no public link</p>
          )}
        </div>

        <div className="project-placeholder" aria-label={`${projectName} static workflow outline`}>
          <div className="panel-label">
            <span>{siteContent.featuredWork.demoPlaceholderLabel}</span>
            <span>Not interactive</span>
          </div>
          <ol className="workflow-list">
            {project.demoStory.map((step, stepIndex) => (
              <li key={step}>
                <span aria-hidden="true">{String(stepIndex + 1).padStart(2, "0")}</span>
                <p>{step.replace(/^Static placeholder:\s*/i, "")}</p>
              </li>
            ))}
          </ol>
          <p className="placeholder-note">
            {siteContent.featuredWork.demoPlaceholderNote}
          </p>
        </div>
      </div>

      <details className="project-details" open={index === 0}>
        <summary>Evidence-backed scope and boundaries</summary>
        <div className="project-details__grid">
          <div>
            <h4>Problem</h4>
            <p>{project.problem ?? "Problem statement omitted pending verification."}</p>
          </div>
          <div>
            <h4>Verified outputs</h4>
            <ul>
              {project.verifiedOutputs.map((output) => (
                <li key={output}>{output}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Privacy and claim boundaries</h4>
            <ul>
              {[...project.privacyNotes, ...project.uncertaintyFlags].map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      </details>
    </article>
  );
}

export function FeaturedProjects() {
  return (
    <section className="content-section section-shell" id="projects">
      <SectionHeading
        eyebrow="Project lab / 02"
        title={siteContent.featuredWork.heading}
        description={siteContent.featuredWork.introduction}
      />
      <p className="selection-note">{projectSelectionNotes.selectionRationale}</p>
      <div className="project-grid">
        {featuredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
