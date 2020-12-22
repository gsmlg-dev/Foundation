const {resolveGsmlgScripts} = require('../utils');

const gsmlgScripts = resolveGsmlgScripts();

module.exports = {
  hooks: {
    'pre-commit': `"${gsmlgScripts}" pre-commit`,
  },
};
