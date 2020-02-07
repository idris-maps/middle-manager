import { promisify } from 'util'
import { mkdir, writeFile } from 'fs'
import { Slide } from '../parseMd'
import prepareAssets from './prepareAssets'
import renderHTML from './renderHTML'

const getTitle = (slides: Slide[]) =>
  slides && slides[0] && slides[0][0] && slides[0][0].value
    ? slides[0][0].value.replace(/\W/g, '')
    : 'Presentation'

const uniq = <T>(arr: T[]): T[] => Array.from(new Set(arr))

const getAllCodeLangs = (slides: Slide[]) =>
  slides
    .map(el => el.filter(d => d.type === 'code' && d.lang).map(d => d.lang))
    .reduce((r, list) => {
      const toAdd = uniq(list.filter(d => !r.includes(d)))
      return [...r, ...toAdd].filter(Boolean)
    }, [])

export default async (slides: Slide[], folderName: string) => {
  await promisify(mkdir)(folderName)
  const langs = getAllCodeLangs(slides)
  const needsMermaid = langs.includes('mmd') || langs.includes('mermaid')
  const needsPrism = langs.filter(d => d !== 'mmd' && d !== 'mermaid').length > 0
  const title = getTitle(slides)
  const assets = await prepareAssets(folderName, needsMermaid, needsPrism)
  await promisify(writeFile)(`${folderName}/index.html`, renderHTML({ assets, title, slides }), 'utf-8')
  return
}


