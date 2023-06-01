import { createSlice } from '@reduxjs/toolkit'
import { myInitialState } from '../initialState'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: myInitialState.cart,
  reducers: {
    addCartItem(state, action) {
      return [...state, action.payload]
    },

    deleteCartItem(state, action) {
      return state.filter((el) => el.id !== action.payload)
    },

    cleanCart: () => myInitialState.cart,

    incrementCartItem(state, action) {
      state.map((el) =>
        el.id === action.payload ? (el.count = el.count + 1) : el.count
      )
    },
    decrementCartItem(state, action) {
      state.map((el) =>
        el.id === action.payload ? (el.count = el.count - 1) : el.count
      )
    },
    changeCartItemIncluded(state, action) {
      state.map((el) =>
        el.id === action.payload ? (el.included = !el.included) : el.included
      )
    },
  },
})

export const {
  addCartItem,
  cleanCart,
  deleteCartItem,
  incrementCartItem,
  decrementCartItem,
  changeCartItemIncluded,
} = cartSlice.actions
export const cartReducer = cartSlice.reducer
