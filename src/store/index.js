import { configureStore } from '@reduxjs/toolkit'
import { loggedInReducer, dogsAndLikedDogsReducer } from '../slicers'

export const store = configureStore({
  reducer: {
    loggedIn: loggedInReducer,
    dogsAndLikedDogs: dogsAndLikedDogsReducer
  }
})