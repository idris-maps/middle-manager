import { readdir, writeFile, readFile } from 'fs'
import { promisify } from 'util'
import { resolve } from 'path'

const file = (langs: string[]) => `import prism from 'prismjs'
${langs.map(d => `import 'prismjs/components/prism-${d}'`).join('\n')}

export default (code: string, lang: string) => {
  try {
    return \`<pre><code class="language-\${lang}">\${prism.highlight(code, prism.languages[String(lang)], String(lang))}</code></pre>\`
  } catch (e) {
    console.log(\`Could not highlight code block with language: \${lang}\`, e)
    return \`<pre><code>\${code}</code></pre>\`
  }
}
`

const run = async () => {
  const files = await promisify(readdir)(resolve(__dirname, '../node_modules/prismjs/components'))
  const langs = files.filter(d => d !== 'index.js' && !d.endsWith('.min.js')).map(d => d.split('prism-')[1].split('.js')[0])
  const pathToFile = resolve(__dirname, '../src/render/highlight.ts')
  await promisify(writeFile)(pathToFile, file(langs), 'utf-8')
  console.log(`Wrote ${pathToFile}`)
  const pathToCss = resolve(__dirname, '../assets/prism.css')
  await promisify(writeFile)(pathToCss, await promisify(readFile)(resolve(__dirname, '../node_modules/prismjs/themes/prism.css'), 'utf-8'), 'utf-8')
  // TODO get rid of google fonts
  console.log(`Wrote ${pathToCss}`)
}

run()