import typescript from 'rollup-plugin-typescript'
import { uglify } from 'rollup-plugin-uglify'

const plugins = [
  typescript({ target: 'es5' }),
  uglify(),
]

export default [
  {
    input: './src_client/main/index.ts',
    output: { file: 'assets/main.js' },
    plugins,
  },
  {
    input: './src_client/mermaid/index.js',
    output: { file: 'assets/mermaidInit.js' },
  },
]