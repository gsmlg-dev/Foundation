import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DevBanner } from './index';
import { height } from '@mui/system';
// import Inner from './inner';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'logo/DevBanner',
  component: DevBanner,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof DevBanner>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DevBanner> = (args) => <DevBanner {...args} />;

export const Sample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Sample.args = {};

export const SampleWithStyle = Template.bind({});
SampleWithStyle.args = {
  width: '600',
};