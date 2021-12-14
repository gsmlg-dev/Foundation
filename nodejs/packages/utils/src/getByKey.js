/* eslint-disable no-cond-assign, no-empty */
export default (any, key, defaultValue = undefined) => {
  if (Array.isArray(key)) {
    let k;
    let val = any;
    try {
      while ((k = key.shift()) != null) {
        val = val[k];
      }
      return val;
    } catch (e) {}
  } else if (typeof key === 'string') {
    try {
      return any[key];
    } catch (e) {}
  }
  return defaultValue;
};
