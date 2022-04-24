import { long2ip } from '../long2ip';

test('long to ip', () => {
  const ip = '8.8.8.8';
  const long = 134744072;
  expect(ip).toEqual(long2ip(long));
});
