import { promisify } from 'util'
import { readFile } from 'fs'
import { resolve } from 'path'
import { JsFileContent } from './assets'

const read = (path: string) => promisify(readFile)(path, 'utf-8')

export default async (): Promise<JsFileContent> => ({
  type: 'js',
  content: await read(resolve(__dirname, 'script.js'))
})