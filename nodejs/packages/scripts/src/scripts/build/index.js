import { runRollup } from './rollup.js';
import { runBabel } from './babel.js';

if (process.argv.includes('--browser')) {
  console.error('--browser has been deprecated, use --bundle instead')
}

if (process.argv.includes('--bundle') || process.argv.includes('--browser')) {
  runRollup();
} else {
  runBabel();
}
