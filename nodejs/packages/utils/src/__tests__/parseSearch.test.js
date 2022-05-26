import { parseSearch } from '../parseSearch';

describe('test parseSearch', () => {
  it('should parse search to js object', () => {
    const q = 'name=Josh&age=30';
    expect(parseSearch(q)).toEqual({name:'Josh', age: '30'});
  });

});
