import React from 'react';
import { DefaultNode, Graph } from '@visx/network';

export type NetworkProps = {
  data: { 
    nodes: CustomNode[]
    links: CustomLink[]
  }
  width: number;
  height: number;
  Node?: React.ComponentType<any>;
  Link?: React.ComponentType<any>;
  backgroundColor: string;
  [x: string]: any;
};

export interface CustomNode {
  x: number;
  y: number;
  color?: string;
  [x: string]: any;
}

export interface CustomLink {
  source: CustomNode;
  target: CustomNode;
  dashed?: boolean;
  [x: string]: any;
}

const DefaultLink = ({ link: { source, target, dashed } }) => (
  <line
    x1={source.x}
    y1={source.y}
    x2={target.x}
    y2={target.y}
    strokeWidth={2}
    stroke="#999"
    strokeOpacity={0.6}
    strokeDasharray={dashed ? '8,4' : undefined}
  />
);

export const Network : React.FC<NetworkProps> = ({
  data,
  width,
  height,
  backgroundColor = '#272b4d', 
  Node = DefaultNode,
  Link = DefaultLink,
}) => {
  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect width={width} height={height} rx={14} fill={backgroundColor} />
      <Graph<CustomLink, CustomNode>
        graph={data}
        top={20}
        left={100}
        nodeComponent={Node}
        linkComponent={Link}
      />
    </svg>
  );
};

export default Network;
