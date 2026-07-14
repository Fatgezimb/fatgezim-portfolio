"use client";

import { useEffect, useId, useRef } from "react";
import styles from "./HeroSignalMap.module.css";

const signalPaths = [
  "M92 118 C174 62 248 86 326 188",
  "M92 118 C154 208 222 256 326 188",
  "M326 188 C424 74 536 76 626 126",
  "M326 188 C438 232 526 262 644 224",
  "M326 188 C374 306 468 362 586 390",
  "M326 188 C282 310 214 386 112 408",
  "M112 408 C264 444 438 446 586 390",
] as const;

const signalNodes = [
  { x: 92, y: 118, label: "NEURO", tone: "cyan" },
  { x: 326, y: 188, label: "CORE", tone: "core" },
  { x: 626, y: 126, label: "CLINICAL", tone: "warm" },
  { x: 644, y: 224, label: "BEHAVIOR", tone: "cyan" },
  { x: 586, y: 390, label: "SYSTEMS", tone: "warm" },
  { x: 112, y: 408, label: "DATA", tone: "cyan" },
] as const;

export type HeroSignalMapProps = {
  className?: string;
  title?: string;
  description?: string;
};

/**
 * A small SVG/CSS spatial scene. It is static before hydration, when off-screen,
 * and for reduced-motion users; animation runs only while the figure is visible.
 */
export function HeroSignalMap({
  className,
  title = "Connected discipline signal map",
  description =
    "An abstract network links neuroscience, clinical learning, behavioral science, data, and software systems around one multidisciplinary practice.",
}: HeroSignalMapProps) {
  const figureRef = useRef<HTMLElement>(null);
  const reactId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const titleId = `signal-map-title-${reactId}`;
  const descriptionId = `signal-map-description-${reactId}`;
  const gradientId = `signal-map-gradient-${reactId}`;

  useEffect(() => {
    const figure = figureRef.current;
    if (!figure) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;

    function syncMotion() {
      if (!figure) return;
      figure.dataset.sceneMotion = visible && !reducedMotion.matches ? "active" : "paused";
    }

    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              visible = entry.isIntersecting;
              syncMotion();
            },
            { rootMargin: "96px 0px", threshold: 0.08 },
          )
        : null;

    if (observer) {
      observer.observe(figure);
    } else {
      visible = true;
      syncMotion();
    }

    reducedMotion.addEventListener("change", syncMotion);
    return () => {
      observer?.disconnect();
      reducedMotion.removeEventListener("change", syncMotion);
    };
  }, []);

  return (
    <figure
      aria-describedby={descriptionId}
      aria-labelledby={titleId}
      className={[styles.scene, className].filter(Boolean).join(" ")}
      data-scene-motion="paused"
      ref={figureRef}
    >
      <div className={styles.viewport} aria-hidden="true">
        <div className={styles.lattice}>
          <svg focusable="false" viewBox="0 0 720 500">
            <defs>
              <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="var(--accent, #75e4d3)" />
                <stop offset="0.55" stopColor="var(--accent-strong, #a5f3e7)" />
                <stop offset="1" stopColor="var(--warm, #f6c878)" />
              </linearGradient>
            </defs>

            <g className={styles.links}>
              {signalPaths.map((path) => (
                <path d={path} key={path} />
              ))}
            </g>
            <g className={styles.flows} style={{ stroke: `url(#${gradientId})` }}>
              {signalPaths.slice(0, 5).map((path, index) => (
                <path d={path} key={path} style={{ animationDelay: `${index * -1.1}s` }} />
              ))}
            </g>

            <g className={styles.nodes}>
              {signalNodes.map((node, index) => (
                <g
                  className={styles[node.tone]}
                  key={node.label}
                  style={{ animationDelay: `${index * -0.7}s` }}
                  transform={`translate(${node.x} ${node.y})`}
                >
                  <circle className={styles.nodeHalo} r={node.tone === "core" ? 31 : 18} />
                  <circle className={styles.nodeDot} r={node.tone === "core" ? 10 : 6} />
                  <text x="0" y={node.tone === "core" ? 52 : 36}>
                    {node.label}
                  </text>
                </g>
              ))}
            </g>
          </svg>
        </div>
        <span className={styles.axis} />
        <span className={styles.readout}>SIGNAL / MULTIDISCIPLINARY</span>
      </div>

      <figcaption className={styles.caption}>
        <strong id={titleId}>{title}</strong>
        <span id={descriptionId}>{description}</span>
      </figcaption>
    </figure>
  );
}
