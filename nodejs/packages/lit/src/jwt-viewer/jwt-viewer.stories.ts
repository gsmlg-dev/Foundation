import { Story, Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import './jwt-viewer';

export default {
  title: '@gsmlg/jwt-viewer',
  argTypes: {},
} as Meta;

export interface JwtViewer {
  token: string;
}

const Template: Story<JwtViewer> = ({ token }) => html`<jwt-viewer token=${token} />`;

export const Basic = Template.bind({});

Basic.args = {
  token:
    'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJnc21sZyIsImV4cCI6MTY1MjU5ODgzMiwiaWF0IjoxNjUwMTc5NjMyLCJpc3MiOiJnc21sZyIsImp0aSI6IjBkMmVhMDg1LWIzM2EtNGM3My1iZmNlLWUwNGUwZDdhMGQ1NiIsIm5iZiI6MTY1MDE3OTYzMSwic3ViIjoiNzY5OTEzYjMtZDZjZS00YzU2LWJhMTEtMDM3MzQyMWNkNjkzIiwidHlwIjoiYWNjZXNzIn0.ug8qJiXzNUt6GhOQJyaa2kFBmlpsOzF-Wf2qtZoz0P3mCg_wJKdXSwwBieNhOKnA_8GCyfRA4-i5dHgXxMQ9gQ',
};
