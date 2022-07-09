const jestConfig = require('@gsmlg/scripts/jest');

const cfg = {
  ...jestConfig,
  coverageThreshold: null,
  transform: { '\\.[jt]sx?$': '@gsmlg/scripts/dist/config/babel-transform' },
  transformIgnorePatterns: [],
  testEnvironment: 'jsdom',
};

module.exports = cfg;
