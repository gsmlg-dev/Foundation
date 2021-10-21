/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/web'
import Overlay from './Overlay'
import Scene from './Scene'

export default function App({ size: { width, height } }) {
  // This spring controls the background and the svg fill (text color)
  const [{ background, fill }, set] = useSpring({ background: '#f0f0f0', fill: '#202020' }, [])
  return (
    <a.main
        style={{ background, width, height }}
        css={css`
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            background: #f0f0f0;
            display: flex;
            flex-direction: row;
            cursor: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxMCIgZmlsbD0iI0U4QjA1OSIvPjwvc3ZnPg=='),
        auto;

            @media only screen and (max-aspect-ratio: 8/7) {
                flex-direction: column;
            }
        `}
    >
      <Canvas 
        className="canvas"
        dpr={[1, 2]}
        css={css`
            order: 2;
            flex: 1;
            height: 100%;
            @media only screen and (max-aspect-ratio: 8/7) {
                order: 1;
            }
        `}
      >
        <Scene setBg={set} />
        <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
      </Canvas>
      <Overlay fill={fill} />
    </a.main>
  );
}
