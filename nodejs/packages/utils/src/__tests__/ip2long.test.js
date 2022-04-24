import { ip2long } from '../ip2long';

test('ip to long', () => {
  const ip = '8.8.8.8';
  const long = 134744072;
  expect(long).toEqual(ip2long(ip));
});
