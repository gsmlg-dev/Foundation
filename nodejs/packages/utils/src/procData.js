import { uuid } from './uuid.js';
import { getByKey } from './getByKey.js';

export const procData = (payload, options = {}) => {
  let originData = getByKey(payload, ['response', 'data']) || [];
  if (options.generateID === true) {
    originData = originData.map((item) => {
      const id = item.id ?? uuid();
      return {
        ...item,
        id,
      };
    });
  }
  const data = originData.reduce(
    (meno, item) => ({
      ...meno,
      [item.id]: item,
    }),
    {},
  );
  const list = originData.map((item) => item.id);
  return { data, list };
};

export default procData;