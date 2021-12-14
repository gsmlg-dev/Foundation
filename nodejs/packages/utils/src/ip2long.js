const ip2long = (ip) => {
  const [a, b, c, d] = ip.split('.');
  const aa = Number(a) << 24;
  const bb = Number(b) << 16;
  const cc = Number(c) << 8;
  const dd = Number(d);
  return aa + bb + cc + dd;
};

export default ip2long;
