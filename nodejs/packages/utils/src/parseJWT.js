import { base64 } from './base64.js';

export const parseJWT = (token) => {
  const [h, p, s] = token.split('.');
  const he = base64.decode(h);
  const pa = base64.decode(p);
  return {
    header: JSON.parse(he),
    payload: JSON.parse(pa),
    signatrue: s,
  };
};

export default parseJWT;
