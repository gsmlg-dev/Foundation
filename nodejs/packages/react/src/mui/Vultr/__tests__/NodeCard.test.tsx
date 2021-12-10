import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { NodeCard } from '../NodeCard';
import data from '../NodeCard.sample.json';

it('Render <NodeCard /> with host ams', () => {
  render(<NodeCard host={data.ams} />);

  expect(screen.getByText(/vultr\.com/)).toBeTruthy();
});
