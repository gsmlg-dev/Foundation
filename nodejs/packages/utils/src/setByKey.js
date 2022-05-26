/* eslint-disable no-cond-assign, no-empty, max-depth */
export const setByKey = (any, key, value) => {
  if (Array.isArray(key)) {
    let val = any;
    try {
      for (let i = 0, j = key.length; i < j; i += 1) {
        const isLast = j - 1 === i;
        const k = key[i];

        if (isLast) {
          val[k] = value;
        } else {
          if (val[k] == null) {
            val[k] = {};
          }
          val = val[k];
        }
      }
      return any;
    } catch (e) {}
  } else if (typeof key === 'string') {
    try {
      any[key] = value;
      return any;
    } catch (e) {}
  }
  return false;
};

export default setByKey;
