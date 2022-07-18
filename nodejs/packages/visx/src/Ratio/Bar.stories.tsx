import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Bar } from './Bar';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Ratio/Bar',
  component: Bar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Bar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Bar> = (args) => <Bar {...args} />;

export const Sample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Sample.args = {
  width: 600,
  height: 600,
};

export const SampleWithStyle = Template.bind({});
SampleWithStyle.args = {
  width: 800,
  height: 800,
  backgroundColor: '#111111',
};
