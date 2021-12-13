const conf = require('@gsmlg/scripts/dist/config/rollup.config');
const { string } = require('rollup-plugin-string');

module.exports = {
  ...conf,
  plugins: conf.plugins.concat([
    string({
      include: '**/*.css',
    }),
  ]),
};
