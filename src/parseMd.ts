export interface SlideElement {
  type: 'md' | 'code' | 'image' | string
  lang?: string
  value: string
}

export type Slide = SlideElement[]

const addCodeType = ({ type, value }: SlideElement) => {
  if (type === 'md') {
    return { type, value }
  }
  const [lang, ...rest] = value.split('\n')
  return { type, lang: lang.trim(), value: rest.join('\n').trim() }
}

const addType = (d: string, index: number): SlideElement => ({ type: index % 2 === 0 ? 'md': 'code', value: d })

const isImage = (line: string) => {
  const l = line.trim()
  return l.startsWith('![') && l.includes('](') && l.endsWith(')')
}

const splitMdIfHasImage = (value: string): SlideElement[] => {
  const lines = value.split('\n')
  if (!lines.map(isImage).includes(true)) {
    return [{ type: 'md', value }]
  }
  const { current, parts } = lines.reduce<{ current: string, parts: SlideElement[] }>(({current, parts}, line) => {
    if (isImage(line)) {
      const img: SlideElement = { type: 'image', value: line }
      if (current !== '') {
        const md: SlideElement = { type: 'md', value: current }
        return { current: '', parts: [...parts, md, img] }
      }
      return { current, parts: [...parts, img] }
    }
    return {
      current: current !== '' ? `${current}\n${line}` : line,
      parts
    }
  }, { current: '', parts: [] })
  return current === ''
    ? parts
    : [...parts, { type: 'md', value: current }]
}

const separateImages = (slide: Slide): Slide =>
  slide
    .map(d => d.type === 'md' ? splitMdIfHasImage(d.value) : [d])
    .reduce((r, d) => ([...r, ...d]), [])

export const parseSlide = (page: string): Slide =>
  separateImages(
    page.split('```')
      .map(addType)
      .map(addCodeType)
  )
    .map(d => ({ ...d, value: d.value.trim() }))
    .filter(d => d.value !== '')

export default (file: string): Slide[] => {
  const slides = file.split('---').map(d => d.trim()).filter(d => d !== '')
  return slides.map(parseSlide)
}