import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Group } from '@visx/group';
import { pointRadial } from 'd3-shape';
import { Tree } from './Tree';
import sampleData from './data.sample';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Tree',
  component: Tree,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Tree>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Tree> = (args) => <Tree {...args} />;

export const Sample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Sample.args = {
  data: sampleData,
  width: 600,
  height: 600,
  margin: {
    top: 30,
    left: 30,
    right: 30,
    bottom: 30,
  },
  linkType: 'diagonal',
};

export const SampleWithStyle = Template.bind({});
SampleWithStyle.args = {
  data: sampleData,
  width: 800,
  height: 800,
  margin: {
    top: 40,
    left: 40,
    right: 40,
    bottom: 40,
  },
  backgroundColor: '#111111',
};

const CustomNode = ({ key, node, layout, orientation, forceUpdate }) => {
  const width = 80;
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

  const name = node.data.name;
  let shortName = name;
  const L = 10;
  if (name.length > 10) {
    shortName = `${name.slice(0, 10 - 3)}...`;
  }

  return (
    <Group top={top} left={left} key={key}>
      <rect
        height={height}
        width={width}
        y={-height / 2}
        x={-width / 2}
        fill={'blue'}
        stroke={node.data.children ? '#03c0dc' : '#26deb0'}
        strokeWidth={0}
        strokeDasharray={node.data.children ? '0' : '2,2'}
        strokeOpacity={node.data.children ? 1 : 0.6}
        rx={node.data.children ? 0 : 10}
        onClick={() => {
          node.data.isExpanded = !node.data.isExpanded;
          forceUpdate();
        }}
        transform={'rotate(-15)'}
      >
        <title>{name}</title>
      </rect>
      <text
        dy=".33em"
        fontSize={14}
        fontFamily="Arial"
        textAnchor="middle"
        style={{ pointerEvents: 'none' }}
        fill={'#ffffff'}
        transform={'rotate(-15)'}
      >
        {shortName}
      </text>
    </Group>
  );
};

export const SampleWithCostemNodeComponent = Template.bind({});
SampleWithCostemNodeComponent.args = {
  data: sampleData,
  width: 800,
  height: 800,
  margin: {
    top: 40,
    left: 40,
    right: 40,
    bottom: 40,
  },
  backgroundColor: '#111111',
  NodeComponent: CustomNode,
};
