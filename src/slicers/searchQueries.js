import { createSlice } from '@reduxjs/toolkit'

const searchQueries = createSlice({
  name: 'searchQueries',
  initialState: {
    nextSearchQuery: '',
    prevSearchQuery: ''
  },
  reducers: {
    setNextSearchQuery: (state, action) => {
      state.nextSearchQuery = action.payload
    },
    setPrevSearchQuery: (state, action) => {
      state.prevSearchQuery = action.payload
    }
  }
})

export const { 
  actions: { setNextSearchQuery, setPrevSearchQuery, }, 
  reducer: searchQueriesReducer 
} = searchQueries
