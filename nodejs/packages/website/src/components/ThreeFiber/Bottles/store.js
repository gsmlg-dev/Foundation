import * as THREE from 'three'

export const material = {
  sphere: new THREE.MeshStandardMaterial({ color: new THREE.Color('#151515') }),
  inner: new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#eF5C00').convertSRGBToLinear(),
    transparent: true,
    side: THREE.BackSide,
    transmission: 0.5,
    metalness: 1,
    roughness: 0,
  }),
  outer: new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#5E2C00').convertSRGBToLinear(),
    transparent: true,
    transmission: 0.7,
    metalness: 1,
    roughness: 0,
  }),
  cap: new THREE.MeshStandardMaterial({ color: new THREE.Color('#040404') }),
  liquid: new THREE.MeshPhysicalMaterial({ color: new THREE.Color('black'), transparent: true, transmission: 0.5 }),
}

export const geometry = {
  sphere: new THREE.SphereBufferGeometry(1, 32, 32),
}
