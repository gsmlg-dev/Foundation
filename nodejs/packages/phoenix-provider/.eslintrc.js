module.exports = {
  extends: './node_modules/@gsmlg/scripts/eslint.js',
  rules: {
    '@babel/new-cap': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  ignorePatterns: ['**/*.stories.ts', '**/*.stories.tsx'],
};
