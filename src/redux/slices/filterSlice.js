import { createSlice } from '@reduxjs/toolkit'
import { myInitialState } from '../initialState'

export const filterSlice = createSlice({
  name: 'filter',
  initialState: myInitialState.filter,
  reducers: {
    changeSearchValue(state, action) {
      state.search = action.payload
    },
    changeSortingValue(state, action) {
      state.sorting = action.payload
    },
  },
})

export const { changeSearchValue, changeSortingValue } = filterSlice.actions
export const filterReducer = filterSlice.reducer
