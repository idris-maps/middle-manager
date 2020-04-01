import { promisify } from 'util'
import { readFile } from 'fs'

export default async (path: string) => {
  try {
    return await promisify(readFile)(path, 'utf-8')
  } catch (e) {
      throw new Error (`Could not find "${path}"`)
  }
}