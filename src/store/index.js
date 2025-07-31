import { configureStore } from '@reduxjs/toolkit'
import { dogsReducer, likedDogsReducer, searchQueriesReducer } from '../slicers'

export const store = configureStore({
  reducer: {
    searchQueries: searchQueriesReducer,
    dogs: dogsReducer,
    likedDogs: likedDogsReducer
  }
})
