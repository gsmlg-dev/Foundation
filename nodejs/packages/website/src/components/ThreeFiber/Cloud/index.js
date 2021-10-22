import React, { Suspense, useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Billboard, Sky, OrbitControls, useTexture } from "@react-three/drei"

import cloudTexture from './cloud.png'

function Cloud({ size = 1, opacity = 0.5, speed = 0.4, spread = 10, length = 1.5, segments = 20, dir = 1, ...props }) {
  const group = useRef()
  const texture = useTexture(cloudTexture);
  const clouds = useMemo(
    () =>
      [...new Array(segments)].map((_, index) => ({
        x: spread / 2 - Math.random() * spread,
        y: spread / 2 - Math.random() * spread,
        scale: 0.4 + Math.sin(((index + 1) / segments) * Math.PI) * ((0.2 + Math.random()) * 10) * size,
        density: Math.max(0.2, Math.random()),
        rotation: Math.max(0.002, 0.005 * Math.random()) * speed,
      })),
    [spread, segments, speed, size],
  )
  useFrame((state) =>
    group.current?.children.forEach((cloud, index) => {
      cloud.rotation.z += clouds[index].rotation * dir
      cloud.scale.setScalar(clouds[index].scale + (((1 + Math.sin(state.clock.getElapsedTime() / 10)) / 2) * index) / 10)
    }),
  )
  return (
    <group {...props}>
      <group position={[0, 0, (segments / 2) * length]} ref={group}>
        {clouds.map(({ x, y, scale, density }, index) => (
          <Billboard key={index} scale={[scale, scale, scale]} position={[x, y, -index * length]} lockZ>
            <meshStandardMaterial map={texture} transparent opacity={(scale / 6) * density * opacity} depthTest={false} />
          </Billboard>
        ))}
      </group>
    </group>
  )
}

function Clouds() {
  return <Cloud size={2} rotation={[0, Math.PI / 2, 0]} position={[0, 75, -100]} scale={[10, 10, 10]} />
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, -75, 0] }}>
      <ambientLight intensity={0.8} />
      <pointLight intensity={2} position={[0, 0, -1000]} />
      <Suspense fallback={null}>
        <Clouds />
      </Suspense>
      <OrbitControls minPolarAngle={Math.PI / 1.5} maxPolarAngle={Math.PI / 1.5} />
      <Sky azimuth={0.5} turbidity={10} rayleigh={0.5} inclination={0.6} distance={100000} />
    </Canvas>
  )
}
