import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import type { DomainId } from "@/app/content/workspace";

type Options = {
  canvas: HTMLCanvasElement;
  onSelect: (id: DomainId) => void;
  onLabels: (points: { id: DomainId; x: number; y: number }[]) => void;
  onFailure: () => void;
  onReady: () => void;
  reduced: boolean;
};
const positions: Record<DomainId, [number, number, number]> = {
  neuroscience: [-3.75, 0, -0.95],
  software: [-0.1, 0, -1.7],
  data: [3.65, 0, -0.7],
  medicine: [-2.5, 0, 2],
  design: [2.2, 0, 1.95],
};
const domainOrder = Object.keys(positions) as DomainId[];

export function createWorkspaceScene(options: Options) {
  const { canvas } = options;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-8, 8, 5, -5, 0.1, 80);
  const look = new THREE.Vector3(0, 0.9, 0);
  const targetLook = look.clone();
  const cameraOffset = new THREE.Vector3(11, 12, 15);
  camera.position.copy(look).add(cameraOffset);
  camera.lookAt(look);
  const ambient = new THREE.HemisphereLight(0xf9f3ff, 0x838ba8, 2.8);
  scene.add(ambient);
  const sun = new THREE.DirectionalLight(0xfff6e9, 4.2);
  sun.position.set(-6, 12, 5);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, {
    left: -11,
    right: 11,
    top: 10,
    bottom: -10,
    near: 0.5,
    far: 35,
  });
  sun.shadow.normalBias = 0.035;
  sun.shadow.bias = -0.0002;
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0xbfc7ff, 2);
  fill.position.set(8, 5, -6);
  scene.add(fill);
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  const geometries = new Set<THREE.BufferGeometry>();
  const mat = (color: string, roughness = 0.55, metalness = 0) => {
    const m = new THREE.MeshStandardMaterial({ color, roughness, metalness });
    materials.add(m);
    return m;
  };
  const ink = mat("#38364f"),
    paper = mat("#f8f7ed"),
    lilac = mat("#afa3d9"),
    mint = mat("#91cbb7"),
    brass = mat("#c9a15a", 0.32, 0.5),
    coral = mat("#db8f7d"),
    steel = mat("#dce1ee", 0.27, 0.58);
  function mesh(
    geometry: THREE.BufferGeometry,
    material: THREE.Material,
    parent: THREE.Object3D,
    at: [number, number, number] = [0, 0, 0],
  ) {
    geometries.add(geometry);
    const m = new THREE.Mesh(geometry, material);
    m.position.set(...at);
    m.castShadow = true;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  }
  function box(
    parent: THREE.Object3D,
    size: [number, number, number],
    at: [number, number, number],
    material: THREE.Material,
    radius = 0.06,
  ) {
    return mesh(
      new RoundedBoxGeometry(
        ...size,
        2,
        Math.min(radius, ...size.map((v) => v / 3)),
      ),
      material,
      parent,
      at,
    );
  }
  function tube(
    parent: THREE.Object3D,
    points: [number, number, number][],
    radius: number,
    material: THREE.Material,
  ) {
    return mesh(
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p))),
        18,
        radius,
        5,
        false,
      ),
      material,
      parent,
    );
  }
  function labelTexture(
    draw: (ctx: CanvasRenderingContext2D) => void,
    width = 512,
    height = 320,
  ) {
    const surface = document.createElement("canvas");
    surface.width = width;
    surface.height = height;
    const ctx = surface.getContext("2d")!;
    draw(ctx);
    const texture = new THREE.CanvasTexture(surface);
    texture.colorSpace = THREE.SRGBColorSpace;
    textures.add(texture);
    return texture;
  }
  function screen(
    parent: THREE.Object3D,
    w: number,
    h: number,
    at: [number, number, number],
    texture: THREE.Texture,
  ) {
    const material = new THREE.MeshBasicMaterial({ map: texture });
    materials.add(material);
    return mesh(new THREE.PlaneGeometry(w, h), material, parent, at);
  }
  const table = new THREE.Group();
  scene.add(table);
  const tabletop = mat("#ddd9ec", 0.7);
  box(table, [12.8, 0.38, 7.7], [0, -0.32, 0], tabletop, 0.18);
  box(table, [12.4, 0.12, 7.3], [0, -0.57, 0], ink, 0.06);
  // The pedestal makes the whole workspace a deliberately authored object.
  box(table, [9.5, 0.25, 4.5], [0, -0.76, 0], mat("#c5c2d8"), 0.12);
  const floorMat = new THREE.ShadowMaterial({ opacity: 0.14 });
  materials.add(floorMat);
  const floor = mesh(
    new THREE.PlaneGeometry(100, 100),
    floorMat,
    scene,
    [0, -0.91, 0],
  );
  floor.rotation.x = -Math.PI / 2;
  floor.castShadow = false;
  const deskMat = box(
    table,
    [5.1, 0.025, 3.1],
    [0.15, -0.105, -1.25],
    mat("#c8c9dd"),
    0.22,
  );
  deskMat.rotation.y = 0.03;
  const objects = new Map<DomainId, THREE.Group>();
  domainOrder.forEach((id) => {
    const group = new THREE.Group();
    group.position.set(...positions[id]);
    group.userData.domain = id;
    objects.set(id, group);
    scene.add(group);
  });

  const neuron = objects.get("neuroscience")!;
  mesh(
    new THREE.CylinderGeometry(1.15, 1.2, 0.18, 48),
    ink,
    neuron,
    [0, 0.02, 0],
  );
  mesh(
    new THREE.CylinderGeometry(1.04, 1.04, 0.045, 48),
    brass,
    neuron,
    [0, 0.13, 0],
  );
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: "#d5f2ed",
    transparent: true,
    opacity: 0.13,
    roughness: 0.15,
    metalness: 0.08,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  materials.add(glassMat);
  mesh(
    new THREE.CylinderGeometry(0.98, 0.98, 2.4, 48, 1, true),
    glassMat,
    neuron,
    [0, 1.36, 0],
  );
  mesh(
    new THREE.SphereGeometry(0.98, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2),
    glassMat,
    neuron,
    [0, 2.56, 0],
  );
  const neuralCore = new THREE.Group();
  neuron.add(neuralCore);
  mesh(new THREE.IcosahedronGeometry(0.27, 2), mint, neuralCore, [0, 1.55, 0]);
  tube(
    neuralCore,
    [
      [0, 0.18, 0],
      [0.12, 0.7, -0.06],
      [0, 1.55, 0],
    ],
    0.045,
    brass,
  );
  for (let i = 0; i < 7; i++) {
    const angle = (i / 7) * Math.PI * 2;
    const endpoint: [number, number, number] = [
      Math.cos(angle) * 0.62,
      1.65 + Math.sin(i * 2) * 0.62,
      Math.sin(angle) * 0.62,
    ];
    tube(
      neuralCore,
      [[0, 1.55, 0], [endpoint[0] * 0.4, 1.8, endpoint[2] * 0.4], endpoint],
      0.022,
      mint,
    );
    for (let k = 0; k < 3; k++) {
      const a = angle + (k - 1) * 0.45;
      const tip: [number, number, number] = [
        Math.cos(a) * 0.84,
        endpoint[1] + 0.18 + (k % 2) * 0.25,
        Math.sin(a) * 0.84,
      ];
      tube(
        neuralCore,
        [
          endpoint,
          [endpoint[0] * 1.1, endpoint[1] + 0.13, endpoint[2] * 1.1],
          tip,
        ],
        0.009,
        brass,
      );
      mesh(new THREE.SphereGeometry(0.035, 8, 6), mint, neuralCore, tip);
    }
  }

  // These branches share one transform. Batch each material into one draw call.
  for (const material of [mint, brass]) {
    const parts = neuralCore.children.filter(
      (child): child is THREE.Mesh =>
        child instanceof THREE.Mesh && child.material === material,
    );
    const transformed = parts.map((part) => {
      part.updateMatrix();
      const cloned = part.geometry.clone();
      const geometry = cloned.index ? cloned.toNonIndexed() : cloned;
      if (geometry !== cloned) cloned.dispose();
      return geometry.applyMatrix4(part.matrix);
    });
    const merged = mergeGeometries(transformed, false);
    transformed.forEach((geometry) => geometry.dispose());
    if (merged) {
      parts.forEach((part) => {
        neuralCore.remove(part);
        geometries.delete(part.geometry);
        part.geometry.dispose();
      });
      mesh(merged, material, neuralCore);
    }
  }

  const software = objects.get("software")!;
  box(software, [1.35, 0.1, 0.8], [0, 0.05, 0.1], steel, 0.1);
  box(software, [0.23, 0.65, 0.23], [0, 0.42, -0.06], steel);
  const monitor = box(software, [2.85, 1.85, 0.18], [0, 1.52, 0], ink, 0.12);
  monitor.rotation.x = -0.08;
  const monitorArt = labelTexture((ctx) => {
    ctx.fillStyle = "#242b3f";
    ctx.fillRect(0, 0, 512, 320);
    ctx.fillStyle = "#424963";
    ctx.fillRect(0, 0, 512, 30);
    ["#e99d8c", "#dfba70", "#9ed8bf"].forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(17 + i * 17, 15, 4, 0, 7);
      ctx.fill();
    });
    ctx.fillStyle = "#e8e6f4";
    ctx.font = "24px monospace";
    ctx.fillText("build something useful", 26, 78);
    const lens = [190, 270, 138, 215, 300, 170];
    for (let i = 0; i < 6; i++) {
      ctx.fillStyle = i % 2 ? "#a99adf" : "#91cbb7";
      ctx.fillRect(27 + (i % 3) * 17, 108 + i * 25, lens[i], 6);
    }
    ctx.fillStyle = "#7f8aad";
    ctx.font = "12px monospace";
    ctx.fillText("source  /  test  /  refine", 26, 294);
  });
  const display = screen(software, 2.61, 1.61, [0, 1.53, 0.105], monitorArt);
  display.rotation.x = -0.08;
  const keyboard = box(
    software,
    [2.65, 0.12, 0.88],
    [0, 0.08, 1.13],
    steel,
    0.09,
  );
  keyboard.rotation.y = 0.03;
  const keyGeo = new RoundedBoxGeometry(0.17, 0.055, 0.13, 1, 0.02);
  geometries.add(keyGeo);
  const keys = new THREE.InstancedMesh(keyGeo, paper, 44);
  let index = 0;
  const dummy = new THREE.Object3D();
  for (let row = 0; row < 4; row++)
    for (let col = 0; col < 11; col++) {
      dummy.position.set(-1.04 + col * 0.204, 0.17, 0.84 + row * 0.18);
      dummy.updateMatrix();
      keys.setMatrixAt(index++, dummy.matrix);
    }
  keys.castShadow = true;
  software.add(keys);
  box(software, [0.43, 0.15, 0.63], [1.9, 0.1, 1.15], paper, 0.15);

  const data = objects.get("data")!;
  mesh(
    new THREE.CylinderGeometry(1.15, 1.2, 0.14, 48),
    paper,
    data,
    [0, 0.04, 0],
  );
  const dataBars = new THREE.Group();
  data.add(dataBars);
  const heights = [0.55, 0.95, 1.5, 1.95, 1.2, 0.75];
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const h = heights[i];
    box(
      dataBars,
      [0.27, h, 0.27],
      [Math.cos(angle) * 0.65, h / 2 + 0.15, Math.sin(angle) * 0.65],
      i % 2 ? brass : lilac,
      0.055,
    );
  }
  const ring = mesh(
    new THREE.TorusGeometry(0.94, 0.025, 8, 64),
    steel,
    data,
    [0, 1.45, 0],
  );
  ring.rotation.x = Math.PI / 2 - 0.3;
  tube(
    data,
    [
      [-0.8, 0.5, 0.8],
      [-0.5, 1.2, 0.3],
      [0.15, 2.4, -0.2],
      [0.7, 1.85, -0.7],
    ],
    0.025,
    brass,
  );
  mesh(new THREE.SphereGeometry(0.13, 16, 12), mint, data, [0.15, 2.4, -0.2]);

  const medicine = objects.get("medicine")!;
  medicine.rotation.y = -0.17;
  box(medicine, [2.8, 0.12, 1.9], [0, 0.03, 0], coral, 0.1);
  box(medicine, [1.32, 0.12, 1.76], [-0.69, 0.15, 0], paper, 0.025);
  box(medicine, [1.32, 0.12, 1.76], [0.69, 0.15, 0], paper, 0.025);
  tube(
    medicine,
    [
      [0, 0.2, -0.88],
      [0, 0.24, 0],
      [0, 0.2, 0.88],
    ],
    0.035,
    brass,
  );
  const notebookArt = labelTexture((ctx) => {
    ctx.fillStyle = "#f8f7ed";
    ctx.fillRect(0, 0, 512, 320);
    ctx.fillStyle = "#795d68";
    ctx.font = "20px monospace";
    ctx.fillText("OBSERVE", 25, 42);
    ctx.font = "13px monospace";
    ctx.fillText("ask better questions", 25, 72);
    ctx.strokeStyle = "#b9b2bd";
    ctx.lineWidth = 1;
    for (let i = 0; i < 7; i++) {
      ctx.beginPath();
      ctx.moveTo(26, 110 + i * 24);
      ctx.lineTo(215, 110 + i * 24);
      ctx.stroke();
    }
    ctx.strokeStyle = "#b36e63";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(370, 137, 48, 71, -0.25, 0, 7);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(340, 88);
    ctx.bezierCurveTo(420, 135, 320, 163, 390, 205);
    ctx.stroke();
    ctx.fillStyle = "#795d68";
    ctx.font = "13px monospace";
    ctx.fillText("understand / connect", 268, 274);
  });
  const notebook = screen(medicine, 2.61, 1.68, [0, 0.222, 0], notebookArt);
  notebook.rotation.x = -Math.PI / 2;
  tube(
    medicine,
    [
      [1.6, 0.1, 0.5],
      [2, 0.1, 0.7],
      [2.1, 0.1, 0],
      [1.65, 0.1, -0.5],
      [1.45, 0.1, -0.15],
    ],
    0.035,
    ink,
  );
  mesh(
    new THREE.CylinderGeometry(0.17, 0.17, 0.08, 24),
    steel,
    medicine,
    [1.45, 0.15, -0.15],
  );
  const pencil = mesh(
    new THREE.CylinderGeometry(0.045, 0.045, 1.55, 6),
    brass,
    medicine,
    [-1.8, 0.09, 0.1],
  );
  pencil.rotation.z = Math.PI / 2;
  pencil.rotation.y = 0.35;

  const design = objects.get("design")!;
  const plinth = box(design, [2.4, 0.24, 1.9], [0, 0.1, 0], paper, 0.09);
  plinth.rotation.y = 0.15;
  const folded = new THREE.Group();
  folded.position.y = 0.35;
  design.add(folded);
  const foldedMaterial = mat("#8c78c3", 0.34, 0.16);
  const curve = new THREE.CatmullRomCurve3(
    Array.from({ length: 65 }, (_, i) => {
      const t = (i / 64) * Math.PI * 2;
      return new THREE.Vector3(
        Math.sin(t) * 0.73,
        1.0 + Math.sin(t * 2) * 0.62,
        Math.cos(t) * 0.45,
      );
    }),
    true,
  );
  const ribbon = mesh(
    new THREE.TubeGeometry(curve, 100, 0.18, 3, true),
    foldedMaterial,
    folded,
  );
  ribbon.rotation.y = 0.2;
  const swatches = [mint, coral, brass];
  swatches.forEach((m, i) => {
    const s = box(
      design,
      [0.43, 0.04, 0.58],
      [0.87 + i * 0.12, 0.28 + i * 0.035, 0.65],
      m,
      0.015,
    );
    s.rotation.y = 0.15 + i * 0.3;
  });
  // Ordinary desk objects link the domains into a single inhabited composition.
  const mug = mesh(
    new THREE.CylinderGeometry(0.28, 0.24, 0.55, 32),
    paper,
    table,
    [-5.2, 0.2, 2.55],
  );
  const coffee = mat("#57433d");
  mesh(
    new THREE.CircleGeometry(0.24, 32),
    coffee,
    mug,
    [0, 0.278, 0],
  ).rotation.x = -Math.PI / 2;
  const handle = mesh(
    new THREE.TorusGeometry(0.18, 0.045, 10, 24),
    paper,
    mug,
    [0.29, 0, 0],
  );
  handle.rotation.y = Math.PI / 2;
  const smallBook = box(table, [1.2, 0.13, 0.84], [4.8, 0.02, 2.7], mint, 0.03);
  smallBook.rotation.y = -0.2;

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let selected: DomainId | null = null;
  let hover: DomainId | null = null;
  let targetZoom = 1;
  let paused = false;
  let reduced = options.reduced;
  let visible = true;
  let disposed = false;
  let frame = 0;
  let lastTime = 0;
  let elapsed = 0;
  let width = 1;
  let height = 1;
  function hit(event: PointerEvent) {
    const r = canvas.getBoundingClientRect();
    pointer.set(
      ((event.clientX - r.left) / r.width) * 2 - 1,
      (-(event.clientY - r.top) / r.height) * 2 + 1,
    );
    raycaster.setFromCamera(pointer, camera);
    for (const hit of raycaster.intersectObjects([...objects.values()], true)) {
      let current: THREE.Object3D | null = hit.object;
      while (current) {
        if (current.userData.domain) return current.userData.domain as DomainId;
        current = current.parent;
      }
    }
    return null;
  }
  function move(event: PointerEvent) {
    hover = hit(event);
    canvas.style.cursor = hover ? "pointer" : "default";
    requestFrame();
  }
  function leave() {
    hover = null;
    canvas.style.cursor = "default";
    requestFrame();
  }
  function click(event: PointerEvent) {
    if (event.button !== 0) return;
    const id = hit(event);
    if (id) options.onSelect(id);
  }
  function draw(now: number) {
    frame = 0;
    if (disposed) return;
    // The scene's quiet motion needs at most 30 updates per second.
    if (lastTime && now - lastTime < 1000 / 30 && !paused && !reduced) {
      frame = requestAnimationFrame(draw);
      return;
    }
    const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0;
    lastTime = now;
    const moving = !paused && !reduced && visible && !document.hidden;
    if (moving) elapsed += dt;
    const ease = reduced ? 1 : 1 - Math.exp(-dt * 6.5);
    look.lerp(targetLook, ease || 1);
    camera.zoom = THREE.MathUtils.lerp(camera.zoom, targetZoom, ease || 1);
    camera.position.copy(look).add(cameraOffset);
    camera.lookAt(look);
    camera.updateProjectionMatrix();
    dataBars.rotation.y = moving
      ? Math.sin(elapsed * 0.22) * 0.08
      : dataBars.rotation.y;
    folded.rotation.y = moving
      ? Math.sin(elapsed * 0.18) * 0.12
      : folded.rotation.y;
    for (const [id, object] of objects) {
      const target = id === selected || id === hover ? 1.025 : 1;
      const scale =
        reduced || paused
          ? target
          : THREE.MathUtils.lerp(object.scale.x, target, 0.12);
      object.scale.setScalar(scale);
    }
    renderer.render(scene, camera);
    options.onLabels(
      domainOrder.map((id) => {
        const p = objects.get(id)!.position.clone();
        p.y += {
          neuroscience: 3.7,
          software: 2.7,
          data: 2.8,
          medicine: 0.7,
          design: 2.2,
        }[id];
        p.project(camera);
        return {
          id,
          x: ((p.x + 1) * width) / 2,
          y: Math.max(48, ((1 - p.y) * height) / 2),
        };
      }),
    );
    const unsettled =
      look.distanceTo(targetLook) > 0.005 ||
      Math.abs(camera.zoom - targetZoom) > 0.003;
    if ((moving || unsettled) && visible && !document.hidden)
      frame = requestAnimationFrame(draw);
  }
  function requestFrame() {
    if (!disposed && !frame) {
      lastTime = 0;
      frame = requestAnimationFrame(draw);
    }
  }
  function resize() {
    const r = canvas.parentElement!.getBoundingClientRect();
    width = Math.max(1, r.width);
    height = Math.max(1, r.height);
    renderer.setSize(width, height, false);
    const aspect = width / height;
    const halfWidth = width < 650 ? 8.4 : Math.max(10.7, aspect * 4.6);
    camera.left = -halfWidth;
    camera.right = halfWidth;
    camera.top = halfWidth / aspect;
    camera.bottom = -halfWidth / aspect;
    targetZoom = selected ? (width < 650 ? 1.55 : 1.85) : 1;
    camera.updateProjectionMatrix();
    requestFrame();
  }
  const observer = new ResizeObserver(() => resize());
  observer.observe(canvas.parentElement!);
  const intersect = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) requestFrame();
    else {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  });
  intersect.observe(canvas);
  function visibility() {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else requestFrame();
  }
  function contextLost(event: Event) {
    event.preventDefault();
    cancelAnimationFrame(frame);
    frame = 0;
    options.onFailure();
  }
  canvas.addEventListener("pointermove", move);
  canvas.addEventListener("pointerleave", leave);
  canvas.addEventListener("pointerup", click);
  canvas.addEventListener("webglcontextlost", contextLost);
  document.addEventListener("visibilitychange", visibility);
  resize();
  options.onReady();
  return {
    select(id: DomainId | null) {
      selected = id;
      targetLook.set(
        ...(id ? positions[id] : ([0, 0.9, 0] as [number, number, number])),
      );
      if (id) targetLook.y = 0.9;
      targetZoom = id ? (width < 650 ? 1.55 : 1.85) : 1;
      requestFrame();
    },
    setPaused(value: boolean) {
      paused = value;
      requestFrame();
    },
    setReduced(value: boolean) {
      reduced = value;
      requestFrame();
    },
    destroy() {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersect.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
      canvas.removeEventListener("pointerup", click);
      canvas.removeEventListener("webglcontextlost", contextLost);
      document.removeEventListener("visibilitychange", visibility);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      renderer.dispose();
      if (!renderer.getContext().isContextLost()) renderer.forceContextLoss();
    },
    getStats() {
      return {
        geometries: renderer.info.memory.geometries,
        textures: renderer.info.memory.textures,
        calls: renderer.info.render.calls,
      };
    },
  };
}
