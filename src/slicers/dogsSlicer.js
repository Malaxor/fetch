import { createSlice } from '@reduxjs/toolkit'

const dogsSlicer = createSlice({
  name: 'dogs',
  initialState: {
    dogs: []
  },
  reducers: {
    addDogs(state, action) {
      state.dogs = action.payload
    },
    emptyDogs(state) {
      state.dogs = []
    }
  }
})

export const { 
  actions: { addDogs, emptyDogs }, 
  reducer: dogsReducer 
} = dogsSlicer
