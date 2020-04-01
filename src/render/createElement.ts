import marked from 'marked'
import highlight from './highlight'
import { SlideElement } from '../types'
import Tag from 'xml-string/dist/Tag'

const setCodeBlockSize = (linesOfCode: number) => {
  if (linesOfCode < 5) { return 'codeblock-small' }
  if (linesOfCode > 10) { return 'codeblock-big' }
  return ''
}

export default (linesOfCode: number, root: Tag) => ({ type, lang, value }: SlideElement) => {
  if (type === 'image') {
    root.child('div').attr({
      'class': 'image',
      style: `background-image: url(${value.split('(')[1].split(')')[0]})`,
      'aria-label': value.split(']')[0].split('[')[1],
    })
    return
  }
  if (type === 'code') {
    root.child('div')
      .attr({ 'class': `codeblock ${setCodeBlockSize(linesOfCode)}` })
      .data(highlight(value, lang || ''))
    return
  }
  root.child('div').attr({ 'class': 'text' })
    .data(marked(value))
}

