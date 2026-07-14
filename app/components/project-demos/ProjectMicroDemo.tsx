"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { PointerTilt } from "../motion";

import {
  getProjectStoryboard,
  type FeaturedProjectId,
  type ProjectStoryboard,
} from "./storyboards";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const ACTIVE_PREVIEW_EVENT = "portfolio:project-preview-start";

type PlaybackOrigin = "control" | "focus" | "hover" | "touch" | null;

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
  // Start conservatively so hydration never initiates automatic motion.
  return true;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

function readyMessage(storyboard: ProjectStoryboard) {
  return `Ready. Frame 1 of ${storyboard.frames.length}: ${storyboard.frames[0].title}.`;
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
  const autoplayTimerRef = useRef<number | null>(null);
  const frameIndexRef = useRef(0);
  const hasCompletedRef = useRef(false);
  const isPlayingRef = useRef(false);
  const isVisibleRef = useRef(true);
  const playbackOriginRef = useRef<PlaybackOrigin>(null);
  const hoveredRef = useRef(false);
  const focusedRef = useRef(false);

  const prefersReducedMotion = usePrefersReducedMotion();
  const reducedMotionRef = useRef(prefersReducedMotion);

  const [frameIndex, setFrameIndex] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [statusMessage, setStatusMessage] = useState(() =>
    readyMessage(storyboard),
  );

  const titleId = useId();
  const playerId = useId();
  const stageId = useId();
  const privacyId = useId();
  const statusId = useId();

  const frameCount = storyboard.frames.length;
  const currentFrame = storyboard.frames[frameIndex];
  const safeAutoplayDelay = Math.max(250, autoplayDelayMs);
  const safeFrameDuration = Math.max(500, frameDurationMs);

  const clearAutoplayTimer = useCallback(() => {
    if (autoplayTimerRef.current !== null) {
      window.clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  const pausePlayback = useCallback(
    (message: string) => {
      clearAutoplayTimer();

      if (!isPlayingRef.current) {
        return;
      }

      isPlayingRef.current = false;
      playbackOriginRef.current = null;
      setIsPlaying(false);
      setStatusMessage(message);
    },
    [clearAutoplayTimer],
  );

  const startPlayback = useCallback(
    (origin: Exclude<PlaybackOrigin, null>, restart = false) => {
      clearAutoplayTimer();

      if (!isVisibleRef.current) {
        setStatusMessage(
          "Preview is off screen. Bring it into view before playing.",
        );
        return;
      }

      window.dispatchEvent(
        new CustomEvent(ACTIVE_PREVIEW_EVENT, {
          detail: { playerId },
        }),
      );

      let nextFrameIndex = frameIndexRef.current;
      if (restart || hasCompletedRef.current) {
        nextFrameIndex = 0;
        frameIndexRef.current = 0;
        setFrameIndex(0);
      }

      hasCompletedRef.current = false;
      setHasCompleted(false);
      playbackOriginRef.current = origin;
      isPlayingRef.current = true;
      setIsPlaying(true);
      setStatusMessage(
        `Playing. Frame ${nextFrameIndex + 1} of ${frameCount}: ${storyboard.frames[nextFrameIndex].title}.`,
      );
    },
    [clearAutoplayTimer, frameCount, playerId, storyboard.frames],
  );

  const scheduleAutoplay = useCallback(
    (origin: "focus" | "hover") => {
      clearAutoplayTimer();

      if (
        reducedMotionRef.current ||
        !isVisibleRef.current ||
        isPlayingRef.current
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
          !isPlayingRef.current
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

      if (activePlayerId === playerId || !isPlayingRef.current) return;

      pausePlayback(
        `Paused on frame ${frameIndexRef.current + 1} because another preview started.`,
      );
    };

    window.addEventListener(ACTIVE_PREVIEW_EVENT, pauseWhenAnotherPreviewStarts);
    return () =>
      window.removeEventListener(
        ACTIVE_PREVIEW_EVENT,
        pauseWhenAnotherPreviewStarts,
      );
  }, [pausePlayback, playerId]);

  useEffect(() => {
    reducedMotionRef.current = prefersReducedMotion;

    if (!prefersReducedMotion) {
      return;
    }

    clearAutoplayTimer();
    const origin = playbackOriginRef.current;
    if (origin === "hover" || origin === "focus") {
      pausePlayback(
        `Paused on frame ${frameIndexRef.current + 1} because reduced motion is enabled.`,
      );
    }
  }, [clearAutoplayTimer, pausePlayback, prefersReducedMotion]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const timer = window.setTimeout(() => {
      const activeFrameIndex = frameIndexRef.current;

      if (activeFrameIndex < frameCount - 1) {
        const nextFrameIndex = activeFrameIndex + 1;
        frameIndexRef.current = nextFrameIndex;
        setFrameIndex(nextFrameIndex);
        setStatusMessage(
          `Playing. Frame ${nextFrameIndex + 1} of ${frameCount}: ${storyboard.frames[nextFrameIndex].title}.`,
        );
        return;
      }

      isPlayingRef.current = false;
      hasCompletedRef.current = true;
      playbackOriginRef.current = null;
      setIsPlaying(false);
      setHasCompleted(true);
      setStatusMessage(
        `Preview complete. Frame ${frameCount} of ${frameCount}: ${storyboard.frames[frameCount - 1].title}.`,
      );
    }, safeFrameDuration);

    return () => window.clearTimeout(timer);
  }, [frameCount, frameIndex, isPlaying, safeFrameDuration, storyboard.frames]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nextIsVisible = Boolean(
          entry?.isIntersecting && entry.intersectionRatio >= 0.15,
        );

        isVisibleRef.current = nextIsVisible;
        setIsVisible(nextIsVisible);

        if (!nextIsVisible) {
          clearAutoplayTimer();
          pausePlayback(
            `Paused off screen on frame ${frameIndexRef.current + 1} of ${frameCount}.`,
          );
        }
      },
      { threshold: [0, 0.15] },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [clearAutoplayTimer, frameCount, pausePlayback]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        return;
      }

      clearAutoplayTimer();
      pausePlayback(
        `Paused while the page is hidden on frame ${frameIndexRef.current + 1} of ${frameCount}.`,
      );
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [clearAutoplayTimer, frameCount, pausePlayback]);

  useEffect(() => clearAutoplayTimer, [clearAutoplayTimer]);

  const pauseFromControl = () => {
    pausePlayback(
      `Paused on frame ${frameIndexRef.current + 1} of ${frameCount}: ${storyboard.frames[frameIndexRef.current].title}.`,
    );
  };

  const toggleFromStage = () => {
    if (isPlayingRef.current) {
      pauseFromControl();
      return;
    }

    startPlayback("touch");
  };

  return (
    <section
      className={["project-demo", className].filter(Boolean).join(" ")}
      data-complete={hasCompleted ? "true" : "false"}
      data-motion={prefersReducedMotion ? "reduced" : "allowed"}
      data-playing={isPlaying ? "true" : "false"}
      data-project-id={storyboard.projectId}
      data-visible={isVisible ? "true" : "false"}
      ref={rootRef}
    >
      <header className="project-demo__header">
        <div className="project-demo__heading">
          <p className="project-demo__poster-label">{storyboard.posterLabel}</p>
          <h4 id={titleId}>{storyboard.title}</h4>
        </div>
        <span className="project-demo__mode" aria-hidden="true">
          {isPlaying ? "Playing" : "Interactive preview"}
        </span>
      </header>

      <PointerTilt className="project-demo__tilt" maxTilt={3}>
        <div
          aria-describedby={`${privacyId} ${statusId}`}
          aria-labelledby={titleId}
          className="project-demo__stage"
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

          const origin = playbackOriginRef.current;
          if (
            (origin === "focus" || origin === "hover") &&
            !hoveredRef.current &&
            !focusedRef.current
          ) {
            pausePlayback(
              `Paused on frame ${frameIndexRef.current + 1} after focus left the preview.`,
            );
          }
        }}
        onFocus={() => {
          focusedRef.current = true;
          scheduleAutoplay("focus");
        }}
        onKeyDown={(event) => {
          if (event.key !== "Enter" && event.key !== " ") {
            return;
          }

          event.preventDefault();
          if (isPlayingRef.current) {
            pauseFromControl();
          } else {
            startPlayback("control");
          }
        }}
        onPointerEnter={(event) => {
          if (event.pointerType !== "mouse") {
            return;
          }

          hoveredRef.current = true;
          scheduleAutoplay("hover");
        }}
        onPointerLeave={(event) => {
          if (event.pointerType !== "mouse") {
            return;
          }

          hoveredRef.current = false;
          clearAutoplayTimer();

          const origin = playbackOriginRef.current;
          if (
            (origin === "focus" || origin === "hover") &&
            !focusedRef.current &&
            !hoveredRef.current
          ) {
            pausePlayback(
              `Paused on frame ${frameIndexRef.current + 1} after the pointer left the preview.`,
            );
          }
        }}
        onPointerUp={(event) => {
          if (event.pointerType === "touch") {
            toggleFromStage();
          }
        }}
          role="region"
          tabIndex={0}
        >
          <div
            className="project-demo__frame"
            data-frame-state={currentFrame.state}
            key={currentFrame.id}
          >
            <div className="project-demo__frame-heading">
              <p className="project-demo__eyebrow">{currentFrame.eyebrow}</p>
              <p className="project-demo__step">
                {String(frameIndex + 1).padStart(2, "0")} /{" "}
                {String(frameCount).padStart(2, "0")}
              </p>
            </div>
            <h5>{currentFrame.title}</h5>
            <p className="project-demo__frame-body">{currentFrame.body}</p>
            <dl className="project-demo__details">
              {currentFrame.details.map((detail) => (
                <div className="project-demo__detail" key={detail.label}>
                  <dt>{detail.label}</dt>
                  <dd>{detail.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <ol className="project-demo__timeline" aria-label="Preview frames">
            {storyboard.frames.map((frame, index) => (
              <li
                aria-current={index === frameIndex ? "step" : undefined}
                className={
                  index === frameIndex
                    ? "project-demo__timeline-item project-demo__timeline-item--active"
                    : "project-demo__timeline-item"
                }
                data-complete={index < frameIndex ? "true" : "false"}
                key={frame.id}
              >
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span>{frame.eyebrow}</span>
              </li>
            ))}
          </ol>

          <progress
            aria-label={`Preview position: frame ${frameIndex + 1} of ${frameCount}`}
            className="project-demo__progress"
            max={frameCount}
            value={frameIndex + 1}
          />
        </div>
      </PointerTilt>

      <div className="project-demo__controls" aria-label="Preview controls">
        <button
          aria-controls={stageId}
          className="project-demo__control project-demo__control--play"
          disabled={isPlaying}
          onClick={() => startPlayback("control")}
          type="button"
        >
          Play
        </button>
        <button
          aria-controls={stageId}
          className="project-demo__control project-demo__control--pause"
          disabled={!isPlaying}
          onClick={pauseFromControl}
          type="button"
        >
          Pause
        </button>
        <button
          aria-controls={stageId}
          className="project-demo__control project-demo__control--replay"
          onClick={() => startPlayback("control", true)}
          type="button"
        >
          Replay
        </button>
      </div>

      <p className="project-demo__privacy" id={privacyId}>
        {storyboard.privacyLabel}
      </p>
      {prefersReducedMotion ? (
        <p className="project-demo__motion-note">
          Reduced motion is on. Use the controls to start this preview.
        </p>
      ) : null}
      <p
        aria-atomic="true"
        aria-live="polite"
        className="project-demo__status"
        id={statusId}
        role="status"
      >
        {statusMessage}
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
