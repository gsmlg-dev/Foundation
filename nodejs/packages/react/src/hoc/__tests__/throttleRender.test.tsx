import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { throttleRender } from '../throttleRender';

jest.useFakeTimers();

it('throttleRender will limit render in miliseconds', () => {
  let n = 0;
  const View = () => {
    return <div>{++n}</div>;
  };
  View.displayName = 'View';
  const throttleTime = 1000;
  const Throttled = throttleRender(throttleTime)(View); // eslint-disable-line

  expect(Throttled.displayName).toEqual(
    `Throttled(${View.displayName})<${throttleTime}>`,
  );

  const { rerender } = render(<Throttled />);

  expect(screen.getByText(/1/)).toBeTruthy();

  rerender(<Throttled />);
  rerender(<Throttled />);
  rerender(<Throttled />);

  expect(screen.getByText(/2/)).toBeTruthy();

  jest.runAllTimers();

  expect(screen.getByText(/3/)).toBeTruthy();
});
