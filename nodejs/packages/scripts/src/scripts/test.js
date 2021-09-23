process.env.BABEL_ENV = 'test'
process.env.NODE_ENV = 'test'

import jest from 'jest';
import isCI from 'is-ci';

import {hasPkgProp, parseEnv, hasFile} from '../utils.js';
import jestConfig from '../config/jest.config.js';

const { run } = jest;

const args = process.argv.slice(2)

const watch =
  !isCI &&
  !parseEnv('SCRIPTS_PRE-COMMIT', false) &&
  !args.includes('--no-watch') &&
  !args.includes('--coverage') &&
  !args.includes('--updateSnapshot')
    ? ['--watch']
    : []

const config =
  !args.includes('--config') &&
  !hasFile('jest.config.js') &&
  !hasPkgProp('jest')
    ? ['--config', JSON.stringify(jestConfig)]
    : []

// eslint-disable-next-line jest/no-jest-import
run([...config, ...watch, ...args])
