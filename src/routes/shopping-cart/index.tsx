import { createFileRoute } from '@tanstack/react-router'
import Cart from '~/components/Cart'
import Products from '~/components/Products'
import { products } from '~/data/products'

export const Route = createFileRoute('/shopping-cart/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <h1 className='text-2xl font-bold'>Shopping Cart</h1>

      <div className='flex flex-col gap-4'>
        <Products products={products} />
        <Cart />
      </div>
    </>
  )
}
