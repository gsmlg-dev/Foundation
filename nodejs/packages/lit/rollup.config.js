const conf = require('@gsmlg/scripts/dist/config/rollup.config');
const style = require('rollup-plugin-styles');

module.exports = {
  ...conf,
  plugins: conf.plugins.concat([
    style(),
  ]),
}
