const {ifAnyDep} = require('../utils')

module.exports = {
  extends: [
    require.resolve('eslint-config-gsmlg'),
    require.resolve('eslint-config-gsmlg/jest'),
    ifAnyDep('react', require.resolve('eslint-config-gsmlg/jsx-a11y')),
    ifAnyDep('react', require.resolve('eslint-config-gsmlg/react')),
    ifAnyDep('next', require.resolve('eslint-config-next')),
  ].filter(Boolean),
  rules: {},
}
