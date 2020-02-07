import parseCmd, { onError, Config } from './parseCmd'
import parseMd from './parseMd'
import read from './read'

const config = parseCmd()

const run = async (config: Config) => {
  try {
    const md = await read(config.file, onError)
    const slides = parseMd(md)
    console.log(slides)
  } catch (e) {
    console.log(e)
  }
}

if (config) {
  run(config)
}