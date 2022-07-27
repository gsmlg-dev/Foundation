
export const updateState = (state = {}, keyPath = [], value) => {
  if (typeof keyPath === 'string') {
    keyPath = [keyPath];
  }
  if (keyPath.length === 0) {
    return value;
  }
  const key = keyPath.shift();
  let subState = state[key] ?? {};
  if (typeof subState !== 'object') {
    subState = {};
  }
  return {
    ...state,
    [key]: updateState(subState, keyPath, value),
  };
};

export const removeState = (state = {}, keyPath = []) => {
  if (typeof keyPath === 'string') {
    keyPath = [keyPath];
  }
  const key = keyPath.shift();
  if (keyPath.length === 0) {
    delete state[key]
    return {
      ...state,
    };
  }
  const subState = removeState(state[key] ?? {}, keyPath);
  if (Object.keys(subState).length === 0) {
    delete state[key]
    return {
      ...state,
    };
  }
  return {
    ...state,
    [key]: subState,
  };
};

export const getState = (state, keyPath, defaultValue) => {
  if (typeof keyPath === 'string') {
    keyPath = [keyPath];
  }
  const key = keyPath.shift();
  let subState = state[key] ?? {};
  if (keyPath.length === 0) {
    return state[key] ?? defaultValue;
  }
  if (typeof subState !== 'object') {
    subState = {};
  }
  return getState(subState, keyPath, defaultValue);
}

export const updateStateIn = (state = {}, keyPath = [], fn) => {
  if (typeof keyPath === 'string') {
    keyPath = [keyPath];
  }
  const key = keyPath.shift();
  if (keyPath.length === 0) {
    return {
      ...state,
      [key]: fn(state[key]),
    };
  }
  let subState = state[key] ?? {};
  if (typeof subState !== 'object') {
    subState = {};
  }
  return {
    ...state,
    [key]: updateStateIn(subState, keyPath, fn),
  };
};
