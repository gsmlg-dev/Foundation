import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Tree } from '../Tree';
import data from '../data.sample';

it('<Tree /> should be render correctly', () => {
  render(<Tree width={100} height={100} data={data} />);
  expect(screen.findAllByText(/gsmlg/)).toBeTruthy();
});
