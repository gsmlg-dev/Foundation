import  {ifAnyDep} from '../utils.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default {
  extends: [
    require.resolve('eslint-config-kentcdodds'),
    require.resolve('eslint-config-kentcdodds/jest'),
    ifAnyDep('react', require.resolve('eslint-config-kentcdodds/jsx-a11y')),
    ifAnyDep('react', require.resolve('eslint-config-kentcdodds/react')),
  ].filter(Boolean),
  rules: {},
}
