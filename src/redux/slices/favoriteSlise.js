import { createSlice } from '@reduxjs/toolkit'
import { myInitialState } from '../initialState'

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: myInitialState.favorites,
  reducers: {
    //   changeSearchValue(state, action) {
    //     state.search = action.payload
    //   }
  },
})

export const {} = favoritesSlice.actions
export const favoritesReducer = favoritesSlice.reducer
