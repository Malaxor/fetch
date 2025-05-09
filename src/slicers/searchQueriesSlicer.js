import { createSlice } from '@reduxjs/toolkit'

const searchQueriesSlicer = createSlice({
  name: 'searchQueries',
  initialState: {
    prevSearchQuery: '',
    nextSearchQuery: ''
  },
  reducers: {
    setPrevSearchQuery(state, action) {
      state.prevSearchQuery = action.payload
    },
    setNextSearchQuery(state, action) {
      state.nextSearchQuery = action.payload
    }
  }
})

export const { 
  actions: { setNextSearchQuery, setPrevSearchQuery }, 
  reducer: searchQueriesReducer 
} = searchQueriesSlicer
