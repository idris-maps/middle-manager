
import { Slide } from '../types'
import createSlide from './createSlide'
import xml from 'xml-string'
import Tag from 'xml-string/dist/Tag'

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

const createHead = (html: Tag, title: string, cssFiles: string[]) => {
  const head = html.child('head')
  head.child('meta').attr({ charset: 'utf-8' })
  head.child('title').data(title)
  cssFiles.forEach(href => head.child('link').attr({ rel: 'stylesheet', href }))
}

const createBody = (html: Tag, slides: Slide[], jsFiles: string[]) => {
  const body = html.child('body')
  const presentation = body.child('div').attr({ 'class': 'presentation' })
  slides.map(createSlide(presentation))
  jsFiles.forEach(src => body.child('script').attr({ src }))
}

const nonPrismCodeLanguages: string[] = [
  'mermaid',
  /* TODO mermaid, graphs... */
]
const needsPrism = (langs: string[]) => langs.filter(d => !nonPrismCodeLanguages.includes(d)).length > 0
const needsMermaid = (langs: string[]) => Boolean(langs.find(d => d === 'mermaid'))

export default (slides: Slide[]) => {
  const langs = getAllCodeLangs(slides)
  const html = xml.create('html')

  const cssFiles: string[] = [
    'dark.css',
    needsPrism(langs) ? 'prism.dark.css' : undefined,
    needsMermaid(langs) ? 'mermaid.dark.css' : undefined
  ].filter(isString)

  createHead(html, getTitle(slides), cssFiles)

  const jsFiles: string[] = [
    'main.js',
    ...(needsMermaid ? ['mermaid.min.js', 'mermaidInit.js'] : [])
  ]

  createBody(html, slides, jsFiles)

  return `<!DOCTYPE html>
${html.outer()}
`
}
