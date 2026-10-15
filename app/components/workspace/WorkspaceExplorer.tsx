"use client";

import { useEffect, useRef, useState } from "react";
import {
  domainById,
  workspaceDomains,
  type DomainId,
} from "@/app/content/workspace";
import { SafeLink } from "../SafeLink";
import styles from "./Workspace.module.css";
import type { createWorkspaceScene } from "./workspaceScene";

function WorkspacePoster() {
  return (
    <svg className={styles.poster} viewBox="0 0 1200 650" aria-hidden="true">
      <defs>
        <linearGradient id="desk-shade" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#e4dff0" />
          <stop offset="1" stopColor="#c3bed6" />
        </linearGradient>
        <filter id="desk-shadow">
          <feGaussianBlur stdDeviation="15" />
        </filter>
      </defs>
      <ellipse
        cx="610"
        cy="512"
        rx="440"
        ry="58"
        fill="#56516f"
        opacity=".13"
        filter="url(#desk-shadow)"
      />
      <path d="M120 318 665 100 1090 336 548 584Z" fill="#a9a3bf" />
      <path d="M120 300 665 82 1090 318 548 566Z" fill="url(#desk-shade)" />
      <g transform="translate(330 270)">
        <ellipse cy="40" rx="77" ry="32" fill="#47435b" />
        <path
          d="M-65 25V-116Q0-173 65-116V25Q0 65-65 25Z"
          fill="#bce1d4"
          fillOpacity=".48"
          stroke="#fff"
          strokeOpacity=".65"
        />
        <path
          d="M0 25V-90m0 30L-36-94m36 34 32-45m-32 57-41 10m41-10 38 16"
          fill="none"
          stroke="#a88d5e"
          strokeWidth="5"
        />
        <circle cy="-55" r="15" fill="#7daf9c" />
      </g>
      <g transform="translate(590 220)">
        <path d="M-90-90 96-63 96 58-90 30Z" fill="#36344d" />
        <path d="M-77-75 82-52 82 41-77 18Z" fill="#52536c" />
        <path
          d="M-63-47 47-31m-110 7 83 13m-83 7 106 16"
          stroke="#b5a5ea"
          strokeWidth="6"
        />
        <path d="M0 44v50m-34 0 70 8" stroke="#a5abc3" strokeWidth="13" />
        <path d="M-85 110 72 126 111 105-42 87Z" fill="#edf0f3" />
      </g>
      <g transform="translate(865 307)">
        <ellipse cy="15" rx="78" ry="32" fill="#f4f2ed" />
        {[35, 65, 112, 87, 52].map((h, i) => (
          <path
            key={i}
            d={`M${-55 + i * 25} 6v${-h}l15-7v${h}Z`}
            fill={i % 2 ? "#c6a35f" : "#a99bcf"}
          />
        ))}
        <path
          d="M-67-40Q0-150 70-56"
          fill="none"
          stroke="#bec4d7"
          strokeWidth="4"
        />
      </g>
      <g transform="translate(465 414) rotate(-18)">
        <path d="M-105-30 0-44 112-20 102 56-4 40-112 50Z" fill="#d39484" />
        <path d="M-97-25 0-35 104-15 96 45-4 30-103 41Z" fill="#f6f1e5" />
        <path
          d="M0-35-4 30m-78-38 53-7m-51 21 53-7m-51 21 53-7"
          stroke="#bfb5b3"
          strokeWidth="2"
        />
        <ellipse
          cx="53"
          cy="5"
          rx="16"
          ry="23"
          fill="none"
          stroke="#c48778"
          strokeWidth="3"
        />
      </g>
      <g transform="translate(746 432)">
        <path d="M-79 0 9-36 89 7 0 43Z" fill="#f6f4ee" />
        {Array.from({ length: 12 }, (_, i) => (
          <path
            key={i}
            d={`M${-60 + i * 3} ${-2 + i * 2} Q${-20 + i * 3} ${-120 + i * 2} ${59 + i * 3} ${-13 + i * 2}`}
            fill="none"
            stroke="#8f7bbb"
            strokeWidth="3.6"
          />
        ))}
      </g>
    </svg>
  );
}

export function WorkspaceExplorer() {
  const [selected, setSelected] = useState<DomainId | null>(null);
  const [tour, setTour] = useState(false);
  const [selectionRequest, setSelectionRequest] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mode, setMode] = useState<"loading" | "3d" | "flat">("loading");
  const [attempt, setAttempt] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const storyHeading = useRef<HTMLHeadingElement>(null);
  const explorerRef = useRef<HTMLDivElement>(null);
  const controller = useRef<ReturnType<typeof createWorkspaceScene> | null>(
    null,
  );
  const selectedRef = useRef<DomainId | null>(null);
  const labels = useRef(new Map<DomainId, HTMLButtonElement>());
  const topics = useRef(new Map<DomainId, HTMLButtonElement>());
  const forcedFlat = useRef(false);
  const domain = selected ? domainById(selected) : null;
  const index = workspaceDomains.findIndex((item) => item.id === selected);
  useEffect(() => {
    selectedRef.current = selected;
    controller.current?.select(selected);
    if (!selected) return;
    const frame = requestAnimationFrame(() => {
      storyHeading.current?.focus({ preventScroll: true });
      const target = matchMedia("(max-width:760px)").matches
        ? storyHeading.current?.closest("article")
        : explorerRef.current;
      if (target) {
        const r = target.getBoundingClientRect();
        if (r.top < 85 || r.top > innerHeight * 0.35)
          target.scrollIntoView({
            block: "start",
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "instant"
              : "smooth",
          });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [selected, selectionRequest]);
  useEffect(() => {
    controller.current?.setPaused(paused);
  }, [paused]);
  useEffect(() => {
    if (!canvasRef.current) return;
    let cancelled = false;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const device = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
      deviceMemory?: number;
    };
    const connection = device.connection;
    if (
      forcedFlat.current ||
      (attempt === 0 &&
        (reduced.matches ||
          (device.hardwareConcurrency > 0 && device.hardwareConcurrency <= 2) ||
          (device.deviceMemory !== undefined && device.deviceMemory <= 2) ||
          connection?.saveData ||
          ["slow-2g", "2g"].includes(connection?.effectiveType ?? "")))
    ) {
      queueMicrotask(() => {
        if (!cancelled) setMode("flat");
      });
      return () => {
        cancelled = true;
      };
    }
    const canvas = canvasRef.current;
    import("./workspaceScene")
      .then(({ createWorkspaceScene }) => {
        if (cancelled) return;
        try {
          controller.current = createWorkspaceScene({
            canvas,
            reduced: reduced.matches,
            onSelect: (id) => {
              setSelected(id);
              setTour(false);
              setSelectionRequest((value) => value + 1);
            },
            onLabels: (points) =>
              points.forEach(({ id, x, y }) => {
                const label = labels.current.get(id);
                if (label) {
                  label.style.left = `${x}px`;
                  label.style.top = `${y}px`;
                }
              }),
            onFailure: () => {
              setMode("flat");
              controller.current?.destroy();
              controller.current = null;
            },
            onReady: () => setMode("3d"),
          });
          controller.current.select(selectedRef.current);
          controller.current.setPaused(paused);
        } catch {
          setMode("flat");
        }
      })
      .catch(() => {
        if (!cancelled) setMode("flat");
      });
    const preference = () => controller.current?.setReduced(reduced.matches);
    reduced.addEventListener("change", preference);
    return () => {
      cancelled = true;
      controller.current?.destroy();
      controller.current = null;
      reduced.removeEventListener("change", preference);
    };
    // A retry deliberately creates a fresh renderer; other state uses its controller.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt]);
  function choose(id: DomainId) {
    setSelected(id);
    setTour(false);
    setSelectionRequest((value) => value + 1);
  }
  function close() {
    const id = selected;
    setSelected(null);
    setTour(false);
    if (id) topics.current.get(id)?.focus();
  }
  function changeMode() {
    if (mode === "3d") {
      forcedFlat.current = true;
      controller.current?.destroy();
      controller.current = null;
      setMode("flat");
    } else {
      forcedFlat.current = false;
      setMode("loading");
      setAttempt((value) => value + 1);
    }
  }
  return (
    <div
      ref={explorerRef}
      className={styles.explorer}
      id="workspace"
      data-workspace-mode={mode}
      data-selected={Boolean(selected)}
      onKeyDown={(event) => {
        if (event.key === "Escape" && selected) {
          event.preventDefault();
          close();
        }
      }}
    >
      <div className={styles.workspaceHeading}>
        <p>
          A few things on my mind. <span>Pick one up.</span>
        </p>
        <div>
          <button
            type="button"
            onClick={() => {
              setTour(true);
              setSelected("neuroscience");
              setSelectionRequest((value) => value + 1);
            }}
          >
            Take the tour <span aria-hidden="true">↗</span>
          </button>
          <button type="button" onClick={changeMode}>
            {mode === "3d" ? "Use 2D view" : "Try 3D view"}
          </button>
        </div>
      </div>
      <div className={styles.experience}>
        <div className={styles.stage}>
          <WorkspacePoster />
          <div className={styles.renderHost}>
            <canvas
              key={attempt}
              ref={canvasRef}
              aria-hidden="true"
              className={
                mode === "3d" ? styles.canvasReady : styles.canvasHidden
              }
            />
          </div>
          <div
            className={styles.objectLabels}
            aria-hidden={mode !== "3d" || Boolean(selected)}
          >
            {workspaceDomains.map((item) => (
              <button
                type="button"
                key={item.id}
                tabIndex={-1}
                ref={(el) => {
                  if (el) labels.current.set(item.id, el);
                  else labels.current.delete(item.id);
                }}
                onClick={() => choose(item.id)}
              >
                <i style={{ background: item.color }} />
                {item.name}
                <span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <div className={styles.sceneFooter}>
            <span>
              {selected
                ? domain?.object
                : "An original study in connected interests"}
            </span>
            {mode === "3d" && (
              <button
                type="button"
                aria-pressed={paused}
                onClick={() => setPaused(!paused)}
              >
                {paused ? "Play motion" : "Pause motion"}
              </button>
            )}
          </div>
        </div>
        {domain && (
          <article
            className={styles.story}
            id="workspace-story"
            aria-labelledby="domain-title"
          >
            <div className={styles.storyTop}>
              <p>{domain.name}</p>
              <button
                type="button"
                onClick={close}
                aria-label="Close workspace story"
              >
                ×
              </button>
            </div>
            <h2 ref={storyHeading} tabIndex={-1} id="domain-title">
              {domain.headline}
            </h2>
            <p className={styles.storyCopy}>{domain.story}</p>
            <ul className={styles.domainSkills}>
              {domain.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
            <div className={styles.domainLinks}>
              {domain.links.map((link) =>
                link.href.startsWith("#") ? (
                  <a key={link.href} href={link.href}>
                    {link.label}
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <SafeLink key={link.href} href={link.href} newTab>
                    {link.label}
                    <span aria-hidden="true">↗</span>
                  </SafeLink>
                ),
              )}
            </div>
            <div className={styles.tourNav}>
              <span>
                {tour ? "Workspace tour" : "Explore the workspace"} ·{" "}
                {index + 1} / 5
              </span>
              <div>
                <button
                  type="button"
                  aria-label="Previous workspace topic"
                  onClick={() =>
                    setSelected(workspaceDomains[(index + 4) % 5].id)
                  }
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Next workspace topic"
                  onClick={() =>
                    setSelected(workspaceDomains[(index + 1) % 5].id)
                  }
                >
                  →
                </button>
              </div>
            </div>
          </article>
        )}
      </div>
      <p className="sr-only" role="status">
        {domain
          ? `${domain.name}: ${domain.headline}`
          : "Choose a workspace topic to explore."}
      </p>
      <div
        className={styles.topics}
        role="group"
        aria-label="Explore five workspace topics"
      >
        {workspaceDomains.map((item) => (
          <button
            key={item.id}
            type="button"
            ref={(el) => {
              if (el) topics.current.set(item.id, el);
              else topics.current.delete(item.id);
            }}
            aria-pressed={selected === item.id}
            onClick={() => choose(item.id)}
          >
            <span style={{ background: item.color }} aria-hidden="true" />
            {item.name}
            <small>{item.object}</small>
          </button>
        ))}
      </div>
      <noscript>
        <div className={styles.staticStories}>
          {workspaceDomains.map((item) => (
            <article key={item.id}>
              <h2>{item.name}</h2>
              <p>{item.story}</p>
              {item.links.map((link) => (
                <SafeLink
                  key={link.href}
                  href={link.href}
                  newTab={!link.href.startsWith("#")}
                >
                  {link.label} ↗
                </SafeLink>
              ))}
            </article>
          ))}
        </div>
      </noscript>
    </div>
  );
}
