import { configureStore } from '@reduxjs/toolkit'
import { 
  dogsReducer, 
  likedDogsReducer, 
  searchQueriesReducer, 
  loadingReducer,
  hasDogsReducer 
} from '../slicers'

export const store = configureStore({
  reducer: {
    searchQueries: searchQueriesReducer,
    dogs: dogsReducer,
    likedDogs: likedDogsReducer,
    loading: loadingReducer,
    hasDogs: hasDogsReducer
  }
})
