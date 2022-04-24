export const long2ip = (long) => {
  const l = Number(long);
  const a = (l >> 24) & 255;
  const b = (l >> 16) & 255;
  const c = (l >> 8) & 255;
  const d = l & 255;
  return `${a}.${b}.${c}.${d}`;
};

export default long2ip;
