"use client";

import {
  useCallback,
  useEffect,
  useId,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { PointerTilt } from "../motion";
import { ArchitectureLens } from "./ArchitectureLens";
import { MiniProductSurface } from "./MiniProductSurface";
import styles from "./ProjectMicroDemo.module.css";
import {
  createProjectDemoState,
  projectDemoReducer,
  type ProjectDemoPauseReason,
  type ProjectDemoPlaybackOrigin,
  type ProjectDemoState,
  type ProjectDemoView,
} from "./stateMachine";
import {
  getProjectStoryboard,
  type FeaturedProjectId,
  type ProjectStoryboard,
} from "./storyboards";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const ACTIVE_PREVIEW_EVENT = "portfolio:project-preview-start";

type DemoStyle = CSSProperties & {
  "--demo-accent": string;
  "--demo-secondary": string;
  "--demo-glow": string;
};

export type ProjectMicroDemoProps = {
  projectId: FeaturedProjectId;
  className?: string;
  autoplayDelayMs?: number;
  frameDurationMs?: number;
};

function subscribeToReducedMotion(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", onStoreChange);

  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  // Hydrate conservatively so automatic playback cannot begin before the
  // visitor's preference is known.
  return true;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

const pauseReasonCopy: Record<Exclude<ProjectDemoPauseReason, null>, string> = {
  architecture: "the Architecture Lens opened",
  "focus-left": "keyboard focus left the preview",
  hidden: "the page became hidden",
  manual: "a manual control was used",
  offscreen: "the preview moved off screen",
  "other-preview": "another project preview started",
  "pointer-left": "the pointer left the preview",
  "reduced-motion": "reduced motion was enabled",
};

function statusMessage(
  storyboard: ProjectStoryboard,
  state: ProjectDemoState,
  isVisible: boolean,
  notice: string | null,
) {
  if (notice) return notice;

  if (state.view === "architecture") {
    return `Architecture Lens open for ${storyboard.title}. The semantic system map contains ${storyboard.architecture.nodes.length} nodes.`;
  }

  const frame = storyboard.frames[state.frameIndex];
  const position = `Frame ${state.frameIndex + 1} of ${storyboard.frames.length}: ${frame.title}.`;

  if (!isVisible && state.playback !== "playing") {
    return `Preview is off screen. ${position}`;
  }

  if (state.playback === "playing") return `Playing. ${position}`;
  if (state.playback === "complete") return `Preview complete. ${position}`;
  if (state.playback === "paused" && state.pauseReason) {
    return `Paused because ${pauseReasonCopy[state.pauseReason]}. ${position}`;
  }

  return `Ready. ${position}`;
}

type ProjectMicroDemoPlayerProps = Required<
  Pick<ProjectMicroDemoProps, "autoplayDelayMs" | "frameDurationMs">
> &
  Pick<ProjectMicroDemoProps, "className"> & {
    storyboard: ProjectStoryboard;
  };

function ProjectMicroDemoPlayer({
  autoplayDelayMs,
  className,
  frameDurationMs,
  storyboard,
}: ProjectMicroDemoPlayerProps) {
  const rootRef = useRef<HTMLElement>(null);
  const demoTabRef = useRef<HTMLButtonElement>(null);
  const architectureTabRef = useRef<HTMLButtonElement>(null);
  const autoplayTimerRef = useRef<number | null>(null);
  const stateRef = useRef(createProjectDemoState());
  const isVisibleRef = useRef(true);
  const hoveredRef = useRef(false);
  const focusedRef = useRef(false);
  const reducedMotionRef = useRef(true);

  const prefersReducedMotion = usePrefersReducedMotion();
  const [state, dispatch] = useReducer(
    projectDemoReducer,
    undefined,
    createProjectDemoState,
  );
  const [isVisible, setIsVisible] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    reducedMotionRef.current = prefersReducedMotion;
  }, [prefersReducedMotion]);

  const titleId = useId();
  const playerId = useId();
  const stageId = useId();
  const privacyId = useId();
  const statusId = useId();
  const demoTabId = useId();
  const architectureTabId = useId();
  const demoPanelId = useId();
  const architecturePanelId = useId();

  const frameCount = storyboard.frames.length;
  const currentFrame = storyboard.frames[state.frameIndex];
  const safeAutoplayDelay = Math.max(250, autoplayDelayMs);
  const safeFrameDuration = Math.max(500, frameDurationMs);
  const isPlaying = state.playback === "playing";

  const demoStyle: DemoStyle = {
    "--demo-accent": storyboard.theme.accent,
    "--demo-secondary": storyboard.theme.secondary,
    "--demo-glow": storyboard.theme.glow,
  };

  const clearAutoplayTimer = useCallback(() => {
    if (autoplayTimerRef.current !== null) {
      window.clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  const pausePlayback = useCallback(
    (reason: Exclude<ProjectDemoPauseReason, null>) => {
      clearAutoplayTimer();
      dispatch({ type: "pause", reason });
      setNotice(null);
    },
    [clearAutoplayTimer],
  );

  const announceActivePreview = useCallback(() => {
    window.dispatchEvent(
      new CustomEvent(ACTIVE_PREVIEW_EVENT, {
        detail: { playerId },
      }),
    );
  }, [playerId]);

  const startPlayback = useCallback(
    (
      origin: Exclude<ProjectDemoPlaybackOrigin, null>,
      restart = false,
    ) => {
      clearAutoplayTimer();

      if (!isVisibleRef.current) {
        setNotice("Preview is off screen. Bring it into view before playing.");
        return;
      }

      announceActivePreview();
      setNotice(null);
      dispatch({ type: "play", frameCount, origin, restart });
    },
    [announceActivePreview, clearAutoplayTimer, frameCount],
  );

  const replay = useCallback(
    (origin: Exclude<ProjectDemoPlaybackOrigin, null>) => {
      clearAutoplayTimer();

      if (!isVisibleRef.current) {
        setNotice("Preview is off screen. Bring it into view before replaying.");
        return;
      }

      announceActivePreview();
      setNotice(null);
      dispatch({ type: "replay", frameCount, origin });
    },
    [announceActivePreview, clearAutoplayTimer, frameCount],
  );

  const scheduleAutoplay = useCallback(
    (origin: "focus" | "hover") => {
      clearAutoplayTimer();

      if (
        reducedMotionRef.current ||
        !isVisibleRef.current ||
        stateRef.current.playback === "playing" ||
        stateRef.current.view !== "demo"
      ) {
        return;
      }

      autoplayTimerRef.current = window.setTimeout(() => {
        autoplayTimerRef.current = null;
        const triggerIsActive =
          origin === "hover" ? hoveredRef.current : focusedRef.current;

        if (
          triggerIsActive &&
          !reducedMotionRef.current &&
          isVisibleRef.current &&
          stateRef.current.playback !== "playing" &&
          stateRef.current.view === "demo"
        ) {
          startPlayback(origin);
        }
      }, safeAutoplayDelay);
    },
    [clearAutoplayTimer, safeAutoplayDelay, startPlayback],
  );

  useEffect(() => {
    const pauseWhenAnotherPreviewStarts = (event: Event) => {
      const activePlayerId = (event as CustomEvent<{ playerId?: string }>).detail
        ?.playerId;

      if (
        activePlayerId === playerId ||
        stateRef.current.playback !== "playing"
      ) {
        return;
      }

      pausePlayback("other-preview");
    };

    window.addEventListener(ACTIVE_PREVIEW_EVENT, pauseWhenAnotherPreviewStarts);
    return () =>
      window.removeEventListener(
        ACTIVE_PREVIEW_EVENT,
        pauseWhenAnotherPreviewStarts,
      );
  }, [pausePlayback, playerId]);

  useEffect(() => {
    if (!prefersReducedMotion) return;

    clearAutoplayTimer();
    const origin = stateRef.current.playbackOrigin;
    if (origin === "hover" || origin === "focus") {
      pausePlayback("reduced-motion");
    }
  }, [clearAutoplayTimer, pausePlayback, prefersReducedMotion]);

  useEffect(() => {
    if (!isPlaying || state.view !== "demo") return;

    const timer = window.setTimeout(() => {
      dispatch({ type: "tick", frameCount });
    }, safeFrameDuration);

    return () => window.clearTimeout(timer);
  }, [frameCount, isPlaying, safeFrameDuration, state.frameIndex, state.view]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      // `isIntersecting` works for both compact cards and tall sticky stages;
      // a fixed intersection ratio can be unreachable for oversized sections.
      const nextIsVisible = Boolean(entry?.isIntersecting);
      isVisibleRef.current = nextIsVisible;
      setIsVisible(nextIsVisible);

      if (!nextIsVisible) pausePlayback("offscreen");
    });

    observer.observe(root);
    return () => observer.disconnect();
  }, [pausePlayback]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) pausePlayback("hidden");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [pausePlayback]);

  useEffect(() => clearAutoplayTimer, [clearAutoplayTimer]);

  function toggleFromStage(origin: "control" | "touch") {
    if (stateRef.current.playback === "playing") {
      pausePlayback("manual");
    } else {
      startPlayback(origin);
    }
  }

  function selectView(view: ProjectDemoView) {
    clearAutoplayTimer();
    setNotice(null);
    dispatch({ type: "set-view", view });
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    let nextView: ProjectDemoView | null = null;
    if (event.key === "ArrowLeft" || event.key === "Home") nextView = "demo";
    if (event.key === "ArrowRight" || event.key === "End") {
      nextView = "architecture";
    }
    if (!nextView) return;

    event.preventDefault();
    selectView(nextView);
    if (nextView === "demo") demoTabRef.current?.focus();
    else architectureTabRef.current?.focus();
  }

  const liveStatus = statusMessage(storyboard, state, isVisible, notice);

  return (
    <section
      aria-labelledby={titleId}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-complete={state.playback === "complete" ? "true" : "false"}
      data-motion={prefersReducedMotion ? "reduced" : "allowed"}
      data-playing={isPlaying ? "true" : "false"}
      data-project-id={storyboard.projectId}
      data-theme={storyboard.theme.label}
      data-view={state.view}
      data-visible={isVisible ? "true" : "false"}
      ref={rootRef}
      style={demoStyle}
    >
      <header className={styles.header}>
        <div className={styles.heading}>
          <p className={styles.posterLabel}>{storyboard.posterLabel}</p>
          <h4 id={titleId}>{storyboard.title}</h4>
        </div>
        <div className={styles.modeReadout} aria-label="Preview status">
          <span aria-hidden="true" />
          {isPlaying ? "Signal running" : state.view === "architecture" ? "System map" : "Interactive preview"}
        </div>
      </header>

      <div className={styles.tabs} role="tablist" aria-label="Project preview view">
        <button
          aria-controls={demoPanelId}
          aria-selected={state.view === "demo"}
          id={demoTabId}
          onClick={() => selectView("demo")}
          onKeyDown={handleTabKeyDown}
          ref={demoTabRef}
          role="tab"
          tabIndex={state.view === "demo" ? 0 : -1}
          type="button"
        >
          <span>01</span> Demo
        </button>
        <button
          aria-controls={architecturePanelId}
          aria-selected={state.view === "architecture"}
          id={architectureTabId}
          onClick={() => selectView("architecture")}
          onKeyDown={handleTabKeyDown}
          ref={architectureTabRef}
          role="tab"
          tabIndex={state.view === "architecture" ? 0 : -1}
          type="button"
        >
          <span>02</span> Architecture
        </button>
      </div>

      <PointerTilt
        className={styles.tilt}
        disabled={state.view === "architecture"}
        maxTilt={2.6}
      >
        {state.view === "demo" ? (
          <div
            aria-describedby={`${privacyId} ${statusId}`}
            aria-labelledby={demoTabId}
            className={styles.demoPanel}
            id={demoPanelId}
            role="tabpanel"
          >
            <div
              aria-label={`${storyboard.title} preview. Press Enter or Space to play or pause.`}
              aria-pressed={state.playback === "playing"}
              className={styles.stage}
              id={stageId}
              onBlur={(event) => {
                if (
                  event.relatedTarget instanceof Node &&
                  event.currentTarget.contains(event.relatedTarget)
                ) {
                  return;
                }

                focusedRef.current = false;
                clearAutoplayTimer();
                const origin = stateRef.current.playbackOrigin;
                if (
                  (origin === "focus" || origin === "hover") &&
                  !hoveredRef.current
                ) {
                  pausePlayback("focus-left");
                }
              }}
              onFocus={() => {
                focusedRef.current = true;
                scheduleAutoplay("focus");
              }}
              onKeyDown={(event) => {
                if (event.key !== "Enter" && event.key !== " ") return;
                event.preventDefault();
                toggleFromStage("control");
              }}
              onPointerEnter={(event) => {
                if (event.pointerType !== "mouse") return;
                hoveredRef.current = true;
                scheduleAutoplay("hover");
              }}
              onPointerLeave={(event) => {
                if (event.pointerType !== "mouse") return;
                hoveredRef.current = false;
                clearAutoplayTimer();
                const origin = stateRef.current.playbackOrigin;
                if (
                  (origin === "focus" || origin === "hover") &&
                  !focusedRef.current
                ) {
                  pausePlayback("pointer-left");
                }
              }}
              onPointerUp={(event) => {
                if (event.pointerType === "touch") toggleFromStage("touch");
              }}
              role="button"
              tabIndex={0}
            >
              <div className={styles.productViewport} key={currentFrame.id}>
                <MiniProductSurface data={currentFrame.demo} />
              </div>

              <aside className={styles.frameNarrative}>
                <div className={styles.frameHeading}>
                  <p className={styles.eyebrow}>{currentFrame.eyebrow}</p>
                  <p className={styles.step}>
                    {String(state.frameIndex + 1).padStart(2, "0")} /{" "}
                    {String(frameCount).padStart(2, "0")}
                  </p>
                </div>
                <h5>{currentFrame.title}</h5>
                <p className={styles.frameBody}>{currentFrame.body}</p>
                <dl className={styles.details}>
                  {currentFrame.details.map((detail) => (
                    <div className={styles.detail} key={detail.label}>
                      <dt>{detail.label}</dt>
                      <dd>{detail.value}</dd>
                    </div>
                  ))}
                </dl>
              </aside>
            </div>

            <ol className={styles.timeline} aria-label="Preview frames">
              {storyboard.frames.map((frame, index) => (
                <li
                  aria-current={index === state.frameIndex ? "step" : undefined}
                  data-active={index === state.frameIndex ? "true" : "false"}
                  data-complete={index < state.frameIndex ? "true" : "false"}
                  key={frame.id}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{frame.eyebrow}</span>
                </li>
              ))}
            </ol>

            <progress
              aria-label={`Preview position: frame ${state.frameIndex + 1} of ${frameCount}`}
              className={styles.progress}
              max={frameCount}
              value={state.frameIndex + 1}
            />
          </div>
        ) : (
          <div
            aria-labelledby={architectureTabId}
            className={styles.architecturePanel}
            id={architecturePanelId}
            role="tabpanel"
          >
            <ArchitectureLens architecture={storyboard.architecture} />
          </div>
        )}
      </PointerTilt>

      <div className={styles.controls} aria-label="Preview controls">
        <button
          aria-controls={stageId}
          disabled={state.view !== "demo" || state.frameIndex === 0}
          onClick={() => {
            setNotice(null);
            dispatch({ type: "previous", frameCount });
          }}
          type="button"
        >
          <span aria-hidden="true">←</span> Previous
        </button>
        <button
          aria-controls={stageId}
          className={styles.primaryControl}
          disabled={state.view !== "demo" || isPlaying}
          onClick={() => startPlayback("control")}
          type="button"
        >
          <span aria-hidden="true">▶</span> Play
        </button>
        <button
          aria-controls={stageId}
          disabled={state.view !== "demo" || !isPlaying}
          onClick={() => pausePlayback("manual")}
          type="button"
        >
          <span aria-hidden="true">Ⅱ</span> Pause
        </button>
        <button
          aria-controls={stageId}
          disabled={state.view !== "demo"}
          onClick={() => replay("control")}
          type="button"
        >
          <span aria-hidden="true">↻</span> Replay
        </button>
        <button
          aria-controls={stageId}
          disabled={state.view !== "demo" || state.frameIndex >= frameCount - 1}
          onClick={() => {
            setNotice(null);
            dispatch({ type: "next", frameCount });
          }}
          type="button"
        >
          Next <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className={styles.boundaries}>
        <p className={styles.statusLabel}>
          <span>Status</span>
          {storyboard.statusLabel}
        </p>
        <p className={styles.dataLabel}>
          <span>Demo data</span>
          {storyboard.dataLabel}
        </p>
        <p className={styles.privacy} id={privacyId}>
          <span>Privacy</span>
          {storyboard.privacyLabel}
        </p>
      </div>

      <footer className={styles.footer}>
        <p>{storyboard.authorshipLabel}</p>
        <div className={styles.evidenceLinks} aria-label="Project evidence">
          {storyboard.evidenceLinks.length > 0 ? (
            storyboard.evidenceLinks.map((link) => (
              <a href={link.href} key={link.href} rel="noreferrer" target="_blank">
                {link.label} <span aria-hidden="true">↗</span>
              </a>
            ))
          ) : (
            <span>Private/local evidence · no public project link</span>
          )}
        </div>
      </footer>

      {prefersReducedMotion ? (
        <p className={styles.motionNote}>
          Reduced motion is on. Hover and focus autoplay are disabled; use the
          explicit controls to inspect the static frames.
        </p>
      ) : null}
      <p
        aria-atomic="true"
        aria-live="polite"
        className={styles.liveStatus}
        id={statusId}
        role="status"
      >
        {liveStatus}
      </p>
    </section>
  );
}

export function ProjectMicroDemo({
  projectId,
  className,
  autoplayDelayMs = 700,
  frameDurationMs = 1800,
}: ProjectMicroDemoProps) {
  const storyboard = getProjectStoryboard(projectId);

  return (
    <ProjectMicroDemoPlayer
      autoplayDelayMs={autoplayDelayMs}
      className={className}
      frameDurationMs={frameDurationMs}
      key={projectId}
      storyboard={storyboard}
    />
  );
}
