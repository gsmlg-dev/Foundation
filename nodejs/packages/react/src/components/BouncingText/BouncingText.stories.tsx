import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { BouncingText } from './BouncingText';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/BouncingText',
  component: BouncingText,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
} as ComponentMeta<typeof BouncingText>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BouncingText> = (args) => <BouncingText {...args} />;

export const Sample = Template.bind({});

Sample.args = {
  duration: 1000,
  children: 'Y2J, Best IN the World!'
};

// cubic-bezier(x1, y1, x2, y2)
