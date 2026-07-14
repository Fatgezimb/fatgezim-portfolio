import type { Color, Group, MeshBasicMaterial, Vector3 } from "three";
import { disposeThreeScene } from "./disposeThreeScene";
import type { SceneFactory, SceneViewport } from "./types";

export const neuralDomains = [
  {
    id: "neuroscience",
    label: "Neuroscience",
    description: "Neuroscience and computational research",
    color: "#74c7f5",
    position: [-2.8, 1.25, -0.3],
  },
  {
    id: "medicine",
    label: "Medicine",
    description: "Clinical and medical learning",
    color: "#f6c878",
    position: [2.65, 1.45, -0.55],
  },
  {
    id: "behavior",
    label: "Behavioral science",
    description: "Behavioral science and applied behavior analysis",
    color: "#75e4d3",
    position: [3.05, -0.75, 0.1],
  },
  {
    id: "data",
    label: "Data",
    description: "Data science and data engineering",
    color: "#a58afa",
    position: [-2.7, -1.35, 0.25],
  },
  {
    id: "software",
    label: "Software",
    description: "Software systems and automation",
    color: "#74c7f5",
    position: [0.6, -2.05, -0.7],
  },
  {
    id: "founder-product",
    label: "Founder / product",
    description: "Founder leadership and product systems",
    color: "#f6c878",
    position: [-0.2, 2.05, 0.35],
  },
] as const;

export type NeuralDomainId = (typeof neuralDomains)[number]["id"];

export type NeuralSceneConfig = {
  activeDomain: NeuralDomainId | null;
};

type NodeRuntime = {
  id: NeuralDomainId;
  group: Group;
  wireMaterial: MeshBasicMaterial;
  coreMaterial: MeshBasicMaterial;
  baseColor: Color;
};

type SignalRuntime = {
  from: Vector3;
  to: Vector3;
  offset: number;
  speed: number;
};

const edges = [
  [0, 5],
  [5, 1],
  [1, 2],
  [2, 4],
  [4, 3],
  [3, 0],
  [0, 2],
  [3, 5],
  [5, 4],
] as const;

function seeded(index: number) {
  const value = Math.sin(index * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
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

export const createNeuralScene: SceneFactory<NeuralSceneConfig> = (
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
  renderer.toneMappingExposure = 1.08;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050b11, 0.058);

  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 60);
  camera.position.set(0, 0, 8.4);

  const field = new THREE.Group();
  field.rotation.x = -0.08;
  scene.add(field);

  const nodeGeometry = new THREE.IcosahedronGeometry(0.31, quality === "low" ? 0 : 1);
  const coreGeometry = new THREE.IcosahedronGeometry(0.105, 1);
  const nodeRuntimes: NodeRuntime[] = [];

  neuralDomains.forEach((domain) => {
    const group = new THREE.Group();
    group.position.set(domain.position[0], domain.position[1], domain.position[2]);

    const baseColor = new THREE.Color(domain.color);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: baseColor,
      transparent: true,
      opacity: 0.72,
      wireframe: true,
    });
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: baseColor,
      transparent: true,
      opacity: 0.86,
    });

    group.add(new THREE.Mesh(nodeGeometry, wireMaterial));
    group.add(new THREE.Mesh(coreGeometry, coreMaterial));
    field.add(group);
    nodeRuntimes.push({
      id: domain.id,
      group,
      wireMaterial,
      coreMaterial,
      baseColor,
    });
  });

  const linePositions = new Float32Array(edges.length * 6);
  edges.forEach(([fromIndex, toIndex], index) => {
    const from = neuralDomains[fromIndex].position;
    const to = neuralDomains[toIndex].position;
    linePositions.set([...from, ...to], index * 6);
  });
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x75e4d3,
    transparent: true,
    opacity: 0.22,
  });
  field.add(new THREE.LineSegments(lineGeometry, lineMaterial));

  const signalsPerEdge = quality === "low" ? 1 : quality === "balanced" ? 2 : 3;
  const signalPositions = new Float32Array(edges.length * signalsPerEdge * 3);
  const signalGeometry = new THREE.BufferGeometry();
  const signalAttribute = new THREE.BufferAttribute(signalPositions, 3);
  signalGeometry.setAttribute("position", signalAttribute);
  const signalMaterial = new THREE.PointsMaterial({
    color: 0xa5f3e7,
    size: quality === "low" ? 0.07 : 0.052,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.9,
  });
  const signalRuntimes: SignalRuntime[] = [];
  edges.forEach(([fromIndex, toIndex], edgeIndex) => {
    const from = new THREE.Vector3(...neuralDomains[fromIndex].position);
    const to = new THREE.Vector3(...neuralDomains[toIndex].position);
    for (let signalIndex = 0; signalIndex < signalsPerEdge; signalIndex += 1) {
      signalRuntimes.push({
        from,
        to,
        offset: signalIndex / signalsPerEdge + seeded(edgeIndex + signalIndex * 17),
        speed: 0.055 + seeded(edgeIndex * 5 + signalIndex) * 0.035,
      });
    }
  });
  field.add(new THREE.Points(signalGeometry, signalMaterial));

  const starCount = quality === "low" ? 90 : quality === "balanced" ? 180 : 320;
  const starPositions = new Float32Array(starCount * 3);
  for (let index = 0; index < starCount; index += 1) {
    const radius = 4.8 + seeded(index * 3) * 7.2;
    const angle = seeded(index * 3 + 1) * Math.PI * 2;
    const elevation = (seeded(index * 3 + 2) - 0.5) * 7;
    starPositions[index * 3] = Math.cos(angle) * radius;
    starPositions[index * 3 + 1] = elevation;
    starPositions[index * 3 + 2] = Math.sin(angle) * radius - 3;
  }
  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
  const starMaterial = new THREE.PointsMaterial({
    color: 0x74c7f5,
    size: 0.022,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.42,
  });
  scene.add(new THREE.Points(starGeometry, starMaterial));

  const ringGroup = new THREE.Group();
  const ringGeometry = new THREE.TorusGeometry(2.35, 0.006, 3, quality === "low" ? 72 : 120);
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0x75e4d3,
    transparent: true,
    opacity: 0.12,
  });
  for (let index = 0; index < 3; index += 1) {
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.set(index * 0.75, index * 0.95, index * 0.34);
    ring.scale.setScalar(1 + index * 0.28);
    ringGroup.add(ring);
  }
  field.add(ringGroup);

  let activeDomain = initialConfig.activeDomain;
  let paused = true;
  let disposed = false;
  const pointerTarget = new THREE.Vector2();
  const pointerCurrent = new THREE.Vector2();
  const lookTarget = new THREE.Vector3();
  const neutralColor = new THREE.Color(0x31515c);

  const updateSignals = (elapsedSeconds: number) => {
    signalRuntimes.forEach((signal, index) => {
      const progress = (signal.offset + elapsedSeconds * signal.speed) % 1;
      const eased = progress * progress * (3 - 2 * progress);
      signalPositions[index * 3] = signal.from.x + (signal.to.x - signal.from.x) * eased;
      signalPositions[index * 3 + 1] = signal.from.y + (signal.to.y - signal.from.y) * eased;
      signalPositions[index * 3 + 2] = signal.from.z + (signal.to.z - signal.from.z) * eased;
    });
    signalAttribute.needsUpdate = true;
  };

  applyViewport(renderer, camera, viewport);

  return {
    resize(nextViewport) {
      if (!disposed) applyViewport(renderer, camera, nextViewport);
    },
    frame({ elapsedMs, deltaMs }) {
      if (paused || disposed) return;
      const elapsedSeconds = elapsedMs / 1000;
      const response = 1 - Math.exp(-Math.min(deltaMs, 50) * 0.0065);

      pointerCurrent.lerp(pointerTarget, response);
      camera.position.x += (pointerCurrent.x * 0.38 - camera.position.x) * response;
      camera.position.y += (pointerCurrent.y * 0.26 - camera.position.y) * response;
      camera.position.z = 8.4;
      lookTarget.set(pointerCurrent.x * 0.12, pointerCurrent.y * 0.08, 0);
      camera.lookAt(lookTarget);

      field.rotation.y = Math.sin(elapsedSeconds * 0.09) * 0.1 + pointerCurrent.x * 0.045;
      field.rotation.x = -0.08 + Math.cos(elapsedSeconds * 0.075) * 0.025 - pointerCurrent.y * 0.035;
      ringGroup.rotation.y = elapsedSeconds * 0.025;
      ringGroup.rotation.z = elapsedSeconds * -0.018;

      nodeRuntimes.forEach((node, index) => {
        const selected = activeDomain === null || node.id === activeDomain;
        const targetScale = node.id === activeDomain ? 1.34 : selected ? 1 : 0.8;
        node.group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), response);
        node.group.rotation.y = elapsedSeconds * (0.12 + index * 0.012);
        node.group.rotation.x = Math.sin(elapsedSeconds * 0.32 + index) * 0.12;
        node.wireMaterial.opacity += ((selected ? 0.82 : 0.18) - node.wireMaterial.opacity) * response;
        node.coreMaterial.opacity += ((selected ? 0.94 : 0.2) - node.coreMaterial.opacity) * response;
        node.wireMaterial.color.lerp(selected ? node.baseColor : neutralColor, response);
        node.coreMaterial.color.lerp(selected ? node.baseColor : neutralColor, response);
      });

      updateSignals(elapsedSeconds);
      renderer.render(scene, camera);
    },
    pointer(pointer) {
      pointerTarget.set(pointer.x, pointer.y);
    },
    update(config) {
      activeDomain = config.activeDomain;
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
