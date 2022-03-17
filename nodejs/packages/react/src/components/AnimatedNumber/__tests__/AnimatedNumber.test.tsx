import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { AnimatedNumber } from '../AnimatedNumber';

it('Render <AnimatedNumber />', () => {
  render(<AnimatedNumber value={100} duration={1000} />);
  expect(screen.getByText(/0/)).toBeTruthy();

  // rerender(<AnimatedNumber value={999} duration={1000} />);
  // expect(screen.getByText(/999/)).toBeFalsy();

  // rerender(<AnimatedNumber value={1111} duration={0} formatValue={(v) => `${v}s`} />);
  // expect(screen.getByText(/1111s/)).toBeTruthy();
});
