import marked from 'marked'
import highlight from './highlight'
import { SlideElement } from '../types'
import Tag from 'xml-string/dist/Tag'
import parseDsv from '../utils/parseDsv'

const setCodeBlockSize = (linesOfCode: number) => {
  if (linesOfCode < 5) { return 'codeblock-small' }
  if (linesOfCode > 10) { return 'codeblock-big' }
  return ''
}

const createTable = (
  value: string,
  linesOfCode: number,
  root: Tag
) =>
  (separator: string) => {
    const [head, ...rows] = parseDsv(separator)(value)
    const table = root.child('table')
      .attr({ 'class': `codeblock ${setCodeBlockSize(linesOfCode)}` })
    const thead = table.child('thead').child('tr')
    const tbody = table.child('tbody')
    head.forEach(cell => thead.child('th').data(cell))
    rows.forEach(row => {
      const tr = tbody.child('tr')
      row.forEach(cell => tr.child('td').data(cell))
    })
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
  if (type === 'code' && lang === 'csv') {
    createTable(value, linesOfCode, root)(',')
    return
  }
  if (type === 'code' && lang === 'tsv') {
    createTable(value, linesOfCode, root)('\t')
    return
  }
  if (type === 'code' && lang?.startsWith('dsv')) {
    createTable(value, linesOfCode, root)(lang.split('dsv')[1])
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

