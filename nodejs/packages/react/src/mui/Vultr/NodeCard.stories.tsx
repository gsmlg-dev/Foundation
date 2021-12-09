import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NodeCard } from './NodeCard';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'mui/Vultr/NodeCard',
  component: NodeCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NodeCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NodeCard> = (args) => <NodeCard {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  host: {
    name: 'Silicon Vallay',
    host: 'silicon-vallay.hosts.vultr.com',
    delay: 59,
    minDelay: 10,
    maxDelay: 420,
    averageDelay: 120,
    lost: 0,
    times: 3,
  }
};
