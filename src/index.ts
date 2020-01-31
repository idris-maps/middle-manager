import { readFile } from 'fs'
import { promisify } from 'util'
import { endianness } from 'os'

const usageError = `
ERROR: could not find md file
USAGE:

cmd --md file.md
`

const read = promisify(readFile)

const getFileName = () => {
  const mdArg = process.argv.map((d, i) => ({ d, i })).find(({ d }) => d === '--md')
  if (mdArg) {
    return process.argv[mdArg.i + 1]
  }
  throw new Error(usageError)
}

const isImage = (line: string) => {
  const l = line.trim()
  return l.startsWith('![') && l.includes('](') && l.endsWith(')')
}

const imagesOnOwnPage = (md: string) =>
  md.split(`\n`).map(line => isImage(line)
    ? `
---

${line}

---
`
    : line).join(`\n`)

interface SlideElement {
  type: 'md' | 'code' | 'image' | string
  lang?: string
  value: string
}

const addCodeType = ({ type, value }: SlideElement) => {
  if (type === 'md') {
    return { type, value }
  }
  const [lang, ...rest] = value.split('\n')
  return { type, lang: lang.trim(), value: rest.join('\n') }
}

const addType = (d: string, index: number): SlideElement => ({ type: index % 2 === 0 ? 'md': 'code', value: d })

type Slide = SlideElement[]

const parseSlide = (slide: string): Slide => {
  return slide.split('```')
    .map(addType)
    .map(addCodeType)
    .map(d => isImage(d.value) ? { ...d, type: 'image' } : d)
    .map(d => ({ ...d, value: d.value.trim() }))
    .filter(d => d.value !== '')
}

const mdToJson = (file: string): Slide[] => {
  const slides = imagesOnOwnPage(file).split('---').map(d => d.trim()).filter(d => d !== '')
  return slides.map(parseSlide)
}

const run = async () => {
  try {
    const file = await read(getFileName(), 'utf-8')
    console.log(mdToJson(file))
    return
  } catch (e) {
    throw e
  }
}

run()
  .then(() => console.log('done'))
  .catch(console.log)