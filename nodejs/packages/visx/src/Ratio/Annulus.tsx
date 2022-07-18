import * as React from 'react';
import Pie from '@visx/shape/lib/shapes/Pie';
import { Group } from '@visx/group';

const defaultMargin = { top: 16, right: 16, bottom: 16, left: 16 };

export type AnnulusProps = {
  width: number;
  height: number;
  margin?: typeof defaultMargin;
  total: number;
  value: number;
  innerLabel?: string;
  outerLabel?: string;
  primaryColor?: string;
  secondaryColor?: string;
  innerLabelColor?: string;
  outerLabelColor?: string;
  innerLabelFontSize?: number;
  outerLabelFontSize?: number;
};

export const Annulus = ({
  width,
  height,
  total,
  value,
  innerLabel,
  outerLabel,
  innerLabelFontSize,
  outerLabelFontSize,
  margin = defaultMargin,
  primaryColor = 'rgba(250, 173, 20, 1)',
  secondaryColor = 'rgba(250, 250, 250, 0.85)',
  innerLabelColor = 'rgb(47, 46, 63)',
  outerLabelColor = 'rgb(90, 96, 127)',
}: AnnulusProps) => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  let radius = Math.min(innerWidth, innerHeight) / 2;
  let centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const top = centerY + margin.top;
  const left = centerX + margin.left;
  
  const data = [
    { label: "Main", value },
    { label: "Others", value: total - value }
  ];
  const colors = {
    Main: primaryColor,
    Others: secondaryColor,
  };
  
  const f1 = innerLabelFontSize ? innerLabelFontSize : width * 0.1;
  const f2 = outerLabelFontSize ? outerLabelFontSize : width * 0.1;
  
  if (outerLabel) {
    radius = radius - f2 / 2;
    centerY = centerY - f2;
  }

  return (
    <svg width={width} height={height}>
      <Group top={top} left={left}>
        <Pie
          data={data}
          pieValue={(d) => d.value}
          outerRadius={radius}
          innerRadius={radius * 0.6}
          pieSortValues={null}
        >
          {(pie) => {
            return pie.arcs.map((arc, index) => {
              const { label } = arc.data;
              const arcPath = pie.path(arc) as string | undefined;
              const arcFill = colors[label];
              return (
                <g key={`arc-${label}-${index}`}>
                  <path d={arcPath} fill={arcFill} />
                </g>
              );
            });
          }}
        </Pie>
        <text color={innerLabelColor} y={f1 / 2} fontSize={f1} textAnchor="middle">
          {innerLabel ? innerLabel : `${value} / ${total}`}
        </text>
      </Group>
      {outerLabel ? (
        <Group top={top + radius + f2} left={left}>
          <text color={outerLabelColor} fontSize={f2} textAnchor="middle">
            {outerLabel}
          </text>
        </Group>
      ) : null}
    </svg>
  );
}

export default Annulus;
