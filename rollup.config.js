import typescript from 'rollup-plugin-typescript'
import { uglify } from 'rollup-plugin-uglify'

const plugins = [
  typescript({ target: 'es5' }),
  uglify(),
]

export default [
  {
    input: './src_client/index.ts',
    output: { file: 'assets/main.js' },
    plugins,
  },
]