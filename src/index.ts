import parseCmd, { onError, Config } from './parseCmd'
import parseMd from './parseMd'
import render from './render'
import read from './read'

const config = parseCmd()

const run = async (config: Config) => {
  try {
    const md = await read(config.file, onError)
    const slides = parseMd(md)
    const folderName = config.file.split('.md')[0]
    await render(slides, folderName)
    console.log(`Created folder \"${folderName}\"`)
  } catch (e) {
    console.log(e)
  }
}

if (config) {
  run(config)
}