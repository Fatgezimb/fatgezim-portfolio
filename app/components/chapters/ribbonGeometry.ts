import * as THREE from "three";
const segments = 64;
export function updateRibbonStrip(
  geometry: THREE.BufferGeometry,
  index: number,
  count: number,
  fold: number,
) {
  const spacing = 3.16 / count,
    z = (index - (count - 1) / 2) * spacing,
    half = spacing * 0.304;
  const a = geometry.getAttribute("position");
  for (let j = 0; j <= segments; j++) {
    const u = j / segments,
      x = (u - 0.5) * 4.8,
      arch = Math.sin(Math.PI * u);
    const y =
      0.35 +
      fold *
        (1.8 * Math.pow(arch, 1.1) +
          0.6 * Math.sin(u * Math.PI * 2 + z * 0.9) * arch) +
      0.22 * Math.cos(z * 1.2) * arch;
    const v = j * 4;
    a.setXYZ(v, x, y, z - half);
    a.setXYZ(v + 1, x, y, z + half);
    a.setXYZ(v + 2, x, y - 0.07, z + half);
    a.setXYZ(v + 3, x, y - 0.07, z - half);
  }
  a.needsUpdate = true;
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
}
export function createRibbonStrip(index: number, count: number, fold: number) {
  const geometry = new THREE.BufferGeometry(),
    indices: number[] = [];
  for (let j = 0; j < segments; j++)
    for (let side = 0; side < 4; side++) {
      const a = j * 4 + side,
        b = j * 4 + ((side + 1) % 4),
        c = (j + 1) * 4 + side,
        d = (j + 1) * 4 + ((side + 1) % 4);
      indices.push(a, b, c, b, d, c);
    }
  const end = segments * 4;
  indices.push(0, 2, 1, 0, 3, 2, end, end + 1, end + 2, end, end + 2, end + 3);
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array((segments + 1) * 4 * 3), 3),
  );
  geometry.setIndex(indices);
  updateRibbonStrip(geometry, index, count, fold);
  return geometry;
}
