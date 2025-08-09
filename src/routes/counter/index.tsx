import { createFileRoute } from '@tanstack/react-router'
import Counter from '~/components/Counter/Counter'
import { getCount } from '~/server/count'

export const Route = createFileRoute('/counter/')({
  component: Component,

  // Data loader
  loader: async () => {
    const count = await getCount()

    return {
      count,
    }
  },
})

function Component() {
  // TIP: If you need to load the `count` data directly inside this route:
  // const { count } = Route.useLoaderData()

  return (
    <>
      <Counter />
    </>
  )
}
