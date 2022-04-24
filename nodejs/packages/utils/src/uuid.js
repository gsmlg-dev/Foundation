/**
 * UUID generator
 * Algorithms from rfc4122
 * Version v4
 */

const createUUID = (function maker(uuidRegEx, uuidReplacer) {
  return function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
      .replace(uuidRegEx, uuidReplacer)
      .toUpperCase();
  };
})(/[xy]/g, (c) => {
  const r = (Math.random() * 16) | 0;
  const v = c === 'x' ? r : (r & 3) | 8;
  return v.toString(16);
});

export const uuid = createUUID();

export default uuid;
