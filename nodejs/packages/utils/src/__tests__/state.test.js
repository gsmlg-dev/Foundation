import { updateState, removeState, getState, updateStateIn } from '../state';


describe('test updateState', () => {
  it('should updateState by keyPath string', () => {
    const state = {};
    const newState = updateState(state, 'name', 'Josh');

    expect(newState).toEqual({ name: 'Josh' });
    expect(newState).not.toBe(state);
  });

  it('should updateState by keyPath array', () => {
    const state = {};
    const newState = updateState(state, ['name', 'alias'], 'Josh');

    expect(newState).toEqual({ name: { alias: 'Josh' } });
    expect(newState).not.toBe(state);
  });

  it('should updateState by keyPath array and replace non object', () => {
    const state = { name: 'Alpha' };
    const newState = updateState(state, ['name', 'alias'], 'Josh');

    expect(newState).toEqual({ name: { alias: 'Josh' } });
    expect(newState).not.toBe(state);
  });

});


describe('test removeState', () => {
  it('should removeState by keyPath string', () => {
    const state = { name: 'Josh' };
    const newState = removeState(state, 'name');

    expect(newState).toEqual({});
    expect(newState).not.toBe(state);
  });

  it('should removeState by keyPath array and clean', () => {
    const state = { name: { alias: 'Josh' } };
    const newState = removeState(state, ['name', 'alias']);

    expect(newState).toEqual({});
    expect(newState).not.toBe(state);
  });

  it('should removeState by keyPath array', () => {
    const state = { name: { alias: 'Josh', last: 'Gao' } };
    const newState = removeState(state, ['name', 'alias']);

    expect(newState).toEqual({ name: { last: 'Gao' }});
    expect(newState).not.toBe(state);
  });

});


describe('test getState', () => {
  it('should getState by keyPath string', () => {
    const state = { name: 'Josh' };
    const value = getState(state, 'name');

    expect(value).toEqual('Josh');
  });

  it('should getState by keyPath array', () => {
    const state = { name: { alias: 'Josh' } };
    const value = getState(state, ['name', 'alias']);

    expect(value).toEqual('Josh');
  });

  it('should getState by keyPath array and value not defined', () => {
    const state = {};
    const value = getState(state, ['name', 'list']);

    expect(value).toBeUndefined();
  });

  it('should getState by keyPath array with default value', () => {
    const state = {};
    const value = getState(state, ['name', 'list'], 'Jonathan');

    expect(value).toEqual('Jonathan');
  });

});


describe('test updateStateIn', () => {
  it('should updateStateIn by keyPath array add new data', () => {
    const state = { name: [] };
    const newState = updateStateIn(state, ['name', 'alias'], (_) => ['Josh', 'James']);

    expect(newState).toEqual({name: {alias: ['Josh', 'James']}});
    expect(newState).not.toBe(state);
  });

  it('should updateStateIn by keyPath array update exists data', () => {
    const state = { name: [1,2,3,4,5] };
    const newState = updateStateIn(state, ['name'], (l) => l?.filter((n) => n % 2 === 0));

    expect(newState).toEqual({name: [2,4]});
    expect(newState).not.toBe(state);
  });
})
