import { createSlice } from '@reduxjs/toolkit'

const loadingSlicer = createSlice({
  name: 'loading',
  initialState: {
    loading: false
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload
    }
  }
})

export const { 
  actions: { setLoading }, 
  reducer: loadingReducer 
} = loadingSlicer
