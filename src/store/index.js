import { configureStore } from '@reduxjs/toolkit'
import { dogsAndLikedDogsReducer, searchQueriesReducer } from '../slicers'

export const store = configureStore({
  reducer: {
    searchQueries: searchQueriesReducer,
    dogsAndLikedDogs: dogsAndLikedDogsReducer
  }
})
