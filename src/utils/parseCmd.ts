import { ArgumentParser } from 'argparse'

const parser = new ArgumentParser()

parser.addArgument(
  ['-md', '--markdown-file'],
  { required: true, help: 'The markdown file to read' }
)

parser.addArgument(
  ['-bs', '--bullshit-score'],
  { action: 'storeTrue', help: 'Calculate your bullshit score' }
)

parser.addArgument(
  ['-r', '--replace-bullshit'],
  { action: 'storeTrue', help: 'Replace bullshit words by "bullshit"' }
)

parser.addArgument(
  ['-t', '--theme'],
  { defaultValue: 'dark', help: 'Chose a theme. Defaults to "dark"' }
)


export interface Config {
  file: string
  bsScore: boolean
  bsReplace: boolean
  theme: string
}

export default (): Config => {
  const {
    markdown_file,
    bullshit_score,
    replace_bullshit,
    theme,
  } = parser.parseArgs()

  return {
    file: markdown_file,
    bsScore: Boolean(bullshit_score),
    bsReplace: Boolean(replace_bullshit),
    theme: theme || 'dark',
  }
}
