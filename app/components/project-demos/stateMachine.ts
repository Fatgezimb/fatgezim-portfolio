export type ProjectDemoPlayback = "idle" | "playing" | "paused" | "complete";

export type ProjectDemoPlaybackOrigin =
  | "control"
  | "focus"
  | "hover"
  | "touch"
  | null;

export type ProjectDemoPauseReason =
  | "architecture"
  | "focus-left"
  | "hidden"
  | "manual"
  | "offscreen"
  | "other-preview"
  | "pointer-left"
  | "reduced-motion"
  | null;

export type ProjectDemoView = "demo" | "architecture";

export type ProjectDemoState = {
  frameIndex: number;
  pauseReason: ProjectDemoPauseReason;
  playback: ProjectDemoPlayback;
  playbackOrigin: ProjectDemoPlaybackOrigin;
  view: ProjectDemoView;
};

export type ProjectDemoAction =
  | {
      type: "play";
      frameCount: number;
      origin: Exclude<ProjectDemoPlaybackOrigin, null>;
      restart?: boolean;
    }
  | { type: "pause"; reason: Exclude<ProjectDemoPauseReason, null> }
  | {
      type: "replay";
      frameCount: number;
      origin: Exclude<ProjectDemoPlaybackOrigin, null>;
    }
  | { type: "previous"; frameCount: number }
  | { type: "next"; frameCount: number }
  | { type: "tick"; frameCount: number }
  | { type: "set-view"; view: ProjectDemoView };

export function createProjectDemoState(): ProjectDemoState {
  return {
    frameIndex: 0,
    pauseReason: null,
    playback: "idle",
    playbackOrigin: null,
    view: "demo",
  };
}

function lastFrameIndex(frameCount: number) {
  return Math.max(0, frameCount - 1);
}

function boundedFrame(frameIndex: number, frameCount: number) {
  return Math.min(lastFrameIndex(frameCount), Math.max(0, frameIndex));
}

/**
 * A deterministic state machine shared by timed playback and every manual
 * control. Keeping the transitions pure makes touch, keyboard, autoplay, and
 * reduced-motion behavior follow the same rules.
 */
export function projectDemoReducer(
  state: ProjectDemoState,
  action: ProjectDemoAction,
): ProjectDemoState {
  switch (action.type) {
    case "play": {
      const shouldRestart =
        action.restart === true || state.playback === "complete";

      return {
        frameIndex: shouldRestart
          ? 0
          : boundedFrame(state.frameIndex, action.frameCount),
        pauseReason: null,
        playback: "playing",
        playbackOrigin: action.origin,
        view: "demo",
      };
    }

    case "pause":
      if (state.playback !== "playing") return state;

      return {
        ...state,
        pauseReason: action.reason,
        playback: "paused",
        playbackOrigin: null,
      };

    case "replay":
      return {
        frameIndex: 0,
        pauseReason: null,
        playback: "playing",
        playbackOrigin: action.origin,
        view: "demo",
      };

    case "previous":
      return {
        ...state,
        frameIndex: boundedFrame(state.frameIndex - 1, action.frameCount),
        pauseReason: "manual",
        playback: "paused",
        playbackOrigin: null,
        view: "demo",
      };

    case "next":
      return {
        ...state,
        frameIndex: boundedFrame(state.frameIndex + 1, action.frameCount),
        pauseReason: "manual",
        playback: "paused",
        playbackOrigin: null,
        view: "demo",
      };

    case "tick": {
      if (state.playback !== "playing") return state;

      const finalIndex = lastFrameIndex(action.frameCount);
      if (state.frameIndex >= finalIndex) {
        return {
          ...state,
          frameIndex: finalIndex,
          pauseReason: null,
          playback: "complete",
          playbackOrigin: null,
        };
      }

      return {
        ...state,
        frameIndex: state.frameIndex + 1,
      };
    }

    case "set-view":
      return {
        ...state,
        pauseReason:
          action.view === "architecture" && state.playback === "playing"
            ? "architecture"
            : state.pauseReason,
        playback:
          action.view === "architecture" && state.playback === "playing"
            ? "paused"
            : state.playback,
        playbackOrigin:
          action.view === "architecture" ? null : state.playbackOrigin,
        view: action.view,
      };
  }
}
