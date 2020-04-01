import parseCmd, { onError, Config } from './utils/parseCmd'
import parseMd from './utils/parseMd'
import read from './utils/read'
import renderHTML from './render'

const config = parseCmd()


const run = async (config: Config) => {
  try {
    const md = await read(config.file, onError)
    const slides = parseMd(md)
    const html = await renderHTML(slides)
    console.log(html)
  } catch (e) {
    console.log(e)
  }
}

if (config) {
  run(config)
}

