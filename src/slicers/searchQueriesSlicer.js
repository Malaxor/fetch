import { createSlice } from '@reduxjs/toolkit'

const searchQueriesSlicer = createSlice({
  name: 'searchQueries',
  initialState: {
    prevSearchQuery: '',
    nextSearchQuery: ''
  },
  reducers: {
    setSearchQueries(state, action) {
      return { 
        prevSearchQuery: action.payload.prevSearchQuery,
        nextSearchQuery: action.payload.nextSearchQuery 
      }
    }
  }
})

export const { 
  actions: { setSearchQueries }, 
  reducer: searchQueriesReducer 
} = searchQueriesSlicer
