import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    { file: `cjs/${pkg.name}.js`, format: 'cjs', sourcemap: true },
    { file: `esm/${pkg.name}.mjs`, format: 'esm', sourcemap: true },
    { file: `umd/${pkg.name}.js`, format: 'umd', name: 'PrismicJS', globals: { 'cross-fetch': 'fetch' } },
    { file: `umd/${pkg.name}.min.js`, format: 'umd', name: 'PrismicJS', globals: { 'cross-fetch': 'fetch' }, plugins: [terser()]},
  ],
  plugins: [
    typescript(),
  ],
  external: ['cross-fetch']
}
