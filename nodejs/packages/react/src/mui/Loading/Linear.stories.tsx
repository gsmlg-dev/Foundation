import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Linear } from './Linear';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'mui/Loading/Linear',
  component: Linear,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Linear>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Linear> = (args) => <Linear {...args} />;

export const Sample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Sample.args = {};

export const SampleWithStyle = Template.bind({});
SampleWithStyle.args = {
  style: {
    maxWidth: '24rem',
    backgroundColor: 'gray',
  },
};
