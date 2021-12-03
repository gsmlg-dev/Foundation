// next.config.js
// next-transpile-modules --save-dev
const withTM = require('next-transpile-modules')([
  'three',
  'react-markdown',
  'remark-gfm',
  'rehype-highlight',
  'remark-mermaidjs',
  'puppeteer',
]);

module.exports = {
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  assetPrefix: '/',
  ...withTM(),
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.tls = false;
      config.resolve.fallback.child_process = false;
    }

    return config
  },
};
