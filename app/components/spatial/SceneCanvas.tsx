"use client";

import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useCallback, useEffect, useRef } from "react";
import styles from "./SceneCanvas.module.css";
import type {
  SceneController,
  SceneFactory,
  SceneFallbackReason,
  SceneQualityTier,
  SceneViewport,
} from "./types";

const DEFAULT_MAX_BUFFER_PIXELS = 2_500_000;

type NetworkInformationLike = EventTarget & {
  saveData?: boolean;
};

type NavigatorWithHints = Navigator & {
  connection?: NetworkInformationLike;
  deviceMemory?: number;
};

export type SceneCanvasProps<TConfig> = {
  className?: string;
  config: TConfig;
  createScene: SceneFactory<TConfig>;
  fallback: ReactNode;
  maxBufferPixels?: number;
  onFallback?: (reason: SceneFallbackReason) => void;
};

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

function detectQuality(): SceneQualityTier {
  const navigatorWithHints = navigator as NavigatorWithHints;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigatorWithHints.deviceMemory ?? 4;

  if (coarsePointer || cores <= 4 || memory <= 3) return "low";
  if (cores >= 8 && memory >= 6) return "high";
  return "balanced";
}

function supportsWebGL() {
  try {
    const probe = document.createElement("canvas");
    return Boolean(probe.getContext("webgl2") || probe.getContext("webgl"));
  } catch {
    return false;
  }
}

function measureViewport(
  element: HTMLElement,
  quality: SceneQualityTier,
  maxBufferPixels: number,
): SceneViewport {
  const bounds = element.getBoundingClientRect();
  const width = Math.max(1, Math.round(bounds.width));
  const height = Math.max(1, Math.round(bounds.height));
  const qualityLimit = quality === "high" ? 2 : quality === "balanced" ? 1.5 : 1;
  const requestedRatio = Math.min(window.devicePixelRatio || 1, qualityLimit);
  const areaLimitedRatio = Math.sqrt(maxBufferPixels / Math.max(1, width * height));
  const pixelRatio = Math.min(requestedRatio, areaLimitedRatio);

  return {
    width,
    height,
    pixelRatio,
    bufferWidth: Math.max(1, Math.floor(width * pixelRatio)),
    bufferHeight: Math.max(1, Math.floor(height * pixelRatio)),
  };
}

/**
 * A decorative, fill-parent canvas runtime. Three.js is imported only after the
 * layer approaches the viewport and only when browser policy allows animation.
 */
export function SceneCanvas<TConfig>({
  className,
  config,
  createScene,
  fallback,
  maxBufferPixels = DEFAULT_MAX_BUFFER_PIXELS,
  onFallback,
}: SceneCanvasProps<TConfig>) {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<SceneController<TConfig> | null>(null);
  const configRef = useRef(config);
  const fallbackCallbackRef = useRef(onFallback);

  useEffect(() => {
    configRef.current = config;
    controllerRef.current?.update(config);
  }, [config]);

  useEffect(() => {
    fallbackCallbackRef.current = onFallback;
  }, [onFallback]);

  useEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    if (!frame || !canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const navigatorWithHints = navigator as NavigatorWithHints;
    const connection = navigatorWithHints.connection;
    const quality = detectQuality();
    let alive = true;
    let nearViewport = false;
    let visible = false;
    let contextLost = false;
    let initializing = false;
    let generation = 0;
    let animationFrame = 0;
    let diagnosticFrame = 0;
    let disposalCount = 0;
    let elapsedMs = 0;
    let lastFrameMs = 0;

    const writeDiagnostics = (prefix = "") => {
      const controller = controllerRef.current;
      if (!controller) return;
      const diagnostics = controller.diagnostics();
      const key = (name: string) =>
        prefix ? `${prefix}${name[0].toUpperCase()}${name.slice(1)}` : name;
      frame.dataset[key("geometries")] = String(diagnostics.geometries);
      frame.dataset[key("textures")] = String(diagnostics.textures);
      frame.dataset[key("programs")] = String(diagnostics.programs);
      frame.dataset[key("renderCalls")] = String(diagnostics.renderCalls);
      frame.dataset[key("disposed")] = String(diagnostics.disposed);
    };

    const setState = (state: "idle" | "loading" | "active" | "fallback") => {
      frame.dataset.sceneState = state;
    };

    const setFallback = (reason: SceneFallbackReason) => {
      frame.dataset.fallbackReason = reason;
      frame.dataset.sceneActivity = "paused";
      setState("fallback");
      fallbackCallbackRef.current?.(reason);
    };

    const policyBlock = (): SceneFallbackReason | null => {
      if (reducedMotion.matches) return "reduced-motion";
      if (connection?.saveData) return "save-data";
      return null;
    };

    const stopLoop = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      lastFrameMs = 0;
    };

    const runFrame = (time: number) => {
      const controller = controllerRef.current;
      if (!controller || !visible || document.hidden || contextLost || policyBlock()) {
        stopLoop();
        return;
      }

      const deltaMs = lastFrameMs ? Math.min(50, Math.max(0, time - lastFrameMs)) : 16.67;
      lastFrameMs = time;
      elapsedMs += deltaMs;

      try {
        controller.frame({ elapsedMs, deltaMs });
        diagnosticFrame += 1;
        if (diagnosticFrame === 1) writeDiagnostics();
        animationFrame = requestAnimationFrame(runFrame);
      } catch {
        stopLoop();
        controller.pause();
        setFallback("initialization-error");
      }
    };

    const syncActivity = () => {
      const controller = controllerRef.current;
      if (!controller) return;

      const shouldRun = visible && !document.hidden && !contextLost && !policyBlock();
      if (shouldRun) {
        frame.dataset.sceneActivity = "running";
        controller.resume();
        if (!animationFrame) animationFrame = requestAnimationFrame(runFrame);
      } else {
        frame.dataset.sceneActivity = "paused";
        controller.pause();
        stopLoop();
      }
    };

    const resizeScene = () => {
      const controller = controllerRef.current;
      if (!controller) return;
      controller.resize(measureViewport(frame, quality, maxBufferPixels));
    };

    const disposeController = () => {
      generation += 1;
      stopLoop();
      const controller = controllerRef.current;
      if (controller) {
        controller.pause();
        writeDiagnostics("beforeDispose");
        controller.dispose();
        disposalCount += 1;
        frame.dataset.sceneDisposals = String(disposalCount);
        writeDiagnostics("afterDispose");
      }
      controllerRef.current = null;
      frame.dataset.sceneController = "disposed";
      canvas.width = 1;
      canvas.height = 1;
    };

    const initialize = async () => {
      const blocked = policyBlock();
      if (blocked) {
        setFallback(blocked);
        return;
      }
      if (!alive || !nearViewport || initializing || controllerRef.current || contextLost) return;
      if (!supportsWebGL()) {
        setFallback("unsupported-webgl");
        return;
      }

      initializing = true;
      const requestGeneration = generation;
      setState("loading");

      try {
        const THREE = await import("three");
        if (!alive || requestGeneration !== generation || policyBlock() || contextLost) return;

        const viewport = measureViewport(frame, quality, maxBufferPixels);
        const controller = createScene(
          { THREE, canvas, quality, viewport },
          configRef.current,
        );

        if (!alive || requestGeneration !== generation) {
          controller.dispose();
          return;
        }

        controllerRef.current = controller;
        frame.dataset.sceneController = "active";
        controller.resize(viewport);
        controller.update(configRef.current);
        delete frame.dataset.fallbackReason;
        setState("active");
        syncActivity();
      } catch {
        if (alive) setFallback("initialization-error");
      } finally {
        const requestWasSuperseded = requestGeneration !== generation;
        initializing = false;
        if (
          requestWasSuperseded &&
          alive &&
          nearViewport &&
          !controllerRef.current &&
          !contextLost &&
          !policyBlock()
        ) {
          void initialize();
        }
      }
    };

    const applyPolicy = () => {
      const blocked = policyBlock();
      if (blocked) {
        disposeController();
        setFallback(blocked);
      } else if (nearViewport) {
        void initialize();
      } else {
        setState("idle");
      }
    };

    const preloadObserver =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              nearViewport = entry.isIntersecting;
              if (nearViewport) void initialize();
            },
            { rootMargin: "320px 0px", threshold: 0 },
          )
        : null;

    const visibilityObserver =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              visible = entry.isIntersecting && entry.intersectionRatio > 0;
              syncActivity();
            },
            { threshold: [0, 0.01] },
          )
        : null;

    if (preloadObserver && visibilityObserver) {
      preloadObserver.observe(frame);
      visibilityObserver.observe(frame);
    } else {
      nearViewport = true;
      visible = true;
      void initialize();
    }

    const resizeObserver =
      "ResizeObserver" in window ? new ResizeObserver(resizeScene) : null;
    resizeObserver?.observe(frame);
    if (!resizeObserver) window.addEventListener("resize", resizeScene, { passive: true });

    const handleVisibility = () => syncActivity();
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      stopLoop();
      controllerRef.current?.pause();
      setFallback("context-lost");
    };
    const handleContextRestored = () => {
      contextLost = false;
      if (controllerRef.current) {
        resizeScene();
        delete frame.dataset.fallbackReason;
        setState("active");
        syncActivity();
      } else {
        void initialize();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    reducedMotion.addEventListener("change", applyPolicy);
    connection?.addEventListener("change", applyPolicy);
    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);
    applyPolicy();

    return () => {
      alive = false;
      preloadObserver?.disconnect();
      visibilityObserver?.disconnect();
      resizeObserver?.disconnect();
      if (!resizeObserver) window.removeEventListener("resize", resizeScene);
      document.removeEventListener("visibilitychange", handleVisibility);
      reducedMotion.removeEventListener("change", applyPolicy);
      connection?.removeEventListener("change", applyPolicy);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      disposeController();
    };
  }, [createScene, maxBufferPixels]);

  const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    controllerRef.current?.pointer({
      x: Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1)),
      y: Math.max(-1, Math.min(1, -(((event.clientY - bounds.top) / bounds.height) * 2 - 1))),
    });
  }, []);

  const handlePointerLeave = useCallback(() => {
    controllerRef.current?.pointer({ x: 0, y: 0 });
  }, []);

  return (
    <div
      aria-hidden="true"
      className={joinClassNames(styles.frame, className)}
      data-scene-state="idle"
      data-scene-activity="paused"
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      ref={frameRef}
    >
      <canvas className={styles.canvas} ref={canvasRef} tabIndex={-1} />
      <div className={styles.fallback}>{fallback}</div>
    </div>
  );
}
