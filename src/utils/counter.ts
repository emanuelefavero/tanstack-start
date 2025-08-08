import * as fs from 'node:fs'
import { filePath } from '~/config/counter'

export async function readCount() {
  return parseInt(
    await fs.promises.readFile(filePath, 'utf-8').catch(() => '0'),
  )
}
