import { promisify } from 'util'
import { readFile } from 'fs'
import { resolve } from 'path'
import { Asset, CssFileContent } from '../assets/assets'

type Theme = 'dark'

const read = (path: string) => promisify(readFile)(path, 'utf-8')

export const getMainCss = async (theme: Theme = 'dark'): Promise<Asset> => {
  return { type: 'css', content: await read(resolve(__dirname, theme, 'style.css')) }
}

export const getMermaidCss = async (theme: Theme = 'dark'): Promise<CssFileContent> => {
  return { type: 'css', content: await read(resolve(__dirname, theme, 'mermaid.css')) }
}