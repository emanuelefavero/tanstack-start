import { createFileRoute } from '@tanstack/react-router'
import Counter from '~/components/Counter/Counter'
import { getCount } from '~/server/count'

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
  // TIP: If you need to load the `count` data directly inside this route:
  // const { count } = Route.useLoaderData()

  return (
    <>
      <Counter />
    </>
  )
}
