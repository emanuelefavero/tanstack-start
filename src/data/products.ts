import { nanoid } from 'nanoid'
import type { Product } from '~/types/products'

export const products: Product[] = [
  {
    id: nanoid(),
    name: 'Cartier Tank',
    price: 3800,
  },
  {
    id: nanoid(),
    name: 'Cartier Santos',
    price: 3800,
  },
  {
    id: nanoid(),
    name: 'Cartier Panthere',
    price: 3800,
  },
]
