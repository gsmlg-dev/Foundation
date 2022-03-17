/* eslint-disable testing-library/no-unnecessary-act */
import * as React from 'react';
import { render, screen, act } from '@testing-library/react';
import { AnimatedNumber } from '../AnimatedNumber';

const delay = (t: number) => new Promise((f) => {
  setTimeout(f, t);
});

it('Render <AnimatedNumber />', async () => {
  await act(async () => {
    const { rerender } = render(<AnimatedNumber value={100} duration={1000} />);
    expect(screen.getByText(/0/)).toBeTruthy();
    await delay(1000);
    expect(screen.getByText(/100/)).toBeTruthy();
  
    rerender(<AnimatedNumber value={999} duration={1000} />);
    await delay(1000);
    expect(screen.getByText(/999/)).toBeTruthy();
  
    rerender(<AnimatedNumber value={1111} duration={200} formatValue={(v) => `${v}s`} />);
    await delay(200);
    expect(screen.getByText(/1111s/)).toBeTruthy();

  });
});
