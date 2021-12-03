// next.config.js
// next-transpile-modules --save-dev
const withTM = require('next-transpile-modules')([
  'three',
  'react-markdown',
  'remark-gfm',
  'rehype-highlight',
]);

module.exports = {
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  assetPrefix: '/',
  ...withTM(),
};
