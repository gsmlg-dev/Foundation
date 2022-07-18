import * as React from 'react';
import VisxBar from '@visx/shape/lib/shapes/Bar';
import { Group } from '@visx/group';

const defaultMargin = { top: 16, right: 16, bottom: 16, left: 16 };

export type BarProps = {
  width: number;
  height: number;
  margin?: typeof defaultMargin;
  total: number;
  value: number;
  fontSize?: number;
  valueFontSize?: number;
  barHeight?: number;
  label?: string;
  labelColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  valueColor?: string;
};

export const Bar = ({
  width,
  height,
  total,
  value,
  label,
  barHeight = 30,
  margin = defaultMargin,
  primaryColor = 'rgba(250, 173, 20, 1)',
  secondaryColor = '#f5f6fa',
  fontSize = 16,
  labelColor = 'rgb(47, 46, 63)',
  valueFontSize,
  valueColor,
}: BarProps) => {
  const innerWidth = width - margin.left - margin.right;
  // const innerHeight = height - margin.top - margin.bottom;

  const barWidth = (value / total) * innerWidth;
  const fontHeight = fontSize * 0.3;

  return (
    <svg width={width} height={height}>
      <Group top={margin.top} left={margin.left}>
        <text fill={labelColor} fontSize={fontSize} textAnchor="start">
          {label}
        </text>
        <text x={innerWidth} fill={valueColor ?? labelColor} fontSize={valueFontSize ?? fontSize} textAnchor="end">
          {`${value} / ${total}`}
        </text>
        <VisxBar
          x={0}
          y={fontHeight}
          width={innerWidth}
          height={barHeight}
          fill={secondaryColor}
          rx={4}
        />
        <VisxBar
          x={0}
          y={fontHeight}
          width={barWidth}
          height={barHeight}
          fill={primaryColor}
          rx={4}
        />
      </Group>
    </svg>
  );
}

export default Bar;
