import {resolveGsmlgScripts} from '../utils.js';

const gsmlgScripts = resolveGsmlgScripts();

export default {
  hooks: {
    'pre-commit': `"${gsmlgScripts}" pre-commit`,
  },
};
