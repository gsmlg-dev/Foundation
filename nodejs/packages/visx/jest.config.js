const jestConfig = require('@gsmlg/scripts/jest');
const cfg = {
  ...jestConfig,
  // your overrides here
  // transform: {"\\.[jt]sx?$": "@gsmlg/scripts/dist/config/babel-transform"},
  transformIgnorePatterns: [],
};
module.exports = cfg;
// console.log(cfg);
