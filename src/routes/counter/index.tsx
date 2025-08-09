import { createFileRoute } from '@tanstack/react-router'
import { getCount } from '~/server/count'
import ClientCounter from './-components/ClientCounter'
import ServerCounter from './-components/ServerCounter'

export const Route = createFileRoute('/counter/')({
  component: RouteComponent,

  // Data loader
  loader: async () => {
    const count = await getCount()

    return {
      count,
    }
  },
})

function RouteComponent() {
  // TIP: If you need to load the `count` data directly inside this route:
  // const { count } = Route.useLoaderData()

  return (
    <>
      <ClientCounter />
      <ServerCounter />
    </>
  )
}
