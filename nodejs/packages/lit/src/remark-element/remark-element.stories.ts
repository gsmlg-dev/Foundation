import { Story, Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import './remark-element';

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
  title: '@gsmlg/remark-element',
  // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
  argTypes: {},
} as Meta;

export interface RemarkElementProps {
  debug: boolean;
  innerHTML?: string;
}

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args
const Template: Story<RemarkElementProps> = ({ debug, innerHTML }) =>
  html`<remark-element ?debug=${debug}>${unsafeHTML(innerHTML)}</remark-element>`;

export const Basic = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Basic.args = {
  debug: true,
  innerHTML: `
# RemarkElement
Render *markdown*`,
};

export const WithBlock = Template.bind({});

WithBlock.args = {
  debug: true,
  innerHTML: `
### JavaScript code

\`\`\`js
const Hello = (who = 'world') => 'Hello ' + whoe;
console.log(Hello());
console.log(Hello('Josh'));
\`\`\`

`,
};

export const WithChart = Template.bind({});

WithChart.args = {
  debug: true,
  innerHTML: `
### Mermaid Chart

\`\`\`mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
\`\`\`
`,
};

export const WithInnerHTMLChart = Template.bind({});

WithInnerHTMLChart.args = {
  debug: true,
  innerHTML: `
### Mermaid Chart

\`\`\`mermaid
graph LR;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
\`\`\`
`,
};
