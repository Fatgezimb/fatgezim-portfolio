"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  projectPresentations as presentations,
  projectDisplayOrder as orderedIds,
} from "@/app/content/project-showcase";
import { featuredProjects } from "@/app/content/projects";
import { SafeLink } from "./SafeLink";
import { TechnicalExperience } from "./project-experiences/TechnicalExperiences";
import { OperationalExperience } from "./project-experiences/OperationalExperiences";
import styles from "./showcase/Projects.module.css";

type Project = (typeof featuredProjects)[number];
const projects = orderedIds
  .map((id) => featuredProjects.find((project) => project.id === id)!)
  .filter(Boolean);
const technical = new Set([
  "neurostack-explorer",
  "rbt-practice-hub",
  "stepspark",
]);

function ProjectWindow({
  project,
  active,
}: {
  project: Project;
  active: boolean;
}) {
  const [live, setLive] = useState(false);
  const presentation = presentations[project.id];
  const source = project.evidenceLinks.find((url) =>
    url.includes("github.com"),
  );
  return (
    <article
      id={`project-${project.id}`}
      className={styles.project}
      hidden={!active}
      data-project-card={project.id}
      role="tabpanel"
      aria-labelledby={`select-${project.id}`}
      tabIndex={0}
    >
      <header className={styles.projectHeader}>
        <div>
          <p className={styles.category}>{presentation.category}</p>
          <h3>{project.verifiedPublicName}</h3>
          <p className={styles.intro}>{presentation.intro}</p>
        </div>
        <div className={styles.projectAction}>
          {presentation.full ? (
            <SafeLink href={presentation.full} newTab>
              Open full site <span aria-hidden="true">↗</span>
            </SafeLink>
          ) : source ? (
            <SafeLink href={source} newTab>
              Explore source <span aria-hidden="true">↗</span>
            </SafeLink>
          ) : (
            <a href="#contact">
              Discuss this project <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </header>
      <div className={styles.window} data-live={live && active}>
        <div className={styles.toolbar}>
          <div>
            <span className={styles.windowMark} aria-hidden="true" />
            <span>{live ? "Live site" : "Try the product"}</span>
          </div>
          {presentation.live && (
            <button
              type="button"
              aria-pressed={live}
              onClick={() => {
                setLive(!live);
              }}
            >
              {live ? "Back to sample" : "Load live site"}{" "}
              <span aria-hidden="true">{live ? "←" : "↗"}</span>
            </button>
          )}
        </div>
        {live && active && presentation.live ? (
          <div className={styles.embed}>
            <iframe
              title={`${project.verifiedPublicName} live site`}
              src={presentation.live}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            />
            <p role="status">
              Live site window.{" "}
              <SafeLink href={presentation.live} newTab>
                Open in a new tab ↗
              </SafeLink>
            </p>
          </div>
        ) : (
          <div className={styles.productBody}>
            {technical.has(project.id) ? (
              <TechnicalExperience projectId={project.id} />
            ) : (
              <OperationalExperience projectId={project.id} />
            )}
          </div>
        )}
        <div className={styles.windowCaption}>
          <p>
            {live
              ? "Navigate inside the window, or open the full experience."
              : presentation.hint}
          </p>
          <span>{live ? "External site" : presentation.scope}</span>
        </div>
      </div>
      <div className={styles.projectFoot}>
        <div>
          <p className={styles.roleLabel}>My role</p>
          <p>{project.role}</p>
        </div>
        <p className={styles.methods}>
          {project.methods.slice(0, 5).join(" / ")}
        </p>
        <details className={styles.details}>
          <summary>About the build</summary>
          <div>
            <p>{project.summary}</p>
            <ul>
              {project.verifiedOutputs.map((output) => (
                <li key={output}>{output}</li>
              ))}
            </ul>
            <p>{project.publicScope}</p>
            {source && (
              <SafeLink href={source} newTab>
                View source code ↗
              </SafeLink>
            )}
          </div>
        </details>
      </div>
    </article>
  );
}
export function FeaturedProjects() {
  const [selected, setSelected] = useState(projects[0].id);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    function syncHash() {
      const id = window.location.hash.replace("#project-", "");
      const target = projects.find((project) => project.id === id);
      if (target) {
        setSelected(target.id);
        requestAnimationFrame(() =>
          document
            .getElementById("projects")
            ?.scrollIntoView({ block: "start", behavior: "instant" }),
        );
      }
    }
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);
  function select(index: number, focus = false) {
    const id = projects[index].id;
    setSelected(id);
    window.history.replaceState(window.history.state, "", `#project-${id}`);
    if (focus) buttons.current[index]?.focus();
  }
  function handleKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const direction = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    }[event.key];
    if (direction) {
      event.preventDefault();
      select((index + direction + projects.length) % projects.length, true);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      select(event.key === "Home" ? 0 : projects.length - 1, true);
    }
  }
  return (
    <section className={styles.section} id="projects">
      <header className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>Selected work</p>
          <h2>
            Don’t just read.
            <br />
            <em>Take a look inside.</em>
          </h2>
        </div>
        <p>
          Real workflows. Working interfaces.
          <br />
          Pick a project and explore it here.
        </p>
      </header>
      <div className={styles.studio}>
        <div
          className={styles.projectIndex}
          role="tablist"
          aria-label="Choose a project"
          aria-orientation="vertical"
        >
          {projects.map((project, index) => (
            <button
              key={project.id}
              id={`select-${project.id}`}
              role="tab"
              aria-selected={selected === project.id}
              aria-controls={`project-${project.id}`}
              tabIndex={selected === project.id ? 0 : -1}
              ref={(element) => {
                buttons.current[index] = element;
              }}
              onClick={() => select(index)}
              onKeyDown={(event) => handleKey(event, index)}
              type="button"
            >
              <span>{presentations[project.id].short}</span>
              <small>{presentations[project.id].category}</small>
              <span className={styles.indexArrow} aria-hidden="true">
                ↗
              </span>
            </button>
          ))}
        </div>
        <div className={styles.workspace}>
          {projects.map((project) => (
            <ProjectWindow
              key={project.id}
              project={project}
              active={selected === project.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
