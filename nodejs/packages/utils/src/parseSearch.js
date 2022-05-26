/**
 * parse location.search to object parameters
 */

export const parseSearch = (p) => {
  const search = p ?? window?.location?.search.substring(1);
  const list = search.split('&').map((str) => {
      const d = decodeURIComponent;
      const eqIdx = str.indexOf('=');
      const name = d(str.slice(0, eqIdx));
      const value = d(str.slice(eqIdx + 1));
      return { name, value };
  });
  return list.reduce((m, item) => {
      m[item.name] = item.value;
      return m;
  }, {});
};



