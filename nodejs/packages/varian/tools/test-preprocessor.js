const coffee = require('coffeescript');
const babelJest = require('babel-jest');

module.exports = {
  process: (src, path, ...rest) => {
    // CoffeeScript files can be .coffee, .litcoffee, or .coffee.md
    if (coffee.helpers.isCoffee(path)) {
      return coffee.compile(src, {
        filename: path,
        literate: coffee.helpers.isLiterate(path),
        inlineMap: true,
        bare: true,
        transpile: {
          presets: ['jest', '@babel/env']
        }
      });
    }
    if (!/node_modules/.test(path)) {
      return babelJest.process(src, path, ...rest);
    }
    return src;
  }
};
