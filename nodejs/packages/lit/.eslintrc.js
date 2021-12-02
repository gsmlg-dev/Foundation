module.exports = {
  extends: './node_modules/@gsmlg/scripts/eslint.js',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
  },
  rules: {
    '@babel/new-cap': 'off',
  },
};
