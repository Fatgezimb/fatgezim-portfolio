"use client";

import type { CSSProperties } from "react";
import { useMemo } from "react";
import { SceneCanvas } from "./SceneCanvas";
import styles from "./ProjectDataCore.module.css";
import {
  createProjectDataScene,
  defaultProjectDataCoreTheme,
  projectDataCoreThemes,
  type ProjectDataCoreTheme,
} from "./projectDataScene";

export type ProjectDataCoreProps = {
  activeProjectId?: string;
  accent?: string;
  className?: string;
  secondary?: string;
};

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

function themeForProject(projectId: string): ProjectDataCoreTheme {
  return (
    projectDataCoreThemes[projectId as keyof typeof projectDataCoreThemes] ??
    defaultProjectDataCoreTheme
  );
}

function ProjectCoreFallback() {
  return (
    <div className={styles.fallback}>
      <svg aria-hidden="true" focusable="false" viewBox="0 0 500 500">
        <ellipse className={styles.fallbackOrbit} cx="250" cy="250" rx="196" ry="82" />
        <ellipse
          className={styles.fallbackOrbit}
          cx="250"
          cy="250"
          rx="196"
          ry="82"
          transform="rotate(60 250 250)"
        />
        <ellipse
          className={styles.fallbackOrbit}
          cx="250"
          cy="250"
          rx="196"
          ry="82"
          transform="rotate(120 250 250)"
        />
        <path className={styles.fallbackLink} d="M98 250 L250 94 L402 250 L250 406 Z" />
        <path className={styles.fallbackLink} d="M98 250 L402 250 M250 94 L250 406" />
        <circle className={styles.fallbackCore} cx="250" cy="250" r="18" />
      </svg>
    </div>
  );
}

/** Decorative project-reactive data core. No project information is canvas-only. */
export function ProjectDataCore({
  activeProjectId = "project",
  accent,
  className,
  secondary,
}: ProjectDataCoreProps) {
  const baseTheme = themeForProject(activeProjectId);
  const theme = useMemo(
    () => ({
      accent: accent ?? baseTheme.accent,
      secondary: secondary ?? baseTheme.secondary,
      core: baseTheme.core,
    }),
    [accent, baseTheme, secondary],
  );
  const config = useMemo(
    () => ({ projectId: activeProjectId, theme }),
    [activeProjectId, theme],
  );
  const coreStyle = {
    "--core-accent": theme.accent,
    "--core-secondary": theme.secondary,
    "--core-center": theme.core,
  } as CSSProperties;

  return (
    <div
      aria-hidden="true"
      className={joinClassNames(styles.core, className)}
      style={coreStyle}
    >
      <SceneCanvas
        className={styles.scene}
        config={config}
        createScene={createProjectDataScene}
        fallback={<ProjectCoreFallback />}
      />
    </div>
  );
}
