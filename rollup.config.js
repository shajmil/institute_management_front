import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'node_modules/angular-credit-card/fesm2020/angular-credit-card.mjs',
  output: {
    file: 'dist/angular-credit-card.js',
    format: 'esm',
  },
  plugins: [
    resolve({
      module: true,
      main: true,
    }),
    commonjs(),
  ],
};
