import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { AnimatedNumber } from '../AnimatedNumber';

it('Render <AnimatedNumber />', () => {
  const { rerender } = render(<AnimatedNumber value={100} duration={2000} />);
  expect(screen.getByText(/100/)).toBeTruthy();

  rerender(<AnimatedNumber value={999} duration={2000} />);
  expect(screen.getByText(/999/)).toBeTruthy();

  rerender(<AnimatedNumber value={1111} duration={2000} formatValue={(v) => `${v}s`} />);
  expect(screen.getByText(/1111s/)).toBeTruthy();
});
