import { configureStore } from '@reduxjs/toolkit'
import { dogsAndLikedDogsReducer } from '../slicers'

export const store = configureStore({
  reducer: {
    dogsAndLikedDogs: dogsAndLikedDogsReducer
  }
})