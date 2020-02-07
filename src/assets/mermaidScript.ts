import { Asset } from './assets'

const initScript = (mermaidCss: string) => `
const themeCss = \`${mermaidCss}\`
mermaid.initialize({startOnLoad:true, theme: 'neutral', themeCSS })
`

export default (mermaidCss: string): Asset[] => [
  {type: 'js', path: 'https://unpkg.com/mermaid@8.4.6/dist/mermaid.min.js' },
  { type: 'js', content: initScript(mermaidCss) },
]
