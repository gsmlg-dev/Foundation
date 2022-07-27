import { updateState, removeState, getState } from '../state';


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
    const value = getState(state, ['name', 'alias']);

    expect(value).toBeUndefined();
  });

});
