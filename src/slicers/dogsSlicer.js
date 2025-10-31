import { createSlice } from '@reduxjs/toolkit'

const dogsSlicer = createSlice({
  name: 'dogs',
  initialState: {
    dogs: [],
    hasDogs: null,
    loading: false
  },
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
    }
  }
})

export const { 
  actions: { addDogs, emptyDogs, setHasDogs, setLoading }, 
  reducer: dogsReducer 
} = dogsSlicer
