import { readdir } from 'fs'
import { promisify } from 'util'
import { resolve } from 'path'
import { exec } from 'child_process'

const bash = (cmd: string) => new Promise((resolve, reject) =>
  exec(cmd, (err, stdout, stderr) => {
    if (err) { return reject(err) }
    if (stderr) { return reject(stderr) }
    resolve()
  })
)
const pathToSrc = resolve(__dirname, '..', 'node_modules', 'prismjs', 'themes')
const pathToAssets = resolve(__dirname, '..', 'assets')

const getFiles = () =>
  promisify(readdir)(pathToSrc)

const minify = (file: string) =>
  bash(`npx uglifycss ${resolve(pathToSrc, file)} > ${resolve(pathToAssets, file)}`)

const run = async () => {
  const files = await getFiles()
  await Promise.all(files.map(minify))
  console.log('Done minifying prism.css')
}

run()