import { useCartStore } from '~/store/useCartStore'
import type { Cart } from '~/types/cart'

export default function Component() {
  const { cart, total, clearCart, increaseQuantity, decreaseQuantity } =
    useCartStore()

  if (!cart.length) return

  return (
    <div className='max-w-sm'>
      <h2 className='mt-2 text-3xl font-bold'>Cart</h2>

      {/* Clear All Products */}
      <button
        className='mt-2 cursor-pointer bg-transparent px-0 py-0 font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400'
        onClick={clearCart}
      >
        Clear all products
      </button>

      {/* Cart Products */}
      <ul className='mt-2 flex flex-col gap-2'>
        {cart.map((product: Cart) => (
          <li key={product.id} className='flex items-center justify-between'>
            {/* Product Name */}
            <div>{product.name}</div>

            <div className='flex items-center gap-2'>
              {/* Price */}
              <div className='font-semibold'>${product.price}</div>

              {/* Quantity Buttons */}
              <div className='flex items-center justify-center rounded-full border-2 border-amber-300 select-none'>
                {/* Decrease Button */}
                <button
                  className='cursor-pointer rounded-full bg-transparent px-2.5 py-0.5 text-(--foreground) active:scale-95'
                  onClick={() => decreaseQuantity(product.id)}
                >
                  -
                </button>

                {/* Quantity */}
                <div className='min-w-8 text-center'>{product.quantity}</div>

                {/* Increase Button */}
                <button
                  className='cursor-pointer rounded-full bg-transparent px-2.5 py-0.5 text-(--foreground) active:scale-95'
                  onClick={() => increaseQuantity(product.id)}
                >
                  +
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Line Separator */}
      <hr className='mt-4 h-px border-0 bg-slate-300 dark:bg-slate-700' />

      {/* Total */}
      <p className='mt-2 flex w-full justify-end text-lg'>
        Total ({cart.length} product{cart.length === 1 ? '' : 's'}):{' '}
        <span className='font-bold'>&nbsp;${total}</span>
      </p>
    </div>
  )
}
