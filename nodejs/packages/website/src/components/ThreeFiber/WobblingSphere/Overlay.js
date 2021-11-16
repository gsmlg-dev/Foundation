/* eslint-disable react/react-in-jsx-scope, react/no-children-prop -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { a } from '@react-spring/web'

export default function Overlay({ fill }) {
  // Just a Figma export, the fill is animated
  return (
    <div
      className="overlay"
      css={css`
        position: relative;
        order: 1;
        flex: 1;
        pointer-events: none;
      `}
    >
      <a.svg
        viewBox="0 0 583 720"
        fill={fill}
        xmlns="http://www.w3.org/2000/svg"
        css={css`
        width: 100%;
        height: 100%;

        @media only screen and (max-aspect-ratio: 8/7) {
        order: 2;
        width: 100%;
        max-width: 100%;
        height: 60vh;
        }
        `}
      >
        {/*
        长太息以掩涕兮，哀民生之多艰。
        余虽好修姱以鞿羁兮，謇朝谇而夕替。
        既替余以蕙纕兮，又申之以揽茝。
        亦余心之所善兮，虽九死其犹未悔。
        怨灵修之浩荡兮，终不察夫民心。
        */}
        <text fill="#E8B059" style={{ whiteSpace: 'pre' }} fontFamily="Inter" fontSize={48} fontWeight="bold" letterSpacing="0em">
          <tspan x={40} y={257.909} children={'屈原 \u2014'} />
        </text>
        <text style={{ whiteSpace: 'pre' }} fontFamily="Inter" fontSize={12} fontWeight="bold" letterSpacing="0em">
          <tspan x={40} y={270.909} />
        </text>
        <text style={{ whiteSpace: 'pre' }} fontFamily="Inter" fontSize={32} fontWeight="bold" letterSpacing="0em">
          <tspan x={40} y={321.909} children="长太息以掩涕兮，哀民生之多艰。" />
          <tspan x={40} y={372.909} children="余虽好修姱以鞿羁兮，謇朝谇而夕替。" />
          <tspan x={40} y={423.909} children="既替余以蕙纕兮，又申之以揽茝。" />
          <tspan x={40} y={474.909} children="亦余心之所善兮，虽九死其犹未悔。" />
          <tspan x={40} y={525.909} children="怨灵修之浩荡兮，终不察夫民心。" />
        </text>

      </a.svg>
    </div>
  )
}
