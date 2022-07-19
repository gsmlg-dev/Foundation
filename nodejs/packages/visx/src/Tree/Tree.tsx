import React, { useState } from 'react';
import { Group } from '@visx/group';
import { hierarchy, Tree as VisxTree } from '@visx/hierarchy';
import { LinearGradient } from '@visx/gradient';
import { pointRadial } from 'd3-shape';
import getLinkComponent from './getLinkComponent';

function useForceUpdate() {
  const [, setValue] = useState<number>(0); // eslint-disable-line react/hook-use-state
  return () => setValue((value) => value + 1); // update state to force render
}

const defaultMargin = { top: 30, left: 30, right: 30, bottom: 70 };

// export type LinkTypesProps = {
//   width: number;
//   height: number;
//   margin?: { top: number; right: number; bottom: number; left: number };
// };

export type NodeType = React.ComponentType<{
  key: string | number;
  layout: string;
  orientation: string;
  linkType: string;
  node: any;
  forceUpdate: () => void;
  [t: string]: any;
}>

export type LinkType = React.ComponentType<{
  key: number | string;
  data: any;
  [t: string]: any;
}>

export interface TreeNode {
  name: string;
  isExpanded?: boolean;
  children?: TreeNode[];
  [x: string]: any;
}

export interface TreeProps {
  data: TreeNode;
  width: number;
  height: number;
  margin?: { top: number; left: number; right: number; bottom: number };
  layout?: 'cartesian' | 'polar';
  orientation?: 'vertical' | 'horizontal';
  linkType?: 'diagonal' | 'step' | 'curve' | 'line';
  stepPercent?: number;
  backgroundColor?: string | undefined;
  Node?: NodeType;
  Link?: LinkType;
}

export const Tree: React.FC<TreeProps> = ({
  data,
  width: totalWidth,
  height: totalHeight,
  margin = defaultMargin,
  layout = 'cartesian',
  orientation = 'vertical',
  linkType = 'step',
  stepPercent = 0.5,
  backgroundColor = 'transparent',
  Node = undefined,
  Link = undefined,
}) => {
  const forceUpdate = useForceUpdate();

  const innerWidth = totalWidth - margin.left - margin.right;
  const innerHeight = totalHeight - margin.top - margin.bottom;

  let origin: { x: number; y: number } = { x: 0, y: 0 };
  let sizeWidth: number = innerWidth;
  let sizeHeight: number = innerWidth;

  if (layout === 'polar') {
    origin = {
      x: innerWidth / 2,
      y: innerHeight / 2,
    };
    sizeWidth = 2 * Math.PI;
    sizeHeight = Math.min(innerWidth, innerHeight) / 2;
  } else {
    origin = { x: 0, y: 0 };
    if (orientation === 'vertical') {
      sizeWidth = innerWidth;
      sizeHeight = innerHeight;
    } else {
      sizeWidth = innerHeight;
      sizeHeight = innerWidth;
    }
  }

  const LinkComponent = Link ?? getLinkComponent({ layout, linkType, orientation });

  return totalWidth < 10 ? null : (
    <svg width={totalWidth} height={totalHeight}>
      <LinearGradient id="links-gradient" from="#fd9b93" to="#fe6e9e" />
      <rect width={totalWidth} height={totalHeight} rx={14} fill={backgroundColor} />
      <Group top={margin.top} left={margin.left}>
        <VisxTree
          root={hierarchy(data, (d) => (d.isExpanded ? null : d.children))}
          size={[sizeWidth, sizeHeight]}
          separation={(a, b) => (a.parent === b.parent ? 1 : 0.5) / a.depth}
        >
          {(tree) => (
            <Group top={origin.y} left={origin.x}>
              {tree.links().map((link, i) => (
                <LinkComponent
                  key={i}
                  data={link}
                  percent={stepPercent}
                  stroke="rgb(254,110,158,0.6)"
                  strokeWidth="1"
                  fill="none"
                />
              ))}

              {tree.descendants().map((node, key) => {
                const width = 40;
                const height = 20;

                let top: number = node.y;
                let left: number = node.x;
                if (layout === 'polar') {
                  const [radialX, radialY] = pointRadial(node.x, node.y);
                  top = radialY;
                  left = radialX;
                } else if (orientation === 'vertical') {
                  top = node.y;
                  left = node.x;
                } else {
                  top = node.x;
                  left = node.y;
                }

                return Node ? (
                  <Node
                    key={key}
                    layout={layout}
                    orientation={orientation}
                    linkType={linkType}
                    node={node}
                    forceUpdate={forceUpdate}
                  />
                ) : (
                  <Group top={top} left={left} key={key}>
                    {node.depth === 0 && (
                      <circle
                        r={16}
                        fill="url('#links-gradient')"
                        onClick={() => {
                          node.data.isExpanded = !node.data.isExpanded;
                          console.log(node);
                          forceUpdate();
                        }}
                      />
                    )}
                    {node.depth !== 0 && (
                      <rect
                        height={height}
                        width={width}
                        y={-height / 2}
                        x={-width / 2}
                        fill={backgroundColor}
                        stroke={node.data.children ? '#03c0dc' : '#26deb0'}
                        strokeWidth={0}
                        strokeDasharray={node.data.children ? '0' : '2,2'}
                        strokeOpacity={node.data.children ? 1 : 0.6}
                        rx={node.data.children ? 0 : 10}
                        onClick={() => {
                          node.data.isExpanded = !node.data.isExpanded;
                          forceUpdate();
                        }}
                      />
                    )}
                    <text
                      dy=".33em"
                      fontSize={14}
                      fontFamily="Arial"
                      textAnchor="middle"
                      style={{ pointerEvents: 'none' }}
                      fill={
                        node.depth === 0
                          ? '#71248e'
                          : node.children
                          ? '#fc32ba'
                          : '#26deb0'
                      }
                    >
                      {node.data.name}
                    </text>
                  </Group>
                );
              })}
            </Group>
          )}
        </VisxTree>
      </Group>
    </svg>
  );
};

export default Tree;
