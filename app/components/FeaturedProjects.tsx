"use client";

import {
  featuredProjects,
  projectSelectionNotes,
} from "@/app/content/projects";
import { siteContent } from "@/app/content/site";
import { useEffect, useState } from "react";
import { SafeLink } from "./SafeLink";
import { SectionHeading } from "./SectionHeading";
import { ProjectMicroDemo } from "./project-demos";
import { ProjectDataCore } from "./spatial";

type FeaturedProject = (typeof featuredProjects)[number];
type FeaturedProjectId = FeaturedProject["id"];

type ProjectCardProps = {
  active: boolean;
  project: FeaturedProject;
  index: number;
  onActivate: (projectId: FeaturedProjectId) => void;
};

function ProjectCard({ active, project, index, onActivate }: ProjectCardProps) {
  const projectName = project.verifiedPublicName ?? "Project under review";
  const projectAnchor = `project-${project.id}`;

  return (
    <article
      className="project-card"
      data-active={active ? "true" : "false"}
      data-project-card={project.id}
      data-reveal="scale"
      id={projectAnchor}
      onFocusCapture={() => onActivate(project.id)}
      onPointerEnter={() => onActivate(project.id)}
    >
      <div className="project-card__surface">
        <header className="project-card__header">
          <div>
            <p className="project-index">
              Project / {String(index + 1).padStart(2, "0")}
            </p>
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

            <ul
              className="tag-list"
              aria-label={`${projectName} methods and technologies`}
            >
              {project.methods.slice(0, 7).map((method) => (
                <li key={method}>{method}</li>
              ))}
            </ul>

            {project.evidenceLinks.length ? (
              <div className="project-links" aria-label={`${projectName} links`}>
                {project.evidenceLinks.map((href, linkIndex) => (
                  <SafeLink href={href} key={href} newTab>
                    {linkIndex === 0
                      ? "Open project evidence"
                      : `Evidence link ${linkIndex + 1}`}
                    <span aria-hidden="true"> ↗</span>
                  </SafeLink>
                ))}
              </div>
            ) : (
              <p className="evidence-status">Private or local project · no public link</p>
            )}
          </div>

          <div className="project-demo-shell">
            <ProjectMicroDemo projectId={project.id} />
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
      </div>
    </article>
  );
}

export function FeaturedProjects() {
  const [activeProjectId, setActiveProjectId] = useState<FeaturedProjectId>(
    featuredProjects[0].id,
  );

  useEffect(() => {
    let frame = 0;
    const cards = featuredProjects
      .map((project) =>
        document.querySelector<HTMLElement>(`[data-project-card="${project.id}"]`),
      )
      .filter((card): card is HTMLElement => Boolean(card));

    const updateActiveProject = () => {
      frame = 0;
      const activationLine = window.innerHeight * 0.44;
      let closestCard = cards[0];
      let closestDistance = Number.POSITIVE_INFINITY;

      for (const card of cards) {
        const bounds = card.getBoundingClientRect();
        if (bounds.bottom < 0 || bounds.top > window.innerHeight) continue;
        const distance = Math.abs(bounds.top - activationLine);
        if (distance < closestDistance) {
          closestCard = card;
          closestDistance = distance;
        }
      }

      const candidate = closestCard?.dataset.projectCard as FeaturedProjectId | undefined;
      if (candidate) setActiveProjectId(candidate);
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveProject);
    };

    updateActiveProject();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <section
      className="content-section section-shell projects-section"
      data-reveal="up"
      id="projects"
    >
      <SectionHeading
        eyebrow="Project lab / 02"
        title={siteContent.featuredWork.heading}
        description={siteContent.featuredWork.introduction}
      />
      <p className="selection-note">{projectSelectionNotes.selectionRationale}</p>

      <div className="project-lab">
        <div className="project-lab__core" aria-hidden="true">
          <div className="project-lab__core-stage">
            <ProjectDataCore activeProjectId={activeProjectId} />
          </div>
        </div>

        <nav className="project-lab__index" aria-label="Featured project index">
          <p>Active project signal</p>
          <ol>
            {featuredProjects.map((project, index) => {
              const isActive = activeProjectId === project.id;
              return (
                <li key={project.id}>
                  <a
                    aria-current={isActive ? "location" : undefined}
                    href={`#project-${project.id}`}
                    onFocus={() => setActiveProjectId(project.id)}
                    onPointerEnter={() => setActiveProjectId(project.id)}
                  >
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <span>{project.verifiedPublicName}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="project-lab__track">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              active={activeProjectId === project.id}
              index={index}
              key={project.id}
              onActivate={setActiveProjectId}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
