import sha1 from 'crypto-js/sha1';
import encHex from 'crypto-js/enc-hex';

const makeHash = (str) => {
  const encrypt = sha1(str);
  const hash = encrypt.toString(encHex);
  return hash;
};

export default makeHash;
