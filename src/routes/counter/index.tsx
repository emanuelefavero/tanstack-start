import { createFileRoute, Link } from '@tanstack/react-router'
import ClientCounter from '~/components/counter/ClientCounter'
import ServerCounter from '~/components/counter/ServerCounter'
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
      <Link to='/'>Home</Link>

      <ServerCounter />
      <ClientCounter />
    </>
  )
}
