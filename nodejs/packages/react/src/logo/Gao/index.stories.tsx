import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Gao } from './index';
import { height } from '@mui/system';
// import Inner from './inner';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'logo/Gao',
  component: Gao,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Gao>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Gao> = (args) => <Gao {...args} />;

export const Sample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Sample.args = {};

export const SampleWithStyle = Template.bind({});
SampleWithStyle.args = {
  width: 600,
  height: 600,
};

export const SampleWithColor = Template.bind({});
SampleWithColor.args = {
  width: 400,
  height: 400,
  title: 'Jonathan',
  ringColor: '#9a13ed',
  circleColor: '#41fc41',
  textColor: '#f15959',
};
