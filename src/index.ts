import parseCmd, { Config } from './utils/parseCmd'
import parseMd from './utils/parseMd'
import { read, write } from './utils/files'
import renderHTML from './render'
import { replaceBullshit, countBullshit } from './bullshit'

const config = parseCmd()

const bullShitScore = (md: string) => {
  const { words, bullshit, score } = countBullshit(md)
  return `
    Your bullshit score is: ${score}
    
    ${bullshit} out of ${words} words are bullshit.
  `
}

const run = async ({ theme, replaceBs, file, output }: Config) => {
  try {
    const md = await read(file)
    const slides = parseMd(replaceBs ? replaceBullshit(md) : md)
    const html = await renderHTML(slides, theme)
    await write(output, html)
    console.log(bullShitScore(md))
  } catch (e) {
    console.log(e)
  }
}

if (config) {
  run(config)
}

