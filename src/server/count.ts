import { createServerFn } from '@tanstack/react-start'
import * as fs from 'node:fs'
import { filePath } from '~/config/counter'
import { readCount } from '~/utils/counter'

export const getCount = createServerFn({ method: 'GET' }).handler(() => {
  return readCount()
})

export const updateCount = createServerFn({ method: 'POST' })
  .validator((d: number) => d)
  .handler(async ({ data }) => {
    const count = await readCount()
    await fs.promises.writeFile(filePath, `${count + data}`)
  })
