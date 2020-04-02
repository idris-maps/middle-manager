import parseCmd, { Config } from './utils/parseCmd'
import parseMd from './utils/parseMd'
import { read, write } from './utils/files'
import renderHTML from './render'
import { replaceBullshit } from './bullshit'

const config = parseCmd()

const run = async ({ theme, replaceBs, file, output }: Config) => {
  try {
    const md = await read(file)
    const slides = parseMd(replaceBs ? replaceBullshit(md) : md)
    const html = await renderHTML(slides, theme)
    await write(output, html)
  } catch (e) {
    console.log(e)
  }
}

if (config) {
  run(config)
}

