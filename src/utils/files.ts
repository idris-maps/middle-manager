import { promisify } from 'util'
import { readFile, writeFile } from 'fs'

export const read = async (path: string) => {
  try {
    return await promisify(readFile)(path, 'utf-8')
  } catch (e) {
      throw new Error (`Could not find "${path}"`)
  }
}

export const write = async (path: string, content: string) => {
  try {
    return await promisify(writeFile)(path, content, 'utf-8')
  } catch (e) {
      throw new Error (`Could not find "${path}"`)
  }
}