import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import * as fs from 'node:fs'
import { useState } from 'react'

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

// -----

// * Route
export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => {
    const count = await getCount()

    return {
      count,
    }
  },
})

// * Route Component
function Home() {
  const router = useRouter()

  // Server Counter
  const { count } = Route.useLoaderData()

  // Client Counter
  const [clientCount, setClientCount] = useState(0)

  // TODO Add shared button component (extend ComponentProps<"button">)
  // TODO Add ClientCounter component
  // TODO Add ServerCounter component that uses getCount and updateCount

  return (
    <>
      <h1 className='text-2xl font-bold'>TanStack Start - Counter Example</h1>

      <p className='mt-2'>Server Counter: {count}</p>
      <p className='mt-1'>Client Counter: {clientCount}</p>

      <button
        className='mt-2 cursor-pointer rounded-full border border-blue-300 bg-blue-200 px-2.5 py-1 font-semibold text-blue-800 transition-transform duration-200 hover:bg-blue-800 hover:text-blue-200 active:scale-95'
        type='button'
        onClick={() => {
          updateCount({ data: 1 }).then(() => {
            router.invalidate()
          })

          setClientCount((c) => c + 1)
        }}
      >
        Add
      </button>
    </>
  )
}
