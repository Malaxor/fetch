import { createSlice } from '@reduxjs/toolkit'

const dogsAndLikedDogsSlicer = createSlice({
  name: 'dogsAndLikedDogs',
  initialState: {
    dogs: [],
    likedDogs: []
  },
  reducers: {
    addDogs(state, action) {
      state.dogs = action.payload
    },
    emptyDogsAndLikedDogs(state) {
      state.dogs = []
      state.likedDogs = []
    },
    addLikedDog(state, action) {
      if (state.likedDogs.length < 10) {
        state.likedDogs = state.likedDogs.concat(action.payload)
      }
    },
    removeLikedDog(state, action) {
      state.likedDogs = state.likedDogs.filter(likedDog => likedDog.id !== action.payload.id)
    }
  }
})

export const { 
  actions: { addDogs, addLikedDog, removeLikedDog, emptyDogsAndLikedDogs }, 
  reducer: dogsAndLikedDogsReducer 
} = dogsAndLikedDogsSlicer
