import { setByKey } from '../setByKey';
import { getByKey } from '../getByKey';

describe('test setByKey and getByKey', () => {
  it('should setObject by key which type is string and get that value', () => {
    const val = Symbol('uniq');
    const obj = {};
    const r = setByKey(obj, 'uniq', val);

    expect(getByKey(obj, 'uniq')).toEqual(val);
  });

  it('should setObject by key which type is array and get that value', () => {
    const val = Symbol('uniq');
    const keyPath = ['what', 'ever', 'it', 'is'];
    const obj = {};
    const r = setByKey(obj, keyPath, val);

    expect(obj).toEqual({what: { ever: { it: { is: val }}}});
    expect(getByKey(obj, keyPath)).toEqual(val);
  });

});
