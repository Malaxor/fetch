import { configureStore } from '@reduxjs/toolkit'
import { dogsReducer } from '../slicers'

export const store = configureStore({
  reducer: {
    dogs: dogsReducer
  }
})
