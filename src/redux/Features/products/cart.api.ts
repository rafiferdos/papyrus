import { TOrderProduct } from '@/types/global'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const loadCartFromLocalStorage = () => {
  const cart = localStorage.getItem('cart')
  return cart ? JSON.parse(cart) : []
}

interface CartState {
  products: TOrderProduct[]
}

const initialState: CartState = {
  products: loadCartFromLocalStorage(),
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<TOrderProduct>) => {
      const existingItem = state.products.find(
        (products) => products.productId === action.payload.productId
      )

      if (existingItem) {
        existingItem.quantity += action.payload.quantity
      } else {
        state.products .push(action.payload)
      }
      localStorage.setItem('cart', JSON.stringify(state.products ))
      console.log(state.products )
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.products  = state.products .filter((item) => item.productId !== action.payload)
      localStorage.setItem('cart', JSON.stringify(state.products ))
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ _id: string; quantity: number }>
    ) => {
      const item = state.products.find((item) => item.productId === action.payload._id)
      if (item) {
        item.quantity = action.payload.quantity
      }
      localStorage.setItem('cart', JSON.stringify(state.products ))
    },

    clearCart: (state) => {
      state.products = []
      localStorage.removeItem('cart')
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions
export default cartSlice.reducer
