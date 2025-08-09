import type { Product } from '~/types/products'

export interface Cart extends Product {
  quantity: number
}
