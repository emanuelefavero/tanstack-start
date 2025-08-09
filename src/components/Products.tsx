import { useCartStore } from '~/store/useCartStore'
import type { Product } from '~/types/products'

interface Props {
  products: Product[]
}

export default function Component({ products }: Props) {
  const { addProduct } = useCartStore()

  return (
    <div className='max-w-sm'>
      <h2 className='text-3xl font-bold'>Products</h2>

      {/* Products List */}
      <ul className='mt-2 flex flex-col gap-2'>
        {products.map((product: Product) => (
          <li key={product.id} className='flex items-center justify-between'>
            {/* Product Name */}
            <div>{product.name}</div>

            <div className='flex items-center gap-2'>
              {/* Price */}
              <div className='font-semibold'>${product.price}</div>

              {/* Add to Cart Button */}
              <button
                className='cursor-pointer rounded-full bg-amber-300 px-3 py-0.5 text-sm font-medium text-black transition duration-200 hover:bg-amber-200 active:scale-95'
                onClick={() => addProduct(product)}
              >
                Add to Cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
