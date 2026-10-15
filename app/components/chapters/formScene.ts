import * as THREE from "three";
import { createRibbonStrip, updateRibbonStrip } from "./ribbonGeometry";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export type StudyMaterial = "porcelain" | "aluminum" | "iris";
export function createFormScene(
  canvas: HTMLCanvasElement,
  onFailure: () => void,
) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: "low-power",
    preserveDrawingBuffer: true,
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
  renderer.setClearColor("#c8c9e5");
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  scene.environmentIntensity = 0.45;
  room.dispose();
  pmrem.dispose();
  const ambient = new THREE.HemisphereLight("#eff2ff", "#7b708e", 0.8);
  scene.add(ambient);
  const key = new THREE.DirectionalLight("#fff6e9", 3);
  key.position.set(-3, 8, 4);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, {
    left: -6,
    right: 6,
    top: 6,
    bottom: -6,
    near: 0.5,
    far: 25,
  });
  key.shadow.normalBias = 0.025;
  key.shadow.bias = -0.0002;
  scene.add(key);
  const fill = new THREE.DirectionalLight("#9eaaff", 0.8);
  fill.position.set(4, 3, -3);
  scene.add(fill);
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.MeshBasicMaterial({ color: "#c8c9e5", toneMapped: false }),
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);
  const groundShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.ShadowMaterial({ color: "#43395a", opacity: 0.2 }),
  );
  groundShadow.rotation.x = -Math.PI / 2;
  groundShadow.position.y = 0.002;
  groundShadow.receiveShadow = true;
  scene.add(groundShadow);
  const base = new THREE.Mesh(
    new RoundedBoxGeometry(5.55, 0.18, 3.85, 3, 0.065),
    new THREE.MeshStandardMaterial({
      color: "#e1e0ef",
      roughness: 0.38,
      metalness: 0.1,
    }),
  );
  base.position.y = 0.1;
  base.castShadow = true;
  base.receiveShadow = true;
  scene.add(base);
  const material = new THREE.MeshStandardMaterial({
    color: "#f5f2e9",
    roughness: 0.3,
    metalness: 0.08,
    side: THREE.DoubleSide,
  });
  const form = new THREE.Group();
  scene.add(form);
  const ribs: THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>[] =
    [];
  for (let i = 0; i < 40; i++) {
    const geometry = createRibbonStrip(i, 40, 0.72);
    const rib = new THREE.Mesh(geometry, material);
    rib.castShadow = true;
    rib.receiveShadow = true;
    form.add(rib);
    ribs.push(rib);
  }
  let fold = 0.72,
    orbit = 0,
    light = 35,
    disposed = false;
  function rebuild() {
    ribs.forEach((rib, i) => updateRibbonStrip(rib.geometry, i, 40, fold));
  }
  function render() {
    if (
      disposed ||
      renderer.getContext().isContextLost() ||
      canvas.clientWidth === 0 ||
      canvas.clientHeight === 0
    )
      return;
    const angle = ((34 + orbit) * Math.PI) / 180;
    const aspect = canvas.clientWidth / Math.max(canvas.clientHeight, 1);
    const distance = aspect < 1 ? 11.8 : 9.4;
    camera.aspect = aspect;
    camera.position.set(
      Math.sin(angle) * distance,
      5.4,
      Math.cos(angle) * distance,
    );
    camera.lookAt(0, 0.8, 0);
    camera.updateProjectionMatrix();
    const rad = (light * Math.PI) / 180;
    key.position.set(-Math.cos(rad) * 6, 7, Math.sin(rad) * 6);
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.render(scene, camera);
  }
  rebuild();
  const resize = new ResizeObserver(render);
  resize.observe(canvas);
  function dispose() {
    if (disposed) return;

    disposed = true;
    resize.disconnect();
    canvas.removeEventListener("webglcontextlost", failure);
    ribs.forEach((r) => r.geometry.dispose());
    material.dispose();
    floor.geometry.dispose();
    floor.material.dispose();
    groundShadow.geometry.dispose();
    groundShadow.material.dispose();
    base.geometry.dispose();
    base.material.dispose();
    environment.dispose();
    renderer.dispose();
    if (!renderer.getContext().isContextLost()) renderer.forceContextLoss();
  }
  const failure = (event: Event) => {
    event.preventDefault();
    dispose();
    onFailure();
  };
  canvas.addEventListener("webglcontextlost", failure);
  render();
  return {
    setFold(value: number) {
      fold = value / 100;
      rebuild();
      render();
    },
    setOrbit(value: number) {
      orbit = value;
      render();
    },
    setLight(value: number) {
      light = value;
      render();
    },
    setMaterial(value: StudyMaterial) {
      const config = {
        porcelain: { color: "#f5f2e9", roughness: 0.3, metalness: 0.08 },
        aluminum: { color: "#dce1f2", roughness: 0.2, metalness: 0.95 },
        iris: { color: "#7661b1", roughness: 0.26, metalness: 0.38 },
      }[value];
      material.color.set(config.color);
      material.roughness = config.roughness;
      material.metalness = config.metalness;
      render();
    },
    dispose,
  };
}
