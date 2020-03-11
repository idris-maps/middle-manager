import marked from 'marked'
import highlight from './highlight'
import { SlideElement } from '../types'
import Tag from 'xml-string/dist/Tag'

const setCodeBlockSize = (linesOfCode: number) => {
  if (linesOfCode < 5) { return 'codeblock-small' }
  if (linesOfCode > 10) { return 'codeblock-big' }
  return ''
}

const getMermaidType = (value: string) => {
  const firstLine = value.split('\n').map(d => d.trim() ).filter(d => d!== '')[0]
  if (firstLine.startsWith('graph')) {
    return 'flow'
  }
  if (firstLine.startsWith('sequenceDiagram')) {
    return 'sequence'
  }
  if (firstLine.startsWith('classDiagram')) {
    return 'class'
  }
  if (firstLine.startsWith('stateDiagram')) {
    return 'state'
  }
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
  if (type === 'code' && lang === 'mermaid') {
    root.child('div').attr({ 'class': `mermaid mermaid-${getMermaidType(value)}` })
      .data(value)
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

