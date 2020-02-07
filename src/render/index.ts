import { Slide } from '../parseMd'

const getAllCodeLangs = (slides: Slide[]) =>
  slides
    .map(el => el.filter(d => d.type === 'code' && d.lang).map(d => d.lang))
    .reduce((r, list) => {
      const toAdd = [...new Set(list.filter(d => !r.includes(d)))]
      return [...r, ...toAdd].filter(Boolean)
    }, [])

export default (slides: Slide[]) => {
  const langs = getAllCodeLangs(slides)
}