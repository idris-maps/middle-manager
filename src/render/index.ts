
import { Slide } from '../parseMd'
import renderSlide from './renderSlide'

const getTitle = (slides: Slide[]) =>
  slides && slides[0] && slides[0][0] && slides[0][0].value
    ? slides[0][0].value.replace(/\W/g, '')
    : 'Presentation'

const isString = (d: any): d is string =>
  typeof d === 'string' || d instanceof String

const getAllCodeLangs = (slides: Slide[]) =>
  slides
    .map(el => el.filter(d => d.type === 'code' && d.lang).map(d => d.lang))
    .reduce((r, list) => {
      const toAdd = Array.from(new Set(list.filter(d => !r.includes(d))))
      return [...r, ...toAdd]
    }, [])
    .filter(isString)


// TODO add themes
const getHTML = (slides: Slide[], needsMermaid: boolean, needsPrism: boolean) => `
<!DOCTYPE html>
<html>
  <head>
    <title>${getTitle(slides)}</title>
    ${needsPrism ? `<link href="prism.css" rel="stylesheet">` : ''}
    <link href="dark.css" rel="stylesheet">
  </head>
  <body>
    <div class="presentation">
${slides.map(renderSlide).join('\n')}
    </div>
    <script src="main.js"></script>
    ${needsMermaid ? ['mermaid.min.js', 'mermaidInit.dark.js'].map(d => `<script src="${d}"></script>`).join('') : ''}
  </body>
</html>
`

const needsMermaid = (langs: string[]) => langs.includes('mmd') || langs.includes('mermaid')
const needsPrism = (langs: string[]) => langs.filter(d => d !== 'mmd' && d !== 'mermaid').length > 0

export default (slides: Slide[]) => {
  const langs = getAllCodeLangs(slides)
  return getHTML(slides, needsMermaid(langs), needsPrism(langs))
}
