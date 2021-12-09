import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NodeCard } from './NodeCard';
import sampleData from './NodeCard.sample.json';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'mui/Vultr/NodeCard',
  component: NodeCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    host: sampleData.ams,
  },
} as ComponentMeta<typeof NodeCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NodeCard> = (args) => <NodeCard {...args} />;

export const Sample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Sample.args = {
  host: sampleData.ams,
};

export const SampleWithStyle = Template.bind({});
SampleWithStyle.args = {
  host: sampleData.ams,
  style: {
    maxWidth: '24rem',
  },
}

