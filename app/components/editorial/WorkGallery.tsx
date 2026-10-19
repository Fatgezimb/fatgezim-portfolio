"use client";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  selectedWork,
  workGroups,
  type SelectedWork,
} from "@/app/content/editorial";
import { ProductPoster } from "./ProductPoster";
import { SafeLink } from "../SafeLink";
import styles from "./WorkGallery.module.css";

const ProjectPreview = lazy(() => import("./ProjectPreview"));
const isExternal = (href?: string) => !!href?.startsWith("https://");

export function WorkGallery({ catalog = false }: { catalog?: boolean }) {
  const categoryNav = useRef<HTMLElement>(null);
  const catalogSection = useRef<HTMLElement>(null);
  const rail = useRef<HTMLOListElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const [active, setActive] = useState<SelectedWork | null>(null);
  const [position, setPosition] = useState(0);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    if (!catalog) return;
    const header = document.querySelector<HTMLElement>('nav[aria-label="Main navigation"]')?.parentElement;
    const nav = categoryNav.current;
    const section = catalogSection.current;
    if (!header || !nav || !section) return;
    const measure = () => {
      section.style.setProperty("--work-header-height", `${header.getBoundingClientRect().height}px`);
      section.style.setProperty("--work-nav-height", `${nav.getBoundingClientRect().height}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    observer.observe(nav);
    return () => observer.disconnect();
  }, [catalog]);
  useEffect(() => {
    if (!active) return;
    const el = dialog.current;
    const previousOverflow = document.body.style.overflow;
    el?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      el?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [active]);

  function close() {
    dialog.current?.close();
    setActive(null);
    opener.current?.focus({ preventScroll: true });
  }

  function updatePosition() {
    const element = rail.current;
    if (!element) return;
    const cards = Array.from(element.children) as HTMLElement[];
    const left = element.getBoundingClientRect().left;
    const closest = cards.reduce(
      (best, card, i) =>
        Math.abs(card.getBoundingClientRect().left - left) <
        Math.abs(cards[best].getBoundingClientRect().left - left)
          ? i
          : best,
      0,
    );
    setPosition(closest);
    setAtEnd(
      element.scrollLeft + element.clientWidth >= element.scrollWidth - 4,
    );
  }

  function move(direction: number) {
    const element = rail.current;
    if (!element) return;
    const card = element.children[0] as HTMLElement;
    const gap = parseFloat(getComputedStyle(element).columnGap) || 24;
    element.scrollBy({
      left: direction * (card.clientWidth + gap),
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  function renderCard(project: SelectedWork, index: number) {
    const openPreview = (button: HTMLButtonElement) => {
      opener.current = button;
      setActive(project);
    };
    return (
      <li key={project.id} className={styles.card}>
        <article aria-labelledby={`project-title-${project.id}`}>
          <div className={styles.poster}>
            <ProductPoster id={project.id} />
            {project.preview ? (
              <button
                className={styles.previewOverlay}
                aria-label={`Try ${project.title} preview`}
                onClick={(event) => openPreview(event.currentTarget)}
              >
                <span className={styles.playIcon} aria-hidden="true">
                  ↗
                </span>
                <span>Try preview</span>
              </button>
            ) : (
              project.href && (
                <SafeLink
                  className={styles.previewOverlay}
                  href={project.href}
                  newTab={project.newTab ?? isExternal(project.href)}
                >
                  <span className={styles.playIcon} aria-hidden="true">
                    ↗
                  </span>
                  <span>{project.action ?? "Explore project"}</span>
                </SafeLink>
              )
            )}
          </div>
          <div className={styles.cardCopy}>
            <span className={styles.number} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <p className={styles.field}>{project.field}</p>
              <h3 id={`project-title-${project.id}`}>{project.title}</h3>
              <p className={styles.description}>{project.description}</p>
              <p className={styles.contribution}>{project.contribution}</p>
              <ul className={styles.tags} aria-label="Technologies and methods">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              {project.scope && <p className={styles.scope}>{project.scope}</p>}
              <div className={styles.cardLinks}>
                {project.href ? (
                  <SafeLink
                    href={project.href}
                    newTab={project.newTab ?? isExternal(project.href)}
                  >
                    {project.action ?? "Open full app"}{" "}
                    <span aria-hidden="true">
                      {isExternal(project.href) ? "↗" : "→"}
                    </span>
                  </SafeLink>
                ) : (
                  <button
                    className={styles.sampleLink}
                    onClick={(event) => openPreview(event.currentTarget)}
                  >
                    Explore sample <span aria-hidden="true">→</span>
                  </button>
                )}
                {project.caseStudy && (
                  <SafeLink href={project.caseStudy}>
                    Engineering notes →
                  </SafeLink>
                )}
                {project.source && (
                  <SafeLink href={project.source} newTab>
                    Source ↗
                  </SafeLink>
                )}
              </div>
            </div>
          </div>
        </article>
      </li>
    );
  }

  return (
    <section
      className={`${styles.section} ${catalog ? styles.catalog : ""}`}
      ref={catalogSection}
      id={catalog ? "all-projects" : "projects"}
      aria-label={catalog ? "All work" : undefined}
      aria-labelledby={catalog ? undefined : "selected-work-heading"}
    >
      {catalog ? (
        <>
          <nav ref={categoryNav} className={styles.indexNav} aria-label="Work categories">
            {workGroups.map((group) => (
              <a key={group.id} href={`#${group.id}`}>
                {group.title}{" "}
                <span>{group.projects.length.toString().padStart(2, "0")}</span>
              </a>
            ))}
          </nav>
          {workGroups.map((group) => (
            <section
              key={group.id}
              id={group.id}
              className={styles.workGroup}
              aria-labelledby={`${group.id}-title`}
            >
              <header className={styles.groupHeading}>
                <h2 id={`${group.id}-title`}>{group.title}</h2>
                <p>{group.description}</p>
              </header>
              <ol
                className={`${styles.catalogGrid} ${group.projects.length === 1 ? styles.singleProject : ""}`}
                aria-label={group.title}
              >
                {group.projects.map((project) =>
                  renderCard(
                    project,
                    workGroups
                      .flatMap((entry) => entry.projects)
                      .findIndex((entry) => entry.id === project.id),
                  ),
                )}
              </ol>
            </section>
          ))}
        </>
      ) : (
        <>
          <span id="work" className={styles.anchor} />
          <header className={styles.heading}>
            <div>
              <p className={styles.kicker}>Selected work</p>
              <h2 id="selected-work-heading">Built to be inspected.</h2>
            </div>
            <div className={styles.galleryControls}>
              <SafeLink href="/work/" className={styles.allWorkLink}>
                View all work <span aria-hidden="true">↗</span>
              </SafeLink>
              <button
                aria-label="Previous projects"
                aria-controls="project-gallery"
                onClick={() => move(-1)}
                disabled={position === 0}
              >
                ←
              </button>
              <button
                aria-label="Next projects"
                aria-controls="project-gallery"
                onClick={() => move(1)}
                disabled={atEnd}
              >
                →
              </button>
            </div>
          </header>
          <ol
            id="project-gallery"
            className={styles.rail}
            ref={rail}
            onScroll={updatePosition}
            tabIndex={0}
            aria-label="Selected products and prototypes"
            onKeyDown={(event) => {
              if (event.target !== event.currentTarget) return;
              if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                event.preventDefault();
                move(event.key === "ArrowRight" ? 1 : -1);
              }
            }}
          >
            {selectedWork.map(renderCard)}
          </ol>
          <div className={styles.railFoot}>
            <span>Rules, implementation, evidence.</span>
            <span aria-live="polite" aria-atomic="true">
              {String(position + 1).padStart(2, "0")} /{" "}
              {String(selectedWork.length).padStart(2, "0")}
            </span>
          </div>
        </>
      )}
      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-labelledby="preview-title"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        {active && (
          <div className={styles.dialogContent}>
            <header className={styles.dialogHeader}>
              <div>
                <p className={styles.kicker}>Interactive preview</p>
                <h2 id="preview-title">{active.title}</h2>
              </div>
              <button
                onClick={close}
                autoFocus
                aria-label="Close project preview"
              >
                ×
              </button>
            </header>
            <Suspense
              fallback={<p role="status">Opening the interactive preview…</p>}
            >
              <ProjectPreview id={active.id} />
            </Suspense>
            <footer className={styles.dialogFooter}>
              <p>{active.scope ?? active.contribution}</p>
              {active.href && (
                <SafeLink href={active.href} newTab={active.newTab ?? isExternal(active.href)}>
                  {active.action ?? "Open full app"}{" "}
                  <span aria-hidden="true">↗</span>
                </SafeLink>
              )}
            </footer>
          </div>
        )}
      </dialog>
    </section>
  );
}
