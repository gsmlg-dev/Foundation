import parseCmd from '../parseCmd';

describe('test command parser', () => {
  const cmd = 'sh -C "while true; do date +%F\\ %T; done"';
  const arr = ['sh', '-C', 'while true; do date +%F\\ %T; done'];

  it('should parse command to array', () => {
    expect(parseCmd(cmd)).toEqual(arr);
  });

  it('shoud parse array to command string', () => {
    expect(parseCmd(arr)).toEqual(cmd);
  });
});
