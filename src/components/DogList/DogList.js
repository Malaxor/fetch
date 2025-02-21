import React from 'react'
import './style.css'
import { Dog, MatchedDog } from '../Dog'

export function DogList ({ dogs, likedDogs, setLikedDogs, matchedDog }) {
  const Dogs = dogs?.map(dog => 
    <Dog
      key={dog.id}
      dog={dog}
      setLikedDogs={setLikedDogs}
      likedDogs={likedDogs}
    />
  )
  return (
    <ol id='dog-list'>
      {Dogs || <MatchedDog key={matchedDog.id} dog={matchedDog} />}
    </ol>
  )
}
