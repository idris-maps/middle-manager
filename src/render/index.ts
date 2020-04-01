import xml from 'xml-string'
import Tag from 'xml-string/dist/Tag'
import { readFile } from 'fs'
import { promisify } from 'util'
import { resolve } from 'path'
import { Slide } from '../types'
import createSlide from './createSlide'

const getFile = (file: string) =>
  promisify(readFile)(resolve(__dirname, '..', '..', 'assets', file), 'utf-8')

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
  cssFiles.forEach(css => head.child('style').data(css))
}

const createBody = (html: Tag, slides: Slide[], jsFiles: string[]) => {
  const body = html.child('body')
  const presentation = body.child('div').attr({ 'class': 'presentation' })
  slides.map(createSlide(presentation))
  jsFiles.forEach(js => body.child('script').data(js))
}

const needsPrism = (langs: string[]) => langs.length > 0

export default async (slides: Slide[]) => {
  const langs = getAllCodeLangs(slides)
  const html = xml.create('html')

  const cssFileNames: string[] = [
    'dark.css',
    needsPrism(langs) ? 'prism-dark.css' : undefined,
  ].filter(isString)
  const cssFiles = await Promise.all(cssFileNames.map(getFile))

  createHead(html, getTitle(slides), cssFiles)

  const jsFileNames: string[] = [
    'main.js',
  ]
  const jsFiles = await Promise.all(jsFileNames.map(getFile))


  createBody(html, slides, jsFiles)

  return `<!DOCTYPE html>
${html.outer()}
  `
}
