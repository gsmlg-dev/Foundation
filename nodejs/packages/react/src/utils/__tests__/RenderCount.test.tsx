import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { RenderCount } from '../RenderCount';

it('RenderCount changes count on very render', () => {
  const View = () => <RenderCount />;
  const { rerender } = render(<View />);

  expect(screen.getByText(/1/)).toBeTruthy();

  rerender(<View />);

  expect(screen.getByText(/2/)).toBeTruthy();
});
