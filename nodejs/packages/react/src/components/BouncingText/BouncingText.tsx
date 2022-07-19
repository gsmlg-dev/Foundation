/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { css, keyframes } from '@emotion/react'

interface BouncingTextProps {
  duration?: number;
  children: React.ReactNode;
}

export const BouncingText: React.FC<BouncingTextProps> = ({ duration = 1000, children, ...props }) => {
  const bounce = keyframes`
    from, 20%, 53%, 80%, to {
      transform: translate3d(0,0,0);
    }

    40%, 43% {
      transform: translate3d(0, -30px, 0);
    }

    70% {
      transform: translate3d(0, -15px, 0);
    }

    90% {
      transform: translate3d(0,-4px,0);
    }
  `;

  const _duration = `${duration}ms`;


  return (
    <span
      {...props}
      css={css`
        display: inline-block;
        animation: ${bounce} ${_duration} ease infinite;
      `}
    >
      {children}
    </span>
  );
};
