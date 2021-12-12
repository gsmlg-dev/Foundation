import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Group } from '@visx/group';
import { pointRadial } from 'd3-shape';
import { Network } from './Network';
import sampleData from './data.sample';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Network',
  component: Network,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Network>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Network> = (args) => <Network {...args} />;

export const Sample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Sample.args = {
  data: sampleData,
  width: 600,
  height: 600,
};

export const SampleWithStyle = Template.bind({});
SampleWithStyle.args = {
  data: sampleData,
  width: 800,
  height: 800,
  backgroundColor: '#111111',
};
