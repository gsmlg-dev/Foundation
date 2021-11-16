/**
 * Basic
 */

export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length;
  for(let i = str.length - 1; i >= 0; i -= 1) {
    const code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s += 1;
    else if (code > 0x7ff && code <= 0xffff) s += 2; // like chinese in utf8
    if (code >= 0xDC00 && code <= 0xDFFF) i -= 1; // like ' 😀' is two characters in js, but a four byte character in utf-8
  }
  return s;
}

export function minLen(str = '', min) {
  return str.length >= min;
}

export function maxLen(str = '', max) {
  return str.length <= max;
}

export function minByteLen(str, min) {
  return byteLength(str) >= min;
}

export function maxByteLen(str, max) {
  return byteLength(str) <= max;
}

export function hasChinese(str) {
  const reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
  return reg.test(str);
}

export function isPureChinese(str) {
  const reg = /^[\u4E00-\u9FA5\uF900-\uFA2D]+$/;
  return reg.test(str);
}

export function isCommonName(str) {
  if (beginWith(str, '-')) return false;
  if (endWith(str, '-')) return false;
  const reg = /^[\w\u4E00-\u9FA5\uF900-\uFA2D]+$/i;
  return reg.test(str);
}

export function isName(str) {
  if (beginWith(str, '-')) return false;
  if (endWith(str, '-')) return false;
  const reg = /^\w+$/i;
  return reg.test(str);
}

export function isAlpha(str) {
  if (/^[0-9]/.test(str)) return false;
  const reg = /^[0-9A-Za-z_]+$/;
  return reg.test(str);
}

export function isEmail(email) {
  const [ name, domain, ...rest ] = email.split('@');
  if (rest.length > 0) return false;
  return name && domain && isDomainName(domain);
}

export function isPhone(value) {
    const reg = /^(\d{2,4}-?)?\d{6,11}$/;
    return reg.test(value);
}

export function isSNMPCom(str) {
  return byteLength(str) < 256 && byteLength(str) > 0;
}

export function isInteger(str) {
  str = '' + str;
  const reg = /^[0-9]+$/;
  const nReg = /^-[0-9]+$/;
  return (reg.test(str)) || (nReg.test(str));
}

export function isRange(str, min, max) {
  const num = Number(str);
  return num >= min && num <= max;
}

export function isIntRange(str, min, max) {
  const num = Number(str);
  return num >= min && num <= max && isInteger(str);
}

export function minInt(int, min) {
  return isInteger(int) && int >= min;
}

export function maxInt(int, max) {
  return isInteger(int) && int <= max;
}

export function strongPassword(str) {
  if (byteLength(str) < 8) return false;
  if (byteLength(str) > 32) return false;
  if (!/[a-z]/.test(str)) return false;
  if (!/[A-Z]/.test(str)) return false;
  if (!/[0-9]/.test(str)) return false;
  return true;
}

export function include(str, inc) {
  return str.indexOf(inc) >= 0;
}

export function exclude(str, exc) {
  return str.indexOf(exc) === -1;
}

export function beginWith(str, char) {
  str = '' + str;
  return str.indexOf(char) === 0;
}

export function endWith(str, char) {
  str = '' + str;
  const len = str.length;
  return str.lastIndexOf(char) === len - char.length;
}

export function isStartWithNumber(str) {
  str = '' + str;
  return /^\d/.test(str);
}

export function isStartWithLetter(str) {
  str = '' + str;
  return /^[a-zA-Z]/.test(str);
}

export function groupOf(arr, checker) {
  for (let i = 0, j = arr.length; i < j; i++) {
    let val = arr[i];
    if (!checker(val)) return false;
  }
  return true;
}

/**
 *  DNS
 */

import punycode from 'punycode';

export function punycodeToASCII(domain) {
  return punycode.toASCII(domain);
}

export function minDomainLen(str, min) {
  str = '' + str;
  return punycodeToASCII(str).length >= min;
}

export function maxDomainLen(str, max) {
  str = '' + str;
  return punycodeToASCII(str).length <= max;
}

export function isViewName(str) {
  str = str + '';
  if (!maxLen(str, 32)) return false;
  if (beginWith(str, '-')) return false;
  if (endWith(str, '-')) return false;
  if (include(str, '*')) return false;
  if (include(str, '__')) return false;
  const reg = /^[0-9a-zA-Z_\-\u4E00-\u9FA5\uF900-\uFA2D]+$/;
  return reg.test(str);
}

export function isZoneName(str) {
  str = str + '';
  if (str === '@') return true;
  if (!maxDomainLen(str, 191)) return false;
  if (beginWith(str, '-')) return false;
  if (include(str, '*')) return false;
  if (include(str, '__')) return false;
  if (include(str, '..')) return false;
  if (include(str, 'xn--')) return false;
  str = str.replace(/\.$/, '');
  return str.split('.').every(isRRName);
}

export function isRRName(str) {
  str = str + '';
  if (['*', '.', '*.'].includes(str)) return true;
  if (include(str, '..')) return false;
  if (!maxDomainLen(str, 63)) return false;
  const reg = /^[0-9a-zA-Z_\-\u4E00-\u9FA5\uF900-\uFA2D]+$/;
  return reg.test(str);
}

export function isDomainName(str) {
  str = str + '';
  if (str === '.') return true;
  if (!maxDomainLen(str, 254)) return false;
  if (beginWith(str, '-')) return false;
  if (include(str, '**')) return false;
  if (include(str, '__')) return false;
  if (include(str, '..')) return false;
  if (include(str, 'xn--')) return false;
  str = str.replace(/\.$/, '');
  return str.split('.').every(isRRName);
}

/**
 *  DHCP
 */

export function isMAC(mac) {
  const reg = /^[0-9a-f]{1,2}([:-])[0-9a-f]{1,2}(\1[0-9a-f]{1,2}){4}$/i;
  const regl = /^[0-9a-f]{1,4}([:-])[0-9a-f]{1,4}\1[0-9a-f]{1,4}$/i;
  return reg.test(mac) || regl.test(mac);
}

export function isDUID(duid) {
  var reg = /^[0-9a-f]{1,2}([:-])[0-9a-f]{1,2}(\1[0-9a-f]{1,2}){4,18}$/i;
  var reg4 = /^[0-9a-f]{3,4}([:-])[0-9a-f]{3,4}(\1[0-9a-f]{3,4}){1,8}$/i;
  return reg.test(duid) || reg4.test(duid);
}

export function isIPv4 (ip) {
  if (ip === '0.0.0.0') return true;
  const ipList = ip.split('.');
  return isIntRange(ipList[0], 1, 255) &&
    isIntRange(ipList[1], 0, 255) &&
    isIntRange(ipList[2], 0, 255) &&
    isIntRange(ipList[3], 0, 255) &&
    ipList.length === 4;
}

export function isIPv6(ip) {
  if (/[^0-9A-Fa-f:]/.test(ip)) return false;
  if (include(ip, ':::')) return false;
  if (include(ip, '::')) {
    let [p1, p2, ...rest] = ip.split('::');
    if (rest.length > 0) return false;
    let p1p = p1.split(':');
    let p2p = p2.split(':');
    if (p1p.length + p2p.length > 7) return false;
    let parts = p1p.concat(p2p);
    if(p2p.length > 1 && p2p[p2p.length - 1] === '') return false;
    for (let i = 0, j = parts.length - 1; i <= j; i++) {
      let val = parts[i];
      if ((i === 0 || i === j) && val === '') continue;
      val = parseInt(val, 16);
      if (isNaN(val)) return false;
      if (val > 0xffff || val < 0) return false;
    }
  } else {
    let parts = ip.split(':');
    if (parts.length !== 8) return false;
    for (let i = 0, j = parts.length - 1; i <= j; i++) {
      let val = parts[i];
      if ((i === 0 || i === j) && val === '') continue;
      val = parseInt(val, 16);
      if (isNaN(val)) return false;
      if (val > 0xffff || val < 0) return false;
    }
  }
  return true;
}


/**
 *  common
 */

export function isPort(port) {
  return isInteger(port) && isRange(port, 1, 65535);
}

export function isURL(url) {
  const reg = /(?:(?:http(?:s)?)|(?:ftp)):\/\/((?:[^:/]+)|(?:\[[a-fA-F0-9:]+\]))(?::(\d{1,5}))?(?:\/|$)/;
  const match = reg.exec(url);
  const domain = match ? `${match[1]}` : '';
  let v6;
  if (domain[0] === '[' && domain[domain.length - 1] === ']') {
    v6 = domain.slice(1, -1);
  }
  let port = match ? +match[2] : '';
  if (!port) { port = 80; }
  return /^(?:http(?:s)?)|(?:ftp):\/\//.test(url) && (isDomainName(domain) || isIPv6(v6)) && isPort(port);
}
