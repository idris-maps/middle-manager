import prism from 'prismjs'
import 'prismjs/components/prism-autoit'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cmake'
import 'prismjs/components/prism-coffeescript'
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-docker'
import 'prismjs/components/prism-ejs'
import 'prismjs/components/prism-elm'
import 'prismjs/components/prism-fsharp'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-graphql'
import 'prismjs/components/prism-handlebars'
import 'prismjs/components/prism-haskell'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-latex'
import 'prismjs/components/prism-lua'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-matlab'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-processing'
import 'prismjs/components/prism-pug'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-regex'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-sass'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-swift'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-wiki'
import 'prismjs/components/prism-yaml'

export default (code: string, lang: string) => {
  const language = prism.languages[lang] || prism.languages.autoit
  try {
    return `<pre><code class="language-${lang}">${prism.highlight(code, language, lang)}</code></pre>`
  } catch (e) {
    console.log(`Could not highlight code block with language: ${lang}`, e)
    return `<pre><code>${code}</code></pre>`
  }
}
