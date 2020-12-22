const {resolveGsmlgScripts, resolveBin} = require('../utils');

const gsmlgScripts = resolveGsmlgScripts();
const doctoc = resolveBin('doctoc');

module.exports = {
  'README.md': [`${doctoc} --maxlevel 3 --notitle`],
  '*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx|vue)': [
    `${gsmlgScripts} format`,
    `${gsmlgScripts} lint`,
    `${gsmlgScripts} test --findRelatedTests`,
  ],
};
