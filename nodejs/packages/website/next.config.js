// next.config.js
// next-transpile-modules --save-dev
const withTM = require('next-transpile-modules')(['three'])

module.exports = {
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  assetPrefix: '/',
  ...withTM(),
};
