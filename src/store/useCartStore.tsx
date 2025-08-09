import { create } from 'zustand'
import type { Cart } from '~/types/cart'
import type { Product } from '~/types/products'

interface CartState {
  cart: Cart[]
  total: number
  addProduct: (product: Product) => void
  clearCart: () => void
  increaseQuantity: (productId: string) => void
  decreaseQuantity: (productId: string) => void
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  total: 0,
  addProduct: (product) =>
    set((state) => {
      const existingProduct = state.cart.find((p) => p.id === product.id)

      // If the product already exists in the cart, increase its quantity
      if (existingProduct) {
        return {
          cart: state.cart.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
          ),
          total: state.total + product.price, // Increase total by product price
        }
      }

      // If the product does not exist, add it to the cart
      return {
        cart: [...state.cart, { ...product, quantity: 1 }],
        total: state.total + product.price,
      }
    }),

  clearCart: () =>
    set(() => ({
      cart: [],
      total: 0,
    })),

  increaseQuantity: (productId) =>
    set((state) => {
      const product = state.cart.find((p) => p.id === productId)
      if (!product) return state

      // Increase the quantity of the product and update the total
      return {
        cart: state.cart.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity + 1 } : p,
        ),
        total: state.total + product.price,
      }
    }),

  decreaseQuantity: (productId) =>
    set((state) => {
      const product = state.cart.find((p) => p.id === productId)

      if (!product) return state

      // If quantity is 1, remove the product from the cart
      if (product.quantity <= 1) {
        return {
          cart: state.cart.filter((p) => p.id !== productId),
          total: state.total - product.price,
        }
      }

      // Decrease the quantity of the product and update the total
      return {
        cart: state.cart.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity - 1 } : p,
        ),
        total: state.total - product.price,
      }
    }),
}))
