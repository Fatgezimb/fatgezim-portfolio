import type * as Three from "three";

export type ThreeModule = typeof Three;

export type SceneQualityTier = "low" | "balanced" | "high";

export type SceneViewport = {
  width: number;
  height: number;
  pixelRatio: number;
  bufferWidth: number;
  bufferHeight: number;
};

export type ScenePointer = {
  x: number;
  y: number;
};

export type SceneFrame = {
  elapsedMs: number;
  deltaMs: number;
};

export type SceneDiagnostics = {
  disposed: boolean;
  geometries: number;
  textures: number;
  programs: number;
  renderCalls: number;
};

export type SceneFallbackReason =
  | "reduced-motion"
  | "save-data"
  | "unsupported-webgl"
  | "context-lost"
  | "initialization-error";

export type SceneFactoryContext = {
  THREE: ThreeModule;
  canvas: HTMLCanvasElement;
  quality: SceneQualityTier;
  viewport: SceneViewport;
};

/**
 * The React runtime owns scheduling and browser lifecycle. Scene controllers own
 * only their procedural object graph and must release every GPU resource in
 * dispose().
 */
export interface SceneController<TConfig> {
  resize(viewport: SceneViewport): void;
  frame(frame: SceneFrame): void;
  pointer(pointer: ScenePointer): void;
  update(config: TConfig): void;
  pause(): void;
  resume(): void;
  diagnostics(): SceneDiagnostics;
  dispose(): void;
}

export type SceneFactory<TConfig> = (
  context: SceneFactoryContext,
  initialConfig: TConfig,
) => SceneController<TConfig>;
