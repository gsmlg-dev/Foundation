/**
 * unserialize cmd to array
 */
const str2arr = (str = '') => {
  const cmd = [];
  const brackets = ['"', "'"];
  let t = '';
  for (let i = 0, len = str.length, inBracket = false; i < len; i += 1) {
    const char = str[i];
    if (char === '\\') {
      t += char + str[i + 1];
      i += 1;
      continue;
    }
    if (/^\s$/.test(char) && inBracket === false) {
      if (t === '') {
        continue;
      } else {
        cmd.push(t);
        t = '';
        continue;
      }
    }
    if (brackets.includes(char)) {
      if (inBracket === false) {
        if (t !== '') {
          cmd.push(t);
          t = '';
        }
        inBracket = char;
        continue;
      } else if (char === inBracket) {
        cmd.push(t);
        t = '';
        inBracket = false;
        continue;
      }
    }
    t += char;
  }
  if (t !== '') {
    cmd.push(t);
    t = '';
  }
  return cmd;
};

/**
 * serialize cmd to string
 */
const arr2str = (arr = []) => {
  let text = '';
  for (let i = 0, len = arr.length; i < len; i += 1) {
    let n = arr[i];
    const hasQuote = /"/.test(n);
    const hasBlank = /\s/.test(n);
    if (hasQuote) {
      n = `"${n.replace('"', '\\"')}"`;
    }
    if (hasBlank) {
      n = `"${n}"`;
    }
    if (i === 0) {
      text += n;
    } else {
      text += ` ${n}`;
    }
  }
  return text;
};

export const parseCmd = (cmd) => {
  if (typeof cmd === 'string') {
    return str2arr(cmd);
  }

  if (Array.isArray(cmd)) {
    return arr2str(cmd);
  }
  if (cmd && cmd.toJS && Array.isArray(cmd.toJS())) {
    return arr2str(cmd.toJS());
  }

  return '';
  // throw new TypeError(`Unsupport type : ${typeof cmd}`);
};

parseCmd.str2arr = str2arr;
parseCmd.arr2str = arr2str;

// module.exports = parseCmd;
export default parseCmd;
