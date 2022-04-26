import { Story, Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import './input-action';

export default {
  title: '@gsmlg/input-action',
  argTypes: {},
} as Meta;

export interface RemarkElementProps {
  name: string;
  url: string;
  method: string;
  actionText: string;
  actionSavingText: string;
}

const Template: Story<RemarkElementProps> = ({
  name,
  url,
  method,
  actionText,
  actionSavingText,
}) =>
  html`<input-action
    name=${name}
    url=${url}
    method=${method}
    actionText=${actionText}
    actionSavingText=${actionSavingText}
  ></input-action>`;

export const Basic = Template.bind({});

Basic.args = {
  name: 'name',
  url: '/test-url',
  method: 'POST',
  actionText: 'Save',
  actionSavingText: 'Saving ...',
};
