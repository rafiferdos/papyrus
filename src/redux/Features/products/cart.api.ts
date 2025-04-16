import { TOrderProduct } from '@/types/global'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
  productId: string
  quantity: number
}

export interface CartItemDisplay extends CartItem {
  _id: string
  imageUrl: string
  name: string
  price: number
}

// New interface for cart structure
// interface CartState {
//   userId: string | null
//   products: Array<{
//     productId: string
//     quantity: number
//   }>
// }

export interface CartState {
  userId: string | null
  products: CartItem[]
}

// Initialize cart in localStorage if it doesn't exist
const initialCart = {
  userId: null,
  products: [],
}

if (typeof window !== 'undefined' && !localStorage.getItem('cart')) {
  localStorage.setItem('cart', JSON.stringify(initialCart))
}

const loadCartFromLocalStorage = (): CartState => {
  try {
    const cart = localStorage.getItem('cart')
    if (cart) {
      return JSON.parse(cart)
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error)
  }
  return { userId: null, products: [] }
}

const initialState: CartState = loadCartFromLocalStorage()

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload
      localStorage.setItem('cart', JSON.stringify(state))
    },

    addToCart: (state, action: PayloadAction<TOrderProduct>) => {
      const existingProductIndex = state.products.findIndex(
        (item) => item.productId === action.payload._id
      )

      if (existingProductIndex >= 0) {
        state.products[existingProductIndex].quantity += action.payload.quantity
      } else {
        state.products.push({
          productId: action.payload._id,
          quantity: action.payload.quantity,
        })
      }

      localStorage.setItem('cart', JSON.stringify(state))
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (item) => item.productId !== action.payload
      )
      localStorage.setItem('cart', JSON.stringify(state))
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ _id: string; quantity: number }>
    ) => {
      const item = state.products.find(
        (item) => item.productId === action.payload._id
      )
      if (item) {
        item.quantity = action.payload.quantity
      }
      localStorage.setItem('cart', JSON.stringify(state))
    },

    clearCart: (state) => {
      state.products = []
      localStorage.setItem('cart', JSON.stringify(state))
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setUserId,
} = cartSlice.actions
export default cartSlice.reducer
