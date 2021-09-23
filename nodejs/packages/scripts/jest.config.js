import  {jest as jestConfig} from './src/config/index.js';

export default Object.assign(jestConfig, {
  coverageThreshold: null,
})
