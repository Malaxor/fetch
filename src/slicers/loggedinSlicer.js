import { createSlice } from '@reduxjs/toolkit'

const loggedInSlicer = createSlice({
  name: 'loggedIn',
  initialState: {
    isLoggedIn: false
  },
  reducers: {
    logIn: (state) => {
      state.isLoggedIn = true
    },
    logOut: (state) => {
      state.isLoggedIn = false
    }
  }
})

export const { actions: { logIn, logOut }, reducer: loggedInReducer } = loggedInSlicer
