import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import {ifAnyDep, hasFile, hasPkgProp, fromRoot} from '../utils.js';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const here = (p) => path.join(__dirname, p);

const useBuiltInBabelConfig = !hasFile('.babelrc') && !hasPkgProp('babel');

const ignores = [
  '/node_modules/',
  '/__fixtures__/',
  '/fixtures/',
  '/__tests__/helpers/',
  '/__tests__/utils/',
  '__mocks__',
];

const jestConfig = {
  roots: [fromRoot('src')],
  testEnvironment: ifAnyDep(
    ['webpack', 'rollup', 'react', 'preact'],
    'jsdom',
    'node',
  ),
  testURL: 'http://localhost',
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  moduleDirectories: [
    'node_modules',
    fromRoot('src'),
    'shared',
    fromRoot('tests'),
  ],
  collectCoverageFrom: ['src/**/*.+(js|jsx|ts|tsx)'],
  testMatch: ['**/__tests__/**/*.+(js|jsx|ts|tsx)'],
  testPathIgnorePatterns: [...ignores],
  coveragePathIgnorePatterns: [...ignores, 'src/(umd|cjs|esm)-entry.js$'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  watchPlugins: [
    require.resolve('jest-watch-typeahead/filename'),
    require.resolve('jest-watch-typeahead/testname'),
  ],
  snapshotSerializers: [require.resolve('jest-serializer-path')],
};

const setupFiles = [
  'tests/setup-env.js',
  'tests/setup-env.ts',
  'tests/setup-env.tsx',
];
for (const setupFile of setupFiles) {
  if (hasFile(setupFile)) {
    jestConfig.setupFilesAfterEnv = [fromRoot(setupFile)];
  }
}

if (useBuiltInBabelConfig) {
  jestConfig.transform = {'^.+\\.(js|jsx|ts|tsx)$': here('./babel-transform')};
}

export default jestConfig;
