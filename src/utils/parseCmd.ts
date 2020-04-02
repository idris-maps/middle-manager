import { ArgumentParser } from 'argparse'

const parser = new ArgumentParser()

parser.addArgument(
  ['-md', '--markdown-file'],
  { required: true, help: 'The markdown file to read' }
)

parser.addArgument(
  ['-o', '--output-file'],
  { required: true, help: 'The name of the HTML file to create' }
)

parser.addArgument(
  ['-bs', '--replace-bullshit'],
  { action: 'storeTrue', help: 'Replace bullshit words by "bullshit"' }
)

parser.addArgument(
  ['-t', '--theme'],
  { defaultValue: 'dark', help: 'Chose a theme. Defaults to "dark"' }
)


export interface Config {
  file: string
  output: string
  replaceBs: boolean
  theme: string
}

export default (): Config => {
  const {
    markdown_file,
    output_file,
    replace_bullshit,
    theme,
  } = parser.parseArgs()

  return {
    file: markdown_file,
    output: output_file,
    replaceBs: Boolean(replace_bullshit),
    theme: theme || 'dark',
  }
}
