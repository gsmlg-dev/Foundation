import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Annulus } from './Annulus';

export default {
  title: 'Ratio/Annulus',
  component: Annulus,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Annulus>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Annulus> = (args) => <Annulus {...args} />;

export const Sample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Sample.args = {
  width: 400,
  height: 400,
  total: 100,
  value: 85,
};

export const SampleWithLabel = Template.bind({});
SampleWithLabel.args = {
  width: 400,
  height: 440,
  total: 100,
  value: 39,
  ringWidth: 15,
  outerLabel: 'Data Usage',
  outerLabelColor: 'rgba(231, 102, 67, 0.85)',
  primaryColor: '#03DAC6',
};
