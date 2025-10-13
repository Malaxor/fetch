import { createSlice } from '@reduxjs/toolkit'

const hasDogsSlicer = createSlice({
  name: 'hasDogs',
  initialState: {
    hasDogs: null,
  },
  reducers: {
    setHasDogs(state, action) {
      state.hasDogs = action.payload
    }
  }
})

export const { 
  actions: { setHasDogs }, 
  reducer: hasDogsReducer 
} = hasDogsSlicer
