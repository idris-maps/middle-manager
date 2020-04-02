import parseCmd, { Config } from './utils/parseCmd'
import parseMd from './utils/parseMd'
import read from './utils/read'
import renderHTML from './render'
import { replaceBullshit } from './bullshit'

const config = parseCmd()

const run = async ({ theme, replaceBs, file }: Config) => {
  try {
    const md = await read(file)
    const slides = parseMd(replaceBs ? replaceBullshit(md) : md)
    const html = await renderHTML(slides, config.theme)
    console.log(html)
  } catch (e) {
    console.log(e)
  }
}

if (config) {
  run(config)
}

