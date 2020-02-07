const isKey = (str?: string) => str && str.trim().startsWith('-')

const isAllowed = (allowedKeys?: string[]) => (key: string) =>
  allowedKeys
    ? allowedKeys.includes(key)
    : true

interface Args {
  [key: string]: string | true
}

interface ConfigKey {
  key: string
  short: string
  description: string
  type: 'boolean' | 'string' | 'number'
}

const configkeys: ConfigKey[] = [
  { key: 'help', short: 'h', description: 'Help', type: 'boolean' },
  { key: 'download-images', short: 'i', description: 'Download and include images', type: 'boolean' },
  { key: 'bullshit-score', short: 'bs', description: 'Log the bullshit score', type: 'boolean' },
  { key: 'replace-bullshit', short: 'r', description: 'Replace bullshit words with \"bullshit\"', type: 'boolean' },
]

const allowedKeys = configkeys
  .map(({ key, short }) => ([key, short]))
  .reduce((r, d) => ([...r, ...d]), [])

export interface Config {
  bsReplace: boolean
  bsScore: boolean
  file: string
  images: boolean
}

const info = `
USAGE: midman <FILE_NAME>.md <OPTIONS>

OPTIONS:

${configkeys.map(d => ` --${d.key} or -${d.short} : '${d.description}'`).join('\n')}
`

export const onError = (msg: string) =>
  console.log(`
ERROR: ${msg}
${info}
  `)

const getArgs = (files: string[], allowedKeys?: string[]): Args =>
  process.argv
    .map((key, index, arr) => ({
      isKey: isKey(key),
      key: Array.from(key).filter(d => d !== '-').join(''),
      value: (isKey(arr[index + 1]) || files.includes(arr[index + 1])) ? null : arr[index + 1],
    }))
    .filter(d => d.isKey && isAllowed(allowedKeys)(d.key))
    .reduce((res, { key, value }) => ({ ...res, [key]: value ? value : true }), {})

const isTrue = (keys: string[], args: Args) =>
  keys.map(d => Boolean(args[d])).includes(true)

export default (): Config | undefined => {
  const files = process.argv.filter(d => d.endsWith('.md') && d.length > 3)
  if (files.length === 0) {
    onError('No markdown file')
    return undefined
  }
  const args = getArgs(files, allowedKeys)
  return {
    bsReplace: isTrue(['replace-bullshit', 'r'], args),
    bsScore: isTrue(['bullshit-score', 'bs'], args),
    file: files[0],
    images: isTrue(['download-images', 'i'], args)
  }
}