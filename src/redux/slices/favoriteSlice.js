import { createSlice } from '@reduxjs/toolkit'
import { myInitialState } from '../initialState'

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: myInitialState.favorites,
  reducers: {
    addFavorItem(state, action) {
      return state ? [...state, action.payload] : [action.payload]
    },
    deleteFavorItem(state, action) {
      return state.filter((el) => el !== action.payload)
    },
    cleanFavorList: () => {
      return myInitialState.favorites
    },
  },
})

export const { addFavorItem, deleteFavorItem, cleanFavorList } =
  favoritesSlice.actions
export const favoritesReducer = favoritesSlice.reducer
