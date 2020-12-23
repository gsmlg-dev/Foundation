import React from 'react';
import { linkTo } from '@storybook/addon-links';
import { Welcome } from '@storybook/react/demo';

export default {
  title: 'HomePage',
};

export const toStorybook = () => (
  <div>
    <h3>Home page of components</h3>
    <p>all components</p>
    <ul>
      <li>
        <a href={linkTo('CirculorLoading')}>CirculorLoading</a>
      </li>
    </ul>
  </div>
);

toStorybook.story = {
  name: 'Home',
};
