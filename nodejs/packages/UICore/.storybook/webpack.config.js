const path = require('path');
const WorkspaceRoot = path.resolve(__dirname, '..', '..', '..');

module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  config.resolve = {
    ...config.resolve,
    modules: ['node_modules', 'src'].concat(config.resolve.modules),
    alias: {
      '@gsmlg/com': `${WorkspaceRoot}/packages/com/src`,
      '@gsmlg/utils': `${WorkspaceRoot}/packages/utils/src`,
    },
  };

  // Return the altered config
  return config;
};
