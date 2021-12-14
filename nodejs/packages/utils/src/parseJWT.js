const parseJWT = (token) => {
  const [h, p, s] = token.split('.');
  const he = atob(h);
  const pa = atob(p);
  return {
    header: JSON.parse(he),
    payload: JSON.parse(pa),
    signatrue: s,
  };
};

export default parseJWT;
