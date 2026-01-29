import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dogs: [],
  likedDogs: [],
  prevSearchQuery: '',
  nextSearchQuery: '',
  hasDogs: null,
  loading: false
}

const dogsSlicer = createSlice({
  name: 'dogs',
  initialState: initialState,
  reducers: {
    addDogs(state, action) {
      state.dogs = action.payload
    },
    emptyDogs(state) {
      state.dogs = []
    },
    setHasDogs(state, action) {
      state.hasDogs = action.payload
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
    setSearchQueries(state, action) {
      state.prevSearchQuery = action.payload.prevSearchQuery
      state.nextSearchQuery = action.payload.nextSearchQuery 
    },
    emptyLikedDogs(state) {
      state.likedDogs = []
    },
    addLikedDog(state, action) {
      if (state.likedDogs.length < 10) {
        state.likedDogs.push(action.payload)
      }
    },
    removeLikedDog(state, action) {
      state.likedDogs = state.likedDogs.filter(likedDog => likedDog.id !== action.payload.id)
    },
    resetState() {
      return initialState
    }
  }
})


export const { 
  actions: { 
    addDogs, 
    emptyDogs, 
    setHasDogs, 
    setLoading, 
    setSearchQueries,
    addLikedDog,
    removeLikedDog,
    emptyLikedDogs,
    resetState 
  }, 
  reducer: dogsReducer 
} = dogsSlicer
