import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Tree } from './Tree';
import sampleData from './data.sample';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Tree',
  component: Tree,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
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
