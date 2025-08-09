import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/shopping-cart-summary/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <h1 className='text-2xl font-bold'>Shopping Cart Summary</h1>
    </>
  )
}
