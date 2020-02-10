import parseCmd, { onError, Config } from './parseCmd'
import parseMd from './parseMd'
import read from './read'
import renderHTML from './render'

const config = parseCmd()


const run = async (config: Config) => {
  try {
    const md = await read(config.file, onError)
    const slides = parseMd(md)
    const html = renderHTML(slides)
    console.log(html)
  } catch (e) {
    console.log(e)
  }
}

if (config) {
  run(config)
}

