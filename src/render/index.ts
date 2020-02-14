
import { Slide } from '../parseMd'
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

const createHead = (html: Tag, title: string, mainCss: string, prismCss?: string) => {
  const head = html.child('head')
  head.child('meta').attr({ charset: 'utf-8' })
  head.child('title').data(title)
  head.child('link').attr({ rel: 'stylesheet', href: mainCss })
  if (prismCss) {
    head.child('link').attr({ rel: 'stylesheet', href: prismCss })
  }
}

const createBody = (html: Tag, slides: Slide[]) => {
  const body = html.child('body')
  const presentation = body.child('div').attr({ 'class': 'presentation' })
  slides.map(createSlide(presentation))
  body.child('script').attr({ src: 'main.js' })
}

const nonPrismCodeLanguages: string[] = [
  /* TODO mermaid, graphs... */
]
const needsPrism = (langs: string[]) => langs.filter(d => !nonPrismCodeLanguages.includes(d)).length > 0

export default (slides: Slide[]) => {
  const langs = getAllCodeLangs(slides)
  const html = xml.create('html')
  createHead(html, getTitle(slides), 'dark.css', needsPrism(langs) ? 'prism.dark.css' : undefined)
  createBody(html, slides)

  return `<!DOCTYPE html>
${html.outer()}
`
}
