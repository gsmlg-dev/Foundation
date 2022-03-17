import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AnimatedNumber } from './AnimatedNumber';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/AnimatedNumber',
  component: AnimatedNumber,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
} as ComponentMeta<typeof AnimatedNumber>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AnimatedNumber> = (args) => <AnimatedNumber {...args} />;

export const Sample = Template.bind({});

Sample.args = {
  value: 1024,
  duration: 1000,
  formatValue: (v: number) => v.toFixed(0),
};
