import { Story, Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import './remark-element';

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
  title: '@gsmlg/remark-element',
  // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
  argTypes: {
  },
} as Meta;

export interface RemarkElementProps {
  debug: boolean
  content?: string
}

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args
const Template : Story<RemarkElementProps> = ({ debug, content }) => (
  html`<remark-element ?debug=${debug}>${content}</remark-element>`
);

export const Basic = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Basic.args = {
  debug: false,
  content: `
# RemarkElement
Render *markdown*`
};

export const WithBlock = Template.bind({});

WithBlock.args = {
  debug: false,
  content: `
### JavaScript code

\`\`\`js
const Hello = (who = 'world') => 'Hello ' + whoe;
console.log(Hello());
console.log(Hello('Josh'));
\`\`\`

`
};

export const WithChart = Template.bind({});

WithChart.args = {
  debug: false,
  content: `
### Mermaid Chart

\`\`\`mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
\`\`\`
`
};
