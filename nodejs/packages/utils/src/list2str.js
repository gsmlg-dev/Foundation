const list2str = (list, connector = ' ') => {
  let str = '';
  if (list && list.join && list.join.call) {
    str = list.join(connector);
  }
  return str;
};

export default list2str;
