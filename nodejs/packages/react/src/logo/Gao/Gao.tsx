import * as React from 'react';
import { SVGProps, Ref, forwardRef } from 'react';
import GaoLogo from './inner';

interface SVGRProps {
  title?: string;
  titleId?: string;
  ringColor?: string;
  circleColor?: string;
  textColor?: string;
}

const Gao = (
  {
    title,
    titleId,
    ringColor,
    circleColor,
    textColor,
    ...props
  }: SVGProps<SVGSVGElement> & SVGRProps,
  ref: Ref<SVGSVGElement>,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 786 786"
    xmlSpace="preserve"
    style={{
      fillRule: 'nonzero',
      clipRule: 'evenodd',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    }}
    ref={ref}
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <GaoLogo ringColor={ringColor} circleColor={circleColor} textColor={textColor} />
  </svg>
);

export default forwardRef(Gao);
