import * as THREE from 'three'
import { Suspense, useLayoutEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, Environment, Stage, OrbitControls } from '@react-three/drei'

/*
Author: Steven Grey (https://sketchfab.com/Steven007)
License: CC-BY-NC-4.0 (http://creativecommons.org/licenses/by-nc/4.0/)
Source: https://sketchfab.com/3d-models/lamborghini-urus-2650599973b649ddb4460ff6c03e4aa2
Title: Lamborghini Urus

How to prepare a model for the web:
  - Models should not be larger than 1-2mb, preferrably lower than 200kb if you can get away with it
  - Compress and rescale the textures, using sqoosh for instance, you don't often need that much resolution
  - Compress it: npx gltf-pipeline -i model.gltf -o model.glb --draco.compressionLevel=10
  - With r3f you do not need to worry about draco wasm binaries, etc, everything is taken care of by useGLTF
*/
function Model(props) {
  const { scene, nodes, materials } = useGLTF('/webgl/lambo.glb')
  // A layout effect executes after the jsx has "rendered" but before it is committed to screen by the host (threejs)
  // This is a good place to make adjustments
  useLayoutEffect(() => {
    scene.traverse((obj) => obj.type === 'Mesh' && (obj.receiveShadow = obj.castShadow = true))
    Object.assign(nodes.wheel003_020_2_Chrome_0.material, { metalness: 1, roughness: 0.4, color: new THREE.Color('black') })
    // Using the emissive colors is a nice trick to give textures a warm sheen
    Object.assign(materials.WhiteCar, { roughness: 0, metalness: 0.25, emissive: new THREE.Color('#500000'), envMapIntensity: 0.5 })
  }, [scene, nodes, materials])
  // <primitive> just puts an existing thing into the scene graph
  // For more control over the asset refer to https://github.com/pmndrs/gltfjsx
  return <primitive object={scene} {...props} />
}

export default function App() {
  return (
    <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }}>
      <color attach="background" args={['#101010']} />
      <fog attach="fog" args={['#101010', 10, 50]} />
      <Suspense fallback={null}>
        <Environment path="/webgl/cube" />
        {/* <Stage> will center and light the contents, create ground-shadows, and zoom the camera */}
        <Stage environment={null} intensity={1} contactShadowOpacity={1} shadowBias={-0.0015}>
          <Model scale={0.01} />
        </Stage>
      </Suspense>
      <mesh rotation-x={-Math.PI / 2} scale={100}>
        <planeGeometry />
        <meshStandardMaterial color="#101010" transparent depthWrite={false} />
      </mesh>
      <OrbitControls autoRotate enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2.8} maxPolarAngle={Math.PI / 2.8} />
    </Canvas>
  )
}
