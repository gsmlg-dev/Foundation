import React from 'react';
import PropTypes from 'prop-types';
import { linkShape } from '@data-ui/network';

const proptypes = {
  linkStyles: PropTypes.object,
  link: linkShape.isRequired,
  onMouseMove: PropTypes.func,
  onClick: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseEnter: PropTypes.func,
};

const defaultProps = {
  linkStyles: {
    stroke: '#e3e3e3',
    strokeWidth: 1.5,
    strokeOpacity: 1,
    radius: 4,
  },
  onMouseMove: null,
  onClick: null,
  onMouseLeave: null,
  onMouseEnter: null,
};

export default function Link({
  linkStyles: { stroke, strokeWidth = 1, strokeOpacity = 1, radius = 4 },
  link,
  onMouseMove,
  onClick,
  onMouseLeave,
  onMouseEnter,
}) {
  const id = `arrow-${link.id}`;
  const lineLen = Math.sqrt((link.sourceX - link.targetX) ** 2 + (link.sourceY - link.targetY) ** 2) / strokeWidth;
  const speed = 2000;

  return (
    <g>
      <defs>
        <marker
          id={id}
          markerWidth={radius * 3 + 1}
          markerHeight={radius * 3 + 1}
          refX={radius * 3 + 30}
          refY={radius}
          orient="auto"
          markerUnits="strokeWidth"
        >
          {radius > 0 && (
            <path
              d={`M0,0 L0,${radius * 2} L${radius * 3},${radius} z`}
              fill={stroke}
              opacity={link.opacity || strokeOpacity}
            />
          )}
        </marker>
        <animate
          xlinkHref={`#${id}`}
          attributeName="refX"
          from={radius * 3 + lineLen}
          to={radius * 3}
          dur={`${speed}ms`}
          repeatCount="indefinite"
        />
      </defs>
      <line
        x1={link.sourceX}
        y1={link.sourceY}
        x2={link.targetX}
        y2={link.targetY}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeOpacity={link.opacity || strokeOpacity}
        markerEnd={`url(#${id})`}
        onMouseMove={
          onMouseMove &&
            (event => {
              onMouseMove({
                event,
                index: link.index,
                id: link.id,
                data: link,
              });
            })
        }
        onMouseLeave={
          onMouseLeave &&
            (event => {
              onMouseLeave({
                event,
                index: link.index,
                id: link.id,
                data: link,
              });
            })
        }
        onMouseEnter={
          onMouseEnter &&
            (event => {
              onMouseEnter({
                event,
                index: link.index,
                id: link.id,
                data: link,
              });
            })
        }
        onClick={
          onClick &&
            (event => {
              onClick({
                event,
                index: link.index,
                id: link.id,
                data: link,
              });
            })
        }
      />
    </g>
  );
}

Link.propTypes = proptypes;
Link.defaultProps = defaultProps;
