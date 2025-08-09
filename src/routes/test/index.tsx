import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/test/')({
  component: RouteComponent,
})

// TIP: Use this route to test features

function RouteComponent() {
  return (
    <>
      <h1>Test Route</h1>
    </>
  )
}
