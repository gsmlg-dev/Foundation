export const ucfirst = (str) => {
  let capitalizeString = str.slice(0, 1).toUpperCase();
  capitalizeString += str.slice(1);
  return capitalizeString;
};

export default ucfirst;
