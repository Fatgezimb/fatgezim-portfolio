import type { Color } from "three";
import { disposeThreeScene } from "./disposeThreeScene";
import type { SceneFactory, SceneViewport } from "./types";

export type ProjectDataCoreTheme = {
  accent: string;
  secondary: string;
  core: string;
};

export type ProjectDataSceneConfig = {
  projectId: string;
  theme: ProjectDataCoreTheme;
};

export const projectDataCoreThemes = {
  "bela-behavior-data-lab": {
    accent: "#75e4d3",
    secondary: "#74c7f5",
    core: "#f6c878",
  },
  "caregiver-academy": {
    accent: "#a58afa",
    secondary: "#75e4d3",
    core: "#f6c878",
  },
  "rbt-practice-hub": {
    accent: "#74c7f5",
    secondary: "#75e4d3",
    core: "#a5f3e7",
  },
  stepspark: {
    accent: "#f6c878",
    secondary: "#a58afa",
    core: "#f1f5f4",
  },
  "rethink-automations": {
    accent: "#75e4d3",
    secondary: "#f6c878",
    core: "#74c7f5",
  },
  "neuropath-insight": {
    accent: "#a58afa",
    secondary: "#74c7f5",
    core: "#75e4d3",
  },
} as const satisfies Record<string, ProjectDataCoreTheme>;

export const defaultProjectDataCoreTheme: ProjectDataCoreTheme = {
  accent: "#75e4d3",
  secondary: "#74c7f5",
  core: "#f6c878",
};

function stringHash(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seeded(seed: number) {
  let value = seed + 0x6d2b79f5;
  value = Math.imul(value ^ (value >>> 15), value | 1);
  value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
  return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
}

function safeHexColor(value: string, fallback: string) {
  return /^#[\da-f]{6}$/i.test(value) ? value : fallback;
}

function applyViewport(
  renderer: import("three").WebGLRenderer,
  camera: import("three").PerspectiveCamera,
  viewport: SceneViewport,
) {
  renderer.setPixelRatio(viewport.pixelRatio);
  renderer.setSize(viewport.width, viewport.height, false);
  camera.aspect = viewport.width / viewport.height;
  camera.updateProjectionMatrix();
}

function writeTargetShape(target: Float32Array, projectId: string) {
  const seed = stringHash(projectId || "project");
  const mode = seed % 4;
  const count = target.length / 3;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let index = 0; index < count; index += 1) {
    const progress = count <= 1 ? 0 : index / (count - 1);
    const jitter = (seeded(seed + index * 19) - 0.5) * 0.16;
    let x = 0;
    let y = 0;
    let z = 0;

    if (mode === 0) {
      const sphereY = 1 - progress * 2;
      const radius = Math.sqrt(Math.max(0, 1 - sphereY * sphereY));
      const angle = goldenAngle * index;
      x = Math.cos(angle) * radius * 2.15;
      y = sphereY * 2.15;
      z = Math.sin(angle) * radius * 2.15;
    } else if (mode === 1) {
      const angle = progress * Math.PI * 10;
      const orbit = 1.65 + Math.sin(angle * 3) * 0.32;
      x = Math.cos(angle) * orbit;
      y = (progress - 0.5) * 3.8;
      z = Math.sin(angle) * orbit;
    } else if (mode === 2) {
      const angle = progress * Math.PI * 18;
      const minorAngle = progress * Math.PI * 64;
      const radius = 1.65 + Math.cos(minorAngle) * 0.43;
      x = Math.cos(angle) * radius;
      y = Math.sin(minorAngle) * 0.43;
      z = Math.sin(angle) * radius;
    } else {
      const band = index % 3;
      const angle = progress * Math.PI * 14 + band * 2.1;
      const radius = 1.2 + band * 0.52;
      x = Math.cos(angle) * radius;
      y = Math.sin(angle * (band + 1)) * (0.45 + band * 0.28);
      z = Math.sin(angle) * radius;
    }

    target[index * 3] = x + jitter;
    target[index * 3 + 1] = y + jitter * 0.65;
    target[index * 3 + 2] = z - jitter;
  }
}

export const createProjectDataScene: SceneFactory<ProjectDataSceneConfig> = (
  { THREE, canvas, quality, viewport },
  initialConfig,
) => {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: quality !== "low",
    canvas,
    powerPreference: "high-performance",
    premultipliedAlpha: true,
  });
  renderer.setClearColor(0x050b11, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.04;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 40);
  camera.position.set(0, 0, 7.4);

  const coreGroup = new THREE.Group();
  coreGroup.rotation.x = -0.14;
  scene.add(coreGroup);

  const pointCount = quality === "low" ? 160 : quality === "balanced" ? 300 : 480;
  const positions = new Float32Array(pointCount * 3);
  const targets = new Float32Array(pointCount * 3);
  writeTargetShape(targets, initialConfig.projectId);
  for (let index = 0; index < positions.length; index += 1) {
    positions[index] = targets[index] * 0.04;
  }

  const pointGeometry = new THREE.BufferGeometry();
  const pointAttribute = new THREE.BufferAttribute(positions, 3);
  pointAttribute.setUsage(THREE.DynamicDrawUsage);
  pointGeometry.setAttribute("position", pointAttribute);
  const pointMaterial = new THREE.PointsMaterial({
    color: safeHexColor(initialConfig.theme.accent, defaultProjectDataCoreTheme.accent),
    size: quality === "low" ? 0.055 : 0.042,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.78,
  });
  coreGroup.add(new THREE.Points(pointGeometry, pointMaterial));

  const lineCount = quality === "low" ? 38 : quality === "balanced" ? 68 : 96;
  const linePositions = new Float32Array(lineCount * 6);
  const lineGeometry = new THREE.BufferGeometry();
  const lineAttribute = new THREE.BufferAttribute(linePositions, 3);
  lineAttribute.setUsage(THREE.DynamicDrawUsage);
  lineGeometry.setAttribute("position", lineAttribute);
  const lineMaterial = new THREE.LineBasicMaterial({
    color: safeHexColor(initialConfig.theme.secondary, defaultProjectDataCoreTheme.secondary),
    transparent: true,
    opacity: 0.16,
  });
  coreGroup.add(new THREE.LineSegments(lineGeometry, lineMaterial));

  const shellGeometry = new THREE.IcosahedronGeometry(1.05, quality === "low" ? 1 : 2);
  const shellMaterial = new THREE.MeshBasicMaterial({
    color: safeHexColor(initialConfig.theme.secondary, defaultProjectDataCoreTheme.secondary),
    transparent: true,
    opacity: 0.17,
    wireframe: true,
  });
  const shell = new THREE.Mesh(shellGeometry, shellMaterial);
  coreGroup.add(shell);

  const centerGeometry = new THREE.IcosahedronGeometry(0.22, 1);
  const centerMaterial = new THREE.MeshBasicMaterial({
    color: safeHexColor(initialConfig.theme.core, defaultProjectDataCoreTheme.core),
    transparent: true,
    opacity: 0.92,
  });
  const center = new THREE.Mesh(centerGeometry, centerMaterial);
  coreGroup.add(center);

  const orbitGeometry = new THREE.TorusGeometry(2.25, 0.008, 3, quality === "low" ? 64 : 112);
  const orbitMaterial = new THREE.MeshBasicMaterial({
    color: safeHexColor(initialConfig.theme.accent, defaultProjectDataCoreTheme.accent),
    transparent: true,
    opacity: 0.15,
  });
  const orbitGroup = new THREE.Group();
  for (let index = 0; index < 3; index += 1) {
    const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbit.rotation.set(index * 0.72 + 0.25, index * 1.03, index * 0.42);
    orbit.scale.setScalar(0.82 + index * 0.18);
    orbitGroup.add(orbit);
  }
  coreGroup.add(orbitGroup);

  let paused = true;
  let disposed = false;
  let currentProjectId = initialConfig.projectId;
  const pointerTarget = new THREE.Vector2();
  const pointerCurrent = new THREE.Vector2();
  const accentTarget = new THREE.Color(
    safeHexColor(initialConfig.theme.accent, defaultProjectDataCoreTheme.accent),
  );
  const secondaryTarget = new THREE.Color(
    safeHexColor(initialConfig.theme.secondary, defaultProjectDataCoreTheme.secondary),
  );
  const coreTarget = new THREE.Color(
    safeHexColor(initialConfig.theme.core, defaultProjectDataCoreTheme.core),
  );

  const updateLinePositions = () => {
    for (let lineIndex = 0; lineIndex < lineCount; lineIndex += 1) {
      const fromIndex = (lineIndex * 7) % pointCount;
      const toIndex = (fromIndex + 5 + (lineIndex % 13)) % pointCount;
      linePositions.set(
        [
          positions[fromIndex * 3],
          positions[fromIndex * 3 + 1],
          positions[fromIndex * 3 + 2],
          positions[toIndex * 3],
          positions[toIndex * 3 + 1],
          positions[toIndex * 3 + 2],
        ],
        lineIndex * 6,
      );
    }
    lineAttribute.needsUpdate = true;
  };

  const updateThemeTargets = (theme: ProjectDataCoreTheme) => {
    accentTarget.set(safeHexColor(theme.accent, defaultProjectDataCoreTheme.accent));
    secondaryTarget.set(safeHexColor(theme.secondary, defaultProjectDataCoreTheme.secondary));
    coreTarget.set(safeHexColor(theme.core, defaultProjectDataCoreTheme.core));
  };

  const lerpTheme = (material: { color: Color }, target: Color, amount: number) =>
    material.color.lerp(target, amount);

  applyViewport(renderer, camera, viewport);
  updateLinePositions();

  return {
    resize(nextViewport) {
      if (!disposed) applyViewport(renderer, camera, nextViewport);
    },
    frame({ elapsedMs, deltaMs }) {
      if (paused || disposed) return;
      const seconds = elapsedMs / 1000;
      const response = 1 - Math.exp(-Math.min(deltaMs, 50) * 0.006);
      const morphResponse = 1 - Math.exp(-Math.min(deltaMs, 50) * 0.0027);

      for (let index = 0; index < positions.length; index += 1) {
        positions[index] += (targets[index] - positions[index]) * morphResponse;
      }
      pointAttribute.needsUpdate = true;
      updateLinePositions();

      pointerCurrent.lerp(pointerTarget, response);
      coreGroup.rotation.y = seconds * 0.075 + pointerCurrent.x * 0.08;
      coreGroup.rotation.x = -0.14 + Math.sin(seconds * 0.18) * 0.04 - pointerCurrent.y * 0.055;
      shell.rotation.x = seconds * -0.13;
      shell.rotation.z = seconds * 0.09;
      center.rotation.y = seconds * 0.48;
      center.rotation.x = seconds * 0.26;
      const pulse = 1 + Math.sin(seconds * 1.55) * 0.08;
      center.scale.setScalar(pulse);
      orbitGroup.rotation.z = seconds * -0.035;
      orbitGroup.rotation.y = seconds * 0.026;

      lerpTheme(pointMaterial, accentTarget, response);
      lerpTheme(orbitMaterial, accentTarget, response);
      lerpTheme(lineMaterial, secondaryTarget, response);
      lerpTheme(shellMaterial, secondaryTarget, response);
      lerpTheme(centerMaterial, coreTarget, response);
      renderer.render(scene, camera);
    },
    pointer(pointer) {
      pointerTarget.set(pointer.x, pointer.y);
    },
    update(config) {
      if (config.projectId !== currentProjectId) {
        currentProjectId = config.projectId;
        writeTargetShape(targets, currentProjectId);
      }
      updateThemeTargets(config.theme);
    },
    pause() {
      paused = true;
    },
    resume() {
      paused = false;
    },
    diagnostics() {
      return {
        disposed,
        geometries: renderer.info.memory.geometries,
        textures: renderer.info.memory.textures,
        programs: renderer.info.programs?.length ?? 0,
        renderCalls: renderer.info.render.calls,
      };
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      paused = true;
      disposeThreeScene(scene, renderer);
    },
  };
};
