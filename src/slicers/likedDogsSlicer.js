import { createSlice } from '@reduxjs/toolkit'

const likedDogsSlicer = createSlice({
  name: 'likedDogs',
  initialState: {
    likedDogs: []
  },
  reducers: {
    emptyLikedDogs(state) {
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
  actions: { addLikedDog, removeLikedDog, emptyLikedDogs }, 
  reducer: likedDogsReducer 
} = likedDogsSlicer
