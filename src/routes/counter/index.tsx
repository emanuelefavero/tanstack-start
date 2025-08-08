import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import * as fs from 'node:fs'
import { useState } from 'react'
import Button from '~/components/shared/Button'

const filePath = 'count.txt'

async function readCount() {
  return parseInt(
    await fs.promises.readFile(filePath, 'utf-8').catch(() => '0'),
  )
}

const getCount = createServerFn({
  method: 'GET',
}).handler(() => {
  return readCount()
})

const updateCount = createServerFn({ method: 'POST' })
  .validator((d: number) => d)
  .handler(async ({ data }) => {
    const count = await readCount()
    await fs.promises.writeFile(filePath, `${count + data}`)
  })

// * Route
export const Route = createFileRoute('/counter/')({
  component: RouteComponent,
  loader: async () => {
    const count = await getCount()

    return {
      count,
    }
  },
})

// * Route Component
function RouteComponent() {
  const router = useRouter()

  // Server Counter
  const { count } = Route.useLoaderData()

  // Client Counter
  const [clientCount, setClientCount] = useState(0)

  return (
    <>
      <Link to='/'>Home</Link>

      <h1 className='text-2xl font-bold'>TanStack Start - Counter Example</h1>

      <p className='mt-2'>Server Counter: {count}</p>
      <Button
        onClick={() => {
          updateCount({ data: 1 }).then(() => {
            router.invalidate()
          })
        }}
      >
        Add
      </Button>

      <p className='mt-1'>Client Counter: {clientCount}</p>

      <Button
        onClick={() => {
          setClientCount((c) => c + 1)
        }}
      >
        Add
      </Button>
    </>
  )
}
