import type {
  BufferGeometry,
  Material,
  Object3D,
  Texture,
  WebGLRenderer,
} from "three";

type RenderableObject = Object3D & {
  geometry?: BufferGeometry;
  material?: Material | Material[];
};

function isTexture(value: unknown): value is Texture {
  return Boolean(
    value &&
      typeof value === "object" &&
      "isTexture" in value &&
      (value as { isTexture?: unknown }).isTexture,
  );
}

function disposeMaterialTextures(material: Material) {
  const properties = material as unknown as Record<string, unknown>;

  for (const value of Object.values(properties)) {
    if (isTexture(value)) value.dispose();
  }

  const uniforms = properties.uniforms;
  if (!uniforms || typeof uniforms !== "object") return;

  for (const uniform of Object.values(uniforms as Record<string, unknown>)) {
    if (!uniform || typeof uniform !== "object" || !("value" in uniform)) continue;
    const value = (uniform as { value?: unknown }).value;
    if (isTexture(value)) value.dispose();
    if (Array.isArray(value)) value.forEach((item) => isTexture(item) && item.dispose());
  }
}

/** Dispose a complete Three.js graph without forcing a synthetic context loss. */
export function disposeThreeScene(root: Object3D, renderer: WebGLRenderer) {
  const geometries = new Set<BufferGeometry>();
  const materials = new Set<Material>();

  root.traverse((object) => {
    const renderable = object as RenderableObject;
    if (renderable.geometry?.isBufferGeometry) geometries.add(renderable.geometry);

    const objectMaterials = Array.isArray(renderable.material)
      ? renderable.material
      : renderable.material
        ? [renderable.material]
        : [];
    objectMaterials.forEach((material) => materials.add(material));
  });

  geometries.forEach((geometry) => geometry.dispose());
  materials.forEach((material) => {
    disposeMaterialTextures(material);
    material.dispose();
  });

  root.clear();
  renderer.setAnimationLoop(null);
  renderer.renderLists.dispose();
  renderer.dispose();
}
