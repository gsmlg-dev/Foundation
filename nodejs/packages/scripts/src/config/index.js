export { default as babel } from './babelrc.js';
export { default as eslint } from './eslintrc.js';
export { default as husky } from './huskyrc.js';
export { default as jest } from './jest.config.js';
export { default as lintStaged } from './lintstagedrc.js';
export { default as prettier } from './prettierrc.js';
import { rollupConfig } from './rollup.config.js';

export const getRollupConfig = () => rollupConfig;
