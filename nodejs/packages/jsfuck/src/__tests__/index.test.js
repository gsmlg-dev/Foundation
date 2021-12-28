/* eslint-disable no-eval */
import { fuck } from '../index';

it('should transform code to fuck', () => {
  const source = 'console.log("fuck");';
  const code = fuck(source);
  expect(code).toMatch(/^[[\]()!+]+$/);
  expect(eval(code)).toEqual(source);
});
