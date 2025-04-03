import { configureStore } from '@reduxjs/toolkit'
import { loggedInReducer, dogsAndLikedDogsReducer, searchQueriesReducer } from '../slicers'

export const store = configureStore({
  reducer: {
    loggedIn: loggedInReducer,
    dogsAndLikedDogs: dogsAndLikedDogsReducer,
    searchQueries: searchQueriesReducer
  }
})