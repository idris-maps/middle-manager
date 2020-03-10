import { promisify } from 'util'
import { readFile } from 'fs'

export default async (path: string, onError?: (err: string) => void) => {
  try {
    return await promisify(readFile)(path, 'utf-8')
  } catch (e) {
    if (onError) {
      onError(`Could not find "${path}"`)
    }
    throw e
  }
}