import babelJestMd from 'babel-jest';
import { createRequire } from 'module';
const babelJest = babelJestMd.__esModule ? babelJestMd.default : babelJestMd;

const require = createRequire(import.meta.url);

export default babelJest.createTransformer({
  presets: [require.resolve('./babelrc')],
})
