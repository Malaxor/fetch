export { 
  addDogs, 
  emptyDogs,
  dogsReducer 
} from './dogsSlicer'

export { 
  addLikedDog, 
  removeLikedDog,
  emptyLikedDogs,
  likedDogsReducer 
} from './likedDogsSlicer'

export { 
  setNextSearchQuery,
  setPrevSearchQuery,
  searchQueriesReducer 
} from './searchQueriesSlicer'
