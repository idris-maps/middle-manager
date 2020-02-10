import marked from 'marked'
import highlight from './highlight'
import { SlideElement } from '../parseMd'


const renderImage = (value: string) =>
  `<div class="image" style="background-image: url(${value.split('(')[1].split(')')[0]})" aria-label="${value.split(']')[0].split('[')[1]}"></div>`

const renderMermaid = (value: string) =>
`<div class="mermaid">
${value}
<div>`

export default ({ type, lang, value }: SlideElement) => {
  if (type === 'image') {
    return renderImage(value)
  }
  if (type === 'code' && ['mmd', 'mermaid'].includes(lang)) {
    return renderMermaid(value)
  }
  if (type === 'code') {
    return highlight(value, lang)
  }
  return marked(value)
}